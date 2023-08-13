export const setSound = function (message: string) {
	let audios = <HTMLCollectionOf<HTMLAudioElement>>(
		document.getElementsByTagName("audio")
	);
	if (message === "Film Classroom" || message === "Quick Byte") {
		for (let a of audios) {
			if (a.id === "Film_Classroom" || a.id === "Quick Byte") {
				a.volume = 0.1;
				a.play();
			}
		}
	} else if (message === "Audio Video Control Room") {
		for (let a of audios) {
			if (a.id === "Audio_Video_Control_Room") {
				a.volume = 0.1;
				a.play();
			}
		}
	}
};
export const clearSound = function () {
	const audios = <HTMLCollectionOf<HTMLAudioElement>>(
		document.getElementsByTagName("audio")
	);
	for (const a of audios) {
		a.pause();
	}
};
