# typed-inline-svg

CLI tool to create `.d.ts` files for `.svg` files of your React project

Recommended if you have a transpiler that allow importing of .svg files, for example the Babel plugin `inline-react-svg`

Serves as an alternative to a generic `declare module "*.svg"` which will not catch at compile time the import of the wrong file path/name

## Install

```sh
npm i -D typed-inline-svg
```

## Usage

```sh
npx typed-inline-svg <svgsRoot>
```

## Example

If this is your project

```text
(your project root)
- src/
    | my-feature-one
      | ft-one.svg
    | my-feature-two
      | ft-two.svg
```

You can run `npx typed-inline-svg src` and expect

```text
(your project root)
- src/
    | my-feature-one
      | ft-one.svg
      | ft-one.svg.d.ts [created]
    | my-feature-two
      | ft-two.svg
      | ft-two.svg.d.ts [created]
```

The content of the definition files is

```ts
declare const svgFactory: React.SVGFactory;
export = svgFactory;
```

## CLI Options

```text
-s: silent mode - will omit logging unless there is a usage error
```

## Contributing

If you have a need not fulfilled by this tool and would like to contribute, for example, generating definitions files that are not for a React project or some other cli options, feel free to fork the repository and contribute

## Remarks

You can have commit the definitions at your source control but I'd recommend ignore all `*.svg.d.ts` and generate it at your npm `prepare` script

Inspired by [typed-css-modules](https://www.npmjs.com/package/typed-css-modules)

## License

This software is released under the MIT License, see LICENSE.txt
