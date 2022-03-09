import { Image, ImageProps } from "react-native";

import Colors from "../constants/Colors";

const photos = {
  dad: require("../assets/images/dad.jpg"),
  mom: require("../assets/images/mom.jpg"),
  kid: require("../assets/images/kid.jpg"),
  "sleeping-baby": require("../assets/images/sleeping-baby.jpg"),
  monica: require("../assets/images/monica.jpg"),
  daniel: require("../assets/images/daniel.jpg"),
  ted: require("../assets/images/ted.jpg"),
  selina: require("../assets/images/selina.jpg"),
  smith: require("../assets/images/smith.jpg"),
  kathy: require("../assets/images/kathy.jpg"),
  emily: require("../assets/images/emily.jpg"),
  default: require("../assets/images/default.png"),
};

const MockPhoto: React.FC<
  Omit<ImageProps, "source"> & { name?: string | null }
> = ({ style, name, ...props }) => {
  return (
    <Image
      {...props}
      source={name ? (photos as any)[name] : photos.default}
      style={[style, { backgroundColor: Colors.blue }]}
    />
  );
};

export default MockPhoto;
