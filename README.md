# @technician/interpret-yaml

[![npm version](https://img.shields.io/npm/v/@technician/interpret-yaml.svg)](https://www.npmjs.com/package/@technician/interpret-yaml) [![npm downloads](https://img.shields.io/npm/dt/@technician/interpret-yaml)](https://www.npmjs.com/package/@technician/interpret-yaml) [![npm license](https://img.shields.io/npm/l/@technician/interpret-yaml.svg)](https://www.npmjs.com/package/@technician/interpret-yaml)

[![dependencies](https://img.shields.io/david/carriejv/technician-interpret-yaml.svg)](https://david-dm.org/carriejv/technician-interpret-yaml) [![Build Status](https://github.com/carriejv/technician-interpret-yaml/workflows/ci-build/badge.svg?branch=master)](https://github.com/carriejv/technician-interpret-yaml/actions?query=workflow%3Aci-build) [![GitKraken](https://img.shields.io/badge/<3-GitKraken-green.svg)](https://www.gitkraken.com/invite/om4Du5zG)

This package provides extensions to the `Interpret` API of the [Technician](https://www.npmjs.com/package/technician) config manager aimed at supporting YAML files.

[![Technician](https://img.shields.io/npm/v/technician?label=technician)](https://www.npmjs.com/package/technician)

This package uses [js-yaml](https://www.npmjs.com/package/js-yaml) for YAML deserialization.

[![js-yaml](https://img.shields.io/npm/v/js-yaml?label=js-yaml)](https://www.npmjs.com/package/js-yaml) 

## Installation

`npm i @technician/interpret-yaml`

This package is compatible with Node 10 LTS and up.

## Usage Example

### Baisc usage
```ts
import { Technician, Interpret } from 'technician';
// Technician will automatically load the extensions in any file with the interpret-yaml package imported.
import '@technician/interpret-yaml';

const technician = new Technician(
    Interpret.string.asYAML(
        new ManualConfigSource({
            yaml: 'key: value',
            primitive: 10
        })
    )
);

await technician.read('yaml'); // {key: 'value'}
await technician.read('primitive'); // 10
```

### Loading key/value pairs from a YAML file

A single, top-level primitive is technically valid YAML. Therefore, you must assert that your YAML contains key: value pairs to `Uplevel` it.

Upleveling a YAML document that contains only unkeyed primitive(s) will throw errors.

```ts
import { Technician, Interpret, Uplevel } from 'technician';
import { FSConfigSource } from '@technician/source-fs';
import '@technician/interpret-yaml';

const technician = new Technician(
    Uplevel.only('config.yml').on(
        Interpret.buffer.asYAML(
            new FSConfigSource('/opt/myapp/config') // key: value
        ) as ConfigSource<{[key: string]: string | number> // or whichever primitive types are valid in your case
    )
);

await technician.read('key'); // value
```

An encoding type may be optionally specified as follows: `Interpret.buffer.asYAML(myConfigSource, 'ascii')`. Default is `utf-8`.

`asStringOrYAML` is also supported, which optionally parses only valid YAML but still returns invalid YAML as an unparsed string (similar to the behavior of Technician's `asStringOrJSON`).

## Contributions

Contributions and pull requests are always welcome. Please be sure your code passes all existing tests and linting.

Pull requests with full code coverage are strongly encouraged.

## License

[Apache-2.0](https://github.com/carriejv/technician/blob/master/LICENSE)