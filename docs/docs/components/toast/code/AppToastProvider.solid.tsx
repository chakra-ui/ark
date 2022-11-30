export type AppToastProviderProps = {
  children: JSX.Element
}

export const AppToastProvider = (props: AppToastProviderProps) => (
  <ToastProvider>
    <ToastPlacements>
      {(placements) =>
        placements.map((placement) => (
          <ToastGroup placement={placement}>
            {(toasts) =>
              toasts.map((toast) => (
                <Toast toast={toast}>
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
