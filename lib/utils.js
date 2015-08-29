(function () {
  if (typeof Thunderbird === "undefined") {
    window.Thunderbird = {};
  }
  if (typeof Thunderbird.Util === "undefined") {
    window.Thunderbird.Util = {};
  }

  Thunderbird.Util.randomVec = function(length) {
    var result = [];
    for (var i = 0; i < 2; i++) {

      if ( Math.floor(Math.random() * 2) === 0 ) {
        var x = 0 - Math.random() * length
      } else {
        var x = Math.random() * length
      }
      result.push(x);
    };
    return result;
  };

  Thunderbird.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

})();
