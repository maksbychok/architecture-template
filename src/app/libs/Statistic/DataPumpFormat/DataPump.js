
class DataPump {
  
  export(processor) {
    return processor.export();
  }
  
  import(processor) {
    return processor.import();
  }
  
  
}

module.exports = DataPump;