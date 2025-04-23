import { definePreset } from '@pandacss/dev'
import { avatar } from './recipes/avatar'

const preset = definePreset({
  name: 'Ark UI Preset',
  theme: {
    extend: {
      slotRecipes: {
        avatar,
      },
    },
  },
})

export default preset
