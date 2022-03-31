/* eslint no-console: "off" */

export enum LEVEL {
  SILENT,
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

const namespaces: Record<string, Logger> = {};

export class Logger implements Console {
  // --- static

  private readonly namespaces: string[] = [];

  private _level: LEVEL = LEVEL.SILENT;

  private _time: Date = new Date();

  // --- properties

  public readonly LEVEL: typeof LEVEL = LEVEL;

  public readonly Console: any = Logger;

  constructor(ns = '') {
    this.namespaces.push(...ns.split('.'));

    this.active(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  }

  // --- getters / setters

  public get namespace(): string {
    return this.namespaces
      .filter(Boolean)
      .map((ns: string): string => `[${ns.toLocaleUpperCase()}]`)
      .join(' ');
  }

  public get timestamp() {
    const date = new Date();

    return `[${date.toLocaleTimeString()} / ${Number(
      (date.getTime() - this._time.getTime()) / 1000,
    ).toFixed(2)}s]`;
  }

  public get level(): LEVEL {
    return this._level;
  }

  public set level(level: LEVEL) {
    this._level = level;
  }

  // --- methods

  public ns(ns: string): Logger {
    const namespace: string = [...this.namespaces, ns].join('.');

    namespaces[namespace] = namespaces[namespace] || new Logger(namespace);

    return namespaces[namespace] as Logger;
  }

  public getLogger(ns: string): Logger {
    return this.ns(ns);
  }

  // eslint-disable-next-line class-methods-use-this
  public getLoggers(): Record<string, Logger> {
    return namespaces;
  }

  public enableAll(): void {
    this.level = LEVEL.ERROR;
  }

  public disableAll(): void {
    this.level = LEVEL.SILENT;
  }

  public active(bool: boolean): boolean {
    if (bool) {
      this.enableAll();
    } else {
      this.disableAll();
    }

    return bool;
  }

  // --- from Console

  /**
   * A simple assertion test that verifies whether `value` is truthy.
   * If it is not, an `AssertionError` is thrown.
   * If provided, the error `message` is formatted using `util.format()` and used as the error message.
   */

  public assert(condition?: boolean, ...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.assert(condition, ...data);
  }

  /**
   * When `stdout` is a TTY, calling `logger.clear()` will attempt to clear the TTY.
   * When `stdout` is not a TTY, this method does nothing.
   */
  public clear(): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.clear();
  }

  /**
   * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `logger.count()` has been called with the given `label`.
   *
   * @param label
   */
  public count(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.count(label);
  }

  /**
   * Resets the internal counter specific to `label`.
   *
   * @param label
   */
  public countReset(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.countReset(label);
  }

  /**
   * The `logger.debug()` function is an alias for {@link console.log()}.
   *
   * @param {...any} data
   */
  public debug(...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.debug(...data);
  }

  /**
   * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
   * This function bypasses any custom `inspect()` function defined on `obj`.
   *
   * @param item
   * @param options
   */
  public dir(item?: any, options?: any): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.dir(item, options);
  }

  /**
   * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
   *
   * @param {...any} data
   */
  public dirxml(...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.dirxml(...data);
  }

  /**
   * Prints to `stderr` with newline.
   *
   * @param {...any} data
   */
  public error(...data: any[]): void {
    if (!this.validate(LEVEL.ERROR)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.error(...data);
  }

  /**
   * Increases indentation of subsequent lines by two spaces.
   * If one or more `label`s are provided, those are printed first without the additional indentation.
   *
   * @param {...any} data
   */
  public group(...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.group(...data);
  }

  /**
   * The `logger.groupCollapsed()` function is an alias for {@link console.group()}.
   *
   * @param {...any} data
   */
  public groupCollapsed(...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.groupCollapsed(...data);
  }

  /**
   * Decreases indentation of subsequent lines by two spaces.
   */
  public groupEnd(): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.groupEnd();
  }

  /**
   * The {@link console.info()} function is an alias for {@link console.log()}.
   *
   * @param {...any} data
   */
  public info(...data: any[]): void {
    if (!this.validate(LEVEL.INFO)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.info(...data);
  }

  /**
   * Prints to `stdout` with newline.
   *
   * @param {...any} data
   */
  public log(...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.log(...data);
  }

  /**
   * This method does not display anything unless used in the inspector.
   *  Prints to `stdout` the array `array` formatted as a table.
   *
   * @param tabularData
   * @param properties
   */
  public table(tabularData?: any, properties?: string[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.table(tabularData, properties);
  }

  /**
   * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
   *
   * @param label
   */
  public time(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.time(label);
  }

  /**
   * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
   *
   * @param label
   */
  public timeEnd(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.timeEnd(label);
  }

  /**
   * For a timer that was previously started by calling {@link console.time()}, prints the elapsed time and other `data` arguments to `stdout`.
   *
   * @param label
   * @param {...any} data
   * @param label
   * @param {...any} data
   */
  public timeLog(label?: string, ...data: any[]): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.timeLog(label, ...data);
  }

  /**
   * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
   *
   * @param {...any} data
   */
  public trace(...data: any[]): void {
    if (!this.validate(LEVEL.TRACE)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.trace(...data);
  }

  /**
   * The {@link console.warn()} function is an alias for {@link console.error()}.
   *
   * @param {...any} data
   */
  public warn(...data: any[]): void {
    if (!this.validate(LEVEL.WARN)) return;
    if (this.namespace) (data = data || []).unshift(this.namespace, this.timestamp);

    console.warn(...data);
  }

  // --- Inspector mode only ---

  /**
   * This method does not display anything unless used in the inspector.
   *  Starts a JavaScript CPU profile with an optional label.
   *
   * @param label
   */
  public profile(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;
    if (typeof (console as any).profile !== 'undefined') {
      (console as any).profile(label);
    }
  }

  /**
   * This method does not display anything unless used in the inspector.
   *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
   *
   * @param label
   */
  public profileEnd(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    if (typeof (console as any).profile !== 'undefined') {
      (console as any).profileEnd(label);
    }
  }

  /**
   * This method does not display anything unless used in the inspector.
   *  Adds an event with the label `label` to the Timeline panel of the inspector.
   *
   * @param label
   */
  public timeStamp(label?: string): void {
    if (!this.validate(LEVEL.DEBUG)) return;

    console.timeStamp(label);
  }

  // ---

  private validate(level: LEVEL): boolean {
    return this.level >= level;
  }
}

export const logger: Logger = new Logger('LOGGER');
