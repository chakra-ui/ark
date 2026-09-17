'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '~/components/ui/icon'
import { Select } from '~/components/ui/select'
import { type Framework, docsHref, extractFramework, frameworkFromPathname } from '~/lib/frameworks'

const collection = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

export const FrameworkSelect = () => {
  const pathname = usePathname()
  const router = useRouter()
  const framework = frameworkFromPathname(pathname)

  const onValueChange = (next: Framework) => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] === 'docs') {
      const { slug } = extractFramework(segments.slice(1))
      router.push(docsHref(next, slug.join('/')))
      return
    }
    document.cookie = `framework=${next}; path=/; max-age=31536000`
    window.location.reload()
  }

  return (
    <Select.Root
      value={[framework]}
      onValueChange={(e) => onValueChange(e.value[0] as Framework)}
      size={{ base: 'md', md: 'sm' }}
      collection={collection}
      variant="ghost"
      positioning={{ placement: 'bottom-end', sameWidth: true }}
    >
      <Select.Control py={{ base: '1', md: '0' }}>
        <Select.Trigger
          css={{
            color: 'fg.muted',
            fontWeight: 'medium',
            _hover: { color: 'fg.default', '& :where(svg)': { color: 'fg.default' } },
          }}
        >
          <Select.ValueText placeholder="Select a Framework" />
          <Icon color="fg.muted" size="sm">
            <ChevronDownIcon />
          </Icon>
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content minW="28">
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
