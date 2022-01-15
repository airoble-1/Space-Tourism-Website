const mobileNavToggle = document.querySelector(".header-nav-toggle")
const headerNav = document.querySelector(".header-nav")
const navItems = document.querySelectorAll(".header-nav__list li")

let open = false
mobileNavToggle.addEventListener("click", () => {
  for (const item of navItems) {
    item.classList.toggle("slideInLeft")
  }
  headerNav.classList.toggle("show")
  open = !open
  const imgSrcs = [
    "./../assets/shared/icon-hamburger.svg",
    "./../assets/shared/icon-close.svg",
  ]
  if (open) mobileNavToggle.children[0].src = imgSrcs[1]
  else mobileNavToggle.children[0].src = imgSrcs[0]
})
