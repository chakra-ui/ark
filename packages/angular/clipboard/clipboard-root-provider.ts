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
import type * as clipboard from '@zag-js/clipboard'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { ARK_CLIPBOARD_CONTEXT } from './use-clipboard-context'
import type { UseClipboardReturn } from './use-clipboard'

@Directive({
  selector: '[arkClipboardRootProvider]',
  standalone: true,
  exportAs: 'arkClipboardRootProvider',
  providers: [{ provide: ARK_CLIPBOARD_CONTEXT, useExisting: forwardRef(() => ArkClipboardRootProvider) }],
})
export class ArkClipboardRootProvider implements UseClipboardReturn {
  /** The clipboard machine returned by useClipboard(). */
  readonly value: InputSignal<UseClipboardReturn> = input.required<UseClipboardReturn>()
  readonly state: Signal<clipboard.Service['state']> = computed(() => this.value().state())
  readonly api: Signal<clipboard.Api> = computed(() => this.value().api())
  readonly send: clipboard.Service['send'] = (event) => this.value().send(event)

  get service(): clipboard.Service {
    return this.value().service
  }

  resolveValue(): UseClipboardReturn {
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
