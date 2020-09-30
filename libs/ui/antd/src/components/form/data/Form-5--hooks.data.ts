import { Button } from '../../button'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const hooksData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props
> = {
  type: 'React.Form',
  props: {
    name: 'form-hooks',
    initialValues: {
      name: 'Codelab',
    },
    onFinish: {
      __type: ['Leaf', 'Eval'],
      value: 'return (values) => console.log(values)',
    },
  },
  children: [
    {
      type: 'React.Form.Item',
      props: {
        label: 'Name',
        name: ['name'],
      },
      children: [
        {
          type: 'React.Input',
        },
      ],
    },
    {
      type: 'React.Form.Item',
      props: {
        name: 'reset_button',
      },
      children: [
        {
          type: 'React.Button',
          props: {
            type: 'primary',
            onClick: {
              __type: ['Eval'],
              value: 'return ()=>{this.form.resetFields()}',
            },
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Reset',
              },
            },
          ],
        },
      ],
    },
  ],
}
