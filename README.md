# JTL

> JSON to HTML Converter

## Use

JTL allows you to convert properly formatted json into html. What you do with that html is up to you.

```
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