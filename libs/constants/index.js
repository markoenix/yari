const VALID_LOCALES = new Map(
  ["en-US", "es", "fr", "ja", "ko", "pt-BR", "ru", "zh-CN", "zh-TW"].map(
    (x) => [x.toLowerCase(), x]
  )
);

const RETIRED_LOCALES = new Map(
  [
    "ar",
    "bg",
    "bn",
    "ca",
    "de",
    "el",
    "fa",
    "fi",
    "he",
    "hi-IN",
    "hu",
    "id",
    "it",
    "kab",
    "ms",
    "my",
    "nl",
    "pt-PT",
    "sv-SE",
    "th",
    "tr",
    "uk",
    "vi",
  ].map((x) => [x.toLowerCase(), x])
);

const DEFAULT_LOCALE = "en-US";

const LOCALE_ALIASES = new Map([
  // Case is not important on either the keys or the values.
  ["en", "en-us"],
  ["pt", "pt-br"],
  ["cn", "zh-cn"],
  ["zh", "zh-cn"],
  ["zh-hans", "zh-cn"],
  ["zh-hant", "zh-tw"],
]);

// This must match what we do in `language-menu/index.tsx` where the cookie
// gets set in the client!
const PREFERRED_LOCALE_COOKIE_NAME = "preferredlocale";
const ACTIVE_LOCALES = new Set([
  "en-us",
  "es",
  "fr",
  "ja",
  "ko",
  "pt-br",
  "ru",
  "zh-cn",
  "zh-tw",
]);

const CSP_SCRIPT_SRC_VALUES = [
  "'report-sample'",
  "'self'",

  "www.google-analytics.com/analytics.js",

  "assets.codepen.io",
  "production-assets.codepen.io",

  /*
   * Inline scripts (defined in `client/public/index.html`).
   *
   * If we modify them, we must always update their CSP hash here.
   *
   * Important: Please make sure to always keep an entry for the
   * previous hash to avoid issues shortly after cache invalidation.
   */

  // 1. Theme switching.
  // - Previous hash (to avoid cache invalidation issues):
  "'sha256-GA8+DpFnqAM/vwERTpb5zyLUaN5KnOhctfTsqWfhaUA='",
  // - Current hash:
  "'sha256-uogddBLIKmJa413dyT0iPejBg3VFcO+4x6B+vw3jng0='",
];
const CSP_DIRECTIVES = {
  "default-src": ["'self'"],
  "script-src": CSP_SCRIPT_SRC_VALUES,
  "script-src-elem": CSP_SCRIPT_SRC_VALUES,
  "style-src": ["'report-sample'", "'self'", "'unsafe-inline'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "connect-src": [
    "'self'",

    "updates.developer.allizom.org",
    "updates.developer.mozilla.org",

    "www.google-analytics.com",
    "stats.g.doubleclick.net",
  ],
  "font-src": ["'self'"],
  "frame-src": [
    "'self'",

    "interactive-examples.mdn.mozilla.net",
    "interactive-examples.prod.mdn.mozilla.net",
    "interactive-examples.stage.mdn.mozilla.net",
    "mdn.github.io",
    "yari-demos.prod.mdn.mozit.cloud",
    "mdn.mozillademos.org",
    "yari-demos.stage.mdn.mozit.cloud",

    "jsfiddle.net",
    "www.youtube-nocookie.com",
    "codepen.io",
    "survey.alchemer.com",
  ],
  "img-src": [
    "'self'",

    // Avatars
    "*.githubusercontent.com",
    "*.googleusercontent.com",
    "*.gravatar.com",
    "mozillausercontent.com",
    "firefoxusercontent.com",
    "profile.stage.mozaws.net",
    "profile.accounts.firefox.com",

    "mdn.mozillademos.org",
    "media.prod.mdn.mozit.cloud",
    "media.stage.mdn.mozit.cloud",
    "interactive-examples.mdn.mozilla.net",
    "interactive-examples.prod.mdn.mozilla.net",
    "interactive-examples.stage.mdn.mozilla.net",

    "wikipedia.org",

    "www.google-analytics.com",
    "www.gstatic.com",
  ],
  "manifest-src": ["'self'"],
  "media-src": ["'self'", "archive.org", "videos.cdn.mozilla.net"],
  "child-src": ["'self'"],
  "worker-src": ["'self'"],
};

const cspToString = (csp) =>
  Object.entries(csp)
    .map(([directive, values]) => `${directive} ${values.join(" ")};`)
    .join(" ");

const CSP_VALUE = cspToString(CSP_DIRECTIVES);

// -----
// build
// -----

const FLAW_LEVELS = Object.freeze({
  ERROR: "error",
  IGNORE: "ignore",
  WARN: "warn",
});

// These names need to match what we have in the code where we have various
// blocks of code that look something like this:
//
//    if (this.options.flawChecks.profanities) {
//      ... analyze and possible add to doc.flaws.profanities ...
//
// This list needs to be synced with the code. And the CLI arguments
// used with --flaw-checks needs to match this set.
const VALID_FLAW_CHECKS = new Set([
  "macros",
  "broken_links",
  "bad_bcd_queries",
  "images",
  "image_widths",
  "bad_pre_tags",
  "sectioning",
  "heading_links",
  "translation_differences",
  "unsafe_html",
]);

// ------
// client
// ------

const MDN_PLUS_TITLE = "MDN Plus";

// -------
// content
// -------

const HTML_FILENAME = "index.html";
const MARKDOWN_FILENAME = "index.md";

// ---------
// filecheck
// ---------

const VALID_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg", // this is what you get for .jpeg *and* .jpg file extensions
  "image/gif",
]);

const MAX_COMPRESSION_DIFFERENCE_PERCENTAGE = 25; // percent

module.exports = {
  ACTIVE_LOCALES,
  VALID_LOCALES,
  RETIRED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_ALIASES,
  PREFERRED_LOCALE_COOKIE_NAME,

  CSP_SCRIPT_SRC_VALUES,
  CSP_VALUE,

  // build
  FLAW_LEVELS,
  VALID_FLAW_CHECKS,

  // client
  MDN_PLUS_TITLE,

  // content
  HTML_FILENAME,
  MARKDOWN_FILENAME,

  // filecheck
  VALID_MIME_TYPES,
  MAX_COMPRESSION_DIFFERENCE_PERCENTAGE,
};
