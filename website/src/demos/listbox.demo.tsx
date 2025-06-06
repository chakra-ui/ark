'use client'
import { Listbox, createListCollection, listboxAnatomy } from '@ark-ui/react/listbox'
import { CheckIcon } from 'lucide-react'
import { sva } from 'styled-system/css'

const recipe = sva({
  slots: listboxAnatomy.keys(),
  base: {
    content: {
      borderWidth: '1px',
      background: 'bg.default',
      borderRadius: 'l2',
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
      py: '1',
      gap: '1',
      width: 'xs',
    },
    item: {
      alignItems: 'center',
      borderRadius: 'l1',
      cursor: 'pointer',
      color: 'fg.default',
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'medium',
      textStyle: 'sm',
      transitionDuration: 'fast',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      h: '10',
      px: '2.5',
      mx: '1',
      _highlighted: { bg: 'bg.subtle' },
      _hover: { bg: 'bg.subtle' },

      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'fg.disabled',
          background: 'none',
        },
      },
    },
    itemIndicator: {
      _checked: {
        color: 'colorPalette.default',
      },
      _icon: {
        width: '5',
        height: '5',
      },
    },
  },
})

const classNames = recipe()

export const Demo = () => {
  const collection = createListCollection({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Svelte', value: 'svelte', disabled: true },
      { label: 'Vue', value: 'vue' },
    ],
  })

  return (
    <Listbox.Root collection={collection} className={classNames.root} selectionMode="multiple" defaultValue={['solid']}>
      <Listbox.Content className={classNames.content}>
        {collection.items.map((item) => (
          <Listbox.Item key={item.value} item={item} className={classNames.item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator className={classNames.itemIndicator}>
              <CheckIcon />
            </Listbox.ItemIndicator>
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}
