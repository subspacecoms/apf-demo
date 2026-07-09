---
name: branch-off
description: Take current work and move it to a different branch to isolate it
---

# Branch Off Workflow

## Steps

### 1. Determine Branch Name
Based on the files that are currently staged or unstaged, create a short branch name: `feature/{some-name}`.

### 2. Isolate Changes to New Branch
If currently on the `main` branch:
1. Stash the current changes.
2. Create and switch to a new branch `feature/{branch-name}`.
3. Unstash the changes onto the new branch.