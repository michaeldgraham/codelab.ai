import { Text } from './Text.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const textData: NodeReactI<Text.Props> = {
  type: NodeType.React_Text,
  props: {
    value: 'Some text',
  },
}
