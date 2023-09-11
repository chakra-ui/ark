import { anatomy } from '@zag-js/select'

export const selectAnatomy = anatomy.extendWith('value')
export const parts = selectAnatomy.build()
