function(ellipsis) {
  const greeting = require("ellipsis-random-response").greetingForTimeZone(ellipsis.teamInfo.timeZone);
const moment = require('moment-timezone');
moment.tz.setDefault(ellipsis.teamInfo.timeZone);
const today = moment();
// Day of week: 0 == Sunday, 6 == Saturday
const reminder = today.day() < 4 ?
  "Are there are any work requests to add for next week?" :
  "Don’t forget to add any work requests for next week!";
ellipsis.success(`
${greeting}

${reminder}
`, {
  choices: [{
    label: "Start new work request",
    actionName: "newWorkRequest",
    allowMultipleSelections: true,
    allowOthers: true
  }]
});
}
