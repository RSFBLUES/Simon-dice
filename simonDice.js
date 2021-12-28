let maquina = [];
let retrasoMaquina = 1000;
let jugador = [];
let retrasoJugador = 1000;
let $index = 0; 
let puntaje = 0;
const frases = [
    "¡Mejor suerte para la próxima!",
    "¡Vuelve a intentarlo!",
    "¡No te rindas!",
    "¡Sigue adelante!",
    "¡Bien hecho!",
    "¡Lo estas haciendo bien!",
    "¡Sigue así!",
    "¡Vas por buen camino!"
];

const $jugar = document.querySelector('#jugar');
$jugar.onclick = function(){
   
    ocultarMenu();

    setTimeout(function(){
        bloquearJugador();
        juegaMaquina();
    }, retrasoMaquina);
    
    setTimeout(function(){
        juegaJugador();
    },retrasoJugador);
   
};

function juegaMaquina(){

    const element = Math.floor(Math.random()*4);
    maquina.push(element);
    
    maquina.forEach(function(cuadro,index) {
        setTimeout(function(){
            mostrar(cuadro);
        }, (index+1)*1000);
    });

};

function mostrar(jugada){

    let color = pasoAColor(jugada);

    const $cuartoCirculo1 = document.querySelector(color);
        $cuartoCirculo1.style.opacity = "1";
        setTimeout(function(){
            $cuartoCirculo1.style.opacity = "0.7";
        }, 500);

};

function pasoAColor(jugada){
    if(jugada === 0){
        return ".verde";
    }else if( jugada === 1){
        return ".rojo";
    }else if( jugada === 2){
        return ".azul";
    }else{
        return ".amarillo";
    }
};

function hacerClick($simon){
    let jugador = [];
    $simon.onclick = function(ele){
        const elemento = ele.target;
        if(elemento.classList.contains("verde")){
            mostrar(0);
            jugador.push(0);
            return jugador;
        }else if(elemento.classList.contains("rojo")){
            mostrar(1);
            jugador.push(1)
            return jugador;
        }else if(elemento.classList.contains("azul")){
            mostrar(2);
            jugador.push(2);
            return jugador;
        }else if(elemento.classList.contains("amarillo")){
            mostrar(3);
            jugador.push(3);
            return jugador;
        }
    }

    return jugador;
};

function juegaJugador() {
    document.querySelector(".rojo").onclick = jugadorOpciones;
    document.querySelector(".verde").onclick = jugadorOpciones;
    document.querySelector(".azul").onclick = jugadorOpciones;
    document.querySelector(".amarillo").onclick = jugadorOpciones;
  };

function jugadorOpciones(e) {
    const $cuadro = e.target.id;
    
    mostrar(Number($cuadro));

    jugador.push(Number($cuadro));

    if(jugador[$index] !== maquina[$index]){
        jugadorPierde();
    
    }else if(jugador.length < maquina.length){
        $index++;

        juegaJugador();
       
    }else if (jugador.length === maquina.length){
        jugador = [];
        
        puntaje = puntaje + 100;

        $index = 0;

        bloquearJugador();

        juegaMaquina();
       
        retrasoJugador = (maquina.length * 1000) + 1000;

        setTimeout(function(){
            juegaJugador();
        },retrasoJugador);  
       
    }

};

function jugadorPierde(){
    mostrarMenu();

    maquina = [];

    jugador = [];

    jugarDeNuevo();

    cambioPuntaje();

    puntaje = 0;

    $index = 0;

    retrasoJugador = 1000;
     
    retrasoMaquina = 1000;

    fraseAleatoria();
};

function jugarDeNuevo(){
    const $jugar = document.querySelector('#jugar');
    $jugar.textContent = "Jugar de nuevo";
};

function cambioPuntaje(){
    const $puntaje = document.querySelector('#puntaje');
    $puntaje.textContent = puntaje; 
};

function ocultarMenu(){
    const $menu = document.querySelector('#menu');
    $menu.className = 'oculto';

    const $simon = document.querySelector('#simon');
    $simon.className = '';

};

function mostrarMenu(){
    const $menu = document.querySelector('#menu');
    $menu.className = '';

    const $simon = document.querySelector('#simon');
    $simon.className = 'oculto';

};

function fraseAleatoria(){
    const frase = Math.floor(Math.random()*8);
    const $frase = document.querySelector('#frase');
    $frase.textContent = frases[frase];
};

function bloquearJugador(){
    document.querySelector(".rojo").onclick = function(){};
    document.querySelector(".verde").onclick = function(){};
    document.querySelector(".azul").onclick = function(){};
    document.querySelector(".amarillo").onclick = function(){};
}