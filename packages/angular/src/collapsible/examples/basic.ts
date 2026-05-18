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
  selector: 'collapsible-basic-example',
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
        What is Ark UI?
        <span arkCollapsibleIndicator>
          <collapsible-chevron-icon />
        </span>
      </button>
      <div arkCollapsibleContent>
        Ark UI is a headless component library for building accessible, high-quality UI components for React, Solid,
        Vue, Svelte, and Angular.
      </div>
    </div>
  `,
  styles: [collapsibleExampleStyles],
})
export class CollapsibleBasicExample {}
