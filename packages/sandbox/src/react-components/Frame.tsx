import React, { Component } from 'react';
import { IDialogUser } from '../interfaces';
import styled from '@emotion/styled';

const styles = {
  root: {
    height: '1500px',
    width: '100%',
    alignItems: 'stretch',
    flexGrow: 1,
    marginLeft: '8px',
    marginRight: '8px',
  },
  frame: {
    height: '1500px',
    width: '100%',
  },
};

const FrameIframe = styled.iframe(styles.frame);
const RootDiv = styled.div(styles.root);

interface Props {
  src: string;
};

interface State {
  user: IDialogUser | null;
}

export class FrameView extends Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
  }

  public render() {
    const { user } = this.state;

    return (
      <RootDiv>
        { this.state.user && user.jsx()}
        <FrameIframe id='sdk-iframe' src={this.props.src + '&title=0&qs=1&hr=0&brand=0&help=0&play=1'}></FrameIframe>
      </RootDiv>
    );
  }
}
