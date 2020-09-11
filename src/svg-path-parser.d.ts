declare module 'svg-path-parser' {
  type XYCommand = {
    code: 'M' | 'm' | 'L' | 'l'
    command: 'moveto' | 'lineto'
    relative: boolean | undefined
    x: number
    y: number
  }

  type ClosePathCommand = {
    code: 'Z'
    command: 'closepath'
    relative: boolean | undefined
  }

  type HorizontalLineCommand = {
    code: 'H' | 'v'
    command: 'horizontal lineto'
    relative: boolean | undefined
    x: number
  }

  type VerticalLineCommand = {
    code: 'H' | 'v'
    command: 'vertical lineto'
    relative: boolean | undefined
    y: number
  }

  const svgParse: (
    d: string
  ) => (XYCommand | ClosePathCommand | HorizontalLineCommand | VerticalLineCommand)[]

  export default svgParse
}
