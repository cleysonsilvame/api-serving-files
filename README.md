# api-serving-files

## Getting started

Install dependencies

```
npm install
```

Run server

```
npm run dev
```

### How to use
Open browser or send GET request on `http://localhost:3001` and set query `file={ABSOLUTE_FILE_PATH}`

Example:
```
GET    http://localhost:3001?file=C:\path\large-file.zip
```