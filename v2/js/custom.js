/* CORRIGIR FEEDBACK QUIZ */
document.querySelectorAll('#cs5 .alt-feedback p').forEach(function(p) {
    const texto = p.textContent.trim();

    if (texto === 'Resposta correta') {
        p.textContent = 'Correto! Muito bem!';
    } else if (
        texto === 'Resposta incorreta' ||
        texto === 'Resposta icorreta' ||
        texto === 'Não é essa. Revise o conteúdo e tente novamente.'
    ) {
        p.textContent = 'Não é essa. Revise o conteúdo e tente novamente.';
    }
});


/* BOTÕES MENU CARDS */
document.addEventListener("DOMContentLoaded", function() {

	const btnProximo = document.querySelector(".btn-nav-proximo");
	const btnAnterior = document.querySelector(".btn-nav-anterior");

	const menu1 = document.querySelector(".btn-menu-nav-1");
	const menu2 = document.querySelector(".btn-menu-nav-2");

	const areaSwipe = document.querySelector(".btn-menu-card");

	function irProximo() {
		menu1.classList.remove("active");
		menu2.classList.add("active");
	}

	function irAnterior() {
		menu2.classList.remove("active");
		menu1.classList.add("active");
	}

	// BOTÕES
	btnProximo.addEventListener("click", function(e) {
		e.preventDefault();
		irProximo();
	});

	btnAnterior.addEventListener("click", function(e) {
		e.preventDefault();
		irAnterior();
	});

	// -------------------
	// SWIPE REAL
	// -------------------

	let startX = 0;
	let isDragging = false;
	let moved = false;

	areaSwipe.addEventListener("pointerdown", function(e) {
		startX = e.clientX;
		isDragging = true;
		moved = false;
	});

	areaSwipe.addEventListener("pointermove", function(e) {
		if (!isDragging) return;

		let distance = e.clientX - startX;

		if (Math.abs(distance) > 10) {
			moved = true; // já consideramos arrasto
		}
	});

	areaSwipe.addEventListener("pointerup", function(e) {
		if (!isDragging) return;

		let distance = e.clientX - startX;

		if (distance > 70) {
			irAnterior();
		} else if (distance < -70) {
			irProximo();
		}

		isDragging = false;
	});

	// BLOQUEAR CLIQUE SE FOI ARRASTO
	areaSwipe.querySelectorAll("a").forEach(link => {
		link.addEventListener("click", function(e) {
			if (moved) {
				e.preventDefault();
				e.stopPropagation();
			}
		});
	});

});


/* Backgrounds */
/* 
document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector('.bg-objetivos-de-aprendizagem video source')

  video.src = '../img/bg-objetivos-de-aprendizagem.mp4';
});



window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.cover-video').style.transform = `translateY(${scrollY}px)`;
});*/


/* Substituir a thumb pelo vídeo */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll(
    '.bg-para-inicio-de-conversa, .bg-objetivos-de-aprendizagem, .bg-videoaula, .bg-referencias, .bg-conecta-cast'
  );

  let windowHeight = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < windowHeight * 0.01 && rect.bottom > windowHeight * 0.01;

    if (isVisible) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
});


/* Atraso para iniciar o vídeo */
document.querySelectorAll('[class*="bg-"]').forEach(section => {
  const video = section.querySelector('.cover-video');
  if (!video) return;

  const observer = new MutationObserver(() => {
    if (section.classList.contains('active')) {
      setTimeout(() => video.play(), 100);
    } else {
      video.pause();
    }
  });

  observer.observe(section, { attributes: true });
});
/* document.querySelectorAll('[class*="bg-"]').forEach(section => {
  const video = section.querySelector('.cover-video');
  if (!video) return;

  const observer = new MutationObserver(() => {
    if (section.classList.contains('active')) {
      setTimeout(() => {
        // Reinicia o vídeo antes de tocar
        video.currentTime = 0;

        // Dá play (com tratamento para bloqueio de autoplay)
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log('Autoplay bloqueado — aguardando interação do usuário.');
          });
        }
      }, 100); // Delay antes de iniciar
    } else {
      // Pausa o vídeo quando a seção perde o "active"
      video.pause();
    }
  });

  observer.observe(section, { attributes: true });
}); */


// Trocar vídeo para versão mobile

// cover
var video = document.querySelector('#cover .cover-video');

if (window.innerWidth <= 599) {
  video.src = "video/cover-mobile.mp4";
} else {
  video.src = "video/cover.mp4";
}
video.load();

// bg-objetivos-de-aprendizagem
var video = document.querySelector('.bg-objetivos-de-aprendizagem .cover-video');
var source = video.querySelector('.source'); 

if (window.innerWidth <= 599) {
  source.src = "v2/video/bg-objetivos-de-aprendizagem-mobile.mp4";
} else {
  source.src = "v2/video/bg-objetivos-de-aprendizagem.mp4";
}
video.load();

// bg-videoaula
var video = document.querySelector('.bg-videoaula .cover-video');
var source = video.querySelector('.source'); 

if (window.innerWidth <= 599) {
  source.src = "v2/video/bg-videoaula-mobile.mp4";
} else {
  source.src = "v2/video/bg-videoaula.mp4";
}
video.load();


//EVITAR CLIQUE ACCORDION SUBIR PÁGINA
(function () {

  document.addEventListener('mousedown', function (e) {
    const trigger = e.target.closest('.uk-accordion-title');
    if (!trigger) return;

    const initialScroll = window.scrollY;
    let frames = 0;

    // forÃ§a imediatamente
    window.scrollTo(0, initialScroll);

    function lockScroll() {
      window.scrollTo(0, initialScroll);

      frames++;

      if (frames < 60) { // ðŸ‘ˆ reduzido para evitar "briga" com animaÃ§Ã£o
        requestAnimationFrame(lockScroll);
      }
    }

    // sincroniza com render
    requestAnimationFrame(() => {
      requestAnimationFrame(lockScroll);
    });

  }, true);

})();