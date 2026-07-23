'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { useEnvironmentContext } from '@ark-ui/react/environment'
import { Portal } from '@ark-ui/react/portal'
import { CornerDownLeftIcon, SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  type ButtonHTMLAttributes,
  type ReactElement,
  Fragment,
  forwardRef,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { css, cx } from 'styled-system/css'
import { Box, Center, HStack } from 'styled-system/jsx'
import { Combobox } from '~/components/ui/combobox'
import { Dialog } from '~/components/ui/dialog'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { loadSearchData, preloadSearchData, querySearch, type SearchData, type SearchItem } from '~/lib/search-query'

const searchTriggerClassName = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  h: '9',
  minW: { base: '9', sm: '44' },
  px: { base: '2.5', sm: '3' },
  borderRadius: 'l2',
  bg: 'bg.default',
  boxShadow: 'xs',
  color: 'fg.muted',
  textStyle: 'sm',
  fontWeight: 'medium',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transitionProperty: 'color, box-shadow',
  transitionDuration: 'fast',
  _hover: {
    color: 'fg.default',
    boxShadow: 'sm',
  },
  '& > svg': {
    width: '4',
    height: '4',
    flexShrink: '0',
  },
})

const shortcutClassName = css({
  ms: 'auto',
  color: 'fg.muted',
  textStyle: 'xs',
  fontWeight: 'medium',
  hideBelow: 'sm',
})

interface Props {
  trigger?: ReactElement
}

export const CommandMenu = (props: Props) => {
  const { trigger } = props

  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState<SearchData | null>(null)
  const [loadError, setLoadError] = useState(false)

  const ensureSearchData = useCallback(() => {
    setLoadError(false)
    void loadSearchData()
      .then(setData)
      .catch(() => {
        setLoadError(true)
      })
  }, [])

  const openMenu = useCallback(() => {
    ensureSearchData()
    setOpen(true)
  }, [ensureSearchData])

  useEffect(() => {
    const timer = window.setTimeout(ensureSearchData, 250)
    return () => window.clearTimeout(timer)
  }, [ensureSearchData])

  useEffect(() => {
    if (open) ensureSearchData()
  }, [open, ensureSearchData])

  const { matchEntries, filteredItems } = useFilteredItems(data, inputValue)
  const isLoading = !data && !loadError

  const collection = useMemo(
    () =>
      createListCollection({
        items: filteredItems,
        itemToValue: (item) => item.value.replaceAll('#', '%23'),
      }),
    [filteredItems],
  )

  useHotkey(openMenu)

  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={(event) => {
        if (event.open) {
          ensureSearchData()
          setInputValue('')
        }
        setOpen(event.open)
      }}
      onExitComplete={() => {
        setInputValue('')
      }}
    >
      <Dialog.Trigger asChild onPointerDown={preloadSearchData} onFocus={preloadSearchData}>
        {trigger ?? <CommandMenuIconTrigger />}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner alignItems="start" top="4.5rem" bottom="auto">
          <Dialog.Content
            p="0"
            width={{ base: 'calc(100vw - 2rem)', sm: 'md' }}
            maxH="min(29.5rem, calc(100vh - 6rem))"
            display="flex"
            flexDirection="column"
            overflow="hidden"
            _closed={{ animationName: 'fade-out', animationDuration: '50ms' }}
          >
            <Combobox.Root
              open
              disableLayer
              inputBehavior="autohighlight"
              placeholder="Search"
              selectionBehavior="preserve"
              loopFocus={false}
              collection={collection}
              onValueChange={(e) => {
                const href = e.value[0]?.replaceAll('%23', '#')
                if (!href) return
                router.push(href)
                requestAnimationFrame(() => {
                  setOpen(false)
                })
              }}
              onInputValueChange={({ inputValue }) => setInputValue(inputValue)}
              css={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                minH: '0',
                overflow: 'hidden',
              }}
            >
              <Box position="relative" borderBottomWidth="1px" borderColor="border.subtle" flexShrink="0">
                <Center
                  position="absolute"
                  insetStart="3"
                  top="50%"
                  transform="translateY(-50%)"
                  color="fg.muted"
                  pointerEvents="none"
                  zIndex="1"
                >
                  <SearchIcon size={16} />
                </Center>
                <Combobox.Control>
                  <Combobox.Input asChild>
                    <Input
                      ps="10"
                      borderWidth="0"
                      borderRadius="0"
                      boxShadow="none"
                      _focus={{ boxShadow: 'none', outline: 'none' }}
                    />
                  </Combobox.Input>
                </Combobox.Control>
              </Box>
              <Combobox.Content
                className="scroller"
                boxShadow="none"
                borderWidth="0"
                px="0"
                py="0"
                flex="1"
                minH="0"
                overflow="auto"
                overscrollBehavior="contain"
              >
                <Combobox.List>
                  {isLoading ? (
                    <Center p="3" minH="40">
                      <Text color="fg.muted" textStyle="sm">
                        Loading…
                      </Text>
                    </Center>
                  ) : loadError ? (
                    <Center p="3" minH="40" flexDirection="column" gap="3">
                      <Text color="fg.muted" textStyle="sm">
                        Couldn’t load search.
                      </Text>
                      <button
                        type="button"
                        className={css({
                          color: 'colorPalette.default',
                          textStyle: 'sm',
                          fontWeight: 'medium',
                          cursor: 'pointer',
                        })}
                        onClick={ensureSearchData}
                      >
                        Try again
                      </button>
                    </Center>
                  ) : matchEntries.length === 0 ? (
                    <Center p="3" minH="40">
                      <Text color="fg.muted" textStyle="sm">
                        No results for <Text as="strong">{inputValue}</Text>
                      </Text>
                    </Center>
                  ) : (
                    matchEntries.map(([key, items]) => (
                      <Combobox.ItemGroup key={key}>
                        <Combobox.ItemGroupLabel color="fg.muted" textStyle="xs" fontWeight="medium" px="3" py="1.5">
                          {key}
                        </Combobox.ItemGroupLabel>
                        {items.map((item) => (
                          <Combobox.Item key={item.value} item={item} persistFocus px="3" py="2" transitionDuration="0">
                            <SearchItemLabel item={item} />
                          </Combobox.Item>
                        ))}
                      </Combobox.ItemGroup>
                    ))
                  )}
                </Combobox.List>
              </Combobox.Content>
            </Combobox.Root>
            <HStack
              gap="1.5"
              px="3"
              py="2"
              color="fg.muted"
              textStyle="xs"
              borderTopWidth="1px"
              borderColor="border.subtle"
              flexShrink="0"
            >
              <CornerDownLeftIcon size={12} />
              <Text as="span">Go to page</Text>
            </HStack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const SearchItemLabel = (props: { item: SearchItem }) => {
  const { item } = props
  if (!item.parents?.length) {
    return <Text fontWeight="medium">{item.label}</Text>
  }

  return (
    <HStack gap="1" textStyle="sm" flexWrap="wrap">
      {item.parents.map((parent) => (
        <Fragment key={parent}>
          <Text color="fg.muted">{parent}</Text>
          <Text color="fg.muted">›</Text>
        </Fragment>
      ))}
      <Text fontWeight="medium">{item.label}</Text>
    </HStack>
  )
}

const CommandMenuIconTrigger = forwardRef<HTMLButtonElement>(function CommandMenuIconTrigger(props, ref) {
  return (
    <IconButton
      ref={ref}
      variant="ghost"
      size={{ base: 'md', md: 'sm' }}
      aria-label="Search"
      css={{
        color: 'fg.muted',
        _hover: { color: 'fg.default' },
        '& svg': {
          width: '5',
          height: '5',
        },
      }}
      {...props}
    >
      <SearchIcon />
    </IconButton>
  )
})

export interface CommandMenuSearchTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  unstyled?: boolean
}

export const CommandMenuSearchTrigger = forwardRef<HTMLButtonElement, CommandMenuSearchTriggerProps>(
  function CommandMenuSearchTrigger(props, ref) {
    const { className, unstyled, ...rest } = props
    const shortcut = useKeyboardShortcutLabel()

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Search"
        className={cx(!unstyled && searchTriggerClassName, className)}
        {...rest}
      >
        <SearchIcon />
        <span className={css({ hideBelow: 'sm' })}>Search</span>
        <span className={cx(!unstyled && shortcutClassName, unstyled && css({ hideBelow: 'sm' }))}>{shortcut}</span>
      </button>
    )
  },
)

const useFilteredItems = (data: SearchData | null, inputValue: string) => {
  const deferredInputValue = useDeferredValue(inputValue)

  const matches = useMemo(() => (data ? querySearch(data, deferredInputValue) : {}), [data, deferredInputValue])
  const matchEntries = useMemo(() => Object.entries(matches), [matches])
  const filteredItems = useMemo(() => Object.values(matches).flat(), [matches])

  return { matchEntries, filteredItems }
}

const useIsMac = () => {
  const [isMac, setIsMac] = useState(true)

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
  }, [])

  return isMac
}

const useKeyboardShortcutLabel = () => {
  const isMac = useIsMac()
  return isMac ? '⌘K' : 'Ctrl K'
}

const useHotkey = (onOpen: () => void) => {
  const env = useEnvironmentContext()
  const isMac = useIsMac()

  useEffect(() => {
    const document = env.getDocument()
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === 'k' && event[hotkey]) {
        event.preventDefault()
        onOpen()
      }
    }

    document.addEventListener('keydown', handleKeydown, true)
    return () => {
      document.removeEventListener('keydown', handleKeydown, true)
    }
  }, [env, isMac, onOpen])
}
