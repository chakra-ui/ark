import type { Service } from '@zag-js/toast'
import type { PropsWithChildren, ReactNode } from 'react'
import { ToastProvider as Foo } from './toast-context'
import { useToast } from './use-toast'

export type ToastProviderProps = PropsWithChildren<{
  render: (toasts: Service[]) => ReactNode
}>

export const ToastProvider = (props: ToastProviderProps) => {
  const api = useToast()

  Object.entries(api.toastsByPlacement).map(([placement, toasts]) => console.log(placement))

  return <Foo value={api}>{props.children}</Foo>
}

// const ToastGroup = (props: any) => {
//   const api = useContext(ToastContext)

//   return (
//     <>
//       {Object.entries(api.toastsByPlacement).map(([placement, toasts]) => (
//         <div key={placement} {...api.getGroupProps({ placement })}>
//           {toasts.map((toast) => {
//             return (
//               <Toast key={toast.id} actor={toast}>
//                 <ToastTitle />
//                 <ToastDescription />
//                 <ToastCloseButton />
//               </Toast>
//             )
//           })}
//         </div>
//       ))}
//     </>
//   )
// }
