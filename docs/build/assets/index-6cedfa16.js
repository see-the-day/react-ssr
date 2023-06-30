import { j as jsxRuntimeExports } from "./client-entry-37002550.js";
import Counter from "./Counter-f0ce23ce.js";
const frontmatter = {
  "title": "custom title1"
};
const toc = [{
  "id": "autolink-literals-1",
  "text": "Autolink literals",
  "depth": 2
}, {
  "id": "footnote-1",
  "text": "Footnote",
  "depth": 2
}, {
  "id": "strike-through-1",
  "text": "Strike through",
  "depth": 2
}, {
  "id": "table-1",
  "text": "Table",
  "depth": 2
}, {
  "id": "tasklist-1",
  "text": "Tasklist",
  "depth": 2
}];
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    a: "a",
    p: "p",
    h2: "h2",
    sup: "sup",
    code: "code",
    del: "del",
    table: "table",
    thead: "thead",
    tr: "tr",
    th: "th",
    tbody: "tbody",
    td: "td",
    ul: "ul",
    li: "li",
    input: "input",
    div: "div",
    span: "span",
    pre: "pre",
    section: "section",
    ol: "ol"
  }, props.components);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [jsxRuntimeExports.jsx(Counter, {}), "\n", jsxRuntimeExports.jsxs(_components.h1, {
      id: "gfm",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#gfm",
        children: "#"
      }), "GFM"]
    }), "\n", jsxRuntimeExports.jsx(_components.p, {
      children: "211113"
    }), "\n", jsxRuntimeExports.jsxs(_components.h2, {
      id: "autolink-literals",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#autolink-literals",
        children: "#"
      }), jsxRuntimeExports.jsx(_components.a, {
        href: "/index",
        children: "Autolink"
      }), " literals"]
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: [jsxRuntimeExports.jsx(_components.a, {
        href: "http://www.example.com",
        children: "www.example.com"
      }), ", ", jsxRuntimeExports.jsx(_components.a, {
        href: "https://example.com",
        children: "https://example.com"
      }), ", and ", jsxRuntimeExports.jsx(_components.a, {
        href: "mailto:contact@example.com",
        children: "contact@example.com"
      }), "."]
    }), "\n", jsxRuntimeExports.jsxs(_components.h2, {
      id: "footnote",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#footnote",
        children: "#"
      }), "Footnote"]
    }), "\n", jsxRuntimeExports.jsx(_components.p, {
      children: "123"
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: ["A note", jsxRuntimeExports.jsx(_components.sup, {
        children: jsxRuntimeExports.jsx(_components.a, {
          href: "#user-content-fn-1",
          id: "user-content-fnref-1",
          "data-footnote-ref": true,
          "aria-describedby": "footnote-label",
          children: "1"
        })
      })]
    }), "\n", jsxRuntimeExports.jsxs(_components.h2, {
      id: "strike-through",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#strike-through",
        children: "#"
      }), "Strike ", jsxRuntimeExports.jsx(_components.code, {
        children: "through"
      })]
    }), "\n", jsxRuntimeExports.jsxs(_components.p, {
      children: [jsxRuntimeExports.jsx(_components.del, {
        children: "one"
      }), " or ", jsxRuntimeExports.jsx(_components.del, {
        children: "two"
      }), " tildes."]
    }), "\n", jsxRuntimeExports.jsxs(_components.h2, {
      id: "table",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#table",
        children: "#"
      }), "Table"]
    }), "\n", jsxRuntimeExports.jsxs(_components.table, {
      children: [jsxRuntimeExports.jsx(_components.thead, {
        children: jsxRuntimeExports.jsxs(_components.tr, {
          children: [jsxRuntimeExports.jsx(_components.th, {
            children: "a"
          }), jsxRuntimeExports.jsx(_components.th, {
            align: "left",
            children: "b"
          }), jsxRuntimeExports.jsx(_components.th, {
            align: "right",
            children: "c"
          }), jsxRuntimeExports.jsx(_components.th, {
            align: "center",
            children: "d"
          })]
        })
      }), jsxRuntimeExports.jsx(_components.tbody, {
        children: jsxRuntimeExports.jsxs(_components.tr, {
          children: [jsxRuntimeExports.jsx(_components.td, {
            children: "1"
          }), jsxRuntimeExports.jsx(_components.td, {
            align: "left",
            children: "2"
          }), jsxRuntimeExports.jsx(_components.td, {
            align: "right",
            children: "3"
          }), jsxRuntimeExports.jsx(_components.td, {
            align: "center",
            children: "4"
          })]
        })
      })]
    }), "\n", jsxRuntimeExports.jsxs(_components.h2, {
      id: "tasklist",
      children: [jsxRuntimeExports.jsx(_components.a, {
        className: "header-anchor",
        href: "#tasklist",
        children: "#"
      }), "Tasklist"]
    }), "\n", jsxRuntimeExports.jsxs(_components.ul, {
      className: "contains-task-list",
      children: ["\n", jsxRuntimeExports.jsxs(_components.li, {
        className: "task-list-item",
        children: [jsxRuntimeExports.jsx(_components.input, {
          type: "checkbox",
          disabled: true
        }), " ", "to do"]
      }), "\n", jsxRuntimeExports.jsxs(_components.li, {
        className: "task-list-item",
        children: [jsxRuntimeExports.jsx(_components.input, {
          type: "checkbox",
          checked: true,
          disabled: true
        }), " ", "done"]
      }), "\n"]
    }), "\n", jsxRuntimeExports.jsxs(_components.div, {
      className: "language-ts",
      children: [jsxRuntimeExports.jsx(_components.span, {
        className: "lang",
        children: "ts"
      }), jsxRuntimeExports.jsx(_components.pre, {
        className: "shiki nord",
        style: {
          backgroundColor: "#2e3440ff"
        },
        tabIndex: "0",
        children: jsxRuntimeExports.jsxs(_components.code, {
          children: [jsxRuntimeExports.jsxs(_components.span, {
            className: "line",
            children: [jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "import"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "{"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "Plugin"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "}"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "from"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "'"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "vite"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "'"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: ";"
            })]
          }), "\n", jsxRuntimeExports.jsxs(_components.span, {
            className: "line",
            children: [jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "import"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "{"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9"
              },
              children: "pluginMdxRollup"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "}"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "from"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "'"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#A3BE8C"
              },
              children: "./pluginMdxRollup"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "'"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: ";"
            })]
          }), "\n", jsxRuntimeExports.jsx(_components.span, {
            className: "line"
          }), "\n", jsxRuntimeExports.jsxs(_components.span, {
            className: "line",
            children: [jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "export"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "async"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "function"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "pluginMdx"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "()"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: ":"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#8FBCBB"
              },
              children: "Promise"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "<"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#8FBCBB"
              },
              children: "Plugin"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: "[]"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: ">"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "{"
            })]
          }), "\n", jsxRuntimeExports.jsxs(_components.span, {
            className: "line",
            children: [jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: "  "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "return"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " ["
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: "await"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: " "
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#88C0D0"
              },
              children: "pluginMdxRollup"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#D8DEE9FF"
              },
              children: "()]"
            }), jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#81A1C1"
              },
              children: ";"
            })]
          }), "\n", jsxRuntimeExports.jsx(_components.span, {
            className: "line",
            children: jsxRuntimeExports.jsx(_components.span, {
              style: {
                color: "#ECEFF4"
              },
              children: "}"
            })
          }), "\n", jsxRuntimeExports.jsx(_components.span, {
            className: "line"
          })]
        })
      })]
    }), "\n", "\n", jsxRuntimeExports.jsxs(_components.section, {
      "data-footnotes": true,
      className: "footnotes",
      children: [jsxRuntimeExports.jsxs(_components.h2, {
        className: "sr-only",
        id: "footnote-label",
        children: [jsxRuntimeExports.jsx(_components.a, {
          className: "header-anchor",
          href: "#footnote-label",
          children: "#"
        }), "Footnotes"]
      }), "\n", jsxRuntimeExports.jsxs(_components.ol, {
        children: ["\n", jsxRuntimeExports.jsxs(_components.li, {
          id: "user-content-fn-1",
          children: ["\n", jsxRuntimeExports.jsxs(_components.p, {
            children: ["Big note. ", jsxRuntimeExports.jsx(_components.a, {
              href: "#user-content-fnref-1",
              "data-footnote-backref": true,
              className: "data-footnote-backref",
              "aria-label": "Back to content",
              children: "↩"
            })]
          }), "\n"]
        }), "\n"]
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsxRuntimeExports.jsx(MDXLayout, Object.assign({}, props, {
    children: jsxRuntimeExports.jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export {
  MDXContent as default,
  frontmatter,
  toc
};
