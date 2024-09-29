import { createAnatomy } from '@zag-js/anatomy'

export const toggleAnatomy = createAnatomy('toggle', ['root', 'indicator'])

export const parts = toggleAnatomy.build()
