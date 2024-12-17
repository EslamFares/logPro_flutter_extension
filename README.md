# Log Pro Helper

Log Pro Helper is a VS Code extension that simplifies adding `logPro` statements to your Flutter project.

## Getting Started
- run  `flutter pub add log_pro`
- Just create an instance of `LogPro` and start logging: `LogPro logPro = LogPro();`

## Features
- Insert `logPro.green("x": $x);` for selected text.
- Insert `{}` `logPro.green("car.name": ${car.name});` for selected text containe (.)

## How to Use
1. Select a word or phrase in your code editor.
2. Press `Ctrl+Shift+'` (or use the Command Palette) `logPro.green("x": $x);`.
3. Press `Ctrl+Shift+\` (or use the Command Palette) `logPro.grey("x": $x);` (or use any type of LogPro).
3. Press `Ctrl+Shift+;` (or use the Command Palette) `LogPro().green("x": $x);`.
3. Press `Ctrl+Shift+k` (or use the Command Palette) `debugPrint("x": $x);` (or change debugPrint with start text you want).
5. If no text is selected, it will insert an empty `logPro.green("");`.

## Installation
1. Add `log_pro` to your Flutter project's `pubspec.yaml` (`flutter pub add log_pro`).
2. Install this extension from the VS Code marketplace or manually by packaging it.

## Requirements
- Flutter project with the `log_pro` package installed.


## Release Notes
### 0.0.1

# © Fares.dev

