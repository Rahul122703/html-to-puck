import { type RootConfig } from "./types";

export const rootConfig: RootConfig = {
  fields: [
    {
      name: "backgroundColor",
      propType: "string",
      config: {
        type: "text",
      },
      defaultValue: "#ffffff",
    },
    {
      name: "backgroundImage",
      propType: "string",
      config: {
        type: "text",
      },
      defaultValue: "",
    },
    {
      name: "showBackgroundImage",
      propType: "string",
      config: {
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
      propType: "string",
      config: {
        type: "text",
      },
      defaultValue: "#000000",
    },
    {
      name: "backgroundOverlayOpacity",
      propType: "number",
      config: {
        type: "number",
        min: 0,
        max: 100,
      },
      defaultValue: 40,
    },

    // Padding
    {
      name: "paddingTop",
      propType: "number",
      config: {
        type: "number",
        min: 0,
      },
      defaultValue: 0,
    },
    {
      name: "paddingRight",
      propType: "number",
      config: {
        type: "number",
        min: 0,
      },
      defaultValue: 0,
    },
    {
      name: "paddingBottom",
      propType: "number",
      config: {
        type: "number",
        min: 0,
      },
      defaultValue: 0,
    },
    {
      name: "paddingLeft",
      propType: "number",
      config: {
        type: "number",
        min: 0,
      },
      defaultValue: 0,
    },

    // Margin
    {
      name: "marginTop",
      propType: "number",
      config: {
        type: "number",
      },
      defaultValue: 0,
    },
    {
      name: "marginRight",
      propType: "number",
      config: {
        type: "number",
      },
      defaultValue: 0,
    },
    {
      name: "marginBottom",
      propType: "number",
      config: {
        type: "number",
      },
      defaultValue: 0,
    },
    {
      name: "marginLeft",
      propType: "number",
      config: {
        type: "number",
      },
      defaultValue: 0,
    },
  ],
};
