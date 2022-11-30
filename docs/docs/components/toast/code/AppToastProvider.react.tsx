export type AppToastProviderProps = {
  children: React.ReactNode
}

export const AppToastProvider = (props: AppToastProviderProps) => (
  <ToastProvider>
    <ToastPlacements>
      {(placements) =>
        placements.map((placement) => (
          <ToastGroup key={placement} placement={placement}>
            {(toasts) =>
              toasts.map((toast) => (
                <Toast key={toast.id} toast={toast}>
                  <ToastTitle />
                  <ToastDescription />
                  <ToastCloseButton>Close</ToastCloseButton>
                </Toast>
              ))
            }
          </ToastGroup>
        ))
      }
    </ToastPlacements>

    {props.children}
  </ToastProvider>
)
