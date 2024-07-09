"use strict";(self.webpackChunksandbox=self.webpackChunksandbox||[]).push([[8230],{28230:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   conf: () => (/* binding */ conf),\n/* harmony export */   language: () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n\n// src/basic-languages/pascaligo/pascaligo.ts\nvar conf = {\n  comments: {\n    lineComment: "//",\n    blockComment: ["(*", "*)"]\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"],\n    ["<", ">"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: "<", close: ">" },\n    { open: "\'", close: "\'" }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: "<", close: ">" },\n    { open: "\'", close: "\'" }\n  ]\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".pascaligo",\n  ignoreCase: true,\n  brackets: [\n    { open: "{", close: "}", token: "delimiter.curly" },\n    { open: "[", close: "]", token: "delimiter.square" },\n    { open: "(", close: ")", token: "delimiter.parenthesis" },\n    { open: "<", close: ">", token: "delimiter.angle" }\n  ],\n  keywords: [\n    "begin",\n    "block",\n    "case",\n    "const",\n    "else",\n    "end",\n    "fail",\n    "for",\n    "from",\n    "function",\n    "if",\n    "is",\n    "nil",\n    "of",\n    "remove",\n    "return",\n    "skip",\n    "then",\n    "type",\n    "var",\n    "while",\n    "with",\n    "option",\n    "None",\n    "transaction"\n  ],\n  typeKeywords: [\n    "bool",\n    "int",\n    "list",\n    "map",\n    "nat",\n    "record",\n    "string",\n    "unit",\n    "address",\n    "map",\n    "mtz",\n    "xtz"\n  ],\n  operators: [\n    "=",\n    ">",\n    "<",\n    "<=",\n    ">=",\n    "<>",\n    ":",\n    ":=",\n    "and",\n    "mod",\n    "or",\n    "+",\n    "-",\n    "*",\n    "/",\n    "@",\n    "&",\n    "^",\n    "%"\n  ],\n  // we include these common regular expressions\n  symbols: /[=><:@\\^&|+\\-*\\/\\^%]+/,\n  // The main tokenizer for our languages\n  tokenizer: {\n    root: [\n      // identifiers and keywords\n      [\n        /[a-zA-Z_][\\w]*/,\n        {\n          cases: {\n            "@keywords": { token: "keyword.$0" },\n            "@default": "identifier"\n          }\n        }\n      ],\n      // whitespace\n      { include: "@whitespace" },\n      // delimiters and operators\n      [/[{}()\\[\\]]/, "@brackets"],\n      [/[<>](?!@symbols)/, "@brackets"],\n      [\n        /@symbols/,\n        {\n          cases: {\n            "@operators": "delimiter",\n            "@default": ""\n          }\n        }\n      ],\n      // numbers\n      [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, "number.float"],\n      [/\\$[0-9a-fA-F]{1,16}/, "number.hex"],\n      [/\\d+/, "number"],\n      // delimiter: after number because of .\\d floats\n      [/[;,.]/, "delimiter"],\n      // strings\n      [/\'([^\'\\\\]|\\\\.)*$/, "string.invalid"],\n      // non-teminated string\n      [/\'/, "string", "@string"],\n      // characters\n      [/\'[^\\\\\']\'/, "string"],\n      [/\'/, "string.invalid"],\n      [/\\#\\d+/, "string"]\n    ],\n    /* */\n    comment: [\n      [/[^\\(\\*]+/, "comment"],\n      //[/\\(\\*/,    \'comment\', \'@push\' ],    // nested comment  not allowed :-(\n      [/\\*\\)/, "comment", "@pop"],\n      [/\\(\\*/, "comment"]\n    ],\n    string: [\n      [/[^\\\\\']+/, "string"],\n      [/\\\\./, "string.escape.invalid"],\n      [/\'/, { token: "string.quote", bracket: "@close", next: "@pop" }]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, "white"],\n      [/\\(\\*/, "comment", "@comment"],\n      [/\\/\\/.*$/, "comment"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjgyMzAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxPQUFPLEtBQUs7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLFlBQVksR0FBRztBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU0sUUFBUSxZQUFZLEdBQUc7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLFlBQVksNkJBQTZCO0FBQ3ZELE1BQU0sa0RBQWtEO0FBQ3hELE1BQU0sdURBQXVEO0FBQzdELE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0JBQXdCO0FBQ2hDO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHdEQUF3RDtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW5kYm94Ly4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvZXNtL3ZzL2Jhc2ljLWxhbmd1YWdlcy9wYXNjYWxpZ28vcGFzY2FsaWdvLmpzP2NiMDQiXSwic291cmNlc0NvbnRlbnQiOlsiLyohLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVmVyc2lvbjogMC41MC4wKGMzMjFkMGZiZWNiNTBhYjhhNTM2NWZhMTk2NTQ3NmIwYWU2M2ZjODcpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvbW9uYWNvLWVkaXRvci9ibG9iL21haW4vTElDRU5TRS50eHRcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8vIHNyYy9iYXNpYy1sYW5ndWFnZXMvcGFzY2FsaWdvL3Bhc2NhbGlnby50c1xudmFyIGNvbmYgPSB7XG4gIGNvbW1lbnRzOiB7XG4gICAgbGluZUNvbW1lbnQ6IFwiLy9cIixcbiAgICBibG9ja0NvbW1lbnQ6IFtcIigqXCIsIFwiKilcIl1cbiAgfSxcbiAgYnJhY2tldHM6IFtcbiAgICBbXCJ7XCIsIFwifVwiXSxcbiAgICBbXCJbXCIsIFwiXVwiXSxcbiAgICBbXCIoXCIsIFwiKVwiXSxcbiAgICBbXCI8XCIsIFwiPlwiXVxuICBdLFxuICBhdXRvQ2xvc2luZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiIH0sXG4gICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH1cbiAgXSxcbiAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgb3BlbjogXCI8XCIsIGNsb3NlOiBcIj5cIiB9LFxuICAgIHsgb3BlbjogXCInXCIsIGNsb3NlOiBcIidcIiB9XG4gIF1cbn07XG52YXIgbGFuZ3VhZ2UgPSB7XG4gIGRlZmF1bHRUb2tlbjogXCJcIixcbiAgdG9rZW5Qb3N0Zml4OiBcIi5wYXNjYWxpZ29cIixcbiAgaWdub3JlQ2FzZTogdHJ1ZSxcbiAgYnJhY2tldHM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIsIHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiLCB0b2tlbjogXCJkZWxpbWl0ZXIuc3F1YXJlXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiLCB0b2tlbjogXCJkZWxpbWl0ZXIuYW5nbGVcIiB9XG4gIF0sXG4gIGtleXdvcmRzOiBbXG4gICAgXCJiZWdpblwiLFxuICAgIFwiYmxvY2tcIixcbiAgICBcImNhc2VcIixcbiAgICBcImNvbnN0XCIsXG4gICAgXCJlbHNlXCIsXG4gICAgXCJlbmRcIixcbiAgICBcImZhaWxcIixcbiAgICBcImZvclwiLFxuICAgIFwiZnJvbVwiLFxuICAgIFwiZnVuY3Rpb25cIixcbiAgICBcImlmXCIsXG4gICAgXCJpc1wiLFxuICAgIFwibmlsXCIsXG4gICAgXCJvZlwiLFxuICAgIFwicmVtb3ZlXCIsXG4gICAgXCJyZXR1cm5cIixcbiAgICBcInNraXBcIixcbiAgICBcInRoZW5cIixcbiAgICBcInR5cGVcIixcbiAgICBcInZhclwiLFxuICAgIFwid2hpbGVcIixcbiAgICBcIndpdGhcIixcbiAgICBcIm9wdGlvblwiLFxuICAgIFwiTm9uZVwiLFxuICAgIFwidHJhbnNhY3Rpb25cIlxuICBdLFxuICB0eXBlS2V5d29yZHM6IFtcbiAgICBcImJvb2xcIixcbiAgICBcImludFwiLFxuICAgIFwibGlzdFwiLFxuICAgIFwibWFwXCIsXG4gICAgXCJuYXRcIixcbiAgICBcInJlY29yZFwiLFxuICAgIFwic3RyaW5nXCIsXG4gICAgXCJ1bml0XCIsXG4gICAgXCJhZGRyZXNzXCIsXG4gICAgXCJtYXBcIixcbiAgICBcIm10elwiLFxuICAgIFwieHR6XCJcbiAgXSxcbiAgb3BlcmF0b3JzOiBbXG4gICAgXCI9XCIsXG4gICAgXCI+XCIsXG4gICAgXCI8XCIsXG4gICAgXCI8PVwiLFxuICAgIFwiPj1cIixcbiAgICBcIjw+XCIsXG4gICAgXCI6XCIsXG4gICAgXCI6PVwiLFxuICAgIFwiYW5kXCIsXG4gICAgXCJtb2RcIixcbiAgICBcIm9yXCIsXG4gICAgXCIrXCIsXG4gICAgXCItXCIsXG4gICAgXCIqXCIsXG4gICAgXCIvXCIsXG4gICAgXCJAXCIsXG4gICAgXCImXCIsXG4gICAgXCJeXCIsXG4gICAgXCIlXCJcbiAgXSxcbiAgLy8gd2UgaW5jbHVkZSB0aGVzZSBjb21tb24gcmVndWxhciBleHByZXNzaW9uc1xuICBzeW1ib2xzOiAvWz0+PDpAXFxeJnwrXFwtKlxcL1xcXiVdKy8sXG4gIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICB0b2tlbml6ZXI6IHtcbiAgICByb290OiBbXG4gICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgIFtcbiAgICAgICAgL1thLXpBLVpfXVtcXHddKi8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAa2V5d29yZHNcIjogeyB0b2tlbjogXCJrZXl3b3JkLiQwXCIgfSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJpZGVudGlmaWVyXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICB7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LFxuICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICBbL1t7fSgpXFxbXFxdXS8sIFwiQGJyYWNrZXRzXCJdLFxuICAgICAgWy9bPD5dKD8hQHN5bWJvbHMpLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbXG4gICAgICAgIC9Ac3ltYm9scy8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAb3BlcmF0b3JzXCI6IFwiZGVsaW1pdGVyXCIsXG4gICAgICAgICAgICBcIkBkZWZhdWx0XCI6IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAvLyBudW1iZXJzXG4gICAgICBbL1xcZCpcXC5cXGQrKFtlRV1bXFwtK10/XFxkKyk/LywgXCJudW1iZXIuZmxvYXRcIl0sXG4gICAgICBbL1xcJFswLTlhLWZBLUZdezEsMTZ9LywgXCJudW1iZXIuaGV4XCJdLFxuICAgICAgWy9cXGQrLywgXCJudW1iZXJcIl0sXG4gICAgICAvLyBkZWxpbWl0ZXI6IGFmdGVyIG51bWJlciBiZWNhdXNlIG9mIC5cXGQgZmxvYXRzXG4gICAgICBbL1s7LC5dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICAvLyBzdHJpbmdzXG4gICAgICBbLycoW14nXFxcXF18XFxcXC4pKiQvLCBcInN0cmluZy5pbnZhbGlkXCJdLFxuICAgICAgLy8gbm9uLXRlbWluYXRlZCBzdHJpbmdcbiAgICAgIFsvJy8sIFwic3RyaW5nXCIsIFwiQHN0cmluZ1wiXSxcbiAgICAgIC8vIGNoYXJhY3RlcnNcbiAgICAgIFsvJ1teXFxcXCddJy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy8nLywgXCJzdHJpbmcuaW52YWxpZFwiXSxcbiAgICAgIFsvXFwjXFxkKy8sIFwic3RyaW5nXCJdXG4gICAgXSxcbiAgICAvKiAqL1xuICAgIGNvbW1lbnQ6IFtcbiAgICAgIFsvW15cXChcXCpdKy8sIFwiY29tbWVudFwiXSxcbiAgICAgIC8vWy9cXChcXCovLCAgICAnY29tbWVudCcsICdAcHVzaCcgXSwgICAgLy8gbmVzdGVkIGNvbW1lbnQgIG5vdCBhbGxvd2VkIDotKFxuICAgICAgWy9cXCpcXCkvLCBcImNvbW1lbnRcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9cXChcXCovLCBcImNvbW1lbnRcIl1cbiAgICBdLFxuICAgIHN0cmluZzogW1xuICAgICAgWy9bXlxcXFwnXSsvLCBcInN0cmluZ1wiXSxcbiAgICAgIFsvXFxcXC4vLCBcInN0cmluZy5lc2NhcGUuaW52YWxpZFwiXSxcbiAgICAgIFsvJy8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIGJyYWNrZXQ6IFwiQGNsb3NlXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICBbL1sgXFx0XFxyXFxuXSsvLCBcIndoaXRlXCJdLFxuICAgICAgWy9cXChcXCovLCBcImNvbW1lbnRcIiwgXCJAY29tbWVudFwiXSxcbiAgICAgIFsvXFwvXFwvLiokLywgXCJjb21tZW50XCJdXG4gICAgXVxuICB9XG59O1xuZXhwb3J0IHtcbiAgY29uZixcbiAgbGFuZ3VhZ2Vcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///28230\n')}}]);