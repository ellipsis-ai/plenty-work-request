function(requestData, ellipsis) {
  const WorkRequest = require("WorkRequest");
const moment = require("moment-timezone");
moment.tz.setDefault(ellipsis.teamInfo.timeZone);
const request = WorkRequest.fromString(requestData);
request.timestamp = moment().format(WorkRequest.timestampFormat());
ellipsis.success(request.format());
}
