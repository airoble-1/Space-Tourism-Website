"use strict"

// fetch local JSON data
const getTech = async () => {
  const url = "./../data.json"
  try {
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Data could not be fetched, code: ${response.status}`
      throw new Error(message)
    }
    const data = await response.json()
    return data.technology
  } catch (error) {
    console.error(error.message)
  }
}

// set image orientation
const changeImgSize = () => {
  const img = document.querySelector("#techImg")
  if (window.innerWidth >= 1024) {
    img.src = img.src.replace(/landscape/, "portrait")
  } else img.src = img.src.replace(/portrait/, "landscape")
}

window.addEventListener("resize", changeImgSize)

const changeTech = (e) => {
  // DOM Variables
  const name = document.querySelector("#techName")
  const img = document.querySelector("#techImg")
  const desc = document.querySelector("#techDesc")
  const btns = document.querySelectorAll("#techNav li button")

  if (e.target.tagName.toLowerCase() !== "button") return

  for (const btn of btns) {
    btn.classList.remove("active")
    btn.disabled = false
  }
  e.target.classList.toggle("active")
  e.target.disabled = true
  getTech()
    .then((techArr) => {
      const btnsArr = Array.from(btns)
      const index = btnsArr.indexOf(e.target)
      const tech = techArr[index]

      // update crew info
      name.textContent = tech.name
      img.alt = tech.name
      desc.textContent = tech.description

      // handle image animations
      img.classList.remove("blink-in")
      img.classList.add("blink-out")
      img.addEventListener("animationend", () => {
        img.classList.remove("blink-out")
        if (window.innerWidth >= 1024) {
          img.src = `../${tech.images.portrait}`
        } else img.src = `../${tech.images.landscape}`
        img.classList.add("blink-in")
      })
    })
    .catch((err) => console.error(err.message))
}
const nav = document.querySelector("#techNav")
changeImgSize()
nav.addEventListener("click", changeTech)
