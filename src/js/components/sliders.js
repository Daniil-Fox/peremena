// Инициализация слайдеров после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Clients slider - обычный слайдер с автоплеем (без модификатора)
  const $clients = $(".clients__slider").not(".clients__slider_reverse");
  const clientsSlider = $clients.length
    ? $clients.owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: false,
        autoplaySpeed: 2000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        smartSpeed: 2000,
        items: 4,
        center: false,
        startPosition: 0,
        responsive: {
          0: {
            items: 2,
            margin: 20,
            autoWidth: true,
          },
          601: {
            items: 4,
            center: false,
            margin: 30,
          },
        },
      })
    : null;

  // Clients slider reverse - тот же, но крутится в обратном направлении
  const $clientsReverse = $(".clients__slider.clients__slider_reverse");
  const clientsSliderReverse = $clientsReverse.length
    ? $clientsReverse.owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: false,
        autoplaySpeed: 2000,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        smartSpeed: 2000,
        items: 4,
        center: false,
        startPosition: 0,
        rtl: true,
        responsive: {
          0: {
            items: 2,
            margin: 20,
            autoWidth: true,
          },
          601: {
            items: 4,
            center: false,
            margin: 30,
          },
        },
      })
    : null;

  // Intersection Observer для автоплея clients слайдера
  const clientsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Слайдер в зоне видимости - сразу переходим к следующему слайду, затем запускаем автоплей
          if (clientsSlider) {
            clientsSlider.trigger("next.owl.carousel");
            setTimeout(() => {
              clientsSlider.trigger("play.owl.autoplay");
            }, 100);
          }
          if (clientsSliderReverse) {
            clientsSliderReverse.trigger("next.owl.carousel");
            setTimeout(() => {
              clientsSliderReverse.trigger("play.owl.autoplay");
            }, 100);
          }
        } else {
          // Слайдер вне зоны видимости - останавливаем автоплей
          if (clientsSlider) clientsSlider.trigger("stop.owl.autoplay");
          if (clientsSliderReverse)
            clientsSliderReverse.trigger("stop.owl.autoplay");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  // window.addEventListener('DOMContentLoaded', e => {
  //   if (clientsSlider) clientsSlider.trigger('play.owl.autoplay');
  //   if (clientsSliderReverse) clientsSliderReverse.trigger('play.owl.autoplay');
  // })

  // Наблюдаем за clients слайдером
  const clientsElement = document.querySelector(".clients__wrapper");
  if (clientsElement) clientsObserver.observe(clientsElement);

  // Hover pause on wrapper for both sliders
  // const clientsWrapper = document.querySelector('.clients__wrapper');
  // if (clientsWrapper) {
  //   clientsWrapper.addEventListener('mouseenter', () => {
  //     if (clientsSlider) clientsSlider.trigger('stop.owl.autoplay');
  //     if (clientsSliderReverse) clientsSliderReverse.trigger('stop.owl.autoplay');
  //   });
  //   clientsWrapper.addEventListener('mouseleave', () => {
  //     if (clientsSlider) clientsSlider.trigger('play.owl.autoplay');
  //     if (clientsSliderReverse) clientsSliderReverse.trigger('play.owl.autoplay');
  //   });
  // }

  // Team slider: инициализация только на мобайле, на десктопе — статичная сетка
  function initTeamCarousel() {
    const checkWidth = window.innerWidth;
    const $team = $(".team__slider");

    if (checkWidth <= 600) {
      // мобилька: полная карусель
      if (!$team.hasClass("team-active")) {
        $team.addClass("team-active").removeClass("off");
        $team.owlCarousel({
          margin: 20,
          items: 1,
          center: false,
          loop: true,
          autoWidth: true,
          mouseDrag: true,
          touchDrag: true,
          pullDrag: true,
        });
      }
    } else {
      // десктоп: статичная сетка 4 колонки без карусели
      if ($team.hasClass("team-active")) {
        $team.trigger("destroy.owl.carousel").removeClass("team-active");
      }
      $team.addClass("off");
    }
  }

  initTeamCarousel();
  let teamResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(teamResizeTimer);
    teamResizeTimer = setTimeout(initTeamCarousel, 150);
  });

  // Team slider: один раз показать подсказку (wiggle) на мобилках, когда появился в вьюпорте
  let teamHintShown = false;
  const teamEl = document.querySelector(".team__slider");
  if (teamEl) {
    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !teamHintShown &&
            window.innerWidth <= 600
          ) {
            teamEl.classList.add("is-hint");
            teamHintShown = true;
            setTimeout(() => {
              teamEl.classList.remove("is-hint");
            }, 5000); // чуть больше длительности анимации
          }
        });
      },
      { threshold: 1 }
    );
    teamObserver.observe(teamEl);
  }

  // Testi slider - слайдер отзывов с прокруткой колесиком мыши
  const $testi = $(".testi__slider");
  let testiSlider = null;
  let currentTestiIndex = 0;
  let totalTestiItems = 0;

  if ($testi.length) {
    testiSlider = $testi.owlCarousel({
      loop: false,
      margin: 30,
      nav: false,
      dots: false,
      items: 3,
      center: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      smartSpeed: 300,
      responsive: {
        0: {
          items: 2,
          margin: 20,
          autoWidth: true,
        },
        601: {
          items: 3,
          center: false,
          margin: 30,
        },
      },
    });

    // Отключаем клики на слайдере (только drag и wheel)
    // Предотвращаем переключение слайда по клику, но разрешаем для интерактивных элементов
    $testi.on("click", function (e) {
      const target = e.target;
      // Разрешаем клики только на интерактивных элементах (кнопки, ссылки и т.д.)
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");

      // Если клик не на интерактивном элементе, предотвращаем переключение слайда
      if (!isInteractive) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    // Получаем общее количество слайдов
    totalTestiItems = $testi.find(".item").length;

    // Отслеживаем изменение текущего слайда
    $testi.on("changed.owl.carousel", function (event) {
      currentTestiIndex = event.item.index;
    });

    // Обработка прокрутки колесиком мыши
    const testiElement = $testi[0];
    let isScrolling = false;
    let scrollTimeout = null;

    testiElement.addEventListener(
      "wheel",
      (e) => {
        if (isScrolling) return;

        const isFirstSlide = currentTestiIndex === 0;
        const isLastSlide = currentTestiIndex === totalTestiItems - 1;

        // Прокрутка вниз
        if (e.deltaY > 0) {
          if (isLastSlide) {
            // На последнем слайде - разрешаем скролл страницы
            return;
          } else {
            // Переходим к следующему слайду
            e.preventDefault();
            isScrolling = true;
            testiSlider.trigger("next.owl.carousel");
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              isScrolling = false;
            }, 500);
          }
        }
        // Прокрутка вверх
        else if (e.deltaY < 0) {
          if (isFirstSlide) {
            // На первом слайде - разрешаем скролл страницы
            return;
          } else {
            // Переходим к предыдущему слайду
            e.preventDefault();
            isScrolling = true;
            testiSlider.trigger("prev.owl.carousel");
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              isScrolling = false;
            }, 500);
          }
        }
      },
      { passive: false }
    );
  }
});
