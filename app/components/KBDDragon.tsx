'use client'

import { useEffect, useRef, useState } from 'react'

const SCALE = 4
const CW = 18
const CH = 12

// 0=transparent 1=outline 2=body 3=highlight 4=wing 5=green-eye 6=horn/tooth
const P: (string | null)[] = [
  null,
  '#161625',
  '#252538',
  '#36365a',
  '#1a0d1a',
  '#00c853',
  '#a89060',
]

// 18×12 three-headed dragon
const BASE: number[][] = [
  [0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],  //  0 horn tips
  [1,6,1,0,0,1,6,1,0,0,1,6,1,0,0,0,0,0],  //  1 horns
  [1,5,2,1,0,1,5,2,1,0,1,5,2,1,0,0,0,0],  //  2 eyes
  [1,6,2,1,0,1,6,2,1,0,1,6,2,1,0,0,0,0],  //  3 teeth/jaw
  [0,1,2,1,1,2,2,2,1,1,2,2,2,1,0,0,0,0],  //  4 necks joining
  [0,4,1,2,2,2,2,2,2,2,2,2,2,1,4,0,0,0],  //  5 upper body + wings
  [4,4,1,2,3,2,2,2,2,2,2,3,2,1,4,4,0,0],  //  6 body highlight + wings wide
  [0,4,1,2,2,2,2,2,2,2,2,2,2,1,4,0,0,0],  //  7 lower body + wings
  [0,0,1,2,2,1,2,2,2,1,2,2,2,1,0,0,0,0],  //  8 belly + 3 leg roots
  [0,0,0,1,2,1,0,1,2,1,0,1,2,1,0,0,0,0],  //  9 legs
  [0,0,0,1,1,0,0,1,2,1,0,0,1,1,0,0,0,0],  // 10 feet
  [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],  // 11 tail tip
]

// Blink: close all three eyes
const BLINK: number[][] = BASE.map((row, i) =>
  i === 2 ? [1,2,2,1,0,1,2,2,1,0,1,2,2,1,0,0,0,0] : [...row]
)

// Roar: open mouths wider, teeth showing
const ROAR: number[][] = BASE.map((row, i) =>
  i === 3 ? [1,6,6,1,0,1,6,6,1,0,1,6,6,1,0,0,0,0] : [...row]
)

const QUIPS = [
  '> kbd spotted',
  '> 3 heads > 1',
  '> anti-fire plz',
  '> going kbd lads',
  '> rune drops?',
  '> protect mage!',
  '> 99 firemaking',
  '> zulrah next?',
]

function drawFrame(ctx: CanvasRenderingContext2D, frame: number[][]) {
  ctx.clearRect(0, 0, CW * SCALE, CH * SCALE)
  for (let row = 0; row < CH; row++) {
    for (let col = 0; col < CW; col++) {
      const color = P[frame[row][col]]
      if (!color) continue
      ctx.fillStyle = color
      ctx.fillRect(col * SCALE, row * SCALE, SCALE, SCALE)
    }
  }
}

export function KBDDragon() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [frame, setFrame] = useState<number[][]>(BASE)
  const [quip, setQuip] = useState<string | null>(null)

  // Draw on frame changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.imageSmoothingEnabled = false
    drawFrame(ctx, frame)
  }, [frame])

  // Blink loop
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    function schedule() {
      t = setTimeout(() => {
        setFrame(BLINK)
        setTimeout(() => setFrame(BASE), 150)
        schedule()
      }, 2500 + Math.random() * 4000)
    }
    schedule()
    return () => clearTimeout(t)
  }, [])

  // Roar loop: occasional 3-frame roar animation
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    function schedule() {
      t = setTimeout(() => {
        setFrame(ROAR)
        setTimeout(() => setFrame(BASE), 400)
        schedule()
      }, 8000 + Math.random() * 12000)
    }
    schedule()
    return () => clearTimeout(t)
  }, [])

  // Quip loop
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    function schedule() {
      t = setTimeout(() => {
        setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)])
        setTimeout(() => setQuip(null), 3000)
        schedule()
      }, 20000 + Math.random() * 40000)
    }
    schedule()
    return () => clearTimeout(t)
  }, [])

  const handleClick = () => {
    setFrame(ROAR)
    setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)])
    setTimeout(() => {
      setFrame(BASE)
      setTimeout(() => setQuip(null), 3000)
    }, 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      {quip && (
        <div
          className="bg-gray-800 border border-gray-600 px-2.5 py-1 text-green-400 text-xs font-mono rounded whitespace-nowrap pointer-events-none"
          style={{ animation: 'kbd-pop-in 3s ease forwards' }}
        >
          {quip}
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={CW * SCALE}
        height={CH * SCALE}
        className="pointer-events-auto cursor-pointer hover:brightness-125 transition-[filter] duration-150"
        style={{
          imageRendering: 'pixelated',
          animation: 'kbd-float 3s ease-in-out infinite',
        }}
        onClick={handleClick}
        title="rawr"
        aria-hidden="true"
      />
    </div>
  )
}
