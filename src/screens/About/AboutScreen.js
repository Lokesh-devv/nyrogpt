import React, {
  useMemo,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
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

function AboutScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* App Information                                    */
  /* -------------------------------------------------- */

  const appInfo = useMemo(() => ({

    name: "Nyro GPT",

    tagline: "Your AI Assistant",

    version: "1.0.0",

    build: "100",

    company: "Nyro GPT",

    website: "https://Nyro-gpt.com",

    email: "support@Nyro-gpt.com",

    copyright: "© 2026 Nyro GPT",

  }), []);

  /* -------------------------------------------------- */
  /* Menu                                               */
  /* -------------------------------------------------- */

  const menuItems = useMemo(() => [

    {

      id: "1",

      title: "Privacy Policy",

      icon: "shield-checkmark-outline",

      screen: "Privacy",

    },

    {

      id: "2",

      title: "Terms & Conditions",

      icon: "document-text-outline",

      screen: "Terms",

    },

    {

      id: "3",

      title: "Open Source Licenses",

      icon: "code-slash-outline",

      screen: "Licenses",

    },

    {

      id: "4",

      title: "Contact Us",

      icon: "mail-outline",

      screen: "Contact",

    },

  ], []);

  /* -------------------------------------------------- */
  /* Navigation                                         */
  /* -------------------------------------------------- */

  const handleNavigate = (screen) => {

    Alert.alert("Coming soon", "This option is not available yet.");

  };

  /* -------------------------------------------------- */
  /* Render Menu                                        */
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

            onPress={() => navigation.goBack()}

          >

            <Ionicons

              name="arrow-back"

              size={22}

              color={colors.text}

            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>

            About

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* App Logo */}

        <View style={styles.logoSection}>

          <View style={styles.logoContainer}>

            <Ionicons

              name="sparkles"

              size={60}

              color={colors.text}

            />

          </View>

          <Text style={styles.appName}>

            {appInfo.name}

          </Text>

          <Text style={styles.tagline}>

            {appInfo.tagline}

          </Text>

        </View>

        {/* Version Card */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Application

          </Text>

                  {/* ------------------------------------------ */}
        {/* Version Information                        */}
        {/* ------------------------------------------ */}

        <View style={styles.infoRow}>

          <Ionicons
            name="cube-outline"
            size={20}
            color={colors.primary}
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Version
            </Text>

            <Text style={styles.infoValue}>
              {appInfo.version}
            </Text>

          </View>

        </View>

        <View style={styles.infoRow}>

          <Ionicons
            name="construct-outline"
            size={20}
            color={colors.primary}
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Build Number
            </Text>

            <Text style={styles.infoValue}>
              {appInfo.build}
            </Text>

          </View>

        </View>

        <View style={styles.infoRow}>

          <Ionicons
            name="business-outline"
            size={20}
            color={colors.primary}
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Company
            </Text>

            <Text style={styles.infoValue}>
              {appInfo.company}
            </Text>

          </View>

        </View>

        <View style={styles.infoRow}>

          <Ionicons
            name="globe-outline"
            size={20}
            color={colors.primary}
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Website
            </Text>

            <Text style={styles.infoValue}>
              {appInfo.website}
            </Text>

          </View>

        </View>

        <View style={styles.infoRow}>

          <Ionicons
            name="mail-outline"
            size={20}
            color={colors.primary}
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Support Email
            </Text>

            <Text style={styles.infoValue}>
              {appInfo.email}
            </Text>

          </View>

        </View>

      </View>

      {/* ------------------------------------------ */}
      {/* Information                                */}
      {/* ------------------------------------------ */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>

          Information

        </Text>

        {

          menuItems.map(renderMenuItem)

        }

      </View>

      {/* ------------------------------------------ */}
      {/* Footer                                     */}
      {/* ------------------------------------------ */}

      <View style={styles.footer}>

        <Text style={styles.footerTitle}>

          {appInfo.name}

        </Text>

        <Text style={styles.footerVersion}>

          Version {appInfo.version}

        </Text>

        <Text style={styles.footerCopyright}>

          {appInfo.copyright}

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

  logoSection:{

    alignItems:"center",

    marginTop:Spacing.md,

    marginBottom:Spacing.xxl,

  },

  logoContainer:{

    width:110,

    height:110,

    borderRadius:55,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:Spacing.lg,

  },

  appName:{

    color:colors.text,

    fontSize:28,

    fontWeight:"700",

  },

  tagline:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    marginTop:6,

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

    flex: 1,

  },

  menuTitle: {

    color: colors.text,

    fontSize: Typography.body,

    marginLeft: Spacing.md,

  },

  footer: {

    alignItems: "center",

    justifyContent: "center",

    marginTop: Spacing.xl,

    marginBottom: Spacing.xxxl,

    paddingHorizontal: Spacing.lg,

  },

  footerTitle: {

    color: colors.text,

    fontSize: 24,

    fontWeight: "700",

    marginBottom: 6,

  },

  footerVersion: {

    color: colors.textSecondary,

    fontSize: Typography.body,

    marginBottom: 4,

  },

  footerCopyright: {

    color: colors.textMuted,

    fontSize: Typography.caption,

    textAlign: "center",

    lineHeight: 20,

  },

});

export default React.memo(AboutScreen);
