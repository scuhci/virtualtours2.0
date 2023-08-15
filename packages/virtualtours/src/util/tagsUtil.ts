import icon1 from "/assets/images/tags/1Icon.png";
import icon2 from "/assets/images/tags/2Icon.png";
import icon3 from "/assets/images/tags/3Icon.png";
import icon4 from "/assets/images/tags/4Icon.png";
import icon5 from "/assets/images/tags/5Icon.png";
import icon6 from "/assets/images/tags/6Icon.png";
import icon7 from "/assets/images/tags/7Icon.png";
import icon8 from "/assets/images/tags/8Icon.png";
import about from "/assets/images/tags/About.png";
import blue from "/assets/images/tags/ImportantBlue.png";
import sculogo from "/assets/images/tags/SCULogo.png";
import audioicon from "/assets/images/tags/AudioIcon.png";
import info from "/assets/images/tags/Info.png";
import important from "/assets/images/tags/Important.png";

export const getVariImage = (label: String): any => {
	if (label === "(1/8) Meet your tour guide!") {
		return icon1;
	}
	if (label === "(2/8) What is Vari Hall?") {
		return icon2;
	}
	if (label === "(3/8) Why did Cyle major in Communications?") {
		return icon3;
	}
	if (label === "(4/8) Why did Cyle get an emphasis in film?") {
		return icon4;
	}
	if (label === "(5/8) Welcome to the TV Studio!") {
		return icon5;
	}
	if (label === "(6/8) Cyle's noteable classes") {
		return icon6;
	}
	if (label === "(7/8) Working on Film Projects") {
		return icon7;
	}
	if (label === "(8/8) Tour End") {
		return icon8;
	}
	if (label === "Main Story Thread (8 parts)") {
		return about;
	}
	if (label === "Fern's Labs" || label === "Editing with Music") {
		return audioicon;
	}
	if (
		label === "Edit Bays" ||
		label === "Dogs!" ||
		label === "Green Screen" ||
		label === "The Godfather"
	) {
		return info;
	}
	if (
		label === "More about Cyle" ||
		label === "Resources at Media Services" ||
		label === "Working at Media Services" ||
		label === "Social Life - Imaginarium" ||
		label === "Spring On-Site Shadowing Program" ||
		label === "Why did Cyle choose SCU?" ||
		label === "Getting Familiar with Film Equipment" ||
		label === "Video Editing" ||
		label === "Hungry Boys" ||
		label === "Cyle's Film Mentors" ||
		label === "Hello from Josef!" ||
		label === "YouTube Algorithm"
	) {
		return blue;
	}
	if (
		label === "More about SCU" ||
		label === "What are the Communication professors like?" ||
		label === "Game Studies Meetings" ||
		label === "TV Studio Hallway" ||
		label === "Meet Fern!" ||
		label === "Studio Set" ||
		label === "COMM 135 - Editing" ||
		label === "VARI HALL Classrooms" ||
		label === "Production Practice" ||
		label === "Lights control" ||
		label === "Casting Call Flyer" ||
		label === "Audio Video Control Room" ||
		label === "Film Labs"
	) {
		return sculogo;
	}
};

export const getSCDIImage = (label: String): any => {
	if (
		label === "SCDI Intro" ||
		label === "Meet Kimberly!" ||
		label === "FreshBytes"
	) {
		return important;
	}
	if (
		label === "SCDI -- Sobrato Campus for Discovery and Innovation" ||
		label === "The Sunstream Café" ||
		label === "Joseph & Chelsea Freeman Robotics Systems Lab" ||
		label === "DISC - Diversity and Inclusion Student Center"
	) {
		return sculogo;
	}
};
