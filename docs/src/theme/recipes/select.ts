import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('select')
    .parts(
      'label',
      'positioner',
      'trigger',
      'option',
      'optionGroup',
      'optionGroupLabel',
      'hiddenSelect',
      'content',
    )
    .build(),
)

export const select = defineRecipe({
  name: 'select',
  description: 'A select style',
  base: parts({
    positioner: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      minWidth: 'max-content',
    },
    content: {
      listStyle: 'none',
      minWidth: 'xs',
      p: '1',
    },
    option: {
      borderRadius: 'md',
      cursor: 'pointer',
      mb: '1',
      p: '2',
      textStyle: 'md',
      _hover: {
        background: 'bg.subtle',
      },
      _selected: {
        background: 'bg.subtle',
      },
      _last: {
        mb: '0',
      },
    },
  }),
})
