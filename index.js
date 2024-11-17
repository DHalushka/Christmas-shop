/**
 * TODO: Slider
 */

const slider = document.querySelector(".slider");
const contentRow = document.querySelector(".content-row");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let totalScrollableWidth = slider.scrollWidth - contentRow.offsetWidth;
let totalClicks = window.innerWidth < 768 ? 6 : 3;
let scrollIncrement = Math.ceil(totalScrollableWidth / totalClicks);
let currentScrollPosition = 0;

function updateScrollIncrement() {
	totalScrollableWidth = slider.scrollWidth - contentRow.offsetWidth;
	totalClicks = window.innerWidth < 768 ? 6 : 3; // Update total clicks dynamically
	scrollIncrement = Math.ceil(totalScrollableWidth / totalClicks);
	currentScrollPosition = Math.min(currentScrollPosition, totalScrollableWidth);
	slider.scrollLeft = currentScrollPosition;
}
nextBtn.addEventListener("click", () => {
	currentScrollPosition += scrollIncrement;
	if (currentScrollPosition >= totalScrollableWidth) {
		currentScrollPosition = totalScrollableWidth;
		nextBtn.setAttribute("disabled", true);
	}
	slider.scrollLeft = currentScrollPosition;
	prevBtn.removeAttribute("disabled");
});
prevBtn.addEventListener("click", () => {
	currentScrollPosition -= scrollIncrement;
	if (currentScrollPosition <= 0) {
		currentScrollPosition = 0;
		prevBtn.setAttribute("disabled", true);
	}
	slider.scrollLeft = currentScrollPosition;
	nextBtn.removeAttribute("disabled");
});

window.addEventListener("resize", updateScrollIncrement);
updateScrollIncrement();

/**
 * TODO: Timer
 */
const days = document.querySelector(".days h2");
const hours = document.querySelector(".hours h2");
const minutes = document.querySelector(".minutes h2");
const seconds = document.querySelector(".seconds h2");

const targetDate = new Date(2025, 0, 1, 0, 0, 0);

const countdown = setInterval(() => {
	const now = new Date();
	const distance = targetDate - now;

	const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hoursLeft = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

	if (distance < 0) {
		clearInterval(countdown);
		console.log("Happy New Year!");
		return;
	}
	days.textContent = daysLeft;
	hours.textContent = hoursLeft;
	minutes.textContent = minutesLeft;
	seconds.textContent = secondsLeft;
}, 1000);

