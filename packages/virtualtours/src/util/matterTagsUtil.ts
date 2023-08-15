import { getHotspots, getImage } from "./assetUtil";
import icon2 from "../../assets/images/tags/big1.jpg";
import { clearSound } from "./soundUtil";
export const addMattertagNodes = (sdk: any, spaceId: string) => {
	let matterTags: any = [];
	const hotspots = getHotspots(spaceId);
	hotspots.map((e: any) => {
		matterTags.push({
			tourId: e.tourId,
			label: e.title,
			description: e.description,
			anchorPosition: {
				x: e.positionX,
				y: e.positionY,
				z: e.positionZ,
			},
			stemVector: { x: e.stemVectorX, y: e.stemVectorY, z: e.stemVectorZ },
			mediaType: e.type,
			mediaSrc: e.url,
			media: {
				type: "mattertag.media." + e.type,
				src: e.url,
			},
		});
		return 0;
	});
	// @ts-ignore

	sdk.Mattertag.add(matterTags).then(function (mattertagIds) {
		console.log(mattertagIds);
		sdk.Mattertag.getData()
			.then(function (mattertags: any) {
				for (let i = 0; i < matterTags.length; i++) {
					window.matchMedia("(min-width: 768px)").matches
						? sdk.Asset.registerTexture(
								`${mattertags[i].sid}1`,
								getImage(matterTags[i].tourId, mattertags[i].label)
						  )
						: sdk.Mattertag.registerIcon(`${mattertags[i].sid}1`, icon2);
					sdk.Mattertag.editIcon(mattertags[i].sid, `${mattertags[i].sid}1`);
				}
			})
			.catch(function (error: any) {
				console.log(error);
			});
	});
};
export const disableBGSoundForVideoTag = (sdk: any) => {
	sdk.on(sdk.Mattertag.Event.HOVER, (selectionSID: string) => {
		sdk.Mattertag.getData()
			.then((mattertTags: any) => {
				for (let i = 0; i < mattertTags.length; i++) {
					if (
						selectionSID === mattertTags[i].sid &&
						mattertTags[i].mediaType === "mattertag.media.video"
					)
						clearSound();
				}
			})
			.catch(() => {});
	});
};
