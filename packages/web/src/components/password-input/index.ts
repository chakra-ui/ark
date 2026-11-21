import type { Api, Props } from '@zag-js/password-input'

import type { RootElement } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'

export type { Api as PasswordInputApi } from '@zag-js/password-input'
export type PasswordInputElement = RootElement<Api, Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-password-input': PasswordInputElement
  }
}

export type PasswordInputEventMap = CallbackEvents<Props>
