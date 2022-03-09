import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import Text from "./Text";
import TextInput from "./TextInput";

export interface SearchBarProps extends TouchableOpacityProps {
  value?: string;
  onChangeText?: TextInputProps["onChangeText"];
  inputDisabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputDisabled,
  value,
  onChangeText,
  style,
  onPress,
}) => {
  const textInputRef = useRef<RNTextInput>(null);

  const handlePress = (e: GestureResponderEvent) => {
    if (!inputDisabled) {
      textInputRef.current?.focus();
    } else {
      onPress?.(e);
    }
  };

  useEffect(() => {
    if (!inputDisabled) {
      textInputRef.current?.focus();
    }
  }, [inputDisabled]);

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={inputDisabled ? 0.6 : 1}
      onPress={handlePress}
    >
      <View style={styles.container}>
        <MaterialIcons name="search" color={Colors.bluegreen} size={20} />
        {inputDisabled ? (
          <Text style={styles.text}>Search</Text>
        ) : (
          <TextInput
            ref={textInputRef}
            style={styles.text}
            placeholderTextColor={Colors.greengrey}
            placeholder="Search"
            clearButtonMode="while-editing"
            keyboardType="web-search"
            value={value}
            onChangeText={onChangeText}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 83, 95, 0.1)",
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: "light",
    color: Colors.bluegreen,
    marginLeft: 5,
    flex: 1,
  },
});

export default SearchBar;
