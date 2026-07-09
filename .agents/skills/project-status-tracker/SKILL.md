---
name: project-status-tracker
description: Tracks overall project status using a deliverable checklist. Use when the user requests to 'check project status', 'run project status tracker', or 'track deliverables'.
---

# project-status-tracker

## Overview

This skill tracks the overall status of the BMad project by scanning the workspace for key deliverables, planning artifacts, and implementation progress. Act as a Project Manager assistant. Use when the user requests to check project status or track deliverables. Produces a structured project status report with a dynamic milestone checklist, saving the results to `{workflow.output_path}`.

## Conventions

- Bare paths (e.g. `assets/status-report-template.md`) resolve from the skill root.
- `{skill-root}` resolves to this skill's installed directory (where `customize.toml` lives).
- `{project-root}`-prefixed paths resolve from the project working directory.
- `{skill-name}` resolves to the skill directory's basename.

## On Activation

### Step 1: Load Config

Load available config from `{project-root}/_bmad/config.toml` and `{project-root}/_bmad/config.user.toml` (root level and `modules.bmm` / `modules.bmb` sections). Resolve and bind the following variables to their configured paths:
- `{planning_artifacts}`: Resolved from `modules.bmm.planning_artifacts` (Default: `{project-root}/_bmad-output/planning-artifacts`)
- `{implementation_artifacts}`: Resolved from `modules.bmm.implementation_artifacts` (Default: `{project-root}/_bmad-output/implementation-artifacts`)

### Step 2: Execute Append Steps

Execute each entry in `{workflow.activation_steps_append}` in order before entering the workflow's first stage.

---

## Workflow Stages

### Stage 1: Scan Deliverables

Scans the resolved `{planning_artifacts}` and `{implementation_artifacts}` folders for existing files and folders.
- **Note paths for scanning; do not read large contents yet.** Let the list of file names and extensions drive your initial assessment.
- Check for files matching key BMad Method milestones:
  - Phase 1 (Analysis): `brainstorming-*`, `market-research-*`, `domain-research-*`, `technical-research-*`, `product-brief.md`, `prfaq.md`
  - Phase 2 (Planning): `prd.md`, `ux-design.md`
  - Phase 3 (Solutioning): `architecture.md`, `epics-and-stories.md`, `readiness-report.md`
  - Phase 4 (Implementation): `sprint-status.md`, `story-*.md`, `story-validation-*.md`, `test-suite-*`, `retrospective-*.md`

### Stage 2: Checklist Mapping & Auditing

Map the scanned files against the slots defined in `{workflow.status_report_template}`.
- For each deliverable, mark its status:
  - `[x]` **Completed**: The file exists, is non-empty, and contains structured content matching the deliverable's purpose.
  - `[/]` **In Progress**: Draft files or active tracking files (e.g., `sprint-status.md` or active `story-*.md` files with uncompleted tasks) exist.
  - `[ ]` **Not Started**: No matching files found.
- Formulate a concise 1-2 sentence `summary` of the project's overall health and current active phase.
- Identify the **Next Recommended Action** by finding the earliest incomplete required milestone in the sequence (following BMad Method's standard flow: Analysis → Planning → Solutioning → Implementation).

### Stage 3: Compile and Output Report

Create the final project status report:
1. Read the template file from `{workflow.status_report_template}`.
2. Replace the template tokens (`{project_name}`, `{date}`, `{summary}`, `{next_recommended_action}`) with resolved values.
3. For each checkbox slot, replace `- [ ]` with the appropriate status (`- [x]`, `- [/]`, or `- [ ]`) according to the audit findings.
4. Write the compiled markdown content to `{workflow.output_path}`.
5. Present the completed status report and a summary of recommendations directly to the user.
