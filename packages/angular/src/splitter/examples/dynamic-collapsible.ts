import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core'
import {
  ArkSplitterPanel,
  ArkSplitterResizeTrigger,
  ArkSplitterResizeTriggerIndicator,
  ArkSplitterRootProvider,
  useSplitter,
} from '@ark-ui/angular/splitter'
import { splitterExampleStyles } from '../splitter-example-styles'

@Component({
  selector: 'splitter-dynamic-collapsible-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkSplitterRootProvider, ArkSplitterPanel, ArkSplitterResizeTrigger, ArkSplitterResizeTriggerIndicator],
  template: `
    <div arkSplitterRootProvider class="splitter-root" [value]="splitter">
      <div arkSplitterPanel class="splitter-panel" id="a">A</div>
      <button type="button" arkSplitterResizeTrigger class="splitter-trigger" id="a:b" aria-label="Resize panels">
        <span arkSplitterResizeTriggerIndicator class="splitter-indicator"></span>
      </button>
      <div arkSplitterPanel class="splitter-panel" id="b">B</div>
    </div>
  `,
  styles: [splitterExampleStyles],
})
export class SplitterDynamicCollapsibleExample {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly destroyRef = inject(DestroyRef)
  private readonly rootSize = signal<number | null>(null)
  private readonly isBelowMd = computed(() => {
    const size = this.rootSize()
    return size !== null && size < 600
  })

  readonly splitter = useSplitter({
    context: () => ({
      defaultSize: [15, 85],
      panels: [{ id: 'a', collapsible: this.isBelowMd(), collapsedSize: 5, minSize: 20, maxSize: 40 }, { id: 'b' }],
    }),
  })

  constructor() {
    afterNextRender(() => {
      const root = this.elementRef.nativeElement.querySelector<HTMLElement>('.splitter-root')
      if (!root || typeof ResizeObserver === 'undefined') return

      const updateRootSize = () => this.rootSize.set(root.offsetWidth)
      const observer = new ResizeObserver(updateRootSize)
      updateRootSize()
      observer.observe(root)
      this.destroyRef.onDestroy(() => observer.disconnect())
    })

    effect(() => {
      if (this.isBelowMd()) {
        this.splitter.api().collapsePanel('a')
      } else {
        this.splitter.api().expandPanel('a')
      }
    })
  }
}
