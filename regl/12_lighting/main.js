import Regl from 'regl'
import normals from 'angle-normals'
import mat4 from 'gl-mat4'
import bunny from 'bunny'

const regl = Regl()

const drawBunny = regl({
  vert: `
  precision mediump float;

  attribute vec3 position, normal;
  uniform mat4 view, projection;
  varying vec3 fragNormal, fragPosition;

  void main() {
    fragNormal = normal;
    fragPosition = position;
    gl_Position = projection * view * vec4(position, 1);
  }`,

  frag: `
  precision mediump float;

  struct Light {
    vec3 color;
    vec3 position;
  };

  uniform Light lights[2];
  varying vec3 fragPosition, fragNormal;
  void main() {
    vec3 color = vec3(0, 0, 0);
    for (int i = 0; i < 2; i++) {
      vec3 lightDir = normalize(lights[i].position - fragPosition);
      float diffuse = max(0.0, dot(lightDir, fragNormal));
      color += diffuse * lights[i].color;
    }
    gl_FragColor = vec4(color, 1);
  }
  `,

  attributes: {
    position: bunny.positions,
    normal: normals(bunny.cells, bunny.positions)
  },

  elements: bunny.cells,

  uniforms: {
    view: ({tick}) => {
      const t = 0.01 * tick
      return mat4.lookAt([],
        [0, 2.5, 30],
        [0, 2.5, 0],
        [0, 1, 0])
    },
    projection: ({viewportWidth, viewportHeight}) =>
      mat4.perspective([],
        Math.PI / 4,
        viewportWidth / viewportHeight,
        0.01,
        1000),
    'lights[0].color': [1, 1, 1],
    'lights[1].color': [0, 1, 0],
    'lights[0].position': ({tick}) => {
      const t = 0.1 * tick
      return [
        10 * Math.sin(0.5 * t),
        2.5,
        10 * Math.cos(0.5 * t)
      ]
    },
    'lights[1].position': ({tick}) => {
      const t = 0.1 * tick
      return [10, 2.5, 0]
    },
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  drawBunny()
})
