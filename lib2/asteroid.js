(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Asteroid = window.Thunderbird.Asteroid = function(args) {
    var newArgs = {
      pos: args.pos,
      radius: [9,10,11][Math.floor(Math.random() * 3)],
      color: ["#EFC997", "#f3d9b6", "#bfa078"][Math.floor(Math.random() * 3)],
      // vel: Thunderbird.Util.randomVec(1),
      vel: [0, 3],
      game: args.game
    };

    Thunderbird.MovingObject.call(this, newArgs);
  };

  Thunderbird.Util.inherits(Asteroid, Thunderbird.MovingObject);

  Asteroid.prototype.move = function() {
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.pos[1] >= 700) {
      this.pos[1] = 0;
    }

    if (this.pos[1] === 0) {
      this.pos[0] = Math.floor(Math.random() * (this.game.DIM_X))
    }
  };


})();
