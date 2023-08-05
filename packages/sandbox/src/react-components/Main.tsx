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



  async componentDidMount() {
    this.sdk = await GetSDK('sdk-iframe', this.sdkKey);
    await Promise.all([
      this.sdk.Scene.register(geoFactoryType, createGeoFactoryClosure(this.sdk)),
      this.sdk.Scene.register(navPathType, createNavPathClosure(this.sdk)),
      this.sdk.Scene.register(pathType, createPathClosure(this.sdk)),
      this.sdk.Scene.register(signType, createSignClosure(this.sdk)),
    ])
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
    const src = `./bundle/showcase.html?m=eE6srFdgFSR&applicationKey=prigk78dz4crrmb7p98czk0kc`;
    return (
      <div>
        <FrameView src={src}></FrameView>
      </div>
    );
  }
}
