export function collidesPointBox(
  px: number,
  py: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
): boolean {
  return px >= bx && py >= by && px <= bx + bw && py <= by + bh;
}
