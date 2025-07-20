import { renderSquircle } from "corner-smoothing";

let isMob = window.matchMedia("(max-width: 600px)").matches;

// Функция троттлинга для оптимизации производительности
function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);
    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function applyCornerSmoothing() {
  isMob = window.matchMedia("(max-width: 600px)").matches;

  document.querySelectorAll(".corner-smooth-40").forEach((el) => {
    renderSquircle(el, {
      cornerRadius: 40,
      cornerSmoothing: 0.5,
    });
  });
  document.querySelectorAll(".corner-smooth-60").forEach((el) => {
    renderSquircle(el, {
      cornerRadius: 60,
      cornerSmoothing: 0.5,
    });
  });
  document.querySelectorAll(".corner-smooth-10").forEach((el) => {
    renderSquircle(el, {
      cornerRadius: 10,
      cornerSmoothing: 0.5,
    });
  });
}

// Функция для применения скруглений к .sub-menu
function applySubMenuSmoothing(submenu) {
  renderSquircle(submenu, {
    cornerRadius: 22,
    cornerSmoothing: 0.5,
  });
}

// Применяем скругление углов при загрузке страницы
applyCornerSmoothing();

// Отслеживаем изменения в DOM, чтобы обрабатывать динамически добавленные элементы
const observer = new MutationObserver((mutations) => {
  let shouldApply = false;

  // Проверяем, были ли добавлены новые узлы с нужным классом
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Проверяем, что это элемент
          if (node.classList && node.classList.contains("corner-smooth-50")) {
            shouldApply = true;
          } else if (node.querySelectorAll) {
            // Проверяем, есть ли внутри добавленного узла элементы с нужным классом
            const hasCornerSmoothElements =
              node.querySelectorAll(".corner-smooth-50").length > 0;
            if (hasCornerSmoothElements) {
              shouldApply = true;
            }
          }
        }
      });
    }
  });

  // Если были добавлены новые элементы с нужным классом, применяем скругление
  if (shouldApply) {
    applyCornerSmoothing();
  }
});

// Настраиваем observer для отслеживания изменений в DOM
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Обработчик события ресайза с троттлингом (обновляем маску раз в 200 мс при ресайзе)
const throttledResize = throttle(() => {
  applyCornerSmoothing();
}, 200);

// Добавляем обработчик ресайза
window.addEventListener("resize", throttledResize);

// Также применяем скругление при полной загрузке страницы (для обработки контента, загруженного асинхронно)
window.addEventListener("load", () => {
  applyCornerSmoothing();
});
