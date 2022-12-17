import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('pagination')
    .parts('root', 'list', 'pageTrigger', 'ellipsis', 'prevPageTrigger', 'nextPageTrigger')
    .build(),
)

export const pagination = defineRecipe({
  name: 'pagination',
  description: 'A pagination style',
  base: parts({
    root: {
      display: 'inline-flex',
      borderRadius: 'lg',
      boxShadow: 'xs',
    },
    list: {
      display: 'flex',
      listStyle: 'none',
      padding: '0',
    },
    prevPageTrigger: {
      borderRightRadius: '0',
      marginInlineEnd: '-1px',
      boxShadow: 'none',
    },
    pageTrigger: {
      borderRadius: '0',
      marginInlineEnd: '-1px',
      boxShadow: 'none',
    },
    nextPageTrigger: {
      borderLeftRadius: '0',
      marginInlineEnd: '-1px',
      boxShadow: 'none',
    },
    ellipsis: {
      alignItems: 'center',
      background: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.emphasized',
      color: 'fg.emphasized',
      display: 'inline-flex',
      height: '10',
      marginInlineEnd: '-1px',
      minW: '10',
      fontSize: 'sm',
      px: '4',
    },
  }),
})
