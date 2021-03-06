import React from 'react'
import { datePickerData } from './DatePicker.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'DatePicker',
}

export const Default = () => {
  const DatePicker = Renderer.components(datePickerData)

  return <DatePicker />
}
