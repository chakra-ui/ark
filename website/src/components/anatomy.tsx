import { allComponents as Anatomies, createGradient } from '@zag-js/anatomy-icons'
import { css } from 'styled-system/css'
import { Box } from 'styled-system/jsx'

export const Anatomy = ({ id }: { id: string }) => {
  const Anatomy = Anatomies[id as keyof typeof Anatomies]
  if (!Anatomy) return null
  return (
    <Box my="8" style={{ background: createGradient('red').value }} borderRadius="lg">
      <Anatomy
        accentColor="red"
        className={css({
          maxW: '100%',
          h: 'auto',
        })}
      />
    </Box>
  )
}
