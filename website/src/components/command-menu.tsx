'use client'

import { createListCollection } from '@ark-ui/react'
import { useEnvironmentContext } from '@ark-ui/react/environment'
import { Portal } from '@ark-ui/react/portal'
import { SearchIcon } from 'lucide-react'
import { matchSorter } from 'match-sorter'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Center, Stack } from 'styled-system/jsx'
import { Combobox } from '~/components/ui/combobox'
import { Dialog } from '~/components/ui/dialog'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'

interface Item {
  label: string
  value: string
  category: string
  description: string
}

interface Props {
  data: Record<string, Item[]>
}

export const CommandMenu = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { matchEntries, filteredItems } = useFilteredItems(data, inputValue)
  const router = useRouter()
  const params = useParams<{ framework: string }>()

  const collection = createListCollection({ items: filteredItems })

  useHotkey(setOpen)

  return (
    <Dialog.Root open={open} onOpenChange={(event) => setOpen(event.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          variant="ghost"
          size={{ base: 'md', md: 'sm' }}
          css={{
            color: 'fg.muted',
            _hover: { color: 'fg.default' },
            '& svg': {
              width: '5',
              height: '5',
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner alignItems="start" top="5%" bottom="5%">
          <Dialog.Content p="2" width={{ base: '100%', sm: 'md' }} _closed={{ animation: 'none' }}>
            <Combobox.Root
              open
              disableLayer
              inputBehavior="autohighlight"
              placeholder="Search the docs"
              selectionBehavior="clear"
              loopFocus={false}
              collection={collection}
              onValueChange={(e) => {
                setOpen(false)
                router.push(`/${params.framework}/${e.value}`)
              }}
              onInputValueChange={({ inputValue }) => setInputValue(inputValue)}
            >
              <Combobox.Control>
                <Combobox.Input asChild>
                  <Input />
                </Combobox.Input>
              </Combobox.Control>
              <Combobox.Content
                boxShadow="none"
                px="0"
                py="0"
                overflow="auto"
                maxH="68vh"
                overscrollBehavior="contain"
              >
                <Combobox.List>
                  {matchEntries.length === 0 && (
                    <Center p="3" minH="40">
                      <Text color="fg.muted" textStyle="sm">
                        No results found for <Text as="strong">{inputValue}</Text>
                      </Text>
                    </Center>
                  )}
                  {matchEntries.map(([key, items]) => (
                    <Combobox.ItemGroup key={key}>
                      <Combobox.ItemGroupLabel
                        textTransform="capitalize"
                        color="fg.muted"
                        fontWeight="medium"
                      >
                        {key}
                      </Combobox.ItemGroupLabel>
                      {items.map((item) => (
                        <Combobox.Item
                          key={item.value}
                          item={item}
                          persistFocus
                          height="auto"
                          px="4"
                          py="3"
                        >
                          <Stack gap="0">
                            <Text fontWeight="medium">{item.label}</Text>
                            <Text textStyle="sm" fontWeight="medium" color="accent.default">
                              {item.category}
                            </Text>
                            <Text textStyle="sm" color="fg.muted" mt="0.5" lineClamp={2}>
                              {item.description}
                            </Text>
                          </Stack>
                        </Combobox.Item>
                      ))}
                    </Combobox.ItemGroup>
                  ))}
                </Combobox.List>
              </Combobox.Content>
            </Combobox.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const useFilteredItems = (data: Record<string, Item[]>, inputValue: string) => {
  const items = useMemo(() => Object.values(data).flat(), [data])

  const filter = useCallback(
    (value: string): Record<string, Item[]> => {
      if (!value) return data

      const results = matchSorter(items, value, { keys: ['label', 'description'] })
      return results.length ? { 'Search Results:': results } : {}
    },
    [items, data],
  )
  const matches = useMemo(() => filter(inputValue), [inputValue, filter])
  const matchEntries = useMemo(() => Object.entries(matches), [matches])
  const filteredItems = useMemo(() => Object.values(matches).flat(), [matches])

  return { matchEntries, filteredItems }
}

const useHotkey = (setOpen: (open: boolean) => void) => {
  const env = useEnvironmentContext()

  useEffect(() => {
    const document = env.getDocument()
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === 'k' && event[hotkey]) {
        event.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeydown, true)
    return () => {
      document.removeEventListener('keydown', handleKeydown, true)
    }
  }, [env, setOpen])
}
