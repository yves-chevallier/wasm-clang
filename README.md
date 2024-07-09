# Sandbox...

## Development

```bash
yarn install
yarn start
```

## TO-DO

- [ ] Raise an error if cannot build and stop the process
- [ ] Add stdin field
- [ ] Add Args field
- [ ] Reexecute when stdin or args changes
- [ ] Detect timeout and report it

## Usage

```js
const runner = new CodeRunner({
  timeout: 3000,
  stackSize: 1024 * 1024,
  language: 'cpp'
  cargs: ['-std=c++17', '-O2'],
  clargs: [],
  // Rest of default parameters...
});

// Log everything from the runner
runner.on('stdout', (data) => console.log);
runner.on('stderr', (data) => console.error);
runner.on('exit', (code) => console.log('Exit code:', code));
runner.on('timeout', () => console.log('Timeout'));

// Build and run with bound parameters
async () => {
  let result = await runner.build(`
    #include <iostream>
    int main() {
      std::cout << "Hello World" << std::endl;
    }
    `);
  if (result.code !== 0) {
    console.error('Build failed');
    return;
  }
  result = await runner.run({
    timeout: 3000,
    exec: result.exec,
    maxOutput: 1024, // Raise an OutputOverflow if output is bigger than 1024
    stdin: 'stdin',
    args: ['arg1', 'arg2'],
    env: {env1: 'value1'},
    files: {'foo.txt': 'bar'}
  });
  if (result.code !== 0) {
    console.error('Run failed with code:', result.code);
    return;
  }
  console.log('Run succeeded');
}()

// Build and run with default parameters
async () => {
  let result = await runner.buildAndRun({
    source: `
      #include <iostream>
      int main() {
        std::cout << "Hello World" << std::endl;
      }`,
    stdin: 'stdin',
    args: ['arg1', 'arg2'],
    env: {env1: 'value1'},
    files: {'foo.txt': 'bar'}
    stdout: (data) => console.log(data), // Capture stdout real-time
  });

  if (result.code !== 0) {
    console.error('Run failed with code:', result.code);
    return;
  }
}()

// Event with stdin
async () = {
  try {
    let app = await runner.build({
      source: `
        #include <iostream>
        int main() {
          std::string input;
          std::cin >> input;
          std::cout << "Hello " << input << std::endl;
        }`,
      cargs: ['-std=c++17', '-O2'],
    });
  } catch (err) {
    console.error('Build failed:\n', err.message);
    return;
  }
  app.on('stdout', (data) => console.log(data));
  document.getElementById('input').addEventListener('input', (e) => {
    app.appendStdin(e.target.value);
  });
  try {
    let result = await app.run();
  } catch (err) {
    console.error('Run failed:\n', err.message);
  }
  console.log('Run succeeded');
}()
```
Just get the output of the program

```javascript
const output = await(aync () => {
    const result = await runner.buildAndRun(`
    #include <iostream>
    int main() {
      std::cout << "Hello World" << std::endl;
    }`)
    return result.stdout;
})()

```


## Discussions des problèmes

Éviter des exceptions me semble une bonne idée. Un timeout, ou un status de sortie ne sont pas des execptions, le programme se termine mais simplement avec une erreur.

On peut utiliser le code de sortie pour déterminer si le programme à subit un timeout. Le code 124 est souvent utilisé pour les timeout. Donc on peut simplement vérifier si le code de sortie est 124 pour déterminer si le programme à subit un timeout.

Comment gérer la concurrence ? Si on compile deux programmes et qu'on les exécutes en même temps. Une solution serait de créer un pool de worker qui compile et exécute les applications.
