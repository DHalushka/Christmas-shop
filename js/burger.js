/**
 * TODO: Burger Menu
 */
const burgerButton = document.querySelector(".burger");
const navMenu = document.querySelector("header nav");
const navLinks = document.querySelectorAll("header nav ul li a");
window.addEventListener("resize", updateNavLinksClass);
updateNavLinksClass();
function updateNavLinksClass() {
	let navclass = window.innerWidth <= 768 ? "action-large" : "action-small";
	navLinks.forEach((link) => {
		link.className = navclass;
	});
}
burgerButton.addEventListener("click", () => {
	HandleNavOpenAndClose();
});
navLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		const targetHref = link.getAttribute("href");
		HandleNavOpenAndClose();
		navMenu.addEventListener("transitionend", function onTransitionEnd() {
			navMenu.removeEventListener("transitionend", onTransitionEnd);
			if (targetHref.startsWith("#")) {
				document.querySelector(targetHref).scrollIntoView();
			} else {
				window.location.href = targetHref;
			}
		});
	});
});
function HandleNavOpenAndClose() {
	burgerButton.classList.toggle("opened");
	navMenu.classList.toggle("opened");
	document.body.classList.toggle("no-scroll");
}
