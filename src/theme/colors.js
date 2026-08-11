import { resolvedThemes } from "./themes";

// Backwards-compatible static export for modules outside React.
// UI components use useTheme() so they update immediately.
export default resolvedThemes.dark;
