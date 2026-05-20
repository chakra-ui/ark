import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectArkInteraction, provideArkInteraction } from '../public-api'
import { interactionExampleStyles } from '../interaction-example-styles'

type FocusedField = 'first' | 'last' | null

@Component({
  selector: 'interaction-focus-visible-text-input-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkInteraction()],
  template: `
    <div class="container">
      <p class="status">Focus visible: {{ interaction.isFocusVisible() ? 'true' : 'false' }}</p>
      <div class="field">
        <label class="label" for="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          class="input"
          [attr.data-focus-visible]="isFieldFocusVisible('first') ? '' : null"
          (focus)="focusedField.set('first')"
          (blur)="focusedField.set(null)"
        />
      </div>
      <div class="field">
        <label class="label" for="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          class="input"
          [attr.data-focus-visible]="isFieldFocusVisible('last') ? '' : null"
          (focus)="focusedField.set('last')"
          (blur)="focusedField.set(null)"
        />
      </div>
    </div>
  `,
  styles: [interactionExampleStyles],
})
export class InteractionFocusVisibleTextInputExample {
  protected readonly interaction = injectArkInteraction()
  protected readonly focusedField = signal<FocusedField>(null)

  protected isFieldFocusVisible(field: FocusedField): boolean {
    return this.focusedField() === field && this.interaction.isFocusVisible()
  }
}
