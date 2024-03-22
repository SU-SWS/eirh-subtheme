# 3. CSS Approach for eventshub with TW in the subtheme

Date: 2024-03-22

## Status

Open

## Context

The subtheme, and base theme, both can and do add CSS styling to everything rendered on the site. The base theme has it's own CSS reset, default element styles, spacing, colors, and specificity rules. Rendering the React application in a div on a template does not isolate
the markup from the theme but rather lets it inherit the styles from the theme. The React application eventshub is using Decanter 7 and
TailwindCSS utility classes. There are conflicts between the base theme styles and the tailwindcss styles.

## Decision

The decision to go with TailwindCSS to style the application requires some handling to attempt to isolate the tailwindcss styles from
being effected by the theme styles, and from the tailwindcss styles negatively effecting the base theme.

1. Isolate the CSS to just the page the React Application is rendered on by adding the Drupal Library through the template rather than
in the *.libraries.yml file.
2. Don't render the tailwindcss `@base` layer as that contains the CSS reset and there is already one in the sub-theme
3. Add a prefix to the tailwind elements to avoid conflicting class names with the base theme
4. Un-do Drupal theme layer styles in the React Application `index.css` file instead of the sub-theme scss files.
5. Add the React application rendered CSS file to the sub-theme at the `theme` layer so it is low in the CSS cascade.

## Consequences

* This is not a foolproof approach and CSS can leak between the sub-theme and React Application
* Non-standard suffix adds to a poorer DX
* CSS reset differences between the base theme and TailwindCSS could effect how the utility classes work
  * For example, the font scales could be different
* Specificity is still low (At 1) in the TW utility framework so highly specific CSS from the theme layer could 'win'
