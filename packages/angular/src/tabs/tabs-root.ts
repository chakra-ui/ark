import type * as tabs from '@zag-js/tabs'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  Renderer2,
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
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type { TabsElementIds, TabsFocusChangeDetails, TabsIntlTranslations, TabsNavigateDetails } from './tabs.types'
import { ARK_TABS_CONTEXT, ARK_TABS_CONTEXT_CARRIER } from './use-tabs-context'
import { useTabs, type UseTabsReturn } from './use-tabs'

const optionalBooleanAttribute = (value: unknown): boolean | undefined =>
  value === undefined || value === null ? undefined : booleanAttribute(value)

@Directive({
  selector: '[arkTabs]',
  standalone: true,
  exportAs: 'arkTabs',
  providers: [
    { provide: ARK_TABS_CONTEXT, useExisting: forwardRef(() => ArkTabsRoot) },
    {
      provide: ARK_TABS_CONTEXT_CARRIER,
      useFactory: (root: ArkTabsRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkTabsRoot)],
    },
  ],
})
export class ArkTabsRoot implements UseTabsReturn {
  /** The unique identifier of the tabs. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the tabs. Useful for composition. */
  readonly ids: InputSignal<Partial<TabsElementIds> | undefined> = input<Partial<TabsElementIds> | undefined>(undefined)
  /** The controlled selected tab value. */
  readonly value: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial selected tab value when uncontrolled. */
  readonly defaultValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** The orientation of the tabs. */
  readonly orientation: InputSignal<tabs.Props['orientation']> = input<tabs.Props['orientation']>(undefined)
  /** The activation mode of the tabs. */
  readonly activationMode: InputSignal<tabs.Props['activationMode']> = input<tabs.Props['activationMode']>(undefined)
  /** Whether keyboard navigation loops from last tab to first and vice versa. */
  readonly loopFocus: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** Whether the tabs are composed with other composite widgets. */
  readonly composite: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** Whether the active tab can be deselected when clicking on it. */
  readonly deselectable: InputSignalWithTransform<boolean | undefined, unknown> = input<boolean | undefined, unknown>(
    undefined,
    { transform: optionalBooleanAttribute },
  )
  /** Whether tab content should be lazy mounted. */
  readonly lazyMount: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether tab content should be unmounted when hidden. */
  readonly unmountOnExit: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Function to navigate to the selected tab when trigger elements are anchors. */
  readonly navigate: InputSignal<tabs.Props['navigate']> = input<tabs.Props['navigate']>(undefined)
  /** Localized strings for accessibility labels. */
  readonly translations: InputSignal<TabsIntlTranslations | undefined> = input<TabsIntlTranslations | undefined>(
    undefined,
  )

  /** Emits when focus moves between tab triggers. Mirrors Zag `onFocusChange`. */
  readonly focusChange: OutputEmitterRef<TabsFocusChangeDetails> = output<TabsFocusChangeDetails>()
  /** Emits when an anchor trigger requests navigation. Mirrors Zag `navigate`. */
  readonly navigateChange: OutputEmitterRef<TabsNavigateDetails> = output<TabsNavigateDetails>()

  private readonly machine = useTabs({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      orientation: this.orientation(),
      activationMode: this.activationMode(),
      loopFocus: this.loopFocus(),
      composite: this.composite(),
      deselectable: this.deselectable(),
      lazyMount: this.lazyMount(),
      unmountOnExit: this.unmountOnExit(),
      navigate: (details) => {
        this.navigate()?.(details)
        this.navigateChange.emit(details)
      },
      translations: this.translations(),
      onValueChange: (details) => {
        if (this.value() === details.value) return
        this.value.set(details.value)
      },
      onFocusChange: (details) => {
        this.focusChange.emit(details)
      },
    }),
  })

  readonly state: Signal<tabs.Service['state']> = this.machine.state
  readonly api: Signal<tabs.Api> = this.machine.api
  readonly mountedValues: Signal<ReadonlySet<string>> = this.machine.mountedValues
  readonly service: tabs.Service = this.machine.service
  readonly send: tabs.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkTabsRoot> = buildRootCarrier<ArkTabsRoot>({
    root: this,
    rootToken: ARK_TABS_CONTEXT as ProviderToken<ArkTabsRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

  constructor() {
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  /** @internal Exposed for tabs part directives to consume via ARK_TABS_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkTabsRoot> {
    return this.arkContextCarrier
  }

  isContentUnmounted(value: string): boolean {
    return this.machine.isContentUnmounted(value)
  }
}
