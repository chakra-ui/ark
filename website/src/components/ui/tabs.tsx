'use client'
import { Tabs as ArkTabs, type TabsProps as ArkTabsProps } from '@ark-ui/react/src/tabs'
import { styled } from 'panda/jsx'
import { TabsVariantProps, tabs } from 'panda/recipes/tabs'
export * from '@ark-ui/react/src/tabs'

export type TabsProps = TabsVariantProps & ArkTabsProps
export const Tabs = styled(ArkTabs, tabs)
