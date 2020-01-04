import Regl from 'regl'

const regl = Regl()

regl.clear({
  color: [0, 0, 0, 1],
  depth: 1,
})

regl({
  frag: `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }`,
  vert: `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0, 1);
  }`,
  attributes: {
    position: [[-1, 0], [0, -1], [1, 1]],
  },
  count: 3,
})()
