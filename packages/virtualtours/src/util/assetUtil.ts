import vari_sweeps from "../../assets/vari/sweeps.json";
import vari_signs from "../../assets/vari/signs.json";
import vari_sourceDescs from "../../assets/vari/sources.json";
import vari_sidestories from "../../assets/vari/sidestories.json";
import vari_mainstories from "../../assets/vari/mainstories.json";
import vari_hotspots from "../../assets/vari/hotspots.json";

import scdi_sweeps from "../../assets/scdi/sweeps.json";
import scdi_signs from "../../assets/scdi/signs.json";
import scdi_sourceDescs from "../../assets/scdi/sources.json";
import scdi_sidestories from "../../assets/scdi/sidestories.json";
import scdi_mainstories from "../../assets/scdi/mainstories.json";
import scdi_hotspots from "../../assets/scdi/hotspots.json";
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
	if (key === "vari") {
		return vari_hotspots;
	} else if (key === "scdi") {
		return scdi_hotspots;
	} else {
		return vari_hotspots;
	}
};
export const getSweeps = (key: string) => {
	if (key === "vari") {
		return vari_sweeps;
	} else if (key === "scdi") {
		return scdi_sweeps;
	} else {
		return vari_sweeps;
	}
};
export const getSigns = (key: string) => {
	if (key === "vari") {
		return vari_signs;
	} else if (key === "scdi") {
		return scdi_signs;
	} else {
		return vari_signs;
	}
};
export const getSources = (key: string) => {
	if (key === "vari") {
		return vari_sourceDescs;
	} else if (key === "scdi") {
		return scdi_sourceDescs;
	} else {
		return vari_sourceDescs;
	}
};
export const getSideStories = (key: string) => {
	if (key === "vari") {
		return vari_sidestories;
	} else if (key === "scdi") {
		return scdi_sidestories;
	} else {
		return vari_sidestories;
	}
};
export const getMainStories = (key: string) => {
	if (key === "vari") {
		return vari_mainstories;
	} else if (key === "scdi") {
		return scdi_mainstories;
	} else {
		return vari_mainstories;
	}
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
