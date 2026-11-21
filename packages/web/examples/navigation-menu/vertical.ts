import {
  Accessibility,
  ChevronDown,
  Clapperboard,
  createElement,
  Layers,
  ListChecks,
  Palette,
  Rocket,
  Sparkles,
} from 'lucide'

import '@ark-ui/web/navigation-menu'

import styles from 'styles/navigation-menu.module.css'

type Icon = typeof Rocket

const icon = (node: Icon) => createElement(node, { 'aria-hidden': 'true' }).outerHTML

const overviewSections = [
  {
    label: 'Get started',
    links: [
      { href: '#quick-start', title: 'Quick Start', description: 'Install and assemble', icon: Rocket },
      { href: '#styling', title: 'Styling', description: 'CSS, CSS-in-JS, or utilities', icon: Palette },
    ],
  },
  {
    label: 'Learn',
    links: [
      { href: '#accessibility', title: 'Accessibility', description: 'Keyboard and ARIA support', icon: Accessibility },
      { href: '#releases', title: 'Releases', description: "What's new in Ark UI", icon: Sparkles },
    ],
  },
]

const guideLinks = [
  { href: '#animation', title: 'Animation', description: 'CSS or JavaScript', icon: Clapperboard },
  { href: '#composition', title: 'Composition', description: 'Replace and compose parts', icon: Layers },
  { href: '#forms', title: 'Forms', description: 'Native and library forms', icon: ListChecks },
]

const linkCard = (item: { href: string; title: string; description: string; icon: Icon }) => /* html */ `
  <ark-navigation-menu-link>
    <a class="${styles.LinkCard}" href="${item.href}">
      <span class="${styles.LinkIcon}">${icon(item.icon)}</span>
      <span class="${styles.LinkCopy}">
        <span class="${styles.LinkTitle}">${item.title}</span>
        <span class="${styles.LinkDescription}">${item.description}</span>
      </span>
    </a>
  </ark-navigation-menu-link>`

const trigger = (label: string) => /* html */ `
  <ark-navigation-menu-trigger>
    <button class="${styles.Trigger}">
      ${label}
      <span class="${styles.TriggerIcon}">${icon(ChevronDown)}</span>
    </button>
  </ark-navigation-menu-trigger>`

const items = () => /* html */ `
  <ark-navigation-menu-item class="${styles.Item}" value="overview">
    ${trigger('Overview')}
    <ark-navigation-menu-content class="${styles.Content}">
      <div class="${styles.MenuColumns}">
        ${overviewSections
          .map(
            (section) => /* html */ `
        <div class="${styles.MenuSection}">
          <span class="${styles.MenuLabel}">${section.label}</span>
          ${section.links.map(linkCard).join('')}
        </div>`,
          )
          .join('')}
      </div>
    </ark-navigation-menu-content>
  </ark-navigation-menu-item>
  <ark-navigation-menu-item class="${styles.Item}" value="guides">
    ${trigger('Guides')}
    <ark-navigation-menu-content class="${styles.Content}">
      <div class="${styles.MenuSection}" data-single>
        <span class="${styles.MenuLabel}">Guides</span>
        ${guideLinks.map(linkCard).join('')}
      </div>
    </ark-navigation-menu-content>
  </ark-navigation-menu-item>
  <ark-navigation-menu-item class="${styles.Item}" value="docs">
    <ark-navigation-menu-link><a class="${styles.Link}" href="https://ark-ui.com">Documentation</a></ark-navigation-menu-link>
  </ark-navigation-menu-item>`

export function mount(root: HTMLElement) {
  root.innerHTML = /* html */ `
  <ark-navigation-menu class="${styles.Root}" orientation="vertical">
    <ark-navigation-menu-list class="${styles.List}">${items()}
    </ark-navigation-menu-list>
  </ark-navigation-menu>`
}
