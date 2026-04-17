// 1. Buscando os elementos do HTML
// querySelectorAll pega TODOS os elementos com essa classe e guarda numa "Lista" (Array).
// document. - Representa o HTML, óbviamente
const cards = document.querySelectorAll('.Introducao .card-Introducao'); // Pega todos os cards
// getElementById pega um elemento único e específico pelo ID dele.
// Get Element By Id == Obter elemento por ID
const botaoAvancar = document.getElementById('botao-avancar');
const botaoVoltar = document.getElementById('botao-voltar');
const indicador = document.getElementById('indicador-pagina');

// O 'const' faz no JavaScript, o mesmo que 'final' faz no Java:
// ambos impedem a reatribuição da variável.

// 2. Variável de controle
let indiceAtual = 0;
// O equivalente a 'let' no Java é 'Int'
// É usado 'let' em vez de 'const' porque esse número VAI mudar toda vez que clicarmos.

// 3. A função que faz o trabalho do carrosel
function atualizarCarrossel() {
    // PASSO A: Esconder todo mundo
    // Varre todos os cards e tira a classe 'ativo' deles
    // O '.forEach' significa "Para Cada". Ele visita cada card da nossa lista 
    // e arranca a classe 'ativo' deles, FAZENDO O CSS aplicar o 'display: none'.
    // '.classList' é o que o define como array // '.remove' remove a classe entre parênteses
    cards.forEach(card => { card.classList.remove('ativo'); });

    // PASSO B: Mostrar só o correto
    // Depois, colocamos a classe 'ativo' APENAS no card do indice atual
    // Pegamos a nossa lista/array (cards), abrimos na gaveta atual [indiceAtual] (Originalmente 0)
    // e injetamos a classe 'ativo' só nele. O CSS lê isso e aplica o 'display: block'.
    // '.add' adiciona a classe entre parênteses
    cards[indiceAtual].classList.add('ativo');

    // PASSO C: Atualizar o textinho de "1 / 9" (página)
    // 'cards.length' descobre o tamanho total da lista (neste caso, 9).
    // (indiceAtual + 1) para o usuário ler "1" em vez de "0".
    indicador.textContent = `${indiceAtual + 1} / ${cards.length}`;
}

// 4. O que acontece ao clicar em "Próximo"
// 'EventListener' == "Ouvinte de Eventos"
botaoAvancar.addEventListener('click', function () {
    indiceAtual++; // Soma 1 quando perceber um click em avançar

    // Se passar do último card, volta para o primeiro (posição 0)
    if (indiceAtual >= cards.length) {
        indiceAtual = 0;
    }

    atualizarCarrossel(); // Chama a função que transiciona os cards
});

// 5. O que acontece ao clicar em "Anterior"
botaoVoltar.addEventListener('click', function () {
    indiceAtual--; // Subtrai 1 quando perceber um click em voltar

    // Se tentar voltar antes do primeiro, vai lá para o último
    if (indiceAtual < 0) {
        indiceAtual = cards.length - 1;
    }

    atualizarCarrossel(); // Chama a função que transiciona os cards
});

// 6. Para garantir que a página já carregue certa, chamamos a função uma vez no início
atualizarCarrossel();