import { createAnatomy } from '@zag-js/anatomy'

export const swapAnatomy = createAnatomy('swap').parts('root', 'indicator')

export const swapParts = swapAnatomy.build()
