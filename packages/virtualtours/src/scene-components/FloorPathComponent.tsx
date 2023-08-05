
import { SceneComponent } from '@mp/common';
interface Inputs {
    image: string,
    width: number,
    height: number,
    opacity: number,
    pRotationX: number,
    pRotationY: number,
    pRotationZ: number,
    mRotationX: number,
    mRotationY: number,
    mRotationZ: number,
    name: string
}
class FloorPathComponent extends SceneComponent {
    private mesh: any = null;
    inputs: Inputs = {
        image: "",
        width: 1.0,
        height: 1.0,
        opacity: 1.0,
        pRotationX: 0,
        pRotationY: 0,
        pRotationZ: 0,
        mRotationX: 0,
        mRotationY: 0,
        mRotationZ: 0,
        name: ""
    }

    constructor(private sdk: any) {
        super();
        console.log(sdk);
    }
    onInit() {
        const { image, width, height } = this.inputs;
        let THREE = this.context.three;
        let geometry = new THREE.PlaneGeometry(width, height);
        const texture = new THREE.TextureLoader().load(`/assets/images/tags/${image}`);
        let material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: this.inputs.opacity,
            depthTest: false,
            depthWrite: false,
            map: texture
        });
        // geometry.rotateY(pRotationY);
        // geometry.rotateZ(pRotationZ);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = this.inputs.mRotationX;
        this.mesh.rotation.z = this.inputs.mRotationZ;
        this.outputs.objectRoot = this.mesh;
        this.outputs.collider = this.mesh;
        console.log(this.sdk);
    }
    // onTick = function () {
    //     this.mesh.rotation.x -= 0.01;
    //     this.mesh.rotation.y -= 0.01;
    //     this.mesh.rotation.z -= 0.01;
    // }
    onEvent = function (eventType: string) {
        if (eventType === "INTERACTION.HOVER") {
            this.notify("INTERACTION.HOVER", {
                type: eventType,
                node: this.context.root,
                component: this,
            });
            console.log(this.inputs.name);
        }
    }
}
export const pathType = 'vt.path';
export const createPathClosure = function (sdk: any) {
    return function () {
        return new FloorPathComponent(sdk);
    }
}