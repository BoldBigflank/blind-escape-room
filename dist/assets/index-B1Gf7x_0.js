var $=Object.defineProperty;var q=(e,t,i)=>t in e?$(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var _=(e,t,i)=>q(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();/**
 * @preserve
 * Kontra.js v10.0.2
 */function K(e,t){let i=Math.sin(t),s=Math.cos(t);return{x:e.x*s-e.y*i,y:e.x*i+e.y*s}}function L(e,t,i){return Math.min(Math.max(e,i),t)}let v=()=>{};function z(e,t){let i=e.indexOf(t);if(i!=-1)return e.splice(i,1),!0}let E={};function R(e,t){E[e]=E[e]||[],E[e].push(t)}function X(e,...t){(E[e]||[]).map(i=>i(...t))}let f,M,G={get(e,t){return t=="_proxy"?!0:v}};function S(){return M}function U(e,{contextless:t=!1}={}){if(f=document.getElementById(e)||e||document.querySelector("canvas"),t&&(f=f||new Proxy({},G)),!f)throw Error("You must provide a canvas element for the game");return M=f.getContext("2d")||new Proxy({},G),M.imageSmoothingEnabled=!1,X("init"),{canvas:f,context:M}}class w{constructor(t=0,i=0,s={}){t.x!=null?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i),s._c&&(this.clamp(s._a,s._b,s._d,s._e),this.x=t,this.y=i)}set(t){this.x=t.x,this.y=t.y}add(t){return new w(this.x+t.x,this.y+t.y,this)}subtract(t){return new w(this.x-t.x,this.y-t.y,this)}scale(t){return new w(this.x*t,this.y*t)}normalize(t=this.length()||1){return new w(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}direction(){return Math.atan2(this.y,this.x)}clamp(t,i,s,n){this._c=!0,this._a=t,this._b=i,this._d=s,this._e=n}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?L(this._a,this._d,t):t}set y(t){this._y=this._c?L(this._b,this._e,t):t}}function I(){return new w(...arguments)}class j{constructor(t){return this.init(t)}init(t={}){this.position=I(),this.velocity=I(),this.acceleration=I(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let i=this.acceleration;t&&(i=i.scale(t)),this.velocity=this.velocity.add(i);let s=this.velocity;t&&(s=s.scale(t)),this.position=this.position.add(s),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}class V extends j{init({width:t=0,height:i=0,context:s=S(),render:n=this.draw,update:r=this.advance,children:o=[],anchor:a={x:0,y:0},opacity:c=1,rotation:d=0,drotation:h=0,ddrotation:l=0,scaleX:y=1,scaleY:g=1,...u}={}){this._c=[],super.init({width:t,height:i,context:s,anchor:a,opacity:c,rotation:d,drotation:h,ddrotation:l,scaleX:y,scaleY:g,...u}),this._di=!0,this._uw(),this.addChild(o),this._rf=n,this._uf=r,R("init",()=>{this.context??(this.context=S())})}update(t){this._uf(t),this.children.map(i=>i.update&&i.update(t))}render(){let t=this.context;t.save(),(this.x||this.y)&&t.translate(this.x,this.y),this.rotation&&t.rotate(this.rotation),(this.scaleX!=1||this.scaleY!=1)&&t.scale(this.scaleX,this.scaleY);let i=this.width,s=this.height;this.radius&&(i=s=this.radius*2);let n=-i*this.anchor.x,r=-s*this.anchor.y;(n||r)&&t.translate(n,r),this.context.globalAlpha=this.opacity,this._rf(),(n||r)&&t.translate(-n,-r),this.children.map(a=>a.render&&a.render()),t.restore()}draw(){}_pc(){this._uw(),this.children.map(t=>t._pc())}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:i=0,_wo:s=1,_wrot:n=0,_wsx:r=1,_wsy:o=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this.radius&&(this._wrx=this.radius,this._wry=this.radius),this._wo=s*this.opacity,this._wsx=r*this.scaleX,this._wsy=o*this.scaleY,this._wx=this._wx*r,this._wy=this._wy*o,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this.radius&&(this._wrx=this.radius*this._wsx,this._wry=this.radius*this._wsy),this._wrot=n+this.rotation;let{x:a,y:c}=K({x:this._wx,y:this._wy},n);this._wx=a,this._wy=c,this._wx+=t,this._wy+=i}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,radius:this.radius?{x:this._wrx,y:this._wry}:void 0,opacity:this._wo,rotation:this._wrot,scaleX:this._wsx,scaleY:this._wsy}}set children(t){this.removeChild(this._c),this.addChild(t)}get children(){return this._c}addChild(...t){t.flat().map(i=>{this.children.push(i),i.parent=this,i._pc=i._pc||v,i._pc()})}removeChild(...t){t.flat().map(i=>{z(this.children,i)&&(i.parent=null,i._pc())})}get radius(){return this._r}set radius(t){this._r=t,this._pc()}get opacity(){return this._opa}set opacity(t){this._opa=L(0,1,t),this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}advance(t){super.advance(t),this.drotation+=this.ddrotation,this.rotation+=this.drotation}setScale(t,i=t){this.scaleX=t,this.scaleY=i}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}class Z extends V{init({image:t,width:i=t?t.width:void 0,height:s=t?t.height:void 0,...n}={}){super.init({image:t,width:i,height:s,...n})}get animations(){return this._a}set animations(t){let i,s;this._a={};for(i in t)this._a[i]=t[i].clone(),s=s||this._a[i];this.currentAnimation=s,this.width=this.width||s.width,this.height=this.height||s.height}playAnimation(t){var i;(i=this.currentAnimation)==null||i.stop(),this.currentAnimation=this.animations[t],this.currentAnimation.start()}advance(t){var i;super.advance(t),(i=this.currentAnimation)==null||i.update(t)}draw(){if(this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color){if(this.context.fillStyle=this.color,this.radius){this.context.beginPath(),this.context.arc(this.radius,this.radius,this.radius,0,Math.PI*2),this.context.fill();return}this.context.fillRect(0,0,this.width,this.height)}}}function N(){return new Z(...arguments)}function J(e){let t=e.canvas;e.clearRect(0,0,t.width,t.height)}function Q({fps:e=60,clearCanvas:t=!0,update:i=v,render:s,context:n=S(),blur:r=!1}={}){if(!s)throw Error("You must provide a render() function");let o=0,a=1e3/e,c=1/e,d=t?J:v,h,l,y,g,u,b=!0;r||(window.addEventListener("focus",()=>{b=!0}),window.addEventListener("blur",()=>{b=!1})),R("init",()=>{u.context??(u.context=S())});function T(){if(l=requestAnimationFrame(T),!!b&&(y=performance.now(),g=y-h,h=y,!(g>1e3))){for(o+=g;o>=a;)X("tick"),u.update(c),o-=a;d(u.context),u.render()}}return u={update:i,render:s,isStopped:!0,context:n,start(){this.isStopped&&(h=performance.now(),this.isStopped=!1,requestAnimationFrame(T))},stop(){this.isStopped=!0,cancelAnimationFrame(l)},_frame:T,set _last(D){h=D}},u}let A=[],O={},P={},W={0:"south",1:"east",2:"west",3:"north",4:"leftshoulder",5:"rightshoulder",6:"lefttrigger",7:"righttrigger",8:"select",9:"start",10:"leftstick",11:"rightstick",12:"dpadup",13:"dpaddown",14:"dpadleft",15:"dpadright"};function tt(e){A[e.gamepad.index]={pressedButtons:{},axes:{}}}function it(e){delete A[e.gamepad.index]}function et(){A.map(e=>{e.pressedButtons={},e.axes={}})}function st(){let e=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads:[];for(let t=0;t<e.length;t++){let i=e[t];if(!i)continue;i.buttons.map((n,r)=>{let o=W[r],{pressed:a}=n,{pressedButtons:c}=A[i.index],d=c[o];!d&&a?[O[i.index],O].map(h=>{var l;(l=h==null?void 0:h[o])==null||l.call(h,i,n,o)}):d&&!a&&[P[i.index],P].map(h=>{var l;(l=h==null?void 0:h[o])==null||l.call(h,i,n,o)}),c[o]=a});let{axes:s}=A[i.index];s.leftstickx=i.axes[0],s.leftsticky=i.axes[1],s.rightstickx=i.axes[2],s.rightsticky=i.axes[3]}}function nt(){window.addEventListener("gamepadconnected",tt),window.addEventListener("gamepaddisconnected",it),window.addEventListener("blur",et),R("tick",st)}let F={},H={},Y={},x={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function B(e=v,t){e._pd&&t.preventDefault(),e(t)}function rt(e){let t=x[e.code],i=F[t];Y[t]=!0,B(i,e)}function ot(e){let t=x[e.code],i=H[t];Y[t]=!1,B(i,e)}function ht(){Y={}}function at(){let e;for(e=0;e<26;e++)x["Key"+String.fromCharCode(e+65)]=String.fromCharCode(e+97);for(e=0;e<10;e++)x["Digit"+e]=x["Numpad"+e]=""+e;window.addEventListener("keydown",rt),window.addEventListener("keyup",ot),window.addEventListener("blur",ht)}function p(e,t,{handler:i="keydown",preventDefault:s=!0}={}){let n=i=="keydown"?F:H;t._pd=s,[].concat(e).map(r=>n[r]=t)}const m=48,k=8,ct=()=>N({width:m,height:m,color:"blue",update(e){this.gameModel&&(this.color=this.gameModel.position===this.name?"blue":"white",this.advance(e))},render(){if(!(!this.gameModel||this.width===void 0||this.height===void 0)&&this.gameModel.visitedRooms.includes(this.name)&&(this.draw(),this.gameModel.position===this.name)){let e=this.width/2-4,t=this.height/2-4;this.gameModel.facing=="n"&&(t=0),this.gameModel.facing=="s"&&(t=this.height-8),this.gameModel.facing=="w"&&(e=0),this.gameModel.facing=="e"&&(e=this.width-8),this.context&&(this.context.save(),this.context.fillStyle="green",this.context.fillRect(e,t,8,8),this.context.restore())}},views:[]}),dt=e=>N({x:100,y:200,color:"red",width:128,height:128,anchor:{x:.5,y:.5},lookInput(t){e.lookAt(t)},interactInput(t){e.interact(t)},update(t){if(!this.initialized){const i=[],s=(n,r,o)=>{if(n&&!i.includes(n.name)){i.push(n.name);const a=ct();a.gameModel=e,a.name=n.name,a.x=r,a.y=o,this.addChild(a),n.views.forEach(c=>{if(c.connectsTo!==null){let d=r,h=o;c.direction==="n"&&(h-=m+k),c.direction==="s"&&(h+=m+k),c.direction==="w"&&(d-=m+k),c.direction==="e"&&(d+=m+k),s(e.roomByName(c.connectsTo),d,h)}})}};s(e.map.rooms[0],0,0),p(["w","arrowup"],()=>{this.lookInput("n")}),p(["a","arrowleft"],()=>{this.lookInput("w")}),p(["s","arrowdown"],()=>{this.lookInput("s")}),p(["d","arrowright"],()=>{this.lookInput("e")}),p(["esc"],()=>{this.lookInput("")}),p(["space","enter"],()=>{this.interactInput(0),console.log("space")}),p(["1"],()=>{this.interactInput(1)}),p(["2"],()=>{this.interactInput(2)}),p(["3"],()=>{this.interactInput(3)}),this.initialized=!0}this.advance(t)}}),lt={title:"test",rooms:[{name:"lobby",intro:"You have arrived.",description:"This is the lobby.",views:[{direction:"n",connectsTo:"kitchen",description:"A door to the kitchen."},{direction:"e",connectsTo:null,description:"A flower with a delightful scent on a table."},{direction:"s",connectsTo:null,description:"A locked door to the outside."},{direction:"w",connectsTo:null,description:"A mirror, which isn't too helpful."}]},{name:"kitchen",intro:"You walk into the kitchen",description:"This is the kitchen.",views:[{direction:"n",connectsTo:null,description:"Some pots and pans on a counter."},{direction:"e",connectsTo:null,description:"A gas stove."},{direction:"s",connectsTo:"lobby",description:"There is a door to the lobby."},{direction:"w",connectsTo:null,description:"A large sink."}]}]},C=e=>{var t=new SpeechSynthesisUtterance;t.text=e||"hello world",window.speechSynthesis.cancel(),window.speechSynthesis.speak(t)};class ut{constructor(){_(this,"map");_(this,"position");_(this,"facing");_(this,"visitedRooms");this.map=lt,this.facing="",this.visitedRooms=[],this.moveTo(this.map.rooms[0].name)}get currentRoom(){return this.map.rooms.find(t=>t.name===this.position)}get currentView(){var t;return(t=this.currentRoom)==null?void 0:t.views.find(i=>i.direction==this.facing)}roomByName(t){return this.map.rooms.find(i=>i.name===t)}moveTo(t){var i;this.position=t,this.facing="",this.visitedRooms.includes(this.position)?this.inspect():(C((i=this.currentRoom)==null?void 0:i.intro),this.visitedRooms.push(this.position))}lookAt(t){this.facing=t,this.inspect()}inspect(){var t,i;console.log("starting"),this.facing===""?C((t=this.currentRoom)==null?void 0:t.description):C((i=this.currentView)==null?void 0:i.description)}interact(t){var i;if(!this.currentView){this.inspect();return}switch(t){case 0:(i=this.currentView)!=null&&i.connectsTo&&this.moveTo(this.currentView.connectsTo);break}}}const pt=()=>{nt(),at();const e=new ut;U();const t=[];t.push(dt(e)),Q({update:function(){t.forEach(s=>s.update())},render:function(){t.forEach(s=>s.render())}}).start()};document.querySelector("#app").innerHTML=`
  <div>
    <div class="card">
      <canvas width=640 height=480></canvas>
    </div>
  </div>
`;pt();
