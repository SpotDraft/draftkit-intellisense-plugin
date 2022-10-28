import * as Tokens from "./tokens.json";
import * as vscode from "vscode";

const VARIABLE_TRIGGER = "--";
const HTML_CLASS_TRIGGER = "sdk-";

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
      return `${palletteVariable}-${hueVariable}`;
    });
    return collection.concat(hueVariables);
  }, <string[]>[]);
}

function htmlColorUtilAutoComplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      const variables = getColorPropsFromTokens();
      return variables.map(
        (variable) =>
          new vscode.CompletionItem(
            `sdk-color-bg-${variable}`,
            vscode.CompletionItemKind.EnumMember
          )
      );
    },
  };
}

function colorsAutoComplete(): vscode.CompletionItemProvider<vscode.CompletionItem> {
  return {
    provideCompletionItems: function (
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      // get all text until the `position` and check if it reads `console.`
      // and if so then complete if `log`, `warn`, and `error`
      const linePrefix = document
        .lineAt(position)
        .text.substring(0, position.character);

      const variables = getColorPropsFromTokens();
      return variables.map(
        (variable) =>
          new vscode.CompletionItem(
            `--sdk-color-${variable}`,
            vscode.CompletionItemKind.Color
          )
      );
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
