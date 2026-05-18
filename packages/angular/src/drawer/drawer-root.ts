import type * as drawer from '@zag-js/drawer'
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
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  DrawerElementIds,
  DrawerSnapPoint,
  DrawerSnapPointChangeDetails,
  DrawerStack,
  DrawerSwipeDirection,
  DrawerTriggerValueChangeDetails,
} from './drawer.types'
import { ARK_DRAWER_CONTEXT, ARK_DRAWER_CONTEXT_CARRIER } from './use-drawer-context'
import { useDrawer, type UseDrawerReturn } from './use-drawer'

@Directive({
  selector: '[arkDrawer]',
  standalone: true,
  exportAs: 'arkDrawer',
  providers: [
    { provide: ARK_DRAWER_CONTEXT, useExisting: forwardRef(() => ArkDrawerRoot) },
    {
      provide: ARK_DRAWER_CONTEXT_CARRIER,
      useFactory: (root: ArkDrawerRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkDrawerRoot)],
    },
  ],
})
export class ArkDrawerRoot implements UseDrawerReturn {
  /** The unique identifier of the drawer. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the drawer. Useful for composition. */
  readonly ids: InputSignal<Partial<DrawerElementIds> | undefined> = input<Partial<DrawerElementIds> | undefined>(
    undefined,
  )
  /** The controlled open state of the drawer. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the drawer when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the drawer renders as a modal overlay. */
  readonly modal: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to close the drawer when the outside is clicked. */
  readonly closeOnInteractOutside: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** Whether to close the drawer when the escape key is pressed. */
  readonly closeOnEscape: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to prevent scrolling behind the drawer when it's opened. */
  readonly preventScroll: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to trap focus inside the drawer when it's opened. */
  readonly trapFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to restore focus to the element that had focus before the drawer was opened. */
  readonly restoreFocus: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Element to receive focus when the drawer is opened. */
  readonly initialFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** Element to receive focus when the drawer is closed. */
  readonly finalFocusEl: InputSignal<(() => HTMLElement | null) | undefined> = input<
    (() => HTMLElement | null) | undefined
  >(undefined)
  /** The drawer's role. */
  readonly role: InputSignal<'dialog' | 'alertdialog' | undefined> = input<'dialog' | 'alertdialog' | undefined>(
    undefined,
  )
  /** The value of the trigger that currently controls the drawer. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The default trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** The snap points of the drawer. */
  readonly snapPoints: InputSignal<DrawerSnapPoint[] | undefined> = input<DrawerSnapPoint[] | undefined>(undefined)
  /** The direction in which the drawer can be swiped. */
  readonly swipeDirection: InputSignal<DrawerSwipeDirection | undefined> = input<DrawerSwipeDirection | undefined>(
    undefined,
  )
  /** Whether the drawer should snap to sequential points when swiping. */
  readonly snapToSequentialPoints: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** The threshold velocity (in pixels/s) for closing the drawer. */
  readonly swipeVelocityThreshold: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The threshold distance for dismissing the drawer. */
  readonly closeThreshold: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** Whether to prevent dragging on scrollable elements. */
  readonly preventDragOnScroll: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** The currently active snap point. */
  readonly snapPoint: ModelSignal<DrawerSnapPoint | null | undefined> = model<DrawerSnapPoint | null | undefined>(
    undefined,
  )
  /** The default snap point of the drawer when uncontrolled. */
  readonly defaultSnapPoint: InputSignal<DrawerSnapPoint | null | undefined> = input<
    DrawerSnapPoint | null | undefined
  >(undefined)
  /** Optional external store for coordinating app-level drawer stack visuals. */
  readonly stack: InputSignal<DrawerStack | undefined> = input<DrawerStack | undefined>(undefined)

  private readonly machine = useDrawer({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      modal: this.modal(),
      closeOnInteractOutside: this.closeOnInteractOutside(),
      closeOnEscape: this.closeOnEscape(),
      preventScroll: this.preventScroll(),
      trapFocus: this.trapFocus(),
      restoreFocus: this.restoreFocus(),
      initialFocusEl: this.initialFocusEl(),
      finalFocusEl: this.finalFocusEl(),
      role: this.role(),
      triggerValue: this.triggerValue(),
      defaultTriggerValue: this.defaultTriggerValue(),
      snapPoints: this.snapPoints(),
      swipeDirection: this.swipeDirection(),
      snapToSequentialPoints: this.snapToSequentialPoints(),
      swipeVelocityThreshold: this.swipeVelocityThreshold(),
      closeThreshold: this.closeThreshold(),
      preventDragOnScroll: this.preventDragOnScroll(),
      snapPoint: this.snapPoint(),
      defaultSnapPoint: this.defaultSnapPoint(),
      stack: this.stack(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
      onTriggerValueChange: (details: DrawerTriggerValueChangeDetails) => {
        if (this.triggerValue() === details.value) return
        this.triggerValue.set(details.value)
      },
      onSnapPointChange: (details: DrawerSnapPointChangeDetails) => {
        if (this.snapPoint() === details.snapPoint) return
        this.snapPoint.set(details.snapPoint)
      },
    }),
  })

  readonly state: Signal<drawer.Service['state']> = this.machine.state
  readonly api: Signal<drawer.Api> = this.machine.api
  readonly service: drawer.Service = this.machine.service
  readonly send: drawer.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkDrawerRoot> = buildRootCarrier<ArkDrawerRoot>({
    root: this,
    rootToken: ARK_DRAWER_CONTEXT as ProviderToken<ArkDrawerRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Exposed for drawer part directives to consume via ARK_DRAWER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkDrawerRoot> {
    return this.arkContextCarrier
  }
}
