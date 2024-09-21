# preconfig-dev

A simple and customizable CLI tool to quickly generate a `.vscode/settings.json` file with pre-defined configurations for your development environment. Easily enable configurations for tools like Tailwind CSS and GitHub Copilot by using simple flags.

## Features

- Automatically generates `.vscode/settings.json` with development configurations.
- Supports adding Tailwind CSS and GitHub Copilot settings through flags.
- Merges new configurations with existing settings if they already exist.
- Easy to use with the `npx` command—no installation required!

## Installation

You can use `preconfig-dev` directly with `npx` without needing to install it globally:

```bash
npx preconfig-dev
```

Or, if you prefer to install it globally:

```bash
npm install -g preconfig-dev
```

## Usage

The tool provides flags to selectively add configurations to your `.vscode/settings.json` file. You can use the following options:

### Add Tailwind CSS Configurations

To generate or update your `.vscode/settings.json` with Tailwind CSS settings:

```bash
npx preconfig-dev --tailwind
```

### Add GitHub Copilot Configurations

To add GitHub Copilot configurations:

```bash
npx preconfig-dev --copilot
```

### Combine Configurations

You can also combine multiple configurations by passing multiple flags:

```bash
npx preconfig-dev --tailwind --copilot
```

### Example Output

After running the command, your `.vscode/settings.json` might look like this (if both `tailwind` and `copilot` were selected):

```json
{
  "tailwindCSS.includeLanguages": {
    "plaintext": "html",
    "javascript": "javascript",
    "javascriptreact": "javascript",
    "typescript": "typescript",
    "typescriptreact": "typescript"
  },
  "files.associations": {
    "*.html": "html",
    "*.js": "javascript",
    "*.jsx": "javascriptreact",
    "*.ts": "typescript",
    "*.tsx": "typescriptreact",
    "*.css": "tailwindcss"
  },
  "tailwindCSS.emmetCompletions": true,
  "editor.inlineSuggest.enabled": true,
    "github.copilot.enable": {
        "enabled": true,
        "inlineSuggest":true,
        "quickSuggestions":true
    }
}
```

## Configurations

### Tailwind CSS (`--tailwind`)

This flag adds configurations to improve your development experience with Tailwind CSS in VSCode.

### GitHub Copilot (`--copilot`)

Enables inline suggestions and GitHub Copilot in VSCode.

## Customization

The configurations are stored in the `preconfigs/` folder as JSON files. You can modify or extend these files to add more configurations. 

For example, to add a new configuration for Prettier, create a `preconfigs/prettier.json` file and then update the CLI to support a `--prettier` flag.

## Error Handling

If any errors occur while generating or updating the `.vscode/settings.json` file (e.g., issues with file permissions), the tool will log a clear error message and exit the process.

## Contributing

Feel free to submit pull requests to enhance or fix the tool. Any feedback or improvements are welcome!

## License

MIT License. See [LICENSE](LICENSE) for more details.

Aquí tienes un bloque de autor que puedes agregar al final de tu `README.md`:

---

## Author

**Felipe Traina**

- GitHub: [@Feli87](https://github.com/Feli87)
- Twitter: [@TrainaFelipe](https://twitter.com/TrainaFelipe)
- LinkedIn: [Traina Felipe](https://www.linkedin.com/in/felipe-traina-ar/)

If you find this tool helpful or have suggestions for improvements, feel free to reach out or contribute to the project. Your feedback is always welcome!
