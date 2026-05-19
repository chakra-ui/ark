import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkAccordionItem,
  ArkAccordionItemContent,
  ArkAccordionItemTrigger,
  ArkAccordionRoot,
} from '@ark-ui/angular/accordion'
import { accordionExampleStyles } from '../accordion-example-styles'

@Component({
  selector: 'accordion-horizontal-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger, ArkAccordionItemContent],
  template: `
    <div arkAccordion orientation="horizontal" [defaultValue]="['ark-ui']">
      @for (item of items; track item.value) {
        <div arkAccordionItem [value]="item.value">
          <button type="button" arkAccordionItemTrigger>{{ item.title }}</button>
          <div arkAccordionItemContent>
            <div class="item-body centered">{{ item.content }}</div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionHorizontalExample {
  readonly items = accordionItems
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
