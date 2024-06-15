import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";

test("normalizeUrl no safe protocal", () => {
  const input = "https://boot.dev";
  const actual = normalizeURL(input);
  const expected = "boot.dev";
  expect(actual).toEqual(expected);
});

test("normalizeUrl no protocal", () => {
  const input = "http://boot.dev";
  const actual = normalizeURL(input);
  const expected = "boot.dev";
  expect(actual).toEqual(expected);
});

test("normalizeUrl no safe protocal", () => {
  const input = "https://boot.dev";
  const actual = normalizeURL(input);
  const expected = "boot.dev";
  expect(actual).toEqual(expected);
});

test("normalizeUrl with path", () => {
  const input = "https://boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl with path and no end /", () => {
  const input = "https://boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});
