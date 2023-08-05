
import { SceneComponent } from '@mp/common';
import { Dict } from '@mp/core';
import { setMessage, clearMessage } from '../util/msgUtil';
interface Inputs {
    size: number,
    radius: number,
    color: THREE.Color,
    name: string
}
class NavPathComponents extends SceneComponent {
    private mesh: any = null;
    inputs: Inputs = {
        size: 1.0,
        radius: 0.5,
        color: null,
        name: ''
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
        let geometry = new THREE.SphereGeometry(this.inputs.size * this.inputs.radius, 64, 64);
        let material = new THREE.MeshBasicMaterial({ color: this.inputs.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.outputs.objectRoot = this.mesh;
        this.outputs.collider = this.mesh;
        console.log(this.sdk);
    }
    onEvent = function (eventType: string, eventData: Dict) {
        if (eventType === "INTERACTION.CLICK") {
            setMessage(this.inputs.name);
            setTimeout(() => {
                clearMessage()
            }, 5000);
            this.notify("INTERACTION.CLICK", {
                type: eventType,
                node: this.context.root,
                component: this,
            });
            console.log("Click");
        }
        console.log("******************");
    }
}
export const navPathType = 'vt.navpath';
export const createNavPathClosure = function (sdk: any) {
    return function () {
        return new NavPathComponents(sdk);
    }
}