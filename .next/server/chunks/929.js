"use strict";
exports.id = 929;
exports.ids = [929];
exports.modules = {

/***/ 9929:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ AuthProvider),
/* harmony export */   "V": () => (/* binding */ AuthContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3053);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6120);
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8284);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7072);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_services_api__WEBPACK_IMPORTED_MODULE_4__]);
_services_api__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function AuthProvider({
  children
}) {
  const {
    0: user,
    1: setUser
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const isAuthenticated = !!user;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      'nextauth-token': token
    } = (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)();

    if (token) {
      (0,_services_auth__WEBPACK_IMPORTED_MODULE_6__/* .recoverUserInformation */ .R)().then(response => setUser(response.user));
    }
  }, []);

  async function signIn({
    password,
    username
  }) {
    const response = await _services_api__WEBPACK_IMPORTED_MODULE_4__/* .api.post */ .h.post('/oauth/token', {
      grant_type: 'password',
      username,
      password: (0,js_sha256__WEBPACK_IMPORTED_MODULE_2__.sha256)(password)
    });
    (0,nookies__WEBPACK_IMPORTED_MODULE_1__.setCookie)(undefined, 'nextauth-token', response?.data?.access_token, {
      expires: response?.data?.expires_in
    });
    _services_api__WEBPACK_IMPORTED_MODULE_4__/* .api.defaults.headers.Authorization */ .h.defaults.headers.Authorization = `Bearer ${response?.data?.access_token}`;
    setUser({
      username
    });
    next_router__WEBPACK_IMPORTED_MODULE_3___default().push('/');
  }

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx(AuthContext.Provider, {
    value: {
      user,
      isAuthenticated,
      signIn
    },
    children: children
  });
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7072:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ api)
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4402);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_axios__WEBPACK_IMPORTED_MODULE_0__]);
_axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const api = (0,_axios__WEBPACK_IMPORTED_MODULE_0__/* .getAPIClient */ .f)();
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ recoverUserInformation)
/* harmony export */ });
const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount));

async function recoverUserInformation() {
  await delay();
  return {
    user: {
      username: 'Douglas Prado dos Santos'
    }
  };
}

/***/ })

};
;