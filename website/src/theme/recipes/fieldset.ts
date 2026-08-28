import { fieldsetAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const fieldset = defineSlotRecipe({
  className: 'fieldset',
  slots: [...fieldsetAnatomy.keys(), 'control'],
  base: {
    root: {
      display: 'grid',
      borderTopWidth: '1px',
      py: '6',
      columnGap: '8',
      rowGap: '1.5',
      gridTemplateAreas: {
        base: `
        "legend legend" 
        "helperText helperText"
        "control control"
        "errorText errorText"
        `,
        md: `
        "legend control"
        "helperText control"
        "errorText errorText"`,
      },
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '1fr auto',
      width: 'full',
    },
    control: {
      gridArea: 'control',
      display: 'grid',
      gap: '4',
    },
    legend: {
      color: 'fg.default',
      fontWeight: 'medium',
      gridArea: 'legend',
      textStyle: 'sm',
      float: 'left',
      '+ *': {
        clear: 'both',
      },
      _disabled: {
        color: 'fg.disabled',
      },
    },
    helperText: {
      color: 'fg.muted',
      gridArea: 'helperText',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
    errorText: {
      alignItems: 'center',
      color: 'fg.error',
      display: 'inline-flex',
      gap: '2',
      gridArea: 'errorText',
      mt: '4',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
  },
})
