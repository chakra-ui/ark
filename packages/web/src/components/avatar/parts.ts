import type * as avatar from '@zag-js/avatar'

import { definePart, wrapped } from '../../utils/define.js'
import { root } from './shared.js'

export const AvatarImage = definePart<avatar.Api>({
  tag: 'ark-avatar-image',
  root,
  target: wrapped('img'),
  props: (api) => api.getImageProps(),
})

export const AvatarFallback = definePart<avatar.Api>({
  tag: 'ark-avatar-fallback',
  root,
  props: (api) => api.getFallbackProps(),
})
