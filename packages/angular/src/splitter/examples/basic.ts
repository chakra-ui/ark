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
  selector: 'splitter-basic-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger, ArkSplitterResizeTriggerIndicator],
  template: `
    <div arkSplitter class="splitter-root" [panels]="panels">
      <div arkSplitterPanel class="splitter-panel" id="a">A</div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="a:b" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="b">B</div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterBasicExample {
  readonly panels: SplitterPanelData[] = [{ id: 'a' }, { id: 'b' }]
}
