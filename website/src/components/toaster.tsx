'use client'

import { Portal } from '@ark-ui/react/portal'
import { Toaster as ArkToaster, createToaster } from '@ark-ui/react/toast'
import { Toast } from './ui/toast'

export const toaster = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
  max: 3,
})

export const Toaster = () => {
  return (
    <Portal>
      <ArkToaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
          </Toast.Root>
        )}
      </ArkToaster>
    </Portal>
  )
}
