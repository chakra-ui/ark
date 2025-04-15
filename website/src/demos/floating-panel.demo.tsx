'use client'

import { FloatingPanel, floatingPanelAnatomy } from '@ark-ui/react/floating-panel'
import { Portal } from '@ark-ui/react/portal'
import { ArrowDownLeft, GripVertical, Maximize2, Minus, XIcon } from 'lucide-react'
import { sva } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { icon } from 'styled-system/recipes'
import { Button } from '~/components/ui/button'
import { IconButton } from '~/components/ui/icon-button'

const recipe = sva({
  slots: floatingPanelAnatomy.keys(),
  base: {
    positioner: {
      zIndex: 'overlay',
    },
    content: {
      bg: 'bg.default',
      borderRadius: 'lg',
      borderWidth: '1px',
      width: 'full',
      boxShadow: 'md',
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
    },
    header: {
      paddingBlock: '2',
      paddingInline: '4',
      bg: 'bg.subtle',
      borderBottomWidth: '1px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopRadius: 'lg',
    },
    title: {
      fontWeight: 'medium',
    },
    resizeTrigger: {
      '&[data-axis="n"], &[data-axis="s"]': {
        height: '6px',
        maxWidth: '90%',
      },
      '&[data-axis="e"], &[data-axis="w"]': {
        width: '6px',
        maxHeight: '90%',
      },
      '&[data-axis="ne"], &[data-axis="nw"], &[data-axis="se"], &[data-axis="sw"]': {
        width: '10px',
        height: '10px',
      },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      padding: '4',
    },
  },
})

const axes = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as const

export const Demo = (props: FloatingPanel.RootProps) => {
  const classNames = recipe()
  return (
    <FloatingPanel.Root {...props} strategy="fixed">
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Open Panel</Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner className={classNames.positioner}>
          <FloatingPanel.Content className={classNames.content}>
            <FloatingPanel.DragTrigger>
              <FloatingPanel.Header className={classNames.header}>
                <HStack gap="2">
                  <GripVertical className={icon({ size: 'sm' })} />
                  <FloatingPanel.Title className={classNames.title}>Floating Panel</FloatingPanel.Title>
                </HStack>
                <FloatingPanel.Control className={classNames.control}>
                  <FloatingPanel.StageTrigger stage="minimized" asChild>
                    <IconButton variant="outline" size="xs">
                      <Minus />
                    </IconButton>
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger stage="maximized" asChild>
                    <IconButton variant="outline" size="xs">
                      <Maximize2 />
                    </IconButton>
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger stage="default" asChild>
                    <IconButton variant="outline" size="xs">
                      <ArrowDownLeft />
                    </IconButton>
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.CloseTrigger asChild>
                    <IconButton variant="outline" size="xs">
                      <XIcon />
                    </IconButton>
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Body className={classNames.body}>
              <p>Drag me around</p>
            </FloatingPanel.Body>

            {axes.map((axis) => (
              <FloatingPanel.ResizeTrigger key={axis} axis={axis} className={classNames.resizeTrigger} />
            ))}
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
