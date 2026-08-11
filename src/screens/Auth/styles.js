import { StyleSheet } from "react-native";
export default function createAuthStyles(colors) {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },

  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
  },

  form: {
    marginTop: 40,
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginTop: 8,
    marginBottom: 25,
  },

  forgotText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },

  button: {
    marginTop: 10,
  },

  footer: {
    marginTop: 30,
    alignItems: "center",
  },

  footerText: {
    color: colors.textSecondary,
    fontSize: 15,
  },

  signUp: {
    color: colors.primary,
    fontWeight: "600",
  },
  });
}
