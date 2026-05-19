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
import { ClipboardCheckIcon, ClipboardCopyIcon } from './icons'

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
    ClipboardCheckIcon,
    ClipboardCopyIcon,
  ],
  template: `
    <div class="stack">
      <div arkClipboard [(value)]="url">
        <label arkClipboardLabel>Copy this link</label>
        <div arkClipboardControl>
          <input arkClipboardInput />
          <button arkClipboardTrigger>
            <span arkClipboardIndicator #indicator="arkClipboardIndicator">
              @if (indicator.copied()) {
                <clipboard-check-icon />
              } @else {
                <clipboard-copy-icon />
              }
            </span>
          </button>
        </div>
      </div>

      <button type="button" class="button" (click)="url.set('https://chakra-ui.com')">Change Url</button>
    </div>
  `,
  styles: [clipboardExampleStyles],
})
export class ClipboardControlledExample {
  readonly url = signal<string | undefined>('https://ark-ui.com')
}
