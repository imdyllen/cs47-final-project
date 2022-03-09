import { StyleSheet } from "react-native";
import Modal, { ModalProps } from "react-native-modal";

import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Card from "./Card";
import Divider from "./Divider";
import Text from "./Text";

export interface DialogProps extends Partial<ModalProps> {
  type: "success" | "failure";
  title: string;
}

const Dialog: React.FC<DialogProps> = ({
  type,
  title,
  children,
  ...restProps
}) => {
  return (
    <Modal
      {...restProps}
      backdropColor="white"
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <Card>
        <Text style={styles.title}>{title}</Text>
        <Divider
          style={[
            styles.divider,
            {
              backgroundColor:
                type === "success" ? Colors.lightgreen : Colors.orange,
            },
          ]}
        />
        {children}
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.header,
  },
  divider: {
    marginVertical: 4,
  },
});

export default Dialog;
