import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'password-input-eye-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-flex;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
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
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,
})
export class PasswordInputEyeIcon {}

@Component({
  selector: 'password-input-eye-off-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: inline-flex;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
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
      <path d="m2 2 20 20" stroke-linecap="round" />
      <path d="M10.584 10.587a2 2 0 0 0 2.828 2.826" />
      <path d="M9.363 5.365A10.61 10.61 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.55 10.55 0 0 1-2.043 3.368" />
      <path
        d="M6.11 6.108A10.66 10.66 0 0 0 2.458 12c.646 2.058 1.984 3.82 3.746 5.043A10.59 10.59 0 0 0 12 19c.947 0 1.865-.124 2.738-.356"
      />
    </svg>
  `,
})
export class PasswordInputEyeOffIcon {}
