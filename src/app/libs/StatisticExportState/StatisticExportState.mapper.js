const MapperInterface = require('@interfaces/Mapper.interface');
const moment = require('moment');
/**
 * Class representing a StatisticExportStateMapper
 * @class
 * @memberOf Libs.StatisticExportState
 */
class StatisticExportStateMapper extends MapperInterface {
  /* Map data to app layer.
   * @method
   */
  toEntity(values) {
    if (!values) return values;

    const {
      id,
      fileName,
      status,
      format,
      createdAt
    } = values;
    return {
      id,
      fileName,
      status,
      format,
      createdAt: date(createdAt)
    };
  }

  /* Map data to db layer.
   * @method
   */
  toDatabase(values) {
    const {
      fileName,
      path,
      status,
      format,
    } = values;
    return {
      ...(fileName && { fileName }),
      ...(path && { path }),
      ...(status && { status }),
      ...(format && { format }),
    };
  }

}
function date(date) {
  if (moment(date).isValid()) {
    return moment(date).utc().format('YYYY/MM/DD HH:ss');
  }
  return '';
}

module.exports = StatisticExportStateMapper;
