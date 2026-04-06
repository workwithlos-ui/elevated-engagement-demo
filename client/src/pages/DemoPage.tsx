import { useParams, useSearch } from "wouter";
import { Link } from "wouter";
import { companyConfigs, getCompanyFromParams } from "@shared/companyConfigs";
import type { CompanyConfig } from "@shared/companyConfigs";
import { DemoChatWidget } from "@/components/DemoChatWidget";
import { Bot, Phone, Calendar, Clock, Zap, MessageSquare, Shield, ArrowRight, CheckCircle2, DollarSign, TrendingUp, Users, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const FEATURES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/TjdgSTzpsMqKhURHTkcr9r/features-bg-QdyCCo5XcEjBXjkWgFJN8z.webp";

const featureItems = [
  { icon: Phone, title: "24/7 Call Answering", desc: "Never miss a customer call again. Day, night, weekends, holidays." },
  { icon: Zap, title: "Instant Lead Qualification", desc: "Automatically asks the right questions to qualify every lead." },
  { icon: Calendar, title: "Appointment Booking", desc: "Books directly into your schedule with all details captured." },
  { icon: Clock, title: "Follow-Up Scheduling", desc: "Captures contact info and schedules follow-ups automatically." },
  { icon: Shield, title: "Emergency Triage", desc: "Identifies urgent situations and escalates immediately." },
  { icon: MessageSquare, title: "Customer Data Capture", desc: "Every interaction logged with full conversation history." },
];

export default function DemoPage() {
  const params = useParams<{ companySlug: string }>();
  const searchString = useSearch();
  const slug = params.companySlug;

  const config: CompanyConfig | null = useMemo(() => {
    if (slug === "custom") {
      const urlParams = new URLSearchParams(searchString);
      return getCompanyFromParams(urlParams);
    }
    return companyConfigs[slug] || null;
  }, [slug, searchString]);

  if (!config) {
    return (
      <div className="min-h-screen bg-dark-gradient flex items-center justify-center text-white">
        <div className="text-center space-y-6 max-w-md px-4">
          <Bot className="w-16 h-16 text-amber-500/30 mx-auto" />
          <h1 className="font-display font-bold text-2xl">Demo Not Found</h1>
          <p className="text-white/50">
            This demo configuration doesn't exist yet. Check the URL or contact Elevated Engagement to set up your personalized demo.
          </p>
          <Link href="/">
            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const accentColor = config.brandColor || "#f59e0b";
  const missedCallRevenue = Math.round(config.monthlyLeads * 0.4 * config.avgJobValue);
  const hoursPerWeek = Math.round(config.monthlyLeads * 0.3);

  return (
    <div className="min-h-screen bg-dark-gradient text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ backdropFilter: "blur(20px)", background: "rgba(10, 10, 15, 0.85)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Bot className="w-6 h-6" style={{ color: accentColor }} />
                <span className="font-display font-bold text-sm tracking-tight">Elevated Engagement</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-white/30">Demo for</span>
              <span className="font-display font-semibold text-sm" style={{ color: accentColor }}>{config.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero + Chat Section */}
      <section className="pt-24 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: Hero Content */}
            <div className="lg:col-span-2 space-y-8 lg:sticky lg:top-24">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
                  Live Demo
                </div>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                <span style={{ color: accentColor }}>{config.name}{config.name.endsWith('s') ? "'" : "'s"}</span>{" "}
                AI Receptionist
                </h1>
                <p className="text-white/50 text-base lg:text-lg leading-relaxed">
                  Available 24/7. Never misses a call. Books appointments instantly. Try it out right now.
                </p>
              </div>

              {/* Company Info Card */}
              <div className="glass-card p-5 space-y-4">
                <h3 className="font-display font-semibold text-sm text-white/70">Business Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-white/50">
                    <Phone className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                    <span>{config.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/50">
                    <Clock className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                    <span>{config.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/50">
                    <MessageSquare className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                    <span>{config.location}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-white/30 mb-2">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {config.services.map((s, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg text-white/60" style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}20` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Chat Widget */}
            <div className="lg:col-span-3">
              <div className="lg:min-h-[600px] h-[500px] lg:h-[650px]">
                <DemoChatWidget config={config} accentColor={accentColor} companySlug={slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="relative py-20 border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <img src={FEATURES_BG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              What Your AI Receptionist Handles
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Every feature your {config.industry.toLowerCase()} business needs to capture more leads and close more jobs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureItems.map((item, i) => (
              <div key={i} className="glass-card-hover p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                  <item.icon className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <h3 className="font-display font-semibold text-sm">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              What This Means for{" "}
              <span style={{ color: accentColor }}>{config.name}</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Based on your industry averages, here is the potential impact on your business.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card p-6 space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                <PhoneOff className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <p className="text-xs text-white/40">Never miss another call</p>
              <p className="font-display font-bold text-2xl" style={{ color: accentColor }}>
                <span className="font-mono-data">${missedCallRevenue.toLocaleString()}</span>
              </p>
              <p className="text-[11px] text-white/30">potential monthly revenue recovered</p>
            </div>
            <div className="glass-card p-6 space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <p className="text-xs text-white/40">Book appointments 24/7</p>
              <p className="font-display font-bold text-2xl" style={{ color: accentColor }}>
                <span className="font-mono-data">24/7</span>
              </p>
              <p className="text-[11px] text-white/30">availability, zero additional staff</p>
            </div>
            <div className="glass-card p-6 space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                <TrendingUp className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <p className="text-xs text-white/40">Qualify leads instantly</p>
              <p className="font-display font-bold text-2xl" style={{ color: accentColor }}>
                <span className="font-mono-data">100%</span>
              </p>
              <p className="text-[11px] text-white/30">of leads qualified automatically</p>
            </div>
            <div className="glass-card p-6 space-y-3 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ background: `${accentColor}10` }}>
                <Clock className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <p className="text-xs text-white/40">Save time on phone calls</p>
              <p className="font-display font-bold text-2xl" style={{ color: accentColor }}>
                <span className="font-mono-data">{hoursPerWeek}+</span>
              </p>
              <p className="text-[11px] text-white/30">hours saved per week</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Ready to Activate Your AI Receptionist?
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            Get {config.name}{config.name.endsWith('s') ? "'" : "'s"} AI receptionist live in under 48 hours. Book a quick call with our team to get started.
          </p>
          <a href="https://calendly.com/elios-ai" target="_blank" rel="noopener noreferrer">
            <Button
              className="font-bold text-base px-10 py-6 text-black animate-pulse-amber"
              style={{ background: accentColor }}
            >
              Book a Call With Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" style={{ color: `${accentColor}80` }} />
              No contracts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" style={{ color: `${accentColor}80` }} />
              Setup in 48 hours
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" style={{ color: `${accentColor}80` }} />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/">
              <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Bot className="w-5 h-5 text-amber-500" />
                <span className="font-display font-semibold text-sm">Elevated Engagement</span>
              </div>
            </Link>
            <p className="text-white/30 text-xs">
              AI-powered receptionist demo for {config.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
