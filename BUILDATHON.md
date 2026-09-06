# Handoff

## One-sentence summary
Turns Entire's checkpoint/session history into a human-readable Handoff Report, so a developer or a fresh AI agent session can resume work without losing the reasoning behind it.

## Problem, intended user and why it matters
When an AI coding agent finishes a session and stops, whoever picks up the work next only sees a git diff — the *what* changed, never the *why*. Decisions made, alternatives considered and rejected, and unresolved risks are lost. Handoff solves this for developers and teams working with AI coding agents who need to resume or hand off work confidently.

## Selected Entire track and why Entire is essential
Track 1 — Checkpoint-Native Developer Experience. Entire's session data (prompts, files touched, checkpoints) is the sole input to Handoff — without it, there is no report to generate.

## Architecture and main workflow
1. `handoff.js` calls `entire session list --json` and `entire session info <id> --json` to pull real session data tied to git commits.
2. `generate-report.js` sends that data to the Gemini API with a structured prompt.
3. Output is written to `HANDOFF.md` — a clean, human-readable summary of intent, decisions, rejected approaches, and open risks.

## Entire Graph findings and verification
Ran `entire graph search --repo . --query "reverse a string in scratch.py" --format text --top-k 5`.

The graph correctly surfaced both `reverse_string` and `is_palindrome` as the top-ranked result (score 50.3), including their full docstrings — which contain the actual engineering rationale ("why recursion over slicing", "why reuse reverse_string over a stack-based approach"). It also identified `HANDOFF.md` itself as a related document, confirming the graph indexes generated documentation alongside source.

## Noon Curveball: what changed and how we adapted
[fill in once received]

## Checkpoint links and what each checkpoint proves
- Session `e1ed129a-f3e2-438d-bcea-1e0409780772` — initial hook verification (NOTES.md)
- Session `77cfd4bd-128a-4bf5-993c-bede76719672` — created scratch.py with reverse_string (checkpoint `01M1TP5VHFTDVWDRN4APMW9Z0Q`)
- Session `1795e8c7-9c9d-4f6b-80d0-15d72bdd42c8` — added is_palindrome, documents a rejected stack-based approach
- Session `0711092e-f34a-40ab-8ee2-f650d8d92fba` — attempted TODO addition (hit API