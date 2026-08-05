// Plano de Ensino
if (window.innerWidth <= 961) {
    const el = menu.querySelector(".content.content-plano-de-ensino");

    if (el) {
        // pega o background atual
        let bg = window.getComputedStyle(el).backgroundImage;

        // extrai a URL de dentro do url("...")
        let url = bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

        // troca para versão mobile
        if (!url.includes("-mobile")) {
            let novaUrl = url.replace(".png", "-mobile.png");

            // aplica o novo background
            el.style.backgroundImage = `url("${novaUrl}")`;
        }
    }
}