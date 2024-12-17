# Log Pro Helper

Log Pro Helper is a VS Code extension that simplifies adding `logPro.green()` statements to your Flutter project.

## Features
- Insert `logPro.green("word": $selectedText);` for selected text.

## How to Use
1. Select a word or phrase in your code editor.
2. Press `Ctrl+Shift+'` (or use the Command Palette) and choose `Insert logPro.green`.
3. If no text is selected, it will insert an empty `logPro.green("");`.

## Installation
1. Add `log_pro` to your Flutter project's `pubspec.yaml`.
2. Install this extension from the VS Code marketplace or manually by packaging it.

## Requirements
- Flutter project with the `log_pro` package installed.

## Known Issues
- None at the moment.

## Release Notes
### 0.0.1
- Initial release with basic functionality.
