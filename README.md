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
Open browser or send GET request on `http://localhost:3001` and define query `file={ABSOLUTE_FILE_PATH}`. You can define the file name too, just set query with `name={FILENAME}`

Example:
```
GET    http://localhost:3001?file=C:\path\large-file.zip

GET    http://localhost:3001?file=C:\path\large-file.zip&name=another-name.zip

PUT    http://localhost:3001?ext=.zip&temp=true // TEMP remove file on final
```