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
import { AccordionChevronDownIcon } from './icons'

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
    AccordionChevronDownIcon,
  ],
  template: `
    <div class="stack">
      <output>value: {{ valueLabel() }}</output>
      <div arkAccordionRootProvider [value]="accordion">
        @for (item of items; track item.value) {
          <div arkAccordionItem [value]="item.value">
            <button type="button" arkAccordionItemTrigger>
              {{ item.title }}
              <span arkAccordionItemIndicator><accordion-chevron-down-icon /></span>
            </button>
            <div arkAccordionItemContent>
              <div class="item-body">{{ item.content }}</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionRootProviderExample {
  readonly accordion: UseAccordionReturn = runInInjectionContext(inject(Injector), () =>
    useAccordion({ context: () => ({ multiple: true, defaultValue: ['ark-ui'] }) }),
  )
  readonly items = accordionItems
  readonly valueLabel = computed(() => this.accordion.api().value.join(', ') || 'none')
}

const accordionItems = [
  {
    value: 'ark-ui',
    title: 'What is Ark UI?',
    content: 'A headless component library for building accessible web apps.',
  },
  {
    value: 'getting-started',
    title: 'How to get started?',
    content: 'Install the package and import the components you need.',
  },
  {
    value: 'maintainers',
    title: 'Who maintains this project?',
    content: 'Ark UI is maintained by the Chakra UI team.',
  },
]
