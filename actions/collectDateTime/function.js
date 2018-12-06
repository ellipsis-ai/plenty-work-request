function(requestData, date, time, ellipsis) {
  const WorkRequest = require("WorkRequest");
const moment = require("moment-timezone");
const request = WorkRequest.fromString(requestData);
moment.tz.setDefault(ellipsis.teamInfo.timeZone);
request.date = moment(date).format(WorkRequest.dateFormat());
request.time = time;
ellipsis.success("", {
  next: {
    actionName: "saveRequest",
    args: [request.toArg()]
  }
});
}
