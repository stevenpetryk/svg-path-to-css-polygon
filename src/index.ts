// @ts-ignore
import parseSVG from 'svg-path-parser'
import invariant from 'tiny-invariant'

export interface Viewbox {
  x?: number
  y?: number
  width: number
  height: number
}

export default function svgPathToCssPolygon(viewbox: Viewbox, d: string): string {
  const { x: xMin = 0, y: yMin = 0, width, height } = viewbox

  function mapX(x: number): number {
    return (x - xMin) / width
  }
  function mapY(y: number): number {
    return (y - yMin) / height
  }

  let points: { x: number; y: number }[] = []

  const commands = parseSVG(d)

  commands.forEach(command => {
    invariant(command.command != 'curveto', 'Curved SVG paths cannot be turned into CSS polygons.')

    // CSS polygons close automatically, so we can ignore the closepath command
    if (command.command === 'closepath') {
      return
    }

    const prevX = points[points.length - 1]?.x || 0
    const prevY = points[points.length - 1]?.y || 0

    const nextX = command.x + (command.relative ? prevX : 0)
    const nextY = command.y + (command.relative ? prevY : 0)

    points.push({ x: nextX, y: nextY })
  })

  const polygonPoints = points
    .map(({ x, y }) => `${round(mapX(x) * 100)}% ${round(mapY(y) * 100)}%`)
    .join(', ')

  return `polygon(${polygonPoints})`
}

function round(value: number) {
  return value
    .toFixed(3)
    .replace(/0+$/, '')
    .replace(/\.$/, '')
}
