---
name: release
description: Create a release proposal for the v2.x branch by cherry-picking commits from main
disable-model-invocation: true
argument-hint: "[version (optional, auto-determined from PR labels)]"
---

Create a v2.x release proposal. If a version is provided as $ARGUMENTS, use it. Otherwise, determine it automatically (see step 2).

## Prerequisites

The `branch-diff` tool must be installed globally:

```
npm install branch-diff -g
```

Fetch and fast-forward **both** branches before doing anything else. If you compare a
stale `v2.x` against a stale `main`, you get the wrong commit list without any warning:

```
git fetch origin && git checkout v2.x && git pull && git checkout main && git pull
```

## Steps

### 1. Identify commits to cherry-pick

Use the `branch-diff` tool to list commits on `main` not yet applied to `v2.x`:

```
branch-diff v2.x main
```

`branch-diff` prints GitHub issue-lookup errors to stderr and the commit list to stdout.
The PR number is in the trailing URL (`.../pull/112`). Don't parse it from the `(#NNN)`
form, because that also matches PR references that happen to appear in commit titles.

`branch-diff` compares commits, not content, so it reports **false positives**: commits
whose changes are already on `v2.x`. Don't cherry-pick these. They fall into these classes:

**a. Squash-merged releases.** Some releases were squash-merged instead of rebased.
Squashing strips the identity of every commit in them, so `branch-diff` keeps reporting
those commits forever. Treat all of the following as already released:

| Release | Proposal | PRs subsumed |
|---|---|---|
| 2.3.2 | #101 | 90, 91, 92, 94, 95, 96, 97, 98, 100 |

If you squash-merge another release proposal, add a row here. To get the subsumed PRs,
look at the `* ... (#NNN)` lines in the squash commit's message on `v2.x`.

**b. Superseded dependency bumps.** A Dependabot bump that never landed on `v2.x`, after
which `v2.x` got an equal or newer version of the same package directly. Cherry-picking
one would *downgrade* the branch. To spot these, compare the package's version in
`v2.x:package.json` with the bump's target, and skip the bump when `v2.x` is at or ahead
of it.

**c. Version bump commits on `main`** (e.g. "Bump package version on to 3.0.0-pre").
Never cherry-pick these onto `v2.x`.

Anything left after removing these classes is a real candidate. Age alone doesn't make a
commit a false positive; classify by the rules above.

Confirm the list of commits with the user before proceeding.

### 2. Determine the version number

If the user didn't provide a version, determine it from PR labels. For each commit being cherry-picked, extract the PR number from the commit message (e.g. `(#42)`) and check its labels:

```
gh pr view <number> --json labels --jq '.labels[].name'
```

- If any PR has a `semver-minor` label, the release is a **minor** bump.
- If all PRs have at most a `semver-patch` label, the release is a **patch** bump.

Labels are often missing, especially on hand-written PRs. Also look at each commit's
conventional-commit prefix: a `feat:` commit means a **minor** bump even without a
`semver-minor` label. If the labels and the prefixes disagree, point that out when you
confirm the version.

Get the current version from the tip of `v2.x` (the most recent version commit message), then compute the next version accordingly. Confirm the version with the user.

In the steps below, `$VERSION` refers to the determined version number.

### 3. Create a worktree

Create a git worktree from the current repo, checking out a new branch `v$VERSION-proposal` based on the `v2.x` branch:

```
git worktree add ../pprof-format-v2 -b v$VERSION-proposal v2.x
```

The path is usually still taken by the previous release's worktree. Once that proposal's
PR is merged, you can clear it. First check that the worktree is clean and the PR is
merged, then run:

```
git worktree remove ../pprof-format-v2 && git branch -D v<previous>-proposal
```

All subsequent steps run in the worktree directory.

### 4. Cherry-pick commits

Cherry-pick the agreed-upon commits in chronological order (oldest first):

```
git cherry-pick <hash1> <hash2> ...
```

If a cherry-pick has conflicts, stop and resolve with the user.

### 5. Verify the selection against `main`

Before bumping the version, diff the worktree against `main`:

```
git diff --stat main -- .
```

The goal is **minimal divergence**. Ideally only `package.json` and `package-lock.json`
show up, because `main` doesn't track the released version (its `version` field lags
behind `v2.x`). This check validates step 1. If any *other* file shows up, it means one of
two things:

- you wrongly classified a real commit as a false positive, so cherry-pick it, or
- the divergence is deliberate, so explain it in the PR body.

A class-(b) superseded bump correctly shows up as a `package.json` / `package-lock.json`
difference where `v2.x` is *ahead* of `main`. That is expected; leave it alone.

Also run `npm ci && npm test` in the worktree.

### 6. Create the version bump commit

Bump the version in package.json and package-lock.json using npm, then commit:

```
npm version $VERSION --no-git-tag-version
git add package.json package-lock.json
git commit -m "v$VERSION"
```

Keep this commit last on the branch. If you need another cherry-pick after this point,
drop the version commit (`git reset --hard HEAD~1`), apply the cherry-pick, then run the
bump again. Don't stack the new commit on top of the release commit.

### 7. Push and create a PR

Push the branch and create a PR targeting `v2.x`:

```
git push -u origin v$VERSION-proposal
```

Create the PR with `gh pr create --base v2.x`. The PR body should categorize the cherry-picked PRs by type, following this pattern:

```markdown
# New features
* #NNN

# Improvements
* #NNN

# Bug fixes
* #NNN

# Other (build, dev)
* #NNN
```

Only include sections that have entries. Reference PR numbers from the original commit messages.

See https://github.com/DataDog/pprof-format/pull/117 for an example.
