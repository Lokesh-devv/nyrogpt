import React, {
  useState,
  useRef,
  useEffect,
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

function OTPVerificationScreen({

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
  /* OTP State                                          */
  /* -------------------------------------------------- */

  const [otp, setOtp] = useState([

    "", "", "", "", "", ""

  ]);

  const [loading, setLoading] =
    useState(false);

  const [seconds, setSeconds] =
    useState(60);

  /* -------------------------------------------------- */
  /* Input Refs                                         */
  /* -------------------------------------------------- */

  const inputRefs = [

    useRef(null),

    useRef(null),

    useRef(null),

    useRef(null),

    useRef(null),

    useRef(null),

  ];

  /* -------------------------------------------------- */
  /* Timer                                              */
  /* -------------------------------------------------- */

  useEffect(() => {

    if (seconds === 0) return;

    const timer = setTimeout(() => {

      setSeconds((prev) => prev - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [seconds]);

  /* -------------------------------------------------- */
  /* OTP Change                                         */
  /* -------------------------------------------------- */

  const handleOTPChange = (

    value,

    index

  ) => {

    if (!/^\d?$/.test(value)) {

      return;

    }

    const updatedOTP = [...otp];

    updatedOTP[index] = value;

    setOtp(updatedOTP);

    if (

      value &&

      index < 5

    ) {

      inputRefs[index + 1]

        .current

        ?.focus();

    }

  };

  /* -------------------------------------------------- */
  /* Backspace                                          */
  /* -------------------------------------------------- */

  const handleKeyPress = (

    event,

    index

  ) => {

    if (

      event.nativeEvent.key ===

      "Backspace"

    ) {

      if (

        otp[index] === "" &&

        index > 0

      ) {

        inputRefs[index - 1]

          .current

          ?.focus();

      }

    }

  };

  /* -------------------------------------------------- */
  /* Verify OTP                                         */
  /* -------------------------------------------------- */

  const handleVerify = () => {

    if (

      otp.join("").length !== 6 ||

      loading

    ) {

      return;

    }

    setLoading(true);

    /*
      Backend

      POST /verify-otp
    */

    setTimeout(() => {

      setLoading(false);

      navigation.navigate(

        "ResetPassword",

        {

          email,

        }

      );

    }, 1200);

  };

  /* -------------------------------------------------- */
  /* Resend OTP                                         */
  /* -------------------------------------------------- */

  const handleResend = () => {

    if (seconds > 0) {

      return;

    }

    setSeconds(60);

    /*
      Backend

      POST /resend-otp
    */

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

            OTP Verification

          </Text>

          <Text style={styles.subtitle}>

            Enter the 6-digit verification
            code sent to

          </Text>

          <Text style={styles.email}>

            {email}

          </Text>

        </View>

                {/* ------------------------------------------ */}
        {/* OTP Input                                  */}
        {/* ------------------------------------------ */}

        <View style={styles.otpContainer}>

          {

            otp.map((digit, index) => (

              <TextInput

                key={index}

                ref={inputRefs[index]}

                value={digit}

                onChangeText={(value) =>

                  handleOTPChange(

                    value,

                    index

                  )

                }

                onKeyPress={(event) =>

                  handleKeyPress(

                    event,

                    index

                  )

                }

                keyboardType="number-pad"

                maxLength={1}

                style={styles.otpInput}

                selectionColor={colors.primary}

              />

            ))

          }

        </View>

        {/* ------------------------------------------ */}
        {/* Verify Button                              */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={[

            styles.verifyButton,

            (

              otp.join("").length !== 6 ||

              loading

            ) &&

            styles.disabledButton,

          ]}

          disabled={

            otp.join("").length !== 6 ||

            loading

          }

          onPress={handleVerify}

        >

          <Text style={styles.verifyButtonText}>

            {

              loading

              ?

              "Verifying..."

              :

              "Verify OTP"

            }

          </Text>

        </TouchableOpacity>

        {/* ------------------------------------------ */}
        {/* Timer                                      */}
        {/* ------------------------------------------ */}

        <View style={styles.timerContainer}>

          {

            seconds > 0

            ?

            (

              <Text style={styles.timerText}>

                Resend OTP in {seconds}s

              </Text>

            )

            :

            (

              <TouchableOpacity

                activeOpacity={0.8}

                onPress={handleResend}

              >

                <Text style={styles.resendText}>

                  Resend OTP

                </Text>

              </TouchableOpacity>

            )

          }

        </View>

        {/* ------------------------------------------ */}
        {/* Footer                                     */}
        {/* ------------------------------------------ */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>

            Didn't receive the code?

          </Text>

          <TouchableOpacity

            activeOpacity={0.8}

            onPress={handleResend}

            disabled={seconds > 0}

          >

            <Text

              style={[

                styles.footerLink,

                seconds > 0 &&

                styles.footerDisabled,

              ]}

            >

              Send Again

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

  otpContainer:{

    flexDirection:"row",

    justifyContent:"space-between",

    marginBottom:Spacing.xxxl,

  },

  otpInput:{

    width:50,

    height:60,

    borderRadius:Radius.md,

    backgroundColor:colors.surface,

    borderWidth:1,

    borderColor:colors.border,

    color:colors.text,

    fontSize:26,

    fontWeight:"700",

    textAlign:"center",

  },

  verifyButton:{

    height:56,

    borderRadius:Radius.lg,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

  },

  disabledButton:{

    opacity:0.5,

  },

  verifyButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

    timerContainer:{

    alignItems:"center",

    marginTop:Spacing.xl,

  },

  timerText:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    fontWeight:"500",

  },

  resendText:{

    color:colors.primary,

    fontSize:Typography.body,

    fontWeight:"700",

  },

  footer:{

    marginTop:"auto",

    flexDirection:"row",

    justifyContent:"center",

    alignItems:"center",

    paddingBottom:Spacing.xxxl,

  },

  footerText:{

    color:colors.textSecondary,

    fontSize:Typography.body,

  },

  footerLink:{

    color:colors.primary,

    fontSize:Typography.body,

    fontWeight:"700",

    marginLeft:6,

  },

  footerDisabled:{

    opacity:0.5,

  },

});

export default React.memo(OTPVerificationScreen);
