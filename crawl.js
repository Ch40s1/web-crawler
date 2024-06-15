export function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  // checks if last character is a /
  if (fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

export function getURLsFromHTML(htmlString, baseURL) {
  // takes string of html, return list of all the tags in the html
  // if the href is a path and not another url then add to base url then add to list
  // if the url is another url that is not the base url then add to a list
  pass;
}
