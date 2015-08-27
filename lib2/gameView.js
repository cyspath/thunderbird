(function () { if (window.Thunderbird === undefined) { window.Thunderbird = {}; }

  var GameView = window.Thunderbird.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function (canvas) {

    // var ctx = canvas.getContext("2d");
    this.bindKeyHandlers();
    window.setInterval((function () {
      this.game.step();
      this.game.draw(ctx);
    }).bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('a', function(){ that.game.ship.power([-5, 0]) });
    key('w', function(){ that.game.ship.power([0, -3.5]) });
    key('d', function(){ that.game.ship.power([5, 0]) });
    key('s', function(){ that.game.ship.power([0, 7]) });
    key('o', function(){ that.game.ship.fireBullet() });
  }



})();
