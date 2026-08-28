import { defineSemanticTokens } from '@pandacss/dev'
import { colors } from './colors'
import { shadows } from './shadows'

export const semanticTokens = defineSemanticTokens({
  colors,
  shadows,
})
