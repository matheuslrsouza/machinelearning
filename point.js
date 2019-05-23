
class Point {

    constructor(x, y, label, minValueMap, maxValueMap) {
        if (minValueMap == undefined) minValueMap = -1
        if (maxValueMap == undefined) maxValueMap = 1
        this.x = map(x, minValueMap, maxValueMap, 0, width);
        this.y = map(y, minValueMap, maxValueMap, height, 0);
        this.label = label;

        this.xRange = x;
        this.yRange = y;

        this.radius = 10
    }

    draw() {
        fill((1 - this.label) * 255, this.label * 255, 0)
        circle(this.x, this.y, this.radius);
    }

    drawError(dist) {
        push()
        strokeWeight(3)
        stroke(0, 0, 0)
        fill((1 - this.label) * 255, this.label * 255, 0)
        circle(this.x, this.y, 10 + 20 * abs(dist));
        pop()
    }



}