import { Markdown } from '@/components/docs/Markdown'
import { TableOfContent } from '@/components/docs/TableOfContent'
import { Text } from '@/components/shared/Text'
import { findChangelogDocumentByFramework } from '@/lib/contentlayer'
import { Box, Stack } from '@/panda/jsx'
import { notFound } from 'next/navigation'

const Page = async (props: any) => {
  const { params } = props
  const changelog = findChangelogDocumentByFramework(params.framework)

  if (!changelog) {
    return notFound()
  }

  return (
    <Stack gap="3">
      <Text color="accent.default" fontWeight="semibold" textStyle="sm">
        Changelog
      </Text>
      <Stack direction="row" gap="24" width="full">
        <Box w="full" maxWidth={{ xl: '43rem' }}>
          <Markdown markdown={changelog.body.code} />
        </Box>
        <TableOfContent entries={[]} />
      </Stack>
    </Stack>
  )
}

export default Page

export const generateStaticParams = () => {
  return ['react', 'solid', 'vue'].map((framework) => ({ framework }))
}
