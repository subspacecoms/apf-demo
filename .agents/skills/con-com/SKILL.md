---
name: con-com
description: Commit and push files
---
# Conventional Commit Workflow

## Steps

### 1. Determine Branch Name
Based on the files that are currently staged or unstaged, create a short branch name: `feature/{some-name}`.

### 2. Isolate Changes to New Branch
If currently on the `main` branch:
1. Stash the current changes.
2. Create and switch to a new branch `feature/{branch-name}`.
3. Unstash the changes onto the new branch.

### 3. Commit and Push Changes
Commit the staged changes with a Conventional Commit message, push the branch, and create a PR to `main` with the label `patch`.

### 4. Squash Merge and Delete Branch
Accept and squash-merge the newly created PR, then delete the PR branch.

### 5. Sync Main Branch
Switch back to the `main` branch, run `git pull`, and execute a git fetch prune.
