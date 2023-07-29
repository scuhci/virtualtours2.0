
import { SceneComponent } from '@mp/common';
import { Dict } from '@mp/core';
interface Inputs {
    size: number,
    width: number,
    height: number,
    depth: number,
    color: THREE.Color,
}
class GeoFactory extends SceneComponent {
    private mesh: any = null;
    inputs: Inputs = {
        size: 1.0,
        width: 1.0,
        height: 1.0,
        depth: 1.0,
        color: null,
    }
    events = {
        "INTERACTION.CLICK": true,
        "INTERACTION.HOVER": true,
        "INTERACTION.POINTER_MOVE": true,
    }

    constructor(private sdk: any) {
        super();
        console.log(sdk);
    }
    onInit() {
        let THREE = this.context.three;
        let geometry = new THREE.BoxGeometry(this.inputs.size * this.inputs.width, this.inputs.size * this.inputs.height, this.inputs.size * this.inputs.depth);
        let material = new THREE.MeshBasicMaterial({ color: this.inputs.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.outputs.objectRoot = this.mesh;
        this.outputs.collider = this.mesh;
        console.log(this.sdk);
    }
    onEvent = function (eventType: string, eventData: Dict) {
        if (eventType === "INTERACTION.HOVER") {
            this.notify("INTERACTION.HOVER", {
                type: eventType,
                node: this.context.root,
                component: this,
            });
            console.log("Hover");
        }
        if (eventType === "INTERACTION.POINTER_MOVE") {
            this.notify("INTERACTION.POINTER_MOVE", {
                type: eventType,
                node: this.context.root,
                component: this,
            });
            console.log("Pointer move");
        }
        if (eventType === "INTERACTION.CLICK") {
            this.notify("INTERACTION.CLICK", {
                type: eventType,
                node: this.context.root,
                component: this,
            });
            console.log("Click");
        }
        console.log("******************");
    }
    onTick = function () {
        this.mesh.rotation.x -= 0.01;
        this.mesh.rotation.y -= 0.01;
        this.mesh.rotation.z -= 0.01;
    }
}
export const geoFactoryType = 'vt.geofactory';
export const createGeoFactoryClosure = function (sdk: any) {
    return function () {
        return new GeoFactory(sdk);
    }
}