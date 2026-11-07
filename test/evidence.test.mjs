import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const json = async (rel) => JSON.parse(await readFile(path.join(root, rel), 'utf8'));

test('official correction fixture has source-linked, verified person spans', async () => {
  const fixture = await json('fixtures/nov-07-official-roster-correction.json');
  assert.match(fixture.source, /^https:\/\/www\.ufc\.com\//);
  assert.equal(fixture.source_published_at, '2026-11-04');
  for (const name of fixture.expected_person_entities) {
    const row = fixture.entities.find((entity) => entity.text === name);
    assert.ok(row, 'expected entity ' + name);
    assert.equal(row.label, 'PERSON');
    assert.equal(row.span_verified, true);
    assert.ok(row.confidence >= 0 && row.confidence <= 1);
    assert.equal(row.span[1] - row.span[0], row.text.length);
  }
});

test('sponsor artifacts report successful integration outcomes', async () => {
  const a = await json('artifacts/sponsor-integrations-2026-11-07.json');
  assert.equal(a.superlinked.result, 'success');
  assert.equal(a.superlinked.expected_person_entities_found, 3);
  assert.equal(a.cognee_cloud.remember.http_status, 200);
  assert.equal(a.cognee_cloud.remember.items_processed, 1);
  assert.equal(a.cognee_cloud.analyst_recall.response_sha256, a.cognee_cloud.independent_verifier_recall.response_sha256);
  assert.equal(a.tinfoil.result, 'success');
  assert.equal(a.tinfoil.attestation.verified, true);
  assert.equal(a.source.future_outcome_data_used, false);
});

test('production outcome is an exact no-trade replay with no open exposure', async () => {
  const d = await json('artifacts/production-decision-2026-11-07.json');
  assert.equal(d.paper_decision, 'NO_TRADE');
  assert.equal(d.candidate_count, 0);
  assert.deepEqual(d.rejection_reasons, {
    NO_POSITIVE_NET_VALUE_AFTER_ASK_AND_MODELED_FEE: 11,
    FRESH_SPORTSBOOK_CONSENSUS_MISSING: 2
  });
  assert.equal(d.independent_replay.rejection_map_matches_saved_observation, true);
  assert.equal(d.paper_wallet.cash_balance_usd, 100);
  assert.equal(d.paper_wallet.open_exposure_usd, 0);
  assert.equal(d.paper_wallet.max_exposure_usd, 5);
  assert.equal(d.telegram_receipt.observation_id, 'polymarket-us-2026-11-07-20261107171556035');
  assert.equal(d.telegram_receipt.current_1930_observation_sent, false);
});
