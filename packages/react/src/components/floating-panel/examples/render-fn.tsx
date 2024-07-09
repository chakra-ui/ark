import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelMaximizeTrigger,
  FloatingPanelMinimizeTrigger,
  FloatingPanelPositioner,
  FloatingPanelResizeTrigger,
  FloatingPanelRestoreTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
  Portal,
} from '../..'

import { ArrowDownLeft, Maximize2, Minus, XIcon } from 'lucide-react'

export const RenderFn = () => (
  <FloatingPanel.Root>
    <FloatingPanelTrigger>Toggle Panel</FloatingPanelTrigger>
    <Portal>
      <FloatingPanelPositioner>
        <FloatingPanelContent>
          <FloatingPanelDragTrigger>
            <FloatingPanelHeader>
              <FloatingPanelTitle>Floating Panel</FloatingPanelTitle>
              <div data-scope="floating-panel" data-part="trigger-group">
                <FloatingPanelMinimizeTrigger>
                  <Minus />
                </FloatingPanelMinimizeTrigger>
                <FloatingPanelMaximizeTrigger>
                  <Maximize2 />
                </FloatingPanelMaximizeTrigger>
                <FloatingPanelRestoreTrigger>
                  <ArrowDownLeft />
                </FloatingPanelRestoreTrigger>
                <FloatingPanelCloseTrigger>
                  <XIcon />
                </FloatingPanelCloseTrigger>
              </div>
            </FloatingPanelHeader>
          </FloatingPanelDragTrigger>
          <FloatingPanelBody>
            <p>Some content</p>
          </FloatingPanelBody>

          <FloatingPanelResizeTrigger axis="n" />
          <FloatingPanelResizeTrigger axis="e" />
          <FloatingPanelResizeTrigger axis="w" />
          <FloatingPanelResizeTrigger axis="s" />
          <FloatingPanelResizeTrigger axis="ne" />
          <FloatingPanelResizeTrigger axis="se" />
          <FloatingPanelResizeTrigger axis="sw" />
          <FloatingPanelResizeTrigger axis="nw" />
        </FloatingPanelContent>
      </FloatingPanelPositioner>
    </Portal>
    <FloatingPanelContext>
      {(floatingPanel) => <p>floatingPanel is {floatingPanel.open ? 'open' : 'closed'}</p>}
    </FloatingPanelContext>
  </FloatingPanel.Root>
)
