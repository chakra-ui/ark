import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkSplitterPanel,
  ArkSplitterResizeTrigger,
  ArkSplitterResizeTriggerIndicator,
  ArkSplitterRoot,
  createSplitterRegistry,
  type SplitterPanelData,
} from '@ark-ui/angular/splitter'
import { splitterExampleStyles } from '../splitter-example-styles'

@Component({
  selector: 'splitter-nested-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger, ArkSplitterResizeTriggerIndicator],
  template: `
    <div arkSplitter class="splitter-root" [panels]="outerPanels" [registry]="registry">
      <div arkSplitterPanel class="splitter-panel" id="left">Left</div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="left:center" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="center">
        <div arkSplitter class="splitter-root" orientation="vertical" [panels]="innerPanels" [registry]="registry">
          <div arkSplitterPanel class="splitter-panel" id="top">Top</div>
          <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="top:bottom" aria-label="Resize">
            <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
          </button>
          <div arkSplitterPanel class="splitter-panel" id="bottom">Bottom</div>
        </div>
      </div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="center:right" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="right">Right</div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterNestedExample {
  readonly registry = createSplitterRegistry()
  readonly outerPanels: SplitterPanelData[] = [{ id: 'left' }, { id: 'center' }, { id: 'right' }]
  readonly innerPanels: SplitterPanelData[] = [{ id: 'top' }, { id: 'bottom' }]
}
