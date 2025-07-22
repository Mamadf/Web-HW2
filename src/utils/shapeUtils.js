export function drawShape(ctx, shape) {
    ctx.fillStyle = '#007bff';
  
    if (shape.type === 'rectangle') {
      ctx.fillRect(shape.x - 50, shape.y - 25, 100, 50);
    } else if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, 40, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y - 40);
      ctx.lineTo(shape.x - 50, shape.y + 50);
      ctx.lineTo(shape.x + 50, shape.y + 50);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  export function isPointInTriangle(px, py, shape) {
    const [x1, y1] = [shape.x, shape.y - 40];
    const [x2, y2] = [shape.x - 50, shape.y + 50];
    const [x3, y3] = [shape.x + 50, shape.y + 50];
  
    const area = 0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
    const s = 1 / (2 * area) * (y1 * x3 - x1 * y3 + (y3 - y1) * px + (x1 - x3) * py);
    const t = 1 / (2 * area) * (x1 * y2 - y1 * x2 + (y1 - y2) * px + (x2 - x1) * py);
    const u = 1 - s - t;
  
    return s >= 0 && t >= 0 && u >= 0;
  }
  