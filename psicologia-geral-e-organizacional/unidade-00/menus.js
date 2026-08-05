document.addEventListener("DOMContentLoaded", function () {

    const menuStatus = {
        "conteudo": "on",
        "infografico": "on",
        "conecta-cast": "on",
        "conceituando": "off",
        "pdf-da-unidade": "on",
        "eaduvida": "off",
        "pratica-em-evidencia": "off",
        "recursos-interativos": "on"
    };

    const menus = document.querySelectorAll(
        ".conteudo, .infografico, .conecta-cast, .conceituando, .pdf-da-unidade, .eaduvida, .pratica-em-evidencia, .recursos-interativos"
    );

    menus.forEach(menu => {

        for (let key in menuStatus) {

            if (menu.classList.contains(key)) {

                if (menuStatus[key] === "off") {

                    menu.classList.add("sem-conteudo");

                    // 🔁 Substitui por #
                    menu.setAttribute("href", "#");

                    // ✏️ Novo title
                    menu.setAttribute("title", "Aguarde a disponibilidade");

                    // 🚫 Impede qualquer navegação
                    menu.addEventListener("click", function (e) {
                        e.preventDefault();
                    });

                    // 🔍 Procura a imagem dentro do menu
                    const icon = menu.querySelector(".menu-cards .title-menu-cards-icon");

                    if (icon) {
                        let src = icon.getAttribute("src");

                        // 🛠️ Evita duplicar "-inativado"
                        if (!src.includes("-inativado")) {
                            const novoSrc = src.replace(".png", "-inativo.png");
                            icon.setAttribute("src", novoSrc);
                        }
                    }
                    const iconMais = menu.querySelector(".menu-cards .title-menu-cards-icon-mais");

                    if (iconMais) {
                        let src = iconMais.getAttribute("src");

                        // 🛠️ Evita duplicar "-inativado"
                        if (!src.includes("-inativado")) {
                            const novoSrc = src.replace(".png", "-inativo.png");
                            iconMais.setAttribute("src", novoSrc);
                        }
                    }

                } else {

                    menu.classList.remove("sem-conteudo");

                }

            }

        }

    });

});