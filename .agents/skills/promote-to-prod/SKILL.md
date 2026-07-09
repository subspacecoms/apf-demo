---
name: promote-to-prod
description: Promote the latest staging release to production for APF services (UI, API, AI)
---

This skill guides you through promoting the latest release from staging to production.

### Prerequisites
You need the version number you want to promote (e.g., `1.0.39`). 
If you don't know the version, you can find it by checking the image tags of the running staging services:
```bash
gcloud run services list --project=agenticproductfoundry-489717 --region=us-central1 --format="table(name, image)"
```
Look for `apf-stg-*` services and note the version tag (e.g., `v1.0.39`).

### Step 1: Verify Releases Exist in Cloud Deploy
Before promoting, ensure the releases exist in Cloud Deploy for the target version (formatted with dashes, e.g., `v1-0-39` for `1.0.39`).

```bash
gcloud deploy releases list --delivery-pipeline=apf-ui-pipeline --region=us-central1 --project=agenticproductfoundry-489717 --filter="name:release-ui-v<VERSION_WITH_DASHES>" --format="value(name)"
gcloud deploy releases list --delivery-pipeline=apf-api-pipeline --region=us-central1 --project=agenticproductfoundry-489717 --filter="name:release-api-v<VERSION_WITH_DASHES>" --format="value(name)"
gcloud deploy releases list --delivery-pipeline=apf-ai-pipeline --region=us-central1 --project=agenticproductfoundry-489717 --filter="name:release-ai-v<VERSION_WITH_DASHES>" --format="value(name)"
```
Replace `<VERSION_WITH_DASHES>` with the version (e.g., `1-0-39`).

### Step 2: Promote Releases to Production
Promote the releases for all three pipelines to the `apf-production` target.

```bash
gcloud deploy releases promote --release=release-ui-v<VERSION_WITH_DASHES> --delivery-pipeline=apf-ui-pipeline --region=us-central1 --project=agenticproductfoundry-489717 --to-target=apf-production --quiet
gcloud deploy releases promote --release=release-api-v<VERSION_WITH_DASHES> --delivery-pipeline=apf-api-pipeline --region=us-central1 --project=agenticproductfoundry-489717 --to-target=apf-production --quiet
gcloud deploy releases promote --release=release-ai-v<VERSION_WITH_DASHES> --delivery-pipeline=apf-ai-pipeline --region=us-central1 --project=agenticproductfoundry-489717 --to-target=apf-production --quiet
```

### Step 3: Approve the Rollouts
Since the `apf-production` target requires approval, you must approve the newly created rollouts. The rollout name typically follows the pattern: `release-<service>-v<VERSION_WITH_DASHES>-to-apf-production-0001`.

```bash
gcloud deploy rollouts approve release-ui-v<VERSION_WITH_DASHES>-to-apf-production-0001 --delivery-pipeline=apf-ui-pipeline --release=release-ui-v<VERSION_WITH_DASHES> --region=us-central1 --project=agenticproductfoundry-489717 --quiet
gcloud deploy rollouts approve release-api-v<VERSION_WITH_DASHES>-to-apf-production-0001 --delivery-pipeline=apf-api-pipeline --release=release-api-v<VERSION_WITH_DASHES> --region=us-central1 --project=agenticproductfoundry-489717 --quiet
gcloud deploy rollouts approve release-ai-v<VERSION_WITH_DASHES>-to-apf-production-0001 --delivery-pipeline=apf-ai-pipeline --release=release-ai-v<VERSION_WITH_DASHES> --region=us-central1 --project=agenticproductfoundry-489717 --quiet
```

### Step 4: Verify Deployment Status
Monitor the rollouts to ensure they transition to `IN_PROGRESS` and eventually `SUCCEEDED`.

```bash
gcloud deploy rollouts list --delivery-pipeline=apf-ui-pipeline --release=release-ui-v<VERSION_WITH_DASHES> --region=us-central1 --project=agenticproductfoundry-489717 --format="table(name, state)" --limit=1
gcloud deploy rollouts list --delivery-pipeline=apf-api-pipeline --release=release-api-v<VERSION_WITH_DASHES> --region=us-central1 --project=agenticproductfoundry-489717 --format="table(name, state)" --limit=1
gcloud deploy rollouts list --delivery-pipeline=apf-ai-pipeline --release=release-ai-v<VERSION_WITH_DASHES> --region=us-central1 --project=agenticproductfoundry-489717 --format="table(name, state)" --limit=1
```
