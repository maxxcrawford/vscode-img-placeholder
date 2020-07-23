// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "img-placeholder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

		let disposable = vscode.commands.registerTextEditorCommand('img-placeholder.insert', function (textEditor, edit) {
		
			let imgSrcText, contrast;

			const randomColor = Math.floor(Math.random() * 16777215).toString(16);

			const r = parseInt(randomColor.substr(0, 2), 16);
			const g = parseInt(randomColor.substr(2, 2), 16);
			const b = parseInt(randomColor.substr(4, 2), 16);

			const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

			if (yiq >= 128) {
				contrast = "000000";
			} else {
				contrast = "FFFFFF";
			}

			const colorContrast = randomColor.toUpperCase() + "/" + contrast;

			imgSrcText = '<img src="https://placehold.it/600x400/' + colorContrast + '"/>';

			edit.insert(textEditor.selection.active, imgSrcText);

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from img-placeholder!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
