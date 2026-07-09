---
name: debug-apf-prod
description: Try to fix bug by inspecting the log files in staging
---

DO NOT TRY TO INSPECT LOCAL *.log files for this.

You have access to logs created by all the cloud run service in the staging environment. For example, they can be accessed with following commands:

AI tier: [AI Logs](https://console.cloud.google.com/logs/query;query=resource.type%20%3D%20%22cloud_run_revision%22%0Aresource.labels.service_name%20%3D%20%22apf-prod-ai%22%0Aresource.labels.location%20%3D%20%22us-central1%22%0A%20severity%3E%3DDEFAULT;storageScope=project;cursorTimestamp=2026-06-22T14:50:14.131863Z;duration=P1D?project=agenticproductfoundry-489717)
API tier: [API Logs](https://console.cloud.google.com/logs/query;query=resource.type%20%3D%20%22cloud_run_revision%22%0Aresource.labels.service_name%20%3D%20%22apf-prod-api%22%0Aresource.labels.location%20%3D%20%22us-central1%22%0A%20severity%3E%3DDEFAULT;storageScope=project;cursorTimestamp=2026-06-22T14:50:14.131863Z;duration=P1D?project=agenticproductfoundry-489717)
UI tier: [[UI Logs]](https://console.cloud.google.com/logs/query;query=resource.type%20%3D%20%22cloud_run_revision%22%0Aresource.labels.service_name%20%3D%20%22apf-prod-ui%22%0Aresource.labels.location%20%3D%20%22us-central1%22%0A%20severity%3E%3DDEFAULT;storageScope=project;cursorTimestamp=2026-06-22T14:50:14.131863Z;duration=P1D?project=agenticproductfoundry-489717)

When asked to troubleshoot an issue take the following steps:

1. If there is a specific tier explicitly referenced in the instructions (e.g. ai, api, ui) then start inspection of log files for that tier first.
2. If there is conclusive evidence of error in the logs, plan the fix and present the plan.
3. If there is no conclusive evidence, inspect the other logs.
