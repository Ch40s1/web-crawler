import { JSDOM } from 'jsdom'

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
  const urls = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a')

  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch (err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }

  return urls
}

export async function crawlPage(currentURL) {
  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`)

  let res
  try {
    res = await fetch(currentURL)
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`)
  }

  if (res.status > 399) {
    console.log(`Got HTTP error: ${res.status} ${res.statusText}`)
    return
  }

  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`Got non-HTML response: ${contentType}`)
    return
  }

  console.log(await res.text())

  /* Make sure the currentURL is on the same domain as the baseURL. If it's not, just return the current pages. We don't want to crawl the entire internet, just the domain in question.
  Get a normalized version of the currentURL.
  If the pages object already has an entry for the normalized version of the current URL, just increment the count and return the current pages.
  Otherwise, add an entry to the pages object for the normalized version of the current URL, and set the count to 1.
  If we've gotten here, break out the logic for fetching the current URL and parsing the HTML into its own function. This will keep the crawl functionality readable and manageable. Call the new function inside crawlPage.
  Assuming all went well with the fetch request in the new function, get all the URLs from the response body HTML.
  Recursively crawl each URL you found on the page and update the pages to keep an aggregate count.
  Finally, return the updated pages object.
  */

}
