declare module 'svg-path-parser' {
  type XYCommand = {
    code: 'M' | 'm' | 'L' | 'l';
    command: 'moveto' | 'lineto';
    relative: boolean | undefined;
    x: number;
    y: number;
  };

  type CurveCommand = {
    code: 'C' | 'c';
    command: 'curveto';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x: 0;
    y: 0;
  };

  type ClosePathCommand = {
    code: 'Z';
    command: 'closepath';
    relative: boolean | undefined;
  };

  const svgParse: (
    d: string
  ) => (XYCommand | CurveCommand | ClosePathCommand)[];

  export default svgParse;
}
