# Placeholdate Development

To get started:

1. Run `npm install`
2. Watch changes in `code.ts` and `./build-ui`: `npm run watch`

## Editing the UI

When editing the UI, only edit changes in the `build-ui` directory. Running `npm run watch` will watch for changes there (as well as `code.ts`) and auto generate the ui.html file. This allows you to use Sass for styles and chunk up the other content as needed.

## Try it in Figma

Open any project file in the desktop version and go to `Figma > Plugins > Development > Import plugin from manifest...`. Select the `manifest.json` from this directory. You then will be able to test out the plugin.

## Publish the Changes

1. Go to Figma's Home page
2. Click the profile picture
3. Plugins
4. Scroll down to "In Development". Add the plugin if it isn't already there.