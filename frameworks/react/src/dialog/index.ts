import type { OpenChangeDetails as DialogOpenChangeDetails } from '@zag-js/dialog'
import { DialogBackdrop, type DialogBackdropProps } from './dialog-backdrop'
import { DialogCloseTrigger, type DialogCloseTriggerProps } from './dialog-close-trigger'
import { DialogContent, type DialogContentProps } from './dialog-content'
import { DialogContext, type DialogContextProps } from './dialog-context'
import { DialogDescription, type DialogDescriptionProps } from './dialog-description'
import { DialogPositioner, type DialogPositionerProps } from './dialog-positioner'
import { DialogRoot, type DialogRootProps } from './dialog-root'
import { DialogTitle, type DialogTitleProps } from './dialog-title'
import { DialogTrigger, type DialogTriggerProps } from './dialog-trigger'
import { useDialogContext, type UseDialogContext } from './use-dialog-context'

export * as Dialog from './dialog'

export {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogContext,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  useDialogContext,
}

export type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogContentProps,
  DialogContextProps,
  DialogDescriptionProps,
  DialogOpenChangeDetails,
  DialogPositionerProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
  UseDialogContext,
}
