(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Ship = window.Thunderbird.Ship = function (args) {
    var newArgs = {
      pos: [250,480],
      radius: Ship.RADIUS,
      color: Ship.COLOR,
      vel: [0,0],
      game: args.game
    };
    Thunderbird.MovingObject.call(this, newArgs);
  };

  Ship.RADIUS = 25;
  Ship.COLOR = "blue";
  Thunderbird.Util.inherits(Ship, Thunderbird.MovingObject);

  Ship.prototype.power = function (movement) {
    this.vel[0] = 0;
    this.vel[1] = 0;
    this.vel[0] += movement[0];
    this.vel[1] += movement[1];
  };

  // Ship.prototype.draw = function (ctx) {
  //   ctx.fillStyle = this.color;
  //
  //   ctx.fillStyle="blue";
  //   ctx.beginPath();
  //   // Draw a triangle location for each corner from x:y 100,110 -> 200,10 -> 300,110 (it will return to first point)
  //   ctx.moveTo(this.pos[0],this.pos[1]);
  //   ctx.lineTo(this.pos[0] + 15,this.pos[1] - 30);
  //   ctx.lineTo(this.pos[0] + 30 ,this.pos[1]);
  //   ctx.closePath();
  //
  //   ctx.strokeStyle="white";
  //   ctx.lineWidth = 7;
  //     ctx.stroke();
  //     ctx.fill();
  // };

  Ship.prototype.draw = function (ctx) {
    var image = new Image();
    image.src = "http://res.cloudinary.com/djdfz4a67/image/upload/ar_1,c_scale,e_fill_light,q_100,r_0,w_100/a_270/v1440562111/imageedit_1_3326253473_jmhm0n.gif"
    ctx.drawImage(image, this.pos[0]-30, this.pos[1]-30);
  };

  Ship.prototype.move = function() {

    // this.vel[0] = this.vel[0] * 0.98
    this.vel[1] = this.vel[1] * 0.98

    this.pos[0] = this.game.wrapShip(this.pos[0] + this.vel[0]);
    this.pos[1] = this.game.wrapShip(this.pos[1] + this.vel[1]);



  };


})();
