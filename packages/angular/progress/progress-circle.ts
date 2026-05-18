import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: 'svg[arkProgressCircle]',
  standalone: true,
  exportAs: 'arkProgressCircle',
})
export class ArkProgressCircle {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getCircleProps())
  }
}
