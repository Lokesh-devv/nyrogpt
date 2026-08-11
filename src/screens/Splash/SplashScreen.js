import { useTheme } from "../../theme";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Image
        source={require("../../../assets/nyrologo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 180,
    height: 180,
  },
});
