import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { listChats } from "../api/chatApi";
import { createDraftChat, mapChat } from "../api/chatMapper";

const ChatContext = createContext(null);
const LAST_ACTIVE_CHAT_KEY = "LAST_ACTIVE_CHAT_ID";

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(() => [createDraftChat()]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  useEffect(() => {
    let mounted = true;
    let restoredChatId = null;

    const restoreState = async () => {
      try {
        restoredChatId = await AsyncStorage.getItem(LAST_ACTIVE_CHAT_KEY);
      } catch {
        restoredChatId = null;
      }

      try {
        const chats = await listChats();
        if (!mounted) return;

        const mapped = Array.isArray(chats) ? chats.map(mapChat) : [];

        if (mapped.length > 0) {
          setConversations(mapped);
          setActiveConversationId((current) => {
            if (current && mapped.some((chat) => chat.id === current)) {
              return current;
            }
            if (restoredChatId && mapped.some((chat) => chat.id === restoredChatId)) {
              return restoredChatId;
            }
            return mapped[0].id;
          });
          return;
        }
      } catch {
        // Fall through and restore a local draft when the chat list is unavailable.
      }

      if (!mounted) return;
      const draft = createDraftChat();
      setConversations([draft]);
      setActiveConversationId(draft.id);
    };

    restoreState();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeConversationId) return;

    AsyncStorage.setItem(LAST_ACTIVE_CHAT_KEY, activeConversationId).catch(() => {});
  }, [activeConversationId]);

  const createNewDraft = useCallback(() => {
    const draft = createDraftChat();
    setConversations((previous) => [draft, ...previous]);
    setActiveConversationId(draft.id);
    return draft;
  }, []);

  const value = useMemo(
    () => ({
      conversations,
      setConversations,
      activeConversationId,
      setActiveConversationId,
      createNewDraft,
    }),
    [conversations, activeConversationId, createNewDraft]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChats = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChats must be used inside ChatProvider.");
  return context;
};
