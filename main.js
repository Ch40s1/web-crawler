import { crawlPage } from "./crawl.js";

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    return;
  }
  if (process.argv.length > 3) {
    console.log("too many arguments provided");
    return;
  }
  const baseURL = process.argv[2];

  console.log(`starting crawl of: ${baseURL}...`);
  console.log(`Report of ${baseURL} starting`);
  const pages = await crawlPage(baseURL);
  const sortedPages = sortObject(pages);
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
}
function sortObject(obj) {
  const entries = Object.entries(obj);
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  return sortedEntries;
}

main();
