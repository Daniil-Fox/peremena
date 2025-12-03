// Инициализация раскрытия блоков отзывов
document.addEventListener("DOMContentLoaded", function () {
  const testiButtons = document.querySelectorAll(".testi__item-btn");
  const testiSection = document.querySelector(".testi");
  const MOBILE_BREAKPOINT = 600;
  const ANIMATION_DURATION = 500; // соответствует CSS transition

  let desktopSectionHeight = null;

  // Проверка мобильного устройства
  const isMobile = () =>
    window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;

  // Инициализация высоты секции на десктопе
  const initDesktopHeight = () => {
    if (!isMobile() && testiSection && !desktopSectionHeight) {
      setTimeout(() => {
        desktopSectionHeight = testiSection.offsetHeight;
        testiSection.style.height = `${desktopSectionHeight}px`;
      }, 100);
    }
  };

  // Получение полной высоты контента через scrollHeight
  const getFullHeight = (element) => {
    const originalMaxHeight = element.style.maxHeight;
    const originalDisplay = element.style.display;
    const originalLineClamp = element.style.webkitLineClamp;

    // Временно убираем все ограничения для точного измерения
    element.style.maxHeight = "none";
    element.style.display = "block";
    element.style.webkitLineClamp = "unset";
    element.style.lineClamp = "unset";
    element.style.webkitBoxOrient = "unset";

    const height = element.scrollHeight;

    // Возвращаем исходные значения
    element.style.maxHeight = originalMaxHeight || "";
    element.style.display = originalDisplay || "";
    element.style.webkitLineClamp = originalLineClamp || "";

    return height;
  };

  // Получение высоты свернутого состояния через scrollHeight
  const getCollapsedHeight = (element) => {
    const originalMaxHeight = element.style.maxHeight;
    const originalDisplay = element.style.display;
    const originalLineClamp = element.style.webkitLineClamp;

    // Устанавливаем свернутое состояние для измерения
    element.style.maxHeight = "none";
    element.style.display = "-webkit-box";
    element.style.webkitLineClamp = "4";
    element.style.lineClamp = "4";
    element.style.webkitBoxOrient = "vertical";

    const height = element.scrollHeight;

    // Возвращаем исходные значения
    element.style.maxHeight = originalMaxHeight || "";
    element.style.display = originalDisplay || "";
    element.style.webkitLineClamp = originalLineClamp || "";

    return height;
  };

  // Установка/сброс line-clamp стилей
  const setLineClamp = (element, enabled) => {
    if (enabled) {
      // Сбрасываем inline стили, чтобы вернуться к CSS дефолтам
      element.style.display = "";
      element.style.webkitLineClamp = "";
      element.style.lineClamp = "";
      element.style.webkitBoxOrient = "";
    } else {
      // Убираем line-clamp для полного отображения
      element.style.display = "block";
      element.style.webkitLineClamp = "unset";
      element.style.lineClamp = "unset";
      element.style.webkitBoxOrient = "unset";
    }
  };

  // Сброс позиционирования контента
  const resetContentPosition = (content) => {
    content.style.position = "";
    content.style.top = "";
    content.style.left = "";
    content.style.right = "";
    content.style.width = "";
    content.style.zIndex = "";
  };

  // Установка абсолютного позиционирования для десктопа
  const setAbsolutePosition = (content, item) => {
    const contentRect = content.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const relativeTop = contentRect.top - itemRect.top;
    const contentWidth = contentRect.width;

    requestAnimationFrame(() => {
      content.style.position = "absolute";
      content.style.top = `${relativeTop}px`;
      content.style.left = "0";
      content.style.right = "0";
      content.style.width = `${contentWidth}px`;
      content.style.zIndex = "10";
    });
  };

  // Раскрытие блока
  const expandItem = (item, content, desc, button) => {
    const mobile = isMobile();

    // Получаем полную высоту через scrollHeight
    const fullHeight = getFullHeight(desc);

    // Добавляем классы
    item.classList.add("testi__item--expanded");
    desc.classList.add("testi__item-desc--expanded");
    button.textContent = "свернуть";

    // Убираем line-clamp и устанавливаем полную высоту мгновенно
    setLineClamp(desc, false);
    desc.style.maxHeight = `${fullHeight}px`;

    if (mobile) {
      updateMobileSectionHeight();
    } else {
      setAbsolutePosition(content, item);
    }
  };

  // Сворачивание блока
  const collapseItem = (item, content, desc, button) => {
    const mobile = isMobile();

    // Получаем высоту свернутого состояния через scrollHeight
    const collapsedHeight = getCollapsedHeight(desc);

    // Убираем классы
    item.classList.remove("testi__item--expanded");
    desc.classList.remove("testi__item-desc--expanded");
    button.textContent = "читать дальше";

    // Устанавливаем line-clamp и свернутую высоту мгновенно
    setLineClamp(desc, true);
    desc.style.maxHeight = `${collapsedHeight}px`;

    if (mobile) {
      updateMobileSectionHeight();
    } else {
      if (desktopSectionHeight) {
        testiSection.style.height = `${desktopSectionHeight}px`;
      }
      resetContentPosition(content);
    }
  };

  // Обновление высоты секции на мобильных
  const updateMobileSectionHeight = () => {
    if (!testiSection) return;

    const allItems = testiSection.querySelectorAll(".testi__item");
    const expandedItems = testiSection.querySelectorAll(
      ".testi__item--expanded"
    );

    if (expandedItems.length === 0) {
      allItems.forEach((item) => {
        const content = item.querySelector(".testi__item-content");
        if (content) content.style.minHeight = "";
      });
      return;
    }

    let maxExpandedHeight = 0;
    let minCollapsedHeight = Infinity;

    allItems.forEach((item) => {
      const content = item.querySelector(".testi__item-content");
      if (!content) return;

      const itemHeight = content.offsetHeight;
      const isExpanded = item.classList.contains("testi__item--expanded");

      if (isExpanded) {
        maxExpandedHeight = Math.max(maxExpandedHeight, itemHeight);
      } else {
        minCollapsedHeight = Math.min(minCollapsedHeight, itemHeight);
      }
    });

    const finalHeight = Math.max(
      maxExpandedHeight,
      minCollapsedHeight !== Infinity ? minCollapsedHeight : 0
    );

    allItems.forEach((item) => {
      const content = item.querySelector(".testi__item-content");
      if (content) {
        content.style.minHeight = `${finalHeight}px`;
      }
    });
  };

  // Обработчик клика
  testiButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // Предотвращаем всплытие к слайдеру

      const item = button.closest(".testi__item");
      const content = item?.querySelector(".testi__item-content");
      const desc = item?.querySelector(".testi__item-desc");

      if (!item || !content || !desc) return false;

      const isExpanded = item.classList.contains("testi__item--expanded");

      if (isExpanded) {
        collapseItem(item, content, desc, button);
      } else {
        expandItem(item, content, desc, button);
      }

      return false;
    });

    // Дополнительно обрабатываем mousedown для предотвращения перехода слайда
    button.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  // Обработчик клика вне карточки для закрытия раскрытых описаний
  document.addEventListener("click", function (e) {
    const clickedItem = e.target.closest(".testi__item");
    const clickedButton = e.target.closest(".testi__item-btn");

    // Если клик был на кнопке, не закрываем (кнопка сама обрабатывает раскрытие)
    if (clickedButton) {
      return;
    }

    // Если клик был на уже раскрытой карточке (но не на кнопке), не закрываем
    if (
      clickedItem &&
      clickedItem.classList.contains("testi__item--expanded")
    ) {
      return;
    }

    // Закрываем все раскрытые карточки (при клике на другую карточку или вне карточек)
    const expandedItems = testiSection?.querySelectorAll(
      ".testi__item--expanded"
    );
    if (expandedItems && expandedItems.length > 0) {
      expandedItems.forEach((item) => {
        const content = item.querySelector(".testi__item-content");
        const desc = item.querySelector(".testi__item-desc");
        const button = item.querySelector(".testi__item-btn");

        if (content && desc && button) {
          collapseItem(item, content, desc, button);
        }
      });
    }
  });

  // Обработка изменения размера окна
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const mobile = isMobile();

      if (mobile) {
        updateMobileSectionHeight();
        if (testiSection) {
          testiSection.style.height = "";
        }
      } else {
        initDesktopHeight();

        if (testiSection) {
          // Сбрасываем min-height для всех элементов
          testiSection
            .querySelectorAll(".testi__item-content")
            .forEach((content) => {
              content.style.minHeight = "";
            });
        }

        // Сбрасываем позиционирование для нераскрытых элементов
        testiSection
          ?.querySelectorAll(".testi__item-content")
          .forEach((content) => {
            if (!content.closest(".testi__item--expanded")) {
              resetContentPosition(content);
            }
          });
      }
    }, 150);
  });

  // Инициализация
  initDesktopHeight();
});

// Модуль управления видео в слайдах отзывов
document.addEventListener("DOMContentLoaded", function () {
  const testiSection = document.querySelector(".testi");
  if (!testiSection) return;

  const videos = testiSection.querySelectorAll(".testi__item-img video");

  // Функция для паузы всех остальных видео
  const pauseAllOtherVideos = (currentVideo) => {
    videos.forEach((otherVideo) => {
      if (otherVideo !== currentVideo && !otherVideo.paused) {
        otherVideo.pause();
        otherVideo.controls = false;

        // Показываем кнопку play для остановленного видео
        const otherPlayButton = otherVideo
          .closest(".testi__item-img")
          ?.querySelector(".testi__item-play");
        if (otherPlayButton) {
          otherPlayButton.classList.remove("testi__item-play--hidden");
        }
      }
    });
  };

  // Инициализация видео
  videos.forEach((video) => {
    const playButton = video
      .closest(".testi__item-img")
      ?.querySelector(".testi__item-play");

    if (!playButton) return;

    // Устанавливаем начальные настройки
    video.muted = false; // Включаем звук
    video.controls = false; // Скрываем controls по умолчанию
    video.playsInline = true; // Для корректной работы на мобильных

    // Функция для показа кнопки play
    const showPlayButton = () => {
      playButton.classList.remove("testi__item-play--hidden");
    };

    // Функция для скрытия кнопки play
    const hidePlayButton = () => {
      playButton.classList.add("testi__item-play--hidden");
    };

    // Показываем кнопку play по умолчанию
    showPlayButton();

    // Обработчик клика на кнопку play
    playButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Ставим на паузу все остальные видео
      pauseAllOtherVideos(video);

      // Воспроизводим видео с звуком и показываем controls
      video.controls = true;
      video.muted = false;
      video.play().catch((error) => {
        console.error("Ошибка воспроизведения видео:", error);
      });

      // Скрываем кнопку play
      hidePlayButton();
    });

    // Обработчик паузы - показываем кнопку play и скрываем controls
    video.addEventListener("pause", function () {
      video.controls = false;
      showPlayButton();
    });

    // Обработчик окончания видео - показываем кнопку play и скрываем controls
    video.addEventListener("ended", function () {
      video.controls = false;
      video.currentTime = 0; // Сбрасываем на начало
      showPlayButton();
    });

    // Обработчик начала воспроизведения - скрываем кнопку play и ставим на паузу остальные
    video.addEventListener("play", function () {
      pauseAllOtherVideos(video);
      hidePlayButton();
    });

    // Обработчик клика на само видео - пауза/воспроизведение
    video.addEventListener("click", function (e) {
      e.stopPropagation();
      if (video.paused) {
        // Ставим на паузу все остальные видео
        pauseAllOtherVideos(video);
        video.controls = true;
        video.play();
      } else {
        video.pause();
      }
    });
  });
});
