# svg-path-to-css-polygon

An overengineered library built just for Søren Birkemeyer 💌

It's not a PostCSS plugin like I mentioned, just a function. But hopefully it helps. The source is pretty minimal. Should be possible to import into a PostCSS/Sass/something plugin.

## Usage

```bash
yarn add svg-path-to-css-polygon
```

```ts
import svgPathToCssPolygon from 'svg-path-to-css-polygon'

svgPathToCssPolygon(
  // Pass your SVG's viewbox
  { x: 0, y: 0, width: 100, height: 100 },
  // Then pass the path's `d` attribute
  'M 0 0 L 50 50 L 0 50 Z'
)

// => 'polygon(0% 0%, 50% 50%, 0% 50%)'
```

## Features:

- Supports arbitrary SVG viewboxes
- Supports absolute and relative commands

## Non-features:

- Does not support curves

## Notes:

- The "Z" closepath command is ignored, as CSS polygons are always closed.
- Repeated "M" moveto commands are treated identically to "L" lineto commands.
