import * as THREE from "three";

export const randomColor = (x: number, y: number, z: number) => {
	if (!x) {
		let r = Math.random();
		let g = Math.random();
		let b = Math.random();
		return new THREE.Color(r, g, b);
	} else {
		return new THREE.Color(x, y, z);
	}
};
