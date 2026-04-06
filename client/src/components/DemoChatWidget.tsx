import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { CompanyConfig } from "@shared/companyConfigs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function DemoChatWidget({
  config,
  accentColor,
  companySlug,
}: {
  config: CompanyConfig;
  accentColor: string;
  companySlug?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: `Welcome to ${config.name}! How can I help you today?` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.chat.send.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, I'm having trouble connecting right now. Please try again in a moment, or call us directly." },
      ]);
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatMutation.isPending]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || chatMutation.isPending) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    // Send to server with company context (system prompt built server-side)
    chatMutation.mutate({
      companySlug: companySlug,
      companyConfig: !companySlug || companySlug === "custom" ? {
        name: config.name,
        industry: config.industry,
        services: config.services,
        phone: config.phone,
        hours: config.hours,
        location: config.location,
      } : undefined,
      messages: newMessages,
    });

    inputRef.current?.focus();
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    `What services do you offer?`,
    `I need to book an appointment`,
    `What are your business hours?`,
    `Do you handle emergencies?`,
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-white/5 shrink-0" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${accentColor}20` }}>
          <Bot className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-white">{config.name} AI</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-white/40">Online now</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4" style={{ minHeight: 0 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: `${accentColor}15` }}>
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: accentColor }} />
              </div>
            )}
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-black font-medium"
                  : "text-white/90"
              }`}
              style={
                msg.role === "user"
                  ? { background: accentColor }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }
              }
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60" />
              </div>
            )}
          </div>
        ))}

        {chatMutation.isPending && (
          <div className="flex gap-2 sm:gap-3 justify-start">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: `${accentColor}15` }}>
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: accentColor }} />
            </div>
            <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: accentColor, animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggested questions - show only when just the greeting is visible */}
        {messages.length === 1 && !chatMutation.isPending && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-white/30 px-1">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-white/5 shrink-0" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || chatMutation.isPending}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-30"
            style={{ background: accentColor }}
          >
            {chatMutation.isPending ? (
              <Loader2 className="w-4 h-4 text-black animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-black" />
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-white/20 mt-2">
          Powered by Elevated Engagement AI
        </p>
      </div>
    </div>
  );
}
