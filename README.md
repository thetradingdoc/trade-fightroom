# Trade — FightRoom

A small, auditable research demo for source-grounded MMA event analysis. The November 7, 2026 run demonstrates official roster-change extraction, private memory write/readback, attested inference, and replay of the saved paper decision.

This is an independent, clean-room demo. It does not contain the private TRAADE application, production evaluator or wallet implementation, raw provider payloads, credentials, or trade-execution code.

## November 7 result

- Research processing used the official Nov. 4 notice that Carlos Calderon replaced Lucas Brennan opposite Austin Bashi.
- Superlinked extracted all three fighter names with source spans; Cognee Cloud stored and returned the dated notice in separate analyst and verifier reads; Tinfoil returned a source-grounded roster memo with verified enclave attestation.
- The production paper evaluator replayed the saved 19:30 UTC observation exactly: NO_TRADE, 0 candidates, 13 rejected markets.
- The virtual event wallet remained at $100 cash, $0 exposure, and a $5 exposure cap. No positions were opened, so there is no realized trade P&L to report.
- The 14-bout official card had 13 matched Polymarket books. Carlos Calderon vs. Austin Bashi had no matched book. Two other bouts lacked exact same-date sportsbook matchups; 11 additional markets failed the fee-adjusted net-value threshold.
- The Telegram receipt available for review referred to the 17:15 UTC observation, not the 19:30 UTC decision.

Detailed sanitized evidence is in the artifacts directory.

## Run the clean-room checks

Requires Node.js 20 or later.

    npm test
    npm run verify

These checks validate the sanitized evidence and fixture; they do not call production or provider APIs.

## Scope and safety

This project demonstrates research plumbing and evidence handling. The sample model outputs are not calibrated fight probabilities, recommendations, or proof of profitability. The production paper result was a no-trade. This repository contains no order-submission capability and no live-trading integration.

See docs/EVIDENCE.md for provenance and limits, and docs/ISSUES.md for unresolved data gaps.

## License

MIT. See LICENSE.
