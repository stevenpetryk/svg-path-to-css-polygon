import svgPathToCssPolygon, { Viewbox } from '../src'

// Essentially a 1:1 mapping between this coordinate space and the CSS polygon
const easyViewbox: Viewbox = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
}

// "Centered" coordinate spaces are pretty common too
const centeredViewbox: Viewbox = {
  x: -50,
  y: -50,
  width: 100,
  height: 100,
}

// // Just random, kind of hard to verify test cases without a visual check
const weirdViewbox: Viewbox = {
  x: -75,
  y: -15,
  width: 12,
  height: 1000,
}

describe('svgPathToCssPolygon', () => {
  it('works with simple absolute commands', () => {
    expect(svgPathToCssPolygon(easyViewbox, 'M 0 0 L 50 50 L 0 50 Z')).toEqual(
      'polygon(0% 0%, 50% 50%, 0% 50%)'
    )
  })

  it('works with simple relative commands', () => {
    expect(svgPathToCssPolygon(easyViewbox, 'M 0 0 l 10 10 l 10 10 L 0 50 Z')).toEqual(
      'polygon(0% 0%, 10% 10%, 20% 20%, 0% 50%)'
    )
  })

  it('works with centered viewboxes', () => {
    expect(svgPathToCssPolygon(centeredViewbox, 'M 0 0 l 10 10 l 10 10 L 0 50 Z')).toEqual(
      'polygon(50% 50%, 60% 60%, 70% 70%, 50% 100%)'
    )
  })

  it('works with unusual viewboxes', () => {
    expect(
      svgPathToCssPolygon(weirdViewbox, 'M 0 0 l 10 10 l 10 10 L 0 50 Z')
    ).toMatchInlineSnapshot(`"polygon(625% 1.5%, 708.333% 2.5%, 791.667% 3.5%, 625% 6.5%)"`)
  })

  it('throws when given a curve command', () => {
    expect(() =>
      svgPathToCssPolygon(easyViewbox, 'M 0 0 C 0 0 0 0 0 0 L 0 50 Z')
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invariant failed: Curved SVG paths cannot be turned into CSS polygons."`
    )
  })
})
