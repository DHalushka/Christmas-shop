/**
 * TODO: Category switching
 */

const categoryButtons = {
	All: document.getElementById("all"),
	Work: document.getElementById("work"),
	Health: document.getElementById("health"),
	Harmony: document.getElementById("harmony"),
};

function switchCategory(category, cards) {
	cardsContainer.innerHTML = "";
	(category === "All"
		? cards
		: cards.filter((card) => card.category === category)
	).forEach(renderGiftCard);
}

function selectCategoryTab(selectedTab) {
	Object.values(categoryButtons).forEach(
		(tab) => (tab.className = "tab action-small")
	);
	selectedTab.className += " selected";
}
/**
 * TODO: Get cards and render them
 */
const cardsContainer = document.querySelector(".cards-container");
async function loadGiftData() {
	const res = await fetch("gifts.json");
	const data = await res.json();
	const isGiftsPage = document.title.includes("Gifts");
	const randomGifts = data.sort(() => Math.random() - 0.5);
	const initialCards = isGiftsPage ? randomGifts : randomGifts.slice(0, 4);
	initialCards.forEach(renderGiftCard);

	Object.entries(categoryButtons).forEach(([category, button]) => {
		button.addEventListener("click", () => {
			switchCategory(
				category === "All" ? "All" : `For ${category}`,
				initialCards
			);
			selectCategoryTab(button);
		});
	});
}
loadGiftData();

function renderGiftCard(gift) {
	const { name, description, category, superpowers } = gift;
	const categoryClass = gift.category.toLowerCase().replace("for ", "");
	const cardImage = getCategoryImage(category);
	// Create card elements
	const cardDiv = createElement("div", ["card"]);
	const cardImageDiv = createElement("div", ["card-image"]);
	const cardContentDiv = createElement("div", ["card-content"]);
	const cardImgTag = createElement("img", [], {
		src: cardImage,
		alt: `gift-for-${categoryClass}`,
	});
	const cardCategoryTag = createElement(
		"h4",
		[("card-category", categoryClass)],
		{},
		category
	);
	const cardNameTag = createElement("h3", ["card-name"], {}, name);

	// Append elements
	cardImageDiv.appendChild(cardImgTag);
	cardContentDiv.append(cardCategoryTag, cardNameTag);
	cardDiv.append(cardImageDiv, cardContentDiv);
	cardsContainer.appendChild(cardDiv);

	// Add event listener for cards
	cardDiv.addEventListener("click", () => showGiftModal(gift, cardImage));
}
// Determine the image path based on the gift category
function getCategoryImage(category) {
	switch (category.toUpperCase()) {
		case "FOR WORK":
			return "assets/gift-for-work.png";
		case "FOR HEALTH":
			return "assets/gift-for-health.png";
		default:
			return "assets/gift-for-harmony.png";
	}
}
/**
 * TODO: Modal gift window open and closing
 */

const modalWrapper = document.querySelector(".modal-wrapper");
const modalImage = document.querySelector(".modal-image");
const modalCategory = document.querySelector(".modal-category");
const modalName = document.querySelector(".modal-name");
const modalDescription = document.querySelector(".modal-description");
const modalClose = document.querySelector(".modal-close");
const skillsDivs = document.getElementsByClassName("skill-value");
const ratingDivs = document.getElementsByClassName("skill-rating");
const redSnowflakeSvg = `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1959 9.88162L10.6482 9.56542L12.1158 9.17219L11.8732 8.26704L9.50055 8.90278L8.38146 8.25667C8.39689 8.17336 8.40538 8.08765 8.40538 7.99997C8.40538 7.91229 8.39692 7.82655 8.38146 7.74327L9.50055 7.09716L11.8732 7.7329L12.1158 6.82775L10.6482 6.43452L11.1959 6.11831L13.546 5.97725L13.8921 4.02063L12.0246 3.34203L10.7274 5.30677L10.1797 5.62297L10.5729 4.15545L9.66778 3.91293L9.03204 6.28561L7.91226 6.93211C7.78247 6.82103 7.63242 6.73313 7.4683 6.67494V5.3828L9.20521 3.64586L8.5426 2.98325L7.46827 4.05755V3.42515L8.51792 1.32584L6.99976 0L5.48157 1.3259L6.53122 3.42521V4.05761L5.45689 2.98332L4.79429 3.64592L6.53119 5.38286V6.675C6.36708 6.73319 6.21702 6.82109 6.08724 6.93217L4.96746 6.28568L4.33171 3.91299L3.42656 4.15551L3.81979 5.62304L3.27213 5.30684L1.9749 3.34209L0.107422 4.02069L0.453485 5.97731L2.80362 6.11838L3.35128 6.43458L1.88375 6.82781L2.1263 7.73296L4.49898 7.09722L5.61807 7.74333C5.60264 7.82664 5.59414 7.91235 5.59414 8.00003C5.59414 8.08771 5.60261 8.17345 5.61807 8.25673L4.49898 8.90285L2.1263 8.2671L1.88375 9.17226L3.35128 9.56548L2.80362 9.88169L0.453485 10.0227L0.107422 11.9793L1.97493 12.6579L3.27216 10.6932L3.81985 10.377L3.42662 11.8445L4.33177 12.087L4.96752 9.71435L6.0873 9.06786C6.21708 9.17894 6.36714 9.26684 6.53125 9.32503V10.6172L4.79435 12.3541L5.45696 13.0167L6.53129 11.9424V12.5748L5.48163 14.6741L6.99983 16L8.51802 14.6741L7.46837 12.5748V11.9424L8.5427 13.0167L9.2053 12.3541L7.4684 10.6172V9.32503C7.63251 9.26684 7.78257 9.17894 7.91235 9.06786L9.03213 9.71435L9.66788 12.087L10.573 11.8445L10.1798 10.377L10.7275 10.6932L12.0247 12.6579L13.8922 11.9793L13.5462 10.0227L11.1959 9.88162Z" fill="#FF4646"/>
</svg>`;
const whiteSnowflakeSvg = `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1959 9.88162L10.6482 9.56542L12.1158 9.17219L11.8732 8.26704L9.50055 8.90278L8.38146 8.25667C8.39689 8.17336 8.40538 8.08765 8.40538 7.99997C8.40538 7.91229 8.39692 7.82655 8.38146 7.74327L9.50055 7.09716L11.8732 7.7329L12.1158 6.82775L10.6482 6.43452L11.1959 6.11831L13.546 5.97725L13.8921 4.02063L12.0246 3.34203L10.7274 5.30677L10.1797 5.62297L10.5729 4.15545L9.66778 3.91293L9.03204 6.28561L7.91226 6.93211C7.78247 6.82103 7.63242 6.73313 7.4683 6.67494V5.3828L9.20521 3.64586L8.5426 2.98325L7.46827 4.05755V3.42515L8.51792 1.32584L6.99976 0L5.48157 1.3259L6.53122 3.42521V4.05761L5.45689 2.98332L4.79429 3.64592L6.53119 5.38286V6.675C6.36708 6.73319 6.21702 6.82109 6.08724 6.93217L4.96746 6.28568L4.33171 3.91299L3.42656 4.15551L3.81979 5.62304L3.27213 5.30684L1.9749 3.34209L0.107422 4.02069L0.453485 5.97731L2.80362 6.11838L3.35128 6.43458L1.88375 6.82781L2.1263 7.73296L4.49898 7.09722L5.61807 7.74333C5.60264 7.82664 5.59414 7.91235 5.59414 8.00003C5.59414 8.08771 5.60261 8.17345 5.61807 8.25673L4.49898 8.90285L2.1263 8.2671L1.88375 9.17226L3.35128 9.56548L2.80362 9.88169L0.453485 10.0227L0.107422 11.9793L1.97493 12.6579L3.27216 10.6932L3.81985 10.377L3.42662 11.8445L4.33177 12.087L4.96752 9.71435L6.0873 9.06786C6.21708 9.17894 6.36714 9.26684 6.53125 9.32503V10.6172L4.79435 12.3541L5.45696 13.0167L6.53129 11.9424V12.5748L5.48163 14.6741L6.99983 16L8.51802 14.6741L7.46837 12.5748V11.9424L8.5427 13.0167L9.2053 12.3541L7.4684 10.6172V9.32503C7.63251 9.26684 7.78257 9.17894 7.91235 9.06786L9.03213 9.71435L9.66788 12.087L10.573 11.8445L10.1798 10.377L10.7275 10.6932L12.0247 12.6579L13.8922 11.9793L13.5462 10.0227L11.1959 9.88162Z" fill="rgba(255, 70, 70, 0.1)"/>
</svg>`;

modalClose.addEventListener("click", closeModal);
document.addEventListener("click", (event) => {
	if (event.target === modalWrapper) {
		closeModal();
	}
});
function closeModal() {
	modalWrapper.style.display = "none";
	document.body.classList.remove("no-scroll");
}
function showGiftModal(gift, cardImage) {
	document.body.classList.add("no-scroll");
	modalWrapper.style.display = "flex";
	modalImage.style.backgroundImage = `url(${cardImage})`;
	modalCategory.textContent = gift.category;
	modalCategory.className = `modal-category ${gift.category
		.toLowerCase()
		.replace("for ", "")}`;
	modalName.textContent = name;
	modalName.textContent = gift.name;
	modalDescription.textContent = gift.description;

	updateSkills(gift.superpowers);
}
function updateSkills(superpowers) {
	Array.from(skillsDivs).forEach((skillDiv, i) => {
		skillDiv.textContent = Object.values(superpowers)[i];
	});

	Array.from(ratingDivs).forEach((ratingDiv, j) => {
		const skillValue = parseFloat(Object.values(superpowers)[j]) / 100;
		const snowflakes = new Array(5)
			.fill(whiteSnowflakeSvg)
			.map((svg, index) => (index < skillValue ? redSnowflakeSvg : svg));
		ratingDiv.innerHTML = snowflakes.join("");
	});
}
// Helper function to create an HTML element with classes, attributes, and text content
function createElement(tag, classList = [], attributes = {}, textContent = "") {
	const element = document.createElement(tag);
	classList.forEach((cls) => element.classList.add(cls));
	Object.keys(attributes).forEach((attr) =>
		element.setAttribute(attr, attributes[attr])
	);
	if (textContent) element.textContent = textContent;
	return element;
}
