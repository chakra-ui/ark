import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRoot,
  ArkMenuTrigger,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'
import { MenuChevronDownIcon } from './icons'

@Component({
  selector: 'menu-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkMenuRoot,
    ArkMenuTrigger,
    ArkMenuIndicator,
    ArkMenuPositioner,
    ArkMenuContent,
    ArkMenuItem,
    ArkPortalComponent,
    MenuChevronDownIcon,
  ],
  template: `
    <div class="stack">
      <button type="button" (click)="toggle()">Toggle</button>
      <div arkMenu #root="arkMenu" [(open)]="open">
        <button type="button" arkMenuTrigger>
          Actions
          <span arkMenuIndicator>
            <menu-chevron-down-icon />
          </span>
        </button>
        <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
          <div arkMenuPositioner>
            <div arkMenuContent>
              <div arkMenuItem value="edit">Edit</div>
              <div arkMenuItem value="duplicate">Duplicate</div>
              <div arkMenuItem value="archive">Archive</div>
              <div arkMenuItem value="delete">Delete</div>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuControlledExample {
  readonly open = signal<boolean | undefined>(false)

  toggle(): void {
    this.open.set(!this.open())
  }
}
