import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Stack } from '@/panda/jsx'

export const Logo = () => (
  <Stack gap="2" direction="row" align="center">
    <div className={css({ h: '8', w: '8', bg: 'bg.subtle', borderRadius: 'sm' })}></div>
    <Text textStyle="lg" fontWeight="semibold">
      Ark UI
    </Text>
  </Stack>
)
