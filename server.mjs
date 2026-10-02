import http from 'node:http';
import {createReadStream} from 'node:fs';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('public');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf','.mp4':'video/mp4'};
http.createServer(async(req,res)=>{
  try {
    let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(p.endsWith('/'))p+='index.html';
    const file=path.resolve(root,'.'+p);
    if(!file.startsWith(root+path.sep))throw Error();
    const {size}=await stat(file);
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
    let start=0,end=size-1,status=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match || (!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}
      start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
      end=match[1]&&match[2]?Math.min(size-1,Number(match[2])):size-1;
      if(start>end || start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${size}`;
    }
    headers['Content-Length']=Math.max(0,end-start+1);
    res.writeHead(status,headers);
    if(req.method==='HEAD'||!size)return res.end();
    const stream=createReadStream(file,{start,end});
    stream.on('error',()=>res.destroy());
    res.on('close',()=>stream.destroy());
    stream.pipe(res);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Tangkas preview: http://127.0.0.1:4173'));
