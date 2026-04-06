import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import OpenAI from "openai";
import { z } from "zod";
import { companyConfigs, buildSystemPrompt } from "@shared/companyConfigs";
import type { CompanyConfig } from "@shared/companyConfigs";

// Lazily initialize the OpenAI client so missing keys fail at call time, not import time
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openai;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    send: publicProcedure
      .input(
        z.object({
          companySlug: z.string().optional(),
          companyConfig: z.object({
            name: z.string(),
            industry: z.string(),
            services: z.array(z.string()),
            phone: z.string(),
            hours: z.string(),
            location: z.string(),
          }).optional(),
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        // Resolve company config: prefer slug lookup, then inline config
        let config: CompanyConfig | null = null;

        if (input.companySlug && companyConfigs[input.companySlug]) {
          config = companyConfigs[input.companySlug];
        } else if (input.companyConfig) {
          config = {
            ...input.companyConfig,
            avgJobValue: 3000,
            monthlyLeads: 50,
          };
        }

        // Build server-side system prompt
        const systemPrompt = config
          ? buildSystemPrompt(config)
          : "You are a professional AI receptionist for a home services company. Help customers, answer questions, and book appointments. Be friendly, professional, and efficient. Keep responses concise (2-3 sentences max). Do not use em dashes in your responses.";

        const openai = getOpenAI();

        const completion = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...input.messages.map(m => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
          ],
          max_tokens: 300,
          temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content ?? "I apologize, I was unable to process your request. Please try again.";

        return { content };
      }),
  }),
});

export type AppRouter = typeof appRouter;
