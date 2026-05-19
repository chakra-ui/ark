import { ChangeDetectionStrategy, Component, Injector, computed, inject, runInInjectionContext } from '@angular/core'
import {
  ArkAccordionItem,
  ArkAccordionItemContent,
  ArkAccordionItemIndicator,
  ArkAccordionItemTrigger,
  ArkAccordionRootProvider,
  useAccordion,
  type UseAccordionReturn,
} from '@ark-ui/angular/accordion'
import { accordionExampleStyles } from '../accordion-example-styles'

@Component({
  selector: 'accordion-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkAccordionRootProvider,
    ArkAccordionItem,
    ArkAccordionItemTrigger,
    ArkAccordionItemContent,
    ArkAccordionItemIndicator,
  ],
  template: `
    <div class="stack">
      <output>value: {{ valueLabel() }}</output>
      <div arkAccordionRootProvider [value]="accordion">
        <div arkAccordionItem value="provider">
          <button type="button" arkAccordionItemTrigger>
            Root provider
            <span arkAccordionItemIndicator>+</span>
          </button>
          <div arkAccordionItemContent>The directives read from an externally created accordion machine.</div>
        </div>
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionRootProviderExample {
  readonly accordion: UseAccordionReturn = runInInjectionContext(inject(Injector), () =>
    useAccordion({ context: () => ({}) }),
  )
  readonly valueLabel = computed(() => this.accordion.api().value.join(', ') || 'none')
}
