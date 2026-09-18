# pico-one-c

## Purpose

Develop a reusable custom WordPress child theme of `picostrap5`, starting from `picostrap5-child-base` and adapting the Canvas HTML template into this repository. Use the sibling `picostrap5-one` theme as a reference for functionality already used on existing websites. Over time, this theme should support a gradual transition from `picostrap5-one`.

Development and testing take place in the local WordPress installation alongside the existing plugins. This repository is independent of the parent theme, other child themes, and plugins. Inspect Git status and preserve user changes before editing.

## Current state versus intended direction

At initial workspace setup, this folder contains the Picostrap child starter, including `Template: picostrap5` in `style.css`, `sass/`, `css-output/`, and LiveCanvas configuration. Starter names and README text may not yet describe the intended custom theme. Canvas Sass integration is now implemented. Read `BUILD.md` for the active shared Gulp/WordPress pipeline; the original starter README is retained as historical reference.

The sibling `../canvas-html/` contains the source template and desired Sass/build workflow. Its current `package.json` specifies Node >=20.19.0, and its Gulp configuration compiles `style.scss` to `style.css`. Its `npm test` script is a failing placeholder, not a test suite. Recheck these files before using or adapting the workflow.

## Implementation guidance

- Keep this a Picostrap child theme and preserve required parent and WordPress integration.
- Adapt Canvas Sass, markup, and necessary assets into this repository for the requested feature. Keep the resulting theme deployable without a runtime dependency on the sibling `canvas-html` folder.
- Use WordPress template APIs and enqueue APIs for dynamic content and assets. Account for parent assets and existing child enqueues to avoid duplicate libraries.
- Preserve the WordPress theme header in `style.css`; Canvas's default output path must not accidentally overwrite it when the build is adapted.
- Preserve both Gulp and WordPress Sass compilation, as requested by the user. Both use `sass/main.scss`; WordPress injects site Customizer values, whereas local builds use repository defaults. Recompile in WordPress after deploying defaults to a customized site. Do not run a local watcher concurrently with Customizer compilation.
- Preserve plugin contracts and assess the relevant `picostrap5-one` behavior before porting it. Keep reusable business functionality in plugins.
- Test affected layouts, responsive behavior, menus, scripts, and plugin output in local WordPress. Check LiveCanvas editing and preview when affected. Report what was actually verified.

## References and open decisions

- Canvas: https://canvastemplate.com/index.html
- Documentation: https://docs.canvastemplate.com
- Parent: https://github.com/livecanvas-team/picostrap5
- Starter: https://github.com/livecanvas-team/picostrap5-child-base

Feature migration order and initial Canvas layouts remain open. The current integration deliberately includes only selected static Canvas components and one Bootstrap JS bundle. Add other Canvas components and their assets/scripts only when needed. Run `npm run build` after Sass changes, verify asset paths, and exercise the browser importer and relevant Customizer overrides after import changes.
