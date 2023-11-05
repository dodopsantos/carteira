"use strict";
exports.id = 402;
exports.ids = [402];
exports.modules = {

/***/ 4402:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ getAPIPublic),
/* harmony export */   "f": () => (/* binding */ getAPIClient)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3053);
/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getAPIClient(ctx) {
  const {
    'nextauth-token': token
  } = (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)(ctx);
  const api = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: 'http://localhost:5400/api'
  });
  api.interceptors.request.use(config => {
    console.log(config);
    return config;
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
function getAPIPublic() {
  const api = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: 'http://localhost:5400/api'
  });
  api.interceptors.request.use(config => {
    console.log(config);
    return config;
  });
  let token = 'f1vHOUeqynFbc9-9bDquFBtaBWDYiigfnyyBV7-sp6YeD8hYB7hZV9p9C2zbe72wLq6aAz7mifNnsYT15DvTB6w5qBmffulhukSlAINavf3haWwSUNhcjphD89WV1s5NoOTOYRAyDr5Vez-FZv4ofCFCk4bX0kKORF6T4FvMjbyuVm0sxV3u3D_-cFoHj5RNSA4LvWsNpeEQa8_xklQ5AwtTz9mZA9Upkmx8vwV8Az_DbOughEyIzbPpaKtGCZcD3blIPPMVmh1a7S1v5O9nVBdW05bLjUO-ATztts8fPIFKg_pZD9-kTE_EwS857feT_pBS8yMPt2x7lXkLs-5CwCM7_4zXcwUZFw7nTKcMtMGBd385QbzXmELKFhGIfIadhT2Fn6HKpgkfTrYqwxbFlzrwfF-sufpN3rGXVp87ms3wTIRDTL1ax_0Yqd5EvALl28zQkaqwimZKjCX5paMtckpPdGJzE2pwQvwl3twZ4hOiJOJ0mFACDYEShLxkbN5cj5UzgHhWdWVaNanmrzKHKM5R4XuQzNWdEY9jqm-PXNNPi7YMw1ZApLFANR9X7vsULL7N2r1tzRcwpNhkInYbPVa_NduE1cULCZbd6lTfd6LQxNncxblsu3Fn6oueqvVUvxhI-upEiGIgeQbk5xTDF5i7hRJ5qtC0-CNP1WrSR-DnlXou7VvceEpUgWGUNdkX';
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
  return api;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;