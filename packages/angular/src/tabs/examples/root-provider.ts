import { ChangeDetectionStrategy, Component, computed } from '@angular/core'
import {
  ArkTabsContent,
  ArkTabsList,
  ArkTabsRootProvider,
  ArkTabsTrigger,
  useTabs,
  type UseTabsReturn,
} from '@ark-ui/angular/tabs'
import { tabsExampleStyles } from '../tabs-example-styles'

@Component({
  selector: 'tabs-root-provider-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTabsRootProvider, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
  template: `
    <div class="stack">
      <output>selected: {{ selected() }}</output>
      <div arkTabsRootProvider [value]="tabs">
        <div arkTabsList>
          <button type="button" arkTabsTrigger value="account">Account</button>
          <button type="button" arkTabsTrigger value="password">Password</button>
          <button type="button" arkTabsTrigger value="billing">Billing</button>
        </div>
        <div arkTabsContent value="account">Make changes to your account here.</div>
        <div arkTabsContent value="password">Change your password here.</div>
        <div arkTabsContent value="billing">Manage your billing and payment details.</div>
      </div>
    </div>
  `,
  styles: [tabsExampleStyles],
})
export class TabsRootProviderExample {
  readonly tabs: UseTabsReturn = useTabs({ context: () => ({ defaultValue: 'account' }) })
  readonly selected = computed(() => this.tabs.api().value ?? '')
}
