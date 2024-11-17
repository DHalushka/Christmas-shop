/**
 * TODO: Back to top button
 */

const upBtn = document.querySelector(".back-to-top");
upBtn.addEventListener("click", () => {
	window.scrollTo(0, 0);
});
document.addEventListener("scroll", showBackToTopButton);
window.addEventListener("resize", showBackToTopButton);
function showBackToTopButton() {
	if (window.scrollY === 0 || window.innerWidth > 768) {
		upBtn.style.display = "none";
	} else {
		upBtn.style.display = "block";
	}
}
showBackToTopButton();
