import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkAccordionItem,
  ArkAccordionItemContent,
  ArkAccordionItemIndicator,
  ArkAccordionItemTrigger,
  ArkAccordionRoot,
} from '@ark-ui/angular/accordion'
import { accordionExampleStyles } from '../accordion-example-styles'

@Component({
  selector: 'accordion-multiple-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkAccordionRoot,
    ArkAccordionItem,
    ArkAccordionItemTrigger,
    ArkAccordionItemContent,
    ArkAccordionItemIndicator,
  ],
  template: `
    <div arkAccordion multiple [defaultValue]="['shipping', 'returns']">
      <div arkAccordionItem value="shipping">
        <button type="button" arkAccordionItemTrigger>
          Shipping
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>Standard delivery arrives in three to five business days.</div>
      </div>
      <div arkAccordionItem value="returns">
        <button type="button" arkAccordionItemTrigger>
          Returns
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>Unused items can be returned within 30 days.</div>
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionMultipleExample {}
