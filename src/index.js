import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import '@xterm/xterm/css/xterm.css';
import './custom.css';
import { Terminal } from '@xterm/xterm';
import * as monaco from 'monaco-editor';
import CodeRunner from './wasm/CodeRunner.js';
import { TimeoutError } from './wasm/errors.js';

document.addEventListener('DOMContentLoaded', async function () {
  const term = new Terminal({
    fontSize: 13,
    cols: 80,
    rows: 10,
    fontFamily: '"Menlo for Powerline", Menlo, Consolas, "Liberation Mono", Courier, monospace',
    scrollback: 0,
    disableStdin: true,
    scrollOnUserInput: true,
    theme: {
      foreground: '#D4D4D4',
      background: '#1E1E1E',
      cursor: '#FFFFFF',
      black: '#000000',
      red: '#F44747',
      green: '#608B4E',
      yellow: '#DCDCAA',
      blue: '#569CD6',
      magenta: '#C586C0',
      cyan: '#4EC9B0',
      white: '#D4D4D4',
      brightBlack: '#666666',
      brightRed: '#F44747',
      brightGreen: '#608B4E',
      brightYellow: '#DCDCAA',
      brightBlue: '#569CD6',
      brightMagenta: '#C586C0',
      brightCyan: '#4EC9B0',
      brightWhite: '#FFFFFF'
    }
  });
  term.open(document.getElementById('terminal'));
  term.write('\x1b[?7h');
  window.term = term;
  // Initialisez CodeRunnerApi


  const editorElement = document.getElementById('monaco-editor');

  const editor = monaco.editor.create(editorElement, {
    value: [
      '#include <stdio.h>',
      'int main(int argc, char* argv[]) {',
      '    printf("hello %d", argc);',
      '}'
    ].join('\n'),
    language: 'c',
    lineNumbers: 'off',
    minimap: { enabled: false },
    renderLineHighlight: 'none',
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden'
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    automaticLayout: true,
    folding: false,
    scrollBeyondLastLine: false,
    renderIndentGuides: false
  });

  const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
  const minLines = 5;
  const maxLines = 30;

  function updateEditorHeight() {
    const lineCount = Math.min(Math.max(editor.getModel().getLineCount(), minLines), maxLines);
    const newHeight = lineCount * lineHeight;
    editorElement.style.height = `${newHeight}px`;
    editor.layout();
  }

  updateEditorHeight(); // Initial height adjustment

  function lf2crlf(text) {
    return text.replace(/\r\n|\r|\n/g, '\r\n');
  }

  const runner = new CodeRunner();
  window.runner = runner;

  let resetOnNextChange = false;
  let mute = false;

  runner.on('stdout', (data) => {
    if (resetOnNextChange) {
      term.reset();
      resetOnNextChange = false;
    }
    if (!mute) {
      term.write(lf2crlf(data));
    }
  });
  runner.on('stderr', (data) => {
    if (resetOnNextChange) {
      term.reset();
      resetOnNextChange = false;
    }
    if (!mute) {
      term.write(`\x1b[31m${lf2crlf(data)}\x1b[0m`);
    }
  });
  runner.on('exit', (code) => {
    if (resetOnNextChange) {
      term.reset();
      resetOnNextChange = false;
    }
    if (!mute) {
      term.write(`\nProcess exited with code ${code}\n`);
    }
  });

  editor.onDidChangeModelContent(async () => {
    updateEditorHeight();
    resetOnNextChange = true;
    try {
      mute = true;
      var outputs = await runner.build(editor.getValue());
      document.getElementById('test1').checked = outputs.exitCode == 0;
      if (outputs.exitCode !== 0) {
        mute = false;
        term.write("\x1b[31m\x1b[1mError: Compilation failed!\x1b[0m\r\n");
        runner.emit('stderr', outputs.stderr);
        return;
      }
      mute = false;
      try {
        outputs = await runner.run();
      } catch (error) {
        if (error instanceof TimeoutError) {
          term.write('\x1b[31mError: Timeout!\x1b[0m\r\n');
        }
      }
      document.getElementById('test2').checked = outputs.stdout === 'Hello World!'
    } catch (error) {
      console.error(error);
      term.write(error);
    }
  });
});
