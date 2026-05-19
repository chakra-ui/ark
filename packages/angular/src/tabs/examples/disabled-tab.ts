import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkTabsContent, ArkTabsList, ArkTabsRoot, ArkTabsTrigger } from '@ark-ui/angular/tabs'
import { tabsExampleStyles } from '../tabs-example-styles'

@Component({
  selector: 'tabs-disabled-tab-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
  template: `
    <div arkTabs defaultValue="account">
      <div arkTabsList>
        <button type="button" arkTabsTrigger value="account">Account</button>
        <button type="button" arkTabsTrigger value="password" disabled>Password</button>
        <button type="button" arkTabsTrigger value="billing">Billing</button>
      </div>
      <div arkTabsContent value="account">Make changes to your account here.</div>
      <div arkTabsContent value="password">Change your password here.</div>
      <div arkTabsContent value="billing">Manage your billing and payment details.</div>
    </div>
  `,
  styles: [tabsExampleStyles],
})
export class TabsDisabledTabExample {}
