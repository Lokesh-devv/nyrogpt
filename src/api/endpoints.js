const withPath = (path, value) => `${path}/${encodeURIComponent(String(value))}`;

export const ENDPOINTS = Object.freeze({
  files: {
    generatedDocument: (filename) => withPath("/generated-documents", filename),
    generatedVideo: (filename) => withPath("/generated-videos", filename),
    storedFile: (storageKey) => withPath("/stored-files", storageKey),
  },
  auth: {
    me: "/api/auth/me",
    emailLogin: "/api/auth/email-login",
    logout: "/api/auth/logout",
    googleLogin: "/api/auth/google/login",
    googleCallback: "/api/auth/google/callback",
    backendGoogleLogin: "/backend/auth/google/login",
    backendGoogleCallback: "/backend/auth/google/callback",
  },
  health: "/api/health",
  admin: {
    login: "/api/admin/login",
    logout: "/api/admin/logout",
    me: "/api/admin/me",
    overview: "/api/admin/overview",
    users: "/api/admin/users",
    user: (userId) => withPath("/api/admin/users", userId),
    chats: "/api/admin/chats",
    messages: "/api/admin/messages",
    chat: (chatId) => withPath("/api/admin/chats", chatId),
    uploads: "/api/admin/uploads",
    feedback: "/api/admin/feedback",
  },
  chats: {
    list: "/api/chats",
    create: "/api/chats",
    detail: (chatId) => withPath("/api/chats", chatId),
    exportPdf: (chatId) => `${withPath("/api/chats", chatId)}/export/pdf`,
    respond: "/api/chats/respond",
    respondStream: "/api/chats/respond/stream",
  },
  uploads: "/api/uploads",
  speech: "/api/speech",
  feedback: "/api/feedback",
  messages: {
    feedback: (messageId) => `${withPath("/api/messages", messageId)}/feedback`,
    translate: (messageId) => `${withPath("/api/messages", messageId)}/translate`,
  },
});

export default ENDPOINTS;
