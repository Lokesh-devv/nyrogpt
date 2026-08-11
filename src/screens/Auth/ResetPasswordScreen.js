import React, {
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../../theme";

function ResetPasswordScreen({

  navigation,

  route,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* Route                                              */
  /* -------------------------------------------------- */

  const email = route?.params?.email || "";

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  /* -------------------------------------------------- */
  /* Validation                                         */
  /* -------------------------------------------------- */

  const passwordStrength =
    useMemo(() => {

      if (password.length === 0)
        return "";

      if (password.length < 6)
        return "Weak";

      if (password.length < 10)
        return "Medium";

      return "Strong";

    }, [password]);

  const passwordsMatch =
    useMemo(() => {

      if (
        confirmPassword.length === 0
      ) {

        return true;

      }

      return password === confirmPassword;

    }, [

      password,

      confirmPassword,

    ]);

  const canReset =
    password.length >= 6 &&
    passwordsMatch;

  /* -------------------------------------------------- */
  /* Reset Password                                     */
  /* -------------------------------------------------- */

  const handleResetPassword =
    async () => {

      if (
        !canReset ||
        loading
      ) {

        return;

      }

      setLoading(true);

      /*
        Backend

        POST /reset-password

      */

      setTimeout(() => {

        setLoading(false);

        navigation.reset({

          index:0,

          routes:[

            {

              name:"Login",

            },

          ],

        });

      },1500);

    };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView edges={["top"]}
      style={styles.container}
    >

      <KeyboardAvoidingView

        style={styles.keyboard}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }

      >

        {/* Header */}

        <View style={styles.header}>

          <TouchableOpacity

            style={styles.backButton}

            onPress={()=>

              navigation.goBack()

            }

          >

            <Ionicons

              name="arrow-back"

              size={22}

              color={colors.text}

            />

          </TouchableOpacity>

        </View>

        {/* Title */}

        <View
          style={styles.titleContainer}
        >

          <Text style={styles.title}>

            Reset Password

          </Text>

          <Text style={styles.subtitle}>

            Create a new secure
            password for

          </Text>

          <Text style={styles.email}>

            {email}

          </Text>

        </View>

        {/* Form */}

        <View style={styles.form}>

          <Text style={styles.label}>

            New Password

          </Text>

          <View
            style={styles.inputContainer}
          >

            <Ionicons

              name="lock-closed-outline"

              size={20}

              color={colors.textMuted}

            />

            <TextInput

              value={password}

              onChangeText={setPassword}

              secureTextEntry={
                !showPassword
              }

              placeholder="Enter new password"

              placeholderTextColor={
                colors.textMuted
              }

              style={styles.input}

            />

            <TouchableOpacity

              onPress={()=>

                setShowPassword(

                  !showPassword

                )

              }

            >

              <Ionicons

                name={

                  showPassword

                  ?

                  "eye-off-outline"

                  :

                  "eye-outline"

                }

                size={22}

                color={
                  colors.textSecondary
                }

              />

            </TouchableOpacity>

          </View>

                    {/* Password Strength */}

          {

            password.length > 0 &&

            (

              <View style={styles.strengthContainer}>

                <Text style={styles.strengthLabel}>

                  Password Strength

                </Text>

                <Text

                  style={[

                    styles.strengthValue,

                    passwordStrength === "Weak"

                      ? styles.weak

                      : passwordStrength === "Medium"

                      ? styles.medium

                      : styles.strong,

                  ]}

                >

                  {passwordStrength}

                </Text>

              </View>

            )

          }

          {/* Confirm Password */}

          <Text style={styles.label}>

            Confirm Password

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="lock-closed-outline"

              size={20}

              color={colors.textMuted}

            />

            <TextInput

              value={confirmPassword}

              onChangeText={setConfirmPassword}

              secureTextEntry={!showConfirmPassword}

              placeholder="Confirm your password"

              placeholderTextColor={colors.textMuted}

              style={styles.input}

            />

            <TouchableOpacity

              onPress={() =>

                setShowConfirmPassword(

                  !showConfirmPassword

                )

              }

            >

              <Ionicons

                name={

                  showConfirmPassword

                    ? "eye-off-outline"

                    : "eye-outline"

                }

                size={22}

                color={colors.textSecondary}

              />

            </TouchableOpacity>

          </View>

          {

            confirmPassword.length > 0 &&

            !passwordsMatch &&

            (

              <Text style={styles.errorText}>

                Passwords do not match.

              </Text>

            )

          }

        </View>

        {/* Reset Button */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={[

            styles.resetButton,

            (!canReset || loading) &&

              styles.disabledButton,

          ]}

          disabled={

            !canReset ||

            loading

          }

          onPress={handleResetPassword}

        >

          <Text style={styles.resetButtonText}>

            {

              loading

                ? "Updating..."

                : "Reset Password"

            }

          </Text>

        </TouchableOpacity>

        {/* Footer */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>

            Remember your password?

          </Text>

          <TouchableOpacity

            activeOpacity={0.8}

            onPress={() =>

              navigation.navigate("Login")

            }

          >

            <Text style={styles.loginText}>

              Login

            </Text>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}

const createStyles = (colors) => StyleSheet.create({

  container:{

    flex:1,

    backgroundColor:colors.background,

  },

  keyboard:{

    flex:1,

    paddingHorizontal:Spacing.xl,

  },

  header:{

    paddingTop:Spacing.lg,

    paddingBottom:Spacing.xl,

  },

  backButton:{

    width:44,

    height:44,

    borderRadius:Radius.round,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

  },

  titleContainer:{

    marginBottom:Spacing.xxxl,

  },

  title:{

    color:colors.text,

    fontSize:32,

    fontWeight:"700",

    marginBottom:Spacing.sm,

  },

  subtitle:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    lineHeight:24,

  },

  email:{

    color:colors.primary,

    fontSize:Typography.body,

    fontWeight:"600",

    marginTop:Spacing.sm,

  },

  form:{

    marginBottom:Spacing.lg,

  },

  label:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

    marginBottom:Spacing.sm,

    marginTop:Spacing.md,

  },

  inputContainer:{

    flexDirection:"row",

    alignItems:"center",

    backgroundColor:colors.surface,

    borderRadius:Radius.lg,

    borderWidth:1,

    borderColor:colors.border,

    paddingHorizontal:Spacing.md,

    height:58,

  },

  input:{

    flex:1,

    color:colors.text,

    fontSize:Typography.body,

    marginLeft:Spacing.md,

  },

  strengthContainer:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    marginTop:Spacing.sm,

    marginBottom:Spacing.md,

  },

  strengthLabel:{

    color:colors.textSecondary,

    fontSize:Typography.small,

  },

  strengthValue:{

    fontSize:Typography.small,

    fontWeight:"700",

  },

  weak:{

    color:colors.danger,

  },

  medium:{

    color:colors.warning,

  },

  strong:{

    color:colors.success,

  },

  errorText:{

    color:colors.danger,

    fontSize:Typography.small,

    marginTop:Spacing.sm,

  },

  resetButton:{

    height:56,

    borderRadius:Radius.lg,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

    marginTop:Spacing.lg,

  },

  disabledButton:{

    opacity:0.5,

  },

  resetButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

    footer: {

    marginTop: "auto",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    paddingBottom: Spacing.xxxl,

  },

  footerText: {

    color: colors.textSecondary,

    fontSize: Typography.body,

  },

  loginText: {

    color: colors.primary,

    fontSize: Typography.body,

    fontWeight: "700",

    marginLeft: 6,

  },

});

export default React.memo(ResetPasswordScreen);
