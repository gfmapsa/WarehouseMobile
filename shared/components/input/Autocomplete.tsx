import { Colors } from "@/shared/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppText from "../text/AppText";
import AppInput, { AppInputProps } from "./AppInput";

export type AutocompleteProps<T> = {
  data: T[];
  onSearch?: (query: string) => void;
  onSelect?: (item: T) => void;
  getLabel: (item: T) => string;
  renderOption: (item: T) => React.ReactNode;
};

export default function Autocomplete<T>({
  data,
  value,
  setValue,
  onSearch,
  onSelect,
  isLoading = false,
  getLabel,
  renderOption,
  ...props
}: AutocompleteProps<T> & AppInputProps) {
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
    onSelect && onSelect(item);
    setShowList(false);
    setIsFocused(false);
  };

  const handleClear = () => {
    setValue("");
    onSearch && onSearch("");
    setShowList(false);
  };

  return (
    <View style={[styles.container, isFocused && { zIndex: 2000 }]}>
      <AppInput
        {...props}
        value={value}
        setValue={setValue}
        onChangeText={(text) => {
          onSearch && onSearch(text);
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
          isLoading ? (
            <TextInput.Icon
              icon={() => <ActivityIndicator color={Colors.primary} />}
            />
          ) : value.length > 0 ? (
            <TextInput.Icon
              icon={() => (
                <Ionicons name="close" size={hp("2%")} color={Colors.primary} />
              )}
              onPress={handleClear}
            />
          ) : null
        }
      />

      {showList && (
        <>
          {data.length > 0 && !isLoading ? (
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
          ) : (
            <View
              style={[
                styles.dropdown,
                styles.fallbackDropdown,
                { top: inputHeight },
              ]}
            >
              <AppText style={styles.fallbackText}>
                {isLoading ? "Buscando...." : "No se encontraron resultados"}
              </AppText>
            </View>
          )}
        </>
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

  dropdown: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 5,
  },

  fallbackDropdown: {
    justifyContent: "center",
    padding: 10,
  },

  fallbackText: {
    color: Colors.primary,
  },
});
