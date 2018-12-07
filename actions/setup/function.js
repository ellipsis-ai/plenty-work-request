function(channel, recurrence, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const moment = require('moment-timezone');
moment.tz.setDefault(ellipsis.teamInfo.timeZone);

const actionsApi = new EllipsisApi(ellipsis).actions;

actionsApi.unschedule({
  actionName: "workRequestPrompt",
  channel: channel
}).then(() => {
  return actionsApi.schedule({
    actionName: "workRequestPrompt",
    channel: channel,
    recurrence: recurrence
  });
}).then((response) => {
  if (response.scheduled) {
    ellipsis.success({
      recurrence: response.scheduled.recurrence,
      firstRecurrence: moment(response.scheduled.firstRecurrence).format("LLLL")
    })
  } else {
    throw new ellipsis.Error("Unknown scheduling error");
  }
}).catch((err) => {
  throw new ellipsis.Error(err, {
    userMessage: "Something went wrong and I couldn’t schedule that for you. Perhaps try again?"
  });
});
}
