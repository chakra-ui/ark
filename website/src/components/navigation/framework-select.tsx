'use client'
import { createListCollection } from '@ark-ui/react/collection'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '~/components/ui/icon'
import { Select } from '~/components/ui/select'
import {
  type Framework,
  docsHref,
  examplesHref,
  extractFramework,
  frameworkFromPathname,
  frameworkLabels,
  frameworks,
  hasPlusExamples,
  isDocAvailable,
} from '~/lib/frameworks'

const collection = createListCollection({
  items: frameworks.map((value) => ({ label: frameworkLabels[value], value })),
})

export const FrameworkSelect = () => {
  const pathname = usePathname()
  const router = useRouter()
  const framework = frameworkFromPathname(pathname)

  const onValueChange = (next: Framework) => {
    const segments = pathname.split('/').filter(Boolean)
    const { slug } = extractFramework(segments.slice(1))
    if (segments[0] === 'examples' && hasPlusExamples(next)) {
      router.push(examplesHref(next, slug[0] ?? ''))
      return
    }
    const docSlug = segments[0] === 'docs' ? slug.join('/') : ''
    router.push(docsHref(next, docSlug && isDocAvailable(next, docSlug) ? docSlug : 'overview/getting-started'))
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
