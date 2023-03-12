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
    <>
      <Box width={{ base: 'full', xl: '41rem' }}>
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
    </>
  )
}

export default Layout
