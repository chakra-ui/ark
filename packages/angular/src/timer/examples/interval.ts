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
  selector: 'timer-interval-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTimerRoot, ArkTimerArea, ArkTimerItem, ArkTimerSeparator, ArkTimerControl, ArkTimerActionTrigger],
  template: `
    <div arkTimer [interval]="100" [targetMs]="60 * 1000" class="timer-root">
      <div arkTimerArea class="timer-area">
        <div class="timer-item-group">
          <span arkTimerItem type="seconds" class="timer-item"></span>
          <span class="timer-label">seconds</span>
        </div>
        <span arkTimerSeparator class="timer-separator">.</span>
        <div class="timer-item-group">
          <span arkTimerItem type="milliseconds" class="timer-item"></span>
          <span class="timer-label">ms</span>
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
export class TimerIntervalExample {}
