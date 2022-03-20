// function add0(num){
//   return num < 10 ? '0' + num : num
// }
export function getDateNow() {
  const date = new Date();
  // request a weekday along with a long date
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const thisDate = new Intl.DateTimeFormat(navigator.language, options).format(date).split(',').join('');
  // const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  // first.toLocaleUpperCase(locale)
  return thisDate[0].toUpperCase() + thisDate.substring(1, thisDate.length);
  // const thisMoment = moment().format('DD MMMM YYYY hh:mm:ss');
  // const d = new Date()
  // const month = d.getMonth() + 1
  // const hours = add0(d.getHours())
  // const minuts = add0(d.getMinutes())
  // const seconds = add0(d.getSeconds())
  // const dateNow = [d.getFullYear(), month, d.getDate()].join('/')
  // const time = [hours, minuts, seconds].join(':')
  // return  thisMoment
}
