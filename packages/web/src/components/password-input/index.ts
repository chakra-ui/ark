import type { Api, Props } from '@zag-js/password-input'

import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type {
  PasswordInputLabel,
  PasswordInputControl,
  PasswordInputInput,
  PasswordInputVisibilityTrigger,
  PasswordInputIndicator,
} from './parts.js'

export type { Api as PasswordInputApi } from '@zag-js/password-input'
export interface PasswordInputElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'>, StateProperties<Props, 'visible'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-password-input': PasswordInputElement
    'ark-password-input-label': InstanceType<typeof PasswordInputLabel>
    'ark-password-input-control': InstanceType<typeof PasswordInputControl>
    'ark-password-input-input': InstanceType<typeof PasswordInputInput>
    'ark-password-input-visibility-trigger': InstanceType<typeof PasswordInputVisibilityTrigger>
    'ark-password-input-indicator': InstanceType<typeof PasswordInputIndicator>
  }
}

export type PasswordInputEventMap = CallbackEvents<Props>
