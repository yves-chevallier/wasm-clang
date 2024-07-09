"use strict";(self.webpackChunksandbox=self.webpackChunksandbox||[]).push([[494],{10494:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   conf: () => (/* binding */ conf),\n/* harmony export */   language: () => (/* binding */ language)\n/* harmony export */ });\n/*!-----------------------------------------------------------------------------\n * Copyright (c) Microsoft Corporation. All rights reserved.\n * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)\n * Released under the MIT license\n * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt\n *-----------------------------------------------------------------------------*/\n\n\n// src/basic-languages/cypher/cypher.ts\nvar conf = {\n  comments: {\n    lineComment: "//",\n    blockComment: ["/*", "*/"]\n  },\n  brackets: [\n    ["{", "}"],\n    ["[", "]"],\n    ["(", ")"]\n  ],\n  autoClosingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' },\n    { open: "\'", close: "\'" },\n    { open: "`", close: "`" }\n  ],\n  surroundingPairs: [\n    { open: "{", close: "}" },\n    { open: "[", close: "]" },\n    { open: "(", close: ")" },\n    { open: \'"\', close: \'"\' },\n    { open: "\'", close: "\'" },\n    { open: "`", close: "`" }\n  ]\n};\nvar language = {\n  defaultToken: "",\n  tokenPostfix: `.cypher`,\n  ignoreCase: true,\n  brackets: [\n    { open: "{", close: "}", token: "delimiter.curly" },\n    { open: "[", close: "]", token: "delimiter.bracket" },\n    { open: "(", close: ")", token: "delimiter.parenthesis" }\n  ],\n  keywords: [\n    "ALL",\n    "AND",\n    "AS",\n    "ASC",\n    "ASCENDING",\n    "BY",\n    "CALL",\n    "CASE",\n    "CONTAINS",\n    "CREATE",\n    "DELETE",\n    "DESC",\n    "DESCENDING",\n    "DETACH",\n    "DISTINCT",\n    "ELSE",\n    "END",\n    "ENDS",\n    "EXISTS",\n    "IN",\n    "IS",\n    "LIMIT",\n    "MANDATORY",\n    "MATCH",\n    "MERGE",\n    "NOT",\n    "ON",\n    "ON",\n    "OPTIONAL",\n    "OR",\n    "ORDER",\n    "REMOVE",\n    "RETURN",\n    "SET",\n    "SKIP",\n    "STARTS",\n    "THEN",\n    "UNION",\n    "UNWIND",\n    "WHEN",\n    "WHERE",\n    "WITH",\n    "XOR",\n    "YIELD"\n  ],\n  builtinLiterals: ["true", "TRUE", "false", "FALSE", "null", "NULL"],\n  builtinFunctions: [\n    "abs",\n    "acos",\n    "asin",\n    "atan",\n    "atan2",\n    "avg",\n    "ceil",\n    "coalesce",\n    "collect",\n    "cos",\n    "cot",\n    "count",\n    "degrees",\n    "e",\n    "endNode",\n    "exists",\n    "exp",\n    "floor",\n    "head",\n    "id",\n    "keys",\n    "labels",\n    "last",\n    "left",\n    "length",\n    "log",\n    "log10",\n    "lTrim",\n    "max",\n    "min",\n    "nodes",\n    "percentileCont",\n    "percentileDisc",\n    "pi",\n    "properties",\n    "radians",\n    "rand",\n    "range",\n    "relationships",\n    "replace",\n    "reverse",\n    "right",\n    "round",\n    "rTrim",\n    "sign",\n    "sin",\n    "size",\n    "split",\n    "sqrt",\n    "startNode",\n    "stDev",\n    "stDevP",\n    "substring",\n    "sum",\n    "tail",\n    "tan",\n    "timestamp",\n    "toBoolean",\n    "toFloat",\n    "toInteger",\n    "toLower",\n    "toString",\n    "toUpper",\n    "trim",\n    "type"\n  ],\n  operators: [\n    // Math operators\n    "+",\n    "-",\n    "*",\n    "/",\n    "%",\n    "^",\n    // Comparison operators\n    "=",\n    "<>",\n    "<",\n    ">",\n    "<=",\n    ">=",\n    // Pattern operators\n    "->",\n    "<-",\n    "--\x3e",\n    "<--"\n  ],\n  escapes: /\\\\(?:[tbnrf\\\\"\'`]|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n  digits: /\\d+/,\n  octaldigits: /[0-7]+/,\n  hexdigits: /[0-9a-fA-F]+/,\n  tokenizer: {\n    root: [[/[{}[\\]()]/, "@brackets"], { include: "common" }],\n    common: [\n      { include: "@whitespace" },\n      { include: "@numbers" },\n      { include: "@strings" },\n      // Cypher labels on nodes/relationships, e.g. (n:NodeLabel)-[e:RelationshipLabel]\n      [/:[a-zA-Z_][\\w]*/, "type.identifier"],\n      [\n        /[a-zA-Z_][\\w]*(?=\\()/,\n        {\n          cases: {\n            "@builtinFunctions": "predefined.function"\n          }\n        }\n      ],\n      [\n        /[a-zA-Z_$][\\w$]*/,\n        {\n          cases: {\n            "@keywords": "keyword",\n            "@builtinLiterals": "predefined.literal",\n            "@default": "identifier"\n          }\n        }\n      ],\n      [/`/, "identifier.escape", "@identifierBacktick"],\n      // delimiter and operator after number because of `.\\d` floats and `:` in labels\n      [/[;,.:|]/, "delimiter"],\n      [\n        /[<>=%+\\-*/^]+/,\n        {\n          cases: {\n            "@operators": "delimiter",\n            "@default": ""\n          }\n        }\n      ]\n    ],\n    numbers: [\n      [/-?(@digits)[eE](-?(@digits))?/, "number.float"],\n      [/-?(@digits)?\\.(@digits)([eE]-?(@digits))?/, "number.float"],\n      [/-?0x(@hexdigits)/, "number.hex"],\n      [/-?0(@octaldigits)/, "number.octal"],\n      [/-?(@digits)/, "number"]\n    ],\n    strings: [\n      [/"([^"\\\\]|\\\\.)*$/, "string.invalid"],\n      // non-teminated string\n      [/\'([^\'\\\\]|\\\\.)*$/, "string.invalid"],\n      // non-teminated string\n      [/"/, "string", "@stringDouble"],\n      [/\'/, "string", "@stringSingle"]\n    ],\n    whitespace: [\n      [/[ \\t\\r\\n]+/, "white"],\n      [/\\/\\*/, "comment", "@comment"],\n      [/\\/\\/.*$/, "comment"]\n    ],\n    comment: [\n      [/\\/\\/.*/, "comment"],\n      [/[^/*]+/, "comment"],\n      [/\\*\\//, "comment", "@pop"],\n      [/[/*]/, "comment"]\n    ],\n    stringDouble: [\n      [/[^\\\\"]+/, "string"],\n      [/@escapes/, "string"],\n      [/\\\\./, "string.invalid"],\n      [/"/, "string", "@pop"]\n    ],\n    stringSingle: [\n      [/[^\\\\\']+/, "string"],\n      [/@escapes/, "string"],\n      [/\\\\./, "string.invalid"],\n      [/\'/, "string", "@pop"]\n    ],\n    identifierBacktick: [\n      [/[^\\\\`]+/, "identifier.escape"],\n      [/@escapes/, "identifier.escape"],\n      [/\\\\./, "identifier.escape.invalid"],\n      [/`/, "identifier.escape", "@pop"]\n    ]\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTA0OTQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxPQUFPLEtBQUs7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxZQUFZLEdBQUc7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTSx1QkFBdUI7QUFDN0IsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNLFFBQVEsWUFBWSxHQUFHO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU0sdUJBQXVCO0FBQzdCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxZQUFZLDZCQUE2QjtBQUN2RCxNQUFNLG1EQUFtRDtBQUN6RCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsRUFBRSxjQUFjLEVBQUU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUJBQXlCLG1CQUFtQjtBQUM1RDtBQUNBLFFBQVEsd0JBQXdCO0FBQ2hDLFFBQVEscUJBQXFCO0FBQzdCLFFBQVEscUJBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhbmRib3gvLi9ub2RlX21vZHVsZXMvbW9uYWNvLWVkaXRvci9lc20vdnMvYmFzaWMtbGFuZ3VhZ2VzL2N5cGhlci9jeXBoZXIuanM/NTQxZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBWZXJzaW9uOiAwLjUwLjAoYzMyMWQwZmJlY2I1MGFiOGE1MzY1ZmExOTY1NDc2YjBhZTYzZmM4NylcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9tb25hY28tZWRpdG9yL2Jsb2IvbWFpbi9MSUNFTlNFLnR4dFxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuLy8gc3JjL2Jhc2ljLWxhbmd1YWdlcy9jeXBoZXIvY3lwaGVyLnRzXG52YXIgY29uZiA9IHtcbiAgY29tbWVudHM6IHtcbiAgICBsaW5lQ29tbWVudDogXCIvL1wiLFxuICAgIGJsb2NrQ29tbWVudDogW1wiLypcIiwgXCIqL1wiXVxuICB9LFxuICBicmFja2V0czogW1xuICAgIFtcIntcIiwgXCJ9XCJdLFxuICAgIFtcIltcIiwgXCJdXCJdLFxuICAgIFtcIihcIiwgXCIpXCJdXG4gIF0sXG4gIGF1dG9DbG9zaW5nUGFpcnM6IFtcbiAgICB7IG9wZW46IFwie1wiLCBjbG9zZTogXCJ9XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIgfSxcbiAgICB7IG9wZW46ICdcIicsIGNsb3NlOiAnXCInIH0sXG4gICAgeyBvcGVuOiBcIidcIiwgY2xvc2U6IFwiJ1wiIH0sXG4gICAgeyBvcGVuOiBcImBcIiwgY2xvc2U6IFwiYFwiIH1cbiAgXSxcbiAgc3Vycm91bmRpbmdQYWlyczogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiB9LFxuICAgIHsgb3BlbjogXCJbXCIsIGNsb3NlOiBcIl1cIiB9LFxuICAgIHsgb3BlbjogXCIoXCIsIGNsb3NlOiBcIilcIiB9LFxuICAgIHsgb3BlbjogJ1wiJywgY2xvc2U6ICdcIicgfSxcbiAgICB7IG9wZW46IFwiJ1wiLCBjbG9zZTogXCInXCIgfSxcbiAgICB7IG9wZW46IFwiYFwiLCBjbG9zZTogXCJgXCIgfVxuICBdXG59O1xudmFyIGxhbmd1YWdlID0ge1xuICBkZWZhdWx0VG9rZW46IFwiXCIsXG4gIHRva2VuUG9zdGZpeDogYC5jeXBoZXJgLFxuICBpZ25vcmVDYXNlOiB0cnVlLFxuICBicmFja2V0czogW1xuICAgIHsgb3BlbjogXCJ7XCIsIGNsb3NlOiBcIn1cIiwgdG9rZW46IFwiZGVsaW1pdGVyLmN1cmx5XCIgfSxcbiAgICB7IG9wZW46IFwiW1wiLCBjbG9zZTogXCJdXCIsIHRva2VuOiBcImRlbGltaXRlci5icmFja2V0XCIgfSxcbiAgICB7IG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCIsIHRva2VuOiBcImRlbGltaXRlci5wYXJlbnRoZXNpc1wiIH1cbiAgXSxcbiAga2V5d29yZHM6IFtcbiAgICBcIkFMTFwiLFxuICAgIFwiQU5EXCIsXG4gICAgXCJBU1wiLFxuICAgIFwiQVNDXCIsXG4gICAgXCJBU0NFTkRJTkdcIixcbiAgICBcIkJZXCIsXG4gICAgXCJDQUxMXCIsXG4gICAgXCJDQVNFXCIsXG4gICAgXCJDT05UQUlOU1wiLFxuICAgIFwiQ1JFQVRFXCIsXG4gICAgXCJERUxFVEVcIixcbiAgICBcIkRFU0NcIixcbiAgICBcIkRFU0NFTkRJTkdcIixcbiAgICBcIkRFVEFDSFwiLFxuICAgIFwiRElTVElOQ1RcIixcbiAgICBcIkVMU0VcIixcbiAgICBcIkVORFwiLFxuICAgIFwiRU5EU1wiLFxuICAgIFwiRVhJU1RTXCIsXG4gICAgXCJJTlwiLFxuICAgIFwiSVNcIixcbiAgICBcIkxJTUlUXCIsXG4gICAgXCJNQU5EQVRPUllcIixcbiAgICBcIk1BVENIXCIsXG4gICAgXCJNRVJHRVwiLFxuICAgIFwiTk9UXCIsXG4gICAgXCJPTlwiLFxuICAgIFwiT05cIixcbiAgICBcIk9QVElPTkFMXCIsXG4gICAgXCJPUlwiLFxuICAgIFwiT1JERVJcIixcbiAgICBcIlJFTU9WRVwiLFxuICAgIFwiUkVUVVJOXCIsXG4gICAgXCJTRVRcIixcbiAgICBcIlNLSVBcIixcbiAgICBcIlNUQVJUU1wiLFxuICAgIFwiVEhFTlwiLFxuICAgIFwiVU5JT05cIixcbiAgICBcIlVOV0lORFwiLFxuICAgIFwiV0hFTlwiLFxuICAgIFwiV0hFUkVcIixcbiAgICBcIldJVEhcIixcbiAgICBcIlhPUlwiLFxuICAgIFwiWUlFTERcIlxuICBdLFxuICBidWlsdGluTGl0ZXJhbHM6IFtcInRydWVcIiwgXCJUUlVFXCIsIFwiZmFsc2VcIiwgXCJGQUxTRVwiLCBcIm51bGxcIiwgXCJOVUxMXCJdLFxuICBidWlsdGluRnVuY3Rpb25zOiBbXG4gICAgXCJhYnNcIixcbiAgICBcImFjb3NcIixcbiAgICBcImFzaW5cIixcbiAgICBcImF0YW5cIixcbiAgICBcImF0YW4yXCIsXG4gICAgXCJhdmdcIixcbiAgICBcImNlaWxcIixcbiAgICBcImNvYWxlc2NlXCIsXG4gICAgXCJjb2xsZWN0XCIsXG4gICAgXCJjb3NcIixcbiAgICBcImNvdFwiLFxuICAgIFwiY291bnRcIixcbiAgICBcImRlZ3JlZXNcIixcbiAgICBcImVcIixcbiAgICBcImVuZE5vZGVcIixcbiAgICBcImV4aXN0c1wiLFxuICAgIFwiZXhwXCIsXG4gICAgXCJmbG9vclwiLFxuICAgIFwiaGVhZFwiLFxuICAgIFwiaWRcIixcbiAgICBcImtleXNcIixcbiAgICBcImxhYmVsc1wiLFxuICAgIFwibGFzdFwiLFxuICAgIFwibGVmdFwiLFxuICAgIFwibGVuZ3RoXCIsXG4gICAgXCJsb2dcIixcbiAgICBcImxvZzEwXCIsXG4gICAgXCJsVHJpbVwiLFxuICAgIFwibWF4XCIsXG4gICAgXCJtaW5cIixcbiAgICBcIm5vZGVzXCIsXG4gICAgXCJwZXJjZW50aWxlQ29udFwiLFxuICAgIFwicGVyY2VudGlsZURpc2NcIixcbiAgICBcInBpXCIsXG4gICAgXCJwcm9wZXJ0aWVzXCIsXG4gICAgXCJyYWRpYW5zXCIsXG4gICAgXCJyYW5kXCIsXG4gICAgXCJyYW5nZVwiLFxuICAgIFwicmVsYXRpb25zaGlwc1wiLFxuICAgIFwicmVwbGFjZVwiLFxuICAgIFwicmV2ZXJzZVwiLFxuICAgIFwicmlnaHRcIixcbiAgICBcInJvdW5kXCIsXG4gICAgXCJyVHJpbVwiLFxuICAgIFwic2lnblwiLFxuICAgIFwic2luXCIsXG4gICAgXCJzaXplXCIsXG4gICAgXCJzcGxpdFwiLFxuICAgIFwic3FydFwiLFxuICAgIFwic3RhcnROb2RlXCIsXG4gICAgXCJzdERldlwiLFxuICAgIFwic3REZXZQXCIsXG4gICAgXCJzdWJzdHJpbmdcIixcbiAgICBcInN1bVwiLFxuICAgIFwidGFpbFwiLFxuICAgIFwidGFuXCIsXG4gICAgXCJ0aW1lc3RhbXBcIixcbiAgICBcInRvQm9vbGVhblwiLFxuICAgIFwidG9GbG9hdFwiLFxuICAgIFwidG9JbnRlZ2VyXCIsXG4gICAgXCJ0b0xvd2VyXCIsXG4gICAgXCJ0b1N0cmluZ1wiLFxuICAgIFwidG9VcHBlclwiLFxuICAgIFwidHJpbVwiLFxuICAgIFwidHlwZVwiXG4gIF0sXG4gIG9wZXJhdG9yczogW1xuICAgIC8vIE1hdGggb3BlcmF0b3JzXG4gICAgXCIrXCIsXG4gICAgXCItXCIsXG4gICAgXCIqXCIsXG4gICAgXCIvXCIsXG4gICAgXCIlXCIsXG4gICAgXCJeXCIsXG4gICAgLy8gQ29tcGFyaXNvbiBvcGVyYXRvcnNcbiAgICBcIj1cIixcbiAgICBcIjw+XCIsXG4gICAgXCI8XCIsXG4gICAgXCI+XCIsXG4gICAgXCI8PVwiLFxuICAgIFwiPj1cIixcbiAgICAvLyBQYXR0ZXJuIG9wZXJhdG9yc1xuICAgIFwiLT5cIixcbiAgICBcIjwtXCIsXG4gICAgXCItLT5cIixcbiAgICBcIjwtLVwiXG4gIF0sXG4gIGVzY2FwZXM6IC9cXFxcKD86W3RibnJmXFxcXFwiJ2BdfHVbMC05QS1GYS1mXXs0fXxVWzAtOUEtRmEtZl17OH0pLyxcbiAgZGlnaXRzOiAvXFxkKy8sXG4gIG9jdGFsZGlnaXRzOiAvWzAtN10rLyxcbiAgaGV4ZGlnaXRzOiAvWzAtOWEtZkEtRl0rLyxcbiAgdG9rZW5pemVyOiB7XG4gICAgcm9vdDogW1svW3t9W1xcXSgpXS8sIFwiQGJyYWNrZXRzXCJdLCB7IGluY2x1ZGU6IFwiY29tbW9uXCIgfV0sXG4gICAgY29tbW9uOiBbXG4gICAgICB7IGluY2x1ZGU6IFwiQHdoaXRlc3BhY2VcIiB9LFxuICAgICAgeyBpbmNsdWRlOiBcIkBudW1iZXJzXCIgfSxcbiAgICAgIHsgaW5jbHVkZTogXCJAc3RyaW5nc1wiIH0sXG4gICAgICAvLyBDeXBoZXIgbGFiZWxzIG9uIG5vZGVzL3JlbGF0aW9uc2hpcHMsIGUuZy4gKG46Tm9kZUxhYmVsKS1bZTpSZWxhdGlvbnNoaXBMYWJlbF1cbiAgICAgIFsvOlthLXpBLVpfXVtcXHddKi8sIFwidHlwZS5pZGVudGlmaWVyXCJdLFxuICAgICAgW1xuICAgICAgICAvW2EtekEtWl9dW1xcd10qKD89XFwoKS8sXG4gICAgICAgIHtcbiAgICAgICAgICBjYXNlczoge1xuICAgICAgICAgICAgXCJAYnVpbHRpbkZ1bmN0aW9uc1wiOiBcInByZWRlZmluZWQuZnVuY3Rpb25cIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgL1thLXpBLVpfJF1bXFx3JF0qLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBrZXl3b3Jkc1wiOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIFwiQGJ1aWx0aW5MaXRlcmFsc1wiOiBcInByZWRlZmluZWQubGl0ZXJhbFwiLFxuICAgICAgICAgICAgXCJAZGVmYXVsdFwiOiBcImlkZW50aWZpZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFsvYC8sIFwiaWRlbnRpZmllci5lc2NhcGVcIiwgXCJAaWRlbnRpZmllckJhY2t0aWNrXCJdLFxuICAgICAgLy8gZGVsaW1pdGVyIGFuZCBvcGVyYXRvciBhZnRlciBudW1iZXIgYmVjYXVzZSBvZiBgLlxcZGAgZmxvYXRzIGFuZCBgOmAgaW4gbGFiZWxzXG4gICAgICBbL1s7LC46fF0vLCBcImRlbGltaXRlclwiXSxcbiAgICAgIFtcbiAgICAgICAgL1s8Pj0lK1xcLSovXl0rLyxcbiAgICAgICAge1xuICAgICAgICAgIGNhc2VzOiB7XG4gICAgICAgICAgICBcIkBvcGVyYXRvcnNcIjogXCJkZWxpbWl0ZXJcIixcbiAgICAgICAgICAgIFwiQGRlZmF1bHRcIjogXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIF0sXG4gICAgbnVtYmVyczogW1xuICAgICAgWy8tPyhAZGlnaXRzKVtlRV0oLT8oQGRpZ2l0cykpPy8sIFwibnVtYmVyLmZsb2F0XCJdLFxuICAgICAgWy8tPyhAZGlnaXRzKT9cXC4oQGRpZ2l0cykoW2VFXS0/KEBkaWdpdHMpKT8vLCBcIm51bWJlci5mbG9hdFwiXSxcbiAgICAgIFsvLT8weChAaGV4ZGlnaXRzKS8sIFwibnVtYmVyLmhleFwiXSxcbiAgICAgIFsvLT8wKEBvY3RhbGRpZ2l0cykvLCBcIm51bWJlci5vY3RhbFwiXSxcbiAgICAgIFsvLT8oQGRpZ2l0cykvLCBcIm51bWJlclwiXVxuICAgIF0sXG4gICAgc3RyaW5nczogW1xuICAgICAgWy9cIihbXlwiXFxcXF18XFxcXC4pKiQvLCBcInN0cmluZy5pbnZhbGlkXCJdLFxuICAgICAgLy8gbm9uLXRlbWluYXRlZCBzdHJpbmdcbiAgICAgIFsvJyhbXidcXFxcXXxcXFxcLikqJC8sIFwic3RyaW5nLmludmFsaWRcIl0sXG4gICAgICAvLyBub24tdGVtaW5hdGVkIHN0cmluZ1xuICAgICAgWy9cIi8sIFwic3RyaW5nXCIsIFwiQHN0cmluZ0RvdWJsZVwiXSxcbiAgICAgIFsvJy8sIFwic3RyaW5nXCIsIFwiQHN0cmluZ1NpbmdsZVwiXVxuICAgIF0sXG4gICAgd2hpdGVzcGFjZTogW1xuICAgICAgWy9bIFxcdFxcclxcbl0rLywgXCJ3aGl0ZVwiXSxcbiAgICAgIFsvXFwvXFwqLywgXCJjb21tZW50XCIsIFwiQGNvbW1lbnRcIl0sXG4gICAgICBbL1xcL1xcLy4qJC8sIFwiY29tbWVudFwiXVxuICAgIF0sXG4gICAgY29tbWVudDogW1xuICAgICAgWy9cXC9cXC8uKi8sIFwiY29tbWVudFwiXSxcbiAgICAgIFsvW14vKl0rLywgXCJjb21tZW50XCJdLFxuICAgICAgWy9cXCpcXC8vLCBcImNvbW1lbnRcIiwgXCJAcG9wXCJdLFxuICAgICAgWy9bLypdLywgXCJjb21tZW50XCJdXG4gICAgXSxcbiAgICBzdHJpbmdEb3VibGU6IFtcbiAgICAgIFsvW15cXFxcXCJdKy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9AZXNjYXBlcy8sIFwic3RyaW5nXCJdLFxuICAgICAgWy9cXFxcLi8sIFwic3RyaW5nLmludmFsaWRcIl0sXG4gICAgICBbL1wiLywgXCJzdHJpbmdcIiwgXCJAcG9wXCJdXG4gICAgXSxcbiAgICBzdHJpbmdTaW5nbGU6IFtcbiAgICAgIFsvW15cXFxcJ10rLywgXCJzdHJpbmdcIl0sXG4gICAgICBbL0Blc2NhcGVzLywgXCJzdHJpbmdcIl0sXG4gICAgICBbL1xcXFwuLywgXCJzdHJpbmcuaW52YWxpZFwiXSxcbiAgICAgIFsvJy8sIFwic3RyaW5nXCIsIFwiQHBvcFwiXVxuICAgIF0sXG4gICAgaWRlbnRpZmllckJhY2t0aWNrOiBbXG4gICAgICBbL1teXFxcXGBdKy8sIFwiaWRlbnRpZmllci5lc2NhcGVcIl0sXG4gICAgICBbL0Blc2NhcGVzLywgXCJpZGVudGlmaWVyLmVzY2FwZVwiXSxcbiAgICAgIFsvXFxcXC4vLCBcImlkZW50aWZpZXIuZXNjYXBlLmludmFsaWRcIl0sXG4gICAgICBbL2AvLCBcImlkZW50aWZpZXIuZXNjYXBlXCIsIFwiQHBvcFwiXVxuICAgIF1cbiAgfVxufTtcbmV4cG9ydCB7XG4gIGNvbmYsXG4gIGxhbmd1YWdlXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///10494\n')}}]);