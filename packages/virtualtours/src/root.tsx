import React, { PureComponent } from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app";

class Root extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		);
	}
}

export default Root;
