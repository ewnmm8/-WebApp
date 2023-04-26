export function formatMin(min) {
   console.log(min)
   let num = Math.round(min * 60)
   if (num < 0) num = 0
   return num
}

export function numToSec(time) {
   return ('0' + (time % 60)).slice(-2)
}

export function numToMin(time) {
   return (time - numToSec(time)) / 60
}

export function formatSpan(char) {
   return '<span>' + char + '</span>'
}