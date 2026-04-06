import { Link } from "wouter";
import { Phone, Calendar, Clock, Zap, MessageSquare, Shield, ArrowRight, Bot, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { companyConfigs } from "@shared/companyConfigs";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/TjdgSTzpsMqKhURHTkcr9r/hero-bg-U9Y9cwYbFNG9xDpvSCfyLE.webp";
const AI_VISUAL = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/TjdgSTzpsMqKhURHTkcr9r/ai-receptionist-visual-KcVfQBfVgJqQEw4NcQ4ijS.webp";
const LANDING_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/TjdgSTzpsMqKhURHTkcr9r/landing-hero-VGyhRYW4RrbbrDpAE8jZya.webp";
const CHAT_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/91190584/TjdgSTzpsMqKhURHTkcr9r/chat-demo-mockup-96TSHwqahT6Qbijuw8ZE8d.webp";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="font-mono-data">{count.toLocaleString()}{suffix}</span>;
}

const features = [
  {
    icon: Phone,
    title: "24/7 Call Answering",
    description: "Never miss another customer call. Your AI receptionist answers instantly, day or night, weekends and holidays included.",
  },
  {
    icon: Zap,
    title: "Instant Lead Qualification",
    description: "Automatically qualifies every lead by asking the right questions. Separates tire-kickers from ready-to-buy customers.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Books appointments directly into your schedule. Collects name, phone, preferred time, and service needed.",
  },
  {
    icon: Clock,
    title: "Follow-Up Scheduling",
    description: "Captures every lead's contact info and schedules follow-ups so no opportunity falls through the cracks.",
  },
  {
    icon: Shield,
    title: "Emergency Triage",
    description: "Identifies urgent situations and escalates immediately. Burst pipes, no AC in summer, roof leaks after storms.",
  },
  {
    icon: MessageSquare,
    title: "Customer Data Capture",
    description: "Every interaction is logged. Customer name, number, service needed, and conversation history. All in one place.",
  },
];

const stats = [
  { value: 40, suffix: "%", label: "of calls go unanswered by home service companies" },
  { value: 1200, suffix: "", label: "average revenue lost per missed call" },
  { value: 24, suffix: "/7", label: "availability with zero additional staff" },
  { value: 85, suffix: "%", label: "of customers choose the first company that answers" },
];

const demoCompanies = Object.entries(companyConfigs).map(([slug, config]) => ({
  slug,
  name: config.name,
  industry: config.industry,
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-gradient text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ backdropFilter: "blur(20px)", background: "rgba(10, 10, 15, 0.8)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Bot className="w-7 h-7 text-amber-500" />
              <span className="font-display font-bold text-lg tracking-tight">Elevated Engagement</span>
            </div>
            <a href="https://calendly.com/elios-ai" target="_blank" rel="noopener noreferrer">
              <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm px-5">
                Book a Call
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                AI-Powered Receptionist for Home Services
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                Stop Losing Customers to{" "}
                <span className="text-gradient-amber">Missed Calls</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl">
                Your AI receptionist answers every call, qualifies every lead, and books appointments 24/7. No more voicemails. No more missed revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#demos">
                  <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-base px-8 py-6 animate-pulse-amber">
                    See a Live Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="https://calendly.com/elios-ai" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold text-base px-8 py-6">
                    Book a Call
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative amber-glow rounded-2xl overflow-hidden">
                <img src={AI_VISUAL} alt="AI Receptionist" className="w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-amber-500">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
              Everything Your Front Desk Does.{" "}
              <span className="text-gradient-amber">But Better.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Your AI receptionist handles every customer interaction with the professionalism of your best employee, available around the clock.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card-hover p-6 space-y-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-display font-semibold text-lg">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src={CHAT_MOCKUP} alt="AI Chat Interface" className="w-full rounded-2xl amber-glow-sm" />
            </div>
            <div className="space-y-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
                Your Customers Get{" "}
                <span className="text-gradient-amber">Instant Answers</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Customer calls or chats with your business",
                  "AI receptionist greets them by your company name",
                  "Answers questions about your services and pricing",
                  "Books the appointment and captures their info",
                  "You get the lead details instantly",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-amber-500 font-mono-data text-sm font-bold">{i + 1}</span>
                    </div>
                    <p className="text-white/70 text-base">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demos Section */}
      <section id="demos" className="relative py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
              See It In Action.{" "}
              <span className="text-gradient-amber">Live Demos.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Click any demo below to see a fully working AI receptionist built for a real business. Try chatting with it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoCompanies.map((company) => (
              <Link key={company.slug} href={`/demo/${company.slug}`}>
                <div className="glass-card-hover p-6 space-y-4 h-full">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="font-display font-semibold text-base">{company.name}</h3>
                  <p className="text-white/40 text-sm">{company.industry}</p>
                  <div className="flex items-center gap-2 text-amber-500 text-sm font-medium">
                    Try Demo <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <img src={LANDING_HERO} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Ready to Stop Missing Calls?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Get your own AI receptionist set up in under 48 hours. No contracts. No complicated setup. Just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/elios-ai" target="_blank" rel="noopener noreferrer">
              <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-base px-10 py-6 animate-pulse-amber">
                Book a Call With Our Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
              No contracts
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
              Setup in 48 hours
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500/60" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-500" />
              <span className="font-display font-semibold text-sm">Elevated Engagement</span>
            </div>
            <p className="text-white/30 text-sm">
              AI-powered receptionist for home service companies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
