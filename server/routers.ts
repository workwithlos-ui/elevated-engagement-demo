import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import { companyConfigs, buildSystemPrompt } from "@shared/companyConfigs";
import type { CompanyConfig } from "@shared/companyConfigs";

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

        // Build messages with server-side system prompt
        const systemPrompt = config
          ? buildSystemPrompt(config)
          : "You are a professional AI receptionist for a home services company. Help customers, answer questions, and book appointments. Be friendly, professional, and efficient. Keep responses concise (2-3 sentences max). Do not use em dashes in your responses.";

        const llmMessages = [
          { role: "system" as const, content: systemPrompt },
          ...input.messages.map(m => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ];

        const response = await invokeLLM({
          messages: llmMessages,
        });

        const content = response.choices?.[0]?.message?.content;
        const textContent = typeof content === "string"
          ? content
          : Array.isArray(content)
            ? content.filter(c => c.type === "text").map(c => (c as { type: "text"; text: string }).text).join("")
            : "I apologize, I was unable to process your request. Please try again.";

        return { content: textContent };
      }),
  }),
});

export type AppRouter = typeof appRouter;
