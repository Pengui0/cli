const fs = require('fs');
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Set GEMINI_API_KEY environment variable before running.');
  process.exit(1);
}
async function main() {
  const data = JSON.parse(fs.readFileSync('handoff-data.json', 'utf-8'));
  const prompt = `You are generating a "Handoff Report" for a developer or AI agent picking up work on this repository.
Here is the raw session history (each entry is one AI-assisted coding session, captured by Entire):
${JSON.stringify(data, null, 2)}
Write a clear Markdown report with these sections:
## Current Intent
## Key Decisions Made
## Things Tried & Rejected (if any evidence exists, otherwise say "None recorded")
## Unresolved Risks / Open Items
## What a New Developer or Agent Should Know Before Continuing
Be concise and factual. Base it only on the data given, do not invent details.`;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    console.error('No text returned. Full response:', JSON.stringify(json, null, 2));
    return;
  }
  fs.writeFileSync('HANDOFF.md', text);
  console.log('Wrote HANDOFF.md');
}
main();