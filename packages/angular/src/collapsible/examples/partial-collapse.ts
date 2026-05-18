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
        <p>
          Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid,
          Vue, Svelte, and Angular.
        </p>
        <p>
          Built on top of Zag.js state machines, Ark UI ensures consistent behavior across all frameworks while giving
          you complete control over styling.
        </p>
      </div>
    </div>
  `,
  styles: [collapsibleExampleStyles],
})
export class CollapsiblePartialCollapseExample {}
