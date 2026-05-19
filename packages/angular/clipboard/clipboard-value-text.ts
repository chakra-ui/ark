import { Directive, type Signal, computed } from '@angular/core'
import { injectArkClipboardContext } from './use-clipboard-context'

@Directive({
  selector: '[arkClipboardValueText]',
  standalone: true,
  exportAs: 'arkClipboardValueText',
})
export class ArkClipboardValueText {
  private readonly context = injectArkClipboardContext()
  readonly value: Signal<string> = computed(() => this.context.api().value)
}
