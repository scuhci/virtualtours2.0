import { navPathType } from "../scene-components/NavPathComponents";
import { randomColor } from "./colorUtil";

export const getCurrentPos = async (sdk: any) => {
	const initObj = {
		size: 1.5,
		color: {},
		name: "You are here",
	};
	initObj.color = randomColor(1, 0, 0);
	var [sceneObject] = await sdk.Scene.createObjects(1);
	let currentNode = sceneObject.addNode();
	sdk.Sweep.current.subscribe(function (currentSweep: any) {
		if (currentSweep.sid === "") {
			console.log("Not currently stationed at a sweep position");
		} else {
			console.log("Currently at sweep", currentSweep.sid);
			console.log("Current position", currentSweep.position);
			console.log("On floor", currentSweep.floorInfo.sequence);
			currentNode.addComponent(navPathType, initObj);
			currentNode.position.set(
				currentSweep.position.x,
				currentSweep.position.y + 20,
				currentSweep.position.z
			);
			currentNode.start();
		}
	});
};
