import { notFound } from 'next/navigation'
import { Box, Stack } from 'styled-system/jsx'
import { ComponentSegmentGroup } from '~/components/navigation/component-segment-group'
import { TableOfContent } from '~/components/navigation/table-of-content'
import { PageHeader } from '~/components/page-header'
import { findComponentDocumentByFrameworkAndId } from '~/lib/contentlayer'

const Layout = (props: any) => {
  const { params } = props

  const component = findComponentDocumentByFrameworkAndId(params.framework, params.component)
  if (!component) {
    notFound()
  }

  return (
    <>
      <Box width={{ base: 'full', xl: '41rem' }}>
        <Stack gap="12">
          <PageHeader
            subHeading="Component"
            heading={component.name}
            supportingText={component.description}
          />
          <Stack gap="5">
            <ComponentSegmentGroup basePath={component.route} />
            {props.children}
          </Stack>
        </Stack>
      </Box>
      <TableOfContent />
    </>
  )
}

export default Layout
