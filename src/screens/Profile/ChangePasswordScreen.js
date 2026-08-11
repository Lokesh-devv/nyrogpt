import React, {
  useState,
  useMemo,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

function ChangePasswordScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showCurrent,
    setShowCurrent] =
    useState(false);

  const [showNew,
    setShowNew] =
    useState(false);

  const [showConfirm,
    setShowConfirm] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  /* -------------------------------------------------- */
  /* Validation                                         */
  /* -------------------------------------------------- */

  const passwordStrength =
    useMemo(() => {

      if (newPassword.length === 0)
        return "";

      if (newPassword.length < 6)
        return "Weak";

      if (newPassword.length < 10)
        return "Medium";

      return "Strong";

    }, [newPassword]);

  const passwordsMatch =
    useMemo(() => {

      if (
        confirmPassword.length === 0
      ) {

        return true;

      }

      return (
        newPassword ===
        confirmPassword
      );

    }, [

      newPassword,

      confirmPassword,

    ]);

  const canUpdate =

    currentPassword.length > 0 &&

    newPassword.length >= 6 &&

    passwordsMatch;

  /* -------------------------------------------------- */
  /* Update Password                                    */
  /* -------------------------------------------------- */

  const handleUpdatePassword =
    () => {

      if (

        !canUpdate ||

        loading

      ) {

        return;

      }

      setLoading(true);

      /*
        Backend

        PUT /change-password
      */

      setTimeout(() => {

        setLoading(false);

        navigation.goBack();

      },1200);

    };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView edges={["top"]}
      style={styles.container}
    >

      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

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

          <Text style={styles.headerTitle}>

            Change Password

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* Form */}

        <View style={styles.form}>

          <Text style={styles.label}>

            Current Password

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

              value={currentPassword}

              onChangeText={
                setCurrentPassword
              }

              secureTextEntry={
                !showCurrent
              }

              placeholder="Current Password"

              placeholderTextColor={
                colors.textMuted
              }

              style={styles.input}

            />

            <TouchableOpacity

              onPress={()=>

                setShowCurrent(

                  !showCurrent

                )

              }

            >

              <Ionicons

                name={

                  showCurrent

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

              value={newPassword}

              onChangeText={
                setNewPassword
              }

              secureTextEntry={
                !showNew
              }

              placeholder="New Password"

              placeholderTextColor={
                colors.textMuted
              }

              style={styles.input}

            />

            <TouchableOpacity

              onPress={()=>

                setShowNew(

                  !showNew

                )

              }

            >

              <Ionicons

                name={

                  showNew

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

                    {/* ------------------------------------------ */}
          {/* Password Strength                          */}
          {/* ------------------------------------------ */}

          {

            newPassword.length > 0 &&

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

          {/* ------------------------------------------ */}
          {/* Confirm Password                           */}
          {/* ------------------------------------------ */}

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

              secureTextEntry={!showConfirm}

              placeholder="Confirm Password"

              placeholderTextColor={colors.textMuted}

              style={styles.input}

            />

            <TouchableOpacity

              onPress={() =>

                setShowConfirm(

                  !showConfirm

                )

              }

            >

              <Ionicons

                name={

                  showConfirm

                    ?

                    "eye-off-outline"

                    :

                    "eye-outline"

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

        {/* ------------------------------------------ */}
        {/* Buttons                                    */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={[

            styles.updateButton,

            (!canUpdate || loading) &&

            styles.disabledButton,

          ]}

          disabled={

            !canUpdate ||

            loading

          }

          onPress={handleUpdatePassword}

        >

          <Text style={styles.updateButtonText}>

            {

              loading

                ?

                "Updating..."

                :

                "Update Password"

            }

          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.cancelButton}

          onPress={() =>

            navigation.goBack()

          }

        >

          <Text style={styles.cancelButtonText}>

            Cancel

          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>

  );

}

const createStyles = (colors) => StyleSheet.create({

  container:{

    flex:1,

    backgroundColor:colors.background,

  },

  content:{

    paddingBottom:40,

  },

  header:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingHorizontal:Spacing.lg,

    paddingVertical:Spacing.lg,

  },

  backButton:{

    width:44,

    height:44,

    borderRadius:Radius.round,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

  },

  placeholder:{

    width:44,

  },

  headerTitle:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  form:{

    marginHorizontal:Spacing.lg,

  },

  label:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

    marginTop:Spacing.md,

    marginBottom:Spacing.sm,

  },

  inputContainer:{

    flexDirection:"row",

    alignItems:"center",

    backgroundColor:colors.surface,

    borderRadius:Radius.lg,

    borderWidth:1,

    borderColor:colors.border,

    height:58,

    paddingHorizontal:Spacing.md,

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

  updateButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.xxl,

    backgroundColor:colors.primary,

    borderRadius:Radius.lg,

    justifyContent:"center",

    alignItems:"center",

  },

  disabledButton:{

    opacity:0.5,

  },

  updateButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

    cancelButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.md,

    marginBottom:Spacing.xxxl,

    borderRadius:Radius.lg,

    borderWidth:1,

    borderColor:colors.border,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

  },

  cancelButtonText:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

});

export default React.memo(ChangePasswordScreen);
