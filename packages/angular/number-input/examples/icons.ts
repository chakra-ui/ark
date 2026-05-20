import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'number-input-chevron-up-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
})
export class NumberInputChevronUpIcon {}

@Component({
  selector: 'number-input-chevron-down-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
})
export class NumberInputChevronDownIcon {}

@Component({
  selector: 'number-input-arrow-left-right-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="m8 3-4 4 4 4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 7h16" stroke-linecap="round" />
      <path d="m16 21 4-4-4-4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 17H4" stroke-linecap="round" />
    </svg>
  `,
})
export class NumberInputArrowLeftRightIcon {}
