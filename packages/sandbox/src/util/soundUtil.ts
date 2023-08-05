export const setSound = function (message: string) {
	let audios = <HTMLCollectionOf<HTMLAudioElement>>(
		document.getElementsByTagName("audio")
	);
	if (message === "Film Classroom") {
		const button = <HTMLButtonElement>(
			document.querySelector("#Film_Classroom_Button")
		);
		for (let a of audios) {
			if (a.id === "Film_Classroom") {
				a.volume = 0.1;
				a.play();
			}
		}
		button.classList.remove("hidden");
		button.classList.add("hidden");
		let text = button.childNodes[0];
		button.addEventListener("click", (e) => {
			for (let a of audios) {
				if (a.id === "Film_Classroom") {
					if (a.paused) {
						a.volume = 0.1;
						a.play();
						button.innerHTML = "Pause";
						console.log(text);
					} else {
						a.pause();
						button.innerHTML = "Play";
					}
				}
			}
		});
	} else if (message === "Audio Video Control Room") {
		const button = <HTMLButtonElement>(
			document.querySelector("#Audio_Video_Control_Room")
		);
		for (let a of audios) {
			if (a.id === "Audio_Video_Control_Room") {
				a.volume = 0.1;
				a.play();
			}
		}
		button.classList.remove("hidden");
		button.classList.add("hidden");
		let text = button.childNodes[0];
		button.addEventListener("click", (e) => {
			for (let a of audios) {
				if (a.id === "Audio_Video_Control_Room") {
					if (a.paused) {
						a.volume = 0.1;
						a.play();
						button.innerHTML = "Pause";
						console.log(text);
					} else {
						a.pause();
						button.innerHTML = "Play";
					}
				}
			}
		});
	}
};
export const clearSound = function () {
	const audios = <HTMLCollectionOf<HTMLAudioElement>>(
		document.getElementsByTagName("audio")
	);
	for (const a of audios) {
		a.pause();
	}
	const buttons = <HTMLCollectionOf<HTMLButtonElement>>(
		document.getElementsByTagName("button")
	);
	for (const a of buttons) {
		a.classList.remove("hidden");
		a.classList.add("hidden");
	}
};
