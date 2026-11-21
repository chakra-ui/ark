'use client'
import { Command, commandAnatomy, createListCollection } from '@ark-ui/react/command'
import { CalendarIcon, CreditCardIcon, SearchIcon, SettingsIcon, SmileIcon, UserIcon } from 'lucide-react'
import { sva } from 'styled-system/css'

const recipe = sva({
  slots: commandAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 'sm',
      maxWidth: 'full',
      borderWidth: '1px',
      borderRadius: 'l3',
      bg: 'bg.default',
      overflow: 'hidden',
    },
    label: {
      srOnly: true,
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      px: '3',
      borderBottomWidth: '1px',
      color: 'fg.muted',
      _icon: { width: '4', height: '4' },
    },
    input: {
      flex: '1',
      h: '11',
      bg: 'transparent',
      outline: 'none',
      color: 'fg.default',
      textStyle: 'sm',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      maxH: '72',
      overflowY: 'auto',
      p: '1',
    },
    itemGroupLabel: {
      px: '2',
      py: '1.5',
      textStyle: 'xs',
      fontWeight: 'medium',
      color: 'fg.muted',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      h: '9',
      px: '2',
      borderRadius: 'l2',
      cursor: 'pointer',
      textStyle: 'sm',
      color: 'fg.default',
      _highlighted: { bg: 'bg.subtle' },
      _disabled: { color: 'fg.disabled', cursor: 'not-allowed' },
      _icon: { width: '4', height: '4', color: 'fg.muted' },
    },
    empty: {
      py: '6',
      textAlign: 'center',
      textStyle: 'sm',
      color: 'fg.muted',
      _empty: { display: 'none' },
    },
  },
})

const classNames = recipe()

const collection = createListCollection({
  items: [
    { value: 'calendar', label: 'Calendar', group: 'Suggestions', icon: CalendarIcon },
    { value: 'emoji', label: 'Search emoji', group: 'Suggestions', icon: SmileIcon },
    { value: 'profile', label: 'Profile', group: 'Settings', icon: UserIcon },
    { value: 'billing', label: 'Billing', group: 'Settings', icon: CreditCardIcon },
    { value: 'settings', label: 'Settings', group: 'Settings', icon: SettingsIcon },
  ],
  groupBy: (item) => item.group,
})

export const Demo = () => (
  <Command.Root collection={collection} className={classNames.root}>
    <Command.Label className={classNames.label}>Commands</Command.Label>
    <Command.Control className={classNames.control}>
      <SearchIcon />
      <Command.Input className={classNames.input} placeholder="Type a command or search..." />
    </Command.Control>
    <Command.Context>
      {(command) => (
        <Command.List className={classNames.list}>
          {command.collection.group().map(([group, items]) => (
            <Command.ItemGroup key={group}>
              <Command.ItemGroupLabel className={classNames.itemGroupLabel}>{group}</Command.ItemGroupLabel>
              {items.map((item) => (
                <Command.Item key={item.value} item={item} className={classNames.item}>
                  <item.icon />
                  <Command.ItemText>{item.label}</Command.ItemText>
                </Command.Item>
              ))}
            </Command.ItemGroup>
          ))}
        </Command.List>
      )}
    </Command.Context>
    <Command.Empty className={classNames.empty}>No results found</Command.Empty>
  </Command.Root>
)
