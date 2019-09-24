import * as express from 'express';
import { createServer } from 'http';
import * as bodyParser from 'body-parser';
import { createCanvas } from 'canvas';
import * as fs from 'fs';

const app = express();
app.set('port', 1337);
app.use(express.static(`${__dirname}/../dist`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/change', req => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = req.body.color;
  console.log('color', req.body.color);
  ctx.fillRect(20, 30, 60, 40);
  const img = canvas.toDataURL().split(',')[1];
  const decode = new Buffer(img, 'base64');
  fs.writeFile('sample.png', decode, err => {
    console.log(err);
  });
  console.log(img);
});

const server = createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
