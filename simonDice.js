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

    bloquearJugador();

    setTimeout(function(){
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

function mostrar(cuadro){

    let color = pasarAColor(cuadro);

    const $cuartoCirculo1 = document.querySelector(color);
    $cuartoCirculo1.style.opacity = "1";
    setTimeout(function(){
        $cuartoCirculo1.style.opacity = "0.7";
    }, 500);

};

function pasarAColor(jugada){
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

function juegaJugador() {
    document.querySelector(".rojo").onclick = manejarTurnoJugador;
    document.querySelector(".verde").onclick = manejarTurnoJugador;
    document.querySelector(".azul").onclick = manejarTurnoJugador;
    document.querySelector(".amarillo").onclick = manejarTurnoJugador;
  };

function manejarTurnoJugador(e) {
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
