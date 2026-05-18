import type * as menu from '@zag-js/menu'
import {
  Directive,
  EnvironmentInjector,
  Injector,
  afterNextRender,
  type OutputEmitterRef,
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
  type Signal,
} from '@angular/core'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  MenuElementIds,
  MenuPositioningOptions,
  MenuSelectionDetails,
  MenuTriggerValueChangeDetails,
} from './menu.types'
import { ARK_MENU_CONTEXT, ARK_MENU_CONTEXT_CARRIER } from './use-menu-context'
import { useMenu, type UseMenuReturn } from './use-menu'

@Directive({
  selector: '[arkMenu]',
  standalone: true,
  exportAs: 'arkMenu',
  providers: [
    { provide: ARK_MENU_CONTEXT, useExisting: forwardRef(() => ArkMenuRoot) },
    {
      provide: ARK_MENU_CONTEXT_CARRIER,
      useFactory: (root: ArkMenuRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkMenuRoot)],
    },
  ],
})
export class ArkMenuRoot implements UseMenuReturn {
  /** The unique identifier of the menu. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the menu. Useful for composition. */
  readonly ids: InputSignal<Partial<MenuElementIds> | undefined> = input<Partial<MenuElementIds> | undefined>(undefined)
  /** The controlled open state of the menu. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state of the menu when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled highlighted value of the menu item. */
  readonly highlightedValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial highlighted value when uncontrolled. */
  readonly defaultHighlightedValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** Whether to loop the keyboard navigation. */
  readonly loopFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to close the menu when an option is selected. */
  readonly closeOnSelect: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Whether the pressing printable characters should trigger typeahead navigation. */
  readonly typeahead: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** Whether the menu is composed with other composite widgets. */
  readonly composite: InputSignal<boolean | undefined> = input<boolean | undefined>(undefined)
  /** The positioning options for the menu content. */
  readonly positioning: InputSignal<MenuPositioningOptions | undefined> = input<MenuPositioningOptions | undefined>(
    undefined,
  )
  /** The accessibility label for the menu. */
  readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'aria-label' })
  /** Optional anchor point used when opening the menu (e.g. context menus). */
  readonly anchorPoint: InputSignal<menu.Props['anchorPoint']> = input<menu.Props['anchorPoint']>(undefined)
  /** Function to navigate to the selected item if it's an anchor element. */
  readonly navigate: InputSignal<menu.Props['navigate']> = input<menu.Props['navigate']>(undefined)
  /** The controlled trigger value. */
  readonly triggerValue: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The default trigger value when uncontrolled. */
  readonly defaultTriggerValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)

  /** Fired when a menu item is selected. Mirrors Zag `onSelect`. */
  readonly select: OutputEmitterRef<MenuSelectionDetails> = output<MenuSelectionDetails>()

  private readonly machine = useMenu({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      open: this.open(),
      defaultOpen: this.defaultOpen(),
      highlightedValue: this.highlightedValue(),
      defaultHighlightedValue: this.defaultHighlightedValue(),
      loopFocus: this.loopFocus(),
      closeOnSelect: this.closeOnSelect(),
      typeahead: this.typeahead(),
      composite: this.composite(),
      positioning: this.positioning(),
      'aria-label': this.ariaLabel(),
      anchorPoint: this.anchorPoint(),
      navigate: this.navigate(),
      triggerValue: this.triggerValue(),
      defaultTriggerValue: this.defaultTriggerValue(),
      onOpenChange: (details) => {
        if (this.open() === details.open) return
        this.open.set(details.open)
      },
      onHighlightChange: (details) => {
        if (this.highlightedValue() === details.highlightedValue) return
        this.highlightedValue.set(details.highlightedValue)
      },
      onSelect: (details) => {
        this.select.emit(details)
      },
      onTriggerValueChange: (details: MenuTriggerValueChangeDetails) => {
        if (this.triggerValue() === details.value) return
        this.triggerValue.set(details.value)
      },
    }),
  })

  readonly state: Signal<menu.Service['state']> = this.machine.state
  readonly api: Signal<menu.Api> = this.machine.api
  readonly service: menu.Service = this.machine.service
  readonly send: menu.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkMenuRoot> = buildRootCarrier<ArkMenuRoot>({
    root: this,
    rootToken: ARK_MENU_CONTEXT as ProviderToken<ArkMenuRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  /** @internal Parent menu context (when nested). Resolved at construction. */
  protected readonly parentMenu: UseMenuReturn | null = inject(ARK_MENU_CONTEXT, {
    optional: true,
    skipSelf: true,
  })

  constructor() {
    const parent = this.parentMenu
    if (parent) {
      afterNextRender(() => {
        parent.api().setChild(this.machine.service)
        this.machine.api().setParent(parent.service)
      })
    }
  }

  /** @internal Exposed for menu part directives to consume via ARK_MENU_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkMenuRoot> {
    return this.arkContextCarrier
  }
}
