'use client'
import { Toaster, createToaster } from '@ark-ui/react/toast'
import { XIcon } from 'lucide-react'
import { Button, IconButton, Toast } from '~/components/ui'

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
})

export const Demo = () => (
  <>
    <Button
      variant="outline"
      onClick={() => toaster.create({ title: 'Title', description: 'Description', type: 'info' })}
    >
      Create Toast
    </Button>
    <Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root key={toast.id}>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.ActionTrigger asChild>
            <Button variant="link" size="sm" mt="2">
              Action
            </Button>
          </Toast.ActionTrigger>
          <Toast.CloseTrigger asChild>
            <IconButton size="sm" variant="link">
              <XIcon />
            </IconButton>
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </Toaster>
  </>
)
