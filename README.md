# SDK Examples

- [SDK Examples](#sdk-examples)
    - [Prerequisites](#prerequisites)
    - [Setup monorepo root](#setup-monorepo-root)
    - [Setup packages](#setup-packages)
    - [Run the virtualtours app](#run-the-virtualtours-app)
    - [Clean packages](#clean-packages)
    - [Make a prod build](#make-a-prod-build)
    - [Packages](#packages)
      - [virtualtours](#virtualtours)
      - [common](#common)
      - [core](#core)
      - [bundle](#bundle)
    - [License](#license)

### Prerequisites
Your development environment will need node.js and yarn installed.

See <https://nodejs.org/en/> and <https://classic.yarnpkg.com/en/docs/install> for installation instructions specific to your environment.

> To run these examples, you will need to generate a sandboxed sdk key for your Matterport account. See [Matterport Developer Tools Pricing and Availability](https://support.matterport.com/hc/en-us/articles/360057506813-Matterport-Developer-Tools-Pricing-and-Availability).

The password for the beta versions of bundle: gOJKDpxNiMCtdlnXs

### Setup monorepo root
Run these two commands when you first download the repo.
```shell
> yarn install
> yarn install-bundle
yarn run v1.22.4
$ yarn fetch-bundle && yarn expand-bundle
$ curl https://static.matterport.com/showcase-sdk/bundle/3.1.38.10-15-g5a5323ef0/showcase-bundle.zip -o bundle.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3108k  100 3108k    0     0  7599k      0 --:--:-- --:--:-- --:--:-- 7599k
$ yarn decompress bundle.zip --out-dir=packages/bundle
$ ...
```

### Setup packages
Call this to install or update the package dependencies. It also links local packages together.
```shell
> yarn bootstrap
yarn run v1.21.1
$ lerna bootstrap
lerna notice cli v3.3.2
lerna info Bootstrapping 4 packages
lerna info Installing external dependencies
lerna info Symlinking packages and binaries
lerna success Bootstrapped 4 packages
✨  Done in 20.58s.
```



### Run the virtualtours app
```shell
> yarn easter
yarn run v1.22.4
$ lerna run develop --scope=easter --stream
lerna notice cli v3.3.2
lerna info filter [ 'easter' ]
lerna info Executing command in 1 package: "yarn run develop"
virtualtours: $ webpack-dev-server
virtualtours: ℹ ｢wds｣: Project is running at http://localhost:8000/
virtualtours: ℹ ｢wds｣: webpack output is served from /
virtualtours: ℹ ｢wds｣: Content not from webpack is served from /Users/bguillermo/projects/virtualtours2.0/packages/virtualtours
```


### Clean packages
You will need to bootstrap after cleaning.
```shell
> yarn clean
yarn run v1.21.1
$ lerna clean --yes
lerna notice cli v3.3.2
lerna info clean removing /Users/bguillermo/projects/sdk_examples/packages/bundle/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples/packages/common/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples3/packages/core/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples3/packages/easter/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples2/packages/embed-examples/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples/packages/inspector/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples3/packages/rc-app/node_modules
lerna info clean removing /Users/bguillermo/projects/sdk_examples/packages/vs-app/node_modules
lerna success clean finished
✨  Done in 5.11s.
```

### Make a prod build
```shell
> yarn build-all-prod
$ webpack --mode=production
Hash: 95bb160f191dc13eb410
Version: webpack 4.18.1
Time: 1029ms
...
lerna success run Ran npm script 'build-prod' in 5 packages:
lerna success - easter
lerna success - embed-examples
lerna success - inspector
lerna success - rc-app
lerna success - vs-app
✨  Done in 53.27s.
```

### Packages
The repository is a [Lerna](https://lerna.js.org/) monorepo. This means that the package.json dependencies at the root of the repository are shared with each of the individual packages. Please keep in mind that not all root-level dependencies are used by all examples. The packages include:


#### virtualtours
frameworks: [Reactjs](https://reactjs.org/) + [SDK Bundle](https://matterport.github.io/showcase-sdk/sdkbundle_home.html)
  - Vari Hall Cyle Tour.
  - Added features:
      - Important locations marked in birds-eye-view.
      - Sensors detect when user is inside an important room and shows the room's label. 
      - Ambient noise/music when user enters certain rooms.
      - Customized info tags. Disc switches depending on if user is on mobile device.
      - Enabled side story and main story path icons.
      - Enabled instructional signs guiding user on what icons mean. 

#### common
- reusable sdk bundle components

#### core
- matterport observable library

#### bundle
- showcase sdk bundle is created when running `yarn install-bundle` and used by the examples

### License
See the [MATTERPORT SAMPLE SDK CODE LICENSE AGREEMENT](LICENSE) file for license rights and limitations for this repository.
