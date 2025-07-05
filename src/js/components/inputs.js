const fields = document.querySelectorAll(".form__field");

if (fields.length > 0) {
  fields.forEach((field) => {
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
