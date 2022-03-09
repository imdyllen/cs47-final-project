import { TouchableHighlightProps, TouchableHighlight } from "react-native";

const Touchable: React.FC<TouchableHighlightProps> = (props) => {
  return (
    <TouchableHighlight underlayColor="white" activeOpacity={0.6} {...props} />
  );
};

export default Touchable;
