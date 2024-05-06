import { allComponents as Anatomies, createGradient } from '@zag-js/anatomy-icons'
import { css } from 'styled-system/css'
import { Box } from 'styled-system/jsx'

export const Anatomy = ({ id }: { id: keyof typeof Anatomies }) => {
  const Anatomy = Anatomies[id]
  return (
    <Box my="8" style={{ background: createGradient('red').value }}>
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
