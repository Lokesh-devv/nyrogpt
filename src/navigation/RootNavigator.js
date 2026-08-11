import React from "react";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import OTPVerificationScreen from "../screens/Auth/OTPVerificationScreen";
import ResetPasswordScreen from "../screens/Auth/ResetPasswordScreen";
import AppNavigator from "./AppNavigator";
import AboutScreen from "../screens/About/AboutScreen";
import ChatHistoryScreen from "../screens/Chat/ChatHistoryScreen";
import SearchScreen from "../screens/Chat/SearchScreen";
import HelpSupportScreen from "../screens/Help/HelpSupportScreen";
import FilePreviewScreen from "../screens/Media/FilePreviewScreen";
import ImagePreviewScreen from "../screens/Media/ImagePreviewScreen";
import VoiceRecordingScreen from "../screens/Media/VoiceRecordingScreen";
import ChangePasswordScreen from "../screens/Profile/ChangePasswordScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import LanguageScreen from "../screens/Profile/LanguageScreen";
import NotificationSettingsScreen from "../screens/Profile/NotificationSettingsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SecurityScreen from "../screens/Profile/SecurityScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import PremiumScreen from "../screens/Premium/PremiumScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import ThemeScreen from "../screens/Settings/ThemeScreen";
import { useTheme } from "../theme";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { colors } = useTheme();
  const navigationTheme = React.useMemo(() => {
    const base = colors.isDark ? NavigationDarkTheme : NavigationDefaultTheme;
    return {
      ...base,
      dark: colors.isDark,
      colors: {
        ...base.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.header,
        text: colors.text,
        border: colors.border,
        notification: colors.danger,
      },
    };
  }, [colors]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="App"
          component={AppNavigator}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="ChatHistory" component={ChatHistoryScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Help" component={HelpSupportScreen} />
        <Stack.Screen name="FilePreview" component={FilePreviewScreen} />
        <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
        <Stack.Screen name="VoiceRecording" component={VoiceRecordingScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Premium" component={PremiumScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
