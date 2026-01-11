import { FloatingPanel } from '@ark-ui/react/floating-panel'
import { Portal } from '@ark-ui/react/portal'
import { ArrowDownLeft, GripVertical, Maximize2, Minus, XIcon } from 'lucide-react'
import styles from 'styles/floating-panel.module.css'

export const Basic = () => (
  <FloatingPanel.Root>
    <FloatingPanel.Trigger className={styles.Trigger}>Toggle Panel</FloatingPanel.Trigger>
    <Portal>
      <FloatingPanel.Positioner className={styles.Positioner}>
        <FloatingPanel.Content className={styles.Content}>
          <FloatingPanel.DragTrigger>
            <FloatingPanel.Header className={styles.Header}>
              <FloatingPanel.Title className={styles.Title}>
                <GripVertical />
                Floating Panel
              </FloatingPanel.Title>
              <FloatingPanel.Control className={styles.Control}>
                <FloatingPanel.StageTrigger stage="minimized" className={styles.ControlButton}>
                  <Minus />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="maximized" className={styles.ControlButton}>
                  <Maximize2 />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="default" className={styles.ControlButton}>
                  <ArrowDownLeft />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.CloseTrigger className={styles.ControlButton}>
                  <XIcon />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.Body className={styles.Body}>
            <p>Some content</p>
          </FloatingPanel.Body>

          <FloatingPanel.ResizeTrigger axis="n" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="e" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="w" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="s" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="ne" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="se" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="sw" className={styles.ResizeTrigger} />
          <FloatingPanel.ResizeTrigger axis="nw" className={styles.ResizeTrigger} />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </Portal>
  </FloatingPanel.Root>
)
