# Deployment Notes

## Status
- Landing page: WORKING on Vercel
- Demo page: WORKING on Vercel (UI renders correctly)
- AI Chat: ERROR - "I'm having trouble connecting right now"
  - The tRPC API call to /api/trpc is failing
  - The serverless function at api/index.ts needs env vars (BUILT_IN_FORGE_API_URL, BUILT_IN_FORGE_API_KEY)
  - These are Manus platform env vars that need to be set in Vercel

## Fix needed
The LLM integration uses Manus built-in forge API. On Vercel, we need to either:
1. Set the BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY env vars in Vercel
2. Or use OpenAI API directly with a user-provided key

Since the user wants this deployed on Vercel independently, we should use OpenAI API directly.
