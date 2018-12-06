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
    return "MMMM D YYYY, h:mm:ss a";
  }

  toRow() {
    return [
      this.requester,
      this.timestamp,
      this.task,
      this.numPeople,
      this.hours,
      this.date || "Not specified",
      this.time || "Not specified"
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
${this.timestamp ? `**Request timestamp:** ${this.timestamp}
` : ""}
**Requester:** ${this.requester}

**Task:**
${this.task}

**Number of people required:** ${this.numPeople}
**Number of hours required:** ${this.hours}
**Date/time needed:** ${this.date || "Not specified"} ${this.date && this.time ? this.time : ""}
`;
  }
}

return WorkRequest;

})()
     