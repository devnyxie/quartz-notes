# Quartz Themes

This directory contains the custom themes for the Quartz project. Themes are responsible for defining the colors, fonts, and other visual aspects of the site. Each theme is defined in a separate file and can be imported and used in the Quartz configuration.

## How to Use a Theme

To use a theme in your Quartz configuration, import the theme file and set it in the `theme` property of the configuration object.

Example:

```typescript
import { QuartzConfig } from "./quartz/cfg"
import { mochaCalmTheme } from "./themes/mocha_calm"

const config: QuartzConfig = {
  configuration: {
    // Other configuration options
    theme: mochaCalmTheme,
  },
}

export default config