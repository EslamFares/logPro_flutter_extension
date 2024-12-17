import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('logpro-flutter.checkLogPro', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        const pubspecPath = path.join(workspaceFolders[0].uri.fsPath, 'pubspec.yaml');
        if (!fs.existsSync(pubspecPath)) {
            vscode.window.showErrorMessage('pubspec.yaml not found.');
            return;
        }

        const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
        if (!pubspecContent.includes('logPro')) {
            vscode.window.showInformationMessage('logPro package not found. Please install it.');
            return;
        }

        vscode.window.showInformationMessage('logPro package is installed.');
    });

    let disposable2 = vscode.commands.registerCommand('logpro-flutter.insertLogPro', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText) {
            vscode.window.showErrorMessage('No text selected.');
            return;
        }

        const logProCode = `logPro.green("${selectedText}" : \${${selectedText}});\n`;
        const newLinePosition = new vscode.Position(selection.end.line + 1, 0);

        editor.edit(editBuilder => {
            editBuilder.insert(newLinePosition, logProCode);
        });
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}

export function deactivate() {}
