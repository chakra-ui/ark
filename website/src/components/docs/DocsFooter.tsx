import type { DocumentTypes } from '@/contentlayer'
import { findNextDocument, findPrevDocument } from '@/lib/contentlayer'
import { HStack, Stack } from '@/panda/jsx'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { Button } from '../shared/Button'
import { Divider } from '../shared/Divider'
import { Text } from '../shared/Text'

type FooterProps = {
  doc: DocumentTypes
}

export const DocsFooter = (props: FooterProps) => {
  const { doc } = props

  const prevDoc = findPrevDocument(doc)
  const nextDoc = findNextDocument(doc)

  return (
    <Stack width="full" gap="6">
      <Divider />
      <HStack justify="space-between" width="full">
        {prevDoc && (
          <Stack gap="3">
            <Text color="accent.muted" fontWeight="semibold" textStyle="sm">
              Previous
            </Text>
            <Button variant="link" size="lg" href={prevDoc.route} leftIcon={<FiArrowLeft />}>
              {prevDoc.name}
            </Button>
          </Stack>
        )}

        {nextDoc && (
          <Stack gap="3" style={{ marginLeft: 'auto' }}>
            <Text color="accent.muted" fontWeight="semibold" textStyle="sm">
              Next
            </Text>
            <Button variant="link" size="lg" href={nextDoc.route} rightIcon={<FiArrowRight />}>
              {nextDoc.name}
            </Button>
          </Stack>
        )}
      </HStack>
    </Stack>
  )
}
