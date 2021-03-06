import React from 'react'
import { emptyData } from './Empty.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Empty',
}

export const Default = () => {
  const Empty = Renderer.components(emptyData)

  return <Empty />
}
