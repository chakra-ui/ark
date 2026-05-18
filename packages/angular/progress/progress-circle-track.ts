import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: 'circle[arkProgressCircleTrack]',
  standalone: true,
  exportAs: 'arkProgressCircleTrack',
})
export class ArkProgressCircleTrack {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getCircleTrackProps())
  }
}
