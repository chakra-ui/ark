import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkTimerActionTrigger,
  ArkTimerArea,
  ArkTimerControl,
  ArkTimerItem,
  ArkTimerRoot,
  ArkTimerSeparator,
} from '../public-api'
import { timerExampleStyles } from '../timer-example-styles'

@Component({
  selector: 'timer-countdown-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTimerRoot, ArkTimerArea, ArkTimerItem, ArkTimerSeparator, ArkTimerControl, ArkTimerActionTrigger],
  template: `
    <div arkTimer countdown [startMs]="5 * 60 * 1000" class="timer-root">
      <div arkTimerArea class="timer-area">
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
        <button arkTimerActionTrigger action="pause" class="timer-button">Pause</button>
        <button arkTimerActionTrigger action="reset" class="timer-button">Reset</button>
      </div>
    </div>
  `,
  styles: [timerExampleStyles],
})
export class TimerCountdownExample {}
