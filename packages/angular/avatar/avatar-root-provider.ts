import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import type * as avatar from '@zag-js/avatar'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_AVATAR_CONTEXT } from './use-avatar-context'
import type { UseAvatarReturn } from './use-avatar'

@Directive({
  selector: '[arkAvatarRootProvider]',
  standalone: true,
  exportAs: 'arkAvatarRootProvider',
  providers: [{ provide: ARK_AVATAR_CONTEXT, useExisting: forwardRef(() => ArkAvatarRootProvider) }],
})
export class ArkAvatarRootProvider implements UseAvatarReturn {
  /** The avatar machine returned by useAvatar(). */
  readonly value: InputSignal<UseAvatarReturn> = input.required<UseAvatarReturn>()
  readonly state: Signal<avatar.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<avatar.Api> = computed(() => this.value().api())
  readonly send: avatar.Service['send'] = (event) => this.value().send(event)

  get service(): avatar.Service {
    return this.value().service
  }

  resolveValue(): UseAvatarReturn {
    return this.value()
  }

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
