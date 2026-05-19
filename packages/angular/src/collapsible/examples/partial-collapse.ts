import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  ArkCollapsibleContent,
  ArkCollapsibleIndicator,
  ArkCollapsibleRoot,
  ArkCollapsibleTrigger,
} from '@ark-ui/angular/collapsible'
import { collapsibleExampleStyles } from '../collapsible-example-styles'
import { CollapsibleChevronIcon } from './icons'

@Component({
  selector: 'collapsible-partial-collapse-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkCollapsibleRoot,
    ArkCollapsibleTrigger,
    ArkCollapsibleContent,
    ArkCollapsibleIndicator,
    CollapsibleChevronIcon,
  ],
  template: `
    <div arkCollapsible collapsedHeight="100px">
      <button type="button" arkCollapsibleTrigger>
        Read More
        <span arkCollapsibleIndicator>
          <collapsible-chevron-icon />
        </span>
      </button>
      <div arkCollapsibleContent>
        <div class="collapsible-body">
          <p>
            Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid,
            Vue, and Svelte. It provides unstyled, fully accessible components that you can customize to match your
            design system.
          </p>
          <p>
            Built on top of Zag.js state machines, Ark UI ensures consistent behavior across all frameworks while giving
            you complete control over styling. Each component follows WAI-ARIA patterns for accessibility out of the
            box.
          </p>
          <p>
            Whether you're building a design system from scratch or need reliable primitives for your next project, Ark
            UI provides the foundation you need without imposing any visual constraints.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [collapsibleExampleStyles],
})
export class CollapsiblePartialCollapseExample {}
