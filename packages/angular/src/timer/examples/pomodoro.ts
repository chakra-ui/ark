import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  selector: 'timer-pomodoro-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTimerRoot, ArkTimerArea, ArkTimerItem, ArkTimerSeparator, ArkTimerControl, ArkTimerActionTrigger],
  template: `
    <div
      arkTimer
      countdown
      [startMs]="isWorking() ? 25 * 60 * 1000 : 5 * 60 * 1000"
      (complete)="completeSession()"
      class="timer-root"
    >
      <h2 class="timer-title">{{ isWorking() ? 'Work Session' : 'Break Session' }}</h2>
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
      <output class="timer-output">Completed cycles: {{ cycles() }}</output>
    </div>
  `,
  styles: [timerExampleStyles],
})
export class TimerPomodoroExample {
  readonly isWorking = signal(true)
  readonly cycles = signal(0)

  completeSession(): void {
    if (!this.isWorking()) {
      this.cycles.update((cycles) => cycles + 1)
    }
    this.isWorking.update((value) => !value)
  }
}
