import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectArkInteraction, provideArkInteraction } from '../public-api'
import { interactionExampleStyles } from '../interaction-example-styles'

@Component({
  selector: 'interaction-interaction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkInteraction()],
  template: `
    <div class="container">
      <span class="badge" [attr.data-modality]="interaction.modality()">
        {{ interaction.modality() ?? 'none' }}
      </span>
      <p class="hint">Try clicking, pressing a key, or using a screen reader.</p>
      <button
        type="button"
        class="button"
        [attr.data-focus-visible]="interaction.modality() === 'keyboard' ? '' : null"
      >
        Click or Tab to me
      </button>
    </div>
  `,
  styles: [interactionExampleStyles],
})
export class InteractionInteractionExample {
  protected readonly interaction = injectArkInteraction()
}
