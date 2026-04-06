import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    id: "test-id",
    created: Date.now(),
    model: "gemini-2.5-flash",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Welcome! How can I help you today?",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 100,
      completion_tokens: 20,
      total_tokens: 120,
    },
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("chat.send", () => {
  it("returns an assistant response using companySlug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      companySlug: "orlando-roofing-pros",
      messages: [
        { role: "user", content: "What services do you offer?" },
      ],
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
    expect(result.content.length).toBeGreaterThan(0);
  });

  it("returns an assistant response using inline companyConfig", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      companyConfig: {
        name: "Test Plumbing Co",
        industry: "Plumbing",
        services: ["Drain Cleaning", "Pipe Repair"],
        phone: "(555) 123-4567",
        hours: "Mon-Fri 8am-5pm",
        location: "Tampa, FL",
      },
      messages: [
        { role: "user", content: "Hi there" },
        { role: "assistant", content: "Welcome to Test Plumbing Co!" },
        { role: "user", content: "I need a drain cleaned" },
      ],
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
  });

  it("works with no company context (generic fallback)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      messages: [
        { role: "user", content: "Hello" },
      ],
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
  });

  it("handles multi-turn conversations", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.send({
      companySlug: "sunshine-hvac",
      messages: [
        { role: "user", content: "Do you do AC repair?" },
        { role: "assistant", content: "Yes we do!" },
        { role: "user", content: "Great, I need to schedule a visit" },
      ],
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
  });
});
