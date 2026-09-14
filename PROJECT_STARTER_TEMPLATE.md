# Reusable project setup and handover template

Use this document when starting a software project with Codex, Claude Code or another AI coding assistant. It establishes a clear brief, durable project memory and a repeatable way to resume work.

This is a template, not a description of the repository it happens to be stored in. Replace bracketed placeholders before using it. Remove sections that do not apply. Do not treat example features or commands as requirements.

## 1. How to use this template

1. Put a copy in the new project's root folder.
2. Complete the project brief in section 3. Start with what you know; mark unresolved decisions explicitly.
3. Give the assistant the setup prompt below.
4. Review the resulting files before treating the project scope as agreed.
5. Keep the brief, current status and development log in version control with the code.
6. At the end of meaningful work, update the handover so a future session can continue without access to the original conversation.

For an existing project, inspect its files and preserve established conventions. Merge these ideas into existing documentation rather than creating competing sources of truth.

### Initial setup prompt

> Read PROJECT_STARTER_TEMPLATE.md and inspect this workspace, including existing agent instructions and Git status. Use my completed brief to establish the project documentation described here. Preserve existing code, documentation and uncommitted changes. Replace placeholders only when supported by the brief or repository; mark unknowns honestly. Create or update AGENTS.md, CLAUDE.md, PROJECT_BRIEF.md, PROJECT_STATUS.md, DEVLOG.md and README.md. Record a small, testable first milestone. Ask about missing information only when it blocks a meaningful decision, and continue independent preparation where possible. Do not treat documentation setup as permission to implement the entire backlog, publish the project or introduce new services.

### Starting implementation

After reviewing the brief, give a concrete task:

> Implement milestone [name] from PROJECT_BRIEF.md. Read AGENTS.md and PROJECT_STATUS.md first, inspect the current code and working tree, and carry the task through appropriate validation. Update the handover with the result and any remaining work.

## 2. The project documentation system

| File | Purpose | When it changes |
| --- | --- | --- |
| `AGENTS.md` | Shared working instructions and constraints | When the working process or enduring constraints change |
| `CLAUDE.md` | Claude Code entry point importing the shared instructions | When Claude-specific setup changes |
| `PROJECT_BRIEF.md` | Product purpose, agreed scope and acceptance criteria | When requirements change; record the decision explicitly |
| `PROJECT_STATUS.md` | Concise current snapshot and next task | After meaningful work and before a handover |
| `DEVLOG.md` | Dated history of changes, decisions and validation | Append after meaningful work |
| `README.md` | How a person installs, runs and uses the project | When setup or usage changes |
| `.gitignore` | Generated files, local configuration and secrets excluded from Git | When tools or generated outputs change |

Optional files, only when useful:

- `docs/decisions/`: longer architectural decisions with context and alternatives.
- `docs/testing.md`: test setup too detailed for README or status.
- `docs/deployment.md`: environment and deployment procedures.
- `BACKLOG.md` or an issue tracker: larger prioritised task lists. Choose one primary backlog.
- `.env.example`: configuration variable names and safe example values, never real secrets.

If an existing project uses `CODEX_PROMPT.md` as its brief, retain that name and link to it. Do not duplicate the same requirements in two files that may drift apart.

### Using Codex and Claude Code interchangeably

Keep the shared working instructions in `AGENTS.md`. Create a root `CLAUDE.md` with this content:

```markdown
# Project instructions

@AGENTS.md

Use PROJECT_STATUS.md as the current handover. Follow the shared instructions above
and update the same status and development log after meaningful work.
```

Claude Code supports importing instruction files with `@path` syntax; this avoids maintaining a second copy of the project rules. See [Claude Code memory documentation](https://code.claude.com/docs/en/memory).

- Keep product requirements in `PROJECT_BRIEF.md`, independent of the coding tool.
- Both tools should read and update the same `PROJECT_STATUS.md` and `DEVLOG.md`.
- Keep `CLAUDE.md` small; put shared rules in `AGENTS.md`, with only necessary tool-specific additions in the entry point.
- Do not make `AGENTS.md` import `CLAUDE.md` back; avoid circular imports.
- Do not assume either tool can see the other's conversation or private memory. Record important decisions in the repository.
- Use the same resume prompts below with either tool. Explicitly asking it to read the handover also helps when automatic instruction loading is disabled.
- When switching tools, inspect Git status first. Preserve and explain any unfinished edits.
- If both tools work simultaneously, use separate branches/worktrees and coordinate changes before merging. Shared documentation alone does not prevent edit conflicts.

Existing `CLAUDE.md` files may contain important rules. Preserve those rules and reconcile overlaps before replacing anything with this small entry point.

## 3. Project brief template

Copy this section into `PROJECT_BRIEF.md` and customise it.

---

# [Project name] — project brief

## Purpose

[Describe the problem and the useful result in two or three sentences.]

## Intended users

- Primary users: [who will use this]
- Their technical experience: [beginner / mixed / technical]
- Main situation of use: [where, when and on which devices]
- Accessibility or language needs: [requirements]

## Main user journey

1. The user [starting action].
2. The application [response].
3. The user [next action].
4. Success means [observable outcome].

## First-release scope

| Capability | Expected behaviour | Acceptance check |
| --- | --- | --- |
| [Capability] | [Concrete behaviour] | [How to demonstrate it works] |
| [Capability] | [Concrete behaviour] | [How to demonstrate it works] |

## Out of scope for now

- [Feature deliberately deferred]
- [Integration or service not required]
- [Complexity to avoid]

These exclusions can change through an explicit requirement decision. They are not permanent prohibitions.

## Technical context

- Existing codebase or new project: [details]
- Language/framework: [existing choice, agreed choice or undecided]
- Package manager and lockfile: [details]
- Runtime versions: [details or where versions are declared]
- Target browsers/devices: [details]
- Hosting target: [local only / agreed platform / undecided]
- Backend requirement: [none / existing / needed / undecided]
- External services: [list and purpose, or none]
- Offline requirement: [required behaviour, or not required]

Prefer the existing stack when it meets the requirements. Do not add infrastructure solely because it might be useful later.

## Data and persistence

- Data the user creates: [description]
- Source of initial/reference data: [description]
- Storage location: [browser / files / database / undecided]
- Must survive: [refresh / browser restart / device change]
- Sharing and synchronisation: [requirements]
- Backup/export/import: [formats and requirements]
- Sensitive information: [categories and handling requirements]
- Retention/deletion: [expected behaviour]

Be precise: browser storage can survive a restart but normally does not transfer between devices or site origins. A saved state, a portable backup and synchronisation are different requirements.

## Assets and integrity constraints

- Canonical assets: [paths]
- Assets that may be edited: [paths or rules]
- Assets that must remain unchanged: [paths and reason]
- Required dimensions, geometry, units or formats: [details]
- Asset ownership/licensing: [known facts or unresolved questions]
- Accuracy requirements: [numeric tolerances or observable checks]

## Design and content

- Visual direction: [plain description]
- Existing design system: [reference, if any]
- Responsive priorities: [desktop / tablet / mobile]
- Terminology and spelling: [for example, Australian English]
- Loading, empty and error states: [expected behaviour]
- Keyboard and screen-reader expectations: [requirements]

## Failure behaviour

Describe what should happen when relevant failures occur:

- Invalid input: [behaviour]
- Missing or corrupted saved data: [behaviour]
- Storage unavailable or full: [behaviour]
- Network or external service unavailable: [behaviour]
- Import incompatible with current version: [behaviour]

Delete cases that do not apply. The application should explain failures usefully and preserve recoverable user work.

## Milestones

### Milestone 1 — [small usable outcome]

- Deliver: [specific scope]
- Validate: [observable checks]
- Complete when: [clear finish condition]

### Milestone 2 — [next usable outcome]

- Deliver: [specific scope]
- Validate: [observable checks]
- Depends on: [dependency]

### Later backlog

- [Possible improvement]
- [Possible improvement]

A backlog item is a recommendation, not an instruction to start implementing it.

## Open decisions

| Question | Why it matters | Needed before | Current assumption |
| --- | --- | --- | --- |
| [Question] | [Impact] | [Task/milestone] | [Assumption or unresolved] |

## Definition of done

A milestone is complete when:

- Its agreed acceptance checks pass.
- The user journey works, including relevant error and empty states.
- Appropriate build, type, lint and test checks pass, where configured.
- User data and existing behaviour are preserved as required.
- Documentation describes the actual resulting behaviour.
- Remaining limitations are recorded explicitly.
- Deployment is verified if deployment was part of the task.

## Requirement changes

Record material changes with date, reason and affected scope. Preserve the distinction between the original plan and later agreed decisions.

---

## 4. Agent instructions template

Copy this section into the root `AGENTS.md`. Adapt it to the project; retain any applicable existing instructions.

---

# Working on [project name]

## Begin each session

1. Read `PROJECT_STATUS.md`, the project brief and the latest `DEVLOG.md` entries.
2. Inspect the working tree, current branch and recent commits.
3. Check the actual implementation before relying on old status notes.
4. Preserve existing user changes and follow any applicable nested agent instructions.
5. Work on the user's current task. Treat recommendations and backlog items as context unless selected for implementation.
6. If documentation and code disagree, investigate and record the difference. Do not silently assume either is correct.

## Work within the agreed scope

- Preserve the project constraints recorded in the brief and status.
- Prefer the existing framework, conventions and dependencies.
- Keep changes focused on the requested outcome.
- Ask for missing information when it blocks correctness or a material decision; use reasonable judgement for routine reversible choices.
- Do not introduce new services, billing, public exposure or destructive migrations without applicable authorisation.
- Never write secrets or real credentials into code, documentation, screenshots or logs.
- Do not replace canonical assets or alter protected formats without an explicit requirement change.

## Validate the result

- Run the checks appropriate to the change; use the repository's actual commands.
- For UI changes, inspect the resulting interface where possible rather than relying only on compilation.
- For persistence changes, test the required lifecycle: refresh, restart, migration or import/export as applicable.
- Check important failure paths and preservation of user data.
- Do not report a check as passed unless it ran successfully. Distinguish historical evidence from fresh validation.
- For documentation-only changes, check accuracy, links and diffs; a full application build is not normally necessary.

## Keep durable project memory

After meaningful work:

1. Update `PROJECT_STATUS.md` with the current state, remaining issues, validation and next recommended task.
2. Append a dated `DEVLOG.md` entry explaining what changed and why.
3. Update README if setup, commands or user-facing behaviour changed.
4. Record material requirement changes explicitly.
5. Include documentation updates with the relevant commit when committing work.

Keep the status file a current snapshot. Keep the log chronological. Do not copy a full conversation into either.

## Finish accurately

- Distinguish local work, committed work, pushed work and deployed work.
- Do not claim deployment success based solely on a push or workflow start.
- Report unresolved failures and remaining limitations clearly.
- Provide the next useful action without implying it has already been authorised or completed.

---

## 5. Current status template

Copy this section into `PROJECT_STATUS.md`. Keep it short enough to read at the start of every session.

---

# [Project name] — current status

Last updated: [YYYY-MM-DD]

## Where we left off

[One paragraph describing the current usable state and most recent task.]

- Repository: [URL or not created]
- Branch: [name]
- Live site: [URL or not deployed]
- Last verified application deployment: [commit/run/date or none]
- Work currently in progress: [task or none]
- Uncommitted work at handover: [description or none; recheck Git next session]

## Completed and working

- [Behaviour actually implemented]
- [Behaviour actually implemented]

## Important decisions and constraints

- [Constraint and brief reason]
- [Persistence or compatibility decision]
- [Relevant change from the original brief]

## Known issues and limitations

| Issue | User impact | Evidence/location | Next action |
| --- | --- | --- | --- |
| [Issue] | [Impact] | [File, test or reproduction] | [Action] |

## Latest validation

Date: [YYYY-MM-DD]

| Check | Result | Scope/limitations |
| --- | --- | --- |
| [Command or manual check] | [Passed / failed / not run] | [What was tested] |
| [Deployment check] | [Result] | [URL, revision or workflow] |

These results apply to the revision and date recorded above. Rerun relevant checks after subsequent code changes.

## Running and testing

- Install: `[actual command]`
- Development: `[actual command]`
- Build: `[actual command]`
- Tests: `[actual command]`
- Required configuration: [variable names and setup reference, no secrets]
- Test prerequisites: [browser, fixtures, services or none]

## Next recommended task

[One concrete task, why it matters and how to tell when it is done.]

Status: [recommended only / requested / in progress / blocked]

Dependencies or open questions: [details or none]

## Later backlog

- [Item]
- [Item]

## Resume prompt

> Read AGENTS.md and PROJECT_STATUS.md, inspect the working tree and recent commits, and help me continue with [task]. Check for differences between the handover and the current code before making changes.

---

## 6. Development log template

Copy this into `DEVLOG.md`, then append new entries as work progresses.

---

# Development log

## [YYYY-MM-DD] — [short description]

### Change and reason

- [What changed and the problem it solves]
- [Material decision or trade-off]

### Validation

- [Exact check and result]
- [What was not checked and why, if relevant]

### Remaining limitations

- [Known issue, approximation or unfinished part]

### Handover

- Next recommended task: [task]
- Git/deployment state: [local / committed / pushed / verified deployment]
- Relevant reference: [commit, issue or workflow where available]

---

## 7. README outline

Write the README for a person arriving at the project for the first time.

Suggested contents:

1. Project name and purpose.
2. Link to PROJECT_STATUS.md for current progress.
3. Prerequisites and supported runtime versions.
4. Installation and local run commands.
5. Configuration using safe examples.
6. Basic usage, including where data is saved.
7. Build and test commands.
8. Deployment instructions and live URL, if applicable.
9. Known limitations or a link to the current status.

Avoid claiming planned features already work. Keep detailed development history in DEVLOG.md.

## 8. Git and deployment practices

### Version control

- Check for an existing repository and remote before creating one.
- Confirm the intended repository and branch before publishing to a new destination.
- Exclude secrets, dependency directories, generated outputs and machine-specific files as appropriate to the stack.
- Commit coherent changes with messages explaining their purpose.
- Include relevant status/log updates alongside code changes.
- Inspect the diff before committing; do not sweep unrelated user work into a commit.
- Preserve useful history. Do not force-push or reset shared history as a routine fix.

### Deployment

Record:

- Hosting platform and environment.
- Public or restricted access.
- Repository/branch that triggers deployment.
- Build command and output directory.
- Required environment variables by name only.
- Site base path, asset URLs and routing requirements.
- How to verify deployment and identify its revision.
- How to roll back using the hosting platform or a known-good revision.

Validate the deployed app itself when deployment is in scope. A successful local build does not prove that remote asset paths, configuration, routing or storage work.

For browser-local applications, explain whether a hostname or port change creates a different storage origin. Plan data transfer separately from deployment if users need to retain local schemes or other saved work.

## 9. Useful prompts for ongoing work

### Resume a project

> Read AGENTS.md and PROJECT_STATUS.md, inspect the working tree and recent commits, and summarise the current state briefly. Continue with [specific task], preserving the documented constraints.

### Diagnose a bug

> Investigate [symptom]. Expected behaviour: [expectation]. Reproduction: [steps]. Trace the cause before changing code, implement a focused fix, validate the relevant behaviour and update the status/log.

### Add a feature

> Implement [feature] for [user need]. Acceptance checks: [checks]. Keep [constraints] unchanged. Complete the necessary implementation and validation, then update the handover.

### Prepare a release

> Review the current project for release to [destination]. Check the agreed acceptance criteria, deployment configuration and known issues. Resolve issues within the authorised scope and report the exact revision and verification evidence. Use the existing deployment authorisation; do not infer a new publishing destination.

### End a session

> Update PROJECT_STATUS.md and DEVLOG.md with what changed, what was tested, what remains incomplete and the next useful task. Record the actual Git and deployment state. Make the handover sufficient for a new session without this conversation.

### Reconcile a stale handover

> Compare PROJECT_STATUS.md with the code, recent commits and available validation evidence. Correct outdated statements, distinguish verified behaviour from assumptions, and recommend the next task. Do not implement new features during this review.

## 10. Keeping the system useful

- Keep one clear source for each kind of information.
- Date results and identify the revision when practical.
- State unknowns honestly; do not fill gaps with invented facts.
- Prefer observable acceptance checks to words such as “robust” or “production-ready”.
- Keep the next task small and concrete.
- Preserve decisions that would otherwise be lost between sessions.
- Remove obsolete claims from the current status while retaining useful history in the log.
- Scale the process to the project. A small client-only tool does not need a database, a large test framework or an elaborate release process merely to use this template.
