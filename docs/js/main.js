/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/header.js */ "./src/js/components/header.js");
/* harmony import */ var _components_inputs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/inputs.js */ "./src/js/components/inputs.js");
/* harmony import */ var _components_dropdown_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/dropdown.js */ "./src/js/components/dropdown.js");




/***/ }),

/***/ "./src/js/components/dropdown.js":
/*!***************************************!*\
  !*** ./src/js/components/dropdown.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".form__dropdown").forEach(dropdown => {
    const dropdownHeader = dropdown.querySelector(".dropdown__header");
    const dropdownBody = dropdown.querySelector(".dropdown__body");
    const dropdownItems = dropdown.querySelectorAll(".dropdown__item");
    const capture = dropdown.querySelector(".dropdown__capture");
    const select = dropdown.parentElement.querySelector("select");
    dropdownHeader.addEventListener("click", () => {
      const isOpen = dropdown.classList.toggle("open");
      if (isOpen) {
        dropdownBody.style.maxHeight = dropdownBody.scrollHeight + "px";
      } else {
        dropdownBody.style.maxHeight = "";
      }
    });
    dropdownItems.forEach((item, idx) => {
      item.addEventListener("click", () => {
        capture.textContent = item.textContent;
        dropdown.classList.remove("open");
        dropdownBody.style.maxHeight = "";
        select.selectedIndex = idx;
        select.dispatchEvent(new Event("change", {
          bubbles: true
        }));
        dropdown.classList.add("filled");
        console.log("Выбранный пункт селекта:", select.options[select.selectedIndex].text);
      });
    });
    document.addEventListener("click", e => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        dropdownBody.style.maxHeight = "";
      }
    });
  });
});

/***/ }),

/***/ "./src/js/components/header.js":
/*!*************************************!*\
  !*** ./src/js/components/header.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const header = document.querySelector(".header");
if (header) {
  const nav = header.querySelector(".nav");
  if (nav) {
    const navWithChildren = nav.querySelectorAll(".menu-item-has-children");
    navWithChildren.forEach(item => {
      const subMenu = item.querySelector(".sub-menu");
      if (subMenu) {
        item.addEventListener("mouseenter", e => {
          item.classList.add("active");
          subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        });
        item.addEventListener("mouseleave", e => {
          item.classList.remove("active");
          subMenu.style.maxHeight = null;
        });
      }
    });
  }
}

/***/ }),

/***/ "./src/js/components/inputs.js":
/*!*************************************!*\
  !*** ./src/js/components/inputs.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const fields = document.querySelectorAll(".form__field");
if (fields.length > 0) {
  fields.forEach(field => {
    const input = field.querySelector(".form__input");
    const label = field.querySelector(".form__label");
    if (input && label) {
      input.addEventListener("input", () => {
        label.classList.add("filled");
        if (input.value === "") {
          label.classList.remove("filled");
        }
      });
      input.addEventListener("blur", () => {
        if (input.value === "") {
          label.classList.remove("filled");
        }
      });
    }
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map