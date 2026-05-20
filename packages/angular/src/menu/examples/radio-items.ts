import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItemGroupLabel,
  ArkMenuItemIndicator,
  ArkMenuItemText,
  ArkMenuPositioner,
  ArkMenuRadioItem,
  ArkMenuRadioItemGroup,
  ArkMenuRoot,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuCheckIcon, MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-radio-items-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuRadioItemGroup,
    ArkMenuRadioItem,
    ArkMenuItemGroupLabel,
    ArkMenuItemIndicator,
    ArkMenuItemText,
    ArkPortalComponent,
    MenuCheckIcon,
    MenuChevronDownIcon,
  ],
  template: `
    <div arkMenu #root="arkMenu">
      <button type="button" arkMenuTrigger>
        Sort
        <span arkMenuIndicator>
          <menu-chevron-down-icon />
        </span>
      </button>
      <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
        <div arkMenuPositioner>
          <div arkMenuContent>
            <div arkMenuRadioItemGroup [(value)]="sortBy">
              <div arkMenuItemGroupLabel>Sort By</div>
              <div arkMenuRadioItem value="name">
                <span arkMenuItemIndicator>
                  <menu-check-icon />
                </span>
                <span arkMenuItemText value="name">Name</span>
              </div>
              <div arkMenuRadioItem value="date">
                <span arkMenuItemIndicator>
                  <menu-check-icon />
                </span>
                <span arkMenuItemText value="date">Date Modified</span>
              </div>
              <div arkMenuRadioItem value="size">
                <span arkMenuItemIndicator>
                  <menu-check-icon />
                </span>
                <span arkMenuItemText value="size">Size</span>
              </div>
              <div arkMenuRadioItem value="type">
                <span arkMenuItemIndicator>
                  <menu-check-icon />
                </span>
                <span arkMenuItemText value="type">Type</span>
              </div>
            </div>
          </div>
        </div>
      </ark-portal>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuRadioItemsExample {
  readonly sortBy = signal<string | null | undefined>('date')
}
