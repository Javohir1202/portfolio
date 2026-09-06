This project uses a single cover-art image (`cover.jpg`) instead of real chat screenshots — a
Telegram bot's UI doesn't photograph well next to the other two projects' polished web
screenshots, so it gets a designed cover treatment via `components/CoverImage.tsx` (no phone
chrome, since it's brand art, not a captured screen) rather than `MobileFrame`.

To replace it: drop a new file at `cover.jpg` and update `aspect` in `data/projects.ts` to
match its real width/height ratio if it differs from the current one (1.792).
