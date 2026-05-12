const urlWebhook = "https://hook.us2.make.com/nohbwfnl23c550xibh284m4vfk6vnr9x"; // Sua URL do Make

// Tempos específicos por etapa em segundos
const TEMPOS_POR_ETAPA = {
    1: 15,  // 1 minuto e 30 segundos
    2: 15, // 3 minutos
    3: 15  // 2 minutos
};

let etapaAtual = 1; 

const gabaritoE1 = [3, 6, 8, 10, 13, 21, 23, 27, 28, 30, 31, 32, 33, 35, 40, 51, 53, 57, 59, 60, 61, 63, 64, 71, 73, 76, 83, 84, 87, 90, 93, 97, 98, 103, 104, 107, 108, 111, 114, 117, 123, 125, 127, 132, 133, 138, 140, 143, 148, 149, 153, 155, 158, 162, 164, 166, 167, 168, 171, 174, 184, 187, 189, 192, 194, 203, 206, 208, 209, 210, 215, 218, 221, 223, 224];
const gabaritoE2 = [4, 5, 7, 10, 11, 12, 13, 15, 19, 20, 21, 23, 27, 28, 30, 31, 34, 35, 38, 40, 41, 44, 45, 46, 50, 51, 54, 57, 58, 59, 61, 62, 63, 65, 67, 70, 73, 76, 79, 81, 83, 84, 85, 88, 91, 93, 94, 95, 99, 101, 103, 104, 105, 107, 109, 110, 112, 115, 116, 117, 124, 128, 129, 130, 131, 132, 133, 136, 137, 140, 141, 144, 145, 146, 147, 149, 151, 154, 157, 160, 161, 163, 164, 166, 169, 171, 172, 174, 175, 179, 181, 184, 185, 186, 188, 191, 194, 195, 199, 201, 203, 204, 206, 210, 212, 214, 215, 216, 220, 223, 224, 226, 227, 228];
const gabaritoE3 = [4, 5, 7, 11, 14, 18, 21, 22, 25, 30, 36, 37, 39, 40, 42, 52, 56, 59, 60, 61, 66, 71, 72, 75, 80, 83, 85, 92, 93, 96, 98, 105, 107, 109, 111, 115, 116, 118, 126, 127, 137, 139, 140, 142, 144, 148, 151, 153, 155, 159, 164, 166, 167, 174, 176, 178, 179, 181, 185, 188, 195, 196, 199, 203, 204, 211, 214, 218, 221, 223, 229, 234, 235, 237, 240, 241, 242, 245, 247, 254, 265, 266, 268, 271, 272, 275, 278, 281, 282, 288];

let selecionados = new Set();
let tempoRestante;
let intervaloCronometro;
// Objeto agora guarda apenas NÚMEROS
let notas = { etapa1: 0, etapa2: 0, etapa3: 0 };

function irParaOrientacoes() {
    const nome = document.getElementById('nomeAluno').value;
    const email = document.getElementById('emailAluno').value;
    if (!nome || !email) return alert("Preencha nome e e-mail.");
    document.getElementById('tela-inicial').classList.remove('ativa');
    document.getElementById('tela-orientacoes').classList.add('ativa');
    prepararTextoOrientacao();
}

function prepararTextoOrientacao() {
    const titulo = document.getElementById('titulo-orientacao');
    const texto = document.getElementById('texto-orientacao');
    if (etapaAtual === 1) {
        titulo.innerText = "Etapa 1 – Atenção Concentrada";
        texto.innerText = "Localize, em cada linha, o esquilo que está no topo da imagem e selecione. Você terá 1 minuto. Faça uma linha por vez, da esquerda para a direita, de cima para baixo. Não se preocupe com a velocidade, concentre-se na precisão.";
    } else if (etapaAtual === 2) {
        titulo.innerText = "Etapa 2 – Atenção Dividida";
        texto.innerText = "Localize, em cada linha, os elementos idênticos aos que estão no topo da imagem e selecione. Você terá 3 minutos. Faça uma linha por vez, da esquerda para a direita, de cima para baixo. Não se preocupe com a velocidade, concentre-se na precisão.";
    } else if (etapaAtual === 3) {
        titulo.innerText = "Etapa 3 – Atenção Alternada";
        texto.innerText = "Localize, em cada linha, o elemento igual ao que aparece antes da seta e marque-o. Você terá 2 minutos. Faça uma linha por vez, da esquerda para a direita, de cima para baixo. Não se preocupe com a velocidade, concentre-se na precisão.";
    }
}

function decidirInicioTeste() {
    document.getElementById('tela-orientacoes').classList.remove('ativa');
    document.getElementById('tela-teste').classList.add('ativa');
    configurarLayout();
}

function configurarLayout() {
    const overlay = document.getElementById('overlay');
    const wrapper = document.querySelector('.grid-wrapper');
    const status = document.getElementById('status-teste');
    selecionados.clear();
    tempoRestante = TEMPOS_POR_ETAPA[etapaAtual];
    overlay.classList.remove('desativado');
    document.getElementById('area-proxima-etapa').style.display = "none";

    if (etapaAtual === 1) {
        status.innerText = "Selecione abaixo os elementos idênticos a figura no topo.";
        overlay.style.gridTemplateColumns = "repeat(15, 1fr)";
        wrapper.style.backgroundImage = "url('teste.png')";
        overlay.style.width = "90%"; overlay.style.height = "64%"; overlay.style.bottom = "3.5%"; overlay.style.left = "5%";
        overlay.style.rowGap = "3px"; overlay.style.columnGap = "3px";
        gerarGrade(225);
    } else if (etapaAtual === 2) {
        status.innerText = "Selecione abaixo os elementos idênticos a figura no topo.";
        overlay.style.gridTemplateColumns = "repeat(12, 1fr)";
        wrapper.style.backgroundImage = "url('teste 2.png')";
        overlay.style.width = "75%"; overlay.style.height = "82%"; overlay.style.bottom = "3%"; overlay.style.left = "13%";
        overlay.style.rowGap = "6px"; overlay.style.columnGap = "7px";
        gerarGrade(228);
    } else {
        status.innerText = "Selecione abaixo os elementos idênticos a figura que aparece antes da seta.";
        overlay.style.gridTemplateColumns = "repeat(16, 1fr)";
        wrapper.style.backgroundImage = "url('teste 3.png')"; 
        overlay.style.width = "75%"; overlay.style.left = "17%"; overlay.style.height = "89%"; overlay.style.bottom = "6%";
        overlay.style.rowGap = "2px"; overlay.style.columnGap = "3px";
        gerarGrade(288);
    }
    iniciarCronometro();
}

function gerarGrade(total) {
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = ""; 
    for (let i = 1; i <= total; i++) {
        const box = document.createElement('div');
        box.classList.add('quadradinho');
        box.onclick = () => {
            if (!overlay.classList.contains('desativado')) {
                if (selecionados.has(i)) { 
                    selecionados.delete(i); box.classList.remove('marcado'); 
                } else { 
                    selecionados.add(i); box.classList.add('marcado'); 
                }
            }
        };
        overlay.appendChild(box);
    }
}

function iniciarCronometro() {
    const formatarTempo = (segundos) => {
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;
        return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
    };
    document.getElementById('cronometro').innerText = formatarTempo(tempoRestante);
    if (intervaloCronometro) clearInterval(intervaloCronometro);
    intervaloCronometro = setInterval(() => {
        tempoRestante--;
        document.getElementById('cronometro').innerText = formatarTempo(tempoRestante);
        if (tempoRestante <= 0) { 
            clearInterval(intervaloCronometro); 
            finalizarTempo(); 
        }
    }, 1000);
}

async function finalizarTempo() {
    document.getElementById('overlay').classList.add('desativado');
    const containerProximo = document.getElementById('area-proxima-etapa');
    const botaoProximo = containerProximo.querySelector('button');
    
    const gabarito = etapaAtual === 1 ? gabaritoE1 : (etapaAtual === 2 ? gabaritoE2 : gabaritoE3);
    const colunas = etapaAtual === 1 ? 15 : (etapaAtual === 2 ? 12 : 16);
    let acertos = 0, erros = 0, ultimoId = 0;
    
    selecionados.forEach(id => {
        if (gabarito.includes(id)) { acertos++; if (id > ultimoId) ultimoId = id; }
        else erros++;
    });
    
    const linhaFinal = Math.ceil(ultimoId / colunas) || 0;
    const base = gabarito.filter(id => id <= (linhaFinal * colunas)).length;
    let pontos = Math.max(0, acertos - erros);
    
    // Guarda apenas o número
    notas[`etapa${etapaAtual}`] = base > 0 ? Math.round((pontos / base) * 100) : 0;

    // --- Lógica de Finalização ---
    if (etapaAtual === 3) {
        // Oculta o botão de avançar na última etapa
        containerProximo.style.display = "none";
        
        await enviarParaMake(); // Envia os dados para o webhook do Make
        
        // Exibe a tela de finalização automaticamente
        document.getElementById('tela-teste').classList.remove('ativa');
        document.getElementById('tela-finalizacao').classList.add('ativa');
        
        // Envia a mensagem para a janela/iframe pai
        window.parent.postMessage({
            type: 'teste-atencao-finalizado'
        }, '*');
        
    } else {
        // Se for etapa 1 ou 2, mostra o botão para avançar normalmente
        botaoProximo.innerText = "Avançar para Próxima Etapa";
        containerProximo.style.display = "block";
    }
}

function clicarBotaoProximo() {
    if (etapaAtual < 3) {
        alert(`Etapa ${etapaAtual} concluída.`);
        etapaAtual++;
        document.getElementById('tela-teste').classList.remove('ativa');
        document.getElementById('tela-orientacoes').classList.add('ativa');
        prepararTextoOrientacao();
    }
}

async function enviarParaMake() {
    const dados = { 
        nome: document.getElementById('nomeAluno').value, 
        email: document.getElementById('emailAluno').value, 
        concentrada: notas.etapa1,
        dividida: notas.etapa2,
        alternada: notas.etapa3
    };
    try { 
        await fetch(urlWebhook, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(dados) 
        }); 
    } catch (e) { console.error("Erro no envio"); }
}
