import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { ArkTabsContent, ArkTabsList, ArkTabsRoot, ArkTabsTrigger } from '@ark-ui/angular/tabs'
import { tabsExampleStyles } from '../tabs-example-styles'

@Component({
  selector: 'tabs-controlled-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
  template: `
    <div class="stack">
      <output>selected: {{ value() }}</output>
      <div arkTabs [(value)]="value">
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
export class TabsControlledExample {
  readonly value = signal<string | null>('account')
}
