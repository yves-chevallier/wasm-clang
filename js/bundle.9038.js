"use strict";(self.webpackChunksandbox=self.webpackChunksandbox||[]).push([[9038],{69038:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   conf: () => (/* binding */ conf),\n/* harmony export */   language: () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n\n// src/basic-languages/csharp/csharp.ts\nvar conf = {\n  wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\#\\$\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\\'\\"\\,\\.\\<\\>\\/\\?\\s]+)/g,\n  comments: {\n    lineComment: "//",\n    blockComment: ["/*", "*/"]\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: "\'", close: "\'", notIn: ["string", "comment"] },\n    { open: \'"\', close: \'"\', notIn: ["string", "comment"] }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: "<", close: ">" },\n    { open: "\'", close: "\'" },\n    { open: \'"\', close: \'"\' }\n  ],\n  folding: {\n    markers: {\n      start: new RegExp("^\\\\s*#region\\\\b"),\n      end: new RegExp("^\\\\s*#endregion\\\\b")\n    }\n  }\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: ".cs",\n  brackets: [\n    { open: "{", close: "}", token: "delimiter.curly" },\n    { open: "[", close: "]", token: "delimiter.square" },\n    { open: "(", close: ")", token: "delimiter.parenthesis" },\n    { open: "<", close: ">", token: "delimiter.angle" }\n  ],\n  keywords: [\n    "extern",\n    "alias",\n    "using",\n    "bool",\n    "decimal",\n    "sbyte",\n    "byte",\n    "short",\n    "ushort",\n    "int",\n    "uint",\n    "long",\n    "ulong",\n    "char",\n    "float",\n    "double",\n    "object",\n    "dynamic",\n    "string",\n    "assembly",\n    "is",\n    "as",\n    "ref",\n    "out",\n    "this",\n    "base",\n    "new",\n    "typeof",\n    "void",\n    "checked",\n    "unchecked",\n    "default",\n    "delegate",\n    "var",\n    "const",\n    "if",\n    "else",\n    "switch",\n    "case",\n    "while",\n    "do",\n    "for",\n    "foreach",\n    "in",\n    "break",\n    "continue",\n    "goto",\n    "return",\n    "throw",\n    "try",\n    "catch",\n    "finally",\n    "lock",\n    "yield",\n    "from",\n    "let",\n    "where",\n    "join",\n    "on",\n    "equals",\n    "into",\n    "orderby",\n    "ascending",\n    "descending",\n    "select",\n    "group",\n    "by",\n    "namespace",\n    "partial",\n    "class",\n    "field",\n    "event",\n    "method",\n    "param",\n    "public",\n    "protected",\n    "internal",\n    "private",\n    "abstract",\n    "sealed",\n    "static",\n    "struct",\n    "readonly",\n    "volatile",\n    "virtual",\n    "override",\n    "params",\n    "get",\n    "set",\n    "add",\n    "remove",\n    "operator",\n    "true",\n    "false",\n    "implicit",\n    "explicit",\n    "interface",\n    "enum",\n    "null",\n    "async",\n    "await",\n    "fixed",\n    "sizeof",\n    "stackalloc",\n    "unsafe",\n    "nameof",\n    "when"\n  ],\n  namespaceFollows: ["namespace", "using"],\n  parenFollows: ["if", "for", "while", "switch", "foreach", "using", "catch", "when"],\n  operators: [\n    "=",\n    "??",\n    "||",\n    "&&",\n    "|",\n    "^",\n    "&",\n    "==",\n    "!=",\n    "<=",\n    ">=",\n    "<<",\n    "+",\n    "-",\n    "*",\n    "/",\n    "%",\n    "!",\n    "~",\n    "++",\n    "--",\n    "+=",\n    "-=",\n    "*=",\n    "/=",\n    "%=",\n    "&=",\n    "|=",\n    "^=",\n    "<<=",\n    ">>=",\n    ">>",\n    "=>"\n  ],\n  symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\n  // escape sequences\n  escapes: /\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  // The main tokenizer for our languages\n  tokenizer: {\n    root: [\n      // identifiers and keywords\n      [\n        /\\@?[a-zA-Z_]\\w*/,\n        {\n          cases: {\n            "@namespaceFollows": {\n              token: "keyword.$0",\n              next: "@namespace"\n            },\n            "@keywords": {\n              token: "keyword.$0",\n              next: "@qualified"\n            },\n            "@default": { token: "identifier", next: "@qualified" }\n          }\n        }\n      ],\n      // whitespace\n      { include: "@whitespace" },\n      // delimiters and operators\n      [\n        /}/,\n        {\n          cases: {\n            "$S2==interpolatedstring": {\n              token: "string.quote",\n              next: "@pop"\n            },\n            "$S2==litinterpstring": {\n              token: "string.quote",\n              next: "@pop"\n            },\n            "@default": "@brackets"\n          }\n        }\n      ],\n      [/[{}()\\[\\]]/, "@brackets"],\n      [/[<>](?!@symbols)/, "@brackets"],\n      [\n        /@symbols/,\n        {\n          cases: {\n            "@operators": "delimiter",\n            "@default": ""\n          }\n        }\n      ],\n      // numbers\n      [/[0-9_]*\\.[0-9_]+([eE][\\-+]?\\d+)?[fFdD]?/, "number.float"],\n      [/0[xX][0-9a-fA-F_]+/, "number.hex"],\n      [/0[bB][01_]+/, "number.hex"],\n      // binary: use same theme style as hex\n      [/[0-9_]+/, "number"],\n      // delimiter: after number because of .\\d floats\n      [/[;,.]/, "delimiter"],\n      // strings\n      [/"([^"\\\\]|\\\\.)*$/, "string.invalid"],\n      // non-teminated string\n      [/"/, { token: "string.quote", next: "@string" }],\n      [/\\$\\@"/, { token: "string.quote", next: "@litinterpstring" }],\n      [/\\@"/, { token: "string.quote", next: "@litstring" }],\n      [/\\$"/, { token: "string.quote", next: "@interpolatedstring" }],\n      // characters\n      [/\'[^\\\\\']\'/, "string"],\n      [/(\')(@escapes)(\')/, ["string", "string.escape", "string"]],\n      [/\'/, "string.invalid"]\n    ],\n    qualified: [\n      [\n        /[a-zA-Z_][\\w]*/,\n        {\n          cases: {\n            "@keywords": { token: "keyword.$0" },\n            "@default": "identifier"\n          }\n        }\n      ],\n      [/\\./, "delimiter"],\n      ["", "", "@pop"]\n    ],\n    namespace: [\n      { include: "@whitespace" },\n      [/[A-Z]\\w*/, "namespace"],\n      [/[\\.=]/, "delimiter"],\n      ["", "", "@pop"]\n    ],\n    comment: [\n      [/[^\\/*]+/, "comment"],\n      // [/\\/\\*/,    \'comment\', \'@push\' ],    // no nested comments :-(\n      ["\\\\*/", "comment", "@pop"],\n      [/[\\/*]/, "comment"]\n    ],\n    string: [\n      [/[^\\\\"]+/, "string"],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/"/, { token: "string.quote", next: "@pop" }]\n    ],\n    litstring: [\n      [/[^"]+/, "string"],\n      [/""/, "string.escape"],\n      [/"/, { token: "string.quote", next: "@pop" }]\n    ],\n    litinterpstring: [\n      [/[^"{]+/, "string"],\n      [/""/, "string.escape"],\n      [/{{/, "string.escape"],\n      [/}}/, "string.escape"],\n      [/{/, { token: "string.quote", next: "root.litinterpstring" }],\n      [/"/, { token: "string.quote", next: "@pop" }]\n    ],\n    interpolatedstring: [\n      [/[^\\\\"{]+/, "string"],\n      [/@escapes/, "string.escape"],\n      [/\\\\./, "string.escape.invalid"],\n      [/{{/, "string.escape"],\n      [/}}/, "string.escape"],\n      [/{/, { token: "string.quote", next: "root.interpolatedstring" }],\n      [/"/, { token: "string.quote", next: "@pop" }]\n    ],\n    whitespace: [\n      [/^[ \\t\\v\\f]*#((r)|(load))(?=\\s)/, "directive.csx"],\n      [/^[ \\t\\v\\f]*#\\w.*$/, "namespace.cpp"],\n      [/[ \\t\\v\\f\\r\\n]+/, ""],\n      [/\\/\\*/, "comment", "@comment"],\n      [/\\/\\/.*$/, "comment"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTJCLHFCQUFxQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3QkFBd0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUNBQXFDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxQ0FBcUM7QUFDbkQ7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFVBQVU7QUFDVixVQUFVO0FBQ1YsU0FBUyxLQUFLLHFEQUFxRDtBQUNuRSxjQUFjLHFDQUFxQztBQUNuRDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsVUFBVTtBQUNWLFNBQVMsS0FBSyx3REFBd0Q7QUFDdEUsY0FBYyxxQ0FBcUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbmRib3gvLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2NzaGFycC9jc2hhcnAuanM/ZmNlOSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBWZXJzaW9uOiAwLjUwLjAoYzMyMWQwZmJlY2I1MGFiOGE1MzY1ZmExOTY1NDc2YjBhZTYzZmM4NylcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9tb25hY28tZWRpdG9yL2Jsb2IvbWFpbi9MSUNFTlNFLnR4dFxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuLy8gc3JjL2Jhc2ljLWxhbmd1YWdlcy9jc2hhcnAvY3NoYXJwLnRzXG52YXIgY29uZiA9IHtcbiAgd29yZFBhdHRlcm46IC8oLT9cXGQqXFwuXFxkXFx3Kil8KFteXFxgXFx+XFwhXFwjXFwkXFwlXFxeXFwmXFwqXFwoXFwpXFwtXFw9XFwrXFxbXFx7XFxdXFx9XFxcXFxcfFxcO1xcOlxcJ1xcXCJcXCxcXC5cXDxcXD5cXC9cXD9cXHNdKykvZyxcbiAgY29tbWVudHM6IHtcbiAgICBsaW5lQ29tbWVudDogXCIvL1wiLFxuICAgIGJsb2NrQ29tbWVudDogW1wiLypcIiwgXCIqL1wiXVxuICB9LFxuICBicmFja2V0czogW1xuICAgIFtcIntcIiwgXCJ9XCJdLFxuICAgIFtcIltcIiwgXCJdXCJdLFxuICAgIFtcIihcIiwgXCIpXCJdXG4gIF0sXG4gIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIsIG5vdEluOiBbXCJzdHJpbmdcIiwgXCJjb21tZW50XCJdIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJywgbm90SW46IFtcInN0cmluZ1wiLCBcImNvbW1lbnRcIl0gfVxuICBdLFxuICBzdXJyb3VuZGluZ1BhaXJzOiBbXG4gICAgeyBvcGVuOiBcIntcIiwgY2xvc2U6IFwifVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiIH0sXG4gICAgeyBvcGVuOiBcIihcIiwgY2xvc2U6IFwiKVwiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiIH0sXG4gICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH0sXG4gICAgeyBvcGVuOiAnXCInLCBjbG9zZTogJ1wiJyB9XG4gIF0sXG4gIGZvbGRpbmc6IHtcbiAgICBtYXJrZXJzOiB7XG4gICAgICBzdGFydDogbmV3IFJlZ0V4cChcIl5cXFxccyojcmVnaW9uXFxcXGJcIiksXG4gICAgICBlbmQ6IG5ldyBSZWdFeHAoXCJeXFxcXHMqI2VuZHJlZ2lvblxcXFxiXCIpXG4gICAgfVxuICB9XG59O1xudmFyIGxhbmd1YWdlID0ge1xuICBkZWZhdWx0VG9rZW46IFwiXCIsXG4gIHRva2VuUG9zdGZpeDogXCIuY3NcIixcbiAgYnJhY2tldHM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIsIHRva2VuOiBcImRlbGltaXRlci5jdXJseVwiIH0sXG4gICAgeyBvcGVuOiBcIltcIiwgY2xvc2U6IFwiXVwiLCB0b2tlbjogXCJkZWxpbWl0ZXIuc3F1YXJlXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiIH0sXG4gICAgeyBvcGVuOiBcIjxcIiwgY2xvc2U6IFwiPlwiLCB0b2tlbjogXCJkZWxpbWl0ZXIuYW5nbGVcIiB9XG4gIF0sXG4gIGtleXdvcmRzOiBbXG4gICAgXCJleHRlcm5cIixcbiAgICBcImFsaWFzXCIsXG4gICAgXCJ1c2luZ1wiLFxuICAgIFwiYm9vbFwiLFxuICAgIFwiZGVjaW1hbFwiLFxuICAgIFwic2J5dGVcIixcbiAgICBcImJ5dGVcIixcbiAgICBcInNob3J0XCIsXG4gICAgXCJ1c2hvcnRcIixcbiAgICBcImludFwiLFxuICAgIFwidWludFwiLFxuICAgIFwibG9uZ1wiLFxuICAgIFwidWxvbmdcIixcbiAgICBcImNoYXJcIixcbiAgICBcImZsb2F0XCIsXG4gICAgXCJkb3VibGVcIixcbiAgICBcIm9iamVjdFwiLFxuICAgIFwiZHluYW1pY1wiLFxuICAgIFwic3RyaW5nXCIsXG4gICAgXCJhc3NlbWJseVwiLFxuICAgIFwiaXNcIixcbiAgICBcImFzXCIsXG4gICAgXCJyZWZcIixcbiAgICBcIm91dFwiLFxuICAgIFwidGhpc1wiLFxuICAgIFwiYmFzZVwiLFxuICAgIFwibmV3XCIsXG4gICAgXCJ0eXBlb2ZcIixcbiAgICBcInZvaWRcIixcbiAgICBcImNoZWNrZWRcIixcbiAgICBcInVuY2hlY2tlZFwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiZGVsZWdhdGVcIixcbiAgICBcInZhclwiLFxuICAgIFwiY29uc3RcIixcbiAgICBcImlmXCIsXG4gICAgXCJlbHNlXCIsXG4gICAgXCJzd2l0Y2hcIixcbiAgICBcImNhc2VcIixcbiAgICBcIndoaWxlXCIsXG4gICAgXCJkb1wiLFxuICAgIFwiZm9yXCIsXG4gICAgXCJmb3JlYWNoXCIsXG4gICAgXCJpblwiLFxuICAgIFwiYnJlYWtcIixcbiAgICBcImNvbnRpbnVlXCIsXG4gICAgXCJnb3RvXCIsXG4gICAgXCJyZXR1cm5cIixcbiAgICBcInRocm93XCIsXG4gICAgXCJ0cnlcIixcbiAgICBcImNhdGNoXCIsXG4gICAgXCJmaW5hbGx5XCIsXG4gICAgXCJsb2NrXCIsXG4gICAgXCJ5aWVsZFwiLFxuICAgIFwiZnJvbVwiLFxuICAgIFwibGV0XCIsXG4gICAgXCJ3aGVyZVwiLFxuICAgIFwiam9pblwiLFxuICAgIFwib25cIixcbiAgICBcImVxdWFsc1wiLFxuICAgIFwiaW50b1wiLFxuICAgIFwib3JkZXJieVwiLFxuICAgIFwiYXNjZW5kaW5nXCIsXG4gICAgXCJkZXNjZW5kaW5nXCIsXG4gICAgXCJzZWxlY3RcIixcbiAgICBcImdyb3VwXCIsXG4gICAgXCJieVwiLFxuICAgIFwibmFtZXNwYWNlXCIsXG4gICAgXCJwYXJ0aWFsXCIsXG4gICAgXCJjbGFzc1wiLFxuICAgIFwiZmllbGRcIixcbiAgICBcImV2ZW50XCIsXG4gICAgXCJtZXRob2RcIixcbiAgICBcInBhcmFtXCIsXG4gICAgXCJwdWJsaWNcIixcbiAgICBcInByb3RlY3RlZFwiLFxuICAgIFwiaW50ZXJuYWxcIixcbiAgICBcInByaXZhdGVcIixcbiAgICBcImFic3RyYWN0XCIsXG4gICAgXCJzZWFsZWRcIixcbiAgICBcInN0YXRpY1wiLFxuICAgIFwic3RydWN0XCIsXG4gICAgXCJyZWFkb25seVwiLFxuICAgIFwidm9sYXRpbGVcIixcbiAgICBcInZpcnR1YWxcIixcbiAgICBcIm92ZXJyaWRlXCIsXG4gICAgXCJwYXJhbXNcIixcbiAgICBcImdldFwiLFxuICAgIFwic2V0XCIsXG4gICAgXCJhZGRcIixcbiAgICBcInJlbW92ZVwiLFxuICAgIFwib3BlcmF0b3JcIixcbiAgICBcInRydWVcIixcbiAgICBcImZhbHNlXCIsXG4gICAgXCJpbXBsaWNpdFwiLFxuICAgIFwiZXhwbGljaXRcIixcbiAgICBcImludGVyZmFjZVwiLFxuICAgIFwiZW51bVwiLFxuICAgIFwibnVsbFwiLFxuICAgIFwiYXN5bmNcIixcbiAgICBcImF3YWl0XCIsXG4gICAgXCJmaXhlZFwiLFxuICAgIFwic2l6ZW9mXCIsXG4gICAgXCJzdGFja2FsbG9jXCIsXG4gICAgXCJ1bnNhZmVcIixcbiAgICBcIm5hbWVvZlwiLFxuICAgIFwid2hlblwiXG4gIF0sXG4gIG5hbWVzcGFjZUZvbGxvd3M6IFtcIm5hbWVzcGFjZVwiLCBcInVzaW5nXCJdLFxuICBwYXJlbkZvbGxvd3M6IFtcImlmXCIsIFwiZm9yXCIsIFwid2hpbGVcIiwgXCJzd2l0Y2hcIiwgXCJmb3JlYWNoXCIsIFwidXNpbmdcIiwgXCJjYXRjaFwiLCBcIndoZW5cIl0sXG4gIG9wZXJhdG9yczogW1xuICAgIFwiPVwiLFxuICAgIFwiPz9cIixcbiAgICBcInx8XCIsXG4gICAgXCImJlwiLFxuICAgIFwifFwiLFxuICAgIFwiXlwiLFxuICAgIFwiJlwiLFxuICAgIFwiPT1cIixcbiAgICBcIiE9XCIsXG4gICAgXCI8PVwiLFxuICAgIFwiPj1cIixcbiAgICBcIjw8XCIsXG4gICAgXCIrXCIsXG4gICAgXCItXCIsXG4gICAgXCIqXCIsXG4gICAgXCIvXCIsXG4gICAgXCIlXCIsXG4gICAgXCIhXCIsXG4gICAgXCJ+XCIsXG4gICAgXCIrK1wiLFxuICAgIFwiLS1cIixcbiAgICBcIis9XCIsXG4gICAgXCItPVwiLFxuICAgIFwiKj1cIixcbiAgICBcIi89XCIsXG4gICAgXCIlPVwiLFxuICAgIFwiJj1cIixcbiAgICBcInw9XCIsXG4gICAgXCJePVwiLFxuICAgIFwiPDw9XCIsXG4gICAgXCI+Pj1cIixcbiAgICBcIj4+XCIsXG4gICAgXCI9PlwiXG4gIF0sXG4gIHN5bWJvbHM6IC9bPT48IX4/OiZ8K1xcLSpcXC9cXF4lXSsvLFxuICAvLyBlc2NhcGUgc2VxdWVuY2VzXG4gIGVzY2FwZXM6IC9cXFxcKD86W2FiZm5ydHZcXFxcXCInXXx4WzAtOUEtRmEtZl17MSw0fXx1WzAtOUEtRmEtZl17NH18VVswLTlBLUZhLWZdezh9KS8sXG4gIC8vIFRoZSBtYWluIHRva2VuaXplciBmb3Igb3VyIGxhbmd1YWdlc1xuICB0b2tlbml6ZXI6IHtcbiAgICByb290OiBbXG4gICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcbiAgICAgIFtcbiAgICAgICAgL1xcQD9bYS16QS1aX11cXHcqLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBuYW1lc3BhY2VGb2xsb3dzXCI6IHtcbiAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC4kMFwiLFxuICAgICAgICAgICAgICBuZXh0OiBcIkBuYW1lc3BhY2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiQGtleXdvcmRzXCI6IHtcbiAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC4kMFwiLFxuICAgICAgICAgICAgICBuZXh0OiBcIkBxdWFsaWZpZWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogeyB0b2tlbjogXCJpZGVudGlmaWVyXCIsIG5leHQ6IFwiQHF1YWxpZmllZFwiIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAvLyB3aGl0ZXNwYWNlXG4gICAgICB7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LFxuICAgICAgLy8gZGVsaW1pdGVycyBhbmQgb3BlcmF0b3JzXG4gICAgICBbXG4gICAgICAgIC99LyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIiRTMj09aW50ZXJwb2xhdGVkc3RyaW5nXCI6IHtcbiAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsXG4gICAgICAgICAgICAgIG5leHQ6IFwiQHBvcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIkUzI9PWxpdGludGVycHN0cmluZ1wiOiB7XG4gICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZVwiLFxuICAgICAgICAgICAgICBuZXh0OiBcIkBwb3BcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJAYnJhY2tldHNcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvW3t9KClcXFtcXF1dLywgXCJAYnJhY2tldHNcIl0sXG4gICAgICBbL1s8Pl0oPyFAc3ltYm9scykvLCBcIkBicmFja2V0c1wiXSxcbiAgICAgIFtcbiAgICAgICAgL0BzeW1ib2xzLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBvcGVyYXRvcnNcIjogXCJkZWxpbWl0ZXJcIixcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIC8vIG51bWJlcnNcbiAgICAgIFsvWzAtOV9dKlxcLlswLTlfXSsoW2VFXVtcXC0rXT9cXGQrKT9bZkZkRF0/LywgXCJudW1iZXIuZmxvYXRcIl0sXG4gICAgICBbLzBbeFhdWzAtOWEtZkEtRl9dKy8sIFwibnVtYmVyLmhleFwiXSxcbiAgICAgIFsvMFtiQl1bMDFfXSsvLCBcIm51bWJlci5oZXhcIl0sXG4gICAgICAvLyBiaW5hcnk6IHVzZSBzYW1lIHRoZW1lIHN0eWxlIGFzIGhleFxuICAgICAgWy9bMC05X10rLywgXCJudW1iZXJcIl0sXG4gICAgICAvLyBkZWxpbWl0ZXI6IGFmdGVyIG51bWJlciBiZWNhdXNlIG9mIC5cXGQgZmxvYXRzXG4gICAgICBbL1s7LC5dLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICAvLyBzdHJpbmdzXG4gICAgICBbL1wiKFteXCJcXFxcXXxcXFxcLikqJC8sIFwic3RyaW5nLmludmFsaWRcIl0sXG4gICAgICAvLyBub24tdGVtaW5hdGVkIHN0cmluZ1xuICAgICAgWy9cIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIG5leHQ6IFwiQHN0cmluZ1wiIH1dLFxuICAgICAgWy9cXCRcXEBcIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIG5leHQ6IFwiQGxpdGludGVycHN0cmluZ1wiIH1dLFxuICAgICAgWy9cXEBcIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIG5leHQ6IFwiQGxpdHN0cmluZ1wiIH1dLFxuICAgICAgWy9cXCRcIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIG5leHQ6IFwiQGludGVycG9sYXRlZHN0cmluZ1wiIH1dLFxuICAgICAgLy8gY2hhcmFjdGVyc1xuICAgICAgWy8nW15cXFxcJ10nLywgXCJzdHJpbmdcIl0sXG4gICAgICBbLygnKShAZXNjYXBlcykoJykvLCBbXCJzdHJpbmdcIiwgXCJzdHJpbmcuZXNjYXBlXCIsIFwic3RyaW5nXCJdXSxcbiAgICAgIFsvJy8sIFwic3RyaW5nLmludmFsaWRcIl1cbiAgICBdLFxuICAgIHF1YWxpZmllZDogW1xuICAgICAgW1xuICAgICAgICAvW2EtekEtWl9dW1xcd10qLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBrZXl3b3Jkc1wiOiB7IHRva2VuOiBcImtleXdvcmQuJDBcIiB9LFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcImlkZW50aWZpZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvXFwuLywgXCJkZWxpbWl0ZXJcIl0sXG4gICAgICBbXCJcIiwgXCJcIiwgXCJAcG9wXCJdXG4gICAgXSxcbiAgICBuYW1lc3BhY2U6IFtcbiAgICAgIHsgaW5jbHVkZTogXCJAd2hpdGVzcGFjZVwiIH0sXG4gICAgICBbL1tBLVpdXFx3Ki8sIFwibmFtZXNwYWNlXCJdLFxuICAgICAgWy9bXFwuPV0vLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcIlwiLCBcIlwiLCBcIkBwb3BcIl1cbiAgICBdLFxuICAgIGNvbW1lbnQ6IFtcbiAgICAgIFsvW15cXC8qXSsvLCBcImNvbW1lbnRcIl0sXG4gICAgICAvLyBbL1xcL1xcKi8sICAgICdjb21tZW50JywgJ0BwdXNoJyBdLCAgICAvLyBubyBuZXN0ZWQgY29tbWVudHMgOi0oXG4gICAgICBbXCJcXFxcKi9cIiwgXCJjb21tZW50XCIsIFwiQHBvcFwiXSxcbiAgICAgIFsvW1xcLypdLywgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBzdHJpbmc6IFtcbiAgICAgIFsvW15cXFxcXCJdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9AZXNjYXBlcy8sIFwic3RyaW5nLmVzY2FwZVwiXSxcbiAgICAgIFsvXFxcXC4vLCBcInN0cmluZy5lc2NhcGUuaW52YWxpZFwiXSxcbiAgICAgIFsvXCIvLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBuZXh0OiBcIkBwb3BcIiB9XVxuICAgIF0sXG4gICAgbGl0c3RyaW5nOiBbXG4gICAgICBbL1teXCJdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9cIlwiLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy9cIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICBsaXRpbnRlcnBzdHJpbmc6IFtcbiAgICAgIFsvW15cIntdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9cIlwiLywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy97ey8sIFwic3RyaW5nLmVzY2FwZVwiXSxcbiAgICAgIFsvfX0vLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL3svLCB7IHRva2VuOiBcInN0cmluZy5xdW90ZVwiLCBuZXh0OiBcInJvb3QubGl0aW50ZXJwc3RyaW5nXCIgfV0sXG4gICAgICBbL1wiLywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgbmV4dDogXCJAcG9wXCIgfV1cbiAgICBdLFxuICAgIGludGVycG9sYXRlZHN0cmluZzogW1xuICAgICAgWy9bXlxcXFxcIntdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9AZXNjYXBlcy8sIFwic3RyaW5nLmVzY2FwZVwiXSxcbiAgICAgIFsvXFxcXC4vLCBcInN0cmluZy5lc2NhcGUuaW52YWxpZFwiXSxcbiAgICAgIFsve3svLCBcInN0cmluZy5lc2NhcGVcIl0sXG4gICAgICBbL319LywgXCJzdHJpbmcuZXNjYXBlXCJdLFxuICAgICAgWy97LywgeyB0b2tlbjogXCJzdHJpbmcucXVvdGVcIiwgbmV4dDogXCJyb290LmludGVycG9sYXRlZHN0cmluZ1wiIH1dLFxuICAgICAgWy9cIi8sIHsgdG9rZW46IFwic3RyaW5nLnF1b3RlXCIsIG5leHQ6IFwiQHBvcFwiIH1dXG4gICAgXSxcbiAgICB3aGl0ZXNwYWNlOiBbXG4gICAgICBbL15bIFxcdFxcdlxcZl0qIygocil8KGxvYWQpKSg/PVxccykvLCBcImRpcmVjdGl2ZS5jc3hcIl0sXG4gICAgICBbL15bIFxcdFxcdlxcZl0qI1xcdy4qJC8sIFwibmFtZXNwYWNlLmNwcFwiXSxcbiAgICAgIFsvWyBcXHRcXHZcXGZcXHJcXG5dKy8sIFwiXCJdLFxuICAgICAgWy9cXC9cXCovLCBcImNvbW1lbnRcIiwgXCJAY29tbWVudFwiXSxcbiAgICAgIFsvXFwvXFwvLiokLywgXCJjb21tZW50XCJdXG4gICAgXVxuICB9XG59O1xuZXhwb3J0IHtcbiAgY29uZixcbiAgbGFuZ3VhZ2Vcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///69038\n')}}]);