import Regl from 'regl'
import mat4 from 'gl-mat4'
import bunny from 'bunny'
import normals from 'angle-normals'

import makeCamera from './camera'

const regl = Regl()
const camera = makeCamera(regl, {
  center: [0, 2.5, 0],
})

const drawBunny = regl({
  frag: `
    precision mediump float;

    varying vec3 v_normal;

    void main() {
      gl_FragColor = vec4(abs(v_normal), 1);
    }
  `,
  vert: `
    precision mediump float;

    uniform mat4 view, projection;
    uniform vec2 offset;

    attribute vec3 position, normal;

    varying vec3 v_normal;

    void main() {
      v_normal = normal;
      gl_Position = projection * view * vec4(position, 1);
    }
  `,
  attributes: {
    position: bunny.positions,
    normal: normals(bunny.cells, bunny.positions),
  },
  elements: bunny.cells,
})

regl.frame(function() {
  regl.clear({
    color: [0, 0, 0, 1],
  })
  camera(() => {
    drawBunny()
  })
})
