import { datePickerAnatomy } from '@ark-ui/react/src/date-picker/date-picker.anatomy'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(datePickerAnatomy.build())

export const datePicker = defineRecipe({
  name: 'datePicker',
  description: 'A date picker style',
  base: parts({
    cellTrigger: {
      all: 'unset',
      alignItems: 'center',
      borderRadius: 'full',
      color: 'fg.emphasized',
      display: 'inline-flex',
      height: '10',
      justifyContent: 'center',
      outline: 'none',
      userSelect: 'none',
      textStyle: 'sm',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      width: '10',
    },
    content: {
      width: 'fit-content',
      background: {
        base: 'white',
        _dark: 'brown.600',
      },
      px: '6',
      py: '5',
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    rowGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
    header: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
    columnHeader: {
      alignItems: 'center',
      display: 'inline-flex',
      fontWeight: 'medium',
      height: '10',
      justifyContent: 'center',
      textStyle: 'sm',
      width: '10',
    },
  }),
})
