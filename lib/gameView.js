(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;

  };

  GameView.prototype.start = function (canvas) {

    // var ctx = canvas.getContext("2d");
    this.bindKeyHandlers();
    window.setInterval((function () {
      this.game.step();
      this.game.draw(ctx);
    }).bind(this), 1000 / 50);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('a', function(){ that.game.ship.power([-2, 0]) });
    key('w', function(){ that.game.ship.power([0, -2]) });
    key('d', function(){ that.game.ship.power([2, 0]) });
    key('s', function(){ that.game.ship.power([0, 2]) });
    key('o', function(){ that.game.ship.fireBullet() });
  }



})();
