import { SiGithub } from '@icons-pack/react-simple-icons'
import { IconButton } from '~/components/ui'

export const GitHubLink = () => {
  return (
    <IconButton
      asChild
      variant="ghost"
      size={{ base: 'md', md: 'sm' }}
      css={{
        color: 'fg.muted',
        _hover: { color: 'fg.default' },
        '& svg': {
          width: '5',
          height: '5',
        },
      }}
    >
      <a href="https://github.com/chakra-ui/ark" target="_blank" rel="noreferrer">
        <SiGithub />
      </a>
    </IconButton>
  )
}
