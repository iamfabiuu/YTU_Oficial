let slideAtual = 0;

const telas = document.querySelectorAll(".tela");

const totalSlides = telas.length;

let inicioX = 0;
let inicioY = 0;

let movimentoX = 0;

let arrastando = false;

let movimentoRealizado = false;


/* ========================================
   ATUALIZAR INDICADORES
======================================== */

function atualizarIndicadores() {

    telas.forEach((tela, indiceTela) => {

        const indicadores =
            tela.querySelectorAll(".paginas span");

        indicadores.forEach((indicador, indice) => {

            indicador.classList.toggle(
                "ativo",
                indice === slideAtual
            );

        });

    });

}


/* ========================================
   MOSTRAR SLIDE
======================================== */

function mostrarSlide(novoSlide, direcao = "proximo") {

    if (
        novoSlide < 0 ||
        novoSlide >= totalSlides ||
        novoSlide === slideAtual
    ) {

        return;

    }


    const telaAtual =
        telas[slideAtual];

    const novaTela =
        telas[novoSlide];


    telaAtual.classList.remove("ativa");

    telaAtual.classList.remove("saindo");


    if (direcao === "proximo") {

        telaAtual.classList.add("saindo");

        novaTela.classList.add("ativa");

    } else {

        novaTela.style.transform =
            "translateX(-100%)";

        novaTela.classList.add("ativa");


        requestAnimationFrame(() => {

            novaTela.style.transform =
                "translateX(0)";

        });

    }


    slideAtual = novoSlide;

    atualizarIndicadores();


    setTimeout(() => {

        telas.forEach((tela, indice) => {

            if (indice !== slideAtual) {

                tela.classList.remove("ativa");

                tela.classList.remove("saindo");

                tela.style.transform = "";

            }

        });

    }, 550);

}


/* ========================================
   PRÓXIMO SLIDE
======================================== */

function proximoSlide() {

    if (slideAtual < totalSlides - 1) {

        mostrarSlide(
            slideAtual + 1,
            "proximo"
        );

    } else {

        finalizarOnboarding();

    }

}


/* ========================================
   SLIDE ANTERIOR
======================================== */

function slideAnterior() {

    if (slideAtual > 0) {

        mostrarSlide(
            slideAtual - 1,
            "anterior"
        );

    }

}


/* ========================================
   BOTÃO PULAR
======================================== */

function pularPagina() {

    finalizarOnboarding();

}


/* ========================================
   FINALIZAR ONBOARDING
======================================== */

function finalizarOnboarding() {

    window.location.href = "home.html";

}


/* ========================================
   INÍCIO DO ARRASTE
   MOUSE + TOUCH
======================================== */

function iniciarArraste(event) {

    if (
        event.type === "mousedown" &&
        event.button !== 0
    ) {

        return;

    }


    arrastando = true;

    movimentoRealizado = false;


    if (event.type === "touchstart") {

        inicioX =
            event.touches[0].clientX;

        inicioY =
            event.touches[0].clientY;

    } else {

        inicioX =
            event.clientX;

        inicioY =
            event.clientY;

    }


    movimentoX = 0;


    document.body.classList.add(
        "arrastando"
    );

}


/* ========================================
   DURANTE O ARRASTE
======================================== */

function duranteArraste(event) {

    if (!arrastando) {

        return;

    }


    let atualX;

    let atualY;


    if (event.type === "touchmove") {

        atualX =
            event.touches[0].clientX;

        atualY =
            event.touches[0].clientY;

    } else {

        atualX =
            event.clientX;

        atualY =
            event.clientY;

    }


    const distanciaVertical =
        Math.abs(atualY - inicioY);


    movimentoX =
        atualX - inicioX;


    /*
       Se o movimento for principalmente
       vertical, não tratamos como carrossel.
    */

    if (
        distanciaVertical >
        Math.abs(movimentoX)
    ) {

        return;

    }


    /*
       Evita selecionar textos/imagens
       durante o arraste.
    */

    if (event.cancelable) {

        event.preventDefault();

    }


    movimentoRealizado = true;

}


/* ========================================
   FIM DO ARRASTE
======================================== */

function finalizarArraste() {

    if (!arrastando) {

        return;

    }


    arrastando = false;


    document.body.classList.remove(
        "arrastando"
    );


    /*
       Distância mínima necessária
       para trocar de tela.
    */

    const distanciaMinima = 60;


    if (
        !movimentoRealizado ||
        Math.abs(movimentoX) <
        distanciaMinima
    ) {

        movimentoX = 0;

        return;

    }


    /*
       Arrastou para a esquerda
       = próxima tela
    */

    if (movimentoX < 0) {

        proximoSlide();

    }


    /*
       Arrastou para a direita
       = tela anterior
    */

    else {

        slideAnterior();

    }


    movimentoX = 0;

}


/* ========================================
   CANCELAR ARRASTE
======================================== */

function cancelarArraste() {

    arrastando = false;

    movimentoX = 0;

    movimentoRealizado = false;


    document.body.classList.remove(
        "arrastando"
    );

}


/* ========================================
   TOUCH
======================================== */

document.addEventListener(
    "touchstart",
    iniciarArraste,
    {
        passive: true
    }
);


document.addEventListener(
    "touchmove",
    duranteArraste,
    {
        passive: false
    }
);


document.addEventListener(
    "touchend",
    finalizarArraste,
    {
        passive: true
    }
);


document.addEventListener(
    "touchcancel",
    cancelarArraste,
    {
        passive: true
    }
);


/* ========================================
   MOUSE
======================================== */

document.addEventListener(
    "mousedown",
    iniciarArraste
);


document.addEventListener(
    "mousemove",
    duranteArraste
);


document.addEventListener(
    "mouseup",
    finalizarArraste
);


document.addEventListener(
    "mouseleave",
    cancelarArraste
);


/* ========================================
   EVITAR ARRASTAR IMAGENS
======================================== */

document.querySelectorAll("img").forEach(
    imagem => {

        imagem.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    }
);


/* ========================================
   TECLADO
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight"
        ) {

            proximoSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            slideAnterior();

        }


        if (
            event.key === "Escape"
        ) {

            pularPagina();

        }

    }
);


/* ========================================
   INICIALIZAÇÃO
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        slideAtual = 0;


        telas.forEach(
            (tela, indice) => {

                tela.classList.toggle(
                    "ativa",
                    indice === 0
                );

                tela.classList.remove(
                    "saindo"
                );

                tela.style.transform = "";

            }
        );


        atualizarIndicadores();

    }
);