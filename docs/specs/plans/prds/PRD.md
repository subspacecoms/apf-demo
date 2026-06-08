---
title: "Product Requirements Document: Remote Field"
status: final
created: 2026-06-03
updated: 2026-06-03
---

# PRD: Remote Field

## 0. Document Purpose

This Product Requirements Document (PRD) defines the functional and non-functional requirements for the **Remote Field**, an autonomous orchestration system for agentic software development. It targets developers building the engine, product managers configuring developer workflows, and QA engineers verifying agent behaviors. 

This document builds upon the [Remote Field Product Brief](file:///usr/local/google/home/sumeetsing/workspace/rig/docs/spec/planning-artifacts/briefs/brief-delta-product-foundry-2026-06-03/brief.md) and its [Technical Addendum](file:///usr/local/google/home/sumeetsing/workspace/rig/docs/spec/planning-artifacts/briefs/brief-delta-product-foundry-2026-06-03/addendum.md).

## 1. Vision

Remote Field is an enterprise-grade, commercial orchestration framework designed to showcase the full power of agentic software development on Google Cloud Platform. By leveraging GCP's native serverless infrastructure (Cloud Run, Cloud Build, Firestore), the harness provides a secure, cost-effective, and highly scalable environment for deploying autonomous AI developer squads. It bridges the gap between project management (GitHub Projects) and automated code delivery, enabling organizations to dramatically accelerate engineering throughput by automating routine tasks, code quality enforcement, and serialized merges, while maintaining safety through configurable Human-in-the-Loop (HITL) gates.

## 2. Target User

### 2.1 Primary Persona: Dave, the DevEx (Developer Experience) Architect
Dave manages developer productivity and tooling at a mid-to-large technology company. His team uses GitHub and hosts their infrastructure on GCP. 

**His Goal**: Dave is tasked with evaluating AI agents to automate routine software development tasks (boilerplate, bug fixes, dependency updates) but is blocked by security, cost control, and code quality concerns. He needs a reference framework that fits their corporate governance.

### 2.2 Jobs To Be Done (JTBD)
- **Automate the Routine Safely**: *“I want to delegate routine tasks to autonomous agents, but only if I can guarantee they won't pollute our repository or commit untested code.”*
- **Minimize Idle Infrastructure Costs**: *“I want to run agent workloads without paying for idle VMs; I need a serverless setup that scales to zero when no tasks are active.”*
- **Establish Clear Quality Guardrails**: *“I need to ensure agent-written code is subjected to the same strict tests, linting, and design reviews (like SOLID checks) that our human developers go through.”*
- **Maintain Control & Visibility**: *“I want to see exactly what the agent is doing and retain the ability to step in (Human-in-the-Loop) if the agent gets stuck, without having to dig through server logs.”*

### 2.3 Key User Journeys

#### **UJ-1. Dave configures Remote Field for a new repository (UI-Onboarding)**
* **Persona + Context**: Dave wants to enable autonomous development on a new or empty repository.
* **Entry State**: Dave has a GCP project, a GitHub repository, and has just navigated to the hosted RIG Console web UI.
* **Path**:
  1. Dave logs into the **RIG Console** (using Google/GitHub OAuth) and clicks "Connect New Repository".
  2. The console guides Dave to authorize access to his GCP Project ID, then deploys the Webhook Receiver and Firestore instances in Dave's GCP project.
  3. **VCS Connection**: Dave connects the repository. He can choose to authorize via **GitHub OAuth** (fully automated) or manually paste a **GitHub Personal Access Token (PAT)** with repository scopes. The console configures the Webhook and saves the credentials into Dave's GCP Secret Manager.
  4. The RIG Console displays a **Configuration Form**. Dave selects his target language stack, enters the test/lint commands, and selects the agent container images he wants to use.
  5. Dave clicks "Initialize Repository". The RIG Console generates the `rig.yaml` file and commits it directly to the repository's default branch.
* **Climax**: The RIG Console displays a green "Engine Active" status indicator, confirming that the webhook handshake was successful and the repository is ready to receive tasks.
* **Resolution**: The repository is initialized; Dave can now add tasks to his GitHub Project board.

#### **UJ-2. Spec-Driven Feature Development (Complete Loop)**
* **Persona + Context**: Dave wants to add a new "Password Reset" feature to his service using Spec-Driven Development.
* **Entry State**: Dave has written a feature specification file (`specs/password-reset.md`) and is ready to push it. The harness is active.
* **Path**:
  1. **Spec Commit**: Dave commits and pushes `specs/password-reset.md` to the repository's `main` branch.
  2. **Decomposition Phase**: The webhook triggers the Webhook Receiver, which launches the **Planner Agent** (Cloud Run Job).
  3. The Planner Agent reads the spec, analyzes the codebase, decomposes the feature into a hierarchy of **Epics, Stories, and Tasks**, and automatically creates them as linked issues on the GitHub Project board.
  4. **Execution Phase**: The system claims the first task. The Webhook Receiver launches the `Implementer` agent (Cloud Run Job) for Task #1.
  5. Dave monitors progress in the **RIG Console**, viewing live execution logs as the agent clones the repo, creates a branch (`rig/task-1`), implements the task, runs lints/tests locally, and creates a PR.
  6. The **Coordination Agent** detects the PR, queues it, spawns the **Merge Verification Agent** to verify it locally, and merges it.
  7. The loop repeats automatically for the remaining tasks in the queue.
* **Climax**: All tasks generated from the spec are completed and merged. Dave sees the entire "Password Reset" feature fully implemented in `main`, and the RIG Console shows the feature run status as "Success".
* **Resolution**: The feature is delivered; the agent environment scales back to zero.

#### **UJ-3. Human-in-the-Loop Clarification & Loop Control (with Self-Resolution)**
* **Persona + Context**: The agent encounters a blocking ambiguity during implementation and attempts self-resolution before escalating to Dave.
* **Entry State**: The `Implementer` agent is running a Cloud Run Job for Task #3 ("Connect to Database").
* **Path**:
  1. **Blocker Ambiguity**: The agent realizes the database connection parameters (SSL mode) are not specified in the task or config, and it cannot safely guess.
  2. **Self-Resolution Trigger**: Instead of halting immediately, the harness comments on GitHub Issue #3: *"Blocking ambiguity detected. Invoking AnswerInfoFinder agent to search for resolution..."* and launches the `AnswerInfoFinder` sub-agent.
  3. **Self-Resolution Failure**: The `AnswerInfoFinder` searches the codebase and related specs but cannot find the SSL config.
  4. **Halt & Notify**: Having failed self-resolution, the harness comments on the issue listing the specific missing details, tags it `needs-info`, moves the card to `Blocked`, and terminates the run.
  5. The **RIG Console** displays the "Blocked" status. Dave gets the notification and can unpause by:
     * **Path A (GitHub)**: Replying to the GitHub Issue comment with the SSL configuration and adding `/resume` in his comment.
     * **Path B (Console)**: Opening the RIG Console active run page, typing the SSL mode in the input prompt, and clicking "Resume".
  6. The system resets the Firestore iteration counter and triggers a new `Implementer` job.
* **Climax**: The new agent runs, reads the SSL parameters, establishes the database connection, passes tests, and submits the PR. The RIG Console status updates to "PR Created".
* **Resolution**: The task is unblocked and execution resumes autonomously. (Note: If the `AnswerInfoFinder` had succeeded in step 3, it would have logged the resolution/thinking comment, tagged the issue `auto-clarified`, and resumed coding without halting).

#### **UJ-4. Coordination Agent Resolves Merge Conflict (Serialized Merge)**
* **Persona + Context**: Parallel agent executions result in overlapping code edits, causing a merge conflict in the queue.
* **Entry State**: The `Implementer` agent finishes Task #4 and submits PR #4. Another task (PR #3) has just been merged into `main`.
* **Path**:
  1. **Queueing**: The **Coordination Agent** detects PR #4 and adds it to the Firestore FIFO merge queue. The **RIG Console** shows PR #4 in status: "Queued (Position 1)".
  2. **Conflict Detection**: The Coordination Agent pulls PR #4, attempts to rebase it on `main`, but git detects a merge conflict.
  3. **Redelegation (Attempt 1)**: The Coordination Agent updates PR #4's status to "Resolving Conflict (Attempt 1/3)" in the console, increments the `Merge Fail Counter` in Firestore, and spawns an `Implementer` agent (Cloud Run Job) with instructions to resolve the conflict against `main`.
  4. The `Implementer` resolves the conflict, runs local verification tests successfully, and updates PR #4.
  5. **Merge Verification**: The Coordination Agent detects the update and spawns the **Merge Verification Agent** (Cloud Run Job) to verify the rebased PR #4 locally.
  6. The verification passes. The Coordination Agent merges PR #4.
* **Climax**: Dave sees the RIG Console update PR #4's status to "Merged" and the task moves to "Done" on the Project board, all without Dave having to manually resolve the git conflict.
* **Resolution**: Both tasks are successfully integrated into `main`. 
  * *Edge Case (Local Failure)*: If the `Implementer` fails to resolve the conflict after 3 attempts, the Coordination Agent tags the PR `merge-conflict`, comments on the PR, pauses the queue for that branch, and alerts Dave.
  * *Edge Case (Global Drift)*: If 5 other unrelated PRs are successfully merged while PR #4 is attempting conflict resolution, the engine halts the queue for PR #4 and alerts Dave for manual intervention to prevent working on stale code.

## 3. Glossary

* **Remote Field**: The core orchestration system that coordinates the end-to-end agentic software development lifecycle on GCP.
* **RIG Console**: The hosted web interface used for project onboarding, credential setup, workflow configuration, and real-time execution monitoring.
* **Feature Specification (Spec)**: A markdown document committed to the repository that describes a feature's requirements, acting as the trigger for the planning phase.
* **Planner Agent**: An autonomous agent responsible for parsing a Feature Specification and decomposing it into a hierarchy of Epics, Stories, and Tasks.
* **Task**: The smallest unit of work generated by the Planner Agent, corresponding to a single GitHub Issue and Kanban card.
* **Implementer Agent**: An ephemeral agent that claims a Task, sets up a local repository branch, writes code, verifies it against quality gates, and submits a Pull Request (PR).
* **Coordination Agent**: The central agent that manages the serialization of PR merges using a Firestore-backed queue.
* **Merge Verification Agent**: An ephemeral agent spawned by the Coordination Agent to execute fast, local tests on a rebased PR branch before merging.
* **AnswerInfoFinder Agent**: A specialized sub-agent invoked by the Implementer to resolve blocking ambiguities by searching codebase context before escalating to a human.
* **rig.yaml**: The repository-level configuration file that defines target agent images, lint rules, and test execution commands.
* **Merge Fail Counter**: A Firestore-persisted counter tracking the number of conflict resolution attempts (max 3) for a specific task.
* **Global Drift Threshold**: The limit (5 successful merges of other PRs) after which a pending PR undergoing conflict resolution is paused for manual review.

## 4. Features

### 4.1 Feature: Repository Onboarding & Configuration (RIG Console)
**Description**: The RIG Console web application provides a wizard-like interface for Dave to connect his GCP project, register repositories, set up credentials, and create the initial `rig.yaml` execution configuration.

**Functional Requirements**:
* **FR-1**: Dave can connect and authorize his GCP Project within the RIG Console. 
  * *Testable Consequence*: RIG Console provisions the required Cloud Run Services, Jobs, and Firestore collections in Dave's project within 5 minutes of authorization.
* **FR-2**: Dave can authenticate his GitHub account via OAuth or manually paste a Personal Access Token (PAT). 
  * *Testable Consequence*: The system generates a webhook secret, registers a repository webhook on GitHub, and stores both the PAT and Webhook Secret in GCP Secret Manager.
* **FR-3**: Dave can define language-specific execution commands (tests, lints) and agent image URLs via a UI Form. 
  * *Testable Consequence*: RIG Console generates a valid `rig.yaml` file and commits it directly to the repository's default branch.

### 4.2 Feature: Spec-Driven Backlog Generation (Planner Agent)
**Description**: Decomposing feature specifications into structured developer tasks. The entry point of the development loop starts by pushing a markdown specification file.

**Functional Requirements**:
* **FR-4**: The system detects new commits containing files in the `specs/` directory. 
  * *Testable Consequence*: Cloud Run Webhook Receiver validates the webhook signature and launches the `Planner Agent` Cloud Run Job.
* **FR-5**: The `Planner Agent` parses the specification file and breaks it down into a hierarchical list of Epics, Stories, and Tasks.
* **FR-6**: The `Planner Agent` automatically creates the decomposed backlog on GitHub. 
  * *Testable Consequence*: GitHub Issues are created for each Epic, Story, and Task, linked via markdown references, and mapped to the GitHub Project board in the "To Do" column.

### 4.3 Feature: Task Execution Runner (Implementer Agent)
**Description**: The ephemeral environment that executes coding tasks when they are assigned or moved to the "To Do" queue.

**Functional Requirements**:
* **FR-7**: The system detects task state changes on the GitHub Project board. 
  * *Testable Consequence*: Moving a Task card to "To Do" triggers a webhook that launches the `Implementer` Cloud Run Job.
* **FR-8**: The `Implementer` agent clones the repository, creates a task-specific branch (`rig/task-[id]`), and parses the issue requirements.
* **FR-9**: The agent modifies the codebase to implement the requirements.
* **FR-10**: The agent verifies the code using lints and tests defined in `rig.yaml`. 
  * *Testable Consequence*: Code changes must pass the configured commands (exit code 0) inside the container.
* **FR-11**: The agent creates a GitHub Pull Request (PR) targeting `main` upon successful verification.

### 4.4 Feature: Ambiguity Resolution & HITL (AnswerInfoFinder)
**Description**: Self-healing loops for requirements ambiguity, with fallback human-in-the-loop (HITL) triggers.

**Functional Requirements**:
* **FR-12**: The `Implementer` agent invokes the `AnswerInfoFinder` sub-agent if it encounters missing context. 
  * *Testable Consequence*: The harness posts a comment on the GitHub Issue: *"Blocking ambiguity detected. Invoking AnswerInfoFinder..."*
* **FR-13**: If the `AnswerInfoFinder` finds the resolution in the codebase/specs, it updates the run. 
  * *Testable Consequence*: The agent comments with the resolution and thinking process, tags the issue `auto-clarified`, and the `Implementer` resumes coding.
* **FR-14**: If the sub-agent fails, the system halts execution. 
  * *Testable Consequence*: The agent posts the detailed gap list, tags the issue `needs-info`, moves the board card to `Blocked`, logs "Blocked" to the RIG Console, and terminates the Cloud Run Job.
* **FR-15**: Dave can resume a blocked task via GitHub or the Console UI. 
  * *Testable Consequence*: Commenting `/resume` on GitHub or clicking "Resume" in the RIG Console resets the Firestore iteration counter and triggers a new `Implementer` job.

### 4.5 Feature: Serialized PR Merger (Coordination & Verification)
**Description**: Serializing PR merges to prevent conflicts, using local container verification and structured conflict resolution.

**Functional Requirements**:
* **FR-16**: The `Coordination Agent` queues incoming PRs in a FIFO queue in Firestore. 
  * *Testable Consequence*: The RIG Console displays the merge queue and position in real-time.
* **FR-17**: The `Coordination Agent` rebases the next PR on `main` and spawns a `Merge Verification Agent` (Cloud Run Job) to run validation tests locally.
* **FR-18**: If a merge conflict occurs during rebase, the agent redelegates conflict resolution to the `Implementer` agent, incrementing the Firestore `Merge Fail Counter`.
* **FR-19**: The Coordination Agent halts merging and requests human review when thresholds are hit. 
  * *Testable Consequence*: If the counter reaches 3, or if the PR falls behind `main` by $\ge 5$ successful merges, the PR is tagged `merge-conflict`, the merge queue for that branch is paused, and Dave is alerted.

### 4.6 Feature: Continuous Integration, Deployment & E2E Verification (CI/CD)
**Description**: The Remote Field coordinates both pre-merge verification and post-merge deployment to ensure code changes are validated via E2E integration tests before and after entering the `main` branch.

**Functional Requirements**:
* **FR-20**: Open PRs that pass unit tests and lints automatically trigger an isolated ephemeral staging deployment in GCP to run E2E verification tests in parallel. 
  * *Testable Consequence*: Cloud Build deploys the PR branch to an isolated ephemeral URL. E2E tests are executed against this URL. The number of concurrent ephemeral environments is capped by a configurable threshold (e.g., max 5). If the cap is reached, the system falls back to queuing the E2E verification or executing it on a shared, static integration environment.
* **FR-21**: Merging a PR into `main` automatically triggers a Cloud Build staging/production deployment pipeline. 
  * *Testable Consequence*: The application is built and deployed to the shared staging environment within 10 minutes of a merge commit on `main`.
* **FR-22**: The pipeline automatically runs post-merge E2E integration tests against the shared staging deployment. 
  * *Testable Consequence*: E2E test results are reported to the RIG Console and logged against the corresponding Feature Spec run history.
* **FR-23**: The system freezes the merge queue and alerts the user if post-merge staging E2E tests fail (regression detected). 
  * *Testable Consequence*: The Coordination Agent changes its queue status to "Frozen" in Firestore, blocks all pending PR merges, creates a high-priority "Regression Detected" issue on GitHub, and alerts Dave. The queue remains frozen until a human manually unfreezes it or a fix is merged.

## 5. Non-Goals (Explicit)

* **Self-Healing Infrastructure**: The Remote Field will not autonomously modify GCP resource definitions (e.g., editing Terraform, changing IAM permissions, resizing Cloud Run Jobs) in V1.
* **Non-GitHub VCS Support**: The system will not support GitLab, Bitbucket, or self-hosted Git servers in V1.
* **Complex Multi-Agent Negotiations**: We will not support agent task bidding or complex negotiation loops. Agent interactions are kept to linear, structured handoffs.
* **Multi-Tenant SaaS Execution**: While the RIG Console is a hosted portal, the actual agent execution compute and databases must run entirely within the user's GCP tenant (no shared SaaS compute runner) to maintain security boundaries.

## 6. MVP Scope

### 6.1 In Scope (V1)
* **RIG Console Web UI**: Onboarding portal, secret manager binding, live streamed agent logs, and "Resume" controls.
* **Automated GCP Infrastructure**: Provisioning via Terraform module for customer GCP projects.
* **Spec-Driven Backlog Generation**: Spec push to GitHub -> Planner Agent -> Epic/Story/Task decomposition -> GitHub Issues.
* **Ephemeral Task Execution**: Implementer Agent running as a Cloud Run Job.
* **Static Analysis Integration**: Configurable via `rig.yaml` in the target repo.
* **Self-Healing Ambiguity**: `AnswerInfoFinder` sub-agent execution before human escalation.
* **Serialized Merge Queue**: Coordination Agent + Merge Verification Agent (Firestore FIFO queue).
* **Parallel E2E Verification**: Capped ephemeral deployments (max 5) on Cloud Run with shared fallback (integration/main branch).
* **"Freeze Queue" Safety Valve**: Automated merge lock on post-merge staging E2E test failures.

### 6.2 Out of Scope (V1)
* **Automated Git Rollback**: Automatic rollback of regression-introducing commits on staging failure (requires manual rollback or fix in V1).
* **Third-Party Notifications**: Direct Slack/Teams messaging integrations.
* **Multi-Repo Orchestration**: Cross-repository dependencies or multi-repo mapping (1-to-1 only).

## 7. Success Metrics

* **Zero-Touch Merges**: Percentage of Spec-generated tasks that implement, pass lints/tests, and merge into `main` without human code edits (Target: >75%).
* **E2E Integration Success**: Percentage of merged agent PRs that pass E2E tests on staging without triggering a queue freeze (Target: >95%).
* **Onboarding Time**: Time required for a user to log into RIG Console, connect a new repo, and trigger the first run (Target: <15 minutes).
* **Idle Cost**: Daily infrastructure cost of the Remote Field when the task queue is empty (Target: $0.00/day, excluding base storage/Secret Manager minimal costs).
* **Counter-Metric (Quality vs. Speed)**: Merge speed must not compromise codebase health. The system must never bypass configured lints, tests, or SOLID reviews to accelerate queue throughput.

## 8. Open Questions

1. **GitHub Projects API Stability**: GitHub Projects (beta) has evolving GraphQL APIs. How do we ensure the Webhook receiver remains compatible with API changes?
2. **SaaS-to-Tenant Auth**: If the RIG Console is hosted by us but deploys resources in the customer's GCP project, what is the exact OAuth role/permission mapping required for the deployment service account to minimize security privileges?
3. **Staging Database Isolation**: How do we handle database migrations in parallel ephemeral staging environments? Do we provision a fresh database instance per preview deploy, or use separate schemas on a shared database?

## 9. Assumptions Index

* `[ASSUMPTION: FR-1]`: The user's GCP project has sufficient quotas enabled to spin up Cloud Run Jobs/Services and Firestore without manual support tickets.
* `[ASSUMPTION: UJ-2.5]`: Live log streaming to the RIG Console UI is implemented via Server-Sent Events (SSE) or WebSockets reading from Cloud Logging (via a Firestore/PubSub bridge).
* `[ASSUMPTION: FR-20]`: Ephemeral staging deployments do not require custom domain mapping; standard GCP-generated Cloud Run service URLs are sufficient for E2E tests.
