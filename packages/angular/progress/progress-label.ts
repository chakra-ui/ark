import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressLabel]',
  standalone: true,
  exportAs: 'arkProgressLabel',
})
export class ArkProgressLabel {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getLabelProps())
  }
}
