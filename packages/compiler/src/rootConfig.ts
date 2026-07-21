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
      defaultValue: "No",
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
      defaultValue: "No",
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
  ],
};
