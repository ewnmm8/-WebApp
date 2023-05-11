function toUnsignedInt(num) {
   num = Math.round(num)
   if (num < 0) num = 0
   return num
}

function formatInt(num) {
   return ('0' + num).slice(-2)
}

export function sec(time) {
   time = toUnsignedInt(time)
   return formatInt(time % 60)
}

export function min(time) {
   time = toUnsignedInt(time)
   return formatInt((time - time % 60) / 60)
}

export function formatSpan(char) {
   return '<span>' + char + '</span>'
}