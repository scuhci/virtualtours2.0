import { Component } from "react";
import { FrameView } from "./Frame";
import { GetSDK, sdkKey } from '@mp/common';
import React from "react";
import { createGeoFactoryClosure, geoFactoryType } from '../scene-components/GeoFactory';
import { createNavPathClosure, navPathType } from '../scene-components/NavPathComponents';
import { randomColor } from '../util/colorUtil';
import sweeps from '../../assets/sweeps.json';
import signs from '../../assets/signs.json';
import sourceDescs from '../../assets/sources.json';
import sidestories from '../../assets/sidestories.json';
import mainstories from '../../assets/mainstories.json';
import hotspots from '../../assets/hotspots.json';
import { clearMessage, setMessage } from "../util/msgUtil";
import { createSignClosure, signType } from "../scene-components/SignComponent";
import { createPathClosure, pathType } from "../scene-components/FloorPathComponent";
import { getImage } from "../util/tagsUtil";
import icon2 from '../../assets/images/tags/big1.jpg';
import { clearSound, setSound } from '../util/soundUtil';
interface Props { }
interface State { }
export const ModelSid = 'eE6srFdgFSR';


export class MainView extends Component<Props, State> {
  private sdk: any = null;
  private queryString: string = "";
  private sdkKey: string = sdkKey;
  private isMobile: boolean = false;

  constructor(props: Props) {
    super(props);
    this.isMobile = window.matchMedia("(min-width: 768px)").matches;
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('m')) {
      urlParams.set('m', ModelSid);
    }
    if (urlParams.has('applicationKey')) {
      this.sdkKey = urlParams.get('applicationKey');
    } else {
      urlParams.set('applicationKey', 'prigk78dz4crrmb7p98czk0kc');
    }
    this.queryString = urlParams.toString();
  }

  private addGeoObject = async () => {
    const initObj = {
      type: "knot",
      radius: 0.1,
      tube: 0.01,
      size: 0.5,
      color: {}
    }
    initObj.color = randomColor(252 / 255, 186 / 255, 3 / 255);
    var [sceneObject] = await this.sdk.Scene.createObjects(1);
    const node4 = sceneObject.addNode();
    node4.addComponent(geoFactoryType, initObj)
    node4.position.set(-32.678383074276525, 1.0582876760621081, -24.83219463891109);
    node4.start();
  }
  private addMattertagNode1 = (sdk: any) => {
    let matterTags: any = [];
    hotspots.map((e) => {
      matterTags.push({
        label: e.title,
        description: e.description,
        anchorPosition: {
          x: e.positionX,
          y: e.positionY,
          z: e.positionZ,
        },
        stemVector: { x: e.stemVectorX, y: e.stemVectorY, z: e.stemVectorZ },
        mediaType: e.type,
        mediaSrc: e.url,
        media: {
          type: "mattertag.media." + e.type,
          src: e.url,
        }
      });
      return 0;
    }
    );
    // @ts-ignore 

    sdk.Mattertag.add(matterTags).then(function (mattertagIds) {
      console.log(mattertagIds);
      sdk.Mattertag.getData()
        .then(function (mattertags: any) {
          for (let i = 0; i < matterTags.length; i++) {
            window.matchMedia("(min-width: 768px)").matches ? sdk.Asset.registerTexture(`${mattertags[i].sid}1`, getImage(mattertags[i].label)) : sdk.Mattertag.registerIcon(`${mattertags[i].sid}1`, icon2);
            sdk.Mattertag.editIcon(mattertags[i].sid, `${mattertags[i].sid}1`);
          }

        }).catch(function (error: any) {
          console.log(error)
        });
    })
  };
  private addSceneObject = async (sdk: any, type: string, url: string, scale: any, location: any) => {
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
        b: 0
      }
    });

    // Add a path id 'gltfUrl' to the gltf component url property (not used in the this example).
    sceneObject.addInputPath(gltfComponent, 'url', 'gltfUrl');

    // add another scene node to contain the light objects.
    const lightsNode = sceneObject.addNode();

    // Add directional and ambient lights
    const directionalLightComponet = lightsNode.addComponent('mp.directionalLight', {
      color: { r: 0.7, g: 0.7, b: 0.7 },
    });
    lightsNode.addComponent('mp.ambientLight', {
      intensity: 0.5,
      color: { r: 1.0, g: 1.0, b: 1.0 },
    });

    // Add a path id 'ambientIntensity' to the intensity property of the directional light component.
    // The path will be used to set the value later.
    const ambientIntensityPath = sceneObject.addInputPath(directionalLightComponet, 'intensity', 'ambientIntensity');

    // Start the scene object and its nodes.
    sceneObject.start();
    let intensity = 1;
    const intensityMax = 3;
    const intensityMin = 0.5;
    const intensityDelta = 0.02;
    let intensityDirection = 1;
    setInterval(() => {
      intensity += (intensityDelta * intensityDirection);

      if (intensity >= intensityMax) {
        intensity = intensityMax;
        intensityDirection = intensityDirection * -1;
      }
      else if (intensity <= intensityMin) {
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
            console.log('Arrived at sweep ' + sweepId);
          })
          .catch(function (error: any) {
            // Error with moveTo command
          });

      }
    }
    if (url === 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Stork.glb') {
      gltfComponent?.spyOnEvent(new ClickSpy());
    }
    const tick = function () {
      requestAnimationFrame(tick);
      gltfNode.obj3D.rotation.y += 0.02;
    }
    tick();

  }

  async componentDidMount() {
    this.sdk = await GetSDK('sdk-iframe', this.sdkKey);
    console.log(this.isMobile);
    this.addMattertagNode1(this.sdk);
    const sensor = await this.sdk.Sensor.createSensor(this.sdk.Sensor.SensorType.CAMERA);
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
          console.log(`sensor id: ${source.userData.id} inRange:${reading.inRange} inView:${reading.inView}`);
        }
        if (inRange.length > 0) {
          setMessage(inRange.toString());
          setSound(inRange.toString());
        } else {
          clearMessage();
          clearSound();
        }
      }
    });
    const sourcePromises = [];
    for (const desc of sourceDescs) {
      sourcePromises.push(this.sdk.Sensor.createSource(desc.type, desc.options));
    }
    const sources = await Promise.all(sourcePromises);
    sensor.addSource(...sources);

    await Promise.all([
      this.sdk.Scene.register(geoFactoryType, createGeoFactoryClosure(this.sdk)),
      this.sdk.Scene.register(navPathType, createNavPathClosure(this.sdk)),
      this.sdk.Scene.register(pathType, createPathClosure(this.sdk)),
      this.sdk.Scene.register(signType, createSignClosure(this.sdk)),
    ])
    this.addSceneObject(this.sdk, 'mp.gltfLoader', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Parrot.glb', {
      x: 0.01,
      y: 0.01,
      z: 0.01,
    }, { x: -32.678383074276525, y: 1.3582876760621081, z: -24.83219463891109 });
    this.addSceneObject(this.sdk, 'mp.fbxLoader', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/fbx/stanford-bunny.fbx', {
      x: 0.00001,
      y: 0.00001,
      z: 0.00001,
    }, { x: -32.678383074276525, y: 0.3582876760621081, z: -26.83219463891109 });
    this.addSceneObject(this.sdk, 'mp.gltfLoader', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Stork.glb', {
      x: 0.01,
      y: 0.01,
      z: 0.01,
    }, {
      x: 1.2523820905004721,
      y: 1.95019005476538944,
      z: 4.932051502749859,
    });
    this.addGeoObject();
    const initObj = {
      size: 1.5,
      color: {},
      name: "You are here"
    }
    initObj.color = randomColor(1, 0, 0);
    this.sdk.on(this.sdk.Mattertag.Event.HOVER, (selectionSID: string) => {
      this.sdk.Mattertag.getData()
        .then((mattertTags: any) => {
          for (let i = 0; i < mattertTags.length; i++) {
            if (selectionSID === mattertTags[i].sid && mattertTags[i].mediaType === 'mattertag.media.video')
              clearSound();
          }
        })
        .catch(() => {
        })
    })
    var [sceneObject] = await this.sdk.Scene.createObjects(1);
    let currentNode = sceneObject.addNode();
    this.sdk.Sweep.current.subscribe(function (currentSweep: any) {
      if (currentSweep.sid === '') {
        console.log('Not currently stationed at a sweep position');
      } else {
        console.log('Currently at sweep', currentSweep.sid);
        console.log('Current position', currentSweep.position);
        console.log('On floor', currentSweep.floorInfo.sequence);
        currentNode.addComponent(navPathType, initObj);
        currentNode.position.set(currentSweep.position.x, currentSweep.position.y + 20, currentSweep.position.z);
        currentNode.start();
      }
    });
    const sweep_nodes = await this.sdk.Scene.deserialize(JSON.stringify(sweeps));
    for (let i = 0; i < sweep_nodes.length; ++i) {
      sweep_nodes[i].start();
    }
    const sign_nodes = await this.sdk.Scene.deserialize(JSON.stringify(signs));
    for (let i = 0; i < sign_nodes.length; ++i) {
      sign_nodes[i].start();
    }
    const side_story_nodes = await this.sdk.Scene.deserialize(JSON.stringify(sidestories));
    for (let i = 0; i < side_story_nodes.length; ++i) {
      side_story_nodes[i].position.set(side_story_nodes[i].position.x, 0.0400285530090332, side_story_nodes[i].position.z);
      side_story_nodes[i].start();
    }
    const main_story_nodes = await this.sdk.Scene.deserialize(JSON.stringify(mainstories));
    for (let i = 0; i < main_story_nodes.length; ++i) {
      main_story_nodes[i].position.set(main_story_nodes[i].position.x, 0.0400285530090332, main_story_nodes[i].position.z);
      main_story_nodes[i].start();
    }
  }


  render() {
    const src = `./bundle/showcase.html?${this.queryString}&play=1&qs=1&log=0`;
    return (
      <div>
        <audio id="Film_Classroom" loop src="https://cdn.videvo.net/videvo_files/audio/premium/audio0071/watermarked/CrowdTalking%201010_50_preview.mp3"></audio>
        <audio id="Audio_Video_Control_Room" loop src="https://freeplay-rebuild-cms-production.s3.amazonaws.com/a/cast_a_shadow_549f193eba.mp3"></audio>
        <button id="Film_Classroom_Button" className="hidden btn btn-primary">
          Pause
        </button>
        <button id="Audio_Room_Button" className="hidden btn btn-primary">
          Pause
        </button>
        <div id="text" className="hidden"></div>
        <FrameView src={src}></FrameView>
      </div>
    );
  }
}
