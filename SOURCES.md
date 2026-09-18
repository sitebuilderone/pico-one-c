# Third-party source provenance

- Canvas 8.0.5 by SemiColonWeb: selected Sass from the local `canvas-html/sass` distribution and three decorative images from `canvas-html/images`. Reference: https://canvastemplate.com/ and https://docs.canvastemplate.com/.
- Bootstrap 5.3.8: Sass bundled with Canvas, plus `canvas-html/js/plugins.bootstrap.js` copied to `js/bootstrap.bundle.min.js`. Bootstrap copyright/license notices are retained in the source and compiled output.
- Picostrap child starter: existing WordPress integration and support styles remain from the starter supplied in this repository.

Canvas adaptations: image references use `../assets/canvas/`; explicit underscore imports in the variables file are normalized for Picostrap's URL importer; Canvas's brand and body/heading font inputs use Bootstrap-compatible defaults. The selected component list is maintained in `sass/_canvas-components.scss`.

Canvas files retain their upstream license terms. The starter LICENSE does not replace those terms.
