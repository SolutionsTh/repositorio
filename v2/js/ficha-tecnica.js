const fichaTecnica = {
	profissionais: [
		["Gerente de Produto e Soluções Educacionais", "Danielle Vilar"],
		["Coordenadora de Desenho Educacional", "Giselly Cezário"],
		["Designers Instrucionais", "Amanda Rosa, Roberta Prevedello e Solange Felix"],
		["Supervisora de Produção de Conteúdo Educacional", "Olivia Pereira"],
		["Revisor Ortográfico", "Anderson da Rocha"],
		["Designers Gráficos", "Andressa Rivello, Cristiane Pereira e David Nunes"],
		["Web Designers", "Marcus de Moraes e Thiago Moraes"],
		["Coordenadora de Audiovisual", "Jéssica Reis"],
		["Produção de Audiovisual", "Gustavo do Nascimento, Lucas Assiny, Matheus Damascena e Rafael Diniz"],
		["Supervisor de Operações Digitais", "Jonathan Souza"],
		["Operações Digitais", "João Plessim e Wallace Gomes"]
	],
	ferramentas: {
		aviso: "Parte do material didático e dos recursos de aprendizagem foi gerada com apoio de IA, sob curadoria pedagógica da equipe docente especialista na área (curador).",
		copyright: "Copyright © 2026, Afya. Nenhuma parte deste material poderá ser reproduzida, transmitida e gravada por qualquer meio eletrônico, mecânico, por fotocópia e outros, sem a prévia autorização, por escrito, da Afya."
	}
};

const profissionaisDiv = document.querySelector(".profissionais");
const ferramentasDiv = document.querySelector(".ferramentas");

/* Preenche profissionais */
fichaTecnica.profissionais.forEach(([cargo, nomes]) => {
	const p = document.createElement("p");
	p.innerHTML = `<strong>${cargo}: </strong>${nomes}.`;
	profissionaisDiv.appendChild(p);
});

/* Preenche ferramentas */
ferramentasDiv.innerHTML = `
	<p>${fichaTecnica.ferramentas.aviso}</p>
	<div class="copyright">
		<p class="txt-small">${fichaTecnica.ferramentas.copyright}</p>
	</div>
`;