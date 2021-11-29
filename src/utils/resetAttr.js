export default function resetAttr() {
  const body = document.querySelector('body')
  const hamburger = document.querySelector('.hamburger')
  const menuPanel = document.querySelector('.menu-panel')
  const navBarToggle = document.querySelector('.navbar-toggle')
  body.removeAttribute('class')
  hamburger.classList.remove('active')
  menuPanel.classList.remove('open')
  navBarToggle.removeAttribute('fixed')
}
