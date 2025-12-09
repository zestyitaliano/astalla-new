// src/button.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ children, variant = "primary", className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
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
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Card({ title, footer, children, className, ...props }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm ${className || ""}`,
      ...props,
      children: [
        title && /* @__PURE__ */ jsx2("div", { className: "px-6 py-4 border-b border-zinc-200 dark:border-zinc-800", children: /* @__PURE__ */ jsx2("h3", { className: "text-lg font-medium text-zinc-900 dark:text-zinc-100", children: title }) }),
        /* @__PURE__ */ jsx2("div", { className: "px-6 py-4", children }),
        footer && /* @__PURE__ */ jsx2("div", { className: "px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-200 dark:border-zinc-800 rounded-b-lg", children: footer })
      ]
    }
  );
}

// src/input.tsx
import * as React2 from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Input = React2.forwardRef(
  ({ className, label, error, ...props }, ref) => {
    return /* @__PURE__ */ jsxs2("div", { className: "w-full", children: [
      label && /* @__PURE__ */ jsx3("label", { className: "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5", children: label }),
      /* @__PURE__ */ jsx3(
        "input",
        {
          className: `flex h-10 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:text-white ${error ? "border-red-500 focus:ring-red-500" : ""} ${className || ""}`,
          ref,
          ...props
        }
      ),
      error && /* @__PURE__ */ jsx3("p", { className: "mt-1 text-sm text-red-500", children: error })
    ] });
  }
);
Input.displayName = "Input";

// src/shell.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Shell({ children, sidebar, header }) {
  return /* @__PURE__ */ jsxs3("div", { className: "flex min-h-screen bg-zinc-50 dark:bg-zinc-950", children: [
    sidebar && /* @__PURE__ */ jsx4("aside", { className: "w-64 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hidden md:block", children: /* @__PURE__ */ jsx4("div", { className: "h-full px-4 py-6", children: sidebar }) }),
    /* @__PURE__ */ jsxs3("div", { className: "flex-1 flex flex-col min-w-0", children: [
      header && /* @__PURE__ */ jsx4("header", { className: "h-16 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-10", children: header }),
      /* @__PURE__ */ jsx4("main", { className: "flex-1 p-6 overflow-auto", children })
    ] })
  ] });
}
export {
  Button,
  Card,
  Input,
  Shell
};
