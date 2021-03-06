import React from 'react'
import { statisticData } from './Statistic.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Statistic',
}

export const Default = () => {
  const Statistic = Renderer.components(statisticData)

  return <Statistic />
}
