import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressValueText]',
  standalone: true,
  exportAs: 'arkProgressValueText',
})
export class ArkProgressValueText {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getValueTextProps())
  }
}
