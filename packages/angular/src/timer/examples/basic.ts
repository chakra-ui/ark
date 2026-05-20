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
import { TimerPauseIcon, TimerPlayIcon } from './icons'

@Component({
  selector: 'timer-basic-example',
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
    TimerPauseIcon,
  ],
  template: `
    <div arkTimer [targetMs]="60 * 60 * 1000" [startMs]="40 * 60 * 1000" class="timer-root">
      <div arkTimerArea class="timer-area">
        <div class="timer-item-group">
          <span arkTimerItem type="days" class="timer-item"></span>
          <span class="timer-label">days</span>
        </div>
        <span arkTimerSeparator class="timer-separator">:</span>
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
          Play
        </button>
        <button arkTimerActionTrigger action="resume" class="timer-button">
          <timer-play-icon />
          Resume
        </button>
        <button arkTimerActionTrigger action="pause" class="timer-button">
          <timer-pause-icon />
          Pause
        </button>
      </div>
    </div>
  `,
  styles: [timerExampleStyles],
})
export class TimerBasicExample {}
