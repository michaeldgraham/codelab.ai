import React from 'react'
import { listData } from './List.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'List',
}

export const Default = () => {
  const List = Renderer.components(listData)

  return <List />
}
