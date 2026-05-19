import { ChangeDetectionStrategy, Component } from '@angular/core'
import { injectArkInteraction, provideArkInteraction } from '../public-api'

@Component({
  selector: 'interaction-interaction-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideArkInteraction()],
  template: `
    <p>Interaction modality: {{ interaction.modality() ?? 'none' }}</p>
    <p>Focus visible: {{ interaction.isFocusVisible() ? 'yes' : 'no' }}</p>
  `,
})
export class InteractionInteractionExample {
  protected readonly interaction = injectArkInteraction()
}
