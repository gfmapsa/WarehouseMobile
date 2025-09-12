import { Colors } from "@/shared/constants/colors";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import AppText from "../text/AppText";

type AutocompleteProps<T> = {
  label: string;
  data: T[];
  value: string;
  setValue: (val: string) => void;
  onSearch: (query: string) => void;
  onSelect: (item: T) => void;
  loading?: boolean;
  getLabel: (item: T) => string;
  renderOption: (item: T) => React.ReactNode;
};

export default function Autocomplete<T>({
  label,
  data,
  value,
  setValue,
  onSearch,
  onSelect,
  loading = false,
  getLabel,
  renderOption,
}: AutocompleteProps<T>) {
  const [showList, setShowList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setInputHeight(height);
  };

  const handleSelectOption = (item: T) => {
    Keyboard.dismiss();
    setValue(getLabel(item));
    onSelect(item);
    setShowList(false);
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, isFocused && { zIndex: 2000 }]}>
      <TextInput
        mode="flat"
        label={<AppText style={{ opacity: 0.8 }}>{label}</AppText>}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          onSearch(text);
          setShowList(true);
        }}
        onFocus={() => {
          setIsFocused(true);
          setShowList(true);
        }}
        onBlur={() =>
          setTimeout(() => {
            setShowList(false);
            setIsFocused(false);
          }, 200)
        }
        onLayout={handleLayout}
        right={
          loading ? <TextInput.Icon icon={() => <ActivityIndicator />} /> : null
        }
        style={styles.input}
        underlineStyle={{ display: "none" }}
        textColor={Colors.primary}
        activeUnderlineColor={Colors.primary}
      />

      {showList && data.length > 0 && (
        <FlatList
          style={[styles.dropdown, { top: inputHeight }]}
          keyboardShouldPersistTaps="handled"
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectOption(item)}>
              {renderOption(item)}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  input: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderRadius: 4,
  },

  dropdown: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 5,
  },
});
