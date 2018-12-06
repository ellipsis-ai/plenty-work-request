function(task, numPeople, hours, specifyDate, ellipsis) {
  const WorkRequest = require("WorkRequest");
const request = new WorkRequest({
  requester: ellipsis.userInfo.fullName,
  task: task,
  numPeople: numPeople,
  hours: hours,
});
const nextAction = {
  actionName: specifyDate ? "collectDateTime" : "saveRequest",
  args: [request.toArg()]
};
ellipsis.success("", {
  next: nextAction
});
}
