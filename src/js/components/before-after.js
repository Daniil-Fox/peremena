const baSliders = document.querySelectorAll(".b-a");
const body = document.body;
if (baSliders.length > 0) {
  document.addEventListener("DOMContentLoaded", (e) => {
    baSliders.forEach((slider) => {
      let width = slider.offsetWidth;
      const before = slider.querySelector(".b-a__before");
      const beforeImg = before.querySelector("img");

      const change = slider.querySelector(".b-a__change");

      let isActive = false;

      beforeImg.style.width = `${width}px`;

      const beforeAfterSlider = (x) => {
        let shift = Math.max(0, Math.min(x, slider.offsetWidth));

        before.style.width = `${shift}px`;
        change.style.left = `${shift}px`;
      };

      window.addEventListener("resize", (e) => {
        width = slider.offsetWidth;
        beforeImg.style.width = `${width}px`;
      });

      const pauseEvents = (e) => {
        e.stopPropagation();
        // e.preventDefault();
        return false;
      };
      slider.addEventListener("mouseup", (e) => {
        isActive = false;
      });

      slider.addEventListener("mousedown", (e) => {
        isActive = true;
      });

      slider.addEventListener("mouseleave", (e) => {
        isActive = false;
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isActive) return;

        let x = e.pageX;
        x -= slider.getBoundingClientRect().left;
        beforeAfterSlider(x);
        pauseEvents(e);
      });

      change.addEventListener("touchend", (e) => {
        isActive = false;
      });

      change.addEventListener("touchstart", (e) => {
        isActive = true;
      });

      slider.addEventListener("touchcancel", (e) => {
        isActive = false;
      });

      slider.addEventListener("touchmove", (e) => {
        if (!isActive) return;

        let x;
        let i;

        for (i = 0; i < e.changedTouches.length; i++) {
          x = e.changedTouches[i].pageX;
          beforeAfterSlider(x);
          pauseEvents(e);
        }
      });
    });
  });
}
