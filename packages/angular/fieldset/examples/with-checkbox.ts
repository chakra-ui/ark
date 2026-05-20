import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkFieldsetLegend, ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { fieldsetExampleStyles } from '../fieldset-example-styles'

@Component({
  selector: 'fieldset-with-checkbox-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkFieldsetRoot, ArkFieldsetLegend],
  template: `
    <fieldset arkFieldsetRoot>
      <legend arkFieldsetLegend>Email Preferences</legend>

      <label class="checkbox-root">
        <input class="checkbox-input" type="checkbox" checked />
        <span class="checkbox-control">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span class="checkbox-label">Product updates</span>
      </label>

      <label class="checkbox-root">
        <input class="checkbox-input" type="checkbox" />
        <span class="checkbox-control">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span class="checkbox-label">Marketing emails</span>
      </label>
    </fieldset>
  `,
  styles: [fieldsetExampleStyles],
})
export class FieldsetWithCheckboxExample {}
