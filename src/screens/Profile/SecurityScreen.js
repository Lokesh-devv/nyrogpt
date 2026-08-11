import React, {
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
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

function SecurityScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [biometricEnabled,
    setBiometricEnabled] =
    useState(true);

  const [appLockEnabled,
    setAppLockEnabled] =
    useState(true);

  const [twoFactorEnabled,
    setTwoFactorEnabled] =
    useState(false);

  const [loginAlertsEnabled,
    setLoginAlertsEnabled] =
    useState(true);

  /* -------------------------------------------------- */
  /* Render Switch Row                                  */
  /* -------------------------------------------------- */

  const renderSwitchRow = (

    title,

    subtitle,

    icon,

    value,

    onValueChange

  ) => (

    <View style={styles.switchRow}>

      <View style={styles.leftSection}>

        <View style={styles.iconContainer}>

          <Ionicons

            name={icon}

            size={20}

            color={colors.primary}

          />

        </View>

        <View style={styles.textContainer}>

          <Text style={styles.itemTitle}>

            {title}

          </Text>

          <Text style={styles.itemSubtitle}>

            {subtitle}

          </Text>

        </View>

      </View>

      <Switch

        value={value}

        onValueChange={onValueChange}

        thumbColor={

          value

            ? colors.primary

            : colors.switchOff

        }

        trackColor={{

          false:colors.switchTrackOff,

          true:colors.switchTrackOn,

        }}

      />

    </View>

  );

  /* -------------------------------------------------- */
  /* Render Menu Item                                   */
  /* -------------------------------------------------- */

  const renderMenuItem = (

    title,

    subtitle,

    icon,

    onPress,

    danger=false

  ) => (

    <TouchableOpacity

      activeOpacity={0.85}

      style={styles.menuItem}

      onPress={onPress}

    >

      <View style={styles.leftSection}>

        <View style={styles.iconContainer}>

          <Ionicons

            name={icon}

            size={20}

            color={

              danger

              ?

              colors.danger

              :

              colors.primary

            }

          />

        </View>

        <View style={styles.textContainer}>

          <Text

            style={[

              styles.itemTitle,

              danger &&

              styles.dangerText,

            ]}

          >

            {title}

          </Text>

          <Text style={styles.itemSubtitle}>

            {subtitle}

          </Text>

        </View>

      </View>

      <Ionicons

        name="chevron-forward"

        size={20}

        color={colors.textMuted}

      />

    </TouchableOpacity>

  );

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */

  return (

    <SafeAreaView style={styles.container} edges={["top"]}>

      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

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

            Security

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* Authentication */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Authentication

          </Text>

          {

            renderSwitchRow(

              "Biometric Login",

              "Use Face ID / Fingerprint",

              "finger-print-outline",

              biometricEnabled,

              setBiometricEnabled

            )

          }

          {

            renderSwitchRow(

              "App Lock",

              "Require authentication to open app",

              "lock-closed-outline",

              appLockEnabled,

              setAppLockEnabled

            )

          }

          {

            renderSwitchRow(

              "Two-Factor Authentication",

              "Extra account security",

              "shield-checkmark-outline",

              twoFactorEnabled,

              setTwoFactorEnabled

            )

          }

          {

            renderSwitchRow(

              "Login Alerts",

              "Notify when a new login occurs",

              "notifications-outline",

              loginAlertsEnabled,

              setLoginAlertsEnabled

            )

          }

        </View>

                {/* ------------------------------------------ */}
        {/* Device & Sessions                          */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Device & Sessions

          </Text>

          {

            renderMenuItem(

              "Active Sessions",

              "Manage devices currently signed in",

              "phone-portrait-outline",

              () => {

                console.log("Active Sessions");

              }

            )

          }

          {

            renderMenuItem(

              "Trusted Devices",

              "View and remove trusted devices",

              "desktop-outline",

              () => {

                console.log("Trusted Devices");

              }

            )

          }

          {

            renderMenuItem(

              "Login History",

              "View recent login activity",

              "time-outline",

              () => {

                console.log("Login History");

              }

            )

          }

          {

            renderMenuItem(

              "Auto Lock",

              "Automatically lock after inactivity",

              "timer-outline",

              () => {

                console.log("Auto Lock");

              }

            )

          }

        </View>

        {/* ------------------------------------------ */}
        {/* Danger Zone                                */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Danger Zone

          </Text>

          {

            renderMenuItem(

              "Delete Account",

              "Permanently delete your account",

              "trash-outline",

              () => {

                console.log("Delete Account");

              },

              true

            )

          }

        </View>

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

  card:{

    backgroundColor:colors.surface,

    marginHorizontal:Spacing.lg,

    marginBottom:Spacing.lg,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

  },

  cardTitle:{

    color:colors.text,

    fontSize:Typography.subtitle,

    fontWeight:"700",

    marginBottom:Spacing.lg,

  },

  switchRow:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingVertical:16,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  menuItem:{

    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",

    paddingVertical:16,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  leftSection:{

    flexDirection:"row",

    alignItems:"center",

    flex:1,

  },

  iconContainer:{

    width:44,

    height:44,

    borderRadius:22,

    backgroundColor:colors.background,

    justifyContent:"center",

    alignItems:"center",

  },

  textContainer:{

    flex:1,

    marginLeft:Spacing.md,

  },

  itemTitle:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  itemSubtitle:{

    color:colors.textSecondary,

    fontSize:Typography.small,

    marginTop:4,

  },

  dangerText:{

    color:colors.danger,

  },

    placeholder:{

    width:44,

  },

  saveButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.xl,

    marginBottom:Spacing.xxxl,

    borderRadius:Radius.lg,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

  },

  saveButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

});

export default React.memo(SecurityScreen);
