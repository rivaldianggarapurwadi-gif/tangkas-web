import {cp,mkdir,readFile,stat} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
for(const file of ['index.html','models.html','company.html','support.html','business.html','stories.html','style-tile.html','styles.css','cinematic.css','intro.bundle.js','app.js','content.js','sequence.js','assets/x7-full.png','assets/tangkas-logo.png'])await stat('dist/'+file);
const manifest=JSON.parse(await readFile('public/assets/sequence.json','utf8'));
if(manifest.count)for(let i=0;i<manifest.count;i++)await stat('public/'+manifest.pattern.replace('{index}',String(i).padStart(4,'0')));
if(manifest.mobilePattern)for(let i=manifest.startFrame;i<manifest.count;i+=manifest.mobileStep)await stat('public/'+manifest.mobilePattern.replace('{index}',String(i).padStart(4,'0')));
console.log('Build and asset validation passed. Static output: dist/');
