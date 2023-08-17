import {
	getSweeps,
	getSigns,
	getSideStories,
	getMainStories,
} from "./assetUtil";
export const deserializeSceneObjects = async (spaceId: string, sdk: any) => {
	//Create all sweeps
	const sweeps = getSweeps(spaceId);
	const sweep_nodes = await sdk.Scene.deserialize(JSON.stringify(sweeps));
	for (let i = 0; i < sweep_nodes.length; ++i) {
		sweep_nodes[i].start();
	}
	//Create all signs
	const signs = getSigns(spaceId);
	const sign_nodes = await sdk.Scene.deserialize(JSON.stringify(signs));
	for (let i = 0; i < sign_nodes.length; ++i) {
		sign_nodes[i].start();
	}

	//Creates side story path rings
	const sidestories = getSideStories(spaceId);
	const side_story_nodes = await sdk.Scene.deserialize(
		JSON.stringify(sidestories)
	);
	for (let i = 0; i < side_story_nodes.length; ++i) {
		side_story_nodes[i].position.set(
			side_story_nodes[i].position.x,
			0.0400285530090332,
			side_story_nodes[i].position.z
		);
		side_story_nodes[i].start();
	}
	//Creates main story path rings and arrows
	const mainstories = getMainStories(spaceId);
	const main_story_nodes = await sdk.Scene.deserialize(
		JSON.stringify(mainstories)
	);
	for (let i = 0; i < main_story_nodes.length; ++i) {
		main_story_nodes[i].position.set(
			main_story_nodes[i].position.x,
			0.0400285530090332,
			main_story_nodes[i].position.z
		);
		main_story_nodes[i].start();
	}
};
