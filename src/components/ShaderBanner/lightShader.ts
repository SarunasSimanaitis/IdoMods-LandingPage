/**
 * Tiny WebGL renderer for the "shader" banner (Figma comment 06).
 *
 * The animation is computed per pixel in real time from noise, so it never
 * loops or cuts like the GIF reference: it is a continuous, slow, wavy flow
 * of golden light over a near-black background. No libraries are used.
 */

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;

// Value noise + fractal Brownian motion: smooth, organic randomness.
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;          // 0..1, y = 0 at the bottom
  vec2 p = vec2(uv.x * uResolution.x / uResolution.y, uv.y);

  // One full "breath" of the motion takes about 25 s.
  float t = uTime * 6.2831853 / 25.0;

  // Domain warping makes the bands bend and drift like fabric.
  vec2 warp = vec2(
    fbm(p * 0.9 + vec2(t * 0.35, -t * 0.2)),
    fbm(p * 0.9 + vec2(-t * 0.25, t * 0.3) + 7.3)
  );
  vec2 q = p + (warp - 0.5) * 0.55;

  // Broad diagonal light bands (bottom-left to top-right), as in the reference.
  float bands = sin((q.x * 1.0 + q.y * 1.7) * 2.3 - t * 0.6);
  bands = pow(smoothstep(-0.6, 1.0, bands), 1.6);

  // Light lives in the lower part of the banner and fades into black towards
  // the top, with a soft extra glow on the right edge.
  float vertical = smoothstep(0.8, 0.0, uv.y);
  float rightGlow = smoothstep(0.6, 1.0, uv.x) * smoothstep(0.7, 0.3, uv.y) * 0.4;
  float floorLight = pow(1.0 - uv.y, 3.0) * 0.35;
  float light = bands * clamp(vertical + rightGlow, 0.0, 1.0) + floorLight;
  light *= 0.65 + 0.35 * fbm(q * 2.0 + t * 0.15);

  vec3 dark = vec3(0.063, 0.063, 0.067);              // #101011
  vec3 olive = vec3(0.42, 0.34, 0.11);
  vec3 gold = vec3(0.949, 0.749, 0.145);              // #F2BF25

  vec3 color = mix(dark, olive, smoothstep(0.02, 0.55, light));
  color = mix(color, gold, smoothstep(0.5, 1.05, light));

  // A touch of grain hides banding in the dark gradients.
  color += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.02;

  gl_FragColor = vec4(color, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Cannot create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile error')
  }
  return shader
}

export type LightShader = {
  /** Draws one frame for the given time in seconds. */
  render: (timeSeconds: number) => void
  /** Matches the drawing buffer to the canvas' CSS size. */
  resize: () => void
  destroy: () => void
}

/**
 * Sets up the shader on a canvas. Returns null when WebGL is unavailable,
 * in which case the CSS gradient behind the canvas stays visible.
 *
 * @param resolutionScale The picture is very soft, so rendering at half
 *   resolution looks the same and costs a quarter of the GPU time.
 */
export function createLightShader(
  canvas: HTMLCanvasElement,
  resolutionScale = 0.5,
): LightShader | null {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
  if (!gl) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
  gl.linkProgram(program)
  gl.useProgram(program)

  // A single triangle that covers the whole viewport.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uResolution = gl.getUniformLocation(program, 'uResolution')
  const uTime = gl.getUniformLocation(program, 'uTime')

  const resize = () => {
    const width = Math.max(1, Math.round(canvas.clientWidth * resolutionScale))
    const height = Math.max(1, Math.round(canvas.clientHeight * resolutionScale))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, width, height)
    gl.uniform2f(uResolution, width, height)
  }

  const render = (timeSeconds: number) => {
    gl.uniform1f(uTime, timeSeconds)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const destroy = () => {
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
  }

  resize()
  return { render, resize, destroy }
}
