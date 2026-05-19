import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkSplitterPanel,
  ArkSplitterResizeTrigger,
  ArkSplitterResizeTriggerIndicator,
  ArkSplitterRootProvider,
  useSplitter,
  type UseSplitterReturn,
} from '@ark-ui/angular/splitter'
import { splitterExampleStyles } from '../splitter-example-styles'

@Component({
  selector: 'splitter-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSplitterRootProvider, ArkSplitterPanel, ArkSplitterResizeTrigger, ArkSplitterResizeTriggerIndicator],
  template: `
    <div class="stack">
      <output>current size: {{ sizeLabel() }}</output>
      <div arkSplitterRootProvider class="splitter-root" [value]="splitter">
        <div arkSplitterPanel class="splitter-panel" id="a">A</div>
        <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="a:b" aria-label="Resize">
          <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
        </button>
        <div arkSplitterPanel class="splitter-panel" id="b">B</div>
      </div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterRootProviderExample {
  readonly splitter: UseSplitterReturn = runInInjectionContext(inject(Injector), () =>
    useSplitter({ context: () => ({ defaultSize: [50, 50], panels: [{ id: 'a' }, { id: 'b' }] }) }),
  )
  readonly sizeLabel = computed(() => JSON.stringify(this.splitter.api().getSizes()))
}
