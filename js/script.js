const botaoMenu = document.querySelector(".botao-menu");
const linksMenu = document.querySelector(".menu-links");

// Controla a abertura e o fechamento do menu em telas menores.
if (botaoMenu && linksMenu) {
  botaoMenu.addEventListener("click", () => {
    const menuAberto = linksMenu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
  });

  linksMenu.addEventListener("click", (evento) => {
    if (evento.target.tagName === "A") {
      linksMenu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    }
  });
}

const formulario = document.querySelector("#formulario-newsletter");

if (formulario) {
  const retornoFormulario = document.querySelector("#retorno-formulario");

  // Exibe ou limpa a mensagem de erro de um campo do formulário.
  const mostrarErro = (campo, mensagem) => {
    const grupo = campo.closest(".grupo-campo");
    const erro = grupo ? grupo.querySelector(".mensagem-erro") : document.querySelector(".erro-consentimento");

    if (grupo) {
      grupo.classList.toggle("campo-invalido", Boolean(mensagem));
    }

    if (erro) {
      erro.textContent = mensagem;
    }
  };

  // Verifica se o e-mail tem uma estrutura básica válida.
  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = formulario.elements.name;
    const email = formulario.elements.email;
    const cidade = formulario.elements.city;
    const perfil = formulario.elements.profile;
    const consentimento = formulario.elements.consent;
    let formularioValido = true;

    // Limpa erros anteriores antes de validar novamente.
    mostrarErro(nome, "");
    mostrarErro(email, "");
    mostrarErro(cidade, "");
    mostrarErro(perfil, "");
    document.querySelector(".erro-consentimento").textContent = "";

    if (nome.value.trim().length < 3) {
      mostrarErro(nome, "Informe seu nome completo.");
      formularioValido = false;
    }

    if (!emailValido(email.value.trim())) {
      mostrarErro(email, "Informe um e-mail válido.");
      formularioValido = false;
    }

    if (cidade.value.trim().length < 2) {
      mostrarErro(cidade, "Informe sua cidade.");
      formularioValido = false;
    }

    if (!perfil.value) {
      mostrarErro(perfil, "Selecione um perfil.");
      formularioValido = false;
    }

    if (!consentimento.checked) {
      document.querySelector(".erro-consentimento").textContent = "Confirme a autorização para receber comunicados.";
      formularioValido = false;
    }

    if (!formularioValido) {
      retornoFormulario.textContent = "Revise os campos destacados antes de enviar.";
      retornoFormulario.classList.remove("sucesso");
      return;
    }

    retornoFormulario.textContent = "Cadastro realizado com sucesso. Obrigado por acompanhar o Connected Blood!";
    retornoFormulario.classList.add("sucesso");
    formulario.reset();
  });
}
