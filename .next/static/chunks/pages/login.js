/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["pages/login"],{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fmatthewkrichmar%2FDocuments%2Fquestionnaire-system%2Fpages%2Flogin.tsx&page=%2Flogin!":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fmatthewkrichmar%2FDocuments%2Fquestionnaire-system%2Fpages%2Flogin.tsx&page=%2Flogin! ***!
  \****************************************************************************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("\n    (window.__NEXT_P = window.__NEXT_P || []).push([\n      \"/login\",\n      function () {\n        return __webpack_require__(/*! ./pages/login.tsx */ \"./pages/login.tsx\");\n      }\n    ]);\n    if(true) {\n      module.hot.dispose(function () {\n        window.__NEXT_P.push([\"/login\"])\n      });\n    }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWNsaWVudC1wYWdlcy1sb2FkZXIuanM/YWJzb2x1dGVQYWdlUGF0aD0lMkZVc2VycyUyRm1hdHRoZXdrcmljaG1hciUyRkRvY3VtZW50cyUyRnF1ZXN0aW9ubmFpcmUtc3lzdGVtJTJGcGFnZXMlMkZsb2dpbi50c3gmcGFnZT0lMkZsb2dpbiEiLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyw0Q0FBbUI7QUFDMUM7QUFDQTtBQUNBLE9BQU8sSUFBVTtBQUNqQixNQUFNLFVBQVU7QUFDaEI7QUFDQSxPQUFPO0FBQ1A7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvPzY0ZWIiXSwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgKHdpbmRvdy5fX05FWFRfUCA9IHdpbmRvdy5fX05FWFRfUCB8fCBbXSkucHVzaChbXG4gICAgICBcIi9sb2dpblwiLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZShcIi4vcGFnZXMvbG9naW4udHN4XCIpO1xuICAgICAgfVxuICAgIF0pO1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5fX05FWFRfUC5wdXNoKFtcIi9sb2dpblwiXSlcbiAgICAgIH0pO1xuICAgIH1cbiAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fmatthewkrichmar%2FDocuments%2Fquestionnaire-system%2Fpages%2Flogin.tsx&page=%2Flogin!\n"));

/***/ }),

/***/ "./pages/login.tsx":
/*!*************************!*\
  !*** ./pages/login.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ LoginPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nfunction LoginPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { error } = router.query;\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    console.log(\"Session status:\", status);\n    console.log(\"Session data:\", session);\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        const formData = new FormData(e.target);\n        const username = formData.get(\"username\");\n        const password = formData.get(\"password\");\n        console.log(\"Attempting to sign in with username:\", username, \"and password:\", password);\n        try {\n            const result = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signIn)(\"credentials\", {\n                username,\n                password,\n                redirect: false\n            });\n            console.log(\"Sign-in result:\", result);\n            if (result === null || result === void 0 ? void 0 : result.error) {\n                console.error(\"Sign-in error\", result.error);\n            } else {\n                var _session_user, _session_user1;\n                console.log(\"Sign-in successful. Redirecting...\");\n                if ((session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.role) === \"user\") {\n                    router.push(\"/questionnaire\");\n                } else if ((session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.role) === \"admin\") {\n                    router.push(\"/admin-dashboard\");\n                } else {\n                    router.push(\"/\");\n                }\n            }\n        } catch (err) {\n            console.error(\"Sign-in error:\", err);\n        }\n    };\n    if (status === \"authenticated\") {\n        var _session_user, _session_user1;\n        // Redirect immediately if the user is already authenticated\n        if ((session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.role) === \"user\") {\n            router.push(\"/user-home\");\n        } else if ((session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.role) === \"admin\") {\n            router.push(\"/admin-dashboard\");\n        } else {\n            router.push(\"/\");\n        }\n        return null; // This prevents the component from rendering\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        onSubmit: handleSubmit,\n        children: [\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                style: {\n                    color: \"red\"\n                },\n                children: error\n            }, void 0, false, {\n                fileName: \"/Users/matthewkrichmar/Documents/questionnaire-system/pages/login.tsx\",\n                lineNumber: 61,\n                columnNumber: 19\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                name: \"username\",\n                placeholder: \"Username\"\n            }, void 0, false, {\n                fileName: \"/Users/matthewkrichmar/Documents/questionnaire-system/pages/login.tsx\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"password\",\n                name: \"password\",\n                placeholder: \"Password\"\n            }, void 0, false, {\n                fileName: \"/Users/matthewkrichmar/Documents/questionnaire-system/pages/login.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                type: \"submit\",\n                children: \"Log In\"\n            }, void 0, false, {\n                fileName: \"/Users/matthewkrichmar/Documents/questionnaire-system/pages/login.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/matthewkrichmar/Documents/questionnaire-system/pages/login.tsx\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, this);\n}\n_s(LoginPage, \"6qmYa+8MTHRrO97QW2taisqHZrE=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession\n    ];\n});\n_c = LoginPage;\nvar _c;\n$RefreshReg$(_c, \"LoginPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9sb2dpbi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBcUQ7QUFDYjtBQUV6QixTQUFTRzs7SUFDcEIsTUFBTUMsU0FBU0Ysc0RBQVNBO0lBQ3hCLE1BQU0sRUFBRUcsS0FBSyxFQUFFLEdBQUdELE9BQU9FLEtBQUs7SUFDOUIsTUFBTSxFQUFFQyxNQUFNQyxPQUFPLEVBQUVDLE1BQU0sRUFBRSxHQUFHUiwyREFBVUE7SUFFNUNTLFFBQVFDLEdBQUcsQ0FBQyxtQkFBbUJGO0lBQy9CQyxRQUFRQyxHQUFHLENBQUMsaUJBQWlCSDtJQUU3QixNQUFNSSxlQUFlLE9BQU9DO1FBQzVCQSxFQUFFQyxjQUFjO1FBQ2hCLE1BQU1DLFdBQVcsSUFBSUMsU0FBU0gsRUFBRUksTUFBTTtRQUN0QyxNQUFNQyxXQUFXSCxTQUFTSSxHQUFHLENBQUM7UUFDOUIsTUFBTUMsV0FBV0wsU0FBU0ksR0FBRyxDQUFDO1FBRTlCVCxRQUFRQyxHQUFHLENBQUMsd0NBQXdDTyxVQUFVLGlCQUFpQkU7UUFHL0UsSUFBSTtZQUNBLE1BQU1DLFNBQVMsTUFBTXJCLHVEQUFNQSxDQUFDLGVBQWU7Z0JBQ3pDa0I7Z0JBQ0FFO2dCQUNBRSxVQUFVO1lBQ1o7WUFFQVosUUFBUUMsR0FBRyxDQUFDLG1CQUFtQlU7WUFFL0IsSUFBSUEsbUJBQUFBLDZCQUFBQSxPQUFRaEIsS0FBSyxFQUFFO2dCQUNmSyxRQUFRTCxLQUFLLENBQUMsaUJBQWlCZ0IsT0FBT2hCLEtBQUs7WUFDL0MsT0FBTztvQkFFQ0csZUFFT0E7Z0JBSFhFLFFBQVFDLEdBQUcsQ0FBQztnQkFDWixJQUFJSCxDQUFBQSxvQkFBQUEsK0JBQUFBLGdCQUFBQSxRQUFTZSxJQUFJLGNBQWJmLG9DQUFBQSxjQUFlZ0IsSUFBSSxNQUFLLFFBQVE7b0JBQ2hDcEIsT0FBT3FCLElBQUksQ0FBQztnQkFDaEIsT0FBTyxJQUFJakIsQ0FBQUEsb0JBQUFBLCtCQUFBQSxpQkFBQUEsUUFBU2UsSUFBSSxjQUFiZixxQ0FBQUEsZUFBZWdCLElBQUksTUFBSyxTQUFTO29CQUN4Q3BCLE9BQU9xQixJQUFJLENBQUM7Z0JBQ2hCLE9BQU87b0JBQ0hyQixPQUFPcUIsSUFBSSxDQUFDO2dCQUNoQjtZQUNKO1FBRUosRUFBRSxPQUFPQyxLQUFLO1lBQ1ZoQixRQUFRTCxLQUFLLENBQUMsa0JBQWtCcUI7UUFDcEM7SUFDRjtJQUVBLElBQUlqQixXQUFXLGlCQUFpQjtZQUUxQkQsZUFFT0E7UUFIWCw0REFBNEQ7UUFDNUQsSUFBSUEsQ0FBQUEsb0JBQUFBLCtCQUFBQSxnQkFBQUEsUUFBU2UsSUFBSSxjQUFiZixvQ0FBQUEsY0FBZWdCLElBQUksTUFBSyxRQUFRO1lBQ2xDcEIsT0FBT3FCLElBQUksQ0FBQztRQUNkLE9BQU8sSUFBSWpCLENBQUFBLG9CQUFBQSwrQkFBQUEsaUJBQUFBLFFBQVNlLElBQUksY0FBYmYscUNBQUFBLGVBQWVnQixJQUFJLE1BQUssU0FBUztZQUMxQ3BCLE9BQU9xQixJQUFJLENBQUM7UUFDZCxPQUFPO1lBQ0xyQixPQUFPcUIsSUFBSSxDQUFDO1FBQ2Q7UUFDQSxPQUFPLE1BQU0sNkNBQTZDO0lBQzVEO0lBQ0EscUJBQ0UsOERBQUNFO1FBQUtDLFVBQVVoQjs7WUFDWFAsdUJBQVMsOERBQUN3QjtnQkFBRUMsT0FBTztvQkFBQ0MsT0FBTztnQkFBTTswQkFBSTFCOzs7Ozs7MEJBQ3hDLDhEQUFDMkI7Z0JBQU1DLE1BQUs7Z0JBQU9DLE1BQUs7Z0JBQVdDLGFBQVk7Ozs7OzswQkFDL0MsOERBQUNIO2dCQUFNQyxNQUFLO2dCQUFXQyxNQUFLO2dCQUFXQyxhQUFZOzs7Ozs7MEJBQ25ELDhEQUFDQztnQkFBT0gsTUFBSzswQkFBUzs7Ozs7Ozs7Ozs7O0FBRzVCO0dBL0R3QjlCOztRQUNMRCxrREFBU0E7UUFFVUQsdURBQVVBOzs7S0FIeEJFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2xvZ2luLnRzeD83MjQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNpZ25JbiwgdXNlU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvcmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpblBhZ2UoKSB7XG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gcm91dGVyLnF1ZXJ5O1xuICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbiwgc3RhdHVzIH0gPSB1c2VTZXNzaW9uKCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlNlc3Npb24gc3RhdHVzOlwiLCBzdGF0dXMpO1xuICAgIGNvbnNvbGUubG9nKFwiU2Vzc2lvbiBkYXRhOlwiLCBzZXNzaW9uKTtcblxuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZS50YXJnZXQgYXMgSFRNTEZvcm1FbGVtZW50KTtcbiAgICBjb25zdCB1c2VybmFtZSA9IGZvcm1EYXRhLmdldCgndXNlcm5hbWUnKTtcbiAgICBjb25zdCBwYXNzd29yZCA9IGZvcm1EYXRhLmdldCgncGFzc3dvcmQnKTtcblxuICAgIGNvbnNvbGUubG9nKFwiQXR0ZW1wdGluZyB0byBzaWduIGluIHdpdGggdXNlcm5hbWU6XCIsIHVzZXJuYW1lLCBcImFuZCBwYXNzd29yZDpcIiwgcGFzc3dvcmQpO1xuXG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzaWduSW4oXCJjcmVkZW50aWFsc1wiLCB7XG4gICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgcmVkaXJlY3Q6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlNpZ24taW4gcmVzdWx0OlwiLCByZXN1bHQpO1xuXG4gICAgICAgIGlmIChyZXN1bHQ/LmVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2lnbi1pbiBlcnJvclwiLCByZXN1bHQuZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaWduLWluIHN1Y2Nlc3NmdWwuIFJlZGlyZWN0aW5nLi4uXCIpO1xuICAgICAgICAgICAgaWYgKHNlc3Npb24/LnVzZXI/LnJvbGUgPT09IFwidXNlclwiKSB7XG4gICAgICAgICAgICAgICAgcm91dGVyLnB1c2goXCIvcXVlc3Rpb25uYWlyZVwiKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXNzaW9uPy51c2VyPy5yb2xlID09PSBcImFkbWluXCIpIHtcbiAgICAgICAgICAgICAgICByb3V0ZXIucHVzaChcIi9hZG1pbi1kYXNoYm9hcmRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNpZ24taW4gZXJyb3I6XCIsIGVycikgXG4gICAgfVxuICB9O1xuXG4gIGlmIChzdGF0dXMgPT09IFwiYXV0aGVudGljYXRlZFwiKSB7XG4gICAgLy8gUmVkaXJlY3QgaW1tZWRpYXRlbHkgaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBhdXRoZW50aWNhdGVkXG4gICAgaWYgKHNlc3Npb24/LnVzZXI/LnJvbGUgPT09IFwidXNlclwiKSB7XG4gICAgICByb3V0ZXIucHVzaChcIi91c2VyLWhvbWVcIik7XG4gICAgfSBlbHNlIGlmIChzZXNzaW9uPy51c2VyPy5yb2xlID09PSBcImFkbWluXCIpIHtcbiAgICAgIHJvdXRlci5wdXNoKFwiL2FkbWluLWRhc2hib2FyZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVyLnB1c2goXCIvXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDsgLy8gVGhpcyBwcmV2ZW50cyB0aGUgY29tcG9uZW50IGZyb20gcmVuZGVyaW5nXG4gIH1cbiAgcmV0dXJuIChcbiAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cbiAgICAgICAge2Vycm9yICYmIDxwIHN0eWxlPXt7Y29sb3I6IFwicmVkXCIgfX0+e2Vycm9yfTwvcD59XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXNlcm5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCIgLz5cbiAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgLz5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkxvZyBJbjwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJzaWduSW4iLCJ1c2VTZXNzaW9uIiwidXNlUm91dGVyIiwiTG9naW5QYWdlIiwicm91dGVyIiwiZXJyb3IiLCJxdWVyeSIsImRhdGEiLCJzZXNzaW9uIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJ0YXJnZXQiLCJ1c2VybmFtZSIsImdldCIsInBhc3N3b3JkIiwicmVzdWx0IiwicmVkaXJlY3QiLCJ1c2VyIiwicm9sZSIsInB1c2giLCJlcnIiLCJmb3JtIiwib25TdWJtaXQiLCJwIiwic3R5bGUiLCJjb2xvciIsImlucHV0IiwidHlwZSIsIm5hbWUiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/login.tsx\n"));

/***/ }),

/***/ "./node_modules/next/router.js":
/*!*************************************!*\
  !*** ./node_modules/next/router.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("module.exports = __webpack_require__(/*! ./dist/client/router */ \"./node_modules/next/dist/client/router.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9yb3V0ZXIuanMiLCJtYXBwaW5ncyI6IkFBQUEsNkdBQWdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL25vZGVfbW9kdWxlcy9uZXh0L3JvdXRlci5qcz8xYmI2Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2NsaWVudC9yb3V0ZXInKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/next/router.js\n"));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["pages/_app","main"], function() { return __webpack_exec__("./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fmatthewkrichmar%2FDocuments%2Fquestionnaire-system%2Fpages%2Flogin.tsx&page=%2Flogin!"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);