class TriangleDrawer {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  /**
   * @param {number} s1
   * @param {number} s2
   * @param {number} s3
   */
  _getPoints(s1, s2, s3) {
    const Ax = 0;
    const Ay = 0;

    const Bx = s3;
    const By = 0;

    const Cx = (s2 * s1 + s3 * s3 - s1 * s1) / (2 * s3);
    const Cy = Math.sqrt(s2 * s2 - Cx * Cx);

    const Ox = this.canvas.width / 2 - Bx / 2;
    const Oy = this.canvas.height / 2 + Cy / 2;

    const a = [Ox + Ax, Oy - Ay];
    const b = [Ox + Bx, Oy - By];
    const c = [Ox + Cx, Oy - Cy];
    return [a, b, c];
  }

  /**
   * If sides are larger than canvas, then normalize them
   * @param {number[]} sides
   */
  _getFitSids(sides) {
    const padding = 50;

    const maxCanvasLength = Math.max(this.canvas.width, this.canvas.height);
    const maxSideLength = Math.max(...sides);
    if (maxSideLength + padding < maxCanvasLength) {
      return sides;
    }

    return sides.map(s => Math.round(s * (maxCanvasLength / maxSideLength) - padding));
  }

  /**
   * Clear to avoid drawing many triangles
   */
  _clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  /**
   * @param {number} side1
   * @param {number} side2
   * @param {number} side3
   */
  draw(side1, side2, side3) {
    this._clearCanvas();

    const sides = this._getFitSids([side1, side2, side3]);
    const [a, b, c] = this._getPoints(sides[0], sides[1], sides[2]);

    this.context.beginPath();

    this.context.moveTo(a[0], a[1]);
    this.context.lineTo(b[0], b[1]);
    this.context.lineTo(c[0], c[1]);

    this.context.closePath();
    this.context.fillStyle = 'white';
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.fill();
  }
}

const canvas = document.querySelector('#myCanvas');
const triangleDrawer = new TriangleDrawer(canvas);

document.querySelector('form').addEventListener('submit', evt => {
  evt.preventDefault();

  const sides = Array.from(document.querySelectorAll('input[type=number]')).map(x => parseInt(x.value));

  triangleDrawer.draw(...sides);
});
