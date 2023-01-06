import { panda } from '@/panda/jsx'

export const TableOfContent = () => {
  return (
    <panda.aside
      position="sticky"
      display={{ base: 'none', xl: 'block' }}
      top="112px"
      background="bg.subtle"
      height="xs"
      flex="1"
      p="4"
      borderRadius="lg"
    >
      {/* <div>
        <Stack
          as="ul"
          gap="2"
          fontSize="sm"
          lineHeight="1.5rem"
          color="fg.muted"
          listStyle="none"
          ps="0"
        >
          <Box as="li">
            <Text color="accent.default" fontWeight="medium">
              Headline 0
            </Text>
          </Box>
          {['Headline 1', 'Headline 2', 'Headline 3', 'Headline 4'].map((headline) => (
            <Box as="li" key={headline}>
              <Text>{headline}</Text>
            </Box>
          ))}
        </Stack>
      </div> */}
    </panda.aside>
  )
}
