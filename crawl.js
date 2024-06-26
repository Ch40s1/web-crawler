import { JSDOM } from "jsdom";

export function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  // checks if last character is a /
  if (fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

export function getURLsFromHTML(html, baseURL) {
  const urls = [];
  const dom = new JSDOM(html);
  const anchors = dom.window.document.querySelectorAll("a");

  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }

  return urls;
}

async function fetchHTML(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`);
  }

  if (res.status > 399) {
    console.log(`Got HTTP error: ${res.status} ${res.statusText}`);
    return;
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.log(`Got non-HTML response: ${contentType}`);
    return;
  }
  return res.text();
}

export async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // create 2 url objects to check hostname
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);
  if (currentURLObj.hostname != baseURLObj.hostname) {
    return pages;
  }
  // use a consistent URL format
  const normalizedURL = normalizeURL(currentURL);
  // increment counts
  // check if we visited it before
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }
  // if the top was false then create a new entry
  pages[normalizedURL] = 1;
  // get html of current url
  // console.log(`crawling ${currentURL}`);
  let html = "";
  try {
    html = await fetchHTML(currentURL);
  } catch (err) {
    console.log(err.message);
    return pages;
  }
  const nextURLs = getURLsFromHTML(html, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }
  return pages;
}
