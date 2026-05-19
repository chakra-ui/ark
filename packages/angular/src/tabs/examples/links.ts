import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkTabsContent, ArkTabsList, ArkTabsRoot, ArkTabsTrigger } from '@ark-ui/angular/tabs'
import { tabsExampleStyles } from '../tabs-example-styles'

@Component({
  selector: 'tabs-links-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
  template: `
    <div arkTabs defaultValue="account">
      <div arkTabsList>
        <a arkTabsTrigger value="account" href="#account">Account</a>
        <a arkTabsTrigger value="password" href="#password">Password</a>
        <a arkTabsTrigger value="billing" href="#billing">Billing</a>
      </div>
      <div arkTabsContent value="account" id="account">Make changes to your account here.</div>
      <div arkTabsContent value="password" id="password">Change your password here.</div>
      <div arkTabsContent value="billing" id="billing">Manage your billing and payment details.</div>
    </div>
  `,
  styles: [tabsExampleStyles],
})
export class TabsLinksExample {}
