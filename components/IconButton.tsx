import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export interface IconButtonProps
  extends React.ComponentProps<typeof MaterialCommunityIcons> {
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, ...props }) => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
    <MaterialCommunityIcons {...props} />
  </TouchableOpacity>
);

export default IconButton;
