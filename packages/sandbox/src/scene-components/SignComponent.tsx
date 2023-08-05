
import { SceneComponent } from '@mp/common';
interface Inputs {
    image: string,
    width: number,
    height: number,
    pRotationX: number,
    pRotationY: number,
    pRotationZ: number,
    mRotationX: number,
    mRotationY: number,
    mRotationZ: number
}
class SignComponent extends SceneComponent {
    private mesh: any = null;
    inputs: Inputs = {
        image: "",
        width: 1.0,
        height: 1.0,
        pRotationX: 0,
        pRotationY: 0,
        pRotationZ: 0,
        mRotationX: 0,
        mRotationY: 0,
        mRotationZ: 0,

    }

    constructor(private sdk: any) {
        super();
        console.log(sdk);
    }
    onInit() {
        const { image, width, height, pRotationY, pRotationZ, mRotationX, mRotationY } = this.inputs;
        let THREE = this.context.three;
        let geometry = new THREE.PlaneGeometry(width, height);
        const texture = new THREE.TextureLoader().load(`/assets/images/tags/${image}`);
        let material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 1,
            depthTest: false,
            depthWrite: false,
            map: texture
        });
        geometry.rotateY(pRotationY);
        geometry.rotateZ(pRotationZ);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = mRotationX;
        this.mesh.rotation.y = mRotationY;
        this.outputs.objectRoot = this.mesh;
        this.outputs.collider = this.mesh;
        console.log(this.sdk);
    }
    // onTick = function () {
    //     this.mesh.rotation.x -= 0.01;
    //     this.mesh.rotation.y -= 0.01;
    //     this.mesh.rotation.z -= 0.01;
    // }
}
export const signType = 'vt.sign';
export const createSignClosure = function (sdk: any) {
    return function () {
        return new SignComponent(sdk);
    }
}