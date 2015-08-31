(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var AlienBoss = window.Thunderbird.AlienBoss = function (args) {

    //composed of 5 circles for collision check
    this.pos = [350, -200];
    this.radius = 80;
    this.posLeftWing = [this.pos[0] - 116, this.pos[1] - 17];
    this.posRightWing = [this.pos[0] + 116, this.pos[1] - 17];
    this.wingRadius = 35;
    this.posLeftMandible = [this.pos[0] - 50, this.pos[1] + 95];
    this.posRightMandible = [this.pos[0] + 50, this.pos[1] + 95];
    this.mandibleRadius = 45;

    this.life = 100;


    this.vel = [0,2.5];
    this.game = args.game;
    this.name = "enemy";

    this.reloaded = true;

    this.imgSrc = "http://res.cloudinary.com/djdfz4a67/image/upload/v1440961625/boss1-lowred_zljkq5.png";
    this.setRedLightFlicker();

    this.switchPath = false;
    this.initialize();
  };

  AlienBoss.RADIUS = 32;
  AlienBoss.COLOR = "red";

  Thunderbird.Util.inherits(AlienBoss, Thunderbird.MovingObject);

  AlienBoss.prototype.initialize = function () {
    setTimeout(function() {
      this.switchPath = true;

      this.canBackUp = true;
      this.vel[1] = -1;

      this.switchPathRoutine();

    }.bind(this), 3800)
  };

  AlienBoss.prototype.switchPathRoutine = function () {
    setInterval(function(){

      if (this.switchPath) {
        if (this.game.ship.pos[0] > this.pos[0]) {
          this.vel[0] = (0.8)
        } else {
          this.vel[0] = -0.8
        }
      } else {
        this.vel[0] = 0;
      }
    }.bind(this), 800)
  };


  AlienBoss.prototype.setRedLightFlicker = function () {
    setInterval(function() {
      if (!this.redLightDim) {
        this.imgSrc = "http://res.cloudinary.com/djdfz4a67/image/upload/v1440968800/boss1-midred_dl29fz.png";
        this.redLightDim = true;
      } else if (!this.redLightDim === false) {
        this.imgSrc = "http://res.cloudinary.com/djdfz4a67/image/upload/v1440961625/boss1-lowred_zljkq5.png";
        this.redLightDim = false;
      }
    }.bind(this), 300)
  };

  AlienBoss.prototype.collidedWith = function (otherObject) {

    this.posLeftWing = [this.pos[0] - 116, this.pos[1] - 17];
    this.posRightWing = [this.pos[0] + 116, this.pos[1] - 17];
    this.posLeftMandible = [this.pos[0] - 50, this.pos[1] + 95];
    this.posRightMandible = [this.pos[0] + 50, this.pos[1] + 95];

    if (otherObject.name === "enemy") { return false; }
    if (otherObject.name === "alienBullet") { return false; }
    if (otherObject.name === "explosion") { return false; }

    var rSum = this.radius + otherObject.radius;
    var distance = Math.sqrt( Math.pow(this.pos[0] - otherObject.pos[0], 2) + Math.pow(this.pos[1] - otherObject.pos[1], 2) )
    if (rSum >= distance) { console.log("hit body");}
    if (rSum >= distance) { return true; }

    rSum = this.wingRadius + otherObject.radius;
    distance = Math.sqrt( Math.pow(this.posLeftWing[0] - otherObject.pos[0], 2) + Math.pow(this.posLeftWing[1] - otherObject.pos[1], 2) )
    if (rSum >= distance) { console.log("hit wing");}
    if (rSum >= distance) { return true; }
    distance = Math.sqrt( Math.pow(this.posRightWing[0] - otherObject.pos[0], 2) + Math.pow(this.posRightWing[1] - otherObject.pos[1], 2) )
    if (rSum >= distance) { console.log("hit wing");}
    if (rSum >= distance) { return true; }

    rSum = this.mandibleRadius + otherObject.radius;
    distance = Math.sqrt( Math.pow(this.posLeftMandible[0] - otherObject.pos[0], 2) + Math.pow(this.posLeftMandible[1] - otherObject.pos[1], 2) )
    if (rSum >= distance) { console.log("hit mandible");}
    if (rSum >= distance) { return true; }
    distance = Math.sqrt( Math.pow(this.posRightMandible[0] - otherObject.pos[0], 2) + Math.pow(this.posRightMandible[1] - otherObject.pos[1], 2) )
    if (rSum >= distance) { console.log("hit mandible");}
    return (rSum >= distance) ? true : false;

  };


  AlienBoss.prototype.draw = function (ctx) {


    //ship draw
    var image = new Image();
    image.src = this.imgSrc;
    ctx.drawImage(image, this.pos[0] - 154, this.pos[1]-77);

    //mandible
    ctx.beginPath();
    ctx.arc(
      this.pos[0] - 50,
      this.pos[1] + 95,
      45,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="white";
    ctx.lineWidth = 2;
    ctx.stroke();

    //wing
    ctx.beginPath();
    ctx.arc(
      this.pos[0] - 116,
      this.pos[1] - 17,
      35,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="white";
    ctx.lineWidth = 2;
    ctx.stroke();

    //body
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      80,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="white";
    ctx.lineWidth = 2;
    ctx.stroke();

    //mandible
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + 50,
      this.pos[1] + 95,
      45,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="white";
    ctx.lineWidth = 2;
    ctx.stroke();

    //wing
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + 116,
      this.pos[1] - 17,
      35,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="white";
    ctx.lineWidth = 2;
    ctx.stroke();

  };


  AlienBoss.prototype.move = function() {
    //this keeps vel Y at 0 after its entry
    if (!!this.canBackUp) {
      if (this.pos[1] <= 80) {
        this.vel[1] = 0;
      }
    }

    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.pos[1] >= 900) {
      this.pos[1] = -(Math.floor(Math.random() * 190) + 10);
    }

    if (this.pos[1] === -200) {
      this.pos[0] = Math.floor(Math.random() * (this.game.DIM_X))
    }

    this.fireBullet();
  };

  AlienBoss.prototype.fireBullet = function() {

    if (this.reloaded === true && this.pos[0] > this.game.ship.pos[0] - 40 && this.pos[0] < this.game.ship.pos[0] + 40) {
      this.reloaded = false;
      if (this.game.array.indexOf(this) != -1) { this.shoot(); }
      setTimeout(function () {
        this.reloaded = true;
      }.bind(this), 1600)
    }


  };

  AlienBoss.prototype.shoot = function () {

    //shoots three conseq bullets
    setTimeout(function () {
      var posX = this.pos[0]
      var posY = this.pos[1]
      var bullet = new Thunderbird.AlienBullet({pos: [posX, posY],
                                         game: this.game});
      this.game.array.push(bullet);

        setTimeout(function () {
          var posX = this.pos[0]
          var posY = this.pos[1]
          var bullet = new Thunderbird.AlienBullet({pos: [posX, posY],
                                              game: this.game});
          this.game.array.push(bullet);

          setTimeout(function () {
            var posX = this.pos[0]
            var posY = this.pos[1]
            var bullet = new Thunderbird.AlienBullet({pos: [posX, posY],
                                                game: this.game});
            this.game.array.push(bullet);

          }.bind(this), 280);


        }.bind(this), 280);

    }.bind(this), 280);

  };



})();
