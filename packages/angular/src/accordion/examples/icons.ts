import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'accordion-chevron-down-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m6 9 6 6 6-6"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  `,
})
export class AccordionChevronDownIcon {}
