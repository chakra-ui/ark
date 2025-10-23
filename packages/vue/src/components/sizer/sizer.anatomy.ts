import { createAnatomy } from '@zag-js/anatomy'

export const anatomy = createAnatomy('sizer').parts('root', 'content')

export const parts = anatomy.build()

export { anatomy as sizerAnatomy }
