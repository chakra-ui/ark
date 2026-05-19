import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import type { TimerTickDetails } from '../public-api'
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
  selector: 'timer-events-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTimerRoot, ArkTimerArea, ArkTimerItem, ArkTimerSeparator, ArkTimerControl, ArkTimerActionTrigger],
  template: `
    <div
      arkTimer
      [targetMs]="60 * 1000"
      (complete)="completed.set(true)"
      (tick)="handleTick($event)"
      class="timer-root"
    >
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
        <button arkTimerActionTrigger action="reset" class="timer-button">Reset</button>
      </div>
      <output class="timer-output">Ticks: {{ ticks() }}{{ completed() ? ' complete' : '' }}</output>
    </div>
  `,
  styles: [timerExampleStyles],
})
export class TimerEventsExample {
  readonly ticks = signal(0)
  readonly completed = signal(false)

  handleTick(_details: TimerTickDetails): void {
    this.ticks.update((ticks) => ticks + 1)
  }
}
