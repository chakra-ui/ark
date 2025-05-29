'use client'
import { PasswordInput, passwordInputAnatomy } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { cx, sva } from 'styled-system/css'
import { button, input } from 'styled-system/recipes'

export const Demo = () => {
  const classes = recipe()
  return (
    <PasswordInput.Root className={classes.root}>
      <PasswordInput.Label className={classes.label}>Password</PasswordInput.Label>
      <PasswordInput.Control className={classes.control}>
        <PasswordInput.Input className={cx(input({ size: 'lg' }), classes.input)} />
        <PasswordInput.VisibilityTrigger
          className={cx(button({ variant: 'ghost', size: 'xs' }), classes.visibilityTrigger)}
        >
          <PasswordInput.Indicator fallback={<EyeOffIcon />} className={classes.indicator}>
            <EyeIcon />
          </PasswordInput.Indicator>
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput.Root>
  )
}

export const recipe = sva({
  slots: passwordInputAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
      maxW: 'sm',
    },
    label: {
      textStyle: 'sm',
      fontWeight: 'medium',
    },
    control: {
      position: 'relative',
    },
    input: {
      pe: '10',
    },
    visibilityTrigger: {
      position: 'absolute',
      right: '2',
      top: '50%',
      transform: 'translateY(-50%)',
      px: '2',
    },
    indicator: {
      _icon: {
        width: '4',
        height: '4',
      },
    },
  },
})
