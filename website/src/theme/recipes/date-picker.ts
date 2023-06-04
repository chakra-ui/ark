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
      borderRadius: 'lg',
      color: 'fg.emphasized',
      cursor: 'pointer',
      display: 'inline-flex',
      minH: '10',
      justifyContent: 'center',
      outline: 'none',
      userSelect: 'none',
      textStyle: 'sm',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      minW: '10',
      width: '10',
      _hover: {
        background: 'bg.subtle',
      },
      _focus: {
        background: 'bg.subtle',
        color: 'accent.default',
        fontWeight: 'medium',
        _hover: {
          color: 'accent.default',
        },
      },
      _selected: {
        // TODO issue in panda css
        background: 'accent.default !important',
        color: 'white !important',
        _before: {
          color: 'white !important',
        },
      },
      '&[data-outside-range]': {
        color: 'fg.subtle',
      },
      '&[data-today]': {
        _before: {
          content: "'•'",
          color: 'accent.default',
          position: 'absolute',
          marginTop: '6',
        },
      },
    },
    content: {
      background: {
        _dark: 'brown.600',
        base: 'white',
      },
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      px: '6',
      py: '5',
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      '&[data-type="day"] [data-part="row"]': {
        gridTemplateColumns: 'repeat(7, 1fr)',
      },
      '&[data-type="month"] [data-part="row"]': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      '&[data-type="year"] [data-part="row"]': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
    rowGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    control: {},
    row: {
      display: 'grid',
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
