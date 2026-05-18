import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import {
  ArkMenuContent,
  ArkMenuItem,
  ArkMenuPositioner,
  ArkMenuRootProvider,
  useMenu,
  type UseMenuReturn,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { menuExampleStyles } from '../menu-example-styles'

@Component({
  selector: 'menu-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkMenuRootProvider, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkPortalComponent],
  template: `
    <div class="stack">
      <button type="button" (click)="menu.send({ type: 'OPEN' })">Menu is {{ openLabel() }}</button>
      <div arkMenuRootProvider [value]="menu" #provider="arkMenuRootProvider">
        <ark-portal [originInjector]="provider.getContextCarrier().elementInjector">
          <div arkMenuPositioner>
            <div arkMenuContent>
              <div arkMenuItem value="settings">Settings</div>
              <div arkMenuItem value="help">Help</div>
            </div>
          </div>
        </ark-portal>
      </div>
    </div>
  `,
  styles: [menuExampleStyles],
})
export class MenuRootProviderExample {
  readonly menu: UseMenuReturn = useMenu({ context: () => ({}) })
  readonly openLabel = computed(() => (this.menu.api().open ? 'open' : 'closed'))
}
