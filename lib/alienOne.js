(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var AlienOne = window.Thunderbird.AlienOne = function (args) {

    this.pos = args.pos;
    this.radius = AlienOne.RADIUS;
    this.life = 1;

    this.vel = [0,4];
    this.game = args.game;
    this.name = "enemy";
    this.class = "speeder";
    this.preload();

    this.reloaded = true;

    this.switchPath = false;
    this.initialize();
    this.switchPathRoutine();

  };

  AlienOne.RADIUS = 32;
  AlienOne.COLOR = "red";

  Thunderbird.Util.inherits(AlienOne, Thunderbird.MovingObject);

  AlienOne.prototype.initialize = function () {
    setTimeout(function() {
      this.switchPath = true;
    }.bind(this), 400)
  };

  AlienOne.prototype.preload = function () {
    this.image = new Image();
    this.image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/c_scale,w_77/v1440958732/alienOne-noBorder_bcsakk.png"
  };

  AlienOne.prototype.switchPathRoutine = function () {
    setInterval(function(){
      if (this.switchPath) {
        this.vel[0] = (-4) + Math.floor(Math.random() * 8)
      } else {
        this.vel[0] = 0;
      }
    }.bind(this), 800)
  };

  AlienOne.prototype.collidedWith = function (otherObject) {
    if (otherObject.name === "enemy") { return false; }
    if (otherObject.name === "alienBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }


    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    return (rSum >= distance) ? true : false;
  };


  AlienOne.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.pos[0] - 38, this.pos[1] - 37);
  };


  AlienOne.prototype.move = function() {

    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.pos[1] >= 900 || this.pos[0] <= -38 || this.pos[0] >= 738 ) {
      this.switchPath = false;
      this.initialize();

      this.pos[1] = -(Math.floor(Math.random() * 190) + 10);
      this.pos[0] = Math.floor(Math.random() * (this.game.DIM_X))
    }

    this.fireBullet();
  };

  AlienOne.prototype.fireBullet = function() {

    if (this.reloaded === true && this.pos[0] > this.game.ship.pos[0] - 40 && this.pos[0] < this.game.ship.pos[0] + 40) {
      this.reloaded = false;
      if (this.game.array.indexOf(this) != -1) { this.shoot(); }
      setTimeout(function () {
        this.reloaded = true;
      }.bind(this), 1700)
    }


  };

  AlienOne.prototype.shoot = function () {

    //shoots three conseq bullets

    var posX = this.pos[0]
    var posY = this.pos[1]
    var bullet = new Thunderbird.AlienBullet({
      pos: [posX, posY],
      game: this.game,
      vel: [0, 7]
    });

    this.game.array.push(bullet);

    setTimeout(function () {
      var posX = this.pos[0]
      var posY = this.pos[1]
      var bullet = new Thunderbird.AlienBullet({
        pos: [posX, posY],
        game: this.game,
        vel: [0, 7]
      });

      this.game.array.push(bullet);

        setTimeout(function () {
          var posX = this.pos[0]
          var posY = this.pos[1]
          var bullet = new Thunderbird.AlienBullet({
            pos: [posX, posY],
            game: this.game,
            vel: [0, 7]
          });

          this.game.array.push(bullet);

        }.bind(this), 280);

    }.bind(this), 280);

  };



})();
