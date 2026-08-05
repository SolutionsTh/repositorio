document.addEventListener("DOMContentLoaded", function () {

  const tabGroups = document.querySelectorAll(".tabs-dinamico-content");

  tabGroups.forEach(group => {

    const tabs = group.querySelectorAll(".tab-dinamico-content");
    const panels = group.parentElement.querySelectorAll(".tab-dinamico-panel");

    tabs.forEach(tab => {

      tab.addEventListener("click", function () {

        const isActive = this.classList.contains("active");
        const target = this.getAttribute("data-tab");
        const panel = group.parentElement
          .querySelector('.tab-dinamico-panel[data-content="' + target + '"]');

        // Fecha todos suavemente
        panels.forEach(p => {
          if (p.classList.contains("active")) {
            p.style.maxHeight = p.scrollHeight + "px"; // define altura atual
            p.offsetHeight; // força reflow
            p.style.maxHeight = "0"; // anima para 0
            p.classList.remove("active");
          }
        });

        tabs.forEach(t => t.classList.remove("active"));

        // Se NÃO estava ativo, abre suavemente
        if (!isActive) {

          this.classList.add("active");

          panel.classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";

        }

      });

    });

  });

});

