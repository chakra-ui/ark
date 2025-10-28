'use client'

import { useClipboard } from '@ark-ui/react/clipboard'
import { Portal } from '@ark-ui/react/portal'
import { SiMarkdown } from '@icons-pack/react-simple-icons'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Box, HStack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'
import { Menu } from '~/components/ui/menu'
import { getPublicUrl } from '~/lib/get-public-url'

interface CopyPageWidgetProps {
  slug: string
  content: string
}

export const CopyPageWidget = (props: CopyPageWidgetProps) => {
  const { slug, content } = props
  return (
    <HStack gap="0" spaceX="-1px">
      <CopyPageButton content={content} />
      <ActionMenu slug={slug} />
    </HStack>
  )
}

const CopyPageButton = (props: { content: string }) => {
  const { content } = props
  const clipboard = useClipboard({ value: content, timeout: 1000 })
  return (
    <Button onClick={clipboard.copy} size="xs" variant="outline" borderEndRadius="0">
      <HStack gap="2">
        {clipboard.copied ? <CheckIcon size={16} /> : <SiMarkdown size={18} />}
        <Box as="span" textStyle="sm" fontWeight="medium">
          Copy Page
        </Box>
      </HStack>
    </Button>
  )
}

const ActionMenu = (props: { slug: string }) => {
  const { slug } = props

  const pageUrl = getPublicUrl(`/docs/${slug}`)
  const readUrl = encodeURIComponent(
    `Use web browsing to access links and information: ${pageUrl}\n\nI want to ask some questions`,
  )

  const items = [
    {
      label: 'View as markdown',
      href: `${pageUrl}.mdx`,
      icon: () => <SiMarkdown size={18} />,
    },
    {
      label: 'Open in ChatGPT',
      href: `https://chatgpt.com/?hints=search&q=${readUrl}`,
      icon: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <title>ChatGPT</title>
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
        </svg>
      ),
    },
    {
      label: 'Open in Claude',
      href: `https://claude.ai/new?q=${readUrl}`,
      icon: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" role="img">
          <title>Anthropic</title>
          <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
        </svg>
      ),
    },
  ]

  return (
    <Menu.Root size="sm" positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <IconButton size="xs" variant="outline" borderStartRadius="0" borderStartWidth="0px">
          <ChevronDownIcon size={16} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="200px">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <Menu.Item key={item.label} value={item.label} asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <HStack gap="2" width="full">
                      <Icon />
                      <span>{item.label}</span>
                    </HStack>
                  </a>
                </Menu.Item>
              )
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
