/**
 * Abstract class representing a base StrategyInterface interface.
 * @abstract
 * @class
 */
class StrategyInterface {
  /**
   * @constructs StrategyInterface
   * @param format
   * @param data
   */
  constructor(format, data, extra) {
    this.format = format;
    this.data = data;
    this.extra = extra;
  }


  export() {
    return this.processExport();
  }

  import() {
    return this.processImport();
  }

}

module.exports = StrategyInterface;