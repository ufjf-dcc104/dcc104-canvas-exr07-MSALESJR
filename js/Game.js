/**
 * Created by Marcus on 21/06/2017.
 */
var level  = null;
var tela = null;
var contexto = null;
var atual    = new Date();
var anterior = new Date();
var dt       = 0;


var grid = null;

var player_1 = null;
var ultima_direcao_player_1 = 4;

var player_1_img = new Image();
player_1_img.src = './img/player_1.png';

function init(){
    tela = document.getElementById('tela');
    contexto = tela.getContext('2d');

    player_1 = new Player();
    player_1.x = 65;
    player_1.y = 545;
    player_1.tag = 'player_1';
    player_1.img = player_1_img;

    grid = new Grid();
    level = new Level();
    level.init(grid, player_1);
    requestAnimationFrame(drawFrame);
    initControls();
}

function drawFrame(){
    requestAnimationFrame(drawFrame);
    atual = new Date();
    dt = (atual  - anterior) / 1000 ;
    grid.dt_total += dt;
    contexto.clearRect(0,0, tela.width, tela.height);
    grid.andar(player_1);
    grid.colisaoRecarga(player_1);
    level.desenha(contexto, dt);
    anterior = atual;

    contexto.fillStyle = 'yellow';
    contexto.font="20px Georgia";
    contexto.fillText("Vidas : " + grid.vidas,685,25);

    contexto.font="20px Georgia";
    contexto.fillText("Nível : " + grid.nivel,685,50);

    var tempo_restante = (60 - Math.floor(grid.dt_total));
    if(tempo_restante < 0 && grid.vidas > 0){
        grid.dt_total = 0;
        grid.vidas -= 1;
    }
    if(grid.vidas == 0){
        alert("Fim de jogo, seus recursos acabaram !!!");
    }
    contexto.font="20px Georgia";
    contexto.fillText("Tempo Restante : " + tempo_restante,32,25);
}

function initControls() {
    document.addEventListener('keydown', function(e){
        switch(e.keyCode){
            /*** Controle player 1 **/
            case 37 :
                player_1.direcao = 4;
                ultima_direcao_player_1 = 4;
                break;
            case 38 :
                player_1.direcao = 8;
                ultima_direcao_player_1 = 8;
                break;
            case 39 :
                player_1.direcao = 6;
                ultima_direcao_player_1 = 6;
                break;
            case 40 :
                player_1.direcao = 2;
                ultima_direcao_player_1 = 2;
                break;
        }
    });

    document.addEventListener('keyup', function(e){
        switch(e.keyCode){
            /*** Controle player 1 **/
            case 37 :
            case 38 :
            case 39 :
            case 40 :
                player_1.direcao = 0;
                break;

            case 96 :
                //player_1.direcao = 2;
                break;
        }
    });
}
