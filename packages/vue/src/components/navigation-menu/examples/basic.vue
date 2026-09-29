<script setup lang="ts">
import { NavigationMenu } from '@ark-ui/vue/navigation-menu'
import {
  AccessibilityIcon,
  ChevronDownIcon,
  ClapperboardIcon,
  LayersIcon,
  ListChecksIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
} from 'lucide-vue-next'
import styles from 'styles/navigation-menu.module.css'

const overviewSections = [
  {
    label: 'Get started',
    links: [
      { href: '#quick-start', title: 'Quick Start', description: 'Install and assemble', icon: RocketIcon },
      { href: '#styling', title: 'Styling', description: 'CSS, CSS-in-JS, or utilities', icon: PaletteIcon },
    ],
  },
  {
    label: 'Learn',
    links: [
      {
        href: '#accessibility',
        title: 'Accessibility',
        description: 'Keyboard and ARIA support',
        icon: AccessibilityIcon,
      },
      { href: '#releases', title: 'Releases', description: "What's new in Ark UI", icon: SparklesIcon },
    ],
  },
]

const guideLinks = [
  { href: '#animation', title: 'Animation', description: 'CSS or JavaScript', icon: ClapperboardIcon },
  { href: '#composition', title: 'Composition', description: 'Replace and compose parts', icon: LayersIcon },
  { href: '#forms', title: 'Forms', description: 'Native and library forms', icon: ListChecksIcon },
]
</script>

<template>
  <NavigationMenu.Root :class="styles.Root">
    <NavigationMenu.List :class="styles.List">
      <NavigationMenu.Item :class="styles.Item" value="overview">
        <NavigationMenu.Trigger :class="styles.Trigger">
          Overview
          <span :class="styles.TriggerIcon">
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content :class="styles.Content">
          <div :class="styles.MenuColumns">
            <div v-for="section in overviewSections" :key="section.label" :class="styles.MenuSection">
              <span :class="styles.MenuLabel">{{ section.label }}</span>
              <NavigationMenu.Link
                v-for="item in section.links"
                :key="item.href"
                :class="styles.LinkCard"
                :href="item.href"
              >
                <span :class="styles.LinkIcon">
                  <component :is="item.icon" />
                </span>
                <span :class="styles.LinkCopy">
                  <span :class="styles.LinkTitle">{{ item.title }}</span>
                  <span :class="styles.LinkDescription">{{ item.description }}</span>
                </span>
              </NavigationMenu.Link>
            </div>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item :class="styles.Item" value="guides">
        <NavigationMenu.Trigger :class="styles.Trigger">
          Guides
          <span :class="styles.TriggerIcon">
            <ChevronDownIcon />
          </span>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content :class="styles.Content">
          <div :class="styles.MenuSection" data-single>
            <span :class="styles.MenuLabel">Guides</span>
            <NavigationMenu.Link v-for="item in guideLinks" :key="item.href" :class="styles.LinkCard" :href="item.href">
              <span :class="styles.LinkIcon">
                <component :is="item.icon" />
              </span>
              <span :class="styles.LinkCopy">
                <span :class="styles.LinkTitle">{{ item.title }}</span>
                <span :class="styles.LinkDescription">{{ item.description }}</span>
              </span>
            </NavigationMenu.Link>
          </div>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item :class="styles.Item" value="docs">
        <NavigationMenu.Link :class="styles.Link" href="https://ark-ui.com">Documentation</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
</template>
