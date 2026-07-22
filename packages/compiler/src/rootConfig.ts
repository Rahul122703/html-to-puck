import { type RootConfig } from "./types";
import { CodeExpression } from "./utils/jsx";

export const rootConfig: RootConfig = {
  fields: [
    {
      name: "sectionId",
      propType: "string",
      config: {
        label: "Section Id",
        type: "text",
      },
      defaultValue: "",
    },
    {
      name: "backgroundColor",
      propType: "ColorValue",
      config: new CodeExpression(
        `createColorField({ label: "Background Color" })`,
      ),
      defaultValue: "#ffffff",
    },
    {
      name: "backgroundImage",
      propType: "string",
      config: {
        label: "Background Image",
        type: "text",
      },
      defaultValue: "",
    },
    {
      name: "showBackgroundImage",
      propType: "boolean",
      config: {
        label: "Show Background Image?",
        type: "radio",
        options: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
      },
      defaultValue: false,
    },
    {
      name: "showBackgroundOverlay",
      propType: "boolean",
      config: {
        label: "Show Background Overlay?",
        type: "radio",
        options: [
          {
            label: "Yes",
            value: true,
          },
          {
            label: "No",
            value: false,
          },
        ],
      },
      defaultValue: false,
    },
    {
      name: "backgroundOverlayColor",
      propType: "ColorValue",
      config: new CodeExpression(
        `createColorField({ label: "Background Overlay Color" })`,
      ),
      defaultValue: "#000000",
    },
    {
      name: "backgroundOverlayOpacity",
      propType: "number",
      config: {
        label: "Background Overlay Opacity",
        type: "number",
        min: 0,
        max: 100,
      },
      defaultValue: 40,
    },
    {
      name: "padding",
      propType: "SpacingValue",
      config: new CodeExpression(
        `createSpacingField({ label: "Section Padding" })`,
      ),
      defaultValue: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    {
      name: "margin",
      propType: "SpacingValue",
      config: new CodeExpression(
        `createSpacingField({ label: "Section Margin" })`,
      ),
      defaultValue: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  ],
};
