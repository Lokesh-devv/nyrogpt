import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ChatScreen from "../screens/Chat/ChatScreen";
import DrawerMenu from "../components/DrawerMenu";
import { useTheme } from "../theme";
import { ChatProvider, useChats } from "../contexts/ChatContext";
import { logout } from "../api/authApi";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  const { colors } = useTheme();
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewDraft,
  } = useChats();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerMenu
          {...props}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={(chatId) => {
            setActiveConversationId(chatId);
            props.navigation.closeDrawer();
          }}
          onNewChat={() => {
            createNewDraft();
            props.navigation.closeDrawer();
          }}
          onSearch={() => props.navigation.navigate("Search")}
          onProfile={() => props.navigation.navigate("Profile")}
          onSettings={() => props.navigation.navigate("Settings")}
          onLogout={async () => {
            try {
              await logout();
            } finally {
              props.navigation.getParent()?.reset({ index: 0, routes: [{ name: "Login" }] });
            }
          }}
        />
      )}
      screenOptions={{
        headerShown: false,
        keyboardDismissMode: "on-drag",
        drawerStyle: {
          backgroundColor: colors.surface,
          width: 300,
        },
        overlayColor: colors.overlay,
      }}
    >
      <Drawer.Screen
        name="Chat"
        component={ChatScreen}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <ChatProvider>
      <AppDrawer />
    </ChatProvider>
  );
}
