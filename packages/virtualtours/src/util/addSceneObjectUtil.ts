export const addSceneObject = async (
	sdk: any,
	type: string,
	url: string,
	scale: any,
	location: any
) => {
	const [sceneObject] = await sdk.Scene.createObjects(1);

	// add a scene node for the fbx model
	const gltfNode = sceneObject.addNode();

	// adjust the position of the scene node
	gltfNode.obj3D.position.set(location.x, location.y, location.z);

	// add the gltf loader component that loads a parrot model. Adjust the model's scale to make it fit inside the model.
	const gltfComponent = gltfNode.addComponent(type, {
		url: url,
		localScale: {
			x: scale.x,
			y: scale.y,
			z: scale.z,
		},
		color: {
			r: 1,
			g: 0,
			b: 0,
		},
	});

	// Add a path id 'gltfUrl' to the gltf component url property (not used in the this example).
	sceneObject.addInputPath(gltfComponent, "url", "gltfUrl");

	// add another scene node to contain the light objects.
	const lightsNode = sceneObject.addNode();

	// Add directional and ambient lights
	const directionalLightComponent = lightsNode.addComponent(
		"mp.directionalLight",
		{
			color: { r: 0.7, g: 0.7, b: 0.7 },
		}
	);
	lightsNode.addComponent("mp.ambientLight", {
		intensity: 0.5,
		color: { r: 1.0, g: 1.0, b: 1.0 },
	});

	// Add a path id 'ambientIntensity' to the intensity property of the directional light component.
	// The path will be used to set the value later.
	const ambientIntensityPath = sceneObject.addInputPath(
		directionalLightComponent,
		"intensity",
		"ambientIntensity"
	);

	// Start the scene object and its nodes.
	sceneObject.start();
	let intensity = 1;
	const intensityMax = 3;
	const intensityMin = 0.5;
	const intensityDelta = 0.02;
	let intensityDirection = 1;
	setInterval(() => {
		intensity += intensityDelta * intensityDirection;

		if (intensity >= intensityMax) {
			intensity = intensityMax;
			intensityDirection = intensityDirection * -1;
		} else if (intensity <= intensityMin) {
			intensity = intensityMin;
			intensityDirection = intensityDirection * -1;
		}

		// The path can be used as the public interface to the component behaviors contained within the scene object.
		ambientIntensityPath.set(intensity);
	}, 15);
	class ClickSpy {
		node = gltfNode;
		component = gltfComponent;
		eventType = "INTERACTION.CLICK";

		onEvent(payload: any) {
			console.log("received node4", payload, this);
			sdk.Sweep.moveTo("7896da97f7f84dcaa5e887adb955e045", {
				transition: sdk.Sweep.Transition.FLY,
				transitionTime: 2000,
			})
				.then(function (sweepId: any) {
					// Move successful.
					console.log("Arrived at sweep " + sweepId);
				})
				.catch(function (error: any) {
					// Error with moveTo command
				});
		}
	}
	if (
		url ===
		"https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Stork.glb"
	) {
		gltfComponent?.spyOnEvent(new ClickSpy());
	}
	const tick = function () {
		requestAnimationFrame(tick);
		gltfNode.obj3D.rotation.y += 0.02;
	};
	tick();
};
