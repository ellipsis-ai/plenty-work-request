function(requestData, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const actionsApi = new EllipsisApi(ellipsis).actions;
const client = require('GoogleClient')(ellipsis);
const {google} = ellipsis.require('googleapis@38.0.0');
const sheets = google.sheets({
  version: 'v4',
  auth: client
});
const WorkRequest = require("WorkRequest");
const moment = require("moment-timezone");
moment.tz.setDefault(ellipsis.teamInfo.timeZone);
const request = WorkRequest.fromString(requestData);
request.timestamp = moment().format(WorkRequest.timestampFormat());
const SAVE_ERROR_MESSAGE = `An error occurred while trying to save your report. Please notify <@${ellipsis.env.CHANGE_CONTROL_MANAGER_USER_ID}>.`;

client.authorize().then(() => {
  return sheets.spreadsheets.values.append({
    spreadsheetId: ellipsis.env.SCHEDULING_WORK_REQUEST_SHEET_ID,
    range: ellipsis.env.SCHEDULING_WORK_REQUEST_SHEET_NAME,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [request.toRow()]
    },
    auth: client
  });
}).catch((err) => {
  throw new ellipsis.Error(err, {
    userMessage: SAVE_ERROR_MESSAGE
  });
}).then((res) => {
  const updated = res.data.updates.updatedRows;
  if (updated === 0) {
    throw new ellipsis.Error("Report was not saved. No rows were updated.", {
      userMessage: SAVE_ERROR_MESSAGE
    });
  } else {
    ellipsis.success(request.format());
  }
});
}
