import Regl from 'regl'
import resl from 'resl'

import urlUnifont from './unifont-12.1.04.bmp'

const regl = Regl()


function getUv(charCode) {
  let ix = charCode % 256
  let iy = Math.floor(charCode / 256)
  let stepX = 16 / 4128
  let stepY = 16 / 4160
  let offsetX = 32 / 4128
  let offsetY = 64 / 4160
  let x = offsetX + (16 * ix) / 4128
  let y = offsetY + (16 * iy) / 4160
  return [
    [x + 0 * stepX, y + 1 * stepY],
    [x + 1 * stepX, y + 1 * stepY],
    [x + 1 * stepX, y + 0 * stepY],
    [x + 0 * stepX, y + 0 * stepY],
  ]
}

function calcData(str=' ') {
  const SPLIT = 9
  let positions = []
  let elements = []
  let uvs = []
  let count = SPLIT * SPLIT * 6
  for (let i = 0; i < SPLIT; i++) {
    for (let j = 0; j < SPLIT; j++) {
      positions = positions.concat([
        [1 / SPLIT * (i + 0), 1 / SPLIT * (j + 0)],
        [1 / SPLIT * (i + 1), 1 / SPLIT * (j + 0)],
        [1 / SPLIT * (i + 1), 1 / SPLIT * (j + 1)],
        [1 / SPLIT * (i + 0), 1 / SPLIT * (j + 1)],
      ])
      let startIndex = i * SPLIT * 4 + j * 4
      elements = elements.concat([
        [startIndex + 0, startIndex + 1, startIndex + 2],
        [startIndex + 0, startIndex + 3, startIndex + 2],
      ])
      let charCode = str.charCodeAt((j * SPLIT + i) % str.length)
      uvs = uvs.concat([
        getUv(charCode),
      ])
    }
  }

  return {
    positions,
    elements,
    count,
    uvs,
  }
}

const data = calcData('我今天学习了如何用WebGL显示文字，好开心啊。')
console.log(data)

const drawText = regl({
  frag: `
  precision mediump float;

  uniform vec4 color;
  uniform sampler2D tex;

  varying vec2 vUv;

  vec4 neg(vec4 c) {
    return vec4(
      1.0 - c.r,
      1.0 - c.g,
      1.0 - c.b,
      1.0
    );
  }

  vec4 black2white(vec4 c) {
    if (c.r < 0.01 && c.g < 0.01 && c.b < 0.01) {
      return vec4(1.0, 1.0, 1.0, 1.0);
    } else {
      return vec4(c);
    }
  }

  void main() {
    gl_FragColor = black2white(color * neg(texture2D(tex, vUv)));
  }`,
  vert: `
  precision mediump float;

  attribute vec2 position;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }`,
  uniforms: {
    tex: regl.prop('textureUnifont'),
    color: [1, 0.5, 0, 1],
  },
  attributes: {
    position: data.positions,
    // uv ({tick}) {
    //   let charCode = Math.round(tick / 10) + 13500
    //   return getUv(charCode)
    // },
    uv: data.uvs,
  },
  elements: data.elements,
  count: data.count,
})

resl({
  manifest: {
    textureUnifont: {
      type: 'image',
      src: urlUnifont,
      parser (data) {
        return regl.texture({
          data: data,
          mag: 'nearest',
          min: 'nearest',
        })
      }
    },
  },
  onDone({ textureUnifont }) {
    regl.frame(() => {
      regl.clear({
        color: [0, 0, 0, 255],
        depth: 1
      })
      drawText({ textureUnifont })
    })
  },
})
