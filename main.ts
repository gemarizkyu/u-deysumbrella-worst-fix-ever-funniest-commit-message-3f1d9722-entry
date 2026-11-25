// Worst Fix Ever: Funniest Commit Message — make.fun entry (program/v1).
// Writes one original commit message to /output/entry.txt.
//
// Deterministic: the same line, byte for byte, on every run.
// No randomness, no network, no clock, no input files, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a fix that "worked" — the bug can no longer reproduce,
// because the fix killed the app itself. "Cannot reproduce" is the
// classic bug-tracker verdict; here it is true in the worst possible
// way. One real commit subject, one twist, no explanation needed.
// 55 characters: well inside the 100-character gate, and short enough
// that an exact tie on win rate falls our way on the size tie-break.
const LINE =
  "fix: bug no longer reproduces, and neither does the app";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function main(): void {
  // The gate measures the file as written, so validate the exact text
  // that lands in entry.txt (line plus its trailing newline): it must be
  // UTF-8 text of 1-100 characters, not only whitespace.
  const text = LINE + "\n";
  if (text.length < 1 || text.length > 100 || LINE.trim().length === 0) {
    throw new Error(`entry text must be 1-100 characters, got ${text.length}`);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, "entry.txt"), text, "utf8");
}

main();
