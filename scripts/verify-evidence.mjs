import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'));
const fixture = await load('fixtures/nov-07-official-roster-correction.json');
const integration = await load('artifacts/sponsor-integrations-2026-11-07.json');
const decision = await load('artifacts/production-decision-2026-11-07.json');
const errors = [];
const people = fixture.entities.filter((entity) => entity.label === 'PERSON');

for (const name of fixture.expected_person_entities) {
  const entity = people.find((candidate) => candidate.text === name);
  if (!entity) errors.push('missing entity: ' + name);
  else if (!entity.span_verified) errors.push('unverified source span: ' + name);
}
if (integration.superlinked.expected_person_entities_found !== 3) errors.push('Superlinked entity count mismatch');
if (!integration.superlinked.all_person_spans_match_input) errors.push('Superlinked spans are not all verified');
if (integration.cognee_cloud.remember.http_status !== 200 ||
    integration.cognee_cloud.remember.pipeline_status !== 'completed') errors.push('Cognee memory write not complete');
if (integration.cognee_cloud.analyst_recall.response_sha256 !==
    integration.cognee_cloud.independent_verifier_recall.response_sha256) errors.push('Cognee readbacks differ');
if (!integration.tinfoil.attestation.verified) errors.push('Tinfoil attestation not verified');
if (decision.paper_decision !== 'NO_TRADE' || decision.candidate_count !== 0) errors.push('unexpected paper decision');
if (!decision.independent_replay.rejection_map_matches_saved_observation) errors.push('decision replay mismatch');
if (decision.paper_wallet.cash_balance_usd !== 100 ||
    decision.paper_wallet.open_exposure_usd !== 0 ||
    decision.paper_wallet.max_exposure_usd !== 5) errors.push('paper wallet evidence mismatch');
if (decision.telegram_receipt.current_1930_observation_sent !== false) errors.push('Telegram receipt overclaims current observation');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Evidence verified: source spans, provider proof, replayed NO_TRADE, wallet, and Telegram receipt scope.');
}
