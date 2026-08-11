const attachmentMessageId = (attachment) =>
  attachment.message_id ?? attachment.messageId ?? attachment.message?.id;

export const mapMessage = (message, chatAttachments = []) => {
  const details = message.details && typeof message.details === "object"
    ? message.details
    : {};
  const messageAttachments = Array.isArray(details.attachments)
    ? details.attachments
    : [];
  const linkedAttachments = chatAttachments.filter(
    (attachment) => String(attachmentMessageId(attachment)) === String(message.id)
  );

  return ({
  id: String(message.id),
  role: String(message.role || "assistant"),
  text:
    typeof message.content === "string"
      ? message.content
      : message.content == null
        ? ""
        : JSON.stringify(message.content),
  details: {
    ...details,
    attachments: [...messageAttachments, ...linkedAttachments],
  },
  createdAt: message.created_at,
  });
};

export const mapChat = (chat) => ({
  id: String(chat.id),
  title: typeof chat.title === "string" ? chat.title : "New Chat",
  isArchived: Boolean(chat.is_archived),
  isPinned: Boolean(chat.is_pinned),
  createdAt: chat.created_at,
  updatedAt: chat.updated_at,
  messages: Array.isArray(chat.messages)
    ? chat.messages.map((message) => mapMessage(message, chat.attachments || []))
    : [],
  attachments: Array.isArray(chat.attachments) ? chat.attachments : [],
});

export const createDraftChat = () => {
  const timestamp = new Date().toISOString();
  return {
    id: `local-${Date.now()}`,
    title: "New Chat",
    isArchived: false,
    isPinned: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    messages: [],
    attachments: [],
  };
};
