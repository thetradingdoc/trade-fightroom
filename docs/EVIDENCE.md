# Evidence and provenance — November 7, 2026

## Research pipeline

The run used a public UFC roster-change notice published November 4, 2026. Its source URL and normalized input hash are recorded in the fixtures. Superlinked hosted SIE returned source-span-backed entities for Lucas Brennan, Austin Bashi, and Carlos Calderon. Cognee Cloud accepted one memory item; separate analyst and verifier reads returned the dated correction. Tinfoil returned a roster-only memo and its SDK verified enclave attestation.

Sanitized outcomes and response hashes are in artifacts/sponsor-integrations-2026-11-07.json. The Cognee tenant hostname and identity are intentionally excluded.

## Production decision

The saved Polymarket US observation was triggered by the scheduled Cloudflare Cron at 19:30 UTC. A replay of the production-matched evaluator against the saved observation returned the same decision and rejection map: 0 candidates; 11 markets had no positive net value after ask and modeled fee; 2 had no exact same-date sportsbook match.

The decision gates were preserved. The two missing sportsbook cases had zero exact same-date matchup rows in the saved Odds API payload. This does not imply that changing a threshold would make a valid candidate.

The active UFC card had 14 bouts and 13 matched Polymarket books. Carlos Calderon versus Austin Bashi was unmatched. It remained a coverage gap and was not synthesized into an opportunity.

## Ledger and reporting

The event uses a shared virtual strategy wallet, not an external venue account and not an individual user wallet. It held $100 cash and $0 exposure with a $5 maximum exposure. No paper trades opened; there is no settled P&L. A zero realized P&L with no positions does not establish profitability.

The Telegram receipt returned by the production wallet endpoint was for the 17:15 UTC observation. It does not prove a separate 19:30 UTC Telegram delivery. See the receipt fields in the decision artifact.

## Limits

- Captured provider data is not the same as validated or calibrated probability data.
- Hosted AI integrations performed extraction, memory retrieval, and a source-grounded memo. They did not generate fight probabilities or authorize a trade.
- This public demo does not contain the private production service or its raw provider objects.
- No live order, deposit, transfer, or cross-market hedge was performed.
