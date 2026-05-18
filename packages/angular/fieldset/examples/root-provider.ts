import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkFieldInput, ArkFieldLabel, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkFieldsetLegend, ArkFieldsetRootProvider, useFieldset } from '@ark-ui/angular/fieldset'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

@Component({
  selector: 'fieldset-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldsetRootProvider, ArkFieldsetLegend, ArkFieldRoot, ArkFieldLabel, ArkFieldInput],
  template: `
    <div class="vstack">
      <button type="button" (click)="toggleDisabled()">Toggle Disabled</button>
      <fieldset arkFieldsetRootProvider [value]="fieldset">
        <legend arkFieldsetLegend>Contact Details</legend>
        <div arkFieldRoot>
          <label arkFieldLabel>Name</label>
          <input arkFieldInput placeholder="John Doe" />
        </div>
        <div arkFieldRoot>
          <label arkFieldLabel>Email</label>
          <input arkFieldInput type="email" placeholder="john@example.com" />
        </div>
      </fieldset>
    </div>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetRootProviderExample {
  readonly disabled = signal(false)
  readonly fieldset = useFieldset({ context: () => ({ disabled: this.disabled() }) })

  toggleDisabled() {
    this.disabled.update((v) => !v)
  }
}
