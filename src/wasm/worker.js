import * as Comlink from 'comlink';
import CodeRunnerWorker from './runner.js';

const codeRunner = new CodeRunnerWorker({
  async readBuffer(filename) {
    const response = await fetch(filename);
    return response.arrayBuffer();
  },
  async compileStreaming(filename) {
    const response = await fetch(filename);
    return WebAssembly.compile(await response.arrayBuffer());
  },
});

const exposedMethods = {
  build: (args) => codeRunner.build(...args),
  exec: (args) => codeRunner.exec(...args),
  setListener: (listener) => codeRunner.setListener(Comlink.proxy(listener)),
  linkCachedModules: (cache) => codeRunner.linkCachedModules(cache),
  setOnNewCache: (listener) => codeRunner.setOnNewCache(Comlink.proxy(listener)),
  init: () => codeRunner.init(),
};

Comlink.expose(exposedMethods);
