# What's new

What changed in each version of forest-kit, and what it means for a project already on the trail. `/resupply` reads you the entries between your version and the latest.

forest-studio starts at 1.0.0. The history before it, forest-kit 1.0 to 3.0, is in the forest-kit archive.

Each entry says two things up front:

- **Breaking**: whether something you rely on works differently.
- **Project update**: whether a project you already started needs anything from you.

---

## 1.0.3

Breaking: no · Project update: no

- **forest can update itself, when you ask.** When a newer version is out, Claude says so once at the start of a session. `/resupply` shows what changed, asks, and swaps forest's own folder for the new one. Your project files and your app are never touched, and the old version is kept so it can be undone.

## 1.0.2

Breaking: no · Project update: no

- **A visible `START-HERE.md`** in the download, with the three steps. The folder looked empty because forest lives in a hidden folder, and nothing in view said what to do next.

## 1.0.1

Breaking: no · Project update: no

- **If you overruled the weather, `/ship` reads it back to you** — the reading, your reasoning and your own turnaround rule, in your words — before anything ships. One question, once. The kit said it would do this and didn't; now it does.

## 1.0.0

The first release of forest-studio. Breaking: no · Project update: no. It follows forest-kit 3.0.0, which stays available under MIT.

- **The whole studio, in the folder.** k-d studio's design, brand, motion and stack standards come with it, in full, and every command follows them. There is no cut-down version any more.
- **Build and Ship are as strong as the thinking.** Each phase ends with `/review` (the five-check quality pass) and `/test`. When something needs work: `/refine`, `/tune`, `/motion`, `/animate`, `/overdrive`, `/system`. Before the summit, `/a11y-audit`.
- **Research and launch gain what was missing.** `/benchmark` maps who else solves this, doing nothing included. `/reach` writes how the product reaches people.
- **You always know where your files are.** Everything forest writes for you is in `project/`; the product itself is in `app/`; forest lives in the hidden `.claude/` folder and never writes anywhere else.
- **A licence instead of a lock.** forest is free to use, including for commercial work, and not for copying or redistribution. `/pack` keeps `.claude/` out of your repository for you.
