'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated hero background: flowing red "silk / aurora" ribbons on black,
 * rendered with a small vanilla WebGL fragment shader (no libraries).
 *
 * It overlays the hero's static background image. If WebGL is unavailable,
 * the viewer prefers reduced motion, or the screen is small (battery), the
 * canvas simply doesn't render and the static image shows through.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.,0.)), c = hash(i + vec2(0.,1.)), d = hash(i + vec2(1.,1.));
  vec2 u = f*f*(3.0 - 2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;
  float t = uTime * 0.08;

  // flowing domain warp -> silky motion
  vec2 w = vec2(fbm(p * 1.5 + vec2(0.0, t)), fbm(p * 1.5 + vec2(t, 0.0) + 5.2));
  float f = fbm(p * 2.0 + 2.5 * w + t * 0.5);

  // ribbons + sheen
  float bands = 0.5 + 0.5 * sin(6.2831 * (f * 2.5) + uTime * 0.4);
  float silk  = pow(bands, 2.0) * smoothstep(0.15, 0.85, f);
  float sheen = pow(0.5 + 0.5 * sin(6.2831 * f * 1.3 - uTime * 0.6), 8.0);

  // keep the left dark for the headline; concentrate on the right
  float mask = smoothstep(0.28, 0.85, uv.x);
  float I = (silk * 0.9 + sheen * 0.6) * mask;

  vec3 red = vec3(0.85, 0.03, 0.02);
  vec3 col = red * I * 1.7 + vec3(0.12, 0.0, 0.0) * mask * 0.25;
  col *= 1.0 - 0.30 * length(uv - vec2(0.5));

  gl_FragColor = vec4(col, 1.0);
}
`

export default function HeroSilk() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return // battery-friendly on phones -> static bg

    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(canvas.clientWidth * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    let t = 0
    let last = 0
    const frame = (now: number) => {
      if (last === 0) last = now
      t += (now - last) / 1000
      last = now
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (raf) return
      last = 0
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    // pause when the hero scrolls off-screen
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(canvas)
    start()

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="hero-silk" aria-hidden="true" />
}
