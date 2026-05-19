import { ChangeDetectionStrategy, Component } from '@angular/core'

const iconHost = {
  'aria-hidden': 'true',
  focusable: 'false',
  style: 'display: inline-flex; width: 1.25rem; height: 1.25rem',
}

@Component({
  selector: 'swap-check-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,
})
export class SwapCheckIcon {}

@Component({
  selector: 'swap-x-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,
})
export class SwapXIcon {}

@Component({
  selector: 'swap-play-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  `,
})
export class SwapPlayIcon {}

@Component({
  selector: 'swap-pause-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5h4v14H6z" />
      <path d="M14 5h4v14h-4z" />
    </svg>
  `,
})
export class SwapPauseIcon {}

@Component({
  selector: 'swap-sun-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  `,
})
export class SwapSunIcon {}

@Component({
  selector: 'swap-moon-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z" />
    </svg>
  `,
})
export class SwapMoonIcon {}

@Component({
  selector: 'swap-volume-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  `,
})
export class SwapVolumeIcon {}

@Component({
  selector: 'swap-volume-x-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: iconHost,
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="m22 9-6 6" />
      <path d="m16 9 6 6" />
    </svg>
  `,
})
export class SwapVolumeXIcon {}
