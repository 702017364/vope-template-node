import Logger from './logger';

export default class Throttle {
  #id;
  #log;

  constructor(callback, time = 200){
    this.time = time;
    this.callback = callback;
  }

  then = () => {
    const log = this.#log = this.#log || new Logger();
    this.#id && clearTimeout(this.#id);
    this.#id = setTimeout(() => {
      this.#id = void 0;
      log.then();
      this.#log = void 0;
      this.callback();
    }, this.time);
  }
};