import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { injectArkInteraction, provideArkInteraction } from '../public-api'

@Component({
  selector: 'interaction-focus-visible-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkInteraction()],
  template: `
    <div>
      <p>Focus visible: {{ interaction.isFocusVisible() ? 'true' : 'false' }}</p>
      <button
        type="button"
        [attr.data-focus-visible]="isButtonFocusVisible() ? '' : null"
        (focus)="focused.set(true)"
        (blur)="focused.set(false)"
      >
        Tab or click me
      </button>
    </div>
  `,
})
export class InteractionFocusVisibleExample {
  protected readonly interaction = injectArkInteraction()
  protected readonly focused = signal(false)

  protected isButtonFocusVisible(): boolean {
    return this.focused() && this.interaction.isFocusVisible()
  }
}
