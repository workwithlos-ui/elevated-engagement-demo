# Deployment Issue

The Vercel deployment is showing raw JS source code instead of the app.
This is because Vercel is treating it as a static site and serving the dist/index.js file directly.

The app uses Express + Vite SSR, which needs a Node.js serverless function or a custom server.
Vercel needs a vercel.json config to properly route and run the server.

## Solution
Need to configure vercel.json for the Express server build output.
