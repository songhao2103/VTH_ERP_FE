import "@mui/material/styles";
import "@mui/material/Button";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    brand: Palette["primary"];
    white: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    brand?: PaletteOptions["primary"];
    white?: Palette["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    brand: true;
    white?: Palette["primary"];
  }
}

export {};
