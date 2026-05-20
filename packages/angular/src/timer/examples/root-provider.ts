import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
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
import { TimerPauseIcon, TimerPlayIcon, TimerRotateCcwIcon } from './icons'

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
    TimerPlayIcon,
    TimerPauseIcon,
    TimerRotateCcwIcon,
  ],
  template: `
    <div class="timer-stack">
      <output class="timer-output">timer: {{ time() }}</output>
      <div arkTimerRootProvider [value]="timer" class="timer-root">
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
          <button arkTimerActionTrigger action="start" class="timer-button">
            <timer-play-icon />
            Start
          </button>
          <button arkTimerActionTrigger action="resume" class="timer-button">
            <timer-play-icon />
            Resume
          </button>
          <button arkTimerActionTrigger action="pause" class="timer-button">
            <timer-pause-icon />
            Pause
          </button>
          <button arkTimerActionTrigger action="reset" class="timer-button">
            <timer-rotate-ccw-icon />
            Reset
          </button>
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
  readonly time = computed(() => JSON.stringify(this.timer.api().time))
}
