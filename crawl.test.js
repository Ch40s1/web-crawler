import { normalizeURL } from "./crawl.js";
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
