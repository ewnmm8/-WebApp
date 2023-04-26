import audio0 from "../assets/mp3/柱時計の鐘.mp3"
import audio1 from "../assets/mp3/鳩時計2.mp3"

const audio = [
   new Audio(audio0),
   new Audio(audio1)
]
let afterPlaying = () => {}

audio[0].addEventListener('ended', () => {
   audio[1].play()
})
audio[1].addEventListener('ended', () => {
   afterPlaying()
})

export function audioPlay(func=()=>{}) {
   afterPlaying = func
   audio[0].play()
}