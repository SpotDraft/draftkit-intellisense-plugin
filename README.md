# draftkit-intellisense README

This extension provides auto-complete for SpotDraft's internal, non-TS/JS utilities like colors and utility classes.

## Features

#### Provides intellisense for color variables `--sdk-color-*` in CSS/SCSS & HTML Files.

![css-colors](docs/color-css.png)

#### Provides intellisense for zIndex map values in CSS/SCSS & HTML Files.

![css-zIndex](docs/zindex-css.png)

#### Provides intellisense for background utility classes in HTML Files.

![html-bg-utils](docs/bg-util-html.png)

## Installing

Download the VSIX package from [Releases Page](https://github.com/SpotDraft/draftkit-intellisense/releases)
![Installation from VSIX](docs/install.png)

## Building & Contributing

- Requires npm 14+
- Clone the repo.
- `npm ci`
- Follow [instructions here](https://code.visualstudio.com/api/get-started/your-first-extension) to see your extension in action while developing.

### tokens.json

The colors are exported from the [Figma file](https://www.figma.com/file/k9q8R0ZFooNZzn1l83qgkt/Universal-Design-System?node-id=174%3A5578) using the `Figma Tokens` plugins and then cleaned up to remove everything but `System Colors 2.0`

### Packaging

For creating a new release, the VSCE CLI tool is required.
[https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions)
