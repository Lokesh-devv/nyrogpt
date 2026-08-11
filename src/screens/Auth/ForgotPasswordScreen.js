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

function ForgotPasswordScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* -------------------------------------------------- */
  /* Validation                                         */
  /* -------------------------------------------------- */

  const isValidEmail = useMemo(() => {

    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

  }, [email]);

  /* -------------------------------------------------- */
  /* Send OTP                                           */
  /* -------------------------------------------------- */

  const handleSendOTP = async () => {

    if (!isValidEmail || loading) {

      return;

    }

    setLoading(true);

    /*
      Backend

      POST /forgot-password

    */

    setTimeout(() => {

      setLoading(false);

      navigation.navigate(

        "OTPVerification",

        {

          email,

        }

      );

    }, 1200);

  };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top"]}>

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

            onPress={() =>

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

        <View style={styles.titleContainer}>

          <Text style={styles.title}>

            Forgot Password

          </Text>

          <Text style={styles.subtitle}>

            Enter your registered email
            address to receive a
            verification code.

          </Text>

        </View>

        {/* Email */}

        <View style={styles.form}>

          <Text style={styles.label}>

            Email Address

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="mail-outline"

              size={20}

              color={colors.textMuted}

            />

            <TextInput

              value={email}

              onChangeText={setEmail}

              placeholder="Enter your email"

              placeholderTextColor={
                colors.textMuted
              }

              keyboardType="email-address"

              autoCapitalize="none"

              autoCorrect={false}

              style={styles.input}

            />

          </View>

                    {/* Validation */}

          {

            email.length > 0 &&

            !isValidEmail &&

            (

              <Text style={styles.errorText}>

                Please enter a valid email address.

              </Text>

            )

          }

        </View>

        {/* Send OTP Button */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={[

            styles.sendButton,

            (!isValidEmail || loading) &&

            styles.disabledButton,

          ]}

          disabled={

            !isValidEmail ||

            loading

          }

          onPress={handleSendOTP}

        >

          {

            loading

            ?

            (

              <Text style={styles.sendButtonText}>

                Sending...

              </Text>

            )

            :

            (

              <Text style={styles.sendButtonText}>

                Send OTP

              </Text>

            )

          }

        </TouchableOpacity>

        {/* Footer */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>

            Remember your password?

          </Text>

          <TouchableOpacity

            activeOpacity={0.8}

            onPress={() =>

              navigation.goBack()

            }

          >

            <Text style={styles.loginText}>

              Back to Login

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

  form:{

    marginBottom:Spacing.xl,

  },

  label:{

    color:colors.text,

    fontSize:Typography.body,

    marginBottom:Spacing.sm,

    fontWeight:"600",

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

  errorText:{

    color:colors.danger,

    marginTop:Spacing.sm,

    fontSize:Typography.small,

  },

  sendButton:{

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

  sendButtonText:{

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

export default React.memo(ForgotPasswordScreen);
