"use strict"

// fetch local JSON data
const getCrew = async () => {
  const url = "./../data.json"
  try {
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Data could not be fetched, code: ${response.status}`
      throw new Error(message)
    }
    const data = await response.json()
    return data.crew
  } catch (error) {
    console.error(error.message)
  }
}

const changeCrew = (e) => {
  // DOM variables
  const role = document.querySelector("#crewRole")
  const name = document.querySelector("#crewName")
  const bio = document.querySelector("#crewBio")
  const img = document.querySelector("#crewImg")
  const btns = document.querySelectorAll("#crewNav button")

  if (e.target.tagName.toLowerCase() !== "button") return

  for (const btn of btns) {
    btn.disabled = false
    btn.classList.remove("active")
  }

  e.target.classList.add("active")
  e.target.disabled = true

  getCrew()
    .then((crewArr) => {
      const btnsArr = Array.from(btns)
      const index = btnsArr.indexOf(e.target)
      const crewMember = crewArr[index]

      // Update crew info
      name.textContent = crewMember.name
      img.alt = crewMember.name
      role.textContent = crewMember.role
      bio.textContent = crewMember.bio

      // handle image animation
      img.classList.remove("fade-in")
      img.classList.add("fade-out")
      img.addEventListener("animationend", () => {
        img.classList.remove("fade-out")
        img.src = `../${crewMember.images.png}`
        img.classList.add("fade-in")
      })
    })
    .catch((err) => console.error(err.message))
}

const nav = document.querySelector("#crewNav")
nav.addEventListener("click", changeCrew)
