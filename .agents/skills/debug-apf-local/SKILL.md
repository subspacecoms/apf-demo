---
name: debug-apf-local
description: Try to fix bug by inspecting the log files
---

You have access to log files created by all the processes in the application. For example, they can be accessed with following commands:

AI tier: tail logs/ai.log
API tier: tail logs/api.log
UI tier: tail logs/ui.log
Runner/adk tier: tail logs/adk.log

When asked to troubleshoot an issue take the following steps:

1. If there is a specific tier explicitly referenced in the instructions (e.g. ai, adk, api, ui) then start inspection of log files for that tier first.
2. If there is conclusive evidence of error in the log file, plan the fix and present the plan.
3. If there is no conclusive evidence, inspect the other log files.
