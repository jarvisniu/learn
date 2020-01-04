import Regl from 'regl'

const regl = Regl()

const drawTriangle = regl({
  frag: `
  precision mediump float;

  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }`,
  vert: `
  precision mediump float;

  uniform float angle;

  attribute vec2 position;

  void main() {
    gl_Position = vec4(
      cos(angle) * position.x - sin(angle) * position.y,
      sin(angle) * position.x + cos(angle) * position.y,
      0, 1);
  }`,
  uniforms: {
    color: regl.prop('color'),
    angle: ({tick}) => 0.01 * tick,
  },
  attributes: {
    position: [
      [-1, 0],
      [0, -1],
      [1, 1],
    ],
  },
  count: 3,
})

regl.frame(({tick}) => {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  })
  drawTriangle({
    color: [
      Math.sin(0.04 * tick),
      Math.cos(0.02 * tick),
      Math.sin(0.01 * tick),
      1,
    ],
  })
})
