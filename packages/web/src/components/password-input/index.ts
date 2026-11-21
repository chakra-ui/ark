import type { Api, Props } from '@zag-js/password-input'

import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'

export type { Api as PasswordInputApi } from '@zag-js/password-input'
export interface PasswordInputElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'>, StateProperties<Props, 'visible'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-password-input': PasswordInputElement
  }
}

export type PasswordInputEventMap = CallbackEvents<Props>
