import React, {
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import {
  useTheme,
  Typography,
  Spacing,
  Radius,
} from "../../theme";

function EditProfileScreen({

  navigation,

}) {

  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  /* -------------------------------------------------- */
  /* State                                              */
  /* -------------------------------------------------- */

  const [profileImage, setProfileImage] =
    useState(null);

  const [fullName, setFullName] =
    useState("Lokesh Naidu");

  const [email, setEmail] =
    useState("lokesh@gmail.com");

  const [phone, setPhone] =
    useState("+91 9876543210");

  const [country, setCountry] =
    useState("India");

  const [loading, setLoading] =
    useState(false);

  /* -------------------------------------------------- */
  /* Image Picker                                       */
  /* -------------------------------------------------- */

  const handleChangePhoto = () => {

    /*
      Expo Image Picker

      Will integrate later

    */

    console.log("Select Image");

  };

  /* -------------------------------------------------- */
  /* Save                                               */
  /* -------------------------------------------------- */

  const handleSave = () => {

    if (loading) return;

    setLoading(true);

    /*
      Backend

      PUT /profile

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

            Edit Profile

          </Text>

          <View style={styles.placeholder} />

        </View>

        {/* Avatar */}

        <View style={styles.avatarSection}>

          <TouchableOpacity

            activeOpacity={0.85}

            style={styles.avatarContainer}

            onPress={handleChangePhoto}

          >

            {

              profileImage

              ?

              (

                <Image

                  source={{

                    uri:profileImage,

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

          </TouchableOpacity>

          <TouchableOpacity

            activeOpacity={0.8}

            onPress={handleChangePhoto}

          >

            <Text style={styles.changePhotoText}>

              Change Profile Photo

            </Text>

          </TouchableOpacity>

        </View>

        {/* Form */}

        <View style={styles.form}>

          <Text style={styles.label}>

            Full Name

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="person-outline"

              size={20}

              color={colors.textMuted}

            />

            <TextInput

              value={fullName}

              onChangeText={setFullName}

              placeholder="Full Name"

              placeholderTextColor={colors.textMuted}

              style={styles.input}

            />

          </View>

          <Text style={styles.label}>

            Email

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

              keyboardType="email-address"

              autoCapitalize="none"

              style={styles.input}

            />

          </View>

                    <Text style={styles.label}>

            Phone Number

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="call-outline"

              size={20}

              color={colors.textMuted}

            />

            <TextInput

              value={phone}

              onChangeText={setPhone}

              keyboardType="phone-pad"

              placeholder="Phone Number"

              placeholderTextColor={colors.textMuted}

              style={styles.input}

            />

          </View>

          <Text style={styles.label}>

            Country

          </Text>

          <View style={styles.inputContainer}>

            <Ionicons

              name="location-outline"

              size={20}

              color={colors.textMuted}

            />

            <TextInput

              value={country}

              onChangeText={setCountry}

              placeholder="Country"

              placeholderTextColor={colors.textMuted}

              style={styles.input}

            />

          </View>

        </View>

        {/* ------------------------------------------ */}
        {/* Buttons                                    */}
        {/* ------------------------------------------ */}

        <TouchableOpacity

          activeOpacity={0.85}

          style={[

            styles.saveButton,

            loading &&

            styles.disabledButton,

          ]}

          disabled={loading}

          onPress={handleSave}

        >

          <Text style={styles.saveButtonText}>

            {

              loading

              ?

              "Saving..."

              :

              "Save Changes"

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

  avatarSection:{

    alignItems:"center",

    marginTop:Spacing.md,

    marginBottom:Spacing.xxl,

  },

  avatarContainer:{

    width:120,

    height:120,

    borderRadius:60,

    backgroundColor:colors.surface,

    justifyContent:"center",

    alignItems:"center",

    overflow:"hidden",

    marginBottom:Spacing.md,

  },

  avatar:{

    width:"100%",

    height:"100%",

  },

  changePhotoText:{

    color:colors.primary,

    fontSize:Typography.body,

    fontWeight:"600",

  },

  form:{

    marginHorizontal:Spacing.lg,

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

    height:58,

    paddingHorizontal:Spacing.md,

  },

  input:{

    flex:1,

    marginLeft:Spacing.md,

    color:colors.text,

    fontSize:Typography.body,

  },

  saveButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.xxl,

    backgroundColor:colors.primary,

    borderRadius:Radius.lg,

    justifyContent:"center",

    alignItems:"center",

  },

  disabledButton:{

    opacity:0.6,

  },

  saveButtonText:{

    color:colors.buttonText,

    fontSize:Typography.body,

    fontWeight:"700",

  },

    cancelButton:{

    height:56,

    marginHorizontal:Spacing.lg,

    marginTop:Spacing.md,

    borderWidth:1,

    borderColor:colors.border,

    borderRadius:Radius.lg,

    justifyContent:"center",

    alignItems:"center",

    backgroundColor:colors.surface,

  },

  cancelButtonText:{

    color:colors.text,

    fontSize:Typography.body,

    fontWeight:"600",

  },

});

export default React.memo(EditProfileScreen);
