import { Text, Pressable } from 'react-native';
import A from '../styles/A'

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color
  };
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={[pressed ? A.pressedInlineTextButton : A.inlineTextButton, style]}>
          {props.text}
        </Text>
      )}
    </Pressable>
  )
}