import { createAnatomy } from '@zag-js/anatomy'

export const swapAnatomy = createAnatomy('swap', ['root', 'indicator'])

export const parts = swapAnatomy.build()
