import {
    BACKEND_ERROR_MESSAGE,
    SUCCESS_FORM,
} from "@/shared/constants/backend";
import { PropsWithChildren } from "react";
import {
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppSnackbar from "../feedback/AppSnackbar";
import AppButton from "../input/AppButton";

type FormProps = {
  buttonText?: string;
  snackVisible?: boolean;
  snackMessage?: string;
  isError?: boolean;
  onDismissSnack?: () => void;
  containerStyle?: ViewStyle;
  formStyle?: ViewStyle;
  onSubmit?: () => void;
  isPending?: boolean;
} & PropsWithChildren;

export default function Form({
  children,
  buttonText = "Enviar",
  snackMessage,
  isError = false,
  snackVisible = false,
  onDismissSnack = () => {},
  containerStyle,
  formStyle,
  onSubmit,
  isPending,
}: FormProps) {
  const snackbarMessage =
    snackMessage ?? (isError ? BACKEND_ERROR_MESSAGE : SUCCESS_FORM);

  return (
    <>
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFill}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={[styles.container, containerStyle]}>
          <View style={[styles.form, formStyle]}>{children}</View>
          <AppButton onPress={onSubmit} isLoading={isPending}>
            {buttonText}
          </AppButton>
        </View>
      </TouchableWithoutFeedback>
      <AppSnackbar
        visible={snackVisible}
        onDismiss={onDismissSnack}
        severity={isError ? "error" : "success"}
      >
        {snackbarMessage}
      </AppSnackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp("5%"),
    paddingHorizontal: wp("5%"),
    gap: hp("5%"),
  },

  form: {
    gap: hp("3%"),
  },
});
