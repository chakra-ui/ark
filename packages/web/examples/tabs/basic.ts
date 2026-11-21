import '../../src/components/tabs/index.js'

import styles from 'styles/tabs.module.css'

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-tabs class="${styles.Root}" default-value="account" >
    <ark-tabs-list class="${styles.List}">
      
        <ark-tabs-trigger value="account" >
          <button class="${styles.Trigger}">Account</button>
        </ark-tabs-trigger>
        <ark-tabs-trigger value="password" >
          <button class="${styles.Trigger}">Password</button>
        </ark-tabs-trigger>
        <ark-tabs-trigger value="billing" >
          <button class="${styles.Trigger}">Billing</button>
        </ark-tabs-trigger>
      
    </ark-tabs-list>
    <ark-tabs-content class="${styles.Content}" value="account">Make changes to your account here.</ark-tabs-content><ark-tabs-content class="${styles.Content}" value="password">Change your password here.</ark-tabs-content><ark-tabs-content class="${styles.Content}" value="billing">Manage your billing and payment details.</ark-tabs-content>
  </ark-tabs>`
}
