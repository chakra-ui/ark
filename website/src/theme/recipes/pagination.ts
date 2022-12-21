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
      display: 'flex',
      justifyContent: 'space-between',
    },
    list: {
      display: 'flex',
      listStyle: 'none',
      padding: '0',
      gap: '1',
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
