import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectArkInteraction, provideArkInteraction } from '../public-api'

type FocusedField = 'first' | 'last' | null

@Component({
  selector: 'interaction-focus-visible-text-input-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkInteraction()],
  template: `
    <div>
      <p>Focus visible: {{ interaction.isFocusVisible() ? 'true' : 'false' }}</p>
      <div>
        <label for="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          [attr.data-focus-visible]="isFieldFocusVisible('first') ? '' : null"
          (focus)="focusedField.set('first')"
          (blur)="focusedField.set(null)"
        />
      </div>
      <div>
        <label for="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          [attr.data-focus-visible]="isFieldFocusVisible('last') ? '' : null"
          (focus)="focusedField.set('last')"
          (blur)="focusedField.set(null)"
        />
      </div>
    </div>
  `,
})
export class InteractionFocusVisibleTextInputExample {
  protected readonly interaction = injectArkInteraction()
  protected readonly focusedField = signal<FocusedField>(null)

  protected isFieldFocusVisible(field: FocusedField): boolean {
    return this.focusedField() === field && this.interaction.isFocusVisible()
  }
}
