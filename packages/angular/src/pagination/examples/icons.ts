import { ChangeDetectionStrategy, Component } from '@angular/core'

const paginationIconStyles = `
  :host {
    display: inline-flex;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    line-height: 1;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

@Component({
  selector: 'pagination-chevron-left-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [paginationIconStyles],
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  `,
})
export class PaginationChevronLeftIcon {}

@Component({
  selector: 'pagination-chevron-right-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [paginationIconStyles],
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  `,
})
export class PaginationChevronRightIcon {}

@Component({
  selector: 'pagination-chevrons-left-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [paginationIconStyles],
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
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </svg>
  `,
})
export class PaginationChevronsLeftIcon {}

@Component({
  selector: 'pagination-chevrons-right-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [paginationIconStyles],
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
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  `,
})
export class PaginationChevronsRightIcon {}
