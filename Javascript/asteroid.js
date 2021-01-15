function Asteroid(pos, r) {
    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(random(width), random(height))
    }

    if (r) {
        this.r = r*0.5;
    } else {
        this.r = random(15, 50);
    }

    


    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 10)); 
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
        this.offset[i] = random(-this.r*0.2, this.r);
    }

    this.update = function() {
        this.pos.add(this.vel);
    }

    this.position = function() {
        push();
        stroke(10);
        strokeWeight(1.5);
        fill(30);   
        translate(this.pos.x, this.pos.y); 
        beginShape();
        for (var i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        
        endShape(CLOSE);
        
        fill(28);
        strokeWeight(0)

        beginShape();
        for (var i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x*0.8, y*0.8);
        }
        
        endShape(CLOSE);



        fill(26);
        strokeWeight(0)

        beginShape();
        for (var i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x*0.15, y*0.25);
        }
        
        endShape(CLOSE);

        pop();
    }

    this.breakup = function() {
        var newA = [];
        newA[0] = new Asteroid(this.pos, this.r);
        newA[1] = new Asteroid(this.pos, this.r);
        return newA;

    }


    this.edges = function () {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

}