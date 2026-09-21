# What's new

What changed in each version of forest-kit, and what it means for a project already on the trail. `/resupply` reads you the entries between your version and the latest.

forest-studio starts at 1.0.0. The history before it, forest-kit 1.0 to 3.0, is in the forest-kit archive.

Each entry says 2 things up front:

- **Breaking**: whether something you rely on works differently.
- **Project update**: whether a project you already started needs anything from you.

---

## 1.1.0

Breaking: yes · Project update: yes

- **The middle 4 camps have clearer names.** Intake is now Frame, Discover is Learn, Define is Decide, Design is Shape. Define and Design sat next to each other and meant different things, which was a trip hazard, and each camp is now named for what you actually do there.
- **What you need to do:** nothing, unless you already have a project. If you do, forest notices the old folder names next time you open it and offers to rename them. Nothing inside your folders changes, and it will not touch anything without a yes. The old names still work if you type them.
- **forest asks how much time you have for checking things**, once, when you start a project. Under an hour, an afternoon, a few days, or not now. It decides what gets offered: you will never be shown a 2-week study when you have an afternoon, and "not now" is a real answer with no lecture attached.
- **It knows how to do the research, not only that you should.** Ask about talking to people, or checking whether a problem is real, and you get the method that fits the time you have, the questions worth asking, and what to do with the answers. One thing at a time, because there is one thing you do not know. Then back to building.
- **What it still will not do:** turn any of it into proof. Reading what other people wrote about their users is not the same as knowing about yours, and `/weather` weighs it accordingly.

## 1.0.3

Breaking: no · Project update: no

- **forest can update itself, when you ask.** When a newer version is out, Claude says so once at the start of a session. `/resupply` shows what changed, asks, and swaps forest's own folder for the new one. Your project files and your app are never touched, and the old version is kept so it can be undone.

## 1.0.2

Breaking: no · Project update: no

- **A visible `START-HERE.md`** in the download, with the 3 steps. The folder looked empty because forest lives in a hidden folder, and nothing in view said what to do next.

## 1.0.1

Breaking: no · Project update: no

- **If you overruled the weather, `/ship` reads it back to you** before anything ships: the reading, your reasoning and your own turnaround rule, in your words. One question, once. The kit said it would do this and didn't; now it does.

## 1.0.0

The first release of forest-studio. Breaking: no · Project update: no. It follows forest-kit 3.0.0, which stays available under MIT.

- **The whole studio, in the folder.** k-d studio's design, brand, motion and stack standards come with it, in full, and every command follows them. There is no cut-down version any more.
- **Build and Ship are as strong as the thinking.** Each phase ends with `/review` (the 5-check quality pass) and `/test`. When something needs work: `/refine`, `/tune`, `/motion`, `/animate`, `/overdrive`, `/system`. Before the summit, `/a11y-audit`.
- **Research and launch gain what was missing.** `/benchmark` maps who else solves this, doing nothing included. `/reach` writes how the product reaches people.
- **You always know where your files are.** Everything forest writes for you is in `project/`; the product itself is in `app/`; forest lives in the hidden `.claude/` folder and never writes anywhere else.
- **A licence instead of a lock.** forest is free to use, including for commercial work, and not for copying or redistribution. `/pack` keeps `.claude/` out of your repository for you.
