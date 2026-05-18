import type * as avatar from '@zag-js/avatar'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  forwardRef,
  inject,
  input,
  output,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag/apply-ark-props'
import type { AvatarElementIds, AvatarStatusChangeDetails } from './avatar.types'
import { ARK_AVATAR_CONTEXT } from './use-avatar-context'
import { useAvatar, type UseAvatarReturn } from './use-avatar'

@Directive({
  selector: '[arkAvatar]',
  standalone: true,
  exportAs: 'arkAvatar',
  providers: [{ provide: ARK_AVATAR_CONTEXT, useExisting: forwardRef(() => ArkAvatarRoot) }],
})
export class ArkAvatarRoot implements UseAvatarReturn {
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  readonly ids: InputSignal<Partial<AvatarElementIds> | undefined> = input<Partial<AvatarElementIds> | undefined>(
    undefined,
  )
  readonly statusChange: OutputEmitterRef<AvatarStatusChangeDetails> = output<AvatarStatusChangeDetails>()

  private readonly machine = useAvatar({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      onStatusChange: (details) => this.statusChange.emit(details),
    }),
  })

  readonly state: Signal<avatar.Service['state']> = this.machine.state
  readonly api: Signal<avatar.Api> = this.machine.api
  readonly service: avatar.Service = this.machine.service
  readonly send: avatar.Service['send'] = this.machine.send

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
