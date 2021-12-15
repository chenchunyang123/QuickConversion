// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  // 获取正则前面是fm还是formatMessage
  const formatKey = vscode.workspace
    .getConfiguration()
    .get("conversion.transOpts");

  // 两边不加花括号版本
  let disposable = vscode.commands.registerCommand(
    "QuickConversion.change",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const document = editor.document;
      const selections = editor.selections;

      editor.edit((editBuilder) => {
        // 循环遍历替换
        selections.forEach((selection) => {
          let text = document.getText(selection);
          // 清除左右的中括号
          text = text.replace(/^{(.*)}$/g, "$1");
          // 清除左右的引号
          text = text.replace(/^["|'](.*)["|']$/g, "$1");
          // 替换为新的字符串
          editBuilder.replace(selection, `${formatKey}({id: '${text}'})`);
        });
      });
    }
  );

  // 两边加花括号版本
  let disposable2 = vscode.commands.registerCommand(
    "QuickConversion.change2",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const document = editor.document;
      const selections = editor.selections;

      editor.edit((editBuilder) => {
        // 循环遍历替换
        selections.forEach((selection) => {
          let text = document.getText(selection);
          // 清除左右的中括号
          text = text.replace(/^{(.*)}$/g, "$1");
          // 清除左右的引号
          text = text.replace(/^["|'](.*)["|']$/g, "$1");
          // 替换为新的字符串
          editBuilder.replace(selection, `{${formatKey}({id: '${text}'})}`);
        });
      });
    }
  );

  context.subscriptions.push(disposable, disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
