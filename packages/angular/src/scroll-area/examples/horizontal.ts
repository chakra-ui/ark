import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkScrollAreaContent,
  ArkScrollAreaCorner,
  ArkScrollAreaRoot,
  ArkScrollAreaScrollbar,
  ArkScrollAreaThumb,
  ArkScrollAreaViewport,
} from '@ark-ui/angular/scroll-area'
import { scrollAreaExampleStyles } from '../scroll-area-example-styles'

@Component({
  selector: 'scroll-area-horizontal-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkScrollAreaRoot,
    ArkScrollAreaViewport,
    ArkScrollAreaContent,
    ArkScrollAreaScrollbar,
    ArkScrollAreaThumb,
    ArkScrollAreaCorner,
  ],
  template: `
    <div arkScrollArea class="scroll-area-root" style="height: auto">
      <div arkScrollAreaViewport class="scroll-area-viewport">
        <div arkScrollAreaContent class="scroll-area-content scroll-area-content--wide">
          <p class="scroll-area-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </div>
      <div arkScrollAreaScrollbar orientation="horizontal" class="scroll-area-scrollbar">
        <div arkScrollAreaThumb class="scroll-area-thumb"></div>
      </div>
      <div arkScrollAreaCorner class="scroll-area-corner"></div>
    </div>
  `,
  styles: [scrollAreaExampleStyles],
})
export class ScrollAreaHorizontalExample {}
