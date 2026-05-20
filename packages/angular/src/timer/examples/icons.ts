import { ChangeDetectionStrategy, Component } from '@angular/core'

const timerIconStyles = `
  :host {
    display: inline-flex;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    line-height: 1;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

@Component({
  selector: 'timer-play-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [timerIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  `,
})
export class TimerPlayIcon {}

@Component({
  selector: 'timer-pause-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [timerIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  `,
})
export class TimerPauseIcon {}

@Component({
  selector: 'timer-rotate-ccw-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [timerIconStyles],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  `,
})
export class TimerRotateCcwIcon {}
