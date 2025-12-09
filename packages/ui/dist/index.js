"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Button: () => Button,
  Card: () => Card,
  Input: () => Input,
  Shell: () => Shell
});
module.exports = __toCommonJS(src_exports);

// src/button.tsx
var React = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var Button = React.forwardRef(
  ({ children, variant = "primary", className, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref,
        className: `px-4 py-2 rounded-md font-medium transition-colors ${variant === "primary" ? "bg-brand-600 text-white hover:bg-brand-700" : "bg-brand-100 text-brand-900 hover:bg-brand-200"} ${className}`,
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";

// src/card.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Card({ title, footer, children, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: `bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm ${className || ""}`,
      ...props,
      children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-6 py-4 border-b border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-lg font-medium text-zinc-900 dark:text-zinc-100", children: title }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-6 py-4", children }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 rounded-b-lg", children: footer })
      ]
    }
  );
}

// src/input.tsx
var React2 = __toESM(require("react"));
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = React2.forwardRef(
  ({ className, label, error, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "w-full", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          className: `flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:text-white ${error ? "border-red-500 focus:ring-red-500" : ""} ${className || ""}`,
          ref,
          ...props
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-1 text-sm text-red-500", children: error })
    ] });
  }
);
Input.displayName = "Input";

// src/shell.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Shell({ children, sidebar, header }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex min-h-screen bg-zinc-50 dark:bg-zinc-950", children: [
    sidebar && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("aside", { className: "w-64 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-full px-4 py-6", children: sidebar }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-1 flex flex-col min-w-0", children: [
      header && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("header", { className: "h-16 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10", children: header }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("main", { className: "flex-1 p-6 overflow-auto", children })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  Input,
  Shell
});
