export const setMessage = function (message: string) {
	const element = document.getElementById("text");
	element.classList.remove("hidden");
	element.classList.add("visible");
	element.innerText = message;
};
export const signInMessage = function (message: string) {
	const element = document.getElementById("signintext");
	element.classList.remove("hidden");
	element.classList.add("visible");
	element.innerText = message;
};
export const signOutMessage = function (message: string) {
	const element = document.getElementById("signintext");
	element.classList.remove("hidden");
	element.classList.add("visible");
	element.innerText = message;
};
export const clearMessage = function () {
	const element = document.getElementById("text");
	element.classList.remove("visible");
	element.classList.add("hidden");
};
export const clearSignInMessage = function () {
	const element = document.getElementById("signintext");
	element.classList.remove("visible");
	element.classList.add("hidden");
};
export const clearSignOutMessage = function () {
	const element = document.getElementById("signintext");
	element.classList.remove("visible");
	element.classList.add("hidden");
};
