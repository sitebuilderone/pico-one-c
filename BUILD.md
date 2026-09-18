# Building and using Pico One C

## What ships

This is a Picostrap child theme with a selected Canvas 8.0.5 Sass foundation. The compiled stylesheet includes Bootstrap 5.3.8 once, Canvas core layout/typography/utilities/content, page titles, pagination, buttons, promos, feature boxes, headings, dividers, pricing and alerts. The existing WordPress, Picostrap/LiveCanvas, and WooCommerce support styles remain.

Canvas demo HTML, demo photography, galleries, sliders, animation engines, Canvas headers/menus and the general Canvas JavaScript/plugin bundle are not included. Add components with their dependencies when a website actually needs them. Canvas classes require appropriate markup in WordPress templates or LiveCanvas; installing Sass does not convert existing page markup.

The single Bootstrap JavaScript bundle was updated from the Canvas distribution to 5.3.8 to match the Sass. Picostrap's parent Bootstrap script is dequeued by the existing child integration. The selected Canvas components do not require a separate Canvas JavaScript runtime. Use Bootstrap's `data-bs-*` attributes for interactive Bootstrap components, and inline SVGs or your own icons instead of assuming Canvas icon fonts are installed.

Small decorative assets live in `assets/canvas/`. Source asset URLs are relative to the generated `css-output/bundle.css`. No sibling folder is needed to deploy or compile this theme.

## Local builds

Use Node.js >=20.19.0 (a current supported LTS is recommended):

```sh
npm ci
npm run build
# Rebuild on Sass changes:
npm run watch
```

The build compiles `sass/main.scss`, applies Autoprefixer, and writes compressed CSS to `css-output/bundle.css`. It never writes the WordPress theme header in `style.css`. Build failures produce a nonzero exit status. Include the compiled CSS in deployments; websites do not need Node or `node_modules` to serve it.

## WordPress compilation and per-site settings

Picostrap's **Recompile Sass** and Customizer continue to use the same `sass/main.scss`. WordPress supplies saved `SCSSvar_*` settings before importing it, and saves the resulting CSS using the parent's normal mechanism. Primary color and body/heading fonts feed both Bootstrap and Canvas. Other Bootstrap controls affect Bootstrap; they do not imply a mapping to every Canvas-specific variable.

The browser compiler retains the parent's internet dependency for loading Dart Sass. Local compilation uses the locked npm dependencies and additionally runs Autoprefixer; the two outputs need not be byte-identical.

On single-site installs, the last local or WordPress build replaces `bundle.css`. **A local build uses repository defaults, not database Customizer values.** After deploying a default bundle to a customized site, recompile in WordPress to apply that site's settings. Do not run a local watcher while editing Customizer settings. On multisite, Picostrap may write a separate per-blog bundle; compile within each site's WordPress context.

## Where to customize

- `sass/_theme_variables.scss`: Bootstrap overrides, preferably with `!default` so site Customizer values win.
- `sass/_canvas-settings.scss`: shared brand/font defaults and mapped Canvas inputs.
- `sass/_canvas-components.scss`: explicit list of included Canvas components; remove unused imports here.
- `sass/_custom.scss`: project CSS and CSS custom-property overrides loaded last.
- `sass/_canvas-wordpress.scss`: WordPress compatibility, keyboard focus and dark-mode token adjustments.

The active pipeline uses `sass/canvas/bootstrap/`. The starter `sass/bootstrap5/` and `_bootstrap-loader.scss` remain as reference but are not imported by `main.scss`. Canvas has additional hard-coded Sass defaults; overriding one may require a deliberate source change and checking its dependent values. Do not assume every upstream variable uses `!default`.

## Packaging

Run `npm run build` before packaging reusable defaults, then `bash release.sh`. The archive includes Sass for WordPress compilation and the compiled CSS for ordinary visitors, but excludes `node_modules`, Git data, editor metadata and previous zip files. The script packages the current files without committing or deploying them.

Retain upstream notices. Canvas source/assets retain their original license terms; the starter's license does not relicense the bundled Canvas files.

## Verification

After changes, compile locally and check the WordPress frontend and relevant LiveCanvas content. Exercise WordPress Sass compilation after changing imports, then check a primary-color and font override. Check keyboard focus, responsive layouts, Bootstrap interactions and any copied asset URLs. WooCommerce and optional plugin integrations need their own checks when those features are used.

### Initial integration checks

Verified local Gulp compilation; actual Picostrap browser compilation on a temporary page served by local WordPress; primary color and body/heading font overrides through the importer; a Bootstrap collapse interaction; copied CSS asset paths; PHP syntax; WordPress child CSS/JS enqueue behavior; and ZIP exclusions. The existing active theme was not switched. The authenticated Customizer save flow and full LiveCanvas/WooCommerce screens still need site-level checks.
