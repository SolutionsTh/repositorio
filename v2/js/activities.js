// console.log("activities.js loaded");
$(document).ready(function () {
	var tries = 0,
		points = 0,
		qcount = 1,
		nextBtn = $(".exercicios .questions-nav .next");

	var score = (function () {
		var altSelect,
			altCorrect;

		var check = function (as, ac) {
			altSelect = as;
			altCorrect = ac;
			if (altSelect === altCorrect) {
				// console.log("Acertou! -> s: "+ altSelect + " = c: "+altCorrect);
				return 1;
			} else {
				// console.log("Errou! -> s: " + altSelect + " = c: " + altCorrect);
				return 0;
			}
		}

		var percent = function (corrects, selecteds) {
			var calc = (100 * corrects) / selecteds,
				finalPercent = parseFloat(calc.toFixed(2));

			return finalPercent;
		}

		return {
			check: check,
			percent: percent
		}
	})();

	function InViewport(el) {
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		);
	}

	function scrollTo(target) {
		var targetOffset = target.offset().top;
		var offset = window.innerHeight-100;
		$("html, body").animate({
			scrollTop: targetOffset-offset
		}, 1000);
		// console.log("Scroll: " + targetOffset);
	}

	$(".exercicios .questions .alt").on("click", function () {
		var sc = $(".exercicios #screen-"+qcount);
		// console.log(sc);
		if (sc.hasClass("uk-active")) {
			// console.log("Tries: " + tries + " | Points: " + points + " | Screen: #screen-" + qcount);

			altSelect = $(this).data("a");
			altCorrect = $(".exercicios .questions-nav .screen-"+qcount).data("correct");

			if (!sc.hasClass("finished")) {
				tries++;

				if (score.check(altSelect, altCorrect)) { // certo
					$(".exercicios .questions #screen-"+qcount).addClass("finished");
					$(".exercicios .questions-nav .next").removeClass("opacity-0");

					$(".exercicios .questions #screen-"+qcount+" .alt .alt-feedback").addClass("wrong");
					$(this).children(".alt-feedback").removeClass("wrong").addClass("correct");

					$(".exercicios .questions-nav .screen-"+qcount).next(".uk-disabled").removeClass("uk-disabled");

					points++;
					qcount++;
					// console.log("Tries: " + tries + " | Points: " + points + " | Screen: #screen-" + qcount);
				} else { // errado
					$(this).children(".alt-feedback").addClass("wrong");
				}
			}
			// console.log("Tries: " + tries + " | Points: " + points);
		}
		setTimeout(function () {
			if (!nextBtn.hasClass("opacity-0") && !InViewport(nextBtn)) {
				scrollTo(nextBtn);
			}
			// console.log("Scroll /o/ - " + InViewport(nextBtn))
		}, 500)
	});

	$('.exercicios .questions-nav a').on("click", function (event) {
		event.preventDefault();
		var $t = $(this);
		if ($t.hasClass('next')) {
			$(".exercicios .questions-nav .next").addClass("opacity-0");
			UIkit.switcher($('.exercicios .uk-subnav')).show('next');
		} else if (!$t.parent().hasClass('uk-active') && !$t.parent().hasClass('uk-disabled')) {
			$(".exercicios .questions-nav .next").addClass("opacity-0");
		}
	});

	$(".exercicios .feedback-final").on("show", function () {
		var pf = score.percent(points, tries) || 0;
		// console.log("Porcentagem Final: "+ pf +"%");

		$(".exercicios .feedback-final .tries-txt").html("<strong>" + tries + "</strong>");
		$(".exercicios .feedback-final .points-txt").html("<strong>" + points + "</strong>");
		$(".exercicios .feedback-final .percent-txt").html("<strong>" + pf + "</strong>");
		$(".exercicios .feedback-final .donut-svg #d-two-svg .circle-svg").css("stroke-dasharray", (pf == 100 ? 110 : pf)+" 100");
	});
	
//////////////////////////////////////////////////////////////////////////

	// Seleciona todos os elementos <span> com a classe "pill m-bg-cyan txt-white"
	var spans = $("span.pill");

	// Matriz para armazenar os valores removidos
	var removedValues = [];

	spans.each(function() {
		// Obtém o texto dentro do elemento <span>
		var texto = $(this).text();

		// Adiciona o texto à matriz de valores removidos
		removedValues.push(texto);

		// Remove o elemento <span>
		$(this).remove();
	});
	
	// Função para randomizar as alternativas de uma questão
	function randomizarAlternativas(questao) {
		
		// Seleciona a lista de alternativas da questão
		var listaAlternativas = questao.find('.alternatives');

		// Obtém a lista de itens das alternativas
		var itensAlternativas = listaAlternativas.children('li');

		// Remove os itens da lista
		itensAlternativas.detach();

		// Randomiza a ordem dos itens
		itensAlternativas.sort(function() {
		return 0.5 - Math.random();
		});

		// Adiciona os itens de volta à lista
		listaAlternativas.append(itensAlternativas);
	}
	
	// Chama a função randomizar
	$('.questions li').each(function() { 
		randomizarAlternativas($(this));
	});

//////////////////////////////////////////////////////////////////////////

	
	
//////////////////////////////////////////////////////////////////////////
	
	// Função para inserir o elemento <span> com o texto fornecido
	function inserirSpan(div, texto) {
		// Cria o elemento <span>
		var span = $('<span>').addClass('pill m-bg-cyan txt-white').text(texto);

		// Insere o <span> na <div>
		div.append(span);
	}

	// Array com os textos a serem inseridos
	var textos = removedValues;
	//console.log(textos);
	//console.log(removedValues);

	// Seleciona todas as perguntas
	var perguntas = $('.questions li');

	// Índice para controlar a posição do texto no array
	var indiceTexto = 0;

	// Chama a função para cada pergunta
	perguntas.each(function() {
		// Seleciona as <div> dentro da pergunta com a classe "letter"
		var divs = $(this).find('div.letter');

		// Para cada <div>, verifica se ainda há textos disponíveis no array
		divs.each(function() {
			if ($(this).find('span.pill.m-bg-cyan.txt-white').length === 0 && indiceTexto < textos.length) {
				var texto = textos[indiceTexto];
				inserirSpan($(this), texto);
				indiceTexto++;
		}
		});
	});

//////////////////////////////////////////////////////////////////////////
	
});