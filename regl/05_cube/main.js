import Regl from 'regl'
import resl from 'resl'
import mat4 from 'gl-mat4'

import urlPeppers from './peppers.png'

const regl = Regl()

var cubePositions = [
  [-0.5, +0.5, +0.5], [+0.5, +0.5, +0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5], // positive z face.
  [+0.5, +0.5, +0.5], [+0.5, +0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5], // positive x face
  [+0.5, +0.5, -0.5], [-0.5, +0.5, -0.5], [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5], // negative z face
  [-0.5, +0.5, -0.5], [-0.5, +0.5, +0.5], [-0.5, -0.5, +0.5], [-0.5, -0.5, -0.5], // negative x face.
  [-0.5, +0.5, -0.5], [+0.5, +0.5, -0.5], [+0.5, +0.5, +0.5], [-0.5, +0.5, +0.5], // top face
  [-0.5, -0.5, -0.5], [+0.5, -0.5, -0.5], [+0.5, -0.5, +0.5], [-0.5, -0.5, +0.5]  // bottom face
]
var cubeUv = [
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // positive z face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // positive x face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // negative z face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // negative x face.
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0], // top face
  [0.0, 0.0], [1.0, 0.0], [1.0, 1.0], [0.0, 1.0]  // bottom face
]
const cubeElements = [
  [2, 1, 0], [2, 0, 3],       // positive z face.
  [6, 5, 4], [6, 4, 7],       // positive x face.
  [10, 9, 8], [10, 8, 11],    // negative z face.
  [14, 13, 12], [14, 12, 15], // negative x face.
  [18, 17, 16], [18, 16, 19], // top face.
  [20, 21, 22], [23, 20, 22]  // bottom face
]

const drawCube = regl({
  frag: `
    precision mediump float;

    uniform sampler2D tex;

    varying vec2 vUv;

    void main() {
      gl_FragColor = texture2D(tex, vUv);
    }
  `,
  vert: `
    precision mediump float;

    uniform mat4 view, projection;

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projection * view * vec4(position, 1);
    }
  `,
  attributes: {
    position: cubePositions,
    uv: cubeUv,
  },
  elements: cubeElements,
  uniforms: {
    view({tick}) {
      const t = 0.01 * tick
      return mat4.lookAt(
        [], // out
        [2 * Math.cos(t), 2.5, 2 * Math.sin(t)], // eye
        [0, 0, 0], // center
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
    tex: regl.prop('texturePeppers')
  },
})

resl({
  manifest: {
    texturePeppers: {
      type: 'image',
      src: urlPeppers,
      parser (data) {
        return regl.texture({
          data: data,
          mag: 'linear',
          min: 'linear',
        })
      }
    },
  },
  onDone({ texturePeppers }) {
    regl.frame(() => {
      regl.clear({
        color: [0, 0, 0, 255],
        depth: 1
      })
      drawCube({ texturePeppers })
    })
  },
})
