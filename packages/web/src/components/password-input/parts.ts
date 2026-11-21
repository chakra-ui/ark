import type * as passwordInput from '@zag-js/password-input'

import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const isIndicatorShown = (api: passwordInput.Api, el: HTMLElement) => {
  const isFallback = el.hasAttribute('fallback')
  return isFallback ? !api.visible : api.visible
}

export const PasswordInputLabel = definePart<passwordInput.Api>({
  tag: 'ark-password-input-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const PasswordInputControl = definePart<passwordInput.Api>({
  tag: 'ark-password-input-control',
  root,
  props: (api) => api.getControlProps(),
})

export const PasswordInputInput = definePart<passwordInput.Api>({
  tag: 'ark-password-input-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

export const PasswordInputVisibilityTrigger = definePart<passwordInput.Api>({
  tag: 'ark-password-input-visibility-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getVisibilityTriggerProps(),
})

export const PasswordInputIndicator = definePart<passwordInput.Api>({
  tag: 'ark-password-input-indicator',
  root,
  attributes: ['fallback'],
  display: 'inline-flex',
  props: (api, el) => ({
    ...api.getIndicatorProps(),
    hidden: !isIndicatorShown(api, el),
  }),
})
