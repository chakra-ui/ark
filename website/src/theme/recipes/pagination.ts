import { paginationAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(paginationAnatomy.build())

export const pagination = defineRecipe({
  name: 'pagination',
  description: 'A pagination style',
  base: parts({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    list: {
      display: 'flex',
      listStyle: 'none',
      padding: '0',
      gap: '1',
    },
    pageTrigger: {
      fontVariantNumeric: 'tabular-nums',
    },
    ellipsis: {
      alignItems: 'center',
      color: 'fg.emphasized',
      display: 'inline-flex',
      height: '10',
      minW: '10',
      fontSize: 'sm',
      px: '4',
    },
  }),
})
