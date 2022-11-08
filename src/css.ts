import * as Tokens from "./tokens.json";
import * as vscode from "vscode";

const Z_INDEX_VALUES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const SPACING_SCALE_VALUES = {
  s1: "0.3125rem",
  s2: "0.625rem",
  s3: "0.9375rem",
  s4: "1.25rem",
  s5: "1.875rem",
  s6: "2.5rem",
  l1: "3.125rem",
  l2: "3.75rem",
  l3: "5rem",
  l4: "6.25rem",
  l5: "7.5rem",
};

const TYPOGRAPHY_CLASSES = [
  "sdk-text-body",
  "sdk-text-body-light-2",
  "sdk-text-body-light",
  "sdk-text-body-medium",
  "sdk-text-body-italic",
  "sdk-text-body-italic-light",
  "sdk-text-h1",
  "sdk-text-h1-medium",
  "sdk-text-h2",
  "sdk-text-h2-medium",
  "sdk-text-h3",
  "sdk-text-h3-medium",
  "sdk-text-h4",
  "sdk-text-h4-medium",
  "sdk-text-h5",
  "sdk-text-h5-medium",
  "sdk-text-h6",
  "sdk-text-medium",
  "sdk-text-medium-2",
  "sdk-text-caption-1",
  "sdk-text-caption-2",
  "sdk-text-caption",
  "sdk-text-caption-light",
  "sdk-text-caption-medium",
  "sdk-text-caption-italic",
  "sdk-text-help",
  "sdk-text-help-light",
  "sdk-text-help-medium",
  "sdk-text-help-italic",
  "sdk-text-overline",
  "sdk-text-overline-light",
  "sdk-text-overline-medium",
  "sdk-text-overline-italic",
  "sdk-text-button",
  "sdk-text-subtitle",
  "sdk-text-error",
  "sdk-text-sub-heading",
];

const VARIABLE_TRIGGER = "--";
const HTML_CLASS_TRIGGER = "sdk-";

interface ColorDetail {
  variableName: string;
  hex: string;
}

function getColorPropsFromTokens() {
  const colors: Record<
    string,
    Record<string, { value: string; type: string }>
  > = Tokens["system-colors"][0];
  const pallettes = Object.keys(colors);
  return pallettes.reduce((collection, pallette) => {
    const palletteVariable = pallette.toLowerCase().replace(" ", "-");
    const hues = Object.keys(colors[pallette]);
    const hueVariables = hues.map((hue) => {
      const hueVariable = hue.toLowerCase().replace(" ", "-");
      return <ColorDetail>{
        variableName: `${palletteVariable}-${hueVariable}`,
        hex: colors[pallette][hue].value,
      };
    });
    return collection.concat(hueVariables);
  }, <ColorDetail[]>[]);
}

function htmlColorUtilAutoComplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const variables = getColorPropsFromTokens();
      return variables.map(({ variableName, hex }) => {
        const item = new vscode.CompletionItem(
          `sdk-color-bg-${variableName}`,
          vscode.CompletionItemKind.Color
        );
        item.detail = hex;
        return item;
      });
    },
  };
}

function colorsAutoComplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const variables = getColorPropsFromTokens();
      return variables.map(({ variableName, hex }) => {
        const item = new vscode.CompletionItem(
          `--sdk-color-${variableName}`,
          vscode.CompletionItemKind.Color
        );
        item.detail = hex;
        return item;
      });
    },
  };
}

function zIndexAutoComplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      return Z_INDEX_VALUES.map((value, index) => {
        const item: vscode.CompletionItem = new vscode.CompletionItem(
          `--sdk-z-index-${index + 1}`,
          vscode.CompletionItemKind.Value
        );
        item.detail = value.toString();
        return item;
      });
    },
  };
}

function spacingUtilClassAutoComplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const entries = Object.entries(SPACING_SCALE_VALUES);
      return entries
        .map(([key, value]) => {
          // for each item in the scale, the following
          // classes are generated
          return [
            "p",
            "px",
            "py",
            "pt",
            "pl",
            "pb",
            "pr",
            "m",
            "mx",
            "my",
            "mt",
            "ml",
            "mb",
            "mr",
          ].map((className) => {
            const item: vscode.CompletionItem = new vscode.CompletionItem(
              `sdk-${className}-${key}`,
              vscode.CompletionItemKind.Value
            );
            item.detail = value.toString();
            return item;
          });
        })
        .flat();
    },
  };
}

function typographyClassAutocomplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      return TYPOGRAPHY_CLASSES.map((value, index) => {
        const item: vscode.CompletionItem = new vscode.CompletionItem(
          value,
          vscode.CompletionItemKind.Value
        );
        return item;
      });
    },
  };
}

function fontCSSPropsAutocomplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const items: vscode.CompletionItem[] = [];
      items.push(
        new vscode.CompletionItem(
          "--sdk-font-color",
          vscode.CompletionItemKind.Color
        )
      );
      items.push(
        new vscode.CompletionItem(
          "--sdk-font-light-color",
          vscode.CompletionItemKind.Color
        )
      );
      items.push(
        new vscode.CompletionItem(
          "--sdk-font-weight-light",
          vscode.CompletionItemKind.Value
        )
      );
      items.push(
        new vscode.CompletionItem(
          "--sdk-font-weight-bold",
          vscode.CompletionItemKind.Value
        )
      );
      items.push(
        new vscode.CompletionItem(
          "--sdk-font-weight-default",
          vscode.CompletionItemKind.Value
        )
      );
      return items;
    },
  };
}

export function getCSSColorPropsAutocomplete() {
  return vscode.languages.registerCompletionItemProvider(
    "css",
    colorsAutoComplete(),
    VARIABLE_TRIGGER
  );
}

export function getSCSSColorPropsAutocomplete() {
  return vscode.languages.registerCompletionItemProvider(
    "scss",
    colorsAutoComplete(),
    VARIABLE_TRIGGER
  );
}
export function getBgColorUtilAutocomplete() {
  return vscode.languages.registerCompletionItemProvider(
    "html",
    htmlColorUtilAutoComplete(),
    HTML_CLASS_TRIGGER
  );
}
export function getCSSColorPropsInHtmlAutoComplete() {
  return vscode.languages.registerCompletionItemProvider(
    "html",
    colorsAutoComplete(),
    VARIABLE_TRIGGER
  );
}

export function getCssProviders() {
  return [
    getCSSColorPropsAutocomplete(),
    getSCSSColorPropsAutocomplete(),
    getBgColorUtilAutocomplete(),
    getCSSColorPropsInHtmlAutoComplete(),
    vscode.languages.registerCompletionItemProvider(
      "css",
      zIndexAutoComplete(),
      VARIABLE_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "scss",
      zIndexAutoComplete(),
      VARIABLE_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "html",
      zIndexAutoComplete(),
      VARIABLE_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "html",
      spacingUtilClassAutoComplete(),
      HTML_CLASS_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "html",
      typographyClassAutocomplete(),
      HTML_CLASS_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "css",
      fontCSSPropsAutocomplete(),
      VARIABLE_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "scss",
      fontCSSPropsAutocomplete(),
      VARIABLE_TRIGGER
    ),
    vscode.languages.registerCompletionItemProvider(
      "html",
      fontCSSPropsAutocomplete(),
      VARIABLE_TRIGGER
    ),
  ];
}
