import { getSCDIImage, getVariImage } from "./tagsUtil";

export const getModelSid = (key: string) => {
	if (key === "vari") {
		return "eE6srFdgFSR";
	} else if (key === "heafy") {
		return "y3JKgGFsRHT";
	} else if (key === "scdi") {
		return "LZdrLZWckqe";
	} else {
		return "eE6srFdgFSR";
	}
}; // Venus: This is Cyle's tour.
export const getHotspots = (key: string) => {
	let hotspots = require(`../../assets/${key}/hotspots.json`);
	return hotspots;
};
export const getSweeps = (key: string) => {
	let sweeps = require(`../../assets/${key}/sweeps.json`);
	return sweeps;
};
export const getSigns = (key: string) => {
	let signs = require(`../../assets/${key}/signs.json`);
	return signs;
};
export const getSources = (key: string) => {
	let sourceDescs = require(`../../assets/${key}/sources.json`);
	return sourceDescs;
};
export const getSideStories = (key: string) => {
	let sidestories = require(`../../assets/${key}/sidestories.json`);
	return sidestories;
};
export const getMainStories = (key: string) => {
	let mainstories = require(`../../assets/${key}/mainstories.json`);
	return mainstories;
};
export const getImage = (key: string, label: string) => {
	if (key === "vari") {
		return getVariImage(label);
	} else if (key === "scdi") {
		return getSCDIImage(label);
	} else {
		return getVariImage(label);
	}
};
