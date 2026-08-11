import React, {
  useState,
  useMemo,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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

export default function ProfileScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* User State                                          */
  /* -------------------------------------------------- */

  const [user] = useState({

    id: "1",

    name: "Lokesh Naidu",

    email: "lokesh@gmail.com",

    phone: "+91 9876543210",

    country: "India",

    joined: "January 2026",

    subscription: "Free Plan",

    remainingMessages: 750,

    avatar: null,

  });

  /* -------------------------------------------------- */
  /* Menu Items                                          */
  /* -------------------------------------------------- */

  const menuItems = useMemo(() => [

    {

      id:"1",

      title:"Edit Profile",

      icon:"person-outline",

      screen:"EditProfile",

    },

    {

      id:"2",

      title:"Change Password",

      icon:"lock-closed-outline",

      screen:"ChangePassword",

    },

    {

      id:"3",

      title:"Manage Subscription",

      icon:"card-outline",

      screen:"Premium",

    },

    {

      id:"4",

      title:"Privacy",

      icon:"shield-checkmark-outline",

      screen:"Privacy",

    },

    {

      id:"5",

      title:"Help & Support",

      icon:"help-circle-outline",

      screen:"Help",

    },

  ], []);

  /* -------------------------------------------------- */
  /* Navigation                                          */
  /* -------------------------------------------------- */

  const navigateTo = (screen) => {

    const registeredRoutes = [
      "EditProfile",
      "ChangePassword",
      "Help",
      "NotificationSettings",
      "Language",
      "Security",
    ];

    if (registeredRoutes.includes(screen)) {
      navigation.navigate(screen);
      return;
    }

    Alert.alert("Coming soon", "This option is not available yet.");

  };

  const handleLogout = () => {

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });

  };

  /* -------------------------------------------------- */
  /* Render Menu                                         */
  /* -------------------------------------------------- */

  const renderMenuItem = (item) => (

    <TouchableOpacity

      key={item.id}

      activeOpacity={0.85}

      style={styles.menuItem}

      onPress={() => navigateTo(item.screen)}

    >

      <View style={styles.menuLeft}>

        <Ionicons

          name={item.icon}

          size={22}

          color={colors.primary}

        />

        <Text style={styles.menuTitle}>

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
  /* Render                                              */
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

            onPress={() => navigation.goBack()}

          >

            <Ionicons

              name="arrow-back"

              size={22}

              color={colors.text}

            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>

            Profile

          </Text>

          <View style={{ width: 42 }} />

        </View>

        {/* Avatar */}

        <View style={styles.avatarSection}>

          <View style={styles.avatarContainer}>

            {

              user.avatar

              ?

              (

                <Image

                  source={{

                    uri:user.avatar,

                  }}

                  style={styles.avatar}

                />

              )

              :

              (

                <Ionicons

                  name="person"

                  size={60}

                  color={colors.text}

                />

              )

            }

          </View>

          <Text style={styles.name}>

            {user.name}

          </Text>

          <Text style={styles.email}>

            {user.email}

          </Text>

        </View>

                {/* ------------------------------------------ */}
        {/* User Information Card                      */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Personal Information

          </Text>

          <View style={styles.infoRow}>

            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.primary}
            />

            <View style={styles.infoContent}>

              <Text style={styles.infoLabel}>
                Email
              </Text>

              <Text style={styles.infoValue}>
                {user.email}
              </Text>

            </View>

          </View>

          <View style={styles.infoRow}>

            <Ionicons
              name="call-outline"
              size={20}
              color={colors.primary}
            />

            <View style={styles.infoContent}>

              <Text style={styles.infoLabel}>
                Phone
              </Text>

              <Text style={styles.infoValue}>
                {user.phone}
              </Text>

            </View>

          </View>

          <View style={styles.infoRow}>

            <Ionicons
              name="location-outline"
              size={20}
              color={colors.primary}
            />

            <View style={styles.infoContent}>

              <Text style={styles.infoLabel}>
                Country
              </Text>

              <Text style={styles.infoValue}>
                {user.country}
              </Text>

            </View>

          </View>

          <View style={styles.infoRow}>

            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.primary}
            />

            <View style={styles.infoContent}>

              <Text style={styles.infoLabel}>
                Joined
              </Text>

              <Text style={styles.infoValue}>
                {user.joined}
              </Text>

            </View>

          </View>

        </View>

        {/* ------------------------------------------ */}
        {/* Subscription Card                          */}
        {/* ------------------------------------------ */}

        <View style={styles.subscriptionCard}>

          <View style={styles.subscriptionHeader}>

            <Ionicons
              name="sparkles"
              size={24}
              color={colors.primary}
            />

            <Text style={styles.subscriptionTitle}>

              {user.subscription}

            </Text>

          </View>

          <Text style={styles.subscriptionDescription}>

            You currently have access to the Free Plan.

          </Text>

          <View style={styles.usageContainer}>

            <Text style={styles.usageLabel}>

              Remaining Messages

            </Text>

            <Text style={styles.usageValue}>

              {user.remainingMessages}

            </Text>

          </View>

          <TouchableOpacity

            activeOpacity={0.85}

            style={styles.upgradeButton}

            onPress={() =>
              navigateTo("Premium")
            }

          >

            <Text style={styles.upgradeText}>

              Upgrade to Pro

            </Text>

          </TouchableOpacity>

        </View>

        {/* ------------------------------------------ */}
        {/* Menu                                       */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Account

          </Text>

          {

            menuItems.map(renderMenuItem)

          }

        </View>

        {/* ------------------------------------------ */}
        {/* Logout                                     */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          style={styles.logoutButton}

          activeOpacity={0.85}

          onPress={handleLogout}

        >

          <Ionicons

            name="log-out-outline"

            size={22}

            color={colors.text}

          />

          <Text style={styles.logoutButtonText}>

            Logout

          </Text>

        </TouchableOpacity>

        <Text style={styles.version}>

          Nyro GPT v1.0.0

        </Text>

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

  headerTitle:{

    color:colors.text,

    fontSize:Typography.title,

    fontWeight:"700",

  },

  avatarSection:{

    alignItems:"center",

    marginTop:Spacing.md,

    marginBottom:Spacing.xxl,

  },

  avatarContainer:{

    width:110,

    height:110,

    borderRadius:55,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:Spacing.md,

  },

  avatar:{

    width:110,

    height:110,

    borderRadius:55,

  },

  name:{

    color:colors.text,

    fontSize:24,

    fontWeight:"700",

  },

  email:{

    color:colors.textSecondary,

    marginTop:4,

    fontSize:Typography.body,

  },

    card: {

    backgroundColor: colors.surface,

    marginHorizontal: Spacing.lg,

    marginBottom: Spacing.lg,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

  },

  cardTitle: {

    color: colors.text,

    fontSize: Typography.subtitle,

    fontWeight: "700",

    marginBottom: Spacing.lg,

  },

  infoRow: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: Spacing.lg,

  },

  infoContent: {

    flex: 1,

    marginLeft: Spacing.md,

  },

  infoLabel: {

    color: colors.textMuted,

    fontSize: Typography.small,

    marginBottom: 2,

  },

  infoValue: {

    color: colors.text,

    fontSize: Typography.body,

    fontWeight: "500",

  },

  subscriptionCard: {

    backgroundColor: colors.surface,

    marginHorizontal: Spacing.lg,

    marginBottom: Spacing.lg,

    borderRadius: Radius.lg,

    padding: Spacing.lg,

    borderWidth: 1,

    borderColor: colors.primary,

  },

  subscriptionHeader: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: Spacing.md,

  },

  subscriptionTitle: {

    color: colors.text,

    fontSize: Typography.subtitle,

    fontWeight: "700",

    marginLeft: Spacing.sm,

  },

  subscriptionDescription: {

    color: colors.textSecondary,

    fontSize: Typography.caption,

    lineHeight: 20,

    marginBottom: Spacing.lg,

  },

  usageContainer: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    backgroundColor: colors.background,

    borderRadius: Radius.md,

    paddingHorizontal: Spacing.md,

    paddingVertical: Spacing.md,

    marginBottom: Spacing.lg,

  },

  usageLabel: {

    color: colors.textSecondary,

    fontSize: Typography.body,

  },

  usageValue: {

    color: colors.primary,

    fontSize: Typography.title,

    fontWeight: "700",

  },

  upgradeButton: {

    backgroundColor: colors.primary,

    borderRadius: Radius.md,

    justifyContent: "center",

    alignItems: "center",

    paddingVertical: 14,

  },

  upgradeText: {

    color: colors.buttonText,

    fontSize: Typography.body,

    fontWeight: "700",

  },

  menuItem: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 16,

    borderBottomWidth: 1,

    borderBottomColor: colors.border,

  },

  menuLeft: {

    flexDirection: "row",

    alignItems: "center",

  },

  menuTitle: {

    color: colors.text,

    fontSize: Typography.body,

    marginLeft: Spacing.md,

  },

  logoutButton: {

    marginHorizontal: Spacing.lg,

    marginTop: Spacing.md,

    backgroundColor: colors.danger,

    borderRadius: Radius.lg,

    height: 54,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

  },

  logoutButtonText: {

    color: colors.buttonText,

    fontSize: Typography.body,

    fontWeight: "700",

    marginLeft: Spacing.sm,

  },

  version: {

    textAlign: "center",

    color: colors.textMuted,

    fontSize: Typography.small,

    marginTop: Spacing.xl,

    marginBottom: Spacing.xxxl,

  },

});
