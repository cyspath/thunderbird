(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }

  var Background = window.Thunderbird.Background = function(args) {
    this.pos = args.pos;
    this.game = args.game;
    this.imgIdx = args.imgIdx; // 0 or 1

    this.bgWidth = args.bgWidth;
    this.bgHeight = args.bgHeight;
    this.vel = [0, 1];

    this.name = "background";
    this.src = ["http://res.cloudinary.com/djdfz4a67/image/upload/bo_2px_solid_rgb:000,c_scale,h_700,o_100,w_700/a_270/v1440811892/stars_bno1hg.jpg", "http://res.cloudinary.com/djdfz4a67/image/upload/bo_2px_solid_rgb:000,c_scale,h_700,o_100,w_700/a_180/v1440811892/stars_bno1hg.jpg"][this.imgIdx];
  };

  Thunderbird.Util.inherits(Background, Thunderbird.MovingObject);

  Background.prototype.move = function() {
    this.pos[1] = this.pos[1] + this.vel[1];

    if (this.pos[1] >= 700) {
      this.pos[1] = -700;
    }

  };

  Background.prototype.collidedWith = function (otherObject) {
    return null;
  };

  Background.prototype.draw = function () {
    var image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.pos[0], this.pos[1]);

  };

})();
