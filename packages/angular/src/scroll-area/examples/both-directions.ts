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
  selector: 'scroll-area-both-directions-example',
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
        <div arkScrollAreaContent class="scroll-area-content scroll-area-content--wide">
          @for (paragraph of paragraphs; track paragraph) {
            <p class="scroll-area-paragraph">{{ paragraph }}</p>
          }
        </div>
      </div>
      <div arkScrollAreaScrollbar orientation="vertical" class="scroll-area-scrollbar">
        <div arkScrollAreaThumb class="scroll-area-thumb"></div>
      </div>
      <div arkScrollAreaScrollbar orientation="horizontal" class="scroll-area-scrollbar">
        <div arkScrollAreaThumb class="scroll-area-thumb"></div>
      </div>
      <div arkScrollAreaCorner class="scroll-area-corner"></div>
    </div>
  `,
  styles: [scrollAreaExampleStyles],
})
export class ScrollAreaBothDirectionsExample {
  readonly paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
  ]
}
