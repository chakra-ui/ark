import { ChangeDetectionStrategy, Component, computed, runInInjectionContext, inject, Injector } from '@angular/core'
import {
  ArkCollapsibleContent,
  ArkCollapsibleIndicator,
  ArkCollapsibleRootProvider,
  ArkCollapsibleTrigger,
  useCollapsible,
  type UseCollapsibleReturn,
} from '@ark-ui/angular/collapsible'
import { collapsibleExampleStyles } from '../collapsible-example-styles'
import { CollapsibleChevronIcon } from './icons'

@Component({
  selector: 'collapsible-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCollapsibleRootProvider,
    ArkCollapsibleTrigger,
    ArkCollapsibleContent,
    ArkCollapsibleIndicator,
    CollapsibleChevronIcon,
  ],
  template: `
    <div class="stack">
      <output>collapsible: {{ openLabel() }}, visible: {{ visibleLabel() }}</output>
      <div arkCollapsibleRootProvider [value]="collapsible">
        <button type="button" arkCollapsibleTrigger>
          Toggle Panel
          <span arkCollapsibleIndicator>
            <collapsible-chevron-icon />
          </span>
        </button>
        <div arkCollapsibleContent>
          <div class="collapsible-body">
            This panel can be toggled by the button above, which uses the useCollapsible hook for state management.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [collapsibleExampleStyles],
})
export class CollapsibleRootProviderExample {
  readonly collapsible: UseCollapsibleReturn = runInInjectionContext(inject(Injector), () =>
    useCollapsible({ context: () => ({}) }),
  )
  readonly openLabel = computed(() => String(this.collapsible.api().open))
  readonly visibleLabel = computed(() => String(this.collapsible.api().visible))
}
