const header = document.querySelector(".header");

if (header) {
  const navigations = header.querySelectorAll(".nav");

  if (navigations.length) {
    navigations.forEach((nav) => {
      const navWithChildren = nav.querySelectorAll(".menu-item-has-children");

      navWithChildren.forEach((item) => {
        const subMenu = item.querySelector(".sub-menu");

        if (subMenu) {
          item.addEventListener("mouseenter", (e) => {
            item.classList.add("active");
            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
          });
          item.addEventListener("mouseleave", (e) => {
            item.classList.remove("active");
            subMenu.style.maxHeight = null;
          });
        }
      });
    });
  }
}
