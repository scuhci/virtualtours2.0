import { Component } from "react";
import { FrameView } from "./Frame";
import { GetSDK, sdkKey } from '@mp/common';
import React from "react";
import { createGeoFactoryClosure, geoFactoryType } from '../scene-components/GeoFactory';
import { createNavPathClosure, navPathType } from '../scene-components/NavPathComponents';
import { createSignClosure, signType } from "../scene-components/SignComponent";
import { createPathClosure, pathType } from "../scene-components/FloorPathComponent";
import { getModelSid } from '../util/assetUtil';
import { addMattertagNodes, disableBGSoundForVideoTag } from '../util/matterTagsUtil';
import { deserializeSceneObjects } from '../util/deserializeUtil';
import { enableSensors } from '../util/sensorUtil';
import { getCurrentPos } from '../util/sweepUtil';
interface Props { }
interface State { }


export class MainView extends Component<Props, State> {
  private sdk: any = null;
  private queryString: string = "";
  private sdkKey: string = sdkKey;
  private isMobile: boolean = false;
  private spaceId: string = "";
  state = {
    floorId: "0",
  }

  constructor(props: Props) {
    super(props);
    this.isMobile = window.matchMedia("(min-width: 768px)").matches;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
      this.spaceId = urlParams.get('id');
    } else {
      this.spaceId = 'vari';
    }
    if (!urlParams.has('m')) {
      urlParams.set('m', getModelSid(this.spaceId));
    }
    if (urlParams.has('applicationKey')) {
      this.sdkKey = urlParams.get('applicationKey');
    } else {
      urlParams.set('applicationKey', 'prigk78dz4crrmb7p98czk0kc');
    }
    this.queryString = urlParams.toString();
  }

  async componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.sdk = await GetSDK('sdk-iframe', this.sdkKey);
    console.log(this.isMobile);
    //Detect floor change
    this.sdk.Floor.current.subscribe((currentFloor: any) => {
      // Change to the current floor has occurred.
      if (currentFloor.sequence === -1) {
        console.log('Currently viewing all floors');
      } else if (currentFloor.sequence === undefined) {
        if (currentFloor.id === undefined) {
          console.log('Current viewing an unplaced unaligned sweep');
        } else {
          console.log('Currently transitioning between floors');
        }
      } else {
        this.setState({
          floorId: currentFloor.id.toString()
        })
        console.log('Currently on floor', currentFloor.id);
        console.log('Current floor\'s sequence index', currentFloor.sequence);
        console.log('Current floor\'s name', currentFloor.name)
      }
    });
    //Add Mattertags. 
    addMattertagNodes(this.sdk, this.spaceId);
    //Sets rooms that have sensors. 
    enableSensors(this.sdk, this.spaceId);

    //Register the customized scene-components
    await Promise.all([
      this.sdk.Scene.register(geoFactoryType, createGeoFactoryClosure(this.sdk)),
      this.sdk.Scene.register(navPathType, createNavPathClosure(this.sdk)),
      this.sdk.Scene.register(pathType, createPathClosure(this.sdk)),
      this.sdk.Scene.register(signType, createSignClosure(this.sdk)),
    ])
    //Create the 3D objects, add to scene. 
    // addSceneObject(this.sdk, 'mp.gltfLoader', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Parrot.glb', {
    //   x: 0.01,
    //   y: 0.01,
    //   z: 0.01,
    // }, { x: -32.678383074276525, y: 1.3582876760621081, z: -24.83219463891109 });
    // addSceneObject(this.sdk, 'mp.fbxLoader', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/fbx/stanford-bunny.fbx', {
    //   x: 0.00001,
    //   y: 0.00001,
    //   z: 0.00001,
    // }, { x: -32.678383074276525, y: 0.3582876760621081, z: -26.83219463891109 });
    // addSceneObject(this.sdk, 'mp.gltfLoader', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Stork.glb', {
    //   x: 0.01,
    //   y: 0.01,
    //   z: 0.01,
    // }, {
    //   x: 1.2523820905004721,
    //   y: 1.95019005476538944,
    //   z: 4.932051502749859,
    // });
    //Create the spinning knot at start. 
    // addGeoObject(this.sdk);


    //Turns off background noise when hovering over a tag with a video
    disableBGSoundForVideoTag(this.sdk);

    //Creates the current "You are here" sweep
    getCurrentPos(this.sdk);
    //Deserializes all scene objects (sweeps, main story path, etc)
    await deserializeSceneObjects(this.spaceId, this.sdk);
  }



  render() {
    const src = `./bundle/showcase.html?${this.queryString}`;
    return (
      <div>
        <audio id="Film_Classroom" loop src="https://cdn.videvo.net/videvo_files/audio/premium/audio0071/watermarked/CrowdTalking%201010_50_preview.mp3"></audio>
        <audio id="Audio_Video_Control_Room" loop src="https://freeplay-rebuild-cms-production.s3.amazonaws.com/a/cast_a_shadow_549f193eba.mp3"></audio>
        <div id="text" className="hidden"></div>
        <FrameView src={src}></FrameView>
      </div>
    );
  }
}
