import { Component } from "react";
import { FrameView } from "./Frame";
import { GetSDK, sdkKey } from '@mp/common';
import React from "react";
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

  async componentDidMount() {
    this.sdk = await GetSDK('sdk-iframe', this.sdkKey);
    console.log(this.sdk);
  }


  render() {
    const src = `./bundle/showcase.html?${this.queryString}&play=1&qs=1&log=0`;
    return (
      <div>
        <FrameView src={src}></FrameView>
      </div>
    );
  }
}
