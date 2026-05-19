import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ArkTabsContent, ArkTabsIndicator, ArkTabsList, ArkTabsRoot, ArkTabsTrigger } from '@ark-ui/angular/tabs'
import { tabsExampleStyles } from '../tabs-example-styles'

@Component({
  selector: 'tabs-lazy-mount-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent, ArkTabsIndicator],
  template: `
    <div arkTabs lazyMount unmountOnExit defaultValue="account" #tabs="arkTabs">
      <div arkTabsList>
        <button type="button" arkTabsTrigger value="account">Account</button>
        <button type="button" arkTabsTrigger value="password">Password</button>
        <button type="button" arkTabsTrigger value="billing">Billing</button>
        <div arkTabsIndicator></div>
      </div>
      @if (!tabs.isContentUnmounted('account')) {
        <div arkTabsContent value="account">Make changes to your account here.</div>
      }
      @if (!tabs.isContentUnmounted('password')) {
        <div arkTabsContent value="password">Change your password here.</div>
      }
      @if (!tabs.isContentUnmounted('billing')) {
        <div arkTabsContent value="billing">Manage your billing and payment details.</div>
      }
    </div>
  `,
  styles: [tabsExampleStyles],
})
export class TabsLazyMountExample {}
