// Generates the FOREST KIT pixel banner as an SVG path.
// Everything is drawn on a W x H cell grid; runs of lit cells become one path segment.
const W = 160, H = 64, GROUND = 58;
const grid = Array.from({ length: H }, () => new Uint8Array(W));
const set = (x, y) => { x = Math.round(x); y = Math.round(y);
  if (x >= 0 && x < W && y >= 0 && y < H) grid[y][x] = 1; };
const rect = (x, y, w, h) => { for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) set(x + i, y + j); };

// stepped pixel line: one column per x, with the vertical run that connects it
function ridge(pts, thick = 1) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    const dx = x1 - x0;
    for (let x = x0; x <= x1; x++) {
      const y = y0 + ((x - x0) / dx) * (y1 - y0);
      const yn = y0 + ((x + 1 - x0) / dx) * (y1 - y0);
      const a = Math.round(y), b = Math.round(yn);
      const lo = Math.min(a, b), hi = Math.max(a, b);
      for (let yy = lo; yy <= hi; yy++) for (let t = 0; t < thick; t++) set(x, yy + t);
    }
  }
}

// sprite from an ascii map
const sprite = (map, x, y) => map.forEach((row, j) =>
  [...row].forEach((c, i) => { if (c === "#") set(x + i, y + j); }));

// ── ranges ──────────────────────────────────────────────
const FAR = [[52,44],[60,35],[66,30],[72,25],[78,20],[80,18],[86,25],[90,30],[94,27],
             [99,33],[104,29],[109,35],[114,32],[120,27],[126,34],[132,30],[138,36],
             [144,33],[150,39],[156,43],[160,46]];
const LEFT = [[0,50],[6,45],[11,42],[16,38],[21,35],[25,33],[29,37],[33,34],[37,38],
              [41,34],[45,30],[48,27],[51,31],[55,36],[59,40],[64,44],[69,47]];
const RIGHT = [[106,50],[112,46],[118,42],[123,39],[127,36],[131,41],[135,44],[139,41],
               [144,44],[149,47],[154,50],[160,52]];

[FAR, LEFT, RIGHT].forEach((r) => ridge(r, 1));

// snow: short dashes hanging under the main peaks, jagged not solid
const snow = [
  [80,18,[[0,2],[-2,3],[1,4],[-3,5],[2,5],[-1,6],[3,7],[-4,7],[0,8],[-2,9],[2,10]]],
  [48,27,[[0,2],[-2,3],[1,4],[-2,5],[2,6],[-1,7]]],
  [127,36,[[0,2],[-2,3],[1,4],[-2,5]]],
  [25,33,[[0,2],[-1,3],[1,4],[-2,5]]],
  [104,29,[[0,2],[-2,3],[1,4],[-1,5]]],
];
for (const [px, py, marks] of snow)
  for (const [dx, dy] of marks) rect(px + dx, py + dy, 2, 1);

// ── sun ─────────────────────────────────────────────────
sprite([".####.","######","######","######","######",".####."], 112, 20);

// ── clouds ──────────────────────────────────────────────
const cloud = (x, y, runs) => runs.forEach(([dx, w]) => rect(x + dx, y, w, 1));
cloud(6, 30, [[0,4],[5,3],[9,2]]);
cloud(22, 24, [[0,3],[4,5],[10,2]]);
cloud(136, 25, [[0,3],[4,4],[9,3]]);
cloud(148, 33, [[0,2],[3,3]]);

// ── wordmark ────────────────────────────────────────────
const FONT = {
  F: ["#######","#######","##.....","##.....","######.","######.","##.....","##.....","##....."],
  O: [".#####.","#######","##...##","##...##","##...##","##...##","##...##","#######",".#####."],
  R: ["######.","#######","##...##","##...##","#######","######.","##.##..","##..##.","##...##"],
  E: ["#######","#######","##.....","#####..","#####..","##.....","##.....","#######","#######"],
  S: [".######","#######","##.....","##.....",".#####.",".....##",".....##","#######","######."],
  T: ["#######","#######","..###..","..###..","..###..","..###..","..###..","..###..","..###.."],
  K: ["##...##","##..##.","##.##..","####...","###....","####...","##.##..","##..##.","##...##"],
  I: ["###","###","###","###","###","###","###","###","###"],
};
const word = [];
let tx = 34;
for (const ch of "FOREST KIT") {
  if (ch === " ") { tx += 6; continue; }
  const m = FONT[ch];
  m.forEach((row, j) => [...row].forEach((c, i) => { if (c === "#") word.push([tx + i, 38 + j]); }));
  tx += m[0].length + 2;
}
for (const [x, y] of word)
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
    const px = x + dx, py = y + dy;
    if (px >= 0 && px < W && py >= 0 && py < H) grid[py][px] = 0;
  }
for (const [x, y] of word) set(x, y);

// ── ground: dashed line ─────────────────────────────────
for (let x = 2; x < W - 2; x += 3) rect(x, GROUND, 2, 1);

// ── trees, bushes, hiker ────────────────────────────────
const TREE_A = ["...#...","..###..","..###..",".#####.",".#####.","#######",".#####.","#######","...#...","...#..."];
const TREE_B = ["..#..",".###.",".###.","#####",".###.","#####","..#..","..#.."];
const BUSH   = ["..#..",".###.","#####"];
const HIKER  = ["..##...","..##...","..##...","#####..","######.","#####..","#####..",".###...",".#.#...",".#..#..","##...#.","#....##"];

[[8,"A"],[16,"A"],[25,"B"],[38,"BUSH"],[55,"BUSH"],[64,"B"],[99,"B"],[107,"A"],[122,"BUSH"],[137,"A"],[145,"A"],[152,"B"]]
  .forEach(([x, kind]) => {
    const m = kind === "A" ? TREE_A : kind === "B" ? TREE_B : BUSH;
    sprite(m, x, GROUND - m.length);
  });

sprite(HIKER, 76, GROUND - HIKER.length);
rect(84, GROUND - 11, 1, 11); // walking pole

// ── grid → path (merge horizontal runs) ─────────────────
let d = "";
for (let y = 0; y < H; y++) {
  let x = 0;
  while (x < W) {
    if (!grid[y][x]) { x++; continue; }
    let w = 0; while (x + w < W && grid[y][x + w]) w++;
    d += `M${x} ${y}h${w}v1h-${w}z`;
    x += w;
  }
}
// crop the empty sky and the dead rows under the ground line
let minY = H, maxY = 0, minX = W, maxX = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (grid[y][x]) {
  if (y < minY) minY = y; if (y > maxY) maxY = y;
  if (x < minX) minX = x; if (x > maxX) maxX = x;
}
const box = `${minX} ${minY} ${maxX - minX + 1} ${maxY - minY + 1}`;
console.log(JSON.stringify({ W, H, box, d }));
