import { Text } from '@/components/shared/Text'
import { fetchGitHubStats } from '@/lib/fetchGitHubStats'
import { css } from '@/panda/css'
import { Box, HStack } from '@/panda/jsx'
import Link from 'next/link'
import { AiOutlineStar } from 'react-icons/ai'
import { FaGithub } from 'react-icons/fa'
import { GoRepoForked } from 'react-icons/go'

export const GitHubStats = async () => {
  const { stars, forks } = await fetchGitHubStats()

  return (
    <Link
      href="https://github.com/chakra-ui/ark"
      target="_blank"
      rel="noopener"
      className={css({
        color: 'fg.emphasized',
        _hover: { color: 'fg.default' },
      })}
    >
      <HStack gap="3">
        <FaGithub
          fontSize="1.25rem"
          className={css({
            color: 'fg.emphasized',
          })}
        />
        <Box>
          <Text textStyle="sm" fontWeight="medium" color="fg.muted">
            chakra-ui/ark
          </Text>
          <HStack color="fg.muted" gap="1.5">
            <HStack gap="0.5">
              <AiOutlineStar fontSize="0.875rem" />
              <Text textStyle="xs">{stars}</Text>
            </HStack>
            <HStack gap="0.5">
              <GoRepoForked fontSize="0.875rem" />
              <Text textStyle="xs">{forks}</Text>
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </Link>
  )
}
