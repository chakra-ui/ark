import type * as passwordInput from '@zag-js/password-input'

import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const isIndicatorShown = (api: passwordInput.Api, el: HTMLElement) => {
  const isFallback = el.hasAttribute('fallback')
  return isFallback ? !api.visible : api.visible
}

definePart<passwordInput.Api>({
  tag: 'ark-password-input-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<passwordInput.Api>({
  tag: 'ark-password-input-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<passwordInput.Api>({
  tag: 'ark-password-input-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

definePart<passwordInput.Api>({
  tag: 'ark-password-input-visibility-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getVisibilityTriggerProps(),
})

definePart<passwordInput.Api>({
  tag: 'ark-password-input-indicator',
  root,
  display: 'inline-flex',
  props: (api, el) => ({
    ...api.getIndicatorProps(),
    hidden: !isIndicatorShown(api, el),
  }),
})
