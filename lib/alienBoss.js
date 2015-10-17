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

    this.leftCannonPos = [this.pos[0] - 121, this.pos[1] + 9]
    this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]

    this.life = 150;

    this.imgSrc1 = "assets/images/bossmidred.png";
    this.imgSrc2 = "assets/images/bosslowred.png";
    this.preload();


    this.vel = [0,2.5];
    this.game = args.game;
    this.name = "enemy";
    this.class = "behemoth";

    this.reloaded = true;


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

  AlienBoss.prototype.preload = function () {
    //ship draw
    this.image = new Image();
    this.image.src = this.imgSrc1;

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
        this.image.src = this.imgSrc2;
        this.redLightDim = true;
      } else if (!this.redLightDim === false) {
        this.image.src = this.imgSrc1;
        this.redLightDim = false;
      }
    }.bind(this), 500)
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

    ctx.drawImage(this.image, this.pos[0] - 154, this.pos[1]-77);

    // //mandible
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0] - 50,
    //   this.pos[1] + 95,
    //   45,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 2;
    // ctx.stroke();
    //
    // //wing
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0] - 116,
    //   this.pos[1] - 17,
    //   35,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 2;
    // ctx.stroke();
    //
    // //body
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   80,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 2;
    // ctx.stroke();
    //
    // //mandible
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0] + 50,
    //   this.pos[1] + 95,
    //   45,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 2;
    // ctx.stroke();
    //
    // //wing
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0] + 116,
    //   this.pos[1] - 17,
    //   35,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="white";
    // ctx.lineWidth = 2;
    // ctx.stroke();


    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1] + 4,
    //   3,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle="red";
    // ctx.lineWidth = 2;
    // ctx.stroke();


    ctx.beginPath();
    ctx.arc(
      this.pos[0] - 10,
      this.pos[1] + 57,
      3,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="red";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      this.pos[0] + 10,
      this.pos[1] + 57,
      3,
      0,
      2 * Math.PI,
      false
    );
    ctx.strokeStyle="red";
    ctx.lineWidth = 1;
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

    if (this.reloaded === true && this.game.array.indexOf(this) != -1) {
      this.shoot();
      this.reloaded = false;
      setTimeout(function () {
        this.reloaded = true;
      }.bind(this), 4000)
    }


  };

  AlienBoss.prototype.shoot = function () {
    this.leftCannonPos = [this.pos[0] - 121, this.pos[1] + 9]
    this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]


    // determine ship location and fire
    this.velLeft = this.generateBulletVelocity(this.leftCannonPos);
    this.velRight = this.generateBulletVelocity(this.rightCannonPos);


    //shoots left tracker cannon
    var pos = this.leftCannonPos
    var bullet = new Thunderbird.AlienBossBullet({
      pos: pos,
      game: this.game,
      vel: this.velLeft
    });

    this.game.array.push(bullet);

    setTimeout(function () {
      this.leftCannonPos = [this.pos[0] - 121, this.pos[1] + 9]
      this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]
      var pos = this.leftCannonPos
      var bullet = new Thunderbird.AlienBossBullet({
        pos: pos,
        game: this.game,
        vel: this.velLeft
      });

      this.game.array.push(bullet);

      setTimeout(function () {
        this.leftCannonPos = [this.pos[0] - 121, this.pos[1] + 9]
        this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]
        var pos = this.leftCannonPos
        var bullet = new Thunderbird.AlienBossBullet({
          pos: pos,
          game: this.game,
          vel: this.velLeft
        });

        this.game.array.push(bullet);
        setTimeout(function () {
          this.leftCannonPos = [this.pos[0] - 121, this.pos[1] + 9]
          this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]
          var pos = this.leftCannonPos
          var bullet = new Thunderbird.AlienBossBullet({
            pos: pos,
            game: this.game,
            vel: this.velLeft
          });

          this.game.array.push(bullet);

        }.bind(this), 400);
      }.bind(this), 400);
    }.bind(this), 400);

    //shoot right tracker cannon
    var pos = this.rightCannonPos
    var bullet = new Thunderbird.AlienBossBullet({
      pos: pos,
      game: this.game,
      vel: this.velRight
    });

    this.game.array.push(bullet);

    setTimeout(function () {
      this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]
      var pos = this.rightCannonPos
      var bullet = new Thunderbird.AlienBossBullet({
        pos: pos,
        game: this.game,
        vel: this.velRight
      });

      this.game.array.push(bullet);

      setTimeout(function () {
        this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]
        var pos = this.rightCannonPos
        var bullet = new Thunderbird.AlienBossBullet({
          pos: pos,
          game: this.game,
          vel: this.velRight
        });
        this.game.array.push(bullet);
        setTimeout(function () {
          this.rightCannonPos = [this.pos[0] + 121, this.pos[1] + 9]
          var pos = this.rightCannonPos
          var bullet = new Thunderbird.AlienBossBullet({
            pos: pos,
            game: this.game,
            vel: this.velRight
          });
          this.game.array.push(bullet);
        }.bind(this), 400);
      }.bind(this), 400);
    }.bind(this), 400);


    // shoots mid right lazers
    var posX = this.pos[0] + 10
    var posY = this.pos[1] + 57
    var bullet = new Thunderbird.AlienBullet({
      pos: [posX, posY],
      game: this.game,
      vel: [0, 7]
    });

    this.game.array.push(bullet);

    setTimeout(function () {
      var posX = this.pos[0] + 10
      var posY = this.pos[1] + 57
      var bullet = new Thunderbird.AlienBullet({
        pos: [posX, posY],
        game: this.game,
        vel: [0, 7]
      });

      this.game.array.push(bullet);

        setTimeout(function () {
          var posX = this.pos[0] + 10
          var posY = this.pos[1] + 57
          var bullet = new Thunderbird.AlienBullet({
            pos: [posX, posY],
            game: this.game,
            vel: [0, 7]
          });

          this.game.array.push(bullet);

          setTimeout(function () {
            var posX = this.pos[0] + 10
            var posY = this.pos[1] + 57
            var bullet = new Thunderbird.AlienBullet({
              pos: [posX, posY],
              game: this.game,
              vel: [0, 7]
            });

            this.game.array.push(bullet);

            setTimeout(function () {
              var posX = this.pos[0] + 10
              var posY = this.pos[1] + 57
              var bullet = new Thunderbird.AlienBullet({
                pos: [posX, posY],
                game: this.game,
                vel: [0, 7]
              });

              this.game.array.push(bullet);

            }.bind(this), 200);

          }.bind(this), 200);

        }.bind(this), 200);

    }.bind(this), 200);


    // shoots mid left lazers
    var posX = this.pos[0] - 10
    var posY = this.pos[1] + 57
    var bullet = new Thunderbird.AlienBullet({
      pos: [posX, posY],
      game: this.game,
      vel: [0, 7]
    });

    this.game.array.push(bullet);

    setTimeout(function () {
      var posX = this.pos[0] - 10
      var posY = this.pos[1] + 57
      var bullet = new Thunderbird.AlienBullet({
        pos: [posX, posY],
        game: this.game,
        vel: [0, 7]
      });

      this.game.array.push(bullet);

        setTimeout(function () {
          var posX = this.pos[0] - 10
          var posY = this.pos[1] + 57
          var bullet = new Thunderbird.AlienBullet({
            pos: [posX, posY],
            game: this.game,
            vel: [0, 7]
          });

          this.game.array.push(bullet);

          setTimeout(function () {
            var posX = this.pos[0] - 10
            var posY = this.pos[1] + 57
            var bullet = new Thunderbird.AlienBullet({
              pos: [posX, posY],
              game: this.game,
              vel: [0, 7]
            });

            this.game.array.push(bullet);

            setTimeout(function () {
              var posX = this.pos[0] - 10
              var posY = this.pos[1] + 57
              var bullet = new Thunderbird.AlienBullet({
                pos: [posX, posY],
                game: this.game,
                vel: [0, 7]
              });

              this.game.array.push(bullet);

            }.bind(this), 200);

          }.bind(this), 200);

        }.bind(this), 200);

    }.bind(this), 200);

  };


  AlienBoss.prototype.generateBulletVelocity = function (cannonPos) {
    //ratio of Y to X
    var ratioXY = (this.game.ship.pos[1] - cannonPos[1])/(this.game.ship.pos[0] - cannonPos[0]);
    var ratioSq = Math.pow(ratioXY, 2);

    var velX = Math.abs(Math.sqrt(25/(ratioSq + 1)))
    var velY = Math.abs(velX * ratioXY);

    if (this.game.ship.pos[0] <= cannonPos[0]) {
      velX = -velX
    }

    if (this.game.ship.pos[1] <= cannonPos[1]) {
      velY = -velY
    }

    return [velX, velY];
  };



})();
