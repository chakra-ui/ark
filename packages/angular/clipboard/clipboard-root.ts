import type * as clipboard from '@zag-js/clipboard'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type { ClipboardCopyStatusDetails, ClipboardElementIds, ClipboardIntlTranslations } from './clipboard.types'
import { ARK_CLIPBOARD_CONTEXT } from './use-clipboard-context'
import { useClipboard, type UseClipboardReturn } from './use-clipboard'

@Directive({
  selector: '[arkClipboard]',
  standalone: true,
  exportAs: 'arkClipboard',
  providers: [{ provide: ARK_CLIPBOARD_CONTEXT, useExisting: forwardRef(() => ArkClipboardRoot) }],
})
export class ArkClipboardRoot implements UseClipboardReturn {
  /** The unique identifier of the clipboard. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the clipboard. Useful for composition. */
  readonly ids: InputSignal<Partial<ClipboardElementIds> | undefined> = input<Partial<ClipboardElementIds> | undefined>(
    undefined,
  )
  /** The localized strings for the clipboard. */
  readonly translations: InputSignal<ClipboardIntlTranslations | undefined> = input<
    ClipboardIntlTranslations | undefined
  >(undefined)
  /** The controlled value to copy to the clipboard. */
  readonly value: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial value to copy when uncontrolled. */
  readonly defaultValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The timeout for the copied state, in milliseconds. */
  readonly timeout: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Emits when the copy status changes. */
  readonly statusChange: OutputEmitterRef<ClipboardCopyStatusDetails> = output<ClipboardCopyStatusDetails>()
  private readonly stableIds = computed(() => this.stabilizeIds(this.ids()))
  private prevIds: Partial<ClipboardElementIds> | undefined = undefined

  private readonly machine = useClipboard({
    context: () => ({
      id: this.id(),
      ids: this.stableIds(),
      translations: this.translations(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      timeout: this.timeout(),
      onValueChange: (details) => this.value.set(details.value),
      onStatusChange: (details) => this.statusChange.emit(details),
    }),
  })

  readonly state: Signal<clipboard.Service['state']> = this.machine.state
  readonly api: Signal<clipboard.Api> = this.machine.api
  readonly service: clipboard.Service = this.machine.service
  readonly send: clipboard.Service['send'] = this.machine.send

  private stabilizeIds(next: Partial<ClipboardElementIds> | undefined): Partial<ClipboardElementIds> | undefined {
    if (next === this.prevIds) return this.prevIds
    if (next === undefined || this.prevIds === undefined) {
      this.prevIds = next
      return this.prevIds
    }
    const keys = new Set([...Object.keys(next), ...Object.keys(this.prevIds)])
    const hasEqualEntries = [...keys].every((key) =>
      Object.is(next[key as keyof ClipboardElementIds], this.prevIds?.[key as keyof ClipboardElementIds]),
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
