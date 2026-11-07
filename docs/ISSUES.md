# Known issues after the November 7 review

1. **One card bout lacks a matched market book.** The official card has 14 active bouts; the captured Polymarket book set covers 13. Carlos Calderon versus Austin Bashi is unmatched.
2. **Two matchups lack exact same-date sportsbook consensus.** Seokhyeon Ko versus Wellington Turman and Gabriel Lorenco versus Thomas Petersen had zero exact same-date rows in the captured Odds API payload.
3. **No candidate passed value gates.** The other 11 evaluated markets failed the existing ask-plus-modeled-fee net-value threshold. The saved observation and deterministic replay both show NO_TRADE.
4. **Fighter-stat evidence is not decision-qualified.** Recovery requested all 28 fighter slots and received some statistics for 19, but zero met the combined fresh-and-consistent decision-input bar. Raw receipts remain evidence, not verified features.
5. **No separate 19:30 Telegram delivery is proven.** The receipt available through the wallet API maps to the 17:15 observation only.
6. **Wallets are not multi-tenant.** The production ledger reviewed here is a shared per-event virtual strategy wallet. It is not a connected Polymarket wallet, user-scoped wallet, or personal trading account.

These are coverage and validation gaps. The system kept its current safety and value thresholds; it did not manufacture a trade to make the demonstration look successful.
