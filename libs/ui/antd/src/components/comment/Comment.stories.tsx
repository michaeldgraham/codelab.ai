import React from 'react'
import { commentData } from './Comment.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Comment',
}

export const Default = () => {
  const Comment = Renderer.components(commentData)

  return <Comment />
}
