import { Directive, type Signal, computed } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressValueText]',
  standalone: true,
  exportAs: 'arkProgressValueText',
})
export class ArkProgressValueText {
  private readonly context = injectArkProgressContext()
  readonly percentAsString: Signal<string> = computed(() => this.context.api().percentAsString)
  readonly valueAsString: Signal<string> = computed(() => this.context.api().valueAsString)

  constructor() {
    applyProgressPartProps(() => this.context.api().getValueTextProps())
  }
}
