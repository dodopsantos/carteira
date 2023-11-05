"use strict";
exports.id = 783;
exports.ids = [783];
exports.modules = {

/***/ 7783:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./src/components/layout/components/NavItem/index.tsx




function NavItem({
  title,
  to
}) {
  const router = (0,router_.useRouter)();

  function isCurrentRoute(route) {
    return router.asPath === route;
  }

  return /*#__PURE__*/jsx_runtime_.jsx("li", {
    className: `${isCurrentRoute(to) ? 'bg-teal-600 md:bg-teal-700' : 'md:hover:bg-teal-500 '} delay-40 mb-1 flex rounded transition ease-in-out last:mb-0 hover:scale-105 md:mb-0`,
    children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: to,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "h-full w-full rounded p-2 font-bold text-white",
        "aria-current": "page",
        children: title
      })
    })
  });
}
;// CONCATENATED MODULE: ./src/utils/data/menuItems.json
const menuItems_namespaceObject = JSON.parse('[{"title":"início","to":"/"},{"title":"Wiki","to":"/wiki"},{"title":"Discord","to":"https://discord.gg/wXKQk8QtwK"}]');
;// CONCATENATED MODULE: ./src/hooks/onClickOutsideHook.ts

function useOnClickOutside(ref, handler) {
  (0,external_react_.useEffect)(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
;// CONCATENATED MODULE: ./src/components/layout/components/NavMenu/index.tsx






function NavMenu() {
  const {
    0: open,
    1: setOpen
  } = (0,external_react_.useState)(false);
  const menuRef = (0,external_react_.useRef)();
  useOnClickOutside(menuRef, () => setOpen(false));
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    ref: menuRef,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
      "data-collapse-toggle": "navbar-default",
      onClick: () => setOpen(!open),
      type: "button",
      className: "bg-teal-200 ml-3 items-center rounded p-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden",
      "aria-controls": "navbar-default",
      "aria-expanded": "false",
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "sr-only",
        children: "Open main menu"
      }), /*#__PURE__*/jsx_runtime_.jsx("svg", {
        className: "h-6 w-6 fill-teal-900",
        "aria-hidden": "true",
        fill: "currentColor",
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/jsx_runtime_.jsx("path", {
          fillRule: "evenodd",
          d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
          clipRule: "evenodd"
        })
      }), ' ']
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "hidden w-full lg:block lg:w-auto",
      id: "navbar-default",
      children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:text-sm lg:font-medium",
        children: menuItems_namespaceObject.map((item, key) => /*#__PURE__*/jsx_runtime_.jsx(NavItem, {
          title: item.title,
          to: item.to
        }, key))
      })
    }), open && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "absolute top-16 left-5 right-5 z-50 rounded bg-teal-700 lg:block lg:w-auto",
      id: "navbar-default",
      children: /*#__PURE__*/jsx_runtime_.jsx("ul", {
        className: "flex flex-col p-4 lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:text-sm lg:font-medium",
        children: menuItems_namespaceObject.map((item, key) => /*#__PURE__*/jsx_runtime_.jsx(NavItem, {
          title: item.title,
          to: item.to
        }, key))
      })
    })]
  });
}
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/components/layout/components/Navbar/index.tsx






function Navbar() {
  return /*#__PURE__*/jsx_runtime_.jsx("nav", {
    className: "fixed z-20 w-full p-2.5",
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "md:px-20px flex h-[70px] items-center justify-between rounded-md bg-header px-5",
      children: [/*#__PURE__*/jsx_runtime_.jsx((link_default()), {
        href: "/",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: "/",
          className: "flex items-center",
          children: /*#__PURE__*/jsx_runtime_.jsx((image_default()), {
            src: '/SOF.webp',
            alt: "Picture of the author",
            width: 163,
            height: 44
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(NavMenu, {})]
    })
  });
}
;// CONCATENATED MODULE: ./src/components/layout/components/Footer/index.tsx




function Footer() {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "before:z-1 relative flex h-36 items-center justify-between bg-gray-700 px-5 before:absolute before:top-0 before:left-0 before:block before:h-7 before:w-full before:bg-[url('/module.webp')] before:bg-contain before:bg-repeat-x sm:px-20",
    children: [/*#__PURE__*/jsx_runtime_.jsx((image_default()), {
      alt: "Logo",
      src: "/SOF.webp",
      width: 300,
      height: 80,
      quality: 100
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
      className: "px-2 text-xs text-white sm:px-0",
      children: ["Copyright \xA9 ", new Date().getFullYear(), ", D2k studios. Todos os direitos reservados."]
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/layout/index.tsx





function Layout({
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "font-open-sans min-h-screen flex-col",
    children: [/*#__PURE__*/jsx_runtime_.jsx(Navbar, {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "min-h-100vh",
      children: children
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer, {})]
  });
}

/***/ })

};
;