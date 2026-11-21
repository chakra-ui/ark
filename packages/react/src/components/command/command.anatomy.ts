'use client'

import { createAnatomy } from '@zag-js/anatomy'

export const commandAnatomy = createAnatomy('command').parts(
  'root',
  'label',
  'control',
  'input',
  'list',
  'empty',
  'itemGroup',
  'itemGroupLabel',
  'item',
  'itemText',
)
export const parts = commandAnatomy.build()
