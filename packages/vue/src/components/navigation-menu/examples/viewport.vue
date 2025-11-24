<script setup lang="ts">
import { NavigationMenu } from '@ark-ui/vue/navigation-menu'

const renderLinks = (opts: { value: string; items: string[] }) => {
  const { value, items } = opts
  return items.map((item, index) => ({
    key: `${value}-${item}-${index}`,
    value,
    href: '# ',
    text: item,
  }))
}
</script>

<template>
  <NavigationMenu.Root class="viewport">
    <NavigationMenu.IndicatorTrack>
      <NavigationMenu.List>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content
            :style="{
              gridTemplateColumns: '1fr 2fr',
              width: '600px',
            }"
          >
            <NavigationMenu.Link
              v-for="link in renderLinks({
                value: 'products',
                items: [
                  'Analytics Platform',
                  'Customer Engagement',
                  'Marketing Automation',
                  'Data Integration',
                  'Enterprise Solutions',
                  'API Documentation',
                ],
              })"
              :key="link.key"
              :href="link.href"
              as-child
            >
              <a>{{ link.text }}</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link
              v-for="link in renderLinks({
                value: 'products',
                items: ['Case Studies', 'Success Stories', 'Integration Partners', 'Security & Compliance'],
              })"
              :key="link.key"
              :href="link.href"
              as-child
            >
              <a>{{ link.text }}</a>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="company">
          <NavigationMenu.Trigger>Company</NavigationMenu.Trigger>
          <NavigationMenu.Content
            :style="{
              gridTemplateColumns: '1fr 1fr',
              width: '450px',
            }"
          >
            <NavigationMenu.Link
              v-for="link in renderLinks({
                value: 'company',
                items: ['About Us', 'Leadership Team', 'Careers', 'Press Releases'],
              })"
              :key="link.key"
              :href="link.href"
              as-child
            >
              <a>{{ link.text }}</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link
              v-for="link in renderLinks({
                value: 'company',
                items: ['Investors', 'Partners', 'Corporate Responsibility'],
              })"
              :key="link.key"
              :href="link.href"
              as-child
            >
              <a>{{ link.text }}</a>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="developers">
          <NavigationMenu.Trigger>Developers</NavigationMenu.Trigger>
          <NavigationMenu.Content
            :style="{
              gridTemplateColumns: '1.6fr 1fr',
              width: '650px',
            }"
          >
            <NavigationMenu.Link
              v-for="link in renderLinks({
                value: 'developers',
                items: [
                  'API Documentation',
                  'SDKs & Libraries',
                  'Developer Guides',
                  'Code Samples',
                  'Webhooks',
                  'GraphQL Explorer',
                ],
              })"
              :key="link.key"
              :href="link.href"
              as-child
            >
              <a>{{ link.text }}</a>
            </NavigationMenu.Link>

            <NavigationMenu.Link
              v-for="link in renderLinks({
                value: 'developers',
                items: ['Developer Community', 'Changelog', 'Status Page', 'Rate Limits'],
              })"
              :key="link.key"
              :href="link.href"
              as-child
            >
              <a>{{ link.text }}</a>
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="pricing">
          <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator>
          <NavigationMenu.Arrow />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.IndicatorTrack>

    <NavigationMenu.ViewportPositioner>
      <NavigationMenu.Viewport />
    </NavigationMenu.ViewportPositioner>
  </NavigationMenu.Root>
</template>
