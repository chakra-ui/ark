import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkTimerActionTrigger,
  ArkTimerArea,
  ArkTimerControl,
  ArkTimerItem,
  ArkTimerRootProvider,
  ArkTimerSeparator,
  useTimer,
} from '../public-api'
import { timerExampleStyles } from '../timer-example-styles'

@Component({
  selector: 'timer-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTimerRootProvider,
    ArkTimerArea,
    ArkTimerItem,
    ArkTimerSeparator,
    ArkTimerControl,
    ArkTimerActionTrigger,
  ],
  template: `
    <div class="timer-root">
      <output class="timer-output">Seconds: {{ timer.api().time.seconds }}</output>
      <div arkTimerRootProvider [value]="timer">
        <div arkTimerArea class="timer-area">
          <div class="timer-item-group">
            <span arkTimerItem type="hours" class="timer-item"></span>
            <span class="timer-label">hours</span>
          </div>
          <span arkTimerSeparator class="timer-separator">:</span>
          <div class="timer-item-group">
            <span arkTimerItem type="minutes" class="timer-item"></span>
            <span class="timer-label">minutes</span>
          </div>
          <span arkTimerSeparator class="timer-separator">:</span>
          <div class="timer-item-group">
            <span arkTimerItem type="seconds" class="timer-item"></span>
            <span class="timer-label">seconds</span>
          </div>
        </div>
        <div arkTimerControl class="timer-control">
          <button arkTimerActionTrigger action="start" class="timer-button">Start</button>
          <button arkTimerActionTrigger action="resume" class="timer-button">Resume</button>
          <button arkTimerActionTrigger action="pause" class="timer-button">Pause</button>
          <button arkTimerActionTrigger action="reset" class="timer-button">Reset</button>
        </div>
      </div>
    </div>
  `,
  styles: [timerExampleStyles],
})
export class TimerRootProviderExample {
  private readonly injector = inject(Injector)
  readonly timer = runInInjectionContext(this.injector, () =>
    useTimer({ context: () => ({ targetMs: 60 * 60 * 1000 }) }),
  )
}
