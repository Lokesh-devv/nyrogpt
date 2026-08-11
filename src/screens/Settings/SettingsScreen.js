import React, {
  useState,
  useMemo,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../../theme";

function SettingsScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [darkMode, setDarkMode] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  const [systemTheme, setSystemTheme] =
    useState(false);

  /* -------------------------------------------------- */
  /* Menu                                               */
  /* -------------------------------------------------- */

  const menuItems = useMemo(() => [

    {

      id:"0",

      title:"Theme",

      icon:"color-palette-outline",

      screen:"Theme",

    },

    {

      id:"1",

      title:"Language",

      icon:"language-outline",

      screen:"Language",

    },

    {

      id:"2",

      title:"Privacy",

      icon:"shield-checkmark-outline",

      screen:"Privacy",

    },

    {

      id:"3",

      title:"Security",

      icon:"lock-closed-outline",

      screen:"Security",

    },

    {

      id:"4",

      title:"Export Chats",

      icon:"download-outline",

      screen:"Export",

    },

    {

      id:"5",

      title:"Clear Chat History",

      icon:"trash-outline",

      screen:"ClearHistory",

      danger:true,

    },

    {

      id:"6",

      title:"About",

      icon:"information-circle-outline",

      screen:"About",

    },

    {

      id:"7",

      title:"Help & Support",

      icon:"help-circle-outline",

      screen:"Help",

    },

    {

      id:"8",

      title:"Rate App",

      icon:"star-outline",

      screen:"Rate",

    },

  ], []);

  /* -------------------------------------------------- */
  /* Navigation                                         */
  /* -------------------------------------------------- */

  const handleNavigate = (screen) => {

    const registeredRoutes = [
      "Language",
      "Security",
      "About",
      "Help",
      "NotificationSettings",
      "Theme",
    ];

    if (registeredRoutes.includes(screen)) {
      navigation.navigate(screen);
      return;
    }

    Alert.alert("Coming soon", "This option is not available yet.");

  };

  /* -------------------------------------------------- */
  /* Render Item                                        */
  /* -------------------------------------------------- */

  const renderMenuItem = (item) => (

    <TouchableOpacity

      key={item.id}

      activeOpacity={0.8}

      style={styles.menuItem}

      onPress={() =>

        handleNavigate(item.screen)

      }

    >

      <View style={styles.menuLeft}>

        <Ionicons

          name={item.icon}

          size={22}

          color={

            item.danger

              ?

              colors.danger

              :

              colors.primary

          }

        />

        <Text

          style={[

            styles.menuTitle,

            item.danger &&

            styles.dangerText,

          ]}

        >

          {item.title}

        </Text>

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

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

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

          <Text style={styles.headerTitle}>

            Settings

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* Appearance */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Appearance

          </Text>

                    {/* Dark Mode */}

          <View style={styles.switchRow}>

            <View style={styles.switchLeft}>

              <Ionicons
                name="moon-outline"
                size={22}
                color={colors.primary}
              />

              <Text style={styles.switchTitle}>

                Dark Mode

              </Text>

            </View>

            <Switch

              value={darkMode}

              onValueChange={setDarkMode}

              thumbColor={

                darkMode

                  ? colors.primary

                  : colors.switchOff

              }

              trackColor={{

                false: colors.switchTrackOff,

                true: colors.switchTrackOn,

              }}

            />

          </View>

          {/* System Theme */}

          <View style={styles.switchRow}>

            <View style={styles.switchLeft}>

              <Ionicons

                name="phone-portrait-outline"

                size={22}

                color={colors.primary}

              />

              <Text style={styles.switchTitle}>

                Follow System Theme

              </Text>

            </View>

            <Switch

              value={systemTheme}

              onValueChange={setSystemTheme}

              thumbColor={

                systemTheme

                  ? colors.primary

                  : colors.switchOff

              }

              trackColor={{

                false:colors.switchTrackOff,

                true:colors.switchTrackOn,

              }}

            />

          </View>

        </View>

        {/* ------------------------------------------ */}
        {/* Notifications                             */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Notifications

          </Text>

          <View style={styles.switchRow}>

            <View style={styles.switchLeft}>

              <Ionicons

                name="notifications-outline"

                size={22}

                color={colors.primary}

              />

              <Text style={styles.switchTitle}>

                Push Notifications

              </Text>

            </View>

            <Switch

              value={notifications}

              onValueChange={setNotifications}

              thumbColor={

                notifications

                  ? colors.primary

                  : colors.switchOff

              }

              trackColor={{

                false:colors.switchTrackOff,

                true:colors.switchTrackOn,

              }}

            />

          </View>

        </View>

        {/* ------------------------------------------ */}
        {/* General Settings                           */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            General

          </Text>

          {

            menuItems.map(renderMenuItem)

          }

        </View>

        {/* ------------------------------------------ */}
        {/* App Version                                */}
        {/* ------------------------------------------ */}

        <View style={styles.versionContainer}>

          <Text style={styles.versionTitle}>

            Nyro GPT

          </Text>

          <Text style={styles.versionText}>

            Version 1.0.0

          </Text>

          <Text style={styles.versionSubText}>

            Powered by AI

          </Text>

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

    alignItems:"center",

    justifyContent:"space-between",

    paddingHorizontal:Spacing.lg,

    paddingVertical:Spacing.lg,

  },

  backButton:{

    width:42,

    height:42,

    borderRadius:Radius.round,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

  },

  placeholder:{

    width:42,

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

    paddingVertical:14,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  switchLeft:{

    flexDirection:"row",

    alignItems:"center",

    flex:1,

  },

  switchTitle:{

    color:colors.text,

    fontSize:Typography.body,

    marginLeft:Spacing.md,

  },

    menuItem: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingVertical: 16,

    borderBottomWidth: 1,

    borderBottomColor: colors.border,

  },

  menuLeft: {

    flexDirection: "row",

    alignItems: "center",

    flex: 1,

  },

  menuTitle: {

    color: colors.text,

    fontSize: Typography.body,

    marginLeft: Spacing.md,

    fontWeight: "500",

  },

  dangerText: {

    color: colors.danger,

  },

  versionContainer: {

    alignItems: "center",

    justifyContent: "center",

    marginTop: Spacing.xl,

    marginBottom: Spacing.xxxl,

    paddingHorizontal: Spacing.lg,

  },

  versionTitle: {

    color: colors.text,

    fontSize: 22,

    fontWeight: "700",

    marginBottom: 6,

  },

  versionText: {

    color: colors.textSecondary,

    fontSize: Typography.body,

    marginBottom: 4,

  },

  versionSubText: {

    color: colors.textMuted,

    fontSize: Typography.caption,

  },

});

export default React.memo(SettingsScreen);
