import { Global } from "@mantine/core";

import black from "./../fonts/Satoshi-Black.woff2";
import blackItalic from "./../fonts/Satoshi-BlackItalic.woff2";
import bold from "./../fonts/Satoshi-Bold.woff2";
import boldItalic from "./../fonts/Satoshi-BoldItalic.woff2";
import italic from "./../fonts/Satoshi-Italic.woff2";
import light from "./../fonts/Satoshi-Light.woff2";
import lightItalic from "./../fonts/Satoshi-LightItalic.woff2";
import medium from "./../fonts/Satoshi-Medium.woff2";
import mediumItalic from "./../fonts/Satoshi-MediumItalic.woff2";
import regular from "./../fonts/Satoshi-Regular.woff2";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${black}') format("woff2")`,
            fontWeight: 900,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${blackItalic}') format("woff2")`,
            fontWeight: 900,
            fontStyle: "italic",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${bold}') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${boldItalic}') format("woff2")`,
            fontWeight: 700,
            fontStyle: "italic",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${italic}') format("woff2")`,
            fontWeight: 400,
            fontStyle: "italic",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${light}') format("woff2")`,
            fontWeight: 300,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${lightItalic}') format("woff2")`,
            fontWeight: 300,
            fontStyle: "italic",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${medium}') format("woff2")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${mediumItalic}') format("woff2")`,
            fontWeight: 500,
            fontStyle: "italic",
          },
        },
        {
          "@font-face": {
            fontFamily: "Satoshi",
            src: `url('${regular}') format("woff2")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
