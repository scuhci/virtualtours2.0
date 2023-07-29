export const setMessage = function (message: string) {
	const element = document.getElementById("text");
	element.classList.remove("hidden");
	element.classList.add("visible");
	element.innerText = message;
};
export const clearMessage = function () {
	const element = document.getElementById("text");
	element.classList.remove("visible");
	element.classList.add("hidden");
};
