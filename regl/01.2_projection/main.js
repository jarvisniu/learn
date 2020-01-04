import Regl from 'regl'
import mat4 from 'gl-mat4'

const regl = Regl()

const projMat = mat4.create()
const aspect = window.innerWidth / window.innerHeight
mat4.perspective(projMat, 70, aspect, 0.01, 1000)
const viewMat = mat4.create()

const drawTriangle = regl({
  frag: `
  precision mediump float;

  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color;
  }`,
  vert: `
  precision mediump float;

  uniform mat4 projection;
  uniform mat4 view;
  attribute vec2 position;
  attribute vec4 color;

  varying vec4 v_color;

  void main() {
    v_color = color;
    gl_Position = projection * view * vec4(position, 0, 1);
  }`,
  attributes: {
    position: [
      [0, 1],
      [-0.5, 0],
      [0.5, 0],
    ],
    color: [
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
    ],
  },
  uniforms: {
    projection: projMat,
    view ({tick}) {
      mat4.lookAt(viewMat, [0, 0, -3], [0, 0, 0], [0, 1, 0])
      // mat4.rotateY(viewMat, viewMat, tick / 10)
      // mat4.rotateX(viewMat, viewMat, tick / 50)
      // mat4.rotateZ(viewMat, viewMat, tick / 250)
      return viewMat
    },
  },
  count: 3,
})

regl.frame(function ({tick}) {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  })

  drawTriangle()
})
