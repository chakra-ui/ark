import type * as avatar from '@zag-js/avatar'
import type { UseMachineReturn } from '@ark-ui/angular/src/internal/types'

export type UseAvatarReturn = UseMachineReturn<avatar.Service['state'], avatar.Api, avatar.Service>
