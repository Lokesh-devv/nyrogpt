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

function HelpSupportScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* Help Menu                                          */
  /* -------------------------------------------------- */

  const helpItems = useMemo(() => [

    {

      id: "1",

      title: "Frequently Asked Questions",

      subtitle: "Find answers to common questions",

      icon: "help-circle-outline",

      screen: "FAQ",

    },

    {

      id: "2",

      title: "Contact Support",

      subtitle: "Get help from our support team",

      icon: "mail-outline",

      screen: "ContactSupport",

    },

    {

      id: "3",

      title: "Report a Bug",

      subtitle: "Report issues or unexpected behavior",

      icon: "bug-outline",

      screen: "ReportBug",

    },

    {

      id: "4",

      title: "Request a Feature",

      subtitle: "Share your ideas with us",

      icon: "bulb-outline",

      screen: "RequestFeature",

    },

    {

      id: "5",

      title: "Documentation",

      subtitle: "Read product documentation",

      icon: "book-outline",

      screen: "Documentation",

    },

    {

      id: "6",

      title: "Rate the App",

      subtitle: "Tell us what you think",

      icon: "star-outline",

      screen: "RateApp",

    },

  ], []);

  /* -------------------------------------------------- */
  /* Navigation                                         */
  /* -------------------------------------------------- */

  const handleNavigate = (screen) => {

    Alert.alert("Coming soon", "This option is not available yet.");

  };

  /* -------------------------------------------------- */
  /* Render Item                                        */
  /* -------------------------------------------------- */

  const renderItem = (item) => (

    <TouchableOpacity

      key={item.id}

      style={styles.menuItem}

      activeOpacity={0.8}

      onPress={() =>

        handleNavigate(item.screen)

      }

    >

      <View style={styles.menuLeft}>

        <View style={styles.iconContainer}>

          <Ionicons

            name={item.icon}

            size={22}

            color={colors.primary}

          />

        </View>

        <View style={styles.textContainer}>

          <Text style={styles.menuTitle}>

            {item.title}

          </Text>

          <Text style={styles.menuSubtitle}>

            {item.subtitle}

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

            Help & Support

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* Hero */}

        <View style={styles.heroSection}>

          <View style={styles.heroIcon}>

            <Ionicons

              name="headset"

              size={42}

              color={colors.text}

            />

          </View>

          <Text style={styles.heroTitle}>

            Need Help?

          </Text>

          <Text style={styles.heroSubtitle}>

            We're here to help you with any
            questions or issues.

          </Text>

        </View>

                {/* ------------------------------------------ */}
        {/* Help Menu                                  */}
        {/* ------------------------------------------ */}

        <View style={styles.card}>

          <Text style={styles.cardTitle}>

            Support Options

          </Text>

          {

            helpItems.map(renderItem)

          }

        </View>

        {/* ------------------------------------------ */}
        {/* Contact Card                               */}
        {/* ------------------------------------------ */}

        <View style={styles.contactCard}>

          <View style={styles.contactHeader}>

            <Ionicons

              name="mail-open-outline"

              size={24}

              color={colors.primary}

            />

            <Text style={styles.contactTitle}>

              Contact Information

            </Text>

          </View>

          <View style={styles.contactRow}>

            <Ionicons

              name="mail-outline"

              size={20}

              color={colors.primary}

            />

            <View style={styles.contactContent}>

              <Text style={styles.contactLabel}>

                Support Email

              </Text>

              <Text style={styles.contactValue}>

                support@Nyro-gpt.com

              </Text>

            </View>

          </View>

          <View style={styles.contactRow}>

            <Ionicons

              name="globe-outline"

              size={20}

              color={colors.primary}

            />

            <View style={styles.contactContent}>

              <Text style={styles.contactLabel}>

                Website

              </Text>

              <Text style={styles.contactValue}>

                https://Nyro-gpt.com

              </Text>

            </View>

          </View>

          <View style={styles.contactRow}>

            <Ionicons

              name="time-outline"

              size={20}

              color={colors.primary}

            />

            <View style={styles.contactContent}>

              <Text style={styles.contactLabel}>

                Support Hours

              </Text>

              <Text style={styles.contactValue}>

                Monday - Friday

              </Text>

              <Text style={styles.contactValue}>

                9:00 AM - 6:00 PM

              </Text>

            </View>

          </View>

        </View>

        {/* ------------------------------------------ */}
        {/* Version                                    */}
        {/* ------------------------------------------ */}

        <View style={styles.versionContainer}>

          <Text style={styles.versionTitle}>

            Nyro GPT

          </Text>

          <Text style={styles.versionText}>

            Version 1.0.0

          </Text>

          <Text style={styles.versionSubText}>

            Thank you for using Nyro GPT ❤️

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

  heroSection:{

    alignItems:"center",

    marginTop:Spacing.md,

    marginBottom:Spacing.xxl,

    paddingHorizontal:Spacing.xl,

  },

  heroIcon:{

    width:100,

    height:100,

    borderRadius:50,

    backgroundColor:colors.primary,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:Spacing.lg,

  },

  heroTitle:{

    color:colors.text,

    fontSize:28,

    fontWeight:"700",

    marginBottom:Spacing.sm,

  },

  heroSubtitle:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    textAlign:"center",

    lineHeight:24,

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

  menuItem:{

    flexDirection:"row",

    alignItems:"center",

    justifyContent:"space-between",

    paddingVertical:16,

    borderBottomWidth:1,

    borderBottomColor:colors.border,

  },

  menuLeft:{

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

  menuTitle:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  menuSubtitle:{

    color:colors.textSecondary,

    fontSize:Typography.small,

    marginTop:4,

  },

    contactCard:{

    backgroundColor:colors.surface,

    marginHorizontal:Spacing.lg,

    marginBottom:Spacing.lg,

    borderRadius:Radius.lg,

    padding:Spacing.lg,

  },

  contactHeader:{

    flexDirection:"row",

    alignItems:"center",

    marginBottom:Spacing.lg,

  },

  contactTitle:{

    color:colors.text,

    fontSize:Typography.subtitle,

    fontWeight:"700",

    marginLeft:Spacing.sm,

  },

  contactRow:{

    flexDirection:"row",

    alignItems:"flex-start",

    marginBottom:Spacing.lg,

  },

  contactContent:{

    flex:1,

    marginLeft:Spacing.md,

  },

  contactLabel:{

    color:colors.textMuted,

    fontSize:Typography.small,

    marginBottom:4,

  },

  contactValue:{

    color:colors.text,

    fontSize:Typography.body,

    lineHeight:22,

  },

  versionContainer:{

    alignItems:"center",

    justifyContent:"center",

    marginTop:Spacing.xl,

    marginBottom:Spacing.xxxl,

    paddingHorizontal:Spacing.lg,

  },

  versionTitle:{

    color:colors.text,

    fontSize:24,

    fontWeight:"700",

    marginBottom:6,

  },

  versionText:{

    color:colors.textSecondary,

    fontSize:Typography.body,

    marginBottom:4,

  },

  versionSubText:{

    color:colors.textMuted,

    fontSize:Typography.caption,

    textAlign:"center",

  },

});

export default React.memo(HelpSupportScreen);
