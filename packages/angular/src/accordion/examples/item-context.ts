import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import {
  ArkAccordionItem,
  ArkAccordionItemContent,
  ArkAccordionItemIndicator,
  ArkAccordionItemTrigger,
  ArkAccordionRoot,
  injectArkAccordionItemContext,
} from '@ark-ui/angular/accordion'
import { accordionExampleStyles } from '../accordion-example-styles'

@Component({
  selector: 'accordion-item-state-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ label() }}
  `,
})
export class AccordionItemStateLabel {
  private readonly item = injectArkAccordionItemContext()
  readonly label = computed(() => (this.item.state().expanded ? 'open' : 'closed'))
}

@Component({
  selector: 'accordion-item-context-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkAccordionRoot,
    ArkAccordionItem,
    ArkAccordionItemTrigger,
    ArkAccordionItemContent,
    ArkAccordionItemIndicator,
    AccordionItemStateLabel,
  ],
  template: `
    <div arkAccordion collapsible>
      <div arkAccordionItem value="context">
        <button type="button" arkAccordionItemTrigger>
          Item context
          <span arkAccordionItemIndicator>+</span>
        </button>
        <div arkAccordionItemContent>
          This item is
          <accordion-item-state-label />
          .
        </div>
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionItemContextExample {}
