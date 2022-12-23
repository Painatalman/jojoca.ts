export class Jojoca {
  getWrappedFunction(
    originalFunction: Function,
    onErrorCallback: Function = (e: Error) =>
      console.log(`aconteceu "${e}", mas Jojoca NÃO FALHA!`)
  ): Function {
    return function (...args: any[]) {
      try {
        originalFunction(...args);
      } catch (e) {
        onErrorCallback(e);
      }
    };
  }
}
