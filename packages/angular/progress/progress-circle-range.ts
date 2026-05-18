import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: 'circle[arkProgressCircleRange]',
  standalone: true,
  exportAs: 'arkProgressCircleRange',
})
export class ArkProgressCircleRange {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getCircleRangeProps())
  }
}
