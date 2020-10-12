# JTL

> JSON Templating Language

Visit the documenation at [jtl.alexlockhart.me](https://jtl.alexlockhart.me) or visit us on [NPM](https://www.npmjs.com/package/@megazear7/jtl).

JTL allows you to convert properly formatted json into html. What you do with that html is up to you.

## Usage

JTL is provided in esm, umd, and cjs formats all with minified versions. The below example uses the esm format.

```
npm install @megazear7/jtl
```

```
import { jtl } from '@megazear7/jtl';

const json = {
    name: "html",
    attr: {
        "lang": "en"
    },
    children: [
        { name: "head" },
        {
            name: "body",
            children: [
                { name: "h1", content: "Hello, World!" }
            ]
        }
    ]
}

const html = jtl(json).toHtmlString();
```

This will output the following html:

```html
<html lang="en">
   <head></head>
   <body>
      <h1>Hello, World!</h1>
   </body>
</html>
```

### Features that needed added

1. Event listeners

## Contribute

### Test

```
npm run test
```

### Build

```
npm run build
```