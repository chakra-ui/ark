import { Toggle } from '@ark-ui/react/toggle'
import { Volume2, VolumeX } from 'lucide-react'
import { Fragment } from 'react'
import { css } from 'styled-system/css'
import { button } from 'styled-system/recipes'

export const Demo = (props: Toggle.RootProps) => {
  return (
    <Toggle.Root className={button({ variant: { base: 'outline', _pressed: 'solid' } })} {...props}>
      <Toggle.Indicator
        className={css({ display: 'contents' })}
        fallback={
          <Fragment>
            <VolumeX /> Unmute
          </Fragment>
        }
      >
        <Volume2 /> Mute
      </Toggle.Indicator>
    </Toggle.Root>
  )
}
