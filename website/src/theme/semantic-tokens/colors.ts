import { defineSemanticTokens } from '@pandacss/dev'

export const colors = defineSemanticTokens.colors({
  bg: {
    canvas: { value: { base: '{colors.gray.1}', _dark: '{colors.gray.1}' } },
    default: { value: { base: 'white', _dark: '{colors.gray.2}' } },
    subtle: { value: { base: '{colors.gray.2}', _dark: '{colors.gray.3}' } },
    muted: { value: { base: '{colors.gray.3}', _dark: '{colors.gray.4}' } },
    emphasized: { value: { base: '{colors.gray.4}', _dark: '{colors.gray.5}' } },
    disabled: { value: { base: '{colors.gray.5}', _dark: '{colors.gray.6}' } },
  },
  fg: {
    default: { value: { base: '{colors.gray.12}', _dark: '{colors.gray.12}' } },
    muted: { value: { base: '{colors.gray.11}', _dark: '{colors.gray.11}' } },
    subtle: { value: { base: '{colors.gray.10}', _dark: '{colors.gray.10}' } },
    disabled: { value: { base: '{colors.gray.9}', _dark: '{colors.gray.9}' } },
    error: { value: { base: '{colors.red.9}', _dark: '{colors.red.9}' } },
  },
  border: {
    default: { value: { base: '{colors.gray.7}', _dark: '{colors.gray.7}' } },
    muted: { value: { base: '{colors.gray.6}', _dark: '{colors.gray.6}' } },
    subtle: { value: { base: '{colors.gray.4}', _dark: '{colors.gray.4}' } },
    disabled: { value: { base: '{colors.gray.5}', _dark: '{colors.gray.5}' } },
    outline: { value: { base: '{colors.gray.a9}', _dark: '{colors.gray.a9}' } },
    error: { value: { base: '{colors.red.9}', _dark: '{colors.red.9}' } },
  },
})
