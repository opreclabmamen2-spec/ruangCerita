import background from './bg.png'
import logo from './logo-only.png' 
import mainLogo from './main-logo.png'
import anxiety from './anxiety.png'
import depression from './depsresi.png'
import suicidal from './suicidal.png'
import about from './about.png'

export const assets = {
    background,
    logo, about,
    mainLogo, anxiety, depression, suicidal
}

export const features = [
  {
    title: "Anxiety Detection",
    desc: "Mendeteksi gejala kecemasan seperti rasa gelisah, overthinking, dan sulit tidur.",
    img: assets.anxiety,
  },
  {
    title: "Depression Analysis",
    desc: "Mengidentifikasi indikasi depresi seperti sedih berkepanjangan dan kehilangan harapan.",
    img: assets.depression  ,
    highlight: true,
  },
  {
    title: "Suicidal Risk Detection",
    desc: "Mendeteksi risiko bunuh diri dari pola bahasa yang mengarah ke keputusasaan.",
    img: assets.suicidal,
  },
];