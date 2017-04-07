/**
 * Created by danielhindi on 4/7/17.
 */
;
(function(main) {
    var args = {};
    main(args);
})(function(args) {
    'use strict';

    var c = document.createElement('canvas');
    c.id="c";
    c.width=window.innerWidth;
    c.height=window.innerHeight;
    document.body.appendChild(c);
    var ctx = c.getContext('2d');

    /**
     * ======================================================
     */
    var Shape = function(x, y, pointCount, r, strokeColor, fillColor) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.rot = 0;
        this.vrot = 0;
        this.s = 1;
        this.sa = 0;
        this.vsa = 0;
        this.pointCount = pointCount;
        this.points = [];
        this.angleSlice = Math.PI * 2 / pointCount;
        this.r = r;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;

        var p = null;
        var _self = this;
        for (var i = 0; i < this.pointCount; i++) {
            p = {
                x: Math.cos(_self.angleSlice * i) * (_self.r * Math.random()),
                y: Math.sin(_self.angleSlice * i) * (_self.r * Math.random())
            };
            _self.points.push(p);
        }
    };

    Shape.prototype = {
        constructor: Shape,
        update: function() {

            this.vx += Math.random() * 0.01;
            this.vy += Math.random() * 0.4 - 0.2;
            this.x += this.vx;
            this.y += this.vy;

            this.vrot += Math.random() * 0.02 - 0.01;
            this.rot += this.vrot;

            this.vsa += Math.random() * 0.02 - 0.01;
            this.vsa = Math.max(this.vsa, -0.1);
            this.vsa = Math.min(this.vsa, 0.1);

            this.sa += this.vsa;
            this.s = 1 + Math.cos(this.sa) * 0.5;

            if (this.x > c.width + 100 || this.y > c.height + 100 || this.y < -100) {
                this.x = 0;
                this.vx = 0;
                this.vy = 0;
                this.vrot = 0;
                this.y = c.height / 2;
            }

        },
        render: function(ctx) {

            var e = null;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.s, this.s);
            ctx.rotate(this.rot);
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.beginPath();

            for (var i = 0; i < this.points.length; i++) {
                e = this.points[i];
                if (i === 0) {
                    ctx.moveTo(e.x, e.y);
                }
                ctx.lineTo(e.x, e.y);
            }

            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();

        }
    };

    var shape = null;
    var shapes = [];
    var shapeCount = 10;

    for (var i = 0; i < shapeCount; i++) {
        shape = new Shape(
            0,
            c.height / 2,
            Math.round(4 + Math.random() * 2),
            Math.round(10 + Math.random() * 10),
            "gray",
            "white"
        );
        shapes.push(shape);
    }

    requestAnimationFrame(function loop() {
        requestAnimationFrame(loop);
        ctx.fillStyle = "rgba(200, 200, 200, 0.004)";
        ctx.fillRect(0, 0, c.width, c.height);
        for (var i = 0; i < shapeCount; i++) {
            shape = shapes[i];
            shape.update();
            shape.render(ctx);
        }
    });

});