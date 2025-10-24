import { createAnatomy } from '@zag-js/anatomy'

export const sizerAnatomy = createAnatomy('sizer').parts('root', 'content')

export const parts = sizerAnatomy.build()
