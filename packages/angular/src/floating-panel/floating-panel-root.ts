import type * as floatingPanel from '@zag-js/floating-panel'
import {
  Directive,
  EnvironmentInjector,
  Injector,
  type ProviderToken,
  booleanAttribute,
  forwardRef,
  inject,
  input,
  model,
  output,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  FloatingPanelAnchorPositionDetails,
  FloatingPanelElementIds,
  FloatingPanelIntlTranslations,
  FloatingPanelPoint,
  FloatingPanelPositionChangeDetails,
  FloatingPanelSize,
  FloatingPanelSizeChangeDetails,
  FloatingPanelStageChangeDetails,
} from './floating-panel.types'
import { ARK_FLOATING_PANEL_CONTEXT, ARK_FLOATING_PANEL_CONTEXT_CARRIER } from './use-floating-panel-context'
import { useFloatingPanel, type UseFloatingPanelReturn } from './use-floating-panel'

const arePointsEqual = (left: FloatingPanelPoint | undefined, right: FloatingPanelPoint): boolean =>
  left !== undefined && Object.is(left.x, right.x) && Object.is(left.y, right.y)

const areSizesEqual = (left: FloatingPanelSize | undefined, right: FloatingPanelSize): boolean =>
  left !== undefined && Object.is(left.width, right.width) && Object.is(left.height, right.height)

@Directive({
  selector: '[arkFloatingPanel]',
  standalone: true,
  exportAs: 'arkFloatingPanel',
  providers: [
    { provide: ARK_FLOATING_PANEL_CONTEXT, useExisting: forwardRef(() => ArkFloatingPanelRoot) },
    {
      provide: ARK_FLOATING_PANEL_CONTEXT_CARRIER,
      useFactory: (root: ArkFloatingPanelRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkFloatingPanelRoot)],
    },
  ],
})
export class ArkFloatingPanelRoot implements UseFloatingPanelReturn {
  /** The unique identifier of the floating panel. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the floating panel elements. Useful for composition. */
  readonly ids: InputSignal<Partial<FloatingPanelElementIds> | undefined> = input<
    Partial<FloatingPanelElementIds> | undefined
  >(undefined)
  /** The controlled open state of the floating panel. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the floating panel when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled position of the floating panel. */
  readonly position: ModelSignal<FloatingPanelPoint | undefined> = model<FloatingPanelPoint | undefined>(undefined)
  /** The initial position of the floating panel when uncontrolled. */
  readonly defaultPosition: InputSignal<FloatingPanelPoint | undefined> = input<FloatingPanelPoint | undefined>(
    undefined,
  )
  /** The controlled size of the floating panel. */
  readonly size: ModelSignal<FloatingPanelSize | undefined> = model<FloatingPanelSize | undefined>(undefined)
  /** The initial size of the floating panel when uncontrolled. */
  readonly defaultSize: InputSignal<FloatingPanelSize | undefined> = input<FloatingPanelSize | undefined>(undefined)
  /** The minimum size of the floating panel. */
  readonly minSize: InputSignal<FloatingPanelSize | undefined> = input<FloatingPanelSize | undefined>(undefined)
  /** The maximum size of the floating panel. */
  readonly maxSize: InputSignal<FloatingPanelSize | undefined> = input<FloatingPanelSize | undefined>(undefined)
  /** The positioning strategy to use. */
  readonly strategy: InputSignal<floatingPanel.Props['strategy']> = input<floatingPanel.Props['strategy']>(undefined)
  /** Whether the panel may overflow the boundary while dragging. */
  readonly allowOverflow: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether the floating panel is draggable. */
  readonly draggable: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether the floating panel is resizable. */
  readonly resizable: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether resizing locks the panel to its aspect ratio. */
  readonly lockAspectRatio: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the floating panel closes when the escape key is pressed. */
  readonly closeOnEscape: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether focus should be restored when the floating panel closes. */
  readonly restoreFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether the floating panel is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether size and position should be preserved when the floating panel closes. */
  readonly persistRect: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The snap grid for dragging and keyboard movement. */
  readonly gridSize: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Localized strings for control labels. */
  readonly translations: InputSignal<FloatingPanelIntlTranslations | undefined> = input<
    FloatingPanelIntlTranslations | undefined
  >(undefined)
  /** Function that returns the initial panel position when opened. */
  readonly getAnchorPosition: InputSignal<
    ((details: FloatingPanelAnchorPositionDetails) => FloatingPanelPoint) | undefined
  > = input<((details: FloatingPanelAnchorPositionDetails) => FloatingPanelPoint) | undefined>(undefined)
  /** Function that returns the boundary element for dragging and resizing. */
  readonly getBoundaryEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** Element to receive focus when the floating panel opens. */
  readonly initialFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** Element to receive focus when the floating panel closes. */
  readonly finalFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)

  /** Emits details when the panel position changes via dragging or API calls. */
  readonly positionDetailsChange: OutputEmitterRef<FloatingPanelPositionChangeDetails> =
    output<FloatingPanelPositionChangeDetails>()
  /** Emits details when a position-changing drag interaction ends. */
  readonly positionChangeEnd: OutputEmitterRef<FloatingPanelPositionChangeDetails> =
    output<FloatingPanelPositionChangeDetails>()
  /** Emits details when the panel size changes via resizing or API calls. */
  readonly sizeDetailsChange: OutputEmitterRef<FloatingPanelSizeChangeDetails> =
    output<FloatingPanelSizeChangeDetails>()
  /** Emits details when a size-changing resize interaction ends. */
  readonly sizeChangeEnd: OutputEmitterRef<FloatingPanelSizeChangeDetails> = output<FloatingPanelSizeChangeDetails>()
  /** Emits details when the panel stage changes. */
  readonly stageChange: OutputEmitterRef<FloatingPanelStageChangeDetails> = output<FloatingPanelStageChangeDetails>()

  private lastPositionDetails: FloatingPanelPoint | undefined
  private lastSizeDetails: FloatingPanelSize | undefined
  private lastPositionEndDetails: FloatingPanelPoint | undefined
  private lastSizeEndDetails: FloatingPanelSize | undefined
  private lastStageDetails: FloatingPanelStageChangeDetails['stage'] | undefined

  private readonly machine = useFloatingPanel({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      position: this.position(),
      defaultPosition: this.defaultPosition(),
      size: this.size(),
      defaultSize: this.defaultSize(),
      minSize: this.minSize(),
      maxSize: this.maxSize(),
      strategy: this.strategy(),
      allowOverflow: this.allowOverflow(),
      draggable: this.draggable(),
      resizable: this.resizable(),
      lockAspectRatio: this.lockAspectRatio(),
      closeOnEscape: this.closeOnEscape(),
      restoreFocus: this.restoreFocus(),
      disabled: this.disabled(),
      persistRect: this.persistRect(),
      gridSize: this.gridSize(),
      translations: this.translations(),
      getAnchorPosition: this.getAnchorPosition(),
      getBoundaryEl: this.getBoundaryEl(),
      initialFocusEl: this.initialFocusEl(),
      finalFocusEl: this.finalFocusEl(),
      onOpenChange: (details) => {
        if (this.open() !== undefined && this.open() !== details.open) {
          this.open.set(details.open)
        }
      },
      onPositionChange: (details) => {
        if (arePointsEqual(this.lastPositionDetails, details.position)) return
        this.lastPositionDetails = { ...details.position }
        if (this.position() !== undefined && !arePointsEqual(this.position(), details.position)) {
          this.position.set({ ...details.position })
        }
        this.positionDetailsChange.emit(details)
      },
      onPositionChangeEnd: (details) => {
        if (arePointsEqual(this.lastPositionEndDetails, details.position)) return
        this.lastPositionEndDetails = { ...details.position }
        this.positionChangeEnd.emit(details)
      },
      onSizeChange: (details) => {
        if (areSizesEqual(this.lastSizeDetails, details.size)) return
        this.lastSizeDetails = { ...details.size }
        if (this.size() !== undefined && !areSizesEqual(this.size(), details.size)) {
          this.size.set({ ...details.size })
        }
        this.sizeDetailsChange.emit(details)
      },
      onSizeChangeEnd: (details) => {
        if (areSizesEqual(this.lastSizeEndDetails, details.size)) return
        this.lastSizeEndDetails = { ...details.size }
        this.sizeChangeEnd.emit(details)
      },
      onStageChange: (details) => {
        if (this.lastStageDetails === details.stage) return
        this.lastStageDetails = details.stage
        this.stageChange.emit(details)
      },
    }),
  })

  readonly state: Signal<floatingPanel.Service['state']> = this.machine.state
  readonly api: Signal<floatingPanel.Api> = this.machine.api
  readonly service: floatingPanel.Service = this.machine.service
  readonly send: floatingPanel.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkFloatingPanelRoot> =
    buildRootCarrier<ArkFloatingPanelRoot>({
      root: this,
      rootToken: ARK_FLOATING_PANEL_CONTEXT as ProviderToken<ArkFloatingPanelRoot>,
      originInjector: inject(Injector),
      environmentInjector: inject(EnvironmentInjector),
    })

  /** @internal Exposed for floating panel part directives to consume through ArkPortalComponent. */
  getContextCarrier(): ArkContextCarrier<ArkFloatingPanelRoot> {
    return this.arkContextCarrier
  }
}
