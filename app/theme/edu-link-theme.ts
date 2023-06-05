import { extendTheme } from "@chakra-ui/react";

const colors = {
    "primary-1": "#436F8B2",
    "primary-2": "#459ED0",
}

const breakpoints = {
  sm: '392px',
  md: '862px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({ colors, breakpoints });

export default theme;