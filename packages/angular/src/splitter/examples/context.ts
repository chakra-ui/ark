import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { injectArkSplitterContext } from '@ark-ui/angular/splitter'
import {
  ArkSplitterPanel,
  ArkSplitterResizeTrigger,
  ArkSplitterResizeTriggerIndicator,
  ArkSplitterRoot,
  type SplitterPanelData,
} from '@ark-ui/angular/splitter'
import { splitterExampleStyles } from '../splitter-example-styles'

@Component({
  selector: 'splitter-panel-actions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<button type="button" class="splitter-button" (click)="resize()">Set to 10%</button>',
})
class SplitterPanelActions {
  readonly panelId = input.required<string>()
  private readonly splitter = injectArkSplitterContext()

  resize(): void {
    this.splitter.api().resizePanel(this.panelId(), 10)
  }
}

@Component({
  selector: 'splitter-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkSplitterRoot,
    ArkSplitterPanel,
    ArkSplitterResizeTrigger,
    ArkSplitterResizeTriggerIndicator,
    SplitterPanelActions,
  ],
  template: `
    <div arkSplitter class="splitter-root" [panels]="panels">
      <div arkSplitterPanel class="splitter-panel" id="a"><splitter-panel-actions panelId="a" /></div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="a:b" aria-label="Resize">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="b"><splitter-panel-actions panelId="b" /></div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterContextExample {
  readonly panels: SplitterPanelData[] = [{ id: 'a' }, { id: 'b' }]
}
