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
  selector: 'accordion-horizontal-example',
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
    <div arkAccordion orientation="horizontal" [defaultValue]="['one']">
      <div arkAccordionItem value="one">
        <button type="button" arkAccordionItemTrigger>
          One
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>First panel.</div>
      </div>
      <div arkAccordionItem value="two">
        <button type="button" arkAccordionItemTrigger>
          Two
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>Second panel.</div>
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionHorizontalExample {}
