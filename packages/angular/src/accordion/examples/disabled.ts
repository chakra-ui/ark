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
  selector: 'accordion-disabled-example',
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
    <div arkAccordion>
      <div arkAccordionItem value="enabled">
        <button type="button" arkAccordionItemTrigger>
          Enabled item
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>This item can be expanded.</div>
      </div>
      <div arkAccordionItem value="disabled" disabled>
        <button type="button" arkAccordionItemTrigger>
          Disabled item
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>This item cannot be expanded.</div>
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionDisabledExample {}
