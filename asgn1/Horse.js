function drawHorse() {
  const brown = [0.65, 0.4, 0.2, 1.0];

  function pushTri(p1, p2, p3) {
    const tri = new Triangle();
    tri.position = [...p1, ...p2, ...p3];
    tri.color = brown;
    tri.size = 5;
    tri.outline = 0;
    g_shapesList.push(tri);
  }

  // Helper to convert grid to WebGL coordinates
  function toNDC(x, y) {
    const scale = 0.1; // Each grid square = 0.1
    return [x * scale - 0.8, 0.8 - y * scale]; // Flip y
  }

  // Below are triangle definitions based on your drawing.
  // Coordinates are based on your grid directly.

  // HEAD + NECK (6 triangles)
  pushTri(toNDC(0, 2), toNDC(1, 3), toNDC(0, 4));
  pushTri(toNDC(0, 2), toNDC(1, 2), toNDC(1, 3));
  pushTri(toNDC(1, 2), toNDC(2, 2), toNDC(1, 3));
  pushTri(toNDC(2, 2), toNDC(2, 3), toNDC(1, 3));
  pushTri(toNDC(1, 3), toNDC(2, 3), toNDC(2, 4));
  pushTri(toNDC(1, 3), toNDC(2, 4), toNDC(1, 4));

  // NECK-LINE CONNECTOR (1 triangle)
  pushTri(toNDC(2, 3), toNDC(4, 2), toNDC(2, 2));

  // BODY (8 triangles from 4 rectangles sliced diagonally)
  pushTri(toNDC(2, 2), toNDC(3, 2), toNDC(3, 1));
  pushTri(toNDC(2, 2), toNDC(3, 1), toNDC(2, 1));

  pushTri(toNDC(3, 1), toNDC(4, 2), toNDC(3, 2));
  pushTri(toNDC(3, 1), toNDC(4, 1), toNDC(4, 2));

  pushTri(toNDC(4, 1), toNDC(5, 2), toNDC(4, 2));
  pushTri(toNDC(4, 1), toNDC(5, 1), toNDC(5, 2));

  pushTri(toNDC(5, 1), toNDC(6, 2), toNDC(5, 2));
  pushTri(toNDC(5, 1), toNDC(6, 1), toNDC(6, 2));

  // LEG LEFT (2 triangles from 1 square)
  pushTri(toNDC(2, 1), toNDC(3, 1), toNDC(3, 0));
  pushTri(toNDC(2, 1), toNDC(3, 0), toNDC(2, 0));

  // LEG RIGHT (2 triangles)
  pushTri(toNDC(5, 1), toNDC(6, 1), toNDC(6, 0));
  pushTri(toNDC(5, 1), toNDC(6, 0), toNDC(5, 0));

  // TAIL (3 triangles — triangle cluster)
  pushTri(toNDC(6, 2), toNDC(7, 3), toNDC(7, 2));
  pushTri(toNDC(6, 2), toNDC(6, 3), toNDC(7, 3));
  pushTri(toNDC(6, 3), toNDC(6, 4), toNDC(7, 3));

  renderAllShapes();
}
