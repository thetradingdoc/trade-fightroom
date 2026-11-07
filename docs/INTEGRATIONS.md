# Integration notes

## Superlinked

The demonstrated path used the official JavaScript SDK against hosted SIE with the entity-extraction model recorded in the sanitized artifact. It returned names with character offsets checked against the exact input.

References: [SIE documentation](https://superlinked.com/docs), [integrations](https://superlinked.com/docs/integrations), [SDK reference](https://superlinked.com/docs/reference/sdk).

## Cognee Cloud

The demonstrated path authenticated to a private Cognee Cloud tenant, wrote the dated source note, and read it back in two separate retrieval requests. Tenant URL and identity are deliberately not published. Configure a tenant URL locally through COGNEE_BASE_URL; keep secrets in an ignored .env file or secret manager.

Reference: [Cognee API reference](https://docs.cognee.ai/api-reference/introduction).

## Tinfoil

The demonstrated path used the official Tinfoil SDK and verified enclave attestation before treating the response as attested. The prompt was limited to summarizing a public roster correction. Attestation says where inference ran; it does not establish that a prediction is accurate or profitable.

## Local configuration

Copy .env.example to an ignored local .env and fill only provider values you independently configure. No API key is required to run this repository's fixture checks. Never commit credentials, private tenant URLs, user IDs, Telegram chat IDs, raw market books, or private production data.
