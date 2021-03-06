/**
 * Created by Frank on 2017/7/19.
 */

function MoveBalls(element, opts) {
  var canvas = document.querySelector(element);
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  var defaultOpts = {
    total: 300,
    color: "#AAAAAA",
    size: 2,
    width: this.canvas.parentNode.clientWidth,
    height: this.canvas.parentNode.clientHeight
  };
  var opts = opts || defaultOpts;
  for (var key in opts) {
      defaultOpts[key] = opts[key];
  };
  for (var key in defaultOpts) {
      this[key] = defaultOpts[key];
  };
  opts = null;
  defaultOpts = null;
  // 鼠标坐标
  this.coordinate = {
    x: null,
    y: null,
    max: 100
  };
  // 粒子
  this.dots = [];
  // 含鼠标坐标的粒子数组
  this.newDots = [];
  // 总数
  this.count = 0;
  // requestAnimationFrame兼容处理
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  this.colorReg = /[rgba()]/g;
  this.init();
};
MoveBalls.prototype = {
  constructor: MoveBalls,
  init: function () {
    var _this = this;
    this.freshResize();
    this.mouseEvent();
    this.getDots();
    var timer = setTimeout(function () {
      clearTimeout(timer);
      _this.draw(_this)
    }, 100);
  },
  colorCheck: function () {
    this.canvas.style.color = this.color;
    var colorData = this.canvas.style.color;
    return colorData = colorData.replace(this.colorReg, "").split(",");
  },
  resize: function (self) {
    var _this = self || this;
    _this.canvas.width = _this.width;
    _this.canvas.height = _this.height;
  },
  freshResize: function () {
    this.resize();
    var _this = this;
    window.addEventListener("resize", function () {
      _this.resize(_this);
    });
  },
  mouseEvent: function () {
    var _this = this;
    _this.canvas.addEventListener("mousemove", function (e) {
      var e = e || winodw.event;
      _this.coordinate.x = e.offsetX ? e.offsetX : e.layerX;
      _this.coordinate.y = e.offsetY ? e.offsetY : e.layerY;
    });
    _this.canvas.addEventListener("mouseout", function () {
      _this.coordinate.x = null;
      _this.coordinate.y = null;
    })
  },
  getDots: function () {
    while(this.count < this.total) {
      var x = Math.random() * this.canvas.width;
      var y = Math.random() * this.canvas.height;
      var xMove = Math.random() * 2 - 1;
      var yMove = Math.random() * 2 - 1;
      this.dots.push({
        x: x,
        y: y,
        xMove: xMove,
        yMove: yMove,
        max: 100
      });
      this.count ++;
    }
  },
  draw: function (self) {
    var _this = self || this;
    var ctx = _this.ctx;
    ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
    _this.newDots = [_this.coordinate].concat(_this.dots);
    _this.dots.forEach(function (dot) {
      dot.xMove *= (dot.x > _this.canvas.width || dot.x < 0) ? -1 : 1;
      dot.yMove *= (dot.y > _this.canvas.height || dot.y < 0) ? -1 : 1;
      dot.x += dot.xMove;
      dot.y += dot.yMove;
      // 绘制点
      ctx.save();
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, _this.size, 0, Math.PI * 2);
      ctx.fillStyle = _this.color;
      ctx.fill();
      ctx.restore();
      // 循环比对粒子间的距离
      for (var i = 0; i < _this.newDots.length; i ++) {
        var newDot = _this.newDots[i];
        // 如果是第一个点，则跳过
        if(newDot === dot || newDot.x === null || newDot.y === null) continue;
        var xDistance = dot.x - newDot.x;
        var yDistance = dot.y - newDot.y;
        var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        // 颜色深度
        var deep = 0;
        // 小于最小距离，则连线
        if (distance <= newDot.max) {
          // 附近的小球向鼠标位置移动
          if(newDot === _this.coordinate && distance > (newDot.max / 2)) {
            dot.x -= xDistance * 0.03;
            dot.y -= yDistance * 0.03;
          }
          // 距离越近---值越大---颜色越深
          deep = (newDot.max - distance) / newDot.max;
          // 画线
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = deep / 2;
          var colorInfo = _this.colorCheck();
          ctx.strokeStyle = "rgba(" + colorInfo[0] + ", " + colorInfo[1] + ", " + colorInfo[2] + "," + (deep + 0.4) + ")";
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(newDot.x, newDot.y);
          ctx.stroke();
          ctx.restore();
        }
      }
      // 将已经计算过的粒子删除，减少遍历的总数量
      _this.newDots.splice(_this.newDots.indexOf(dot), 1);
    });
    window.requestAnimationFrame(function (obj) {
      _this.draw(_this);
    });
  }
}
