
// Инициализация слайдеров после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Clients slider - обычный слайдер с автоплеем (без модификатора)
  const $clients = $('.clients__slider').not('.clients__slider_reverse');
  const clientsSlider = $clients.length ? $clients.owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
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
      }
    }
  }) : null;

  // Clients slider reverse - тот же, но крутится в обратном направлении
  const $clientsReverse = $('.clients__slider.clients__slider_reverse');
  const clientsSliderReverse = $clientsReverse.length ? $clientsReverse.owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
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
      }
    }
  }) : null;

  // Intersection Observer для автоплея clients слайдера
  const clientsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Слайдер в зоне видимости - запускаем автоплей
        if (clientsSlider) clientsSlider.trigger('play.owl.autoplay');
        if (clientsSliderReverse) clientsSliderReverse.trigger('play.owl.autoplay');
      } else {
        // Слайдер вне зоны видимости - останавливаем автоплей
        if (clientsSlider) clientsSlider.trigger('stop.owl.autoplay');
        if (clientsSliderReverse) clientsSliderReverse.trigger('stop.owl.autoplay');
      }
    });
  }, {
    threshold: 0.1
  });

  // Наблюдаем за clients слайдером
  const clientsElement = document.querySelector('.clients__slider:not(.clients__slider_reverse)');
  const clientsElementReverse = document.querySelector('.clients__slider.clients__slider_reverse');
  if (clientsElement) clientsObserver.observe(clientsElement);
  if (clientsElementReverse) clientsObserver.observe(clientsElementReverse);

  // Team slider - обычный слайдер с навигацией
  $('.team__slider').owlCarousel({

    margin: 30,


    items: 4,

    responsive: {
      0: {
        items: 1,
        center: false,
        margin: 20,
        loop: true,
        autoWidth: true,
      },
      601: {
        items: 4,
        autoWidth: false,
      }
    }
  });
});
