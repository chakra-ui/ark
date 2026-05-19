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
  selector: 'collapsible-nested-example',
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
    <div arkCollapsible>
      <button type="button" arkCollapsibleTrigger>
        Getting Started
        <span arkCollapsibleIndicator>
          <collapsible-chevron-icon />
        </span>
      </button>
      <div arkCollapsibleContent>
        <div class="collapsible-body">
          <p>Welcome to the Ark UI documentation. Here are some topics to explore:</p>

          <div arkCollapsible class="collapsible-nested">
            <button type="button" arkCollapsibleTrigger>
              Installation
              <span arkCollapsibleIndicator>
                <collapsible-chevron-icon />
              </span>
            </button>
            <div arkCollapsibleContent>
              <div class="collapsible-body">
                <p>Install Ark UI using your preferred package manager:</p>
                <code>npm install @ark-ui/angular</code>
              </div>
            </div>
          </div>

          <div arkCollapsible class="collapsible-nested">
            <button type="button" arkCollapsibleTrigger>
              Styling
              <span arkCollapsibleIndicator>
                <collapsible-chevron-icon />
              </span>
            </button>
            <div arkCollapsibleContent>
              <div class="collapsible-body">
                <p>Ark UI components are unstyled by default. Use CSS modules, Tailwind, or any styling solution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [collapsibleExampleStyles],
})
export class CollapsibleNestedExample {}
