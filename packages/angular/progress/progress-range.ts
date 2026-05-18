import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressRange]',
  standalone: true,
  exportAs: 'arkProgressRange',
})
export class ArkProgressRange {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getRangeProps())
  }
}
