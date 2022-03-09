import { StyleSheet, View } from "react-native";

import BlueButton from "./BlueButton";
import Dialog, { DialogProps } from "./Dialog";
import Text from "./Text";

export type ConfirmationDialogProps = Omit<
  DialogProps & {
    text: string;
    onCancel?: () => void;
    onOk?: () => void;
  },
  "type"
>;

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  text,
  onOk,
  onCancel,
  ...restProps
}) => {
  return (
    <Dialog {...restProps} type="success">
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttons}>
        <BlueButton
          style={styles.button}
          textContainerStyle={styles.buttonTextContainer}
          onPress={onOk}
        >
          Ok
        </BlueButton>
        <BlueButton
          textContainerStyle={styles.buttonTextContainer}
          selected
          onPress={onCancel}
        >
          Cancel
        </BlueButton>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  button: {
    marginRight: 10,
  },
  buttonTextContainer: {
    minHeight: 32,
    width: 100,
  },
});

export default ConfirmationDialog;
