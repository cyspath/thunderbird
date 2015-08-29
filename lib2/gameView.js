(function () { if (window.Thunderbird === undefined) { window.Thunderbird = {}; }

  var GameView = window.Thunderbird.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function (canvas) {

    // var ctx = canvas.getContext("2d");
    // this.bindKeyHandlers();
    window.addEventListener("keydown", this.detectKeyDown.bind(this))
    window.addEventListener("keyup", this.detectKeyUp.bind(this))

    window.setInterval((function () {
      this.game.step();
      this.game.draw(ctx);
    }).bind(this), 20);
  };

  // GameView.prototype.bindKeyHandlers = function() {
  //   var that = this;
  //   key('a', function(){ that.game.ship.power([-5, 0]) });
  //   key('w', function(){ that.game.ship.power([0, -3.5]) });
  //   key('d', function(){ that.game.ship.power([5, 0]) });
  //   key('s', function(){ that.game.ship.power([0, 7]) });
  //   key('o', function(){ that.game.ship.fireBullet() });
  // };

  GameView.prototype.detectKeyUp = function (e) {

    if(e.keyCode == 87) {
      this.game.ship.decelerateY = true

    } else if(e.keyCode == 68) {
      this.game.ship.decelerateX = true

    } else if(e.keyCode == 83) {
      this.game.ship.decelerateY = true

    } else if(e.keyCode == 65) {
      this.game.ship.decelerateX = true

    } else if(e.keyCode == 74) {
      // this.game.ship.fireBullet();
    }

  };

  GameView.prototype.detectKeyDown = function (e) {

    if(e.keyCode == 87) {
      this.game.ship.power([0, -3.5]);
      this.game.ship.decelerateY = false;

    } else if(e.keyCode == 68) {
      this.game.ship.power([5, 0]);
      this.game.ship.decelerateX = false;

    } else if(e.keyCode == 83) {
      this.game.ship.power([0, 7]);
      this.game.ship.decelerateY = false;

    } else if(e.keyCode == 65) {
      this.game.ship.power([-5, 0]);
      this.game.ship.decelerateX = false;

    } else if(e.keyCode == 74) {
      this.game.ship.fireBullet();
    }

  };
})();
