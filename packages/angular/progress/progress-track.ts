import { Directive } from '@angular/core'
import { applyProgressPartProps } from './apply-progress-part-props'
import { injectArkProgressContext } from './use-progress-context'

@Directive({
  selector: '[arkProgressTrack]',
  standalone: true,
  exportAs: 'arkProgressTrack',
})
export class ArkProgressTrack {
  constructor() {
    const context = injectArkProgressContext()
    applyProgressPartProps(() => context.api().getTrackProps())
  }
}
