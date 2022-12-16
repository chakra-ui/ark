import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('tabs')
    .parts('root', 'tablist', 'trigger', 'contentGroup', 'content', 'indicator')
    .build(),
)

export const tabs = defineRecipe({
  name: 'tabs',
  description: 'A tabs style',
  base: parts({
    root: {},
    tablist: {
      borderBottomWidth: '1px',
      position: 'relative',
    },
    trigger: {
      background: 'transparent',
      cursor: 'pointer',
      color: 'fg.muted',
      fontWeight: 'semibold',
      mr: '4',
      px: '1',
      pt: '0',
      pb: '3',
      textStyle: 'md',
      _selected: {
        color: 'accent.default',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _last: {
        mr: '0',
      },
    },
    indicator: {
      height: '0.5',
      background: 'accent.default',
      bottom: '-1px',
    },
  }),
})
