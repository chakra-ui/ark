import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSplitterPanel,
  ArkSplitterResizeTrigger,
  ArkSplitterResizeTriggerIndicator,
  ArkSplitterRoot,
  type SplitterPanelData,
} from '@ark-ui/angular/splitter'
import { splitterExampleStyles } from '../splitter-example-styles'

@Component({
  selector: 'splitter-multiple-panels-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger, ArkSplitterResizeTriggerIndicator],
  template: `
    <div arkSplitter class="splitter-root" [panels]="panels" [defaultSize]="[20, 60, 20]">
      <div arkSplitterPanel class="splitter-panel" id="a">A</div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="a:b" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="b">B</div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="b:c" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="c">C</div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterMultiplePanelsExample {
  readonly panels: SplitterPanelData[] = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 40 },
    { id: 'c', minSize: 20 },
  ]
}
