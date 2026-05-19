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
  selector: 'scroll-area-nested-example',
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
    <div arkScrollArea class="scroll-area-root">
      <div arkScrollAreaViewport class="scroll-area-viewport">
        <div arkScrollAreaContent class="scroll-area-content">
          <p class="scroll-area-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <div arkScrollArea class="scroll-area-root" style="height: 8rem; width: 100%">
            <div arkScrollAreaViewport class="scroll-area-viewport">
              <div arkScrollAreaContent class="scroll-area-content">
                <p class="scroll-area-paragraph">
                  This nested region has its own viewport, scrollbar, and thumb context. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p class="scroll-area-paragraph">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
              </div>
            </div>
            <div arkScrollAreaScrollbar class="scroll-area-scrollbar">
              <div arkScrollAreaThumb class="scroll-area-thumb"></div>
            </div>
            <div arkScrollAreaCorner class="scroll-area-corner"></div>
          </div>
        </div>
      </div>
      <div arkScrollAreaScrollbar class="scroll-area-scrollbar">
        <div arkScrollAreaThumb class="scroll-area-thumb"></div>
      </div>
      <div arkScrollAreaCorner class="scroll-area-corner"></div>
    </div>
  `,
  styles: [scrollAreaExampleStyles],
})
export class ScrollAreaNestedExample {}
