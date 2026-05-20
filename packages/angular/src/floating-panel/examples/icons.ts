import { ChangeDetectionStrategy, Component } from '@angular/core'

const floatingPanelIconStyles = `
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
  selector: 'floating-panel-arrow-down-left-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [floatingPanelIconStyles],
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
      <path d="M17 7 7 17" />
      <path d="M17 17H7V7" />
    </svg>
  `,
})
export class FloatingPanelArrowDownLeftIcon {}

@Component({
  selector: 'floating-panel-grip-vertical-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [floatingPanelIconStyles],
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
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  `,
})
export class FloatingPanelGripVerticalIcon {}

@Component({
  selector: 'floating-panel-maximize-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [floatingPanelIconStyles],
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
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="m21 3-7 7" />
      <path d="m3 21 7-7" />
    </svg>
  `,
})
export class FloatingPanelMaximizeIcon {}

@Component({
  selector: 'floating-panel-minus-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [floatingPanelIconStyles],
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
      <path d="M5 12h14" />
    </svg>
  `,
})
export class FloatingPanelMinusIcon {}

@Component({
  selector: 'floating-panel-x-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [floatingPanelIconStyles],
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,
})
export class FloatingPanelXIcon {}
