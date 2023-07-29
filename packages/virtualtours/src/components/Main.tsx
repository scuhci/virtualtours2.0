import { Component } from "react";
import { FrameView } from "./Frame";
import { GetSDK, sdkKey } from '@mp/common';
import React from "react";
import { createGeoFactoryClosure, geoFactoryType } from '../scene-components/GeoFactory';
import { createNavPathClosure, navPathType } from '../scene-components/NavPathComponents';
import { randomColor } from '../util/colorUtil';
import sweeps from '../../assets/sweeps.json';
import sourceDescs from '../../assets/sources.json';
import { clearMessage, setMessage } from "../util/msgUtil";
interface Props { }
interface State { }
export const ModelSid = 'eE6srFdgFSR';


export class MainView extends Component<Props, State> {
  private sdk: any = null;
  private queryString: string = "";
  private sdkKey: string = sdkKey;

  constructor(props: Props) {
    super(props);
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

  private addBox = async () => {
    const initObj = {
      size: 0.5,
      color: {}
    }
    initObj.color = randomColor(252 / 255, 186 / 255, 3 / 255);
    var [sceneObject] = await this.sdk.Scene.createObjects(1);
    const node4 = sceneObject.addNode();
    node4.addComponent(geoFactoryType, initObj)
    node4.position.set(-32.678383074276525, 0.9582876760621081, -24.83219463891109);
    node4.start();
  }
  async componentDidMount() {
    this.sdk = await GetSDK('sdk-iframe', this.sdkKey);
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
        } else {
          clearMessage();
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
      this.sdk.Scene.register(navPathType, createNavPathClosure(this.sdk))
    ])
    this.addBox();
    const initObj = {
      size: 1.5,
      color: {},
      name: "You are here"
    }
    initObj.color = randomColor(1, 0, 0);
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
  }


  render() {
    const src = `./bundle/showcase.html?${this.queryString}&play=1&qs=1&log=0`;
    return (
      <div>
        <div id="text" className="hidden"></div>
        <FrameView src={src}></FrameView>
      </div>
    );
  }
}
