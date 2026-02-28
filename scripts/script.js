// ============================================
// PIXELFORGE STUDIOS - JAVASCRIPT
// Todos os comentários em português
// ============================================

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 PixelForge Studios - Site carregado!');
    
    // ============================================
    // ALTERNÂNCIA DE TEMA ESCURO/CLARO
    // ============================================
    const botaoTema = document.getElementById('botao-tema');
    const iconeTema = botaoTema.querySelector('i');
    const textoTema = botaoTema.querySelector('.texto-tema');
    const corpoPagina = document.body;
    
    // Função para aplicar o tema (escuro ou claro)
    function aplicarTema(estaEscuro) {
        if (estaEscuro) {
            // Adiciona classe para ativar tema escuro
            corpoPagina.classList.add('modo-escuro');
            iconeTema.className = 'fa-solid fa-sun';
            textoTema.innerText = 'Modo Claro';
        } else {
            // Remove classe para voltar ao tema claro
            corpoPagina.classList.remove('modo-escuro');
            iconeTema.className = 'fa-solid fa-moon';
            textoTema.innerText = 'Modo Escuro';
        }
    }
    
    // Verifica se tem preferência salva no navegador
    const temaSalvo = localStorage.getItem('pixelforge-tema');
    if (temaSalvo === 'escuro') {
        aplicarTema(true);
    }
    
    // Evento de clique no botão de tema
    botaoTema.addEventListener('click', () => {
        // Verifica se está no modo escuro atualmente
        const estaEscuroAtualmente = corpoPagina.classList.contains('modo-escuro');
        const novoModo = !estaEscuroAtualmente;
        
        // Aplica o novo tema
        aplicarTema(novoModo);
        
        // Salva a preferência no navegador
        localStorage.setItem('pixelforge-tema', novoModo ? 'escuro' : 'claro');
        
        // Pixer comenta sobre a mudança
        dizerPixer(novoModo ? 'Modo gótico ativado! 🖤🔮' : 'Modo vibrante ativado! 🌈✨');
    });
    
    // ============================================
    // PERSONAGEM PIXER (MASCOTE)
    // ============================================
    const personagemPixer = document.getElementById('personagem-pixer');
    const balaoFala = document.getElementById('balao-fala');
    const textoPixer = document.getElementById('texto-pixer');
    
    // Frases que a Pixer fala em diferentes situações
    const frases = {
        padrao: "Bem vindo, Player! 💜",
        jogos: "Esses jogos são épicos! 🎮",
        trailer: "Prepare a pipoca! 🍿",
        comunidade: "Nossa comunidade é incrível! 💜",
        suporte: "Manda ver no form! 💌",
        sucesso: "Enviado! 🚀",
        erro: "Preenche tudo! 😅"
    };
    
    // Função para fazer a Pixer falar
    function dizerPixer(texto) {
        textoPixer.innerText = texto;
        balaoFala.classList.add('visivel');
        clearTimeout(window.timerPixer);
        window.timerPixer = setTimeout(() => balaoFala.classList.remove('visivel'), 5000);
    }
    
    // Pixer segue o movimento do mouse
    document.addEventListener('mousemove', (evento) => {
        const x = (window.innerWidth - evento.pageX * 2) / 100;
        const y = (window.innerHeight - evento.pageY * 2) / 100;
        personagemPixer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
    
    // ============================================
    // DETECTAR ROLAGEM DA PÁGINA
    // ============================================
    const secoes = document.querySelectorAll('section');
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            // Quando uma seção aparece na tela
            if (entrada.isIntersecting && frases[entrada.target.id]) {
                dizerPixer(frases[entrada.target.id]);
            }
        });
    }, { threshold: 0.3 });
    
    secoes.forEach(secao => observador.observe(secao));
    
    // ============================================
    // API CEP - PREENCHIMENTO AUTOMÁTICO
    // ============================================
    const campoCep = document.getElementById('cep');
    const campoRua = document.getElementById('rua');
    const campoBairro = document.getElementById('bairro');
    const campoCidade = document.getElementById('cidade');
    const campoEstado = document.getElementById('estado');
    
    // Evento quando o usuário sai do campo CEP
    campoCep.addEventListener('blur', () => {
        // Remove caracteres não numéricos do CEP
        const cep = campoCep.value.replace(/\D/g, '');
        
        // Verifica se o CEP tem 8 dígitos
        if (cep.length === 8) {
            // Faz requisição para API ViaCEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(resposta => resposta.json())
                .then(dados => {
                    // Verifica se não deu erro na consulta
                    if (!dados.erro) {
                        // Preenche os campos automaticamente
                        campoRua.value = dados.logradouro;
                        campoBairro.value = dados.bairro;
                        campoCidade.value = dados.localidade;
                        campoEstado.value = dados.uf;
                        
                        // Pixer comemora
                        dizerPixer('Endereço encontrado! 📍✨');
                    } else {
                        dizerPixer('CEP não encontrado! 😅');
                    }
                })
                .catch(() => {
                    dizerPixer('Erro ao buscar CEP! 😕');
                });
        }
    });
    
    // Formata o CEP enquanto digita (00000-000)
    campoCep.addEventListener('input', (evento) => {
        let valor = evento.target.value.replace(/\D/g, '');
        if (valor.length > 5) {
            valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        evento.target.value = valor;
    });
    
    // ============================================
    // FORMULÁRIO DE CONTATO
    // ============================================
    const formulario = document.getElementById('formulario-contato');
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        
        // Verifica se todos os campos estão preenchidos
        if (formulario.checkValidity()) {
            dizerPixer(frases.sucesso);
            formulario.reset();
        } else {
            dizerPixer(frases.erro);
        }
    });
    
    // ============================================
    // CLIQUE NA PIXER
    // ============================================
    personagemPixer.addEventListener('click', () => {
        const frasesAleatorias = [
            "Oi! Eu sou a Pixer! 💜", 
            "Adoro jogos! 🎮", 
            "Vamos jogar? 👾",
            "PixelForge é vida! ✨"
        ];
        const fraseAleatoria = frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)];
        dizerPixer(fraseAleatoria);
    });
});