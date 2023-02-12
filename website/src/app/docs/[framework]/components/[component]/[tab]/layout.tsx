import { TableOfContent } from '@/components/docs/TableOfContent'
import { ComponentTabs } from '@/components/navigation/ComponentTabs'
import { PageHeader } from '@/components/shared/PageHeader'
import { findComponentDocumentByFrameworkAndId } from '@/lib/contentlayer'
import { Box } from '@/panda/jsx'
import { notFound } from 'next/navigation'
import { Stack } from 'panda/jsx/stack'

const Layout = (props: any) => {
  const { params } = props

  const component = findComponentDocumentByFrameworkAndId(params.framework, params.component)
  if (!component) {
    notFound()
  }

  const entries = params.tab === 'props' ? [] : component.toc

  return (
    <Stack direction="row" gap="16" flex="1" justifyContent="flex-end">
      <Box flex="1" maxW={{ base: 'unset', lg: '3xl' }}>
        <Stack gap="12">
          <PageHeader
            subHeading="Component"
            heading={component.name}
            supportingText={component.description}
          />
          <ComponentTabs basePath={component.route} />
          {props.children}
        </Stack>
      </Box>
      <TableOfContent entries={entries} />
    </Stack>
  )
}

export default Layout
