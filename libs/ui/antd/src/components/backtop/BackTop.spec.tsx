import { render } from '@testing-library/react'
import React from 'react'
import { Renderer } from '@codelab/core/renderer'
import { NodeReactI } from '@codelab/shared/interface/node'

describe('BackTop', () => {
  const backtopData: NodeReactI = {
    type: 'React.Html.div',
    props: { style: { height: '500vh' } },
    children: [
      {
        type: 'React.Text',
        props: { value: 'Scroll down to see the bottom-right gray button' },
      },
      {
        type: 'React.BackTop',
        props: { visibilityHeight: 100, 'data-testid': 'backtop' },
      },
    ],
  }

  it('should render with text', async () => {
    const BackTop = Renderer.components(backtopData)
    const { getByText, getByTestId } = render(<BackTop />)

    expect(
      getByText('Scroll down to see the bottom-right gray button'),
    ).toBeTruthy()
    expect(getByTestId('backtop')).toBeTruthy()
  })
})