import type * as splitter from '@zag-js/splitter'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  SplitterElementIds,
  SplitterExpandCollapseDetails,
  SplitterPanelData,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
} from './splitter.types'
import { ARK_SPLITTER_CONTEXT } from './use-splitter-context'
import { useSplitter, type UseSplitterReturn } from './use-splitter'

function areNumberArraysEqual(left: number[] | undefined, right: number[]): boolean {
  return left?.length === right.length && left.every((value, index) => Object.is(value, right[index]))
}

@Directive({
  selector: '[arkSplitter]',
  standalone: true,
  exportAs: 'arkSplitter',
  providers: [{ provide: ARK_SPLITTER_CONTEXT, useExisting: forwardRef(() => ArkSplitterRoot) }],
})
export class ArkSplitterRoot implements UseSplitterReturn {
  /** The unique identifier of the splitter. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the splitter. Useful for composition. */
  readonly ids: InputSignal<SplitterElementIds | undefined> = input<SplitterElementIds | undefined>(undefined)
  /** The orientation of the splitter. */
  readonly orientation: InputSignal<splitter.Props['orientation']> = input<splitter.Props['orientation']>(undefined)
  /** The controlled size data of the panels. */
  readonly size: ModelSignal<number[] | undefined> = model<number[] | undefined>(undefined)
  /** The initial size data of the panels when uncontrolled. */
  readonly defaultSize: InputSignal<number[] | undefined> = input<number[] | undefined>(undefined)
  /** The size constraints of the panels. */
  readonly panels: InputSignal<SplitterPanelData[]> = input.required<SplitterPanelData[]>()
  /** The number of pixels to resize the panel by when the keyboard is used. */
  readonly keyboardResizeBy: InputSignal<number | null | undefined> = input<number | null | undefined>(undefined)
  /** The nonce for the injected splitter cursor stylesheet. */
  readonly nonce: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The splitter registry to use for multi-drag support. */
  readonly registry: InputSignal<splitter.SplitterRegistry | undefined> = input<splitter.SplitterRegistry | undefined>(
    undefined,
  )

  /** Emits details when panel sizes are resized. */
  readonly resize: OutputEmitterRef<SplitterResizeDetails> = output<SplitterResizeDetails>()
  /** Emits when a resize interaction starts. */
  readonly resizeStart: OutputEmitterRef<void> = output<void>()
  /** Emits details when a resize interaction ends. */
  readonly resizeEnd: OutputEmitterRef<SplitterResizeEndDetails> = output<SplitterResizeEndDetails>()
  /** Emits when a collapsible panel is collapsed. */
  readonly collapse: OutputEmitterRef<SplitterExpandCollapseDetails> = output<SplitterExpandCollapseDetails>()
  /** Emits when a collapsible panel is expanded. */
  readonly expand: OutputEmitterRef<SplitterExpandCollapseDetails> = output<SplitterExpandCollapseDetails>()

  private readonly fallbackPanels: SplitterPanelData[] = [{ id: '__ark_splitter_a__' }, { id: '__ark_splitter_b__' }]
  private hasHydratedDefaultSize = false
  private lastResizeDetails: number[] | undefined

  private readPanels(): SplitterPanelData[] {
    try {
      return this.panels()
    } catch {
      return this.fallbackPanels
    }
  }

  private readonly machine = useSplitter({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      orientation: this.orientation(),
      size: this.size(),
      panels: this.readPanels(),
      keyboardResizeBy: this.keyboardResizeBy(),
      nonce: this.nonce(),
      registry: this.registry(),
      onResize: (details) => {
        const currentSize = this.size()
        if (currentSize !== undefined && !areNumberArraysEqual(currentSize, details.size)) {
          this.size.set([...details.size])
        }
        if (!areNumberArraysEqual(this.lastResizeDetails, details.size)) {
          this.lastResizeDetails = [...details.size]
          this.resize.emit(details)
        }
      },
      onResizeStart: () => {
        this.resizeStart.emit()
      },
      onResizeEnd: (details) => {
        this.resizeEnd.emit(details)
      },
      onCollapse: (details) => {
        this.collapse.emit(details)
      },
      onExpand: (details) => {
        this.expand.emit(details)
      },
    }),
  })

  readonly state: Signal<splitter.Service['state']> = this.machine.state
  readonly api: Signal<splitter.Api> = this.machine.api
  readonly service: splitter.Service = this.machine.service
  readonly send: splitter.Service['send'] = this.machine.send

  constructor() {
    effect(() => {
      const defaultSize = this.defaultSize()
      const panels = this.readPanels()
      if (this.hasHydratedDefaultSize || defaultSize === undefined) return
      if (panels === this.fallbackPanels) return
      this.hasHydratedDefaultSize = true
      this.api().setSizes(defaultSize)
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }
}
