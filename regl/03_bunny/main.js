import Regl from 'regl'
import mat4 from 'gl-mat4'
import bunny from 'bunny'

const regl = Regl()

const drawBunny = regl({
  frag: `
    precision mediump float;

    void main() {
      gl_FragColor = vec4(1, 1, 1, 1);
    }
  `,
  vert: `
    precision mediump float;

    uniform mat4 model, view, projection;
    uniform vec2 offset;

    attribute vec3 position;

    void main() {
      gl_Position = projection * view * model * vec4(position, 1);
    }
  `,
  attributes: {
    position: bunny.positions,
  },
  elements: bunny.cells,
  uniforms: {
    model: mat4.identity([]),
    view({tick}) {
      const t = 0.01 * tick
      return mat4.lookAt(
        [], // out
        [30 * Math.cos(t), 2.5, 30 * Math.sin(t)], // eye
        [0, 2.5, 0], // center
        [0, 1, 0], // up
      )
    },
    projection({viewportWidth, viewportHeight}) {
      return mat4.perspective(
        [],
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        1000,
      )
    },
  },
})

regl.frame(function() {
  regl.clear({
    color: [0, 0, 0, 1],
  })
  drawBunny()
})
