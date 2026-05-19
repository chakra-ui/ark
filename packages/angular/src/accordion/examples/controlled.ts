import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  ArkAccordionItem,
  ArkAccordionItemContent,
  ArkAccordionItemIndicator,
  ArkAccordionItemTrigger,
  ArkAccordionRoot,
} from '@ark-ui/angular/accordion'
import { accordionExampleStyles } from '../accordion-example-styles'

@Component({
  selector: 'accordion-controlled-example',
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
    <div class="stack">
      <output>value: {{ valueLabel() }}</output>
      <div arkAccordion [(value)]="value">
        <div arkAccordionItem value="details">
          <button type="button" arkAccordionItemTrigger>
            Details
            <span arkAccordionItemIndicator>+</span>
          </button>
          <div arkAccordionItemContent>The selected value is owned by the host component.</div>
        </div>
        <div arkAccordionItem value="settings">
          <button type="button" arkAccordionItemTrigger>
            Settings
            <span arkAccordionItemIndicator>+</span>
          </button>
          <div arkAccordionItemContent>Two-way binding keeps the machine and signal in sync.</div>
        </div>
      </div>
    </div>
  `,
  styles: [accordionExampleStyles],
})
export class AccordionControlledExample {
  readonly value = signal<string[] | undefined>(['details'])
  readonly valueLabel = computed(() => this.value()?.join(', ') || 'none')
}
