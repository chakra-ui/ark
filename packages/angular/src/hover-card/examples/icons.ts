import { ChangeDetectionStrategy, Component } from '@angular/core'

const hoverCardIconStyles = `
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
  selector: 'hover-card-chevron-down-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [hoverCardIconStyles],
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
})
export class HoverCardChevronDownIcon {}

@Component({
  selector: 'hover-card-chevron-up-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [hoverCardIconStyles],
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  `,
})
export class HoverCardChevronUpIcon {}
