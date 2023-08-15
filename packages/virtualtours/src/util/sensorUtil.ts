import { setMessage, clearMessage } from "./msgUtil";
import { getSources } from "./assetUtil";
import { setSound, clearSound } from "./soundUtil";
export const enableSensors = async (sdk: any, spaceId: string) => {
	const sensor = await sdk.Sensor.createSensor(sdk.Sensor.SensorType.CAMERA);
	sensor.showDebug(true);
	sensor.readings.subscribe({
		onCollectionUpdated(sourceCollection: any) {
			const inRange: any[] = [];
			for (const [source, reading] of sourceCollection) {
				if (reading.inRange) {
					const search = inRange.find((element) => {
						return element === source.userData.id;
					});
					if (!search) {
						inRange.push(source.userData.id);
					}
				}
				console.log(
					`sensor id: ${source.userData.id} inRange:${reading.inRange} inView:${reading.inView}`
				);
			}
			if (inRange.length > 0) {
				setMessage(inRange.toString());
				setSound(inRange.toString());
			} else {
				clearMessage();
				clearSound();
			}
		},
	});
	const sourcePromises = [];
	const sourceDescs = getSources(spaceId);
	for (const desc of sourceDescs) {
		sourcePromises.push(sdk.Sensor.createSource(desc.type, desc.options));
	}
	const sources = await Promise.all(sourcePromises);
	sensor.addSource(...sources);
};
