import React from 'react'

export default function PixelHeart({ full }: { full: boolean }) {
  const R = '#e23b3b', H = '#ff7a7a', D = '#3a0d0d', DK = '#5b6a66', DKL = '#7e8e89', DKD = '#2e3a37'
  const map = [
    '.oo...oo.',
    'ohho.orro',
    'ohrrorrro',
    'orrrrrrro',
    '.orrrrro.',
    '..orrro..',
    '...oro...',
    '....o....',
  ].map(s => s.split(''))
  const px = 10
  const cells: React.ReactElement[] = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < 9; x++) {
      const c = map[y][x]
      if (c === '.') continue
      let col: string
      if (c === 'o') col = full ? D : DKD
      else if (c === 'h') col = full ? H : DKL
      else col = full ? R : DK
      cells.push(<rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={col} />)
    }
  }
  return (
    <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" style={{ width: 26, height: 26 }}>
      {cells}
    </svg>
  )
}
