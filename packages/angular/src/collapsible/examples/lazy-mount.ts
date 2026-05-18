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
  selector: 'collapsible-lazy-mount-example',
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
    <div arkCollapsible #collapsible="arkCollapsible">
      <button type="button" arkCollapsibleTrigger>
        Session Details
        <span arkCollapsibleIndicator>
          <collapsible-chevron-icon />
        </span>
      </button>
      @if (collapsible.api().visible) {
        <div arkCollapsibleContent>
          This content is lazily mounted when first opened and removed from the DOM when collapsed.
        </div>
      }
    </div>
  `,
  styles: [collapsibleExampleStyles],
})
export class CollapsibleLazyMountExample {}
