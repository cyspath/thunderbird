(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function(DIM_X, DIM_Y, NUM_ASTEROIDS) {
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_ASTEROIDS = NUM_ASTEROIDS;
    this.asteroids = this.addAsteroids.bind(this)();
    this.ship = new Asteroids.Ship({game: this});
    this.bullets = [];
  };

  Game.prototype.addAsteroids = function() {
    var asteroids = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition(),
                                             game: this }));
    }
    return asteroids;
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Math.random() * this.DIM_X);
    var y = Math.floor(Math.random() * this.DIM_Y);
    return [x, y];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle ="black";
    ctx.fillRect(0,0,1000,1000);

    this.allObjects().forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    if (pos > 1000) { pos -= 1000; }
    if (pos < 0) { pos += 1000; }
    return pos;
  };

  Game.prototype.checkCollisions = function() {

    var list = this.allObjects();
    for (var i = 0; i < list.length - 1; i++) {
      for (var j = i + 1; j < list.length; j++) {


        if (list[i].isCollidedWith(list[j])) {
          list[i].collideWith(list[j]);

        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (index) {
    this.asteroids.splice(index, 1);
  };

  Game.prototype.allObjects = function () {

    return this.asteroids.concat(this.ship).concat(this.bullets);
  };



})();
