import type { OpenChangeDetails as DialogOpenChangeDetails } from '@zag-js/dialog'
import { Dialog as DialogRoot, type DialogProps } from './dialog'
import { DialogBackdrop, type DialogBackdropProps } from './dialog-backdrop'
import { DialogCloseTrigger, type DialogCloseTriggerProps } from './dialog-close-trigger'
import { DialogContent, type DialogContentProps } from './dialog-content'
import { useDialogContext, type DialogContext } from './dialog-context'
import { DialogDescription, type DialogDescriptionProps } from './dialog-description'
import { DialogPositioner, type DialogPositionerProps } from './dialog-positioner'
import { DialogTitle, type DialogTitleProps } from './dialog-title'
import { DialogTrigger, type DialogTriggerProps } from './dialog-trigger'

const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Backdrop: DialogBackdrop,
  CloseTrigger: DialogCloseTrigger,
  Content: DialogContent,
  Description: DialogDescription,
  Positioner: DialogPositioner,
  Title: DialogTitle,
  Trigger: DialogTrigger,
})

export {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
  useDialogContext
}

export type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogContentProps, DialogContext,
  DialogDescriptionProps, DialogOpenChangeDetails, DialogPositionerProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps
}

