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
export const getHotspots = (key: string, floorId: string) => {
	let hotspots = require(`../../assets/${key}/${floorId}/hotspots.json`);
	return hotspots;
};
export const getSweeps = (key: string, floorId: string) => {
	let sweeps = require(`../../assets/${key}/${floorId}/sweeps.json`);
	return sweeps;
};
export const getSigns = (key: string, floorId: string) => {
	let signs = require(`../../assets/${key}/${floorId}/signs.json`);
	return signs;
};
export const getSources = (key: string, floorId: string) => {
	let sourceDescs = require(`../../assets/${key}/${floorId}/sources.json`);
	return sourceDescs;
};
export const getSideStories = (key: string, floorId: string) => {
	let sidestories = require(`../../assets/${key}/${floorId}/sidestories.json`);
	return sidestories;
};
export const getMainStories = (key: string, floorId: string) => {
	let mainstories = require(`../../assets/${key}/${floorId}/mainstories.json`);
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
