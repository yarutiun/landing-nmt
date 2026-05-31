'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useSectionTracking } from '@/lib/useAmplitude'
import { track } from '@/lib/amplitude'

const SVG_WIDTH = 500
const SVG_HEIGHT = 400
const CENTER_X = 250
const CENTER_Y = 200
const SCALE = 30

function computeParabolaPath(a: number, vx: number, vy: number): string {
  // y = a(x - vx)^2 + vy
  const points: string[] = []
  const xMin = -CENTER_X / SCALE
  const xMax = (SVG_WIDTH - CENTER_X) / SCALE
  const steps = 200

  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin)
    const y = a * (x - vx) * (x - vx) + vy
    const svgX = CENTER_X + x * SCALE
    const svgY = CENTER_Y - y * SCALE

    if (i === 0) {
      points.push(`M ${svgX},${svgY}`)
    } else {
      points.push(`L ${svgX},${svgY}`)
    }
  }

  return points.join(' ')
}

function getCoefficients(a: number, vx: number, vy: number) {
  // y = a(x - vx)^2 + vy = ax^2 - 2a*vx*x + a*vx^2 + vy
  const b = -2 * a * vx
  const c = a * vx * vx + vy
  return { a, b, c }
}

function formatCoeff(n: number): string {
  const rounded = Math.round(n * 10) / 10
  if (rounded === 0) return '0'
  return rounded.toString()
}

function buildEquation(a: number, b: number, c: number): string {
  const aStr = formatCoeff(a)
  const bVal = Math.round(b * 10) / 10
  const cVal = Math.round(c * 10) / 10

  let eq = `y = ${aStr}x²`

  if (bVal > 0) eq += ` + ${formatCoeff(bVal)}x`
  else if (bVal < 0) eq += ` − ${formatCoeff(Math.abs(bVal))}x`

  if (cVal > 0) eq += ` + ${formatCoeff(cVal)}`
  else if (cVal < 0) eq += ` − ${formatCoeff(Math.abs(cVal))}`

  return eq
}

export default function ParabolaDemo() {
  const sectionRef = useSectionTracking('demo', 'demo')
  const svgRef = useRef<SVGSVGElement>(null)
  const interactedRef = useRef(false)

  const [a, setA] = useState(1)
  const [vertex, setVertex] = useState({ vx: 0, vy: 0 }) // in math coords
  const [isDragging, setIsDragging] = useState(false)

  const trackInteraction = useCallback(() => {
    if (!interactedRef.current) {
      interactedRef.current = true
      track('demo_interacted')
    }
  }, [])

  const getSVGCoords = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    const scaleX = SVG_WIDTH / rect.width
    const scaleY = SVG_HEIGHT / rect.height
    const svgX = (clientX - rect.left) * scaleX
    const svgY = (clientY - rect.top) * scaleY
    const mathX = (svgX - CENTER_X) / SCALE
    const mathY = -(svgY - CENTER_Y) / SCALE
    return { mathX, mathY }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    trackInteraction()
  }, [trackInteraction])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    trackInteraction()
  }, [trackInteraction])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      const coords = getSVGCoords(e.clientX, e.clientY)
      if (!coords) return
      setVertex({
        vx: Math.max(-5, Math.min(5, coords.mathX)),
        vy: Math.max(-5, Math.min(5, coords.mathY)),
      })
    },
    [isDragging, getSVGCoords]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      const touch = e.touches[0]
      const coords = getSVGCoords(touch.clientX, touch.clientY)
      if (!coords) return
      setVertex({
        vx: Math.max(-5, Math.min(5, coords.mathX)),
        vy: Math.max(-5, Math.min(5, coords.mathY)),
      })
    },
    [isDragging, getSVGCoords]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  const { vx, vy } = vertex
  const path = computeParabolaPath(a, vx, vy)
  const { a: ca, b: cb, c: cc } = getCoefficients(a, vx, vy)
  const equation = buildEquation(ca, cb, cc)

  const vertexSvgX = CENTER_X + vx * SCALE
  const vertexSvgY = CENTER_Y - vy * SCALE

  // Generate grid lines
  const gridLinesX = []
  const gridLinesY = []
  for (let i = -Math.floor(CENTER_X / SCALE); i <= Math.floor((SVG_WIDTH - CENTER_X) / SCALE); i++) {
    const x = CENTER_X + i * SCALE
    gridLinesX.push(x)
  }
  for (let i = -Math.floor(CENTER_Y / SCALE); i <= Math.floor((SVG_HEIGHT - CENTER_Y) / SCALE); i++) {
    const y = CENTER_Y + i * SCALE
    gridLinesY.push(y)
  }

  return (
    <section
      id="demo"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ borderTop: '1px solid #1E1E2E' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded"
            style={{ color: '#00D4AA', backgroundColor: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)' }}
          >
            Інтерактив
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Теорія, яку можна потрогати
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: '#9090AA' }}>
            Перетягни точки — побач, як змінюється рівняння. Так ти запам&apos;ятаєш це назавжди.
          </p>
        </div>

        {/* Demo Container */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #252535', backgroundColor: '#141420' }}
        >
          {/* Equation Card */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid #252535' }}
          >
            <span className="text-sm font-medium" style={{ color: '#5A5A72' }}>
              Рівняння параболи
            </span>
            <span
              className="font-mono text-base sm:text-lg font-bold tabular-nums"
              style={{ color: '#7B61FF', letterSpacing: '-0.01em' }}
            >
              {equation}
            </span>
          </div>

          {/* SVG */}
          <div className="w-full overflow-x-auto">
            <div className="flex justify-center p-4">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                className="max-w-full"
                style={{
                  backgroundColor: '#0C0C10',
                  cursor: isDragging ? 'grabbing' : 'default',
                  borderRadius: '8px',
                  touchAction: 'none',
                  maxWidth: '100%',
                }}
              >
                {/* Grid lines */}
                {gridLinesX.map((x, i) => (
                  <line
                    key={`gx-${i}`}
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={SVG_HEIGHT}
                    stroke={x === CENTER_X ? '#333348' : '#1C1C2A'}
                    strokeWidth={x === CENTER_X ? 1.5 : 1}
                  />
                ))}
                {gridLinesY.map((y, i) => (
                  <line
                    key={`gy-${i}`}
                    x1={0}
                    y1={y}
                    x2={SVG_WIDTH}
                    y2={y}
                    stroke={y === CENTER_Y ? '#333348' : '#1C1C2A'}
                    strokeWidth={y === CENTER_Y ? 1.5 : 1}
                  />
                ))}

                {/* Axis arrows */}
                <defs>
                  <marker id="arrowX" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#333348" />
                  </marker>
                  <marker id="arrowY" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#333348" />
                  </marker>
                </defs>
                <line
                  x1={0}
                  y1={CENTER_Y}
                  x2={SVG_WIDTH - 4}
                  y2={CENTER_Y}
                  stroke="#333348"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowX)"
                />
                <line
                  x1={CENTER_X}
                  y1={SVG_HEIGHT}
                  x2={CENTER_X}
                  y2={4}
                  stroke="#333348"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowY)"
                />

                {/* Axis labels */}
                <text x={SVG_WIDTH - 16} y={CENTER_Y + 16} fill="#444460" fontSize="12" fontFamily="monospace">x</text>
                <text x={CENTER_X + 6} y={14} fill="#444460" fontSize="12" fontFamily="monospace">y</text>

                {/* Parabola */}
                <path
                  d={path}
                  fill="none"
                  stroke="#7B61FF"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Vertex dashed lines */}
                {vx !== 0 && (
                  <line
                    x1={vertexSvgX}
                    y1={CENTER_Y}
                    x2={vertexSvgX}
                    y2={vertexSvgY}
                    stroke="#00D4AA"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    opacity={0.5}
                  />
                )}
                {vy !== 0 && (
                  <line
                    x1={CENTER_X}
                    y1={vertexSvgY}
                    x2={vertexSvgX}
                    y2={vertexSvgY}
                    stroke="#00D4AA"
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    opacity={0.5}
                  />
                )}

                {/* Vertex point */}
                <circle
                  cx={vertexSvgX}
                  cy={vertexSvgY}
                  r={10}
                  fill="transparent"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{ cursor: 'grab' }}
                />
                <circle
                  cx={vertexSvgX}
                  cy={vertexSvgY}
                  r={6}
                  fill="#00D4AA"
                  stroke="#0C0C10"
                  strokeWidth={2}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{ cursor: 'grab', pointerEvents: 'none' }}
                />

                {/* Vertex label */}
                <text
                  x={vertexSvgX + 10}
                  y={vertexSvgY - 10}
                  fill="#00D4AA"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  ({formatCoeff(vx)}; {formatCoeff(vy)})
                </text>
              </svg>
            </div>
          </div>

          {/* Slider */}
          <div
            className="px-6 py-5"
            style={{ borderTop: '1px solid #252535' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono font-semibold w-16 shrink-0" style={{ color: '#9090AA' }}>
                a = <span style={{ color: '#FFFFFF' }}>{formatCoeff(a)}</span>
              </span>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.1}
                value={a}
                onChange={(e) => {
                  setA(parseFloat(e.target.value))
                  trackInteraction()
                }}
                className="flex-1"
              />
              <span className="text-xs w-20 shrink-0 text-right" style={{ color: '#5A5A72' }}>
                Ширина / напрям
              </span>
            </div>
            <p className="text-xs mt-3" style={{ color: '#5A5A72' }}>
              Перетягни помаранчеву точку, щоб змінити вершину. Повзунок змінює коефіцієнт a.
            </p>
          </div>
        </div>

        {/* Note */}
        <p className="text-center mt-6 text-sm" style={{ color: '#5A5A72' }}>
          Більше 200 таких інтерактивних пояснень чекають тебе
        </p>
      </div>
    </section>
  )
}
