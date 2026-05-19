import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import {
  ArkScrollAreaContent,
  ArkScrollAreaCorner,
  ArkScrollAreaRootProvider,
  ArkScrollAreaScrollbar,
  ArkScrollAreaThumb,
  ArkScrollAreaViewport,
  useScrollArea,
  type UseScrollAreaReturn,
} from '@ark-ui/angular/scroll-area'
import { scrollAreaExampleStyles } from '../scroll-area-example-styles'

@Component({
  selector: 'scroll-area-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkScrollAreaRootProvider,
    ArkScrollAreaViewport,
    ArkScrollAreaContent,
    ArkScrollAreaScrollbar,
    ArkScrollAreaThumb,
    ArkScrollAreaCorner,
  ],
  template: `
    <div class="scroll-area-actions">
      <button type="button" (click)="scrollArea.api().scrollToEdge({ edge: 'top' })">Scroll top</button>
      <button type="button" (click)="scrollArea.api().scrollToEdge({ edge: 'bottom' })">Scroll bottom</button>
    </div>
    <div arkScrollAreaRootProvider [value]="scrollArea" class="scroll-area-root">
      <div arkScrollAreaViewport class="scroll-area-viewport">
        <div arkScrollAreaContent class="scroll-area-content">
          @for (paragraph of paragraphs; track paragraph) {
            <p class="scroll-area-paragraph">{{ paragraph }}</p>
          }
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
export class ScrollAreaRootProviderExample {
  readonly scrollArea: UseScrollAreaReturn = runInInjectionContext(inject(Injector), () =>
    useScrollArea({ context: () => ({}) }),
  )

  readonly paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ]
}
