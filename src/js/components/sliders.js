import { Swiper } from "swiper";
import { Navigation } from "swiper/modules";

Swiper.use([Navigation]);

new Swiper(".clients__slider", {
  slidesPerView: 4,
  spaceBetween: 30,
});

new Swiper(".team__slider", {
  slidesPerView: 4,
  spaceBetween: 30,
});
