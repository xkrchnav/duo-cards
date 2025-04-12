import { Card, decorateHint } from "../src/decorateHint";
import { readFileSync } from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args?.length !== 1) {
  console.error(
    "Please provide a string argument with path to json containing cards."
  );
  process.exit(1);
}

const jsonPath = args[0];

try {
  // Resolve the full path to the JSON file
  const absolutePath = path.resolve(jsonPath);

  // Read and parse the JSON file
  const fileContent = readFileSync(absolutePath, "utf-8");
  const { cards }: { cards: Card[] } = JSON.parse(fileContent);

  // Process each card and output the result
  cards.forEach((card) => {
    const result = decorateHint(card, true);
    console.log("--------------------------------------------------");
    console.log("Card");
    console.log("front:    ", card.front);
    console.log("hint:     ", card.hint);
    console.log("decorated:", result);
  });
} catch (error) {
  console.error("Error reading or parsing the JSON file:", error);
  process.exit(1);
}
