import { useTheme } from "../../theme";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secure, setSecure] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      alert("Enter Email");
      return;
    }

    if (!password.trim()) {
      alert("Enter Password");
      return;
    }

    try {
      setLoading(true);

      /*
      API CALL

      const response = await login({
          email,
          password
      });

      */

      navigation.replace("App");
    } catch (e) {
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>

      <StatusBar
        backgroundColor={colors.background}
        barStyle={colors.isDark ? "light-content" : "dark-content"}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboard}
      >

        <View style={styles.logoContainer}>

          <Image
            source={require("../../../assets/nyrologo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>
            Welcome to
          </Text>

          <Text style={styles.appName}>
            Nyro GPT
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue
          </Text>

        </View>

        <View style={styles.form}>

          <View style={styles.inputBox}>

            <Ionicons
              name="mail-outline"
              color={colors.textSecondary}
              size={20}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

          </View>

          <View style={styles.inputBox}>

            <Ionicons
              name="lock-closed-outline"
              color={colors.textSecondary}
              size={20}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setSecure(!secure)}
            >
              <Ionicons
                name={
                  secure
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                color={colors.textSecondary}
                size={20}
              />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.9}
            onPress={handleLogin}
          >

            {
              loading
                ?
                <ActivityIndicator
                  color={colors.buttonText}
                />
                :
                <Text style={styles.loginText}>
                  Continue
                </Text>
            }

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboard: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },

  logo: {
    width: 90,
    height: 90,
    marginBottom: 25,
  },

  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "400",
  },

  appName: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "700",
    marginTop: 5,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 10,
  },

  form: {

  },

  inputBox: {

    height: 58,

    backgroundColor: colors.surface,

    borderRadius: 16,

    marginBottom: 18,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 18,

  },

  input: {

    flex: 1,

    color: colors.text,

    fontSize: 16,

    marginLeft: 12,

  },

  forgotButton: {

    alignSelf: "flex-end",

    marginBottom: 30,

  },

  forgotText: {

    color: colors.primary,

    fontSize: 15,

    fontWeight: "600",

  },

  loginButton: {

    height: 58,

    borderRadius: 16,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",

  },

  loginText: {

    color: colors.buttonText,

    fontSize: 17,

    fontWeight: "700",

  },

});
