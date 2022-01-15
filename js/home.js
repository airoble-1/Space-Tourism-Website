const btnExplore = document.querySelector(".home__btn-explore")

const form = document.querySelector(".home__link")
form.addEventListener("submit", (e) => {
  console.log("form submitted")
  e.preventDefault()
})

btnExplore.addEventListener("click", function () {
  btnExplore.classList.add("spin")
  btnExplore.addEventListener("animationend", () => {
    btnExplore.classList.remove("spin")
    const url = form.action
    window.location = url
  })
})
