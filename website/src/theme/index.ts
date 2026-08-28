import { type SemanticTokens, definePreset } from '@pandacss/dev'
import { coral } from '~/coral'
import { breakpoints } from './breakpoints'
import red from './colors/red'
import sand from './colors/sand'
import { conditions } from './conditions'
import { globalCss } from './global-css'
import { keyframes } from './keyframes'
import { recipes, slotRecipes } from './recipes'
import { semanticTokens } from './semantic-tokens'
import { textStyles } from './text-styles'
import { tokens } from './tokens'

const standardizeGrayTokens = (input: SemanticTokens['colors']) =>
  JSON.parse(JSON.stringify(input).replace(new RegExp(sand.name, 'g'), 'gray'))

export const parkPreset = definePreset({
  name: 'park-preset',
  presets: ['@pandacss/preset-base'],
  conditions,
  globalCss,
  theme: {
    extend: {
      breakpoints,
      keyframes,
      recipes,
      slotRecipes,
      textStyles,
      tokens: {
        ...tokens,
        colors: {
          ...tokens.colors,
          red: red.tokens,
          gray: sand.tokens ?? {},
          [coral.name]: coral.tokens,
        },
      },
      semanticTokens: {
        ...semanticTokens,
        colors: {
          ...semanticTokens.colors,
          red: red.semanticTokens,
          gray: standardizeGrayTokens(sand.semanticTokens),
          [coral.name]: coral.semanticTokens,
        },
        radii: {
          l1: { value: '{radii.xs}' },
          l2: { value: '{radii.sm}' },
          l3: { value: '{radii.md}' },
        },
      },
    },
  },
})
