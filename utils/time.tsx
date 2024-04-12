export function secToMins(sec: number): string {
  return (sec / 60).toFixed(2);
}

export function formatSec(sec: number) {
  const _minute = Math.floor(sec / 60);
  const _sec = sec % 60;
  // return `${_minute} min and ${_sec} sec`;
  const minText = `${_minute} min`;
  const secText = `${_sec} sec`;
  const connector = "and";
  // return `${minText} ${connector} ${secText}`
  const sentence = [];

  if (_minute > 0) {
    sentence.push(minText);
  }
  if (_minute > 0 && _sec > 0) {
    sentence.push(connector);
  }
  if (_sec > 0) {
    sentence.push(secText);
  }
  return sentence.join(" ");
}
