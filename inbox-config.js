// Alzeena Inbox — Vercel serverless config endpoint
// Returns the Meta access token from env vars so the HTML page can auto-login.
// The token NEVER appears in the deployed HTML bundle, only in Vercel env.

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token = process.env.META_ACCESS_TOKEN || '';
  const geminiKey = process.env.GEMINI_API_KEY || '';
  const persona = process.env.ALZEENA_AI_PERSONA || '';
  const mode = process.env.ALZEENA_TOKEN_MODE || 'user'; // 'user' | 'page'

  if (!token) {
    return res.status(200).json({
      token: null,
      error: 'META_ACCESS_TOKEN is not set in Vercel env vars',
      hint: 'Set META_ACCESS_TOKEN (and optionally GEMINI_API_KEY) in Vercel → Project → Settings → Environment Variables',
    });
  }

  return res.status(200).json({
    token,
    mode,
    geminiKey: geminiKey || null,
    persona: persona || null,
  });
}
