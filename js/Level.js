/**
 * Created by Marcus on 21/06/2017.
 */
function Level() {
    this.grid = null;
    this.player_1 = null;
}

Level.prototype.init = function (grid, player_1) {
    this.grid = grid;
    this.player_1 = player_1;
}

Level.prototype.desenha = function (contexto, dt) {
    this.grid.desenha(contexto);
    this.player_1.mover(dt);
    this.player_1.desenha(contexto);
}
