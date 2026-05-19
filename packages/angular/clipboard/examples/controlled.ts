import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardInput,
  ArkClipboardLabel,
  ArkClipboardRoot,
  ArkClipboardTrigger,
} from '@ark-ui/angular/clipboard'
import { clipboardExampleStyles } from '../clipboard-example-styles'

@Component({
  selector: 'clipboard-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkClipboardRoot,
    ArkClipboardLabel,
    ArkClipboardControl,
    ArkClipboardInput,
    ArkClipboardTrigger,
    ArkClipboardIndicator,
  ],
  template: `
    <div arkClipboard [(value)]="url">
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
export class ClipboardControlledExample {
  readonly url = signal<string | undefined>('https://ark-ui.com')
}
