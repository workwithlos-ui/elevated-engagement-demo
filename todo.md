# Project TODO

- [x] Dark theme setup (bg-gradient #0a0a0f to #1a1a2e, amber accent, Plus Jakarta Sans font)
- [x] Company config system (JSON configs for 4 pre-loaded companies + custom URL param support)
- [x] Landing page (/) with hero, features, demo CTA
- [x] Demo page (/demo/:companySlug) with hero, chat, features, ROI calculator, CTA
- [x] Custom demo support (/demo/custom?name=...&industry=...&services=...)
- [x] AI Chat widget with OpenAI integration via tRPC
- [x] tRPC chat procedure (public, proxies to LLM with company-specific system prompt)
- [x] Feature showcase section on demo page
- [x] ROI calculator mini section on demo page
- [x] CTA section linking to Calendly
- [x] Mobile responsive design
- [x] Vitest tests for chat procedure
- [x] Server-side system prompt construction (accept companySlug, build prompt server-side)
- [x] Mobile UX hardening for chat widget and demo page
- [ ] Switch chat router to use OpenAI SDK directly (gpt-4.1-mini)
- [ ] Set OPENAI_API_KEY on Vercel via API
- [ ] Redeploy to Vercel and verify live chat works
