# dagre-d3 - A D3-based renderer for dagre

[Dagre](https://github.com/cpettitt/dagre) is a JavaScript library that makes it easy to lay out
directed graphs on
the client-side. The dagre-d3 library acts as a front-end to dagre, providing
actual rendering using [D3](http://d3js.org).

This repository is a work-in-progress effort to update dagre-d3 to support D3
version 4.

Chris Pettitt's original, unmaintained dagre-d3 repository can be found
[here](https://github.com/cpettitt/dagre), as can the original
[wiki](https://github.com/cpettitt/dagre-d3/wiki).

## API Changes from dagre-d3 version 0.4.x to version 0.5.0

1. Edge path line interpolation now reflects the D3v4
   [curve API](https://github.com/d3/d3-shape#curves). Replace:

    ```javascript
    g.setEdge("A", "B", { lineInterpolate: "basis" });
    g.setEdge("A", "C", { lineInterpolate: "basis" });
    ```

    with e.g.:

    ```javascript
    g.setEdge("A", "B", { curve: d3.curveBasis });
    g.setEdge("A", "C", { curve: d3.curveCardinal.tension(0.6) });
    ```

    The default curve is `d3.curveLinear`.

## License

dagre-d3 is licensed under the terms of the MIT License. See the LICENSE file
for details.
