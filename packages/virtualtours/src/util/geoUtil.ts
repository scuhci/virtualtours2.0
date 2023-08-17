import { randomColor } from "./colorUtil";
import { geoFactoryType } from "../scene-components/GeoFactory";
export const addGeoObject = async (sdk: any) => {
	const initObj = {
		type: "knot",
		radius: 0.1,
		tube: 0.01,
		size: 0.5,
		color: {},
	};
	initObj.color = randomColor(252 / 255, 186 / 255, 3 / 255);
	var [sceneObject] = await sdk.Scene.createObjects(1);
	const node4 = sceneObject.addNode();
	node4.addComponent(geoFactoryType, initObj);
	node4.position.set(
		-32.678383074276525,
		1.0582876760621081,
		-24.83219463891109
	);
	node4.start();
};
