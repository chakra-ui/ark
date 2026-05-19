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
  selector: 'splitter-collapsible-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger, ArkSplitterResizeTriggerIndicator],
  template: `
    <div arkSplitter class="splitter-root" [panels]="panels" [defaultSize]="[15, 85]">
      <div arkSplitterPanel class="splitter-panel" id="a">A</div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="a:b" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="b">B</div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterCollapsibleExample {
  readonly panels: SplitterPanelData[] = [
    { id: 'a', collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
    { id: 'b', minSize: 50 },
  ]
}
