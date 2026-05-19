import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardInput,
  ArkClipboardLabel,
  ArkClipboardRootProvider,
  ArkClipboardTrigger,
  useClipboard,
} from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'

@Component({
  selector: 'clipboard-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkClipboardRootProvider,
    ArkClipboardLabel,
    ArkClipboardControl,
    ArkClipboardInput,
    ArkClipboardTrigger,
    ArkClipboardIndicator,
  ],
  template: `
    <div arkClipboardRootProvider [value]="clipboard">
      <label arkClipboardLabel>Copy this link</label>
      <div arkClipboardControl>
        <input arkClipboardInput />
        <button arkClipboardTrigger>
          <span arkClipboardIndicator>Copy</span>
        </button>
      </div>
    </div>
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardRootProviderExample {
  readonly clipboard = useClipboard({ context: () => ({ value: 'https://ark-ui.com' }) })
}
