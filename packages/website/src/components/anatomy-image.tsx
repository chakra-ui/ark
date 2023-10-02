import { css } from 'styled-system/css'
import { Box } from 'styled-system/jsx'

import { allComponents as Anatomies, createGradient } from '@zag-js/anatomy-icons'

export const AnatomyImage = ({ id }: { id: keyof typeof Anatomies }) => {
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
