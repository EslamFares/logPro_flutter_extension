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
        let logProCode = '';

        const wrapSingleWordInBraces = vscode.workspace.getConfiguration('logpro-flutter').get<boolean>('wrapSingleWordInBraces') ?? true;

        if (selectedText) {
            if (selectedText.includes('.')) {
                logProCode = `logPro.green("${selectedText} : \${${selectedText}}");`;
            } else {
                const words = selectedText.split(/\s+/);
                if (words.length === 1) {
                    logProCode = wrapSingleWordInBraces
                        ? `logPro.green("${words[0]} : \${${words[0]}}");`
                        : `logPro.green("${words[0]} : \$${words[0]}");`;
                } else {
                    logProCode = `logPro.green("${words[0]} : \${${words[0]}.${words[1]}}");`;
                }
            }
        } else {
            logProCode = `logPro.green("");`;
        }

        const newLinePosition = new vscode.Position(selection.end.line + 1, 0);
        editor.edit(editBuilder => {
            editBuilder.insert(newLinePosition, logProCode + '\n');
        });

        const importStatement = context.globalState.get<string>('logpro-flutter.importStatement') || 'const/log_pro.dart';
        addImportStatement(editor, importStatement);
    });

    let disposable3 = vscode.commands.registerCommand('logpro-flutter.insertLogProWithClass', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        let logProCode = '';

        if (selectedText) {
            logProCode = `LogPro().green("${selectedText} : \${${selectedText}}");`;
        } else {
            logProCode = `LogPro().green("");`;
        }

        const newLinePosition = new vscode.Position(selection.end.line + 1, 0);
        editor.edit(editBuilder => {
            editBuilder.insert(newLinePosition, logProCode + '\n');
        });

        addImportStatement(editor, 'package:log_pro/log_pro.dart');
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
}

function addImportStatement(editor: vscode.TextEditor, importPath: string) {
    const document = editor.document;
    const importRegex = /^import\s+['"][^'"]+['"];$/;
    let lastImportLine = -1;

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;
        if (importRegex.test(line)) {
            lastImportLine = i;
        }
    }

    if (lastImportLine === -1) {
        lastImportLine = 0;
    }

    const importStatement = `import '${importPath}';`;
    const importPosition = new vscode.Position(lastImportLine + 1, 0);

    editor.edit(editBuilder => {
        editBuilder.insert(importPosition, importStatement + '\n');
    });
}

export function deactivate() {}
