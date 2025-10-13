
// Инициализация слайдеров после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Clients slider - обычный слайдер с автоплеем
  const clientsSlider = $('.clients__slider').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: false,
    autoplaySpeed: 800,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    items: 4,
    center: false,
    startPosition: 0,
    responsive: {
      0: {
        items: 1,
        center: true,
        margin: 20,
      },
      601: {
        items: 4,
        center: false,
        margin: 30,
      }
    }
  });

  // Intersection Observer для автоплея clients слайдера
  const clientsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Слайдер в зоне видимости - запускаем автоплей
        clientsSlider.trigger('play.owl.autoplay');
      } else {
        // Слайдер вне зоны видимости - останавливаем автоплей
        clientsSlider.trigger('stop.owl.autoplay');
      }
    });
  }, {
    threshold: 0.1
  });

  // Наблюдаем за clients слайдером
  const clientsElement = document.querySelector('.clients__slider');
  if (clientsElement) {
    clientsObserver.observe(clientsElement);
  }

  // Team slider - обычный слайдер с навигацией
  $('.team__slider').owlCarousel({

    margin: 30,


    items: 4,

    responsive: {
      0: {
        items: 1,
        center: true,
        margin: 20,
      },
      601: {
        items: 4,
      }
    }
  });
});
