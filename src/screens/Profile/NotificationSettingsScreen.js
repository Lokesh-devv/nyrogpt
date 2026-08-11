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

function NotificationSettingsScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [pushNotifications,
    setPushNotifications] =
    useState(true);

  const [emailNotifications,
    setEmailNotifications] =
    useState(true);

  const [aiNotifications,
    setAiNotifications] =
    useState(true);

  const [chatNotifications,
    setChatNotifications] =
    useState(true);

  const [marketingNotifications,
    setMarketingNotifications] =
    useState(false);

  const [soundEnabled,
    setSoundEnabled] =
    useState(true);

  const [vibrationEnabled,
    setVibrationEnabled] =
    useState(true);

  const [showPreview,
    setShowPreview] =
    useState(true);

  /* -------------------------------------------------- */
  /* Render Switch Row                                  */
  /* -------------------------------------------------- */

  const renderSwitchRow = (

    title,

    subtitle,

    value,

    onValueChange,

    icon

  ) => (

    <View style={styles.switchRow}>

      <View style={styles.leftContainer}>

        <View style={styles.iconContainer}>

          <Ionicons

            name={icon}

            size={20}

            color={colors.primary}

          />

        </View>

        <View style={styles.textContainer}>

          <Text style={styles.title}>

            {title}

          </Text>

          <Text style={styles.subtitle}>

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

            Notifications

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* General */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            General

          </Text>

          {

            renderSwitchRow(

              "Push Notifications",

              "Receive push notifications",

              pushNotifications,

              setPushNotifications,

              "notifications-outline"

            )

          }

          {

            renderSwitchRow(

              "Email Notifications",

              "Receive updates via email",

              emailNotifications,

              setEmailNotifications,

              "mail-outline"

            )

          }

          {

            renderSwitchRow(

              "AI Notifications",

              "Notify when AI completes tasks",

              aiNotifications,

              setAiNotifications,

              "sparkles-outline"

            )

          }

          {

            renderSwitchRow(

              "Chat Notifications",

              "New conversation alerts",

              chatNotifications,

              setChatNotifications,

              "chatbubble-outline"

            )

          }

        </View>

                {/* ------------------------------------------ */}
        {/* Preferences                                */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Preferences

          </Text>

          {

            renderSwitchRow(

              "Marketing Notifications",

              "Receive product updates and offers",

              marketingNotifications,

              setMarketingNotifications,

              "megaphone-outline"

            )

          }

          {

            renderSwitchRow(

              "Notification Sound",

              "Play sound for notifications",

              soundEnabled,

              setSoundEnabled,

              "volume-high-outline"

            )

          }

          {

            renderSwitchRow(

              "Vibration",

              "Vibrate when notifications arrive",

              vibrationEnabled,

              setVibrationEnabled,

              "phone-portrait-outline"

            )

          }

          {

            renderSwitchRow(

              "Show Preview",

              "Display message preview in notifications",

              showPreview,

              setShowPreview,

              "eye-outline"

            )

          }

        </View>

        {/* ------------------------------------------ */}
        {/* Save Button                                */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={styles.saveButton}

          onPress={() => navigation.goBack()}

        >

          <Text style={styles.saveButtonText}>

            Save Preferences

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

  leftContainer:{

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

  title:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  subtitle:{

    color:colors.textSecondary,

    fontSize:Typography.small,

    marginTop:4,

  },

  saveButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.xl,

    backgroundColor:colors.primary,

    borderRadius:Radius.lg,

    justifyContent:"center",

    alignItems:"center",

  },

  saveButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

    placeholder: {

    width: 44,

  },

  saveButton: {

    height: 56,

    marginHorizontal: Spacing.lg,

    marginTop: Spacing.xl,

    marginBottom: Spacing.xxxl,

    borderRadius: Radius.lg,

    backgroundColor: colors.primary,

    justifyContent: "center",

    alignItems: "center",

  },

  saveButtonText: {

    color: colors.buttonText,

    fontSize: Typography.body,

    fontWeight: "700",

  },

});

export default React.memo(NotificationSettingsScreen);
