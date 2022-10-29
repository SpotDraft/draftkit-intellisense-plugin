import * as Tokens from "./tokens.json";
import * as vscode from "vscode";

const Z_INDEX_VALUES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

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
  ];
}
