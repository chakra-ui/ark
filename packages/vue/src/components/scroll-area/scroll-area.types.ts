export interface RootProps {
  /**
   * The unique identifier of the machine.
   */
  id?: string
  /**
   * The ids of the scroll area elements
   */
  ids?: Partial<{ root: string; viewport: string; content: string; scrollbar: string; thumb: string }>
}

export type RootEmits = {}
