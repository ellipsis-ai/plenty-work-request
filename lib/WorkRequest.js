/*
@exportId HkLo11SuRE2nfsCU-bFMZQ
*/
module.exports = (function() {
class WorkRequest {
  constructor(data) {
    this.requester = data.requester;
    this.timestamp = data.timestamp;
    this.task = data.task;
    this.numPeople = data.numPeople;
    this.hours = data.hours;
    this.date = data.date;
    this.time = data.time;
  }

  static fromString(jsonString) {
    return new WorkRequest(JSON.parse(jsonString));
  }

  static dateFormat() {
    return "M/D/YYYY";
  }

  static timestampFormat() {
    return "MMMM D, YYYY h:mm:ss a";
  }

  toRow() {
    return [
      this.timestamp,
      this.requester,
      this.task,
      this.numPeople,
      this.date || "Not specified",
      this.time || "Not specified",
      this.hours,
    ];
  }

  toString() {
    return JSON.stringify(this);
  }

  toArg() {
    return {
      name: "requestData",
      value: this.toString()
    }
  }

  format() {
    return `
**Requester:** ${this.requester}

**Task:**
${this.task}

**Number of people required:** ${this.numPeople}
**Number of hours required:** ${this.hours}
**Date needed by:** ${this.date || "Not specified"}${this.date ? `
**Preferred start/end time:** ${this.time}` : ""}
`;
  }
}

return WorkRequest;

})()
     