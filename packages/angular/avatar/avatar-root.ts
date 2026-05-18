import type * as avatar from '@zag-js/avatar'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type OutputEmitterRef,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
  output,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
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
  /** The unique identifier of the avatar. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the avatar. Useful for composition. */
  readonly ids: InputSignal<Partial<AvatarElementIds> | undefined> = input<Partial<AvatarElementIds> | undefined>(
    undefined,
  )
  /** Emits when the image loading status changes. */
  readonly statusChange: OutputEmitterRef<AvatarStatusChangeDetails> = output<AvatarStatusChangeDetails>()
  private readonly stableIds = computed(() => this.stabilizeIds(this.ids()))

  private readonly machine = useAvatar({
    context: () => ({
      id: this.id(),
      ids: this.stableIds(),
      onStatusChange: (details) => this.statusChange.emit(details),
    }),
  })

  readonly state: Signal<avatar.Service['state']> = this.machine.state
  readonly api: Signal<avatar.Api> = this.machine.api
  readonly service: avatar.Service = this.machine.service
  readonly send: avatar.Service['send'] = this.machine.send

  private prevIds: Partial<AvatarElementIds> | undefined = undefined

  private stabilizeIds(next: Partial<AvatarElementIds> | undefined): Partial<AvatarElementIds> | undefined {
    if (next === this.prevIds) return this.prevIds
    if (next === undefined || this.prevIds === undefined) {
      this.prevIds = next
      return this.prevIds
    }
    const keys = new Set([...Object.keys(next), ...Object.keys(this.prevIds)])
    const hasEqualEntries = [...keys].every((key) =>
      Object.is(next[key as keyof AvatarElementIds], this.prevIds?.[key as keyof AvatarElementIds]),
    )
    if (hasEqualEntries) {
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
