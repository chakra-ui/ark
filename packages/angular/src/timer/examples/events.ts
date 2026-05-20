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
import { TimerPlayIcon, TimerRotateCcwIcon } from './icons'

@Component({
  selector: 'timer-events-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkTimerRoot,
    ArkTimerArea,
    ArkTimerItem,
    ArkTimerSeparator,
    ArkTimerControl,
    ArkTimerActionTrigger,
    TimerPlayIcon,
    TimerRotateCcwIcon,
  ],
  template: `
    <div arkTimer [targetMs]="60 * 1000" (complete)="onComplete()" (tick)="handleTick($event)" class="timer-root">
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
        <button arkTimerActionTrigger action="start" class="timer-button">
          <timer-play-icon />
          Start
        </button>
        <button arkTimerActionTrigger action="reset" class="timer-button">
          <timer-rotate-ccw-icon />
          Reset
        </button>
      </div>
      <output class="timer-output">Ticks: {{ ticks() }}</output>
    </div>
  `,
  styles: [timerExampleStyles],
})
export class TimerEventsExample {
  readonly ticks = signal(0)

  handleTick(_details: TimerTickDetails): void {
    this.ticks.update((ticks) => ticks + 1)
  }

  onComplete(): void {
    console.log('Timer completed')
  }
}
