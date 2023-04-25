import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

let getRunePath = document.querySelector('.primaryRunes')
let getDesc = document.querySelector('.primaryRunesDesc')
let getChosenRune = document.querySelector('.chosenRunes')
let currentLevel = 1
let level = []
let runesImage=[]
let runesList = [{
  name: 'Precision',
  description: 'Improve attacks and sustained damage',
  image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/precision/icon-p-36x36.png',
  imageEffect: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/assets/Precision/vfx-p.png',
}]

let primaryRunes = [
  [
    {
      name: 'Press the Attack',
      description: 'Hitting an enemy champion 3 consecutive times makes them vunerable',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8005.png',
      level: 1,
    },
    {
      name: 'Lethal Tempo',
      description: '1.5s after damaging a champion gain a large amount of attack speed',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8008.png',
      level: 1,
    },
    {
      name: 'FleetWood Tempo',
      description: 'Attacking and moving builds Energy stacks. At 100 stacks',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8021.png',
      level: 1,
    },
  ],
  [
    {
      name: 'OverHeal',
      description: 'Hitting an enemy champion 3 consecutive times makes them vunerable',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/9101.png',
      level: 2,
    },
    {
      name: 'Triumph',
      description: '1.5s after damaging a champion gain a large amount of attack speed',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/9111.png',
      level: 2,
    },
    {
      name: 'Presence Of Mind',
      description: 'Attacking and moving builds Energy stacks. At 100 stacks',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8009.png',
      level: 2,
    },
  ],
  [
    {
      name: 'Legend: Alacrity',
      description: 'Hitting an enemy champion 3 consecutive times makes them vunerable',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/9104.png',
      level: 3,
    },
    {
      name: 'Legend Tenacity',
      description: '1.5s after damaging a champion gain a large amount of attack speed',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/9105.png',
      level: 3,
    },
    {
      name: 'Legend: BloodLine',
      description: 'Attacking and moving builds Energy stacks. At 100 stacks',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/9103.png',
      level: 3,
    },
  ],
  [
    {
      name: 'Coup De Grace',
      description: 'Hitting an enemy champion 3 consecutive times makes them vunerable',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8014.png',
      level: 4,
    },
    {
      name: 'Cut Down',
      description: '1.5s after damaging a champion gain a large amount of attack speed',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8017.png',
      level: 4,
    },
    {
      name: 'Last Stand',
      description: 'Attacking and moving builds Energy stacks. At 100 stacks',
      image: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/preseason-2018/en_US/a6708b7ae3dbc0b25463f9c8e259a513d2c4c7e6/assets/img/runeBuilder/runes/108x108/8299.png',
      level: 4,
    }
  ]
]


async function runesData() {
  const runeData = await fetch("http://ddragon.leagueoflegends.com/cdn/0.154.3/data/en_US/rune.json")
  const jsonData = await runeData.json();

  console.log(jsonData)
}

runesList.forEach((runes) => {
  let showImage = document.createElement('img')
  let showEffect = document.createElement('img')
  showImage.className = 'runesImage'
  showImage.src = runes.image

  showEffect.className = 'runesEffect'
  showEffect.src = runes.imageEffect
  getRunePath.appendChild(showImage)
  getRunePath.appendChild(showEffect)

  let runeDesc = document.createElement('span')
  let runeName = document.createElement('span')
  runeName.className = 'runeName'
  runeDesc.className = 'runeDescription'
  getDesc.appendChild(runeName)
  getDesc.appendChild(runeDesc)

  let runesName = document.querySelector('.runeName')
  runesName.textContent = runes.name.toUpperCase()


  let descrip = document.querySelector('.runeDescription')
  descrip.textContent = runes.description

  let primaryRunesTwo = document.createElement('div')
  primaryRunesTwo.className = 'primaryRuneTwo'

  let chosenRuneDesc = document.createElement('span')
  chosenRuneDesc.className = 'chosenRuneDesc'
  getDesc.appendChild(chosenRuneDesc)
  // let selectPrimaryRuneTwo=document.createElement('img')
  // selectPrimaryRuneTwo.className='runesImageTwo'


  // getRunePath.appendChild(primaryRunesTwo)
  // primaryRunesTwo.appendChild(selectPrimaryRuneTwo)
  function createImg(element, inject, clName) {
    const img = document.createElement(element)
    img.className = clName
    inject.appendChild(img)

    return img
  }

  // function chooseRunes(prima, image){
  //   image.addEventListener('click',()=>{
  //     // console.log(prima, image)
  //     if(level.map(s => s.name).indexOf(prima.name) < 0){
  //       level.push(prima)

  //       ++currentLevel
  //       if(currentLevel <= 3){
  //         showRuneImage()
  //       }
  //       else{
  //         console.table(level)
  //       }
  //     }          
  //   })
  // }

  let selectPrimaryRuneThree = document.createElement('div')
  selectPrimaryRuneThree.className = 'primaryRunesThree'
  getRunePath.appendChild(selectPrimaryRuneThree)

  let selectPrimaryRuneFour = document.createElement('div')
  selectPrimaryRuneFour.className = 'primaryRunesFour'
  getRunePath.appendChild(selectPrimaryRuneFour)


  function chooseRunes(prima, image) {  
    const getlocalStorage = localStorage.getItem('localRunes')
    if(getlocalStorage){
      const selectedRune = JSON.parse(getlocalStorage)
      chooseRunes(selectedRune, getlocalStorage)
    }

    image.addEventListener('click', () => {
      if(currentLevel <= 4){
        currentLevel++
        let get = level.push(prima)
        let img = document.createElement('img')
        img.className='chosenRune'
        img.src=prima.image
        // runesImage = [prima.image]
        getChosenRune.appendChild(img)
        localStorage.setItem('localRune', JSON.stringify(image))
      }
      else{
        removeEventListener('click', true)
      }
    })
  }


  function showRuneImage() {
    primaryRunes.forEach((primaRunes, index) => {
      let selectPrimaryRuneTwo = document.createElement('img')
      selectPrimaryRuneTwo.className = 'runesImageTwo'
      selectPrimaryRuneTwo.src = primaRunes[0].image

      let runesImgThree = document.createElement('img')
      runesImgThree.className = 'runesImageThree'
      runesImgThree.src = primaRunes[1].image

      let runesImgFour = document.createElement('img')
      runesImgFour.className = 'runesImageFour'
      runesImgFour.src = primaRunes[2].image

      // createImg('img', selectPrimaryRuneThree, 'runesImageThree').src=primaRunes[1].image
      // createImg('img', selectPrimaryRuneFour, 'runesImageFour').src=primaRunes[2].image
      
      chooseRunes(primaRunes[0], selectPrimaryRuneTwo)
      chooseRunes(primaRunes[1], runesImgThree)
      chooseRunes(primaRunes[2], runesImgFour)

      

      getRunePath.appendChild(primaryRunesTwo)
      primaryRunesTwo.appendChild(selectPrimaryRuneTwo)
      selectPrimaryRuneThree.appendChild(runesImgThree)
      selectPrimaryRuneFour.appendChild(runesImgFour)
      // primaryRunesTwo.appendChild(selectPrimaryRuneThree)
    })
  }
  showRuneImage()
})