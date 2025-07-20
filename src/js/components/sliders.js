import { Swiper } from "swiper";
import { Navigation } from "swiper/modules";

Swiper.use([Navigation]);

new Swiper(".clients__slider", {
  slidesPerView: 4,
  spaceBetween: 30,

  breakpoints: {
    320: {
      slidesPerView: "auto",
    },
    601: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".team__slider", {
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: "auto",
    },
    601: {
      slidesPerView: 4,
    },
  },
});
