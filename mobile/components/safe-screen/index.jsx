import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

export const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <StatusBar hidden={true} />
      {children}
    </View>
  );
};
