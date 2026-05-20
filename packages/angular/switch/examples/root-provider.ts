import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSwitchControl,
  ArkSwitchHiddenInput,
  ArkSwitchLabel,
  ArkSwitchRootProvider,
  ArkSwitchThumb,
  useSwitch,
} from '@ark-ui/angular/switch'
import { switchExampleStyles } from '../switch-example-styles'

@Component({
  selector: 'switch-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSwitchRootProvider, ArkSwitchControl, ArkSwitchThumb, ArkSwitchLabel, ArkSwitchHiddenInput],
  template: `
    <div class="stack">
      <button class="button" type="button" (click)="switch.api().toggleChecked()">Toggle</button>

      <label arkSwitchRootProvider [value]="switch">
        <span arkSwitchControl>
          <span arkSwitchThumb></span>
        </span>
        <span arkSwitchLabel>Label</span>
        <input arkSwitchHiddenInput />
      </label>
    </div>
  `,
  styles: [
    switchExampleStyles,
    `
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--demo-border-emphasized);
        background: var(--demo-bg-subtle);
        color: var(--demo-neutral-fg);
        font: inherit;
      }
    `,
  ],
})
export class SwitchRootProviderExample {
  readonly switch = useSwitch({ context: () => ({}) })
}
