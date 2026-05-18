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
      ids: this.stabilizeIds(this.ids()),
      onStatusChange: (details) => this.statusChange.emit(details),
    }),
  })

  readonly state: Signal<avatar.Service['state']> = this.machine.state
  readonly api: Signal<avatar.Api> = this.machine.api
  readonly service: avatar.Service = this.machine.service
  readonly send: avatar.Service['send'] = this.machine.send

  private prevIds: Partial<AvatarElementIds> | undefined = undefined

  // useMachine diffs context values via Object.is, so a new ids object with equal keys would still patch.
  private stabilizeIds(next: Partial<AvatarElementIds> | undefined): Partial<AvatarElementIds> | undefined {
    if (next === this.prevIds) return this.prevIds
    if (next === undefined || this.prevIds === undefined) {
      this.prevIds = next
      return this.prevIds
    }
    if (
      Object.is(next.root, this.prevIds.root) &&
      Object.is(next.image, this.prevIds.image) &&
      Object.is(next.fallback, this.prevIds.fallback)
    ) {
      return this.prevIds
    }
    this.prevIds = next
    return this.prevIds
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
