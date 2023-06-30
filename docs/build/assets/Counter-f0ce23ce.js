import { r as reactExports, j as jsxRuntimeExports } from "./client-entry-37002550.js";
function Counter() {
  const [count, setCount] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      count,
      "1"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCount((count2) => count2 + 1), children: "点击+1" })
  ] });
}
export {
  Counter as default
};
