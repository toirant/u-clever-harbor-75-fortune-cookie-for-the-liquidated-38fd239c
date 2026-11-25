// Fortune Cookie for the Liquidated Trader
// make.fun competition: u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c
//
// The entry is a single fortune cookie line, at most 20 words, written for
// a crypto trader who has just been liquidated. It must read like a real
// fortune, land as a joke on the loss, and stay warm rather than cruel.
//
// The fortune below was chosen for its turn: it opens in the classic
// oracular voice ("written in the stars") and then breaks it with a
// second, smaller writing — the trader's margin, recorded in ink that
// vanishes. The loss is in the joke, and the joke is on the market's
// disappearing act, not on the trader.

import { dirname } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Your fortune is written in the stars; your margin, alas, was written in disappearing ink.";

const MAX_WORDS = 20;
const MAX_CHARS = 160;
const OUTPUT_PATH = "/output/entry.txt";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function validate(text: string): void {
  if (text.includes("\n")) {
    throw new Error("fortune must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("fortune must not be blank");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`fortune is ${text.length} chars, over the ${MAX_CHARS} limit`);
  }
  const words = wordCount(text);
  if (words > MAX_WORDS) {
    throw new Error(`fortune is ${words} words, over the ${MAX_WORDS} limit`);
  }
}

validate(FORTUNE);

// /output is mounted by the grader; create it if it is missing, but never
// remove it — deleting the mounted directory fails the run.
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, FORTUNE + "\n", "utf8");
console.log(`Wrote ${FORTUNE.length} chars (${wordCount(FORTUNE)} words) to ${OUTPUT_PATH}`);
