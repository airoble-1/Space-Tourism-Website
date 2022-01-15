"use strict"

// fetch local JSON data
const getDestination = async () => {
  const url = "./../data.json"
  try {
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Data could not be fetched, code: ${response.status}`
      throw new Error(message)
    }
    const data = await response.json()
    return data.destinations
  } catch (error) {
    console.error(error.message)
  }
}

const changeDestination = (e) => {
  const name = document.querySelector("#destinationName")
  const img = document.querySelector("#destinationImg")
  const desc = document.querySelector("#destinationDesc")
  const distance = document.querySelector("#destinationDist")
  const travel = document.querySelector("#destinationTravel")
  const btns = document.querySelectorAll("#destinationNav li button")

  if (e.target.tagName.toLowerCase() !== "button") return

  for (const btn of btns) {
    btn.disabled = false
    btn.classList.remove("active")
  }

  e.target.classList.toggle("active")
  e.target.disabled = true

  getDestination()
    .then((destinationsArr) => {
      const btnsArr = Array.from(btns)
      const index = btnsArr.indexOf(e.target)
      const destination = destinationsArr[index]

      // Update destination info
      name.textContent = destination.name
      desc.textContent = destination.description
      distance.textContent = destination.distance
      travel.textContent = destination.travel

      // handle image animation
      img.classList.remove("orbit-in")
      img.classList.add("orbit-out")
      img.addEventListener("animationend", () => {
        img.classList.remove("orbit-out")
        img.src = `../${destination.images.png}`
        img.classList.add("orbit-in")
      })
    })
    .catch((err) => console.error(err.message))
}
const nav = document.querySelector("#destinationNav")
nav.addEventListener("click", changeDestination)
