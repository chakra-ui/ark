import { datePickerAnatomy } from '@ark-ui/react/src/date-picker/date-picker.anatomy'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(datePickerAnatomy.build())

export const datePicker = defineRecipe({
  name: 'datePicker',
  description: 'A date picker style',
  base: parts({
    cellTrigger: {
      all: 'unset',
    },
  }),
})
