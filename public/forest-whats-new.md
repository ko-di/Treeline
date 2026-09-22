# What's new

What changed in each version of forest-kit, and what it means for a project already on the trail. `/resupply` reads you the entries between your version and the latest.

forest-studio starts at 1.0.0. The history before it, forest-kit 1.0 to 3.0, is in the forest-kit archive.

Each entry says 2 things up front:

- **Breaking**: whether something you rely on works differently.
- **Project update**: whether a project you already started needs anything from you.

---

## 1.3.1

Breaking: no · Project update: no

- Fixes 1.3.0. If you picked anything other than a finished thing at intake, the trail did not actually stop where it said it would.
- Proof the problem is real now ends at Camp 2, as promised. The gate closes it rather than opening Camp 3.
- Documents and a fast prototype now get the brief compiled at their own finish line, rather than at a camp they never walk.
- `/compass` and `/map` know when a project is finished, and stop counting camps you were never going to walk.

## 1.3.0

Breaking: no · Project update: no

- `/pack` asks what you want at the end. The trail's finish line moves to match, and every camp stays open either way.
- `/publish` takes a project from a folder to a live address: git, a code host, the repository, hosting, secrets, a domain.
- `/debug` reads an error, says what it means in plain words, then finds the cause under the symptom.
- Every check that stops you now names where to go next.
- forest asks once whether it may send a few anonymous counts, off unless you say yes. They show which camp people stall at. Nothing from your project is ever sent, and the full account is on the privacy page.

## 1.2.0

Breaking: no · Project update: no

- Camp 4 offers design work that fits your team and your time, and hands to `/sketch` after.
- Everything forest offers now says when to use it, what you get, and how you can tell it is done.
- `/review` asks whether the design solves the problem in the brief before it checks how it looks.

## 1.1.0

Breaking: yes · Project update: yes

- Camps 1 to 4 are now Frame, Learn, Decide and Shape. An existing project is offered the rename, and nothing moves without a yes.
- forest asks how much time you have for research, and offers only what fits.
- It knows how to do the research, not only that you should.

## 1.0.3

Breaking: no · Project update: no

- forest can update itself. `/resupply` shows what changed, asks, then swaps its own folder and nothing else.

## 1.0.2

Breaking: no · Project update: no

- A visible `START-HERE.md` in the download.

## 1.0.1

Breaking: no · Project update: no

- `/ship` reads a weather override back to you before anything ships.

## 1.0.0

The first release of forest-studio. Breaking: no · Project update: no. It follows forest-kit 3.0.0.

- The whole studio in the folder: design, brand, motion and stack standards, in full.
- Build and ship commands: `/review`, `/test`, `/refine`, `/tune`, `/motion`, `/animate`, `/overdrive`, `/system` and `/a11y-audit`.
- `/benchmark` for who else solves this, and `/reach` for how it reaches people.
- Your files in `project/`, the product in `app/`, forest in `.claude/`.
- A licence instead of a lock: free to use, not for copying.
