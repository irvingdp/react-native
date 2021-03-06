(function(global) {global.
__DEV__=true;

global.__BUNDLE_START_TIME__=Date.now();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {'use strict';










global.require=_require;
global.__d=define;

var modules=Object.create(null);
if(__DEV__){
var verboseNamesToModuleIds=Object.create(null);}


function define(moduleId,factory){
if(moduleId in modules){


return;}

modules[moduleId]={
factory:factory,
hasError:false,
isInitialized:false,
exports:undefined};

if(__DEV__){

modules[moduleId].hot=createHotReloadingObject();



var verboseName=modules[moduleId].verboseName=arguments[2];
verboseNamesToModuleIds[verboseName]=moduleId;}}



function _require(moduleId){
var module=__DEV__?
modules[moduleId]||modules[verboseNamesToModuleIds[moduleId]]:
modules[moduleId];
return module&&module.isInitialized?
module.exports:
guardedLoadModule(moduleId,module);}


var inGuard=false;
function guardedLoadModule(moduleId,module){
if(!inGuard&&global.ErrorUtils){
inGuard=true;
var returnValue=void 0;
try{
returnValue=loadModuleImplementation(moduleId,module);}
catch(e){
global.ErrorUtils.reportFatalError(e);}

inGuard=false;
return returnValue;}else 
{
return loadModuleImplementation(moduleId,module);}}



function loadModuleImplementation(moduleId,module){
var nativeRequire=global.nativeRequire;
if(!module&&nativeRequire){
nativeRequire(moduleId);
module=modules[moduleId];}


if(__DEV__&&!module){

module=modules[verboseNamesToModuleIds[moduleId]];
if(module){
console.warn(
'Requiring module \''+moduleId+'\' by name is only supported for '+
'debugging purposes and will break in production');}}




if(!module){
throw unknownModuleError(moduleId);}


if(module.hasError){
throw moduleThrewError(moduleId);}







if(__DEV__){var 
Systrace=_require.Systrace;}





module.isInitialized=true;
var exports=module.exports={};var _module=
module;var factory=_module.factory;
try{
if(__DEV__){
Systrace.beginEvent('JS_require_'+(module.verboseName||moduleId));}


var moduleObject={exports:exports};
if(__DEV__&&module.hot){
moduleObject.hot=module.hot;}




factory(global,_require,moduleObject,exports);


if(!__DEV__){
module.factory=undefined;}


if(__DEV__){
Systrace.endEvent();}

return module.exports=moduleObject.exports;}
catch(e){
module.hasError=true;
module.isInitialized=false;
module.exports=undefined;
throw e;}}



function unknownModuleError(id){
var message='Requiring unknown module "'+id+'".';
if(__DEV__){
message+=
'If you are sure the module is there, try restarting the packager or running "npm install".';}

return Error(message);}


function moduleThrewError(id){
return Error('Requiring module "'+id+'", which threw an exception.');}


if(__DEV__){var 



createHotReloadingObject;(function(){_require.Systrace={beginEvent:function beginEvent(){},endEvent:function endEvent(){}};createHotReloadingObject=function createHotReloadingObject(){
var hot={
acceptCallback:null,
accept:function accept(callback){hot.acceptCallback=callback;}};

return hot;};


var acceptAll=function acceptAll(dependentModules,inverseDependencies){
if(!dependentModules||dependentModules.length===0){
return true;}


var notAccepted=dependentModules.filter(
function(module){return !accept(module,undefined,inverseDependencies);});

var parents=[];
for(var i=0;i<notAccepted.length;i++){

if(inverseDependencies[notAccepted[i]].length===0){
return false;}


parents.pushAll(inverseDependencies[notAccepted[i]]);}


return acceptAll(parents,inverseDependencies);};


var accept=function accept(id,factory,inverseDependencies){
var mod=modules[id];

if(!mod){
define(id,factory);
return true;}var 


hot=mod.hot;
if(!hot){
console.warn(
'Cannot accept module because Hot Module Replacement '+
'API was not installed.');

return false;}



if(factory){
mod.factory=factory;}

mod.hasError=false;
mod.isInitialized=false;
_require(id);

if(hot.acceptCallback){
hot.acceptCallback();
return true;}else 
{

if(!inverseDependencies){
throw new Error('Undefined `inverseDependencies`');}



return acceptAll(inverseDependencies[id],inverseDependencies);}};



global.__accept=accept;})();}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {Object.

















assign=function(target,sources){
if(__DEV__){
if(target==null){
throw new TypeError('Object.assign target cannot be null or undefined');}

if(typeof target!=='object'&&typeof target!=='function'){
throw new TypeError(
'In this environment the target of assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}




for(var nextIndex=1;nextIndex<arguments.length;nextIndex++){
var nextSource=arguments[nextIndex];
if(nextSource==null){
continue;}


if(__DEV__){
if(typeof nextSource!=='object'&&
typeof nextSource!=='function'){
throw new TypeError(
'In this environment the sources for assign MUST be an object.'+
'This error is a performance optimization and not spec compliant.');}}








for(var key in nextSource){
if(__DEV__){
var hasOwnProperty=Object.prototype.hasOwnProperty;
if(!hasOwnProperty.call(nextSource,key)){
throw new TypeError(
'One of the sources for assign has an enumerable key on the '+
'prototype chain. This is an edge case that we do not support. '+
'This error is a performance optimization and not spec compliant.');}}



target[key]=nextSource[key];}}



return target;};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 

















inspect=function(){























function inspect(obj,opts){
var ctx={
seen:[],
stylize:stylizeNoColor};

return formatValue(ctx,obj,opts.depth);}


function stylizeNoColor(str,styleType){
return str;}


function arrayToHash(array){
var hash={};

array.forEach(function(val,idx){
hash[val]=true;});


return hash;}



function formatValue(ctx,value,recurseTimes){

var primitive=formatPrimitive(ctx,value);
if(primitive){
return primitive;}



var keys=Object.keys(value);
var visibleKeys=arrayToHash(keys);



if(isError(value)&&(
keys.indexOf('message')>=0||keys.indexOf('description')>=0)){
return formatError(value);}



if(keys.length===0){
if(isFunction(value)){
var name=value.name?': '+value.name:'';
return ctx.stylize('[Function'+name+']','special');}

if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}

if(isDate(value)){
return ctx.stylize(Date.prototype.toString.call(value),'date');}

if(isError(value)){
return formatError(value);}}



var base='',array=false,braces=['{','}'];


if(isArray(value)){
array=true;
braces=['[',']'];}



if(isFunction(value)){
var n=value.name?': '+value.name:'';
base=' [Function'+n+']';}



if(isRegExp(value)){
base=' '+RegExp.prototype.toString.call(value);}



if(isDate(value)){
base=' '+Date.prototype.toUTCString.call(value);}



if(isError(value)){
base=' '+formatError(value);}


if(keys.length===0&&(!array||value.length==0)){
return braces[0]+base+braces[1];}


if(recurseTimes<0){
if(isRegExp(value)){
return ctx.stylize(RegExp.prototype.toString.call(value),'regexp');}else 
{
return ctx.stylize('[Object]','special');}}



ctx.seen.push(value);

var output;
if(array){
output=formatArray(ctx,value,recurseTimes,visibleKeys,keys);}else 
{
output=keys.map(function(key){
return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array);});}



ctx.seen.pop();

return reduceToSingleString(output,base,braces);}



function formatPrimitive(ctx,value){
if(isUndefined(value))
return ctx.stylize('undefined','undefined');
if(isString(value)){
var simple='\''+JSON.stringify(value).replace(/^"|"$/g,'').
replace(/'/g,"\\'").
replace(/\\"/g,'"')+'\'';
return ctx.stylize(simple,'string');}

if(isNumber(value))
return ctx.stylize(''+value,'number');
if(isBoolean(value))
return ctx.stylize(''+value,'boolean');

if(isNull(value))
return ctx.stylize('null','null');}



function formatError(value){
return '['+Error.prototype.toString.call(value)+']';}



function formatArray(ctx,value,recurseTimes,visibleKeys,keys){
var output=[];
for(var i=0,l=value.length;i<l;++i){
if(hasOwnProperty(value,String(i))){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
String(i),true));}else 
{
output.push('');}}


keys.forEach(function(key){
if(!key.match(/^\d+$/)){
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
key,true));}});


return output;}



function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){
var name,str,desc;
desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]};
if(desc.get){
if(desc.set){
str=ctx.stylize('[Getter/Setter]','special');}else 
{
str=ctx.stylize('[Getter]','special');}}else 

{
if(desc.set){
str=ctx.stylize('[Setter]','special');}}


if(!hasOwnProperty(visibleKeys,key)){
name='['+key+']';}

if(!str){
if(ctx.seen.indexOf(desc.value)<0){
if(isNull(recurseTimes)){
str=formatValue(ctx,desc.value,null);}else 
{
str=formatValue(ctx,desc.value,recurseTimes-1);}

if(str.indexOf('\n')>-1){
if(array){
str=str.split('\n').map(function(line){
return '  '+line;}).
join('\n').substr(2);}else 
{
str='\n'+str.split('\n').map(function(line){
return '   '+line;}).
join('\n');}}}else 


{
str=ctx.stylize('[Circular]','special');}}


if(isUndefined(name)){
if(array&&key.match(/^\d+$/)){
return str;}

name=JSON.stringify(''+key);
if(name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){
name=name.substr(1,name.length-2);
name=ctx.stylize(name,'name');}else 
{
name=name.replace(/'/g,"\\'").
replace(/\\"/g,'"').
replace(/(^"|"$)/g,"'");
name=ctx.stylize(name,'string');}}



return name+': '+str;}



function reduceToSingleString(output,base,braces){
var numLinesEst=0;
var length=output.reduce(function(prev,cur){
numLinesEst++;
if(cur.indexOf('\n')>=0)numLinesEst++;
return prev+cur.replace(/\u001b\[\d\d?m/g,'').length+1;},
0);

if(length>60){
return braces[0]+(
base===''?'':base+'\n ')+
' '+
output.join(',\n  ')+
' '+
braces[1];}


return braces[0]+base+' '+output.join(', ')+' '+braces[1];}





function isArray(ar){
return Array.isArray(ar);}


function isBoolean(arg){
return typeof arg==='boolean';}


function isNull(arg){
return arg===null;}


function isNullOrUndefined(arg){
return arg==null;}


function isNumber(arg){
return typeof arg==='number';}


function isString(arg){
return typeof arg==='string';}


function isSymbol(arg){
return typeof arg==='symbol';}


function isUndefined(arg){
return arg===void 0;}


function isRegExp(re){
return isObject(re)&&objectToString(re)==='[object RegExp]';}


function isObject(arg){
return typeof arg==='object'&&arg!==null;}


function isDate(d){
return isObject(d)&&objectToString(d)==='[object Date]';}


function isError(e){
return isObject(e)&&(
objectToString(e)==='[object Error]'||e instanceof Error);}


function isFunction(arg){
return typeof arg==='function';}


function isPrimitive(arg){
return arg===null||
typeof arg==='boolean'||
typeof arg==='number'||
typeof arg==='string'||
typeof arg==='symbol'||
typeof arg==='undefined';}


function objectToString(o){
return Object.prototype.toString.call(o);}


function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);}


return inspect;}();



var OBJECT_COLUMN_NAME='(index)';
var LOG_LEVELS={
trace:0,
info:1,
warn:2,
error:3};


function setupConsole(global){
if(!global.nativeLoggingHook){
return;}


function getNativeLogFunction(level){
return function(){
var str;
if(arguments.length===1&&typeof arguments[0]==='string'){
str=arguments[0];}else 
{
str=Array.prototype.map.call(arguments,function(arg){
return inspect(arg,{depth:10});}).
join(', ');}


var logLevel=level;
if(str.slice(0,9)==='Warning: '&&logLevel>=LOG_LEVELS.error){



logLevel=LOG_LEVELS.warn;}

global.nativeLoggingHook(str,logLevel);};}



var repeat=function repeat(element,n){
return Array.apply(null,Array(n)).map(function(){return element;});};


function consoleTablePolyfill(rows){

if(!Array.isArray(rows)){
var data=rows;
rows=[];
for(var key in data){
if(data.hasOwnProperty(key)){
var row=data[key];
row[OBJECT_COLUMN_NAME]=key;
rows.push(row);}}}



if(rows.length===0){
global.nativeLoggingHook('',LOG_LEVELS.info);
return;}


var columns=Object.keys(rows[0]).sort();
var stringRows=[];
var columnWidths=[];



columns.forEach(function(k,i){
columnWidths[i]=k.length;
for(var j=0;j<rows.length;j++){
var cellStr=rows[j][k].toString();
stringRows[j]=stringRows[j]||[];
stringRows[j][i]=cellStr;
columnWidths[i]=Math.max(columnWidths[i],cellStr.length);}});





var joinRow=function joinRow(row,space){
var cells=row.map(function(cell,i){
var extraSpaces=repeat(' ',columnWidths[i]-cell.length).join('');
return cell+extraSpaces;});

space=space||' ';
return cells.join(space+'|'+space);};


var separators=columnWidths.map(function(columnWidth){
return repeat('-',columnWidth).join('');});

var separatorRow=joinRow(separators,'-');
var header=joinRow(columns);
var table=[header,separatorRow];

for(var i=0;i<rows.length;i++){
table.push(joinRow(stringRows[i]));}






global.nativeLoggingHook('\n'+table.join('\n'),LOG_LEVELS.info);}



var originalConsole=global.console;
var descriptor=Object.getOwnPropertyDescriptor(global,'console');
if(descriptor){
Object.defineProperty(global,'originalConsole',descriptor);}


var console={
error:getNativeLogFunction(LOG_LEVELS.error),
info:getNativeLogFunction(LOG_LEVELS.info),
log:getNativeLogFunction(LOG_LEVELS.info),
warn:getNativeLogFunction(LOG_LEVELS.warn),
trace:getNativeLogFunction(LOG_LEVELS.trace),
debug:getNativeLogFunction(LOG_LEVELS.trace),
table:consoleTablePolyfill};



Object.defineProperty(global,'console',{
value:console,
configurable:descriptor?descriptor.configurable:true,
enumerable:descriptor?descriptor.enumerable:true,
writable:descriptor?descriptor.writable:true});





if(__DEV__&&originalConsole){
Object.keys(console).forEach(function(methodName){
var reactNativeMethod=console[methodName];
if(originalConsole[methodName]){
console[methodName]=function(){
originalConsole[methodName].apply(originalConsole,arguments);
reactNativeMethod.apply(console,arguments);};}});}}






if(typeof module!=='undefined'){
module.exports=setupConsole;}else 
{
setupConsole(global);}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 















ErrorUtils={
_inGuard:0,
_globalHandler:null,
setGlobalHandler:function setGlobalHandler(fun){
ErrorUtils._globalHandler=fun;},

getGlobalHandler:function getGlobalHandler(){
return ErrorUtils._globalHandler;},

reportError:function reportError(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error);},

reportFatalError:function reportFatalError(error){
ErrorUtils._globalHandler&&ErrorUtils._globalHandler(error,true);},

applyWithGuard:function applyWithGuard(fun,context,args){
try{
ErrorUtils._inGuard++;
return fun.apply(context,args);}
catch(e){
ErrorUtils.reportError(e);}finally 
{
ErrorUtils._inGuard--;}},


applyWithGuardIfNeeded:function applyWithGuardIfNeeded(fun,context,args){
if(ErrorUtils.inGuard()){
return fun.apply(context,args);}else 
{
ErrorUtils.applyWithGuard(fun,context,args);}},


inGuard:function inGuard(){
return ErrorUtils._inGuard;},

guard:function guard(fun,name,context){
if(typeof fun!=='function'){
console.warn('A function must be passed to ErrorUtils.guard, got ',fun);
return null;}

name=name||fun.name||'<generated guard>';
function guarded(){
return (
ErrorUtils.applyWithGuard(
fun,
context||this,
arguments,
null,
name));}




return guarded;}};


global.ErrorUtils=ErrorUtils;






function setupErrorGuard(){
var onError=function onError(e){
global.console.error('Error: '+e.message+', stack:\n'+e.stack);};

global.ErrorUtils.setGlobalHandler(onError);}


setupErrorGuard();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(











Number.EPSILON===undefined){
Object.defineProperty(Number,'EPSILON',{
value:Math.pow(2,-52)});}


if(Number.MAX_SAFE_INTEGER===undefined){
Object.defineProperty(Number,'MAX_SAFE_INTEGER',{
value:Math.pow(2,53)-1});}


if(Number.MIN_SAFE_INTEGER===undefined){
Object.defineProperty(Number,'MIN_SAFE_INTEGER',{
value:-(Math.pow(2,53)-1)});}


if(!Number.isNaN){(function(){

var globalIsNaN=global.isNaN;
Object.defineProperty(Number,'isNaN',{
configurable:true,
enumerable:false,
value:function isNaN(value){
return typeof value==='number'&&globalIsNaN(value);},

writable:true});})();}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(











!String.prototype.startsWith){
String.prototype.startsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var pos=arguments.length>1?
Number(arguments[1])||0:0;
var start=Math.min(Math.max(pos,0),string.length);
return string.indexOf(String(search),pos)===start;};}



if(!String.prototype.endsWith){
String.prototype.endsWith=function(search){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
var stringLength=string.length;
var searchString=String(search);
var pos=arguments.length>1?
Number(arguments[1])||0:stringLength;
var end=Math.min(Math.max(pos,0),stringLength);
var start=end-searchString.length;
if(start<0){
return false;}

return string.lastIndexOf(searchString,start)===start;};}



if(!String.prototype.repeat){
String.prototype.repeat=function(count){
'use strict';
if(this==null){
throw TypeError();}

var string=String(this);
count=Number(count)||0;
if(count<0||count===Infinity){
throw RangeError();}

if(count===1){
return string;}

var result='';
while(count){
if(count&1){
result+=string;}

if(count>>=1){
string+=string;}}


return result;};}



if(!String.prototype.includes){
String.prototype.includes=function(search,start){
'use strict';
if(typeof start!=='number'){
start=0;}


if(start+search.length>this.length){
return false;}else 
{
return this.indexOf(search,start)!==-1;}};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {function 









findIndex(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.findIndex called on null or undefined');}


if(typeof predicate!=='function'){
throw new TypeError('predicate must be a function');}

var list=Object(this);
var length=list.length>>>0;
for(var i=0;i<length;i++){
if(predicate.call(context,list[i],i,list)){
return i;}}


return -1;}


if(!Array.prototype.findIndex){
Object.defineProperty(Array.prototype,'findIndex',{
enumerable:false,
writable:true,
configurable:true,
value:findIndex});}




if(!Array.prototype.find){
Object.defineProperty(Array.prototype,'find',{
enumerable:false,
writable:true,
configurable:true,
value:function value(predicate,context){
if(this==null){
throw new TypeError(
'Array.prototype.find called on null or undefined');}


var index=findIndex.call(this,predicate,context);
return index===-1?undefined:this[index];}});}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {if(












!Array.from){
Array.from=function(arrayLike){
if(arrayLike==null){
throw new TypeError('Object is null or undefined');}



var mapFn=arguments[1];
var thisArg=arguments[2];

var C=this;
var items=Object(arrayLike);
var symbolIterator=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';
var mapping=typeof mapFn==='function';
var usingIterator=typeof items[symbolIterator]==='function';
var key=0;
var ret;
var value;

if(usingIterator){
ret=typeof C==='function'?
new C():
[];
var it=items[symbolIterator]();
var next;

while(!(next=it.next()).done){
value=next.value;

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;
key+=1;}


ret.length=key;
return ret;}


var len=items.length;
if(isNaN(len)||len<0){
len=0;}


ret=typeof C==='function'?
new C(len):
new Array(len);

while(key<len){
value=items[key];

if(mapping){
value=mapFn.call(thisArg,value,key);}


ret[key]=value;

key+=1;}


ret.length=key;
return ret;};}
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {(






function(){

var hasOwnProperty=Object.prototype.hasOwnProperty;






if(typeof Object.entries!=='function'){
Object.entries=function(object){

if(object==null){
throw new TypeError('Object.entries called on non-object');}


var entries=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
entries.push([key,object[key]]);}}


return entries;};}








if(typeof Object.values!=='function'){
Object.values=function(object){

if(object==null){
throw new TypeError('Object.values called on non-object');}


var values=[];
for(var key in object){
if(hasOwnProperty.call(object,key)){
values.push(object[key]);}}


return values;};}})();
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function(global) {var 
















babelHelpers=global.babelHelpers={};

babelHelpers.createRawReactElement=function(){
var REACT_ELEMENT_TYPE=typeof Symbol==="function"&&(typeof Symbol==="function"?Symbol.for:"@@for")&&(typeof Symbol==="function"?Symbol.for:"@@for")("react.element")||0xeac7;
return function createRawReactElement(type,key,props){
return {
$$typeof:REACT_ELEMENT_TYPE,
type:type,
key:key,
ref:null,
props:props,
_owner:null};};}();




babelHelpers.classCallCheck=function(instance,Constructor){
if(!(instance instanceof Constructor)){
throw new TypeError("Cannot call a class as a function");}};



babelHelpers.createClass=function(){
function defineProperties(target,props){
for(var i=0;i<props.length;i++){
var descriptor=props[i];
descriptor.enumerable=descriptor.enumerable||false;
descriptor.configurable=true;
if("value" in descriptor)descriptor.writable=true;
Object.defineProperty(target,descriptor.key,descriptor);}}



return function(Constructor,protoProps,staticProps){
if(protoProps)defineProperties(Constructor.prototype,protoProps);
if(staticProps)defineProperties(Constructor,staticProps);
return Constructor;};}();



babelHelpers.defineProperty=function(obj,key,value){
if(key in obj){
Object.defineProperty(obj,key,{
value:value,
enumerable:true,
configurable:true,
writable:true});}else 

{
obj[key]=value;}


return obj;};


babelHelpers._extends=babelHelpers.extends=Object.assign||function(target){
for(var i=1;i<arguments.length;i++){
var source=arguments[i];

for(var key in source){
if(Object.prototype.hasOwnProperty.call(source,key)){
target[key]=source[key];}}}




return target;};


babelHelpers.get=function get(object,property,receiver){
if(object===null)object=Function.prototype;
var desc=Object.getOwnPropertyDescriptor(object,property);

if(desc===undefined){
var parent=Object.getPrototypeOf(object);

if(parent===null){
return undefined;}else 
{
return get(parent,property,receiver);}}else 

if("value" in desc){
return desc.value;}else 
{
var getter=desc.get;

if(getter===undefined){
return undefined;}


return getter.call(receiver);}};



babelHelpers.inherits=function(subClass,superClass){
if(typeof superClass!=="function"&&superClass!==null){
throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}


subClass.prototype=Object.create(superClass&&superClass.prototype,{
constructor:{
value:subClass,
enumerable:false,
writable:true,
configurable:true}});


if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;};


babelHelpers.interopRequireDefault=function(obj){
return obj&&obj.__esModule?obj:{
default:obj};};



babelHelpers.interopRequireWildcard=function(obj){
if(obj&&obj.__esModule){
return obj;}else 
{
var newObj={};

if(obj!=null){
for(var key in obj){
if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}



newObj.default=obj;
return newObj;}};



babelHelpers.objectWithoutProperties=function(obj,keys){
var target={};

for(var i in obj){
if(keys.indexOf(i)>=0)continue;
if(!Object.prototype.hasOwnProperty.call(obj,i))continue;
target[i]=obj[i];}


return target;};


babelHelpers.possibleConstructorReturn=function(self,call){
if(!self){
throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}


return call&&(typeof call==="object"||typeof call==="function")?call:self;};


babelHelpers.slicedToArray=function(){
function sliceIterator(arr,i){
var _arr=[];
var _n=true;
var _d=false;
var _e=undefined;

try{
for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){
_arr.push(_s.value);

if(i&&_arr.length===i)break;}}

catch(err){
_d=true;
_e=err;}finally 
{
try{
if(!_n&&_i["return"])_i["return"]();}finally 
{
if(_d)throw _e;}}



return _arr;}


return function(arr,i){
if(Array.isArray(arr)){
return arr;}else 
if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){
return sliceIterator(arr,i);}else 
{
throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();




babelHelpers.taggedTemplateLiteral=function(strings,raw){
return Object.freeze(Object.defineProperties(strings,{
raw:{
value:Object.freeze(raw)}}));};




babelHelpers.toArray=function(arr){
return Array.isArray(arr)?arr:Array.from(arr);};


babelHelpers.toConsumableArray=function(arr){
if(Array.isArray(arr)){
for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}

return arr2;}else 
{
return Array.from(arr);}};
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
__d(0 /* react-native/ReactAndroid/src/androidTest/js/TestBundle.js */, function(global, require, module, exports) {'use strict';











console.disableYellowBox=true;


require(1 /* ProgressBarTestModule */);
require(207 /* ViewRenderingTestModule */);

require(208 /* PickerAndroidTestModule */);
require(212 /* CatalystRootViewTestModule */);
require(213 /* DatePickerDialogTestModule */);
require(215 /* ScrollViewTestModule */);
require(216 /* SwipeRefreshLayoutTestModule */);
require(218 /* TextInputTestModule */);
require(226 /* TimePickerDialogTestModule */);


var AppRegistry=require(228 /* AppRegistry */);

var apps=[
{
appKey:'CatalystRootViewTestApp',
component:function component(){return require(212 /* CatalystRootViewTestModule */).CatalystRootViewTestApp;}},

{
appKey:'DatePickerDialogTestApp',
component:function component(){return require(213 /* DatePickerDialogTestModule */).DatePickerDialogTestApp;}},

{
appKey:'HorizontalScrollViewTestApp',
component:function component(){return require(215 /* ScrollViewTestModule */).HorizontalScrollViewTestApp;}},

{
appKey:'PickerAndroidTestApp',
component:function component(){return require(208 /* PickerAndroidTestModule */).PickerAndroidTestApp;}},

{
appKey:'ScrollViewTestApp',
component:function component(){return require(215 /* ScrollViewTestModule */).ScrollViewTestApp;}},

{
appKey:'SwipeRefreshLayoutTestApp',
component:function component(){return require(216 /* SwipeRefreshLayoutTestModule */).SwipeRefreshLayoutTestApp;}},

{
appKey:'TextInputTestApp',
component:function component(){return require(218 /* TextInputTestModule */).TextInputTestApp;}},

{
appKey:'TestIdTestApp',
component:function component(){return require(235 /* TestIdTestModule */).TestIdTestApp;}},

{
appKey:'TimePickerDialogTestApp',
component:function component(){return require(226 /* TimePickerDialogTestModule */).TimePickerDialogTestApp;}}];





module.exports=apps;
AppRegistry.registerConfig(apps);
}, "react-native/ReactAndroid/src/androidTest/js/TestBundle.js");
__d(1 /* ProgressBarTestModule */, function(global, require, module, exports) {"use strict";var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/ProgressBarTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(34 /* React */);
var ProgressBar=require(54 /* ProgressBarAndroid */);
var View=require(81 /* View */);

var renderApplication=require(133 /* renderApplication */);

var ProgressBarSampleApp=React.createClass({displayName:'ProgressBarSampleApp',
render:function render(){
return (
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:24}},
React.createElement(ProgressBar,{styleAttr:'Horizontal',testID:'Horizontal',__source:{fileName:_jsxFileName,lineNumber:25}}),
React.createElement(ProgressBar,{styleAttr:'Small',testID:'Small',__source:{fileName:_jsxFileName,lineNumber:26}}),
React.createElement(ProgressBar,{styleAttr:'Large',testID:'Large',__source:{fileName:_jsxFileName,lineNumber:27}}),
React.createElement(ProgressBar,{styleAttr:'Normal',testID:'Normal',__source:{fileName:_jsxFileName,lineNumber:28}}),
React.createElement(ProgressBar,{styleAttr:'Inverse',testID:'Inverse',__source:{fileName:_jsxFileName,lineNumber:29}}),
React.createElement(ProgressBar,{styleAttr:'SmallInverse',testID:'SmallInverse',__source:{fileName:_jsxFileName,lineNumber:30}}),
React.createElement(ProgressBar,{styleAttr:'LargeInverse',testID:'LargeInverse',__source:{fileName:_jsxFileName,lineNumber:31}}),
React.createElement(View,{style:{width:200},__source:{fileName:_jsxFileName,lineNumber:32}},
React.createElement(ProgressBar,{styleAttr:'Horizontal',testID:'Horizontal200',__source:{fileName:_jsxFileName,lineNumber:33}}))));},




getInitialState:function getInitialState(){
return {};}});



var ProgressBarTestModule={
renderProgressBarApplication:function renderProgressBarApplication(rootTag){
renderApplication(ProgressBarSampleApp,{},rootTag);}};



BatchedBridge.registerCallableModule(
'ProgressBarTestModule',
ProgressBarTestModule);


module.exports=ProgressBarTestModule;
}, "ProgressBarTestModule");
__d(2 /* BatchedBridge */, function(global, require, module, exports) {'use strict';











var MessageQueue=require(3 /* MessageQueue */);

var BatchedBridge=new MessageQueue(
function(){return global.__fbBatchedBridgeConfig;});




var Systrace=require(4 /* Systrace */);
var JSTimersExecution=require(10 /* JSTimersExecution */);

BatchedBridge.registerCallableModule('Systrace',Systrace);
BatchedBridge.registerCallableModule('JSTimersExecution',JSTimersExecution);
BatchedBridge.registerCallableModule('HeapCapture',require(15 /* HeapCapture */));

if(__DEV__){
BatchedBridge.registerCallableModule('HMRClient',require(16 /* HMRClient */));}








Object.defineProperty(global,'__fbBatchedBridge',{value:BatchedBridge});

module.exports=BatchedBridge;
}, "BatchedBridge");
__d(3 /* MessageQueue */, function(global, require, module, exports) {'use strict';














var Systrace=require(4 /* Systrace */);
var ErrorUtils=require(9 /* ErrorUtils */);
var JSTimersExecution=require(10 /* JSTimersExecution */);
var Platform=require(13 /* Platform */);

var invariant=require(259 /* fbjs/lib/invariant */);
var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var stringifySafe=require(14 /* stringifySafe */);

var MODULE_IDS=0;
var METHOD_IDS=1;
var PARAMS=2;
var CALL_IDS=3;
var MIN_TIME_BETWEEN_FLUSHES_MS=5;

var TRACE_TAG_REACT_APPS=1<<17;

var SPY_MODE=false;

var MethodTypes=keyMirror({
remote:null,
remoteAsync:null,
syncHook:null});


var guard=function guard(fn){
try{
fn();}
catch(error){
ErrorUtils.reportFatalError(error);}};var 







MessageQueue=function(){

function MessageQueue(configProvider){var _this=this;babelHelpers.classCallCheck(this,MessageQueue);
this._callableModules={};
this._queue=[[],[],[],0];
this._callbacks=[];
this._callbackID=0;
this._callID=0;
this._lastFlush=0;
this._eventLoopStartTime=new Date().getTime();

this._debugInfo={};
this._remoteModuleTable={};
this._remoteMethodTable={};

[
'invokeCallbackAndReturnFlushedQueue',
'callFunctionReturnFlushedQueue',
'flushedQueue'].
forEach(function(fn){return _this[fn]=_this[fn].bind(_this);});

lazyProperty(this,'RemoteModules',function(){var _configProvider=
configProvider();var remoteModuleConfig=_configProvider.remoteModuleConfig;
var modulesConfig=_this._genModulesConfig(remoteModuleConfig);
var modules=_this._genModules(modulesConfig);

_this._genLookupTables(
modulesConfig,_this._remoteModuleTable,_this._remoteMethodTable);


return modules;});}babelHelpers.createClass(MessageQueue,[{key:'callFunctionReturnFlushedQueue',value:function callFunctionReturnFlushedQueue(






module,method,args){var _this2=this;
guard(function(){
_this2.__callFunction(module,method,args);
_this2.__callImmediates();});


return this.flushedQueue();}},{key:'invokeCallbackAndReturnFlushedQueue',value:function invokeCallbackAndReturnFlushedQueue(


cbID,args){var _this3=this;
guard(function(){
_this3.__invokeCallback(cbID,args);
_this3.__callImmediates();});


return this.flushedQueue();}},{key:'flushedQueue',value:function flushedQueue()


{
this.__callImmediates();

var queue=this._queue;
this._queue=[[],[],[],this._callID];
return queue[0].length?queue:null;}},{key:'processModuleConfig',value:function processModuleConfig(


config,moduleID){
var info=this._genModule(config,moduleID);
this.RemoteModules[info.name]=info.module;
this._genLookup(config,moduleID,this._remoteModuleTable,this._remoteMethodTable);
return info.module;}},{key:'getEventLoopRunningTime',value:function getEventLoopRunningTime()


{
return new Date().getTime()-this._eventLoopStartTime;}},{key:'__callImmediates',value:function __callImmediates()






{
Systrace.beginEvent('JSTimersExecution.callImmediates()');
guard(function(){return JSTimersExecution.callImmediates();});
Systrace.endEvent();}},{key:'__nativeCall',value:function __nativeCall(


module,method,params,onFail,onSucc){
if(onFail||onSucc){

this._callbackID>1<<5&&(
this._debugInfo[this._callbackID>>5]=null);

this._debugInfo[this._callbackID>>1]=[module,method];
onFail&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onFail;
onSucc&&params.push(this._callbackID);
this._callbacks[this._callbackID++]=onSucc;}


global.nativeTraceBeginAsyncFlow&&
global.nativeTraceBeginAsyncFlow(TRACE_TAG_REACT_APPS,'native',this._callID);
this._callID++;

this._queue[MODULE_IDS].push(module);
this._queue[METHOD_IDS].push(method);
this._queue[PARAMS].push(params);

var now=new Date().getTime();
if(global.nativeFlushQueueImmediate&&
now-this._lastFlush>=MIN_TIME_BETWEEN_FLUSHES_MS){
global.nativeFlushQueueImmediate(this._queue);
this._queue=[[],[],[],this._callID];
this._lastFlush=now;}

Systrace.counterEvent('pending_js_to_native_queue',this._queue[0].length);
if(__DEV__&&SPY_MODE&&isFinite(module)){
console.log('JS->N : '+this._remoteModuleTable[module]+'.'+
this._remoteMethodTable[module][method]+'('+JSON.stringify(params)+')');}}},{key:'__callFunction',value:function __callFunction(



module,method,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
Systrace.beginEvent(module+'.'+method+'()');
if(__DEV__&&SPY_MODE){
console.log('N->JS : '+module+'.'+method+'('+JSON.stringify(args)+')');}

var moduleMethods=this._callableModules[module];
invariant(
!!moduleMethods,
'Module %s is not a registered callable module.',
module);

moduleMethods[method].apply(moduleMethods,args);
Systrace.endEvent();}},{key:'__invokeCallback',value:function __invokeCallback(


cbID,args){
this._lastFlush=new Date().getTime();
this._eventLoopStartTime=this._lastFlush;
var callback=this._callbacks[cbID];
var debug=this._debugInfo[cbID>>1];
var module=debug&&this._remoteModuleTable[debug[0]];
var method=debug&&this._remoteMethodTable[debug[0]][debug[1]];
if(!callback){
var errorMessage='Callback with id '+cbID+': '+module+'.'+method+'() not found';
if(method){
errorMessage='The callback '+method+'() exists in module '+module+', '+'but only one callback may be registered to a function in a native module.';}


invariant(
callback,
errorMessage);}


var profileName=debug?'<callback for '+module+'.'+method+'>':cbID;
if(callback&&SPY_MODE&&__DEV__){
console.log('N->JS : '+profileName+'('+JSON.stringify(args)+')');}

Systrace.beginEvent('MessageQueue.invokeCallback('+
profileName+', '+stringifySafe(args)+')');
this._callbacks[cbID&~1]=null;
this._callbacks[cbID|1]=null;
callback.apply(null,args);
Systrace.endEvent();}},{key:'_genModulesConfig',value:function _genModulesConfig(











modules){
if(Array.isArray(modules)){
return modules;}else 
{
var moduleArray=[];
var moduleNames=Object.keys(modules);
for(var i=0,l=moduleNames.length;i<l;i++){
var moduleName=moduleNames[i];
var moduleConfig=modules[moduleName];
var _module=[moduleName];
if(moduleConfig.constants){
_module.push(moduleConfig.constants);}

var methodsConfig=moduleConfig.methods;
if(methodsConfig){
var methods=[];
var asyncMethods=[];
var syncHooks=[];
var methodNames=Object.keys(methodsConfig);
for(var j=0,ll=methodNames.length;j<ll;j++){
var methodName=methodNames[j];
var methodConfig=methodsConfig[methodName];
methods[methodConfig.methodID]=methodName;
if(methodConfig.type===MethodTypes.remoteAsync){
asyncMethods.push(methodConfig.methodID);}else 
if(methodConfig.type===MethodTypes.syncHook){
syncHooks.push(methodConfig.methodID);}}


if(methods.length){
_module.push(methods);
_module.push(asyncMethods);
_module.push(syncHooks);}}


moduleArray[moduleConfig.moduleID]=_module;}

return moduleArray;}}},{key:'_genLookupTables',value:function _genLookupTables(



modulesConfig,moduleTable,methodTable){var _this4=this;
modulesConfig.forEach(function(config,moduleID){
_this4._genLookup(config,moduleID,moduleTable,methodTable);});}},{key:'_genLookup',value:function _genLookup(



config,moduleID,moduleTable,methodTable){
if(!config){
return;}


var moduleName=void 0,methods=void 0;
if(moduleHasConstants(config)){var _config=babelHelpers.slicedToArray(
config,3);moduleName=_config[0];methods=_config[2];}else 
{var _config2=babelHelpers.slicedToArray(
config,2);moduleName=_config2[0];methods=_config2[1];}


moduleTable[moduleID]=moduleName;
methodTable[moduleID]=babelHelpers.extends({},methods);}},{key:'_genModules',value:function _genModules(


remoteModules){var _this5=this;
var modules={};

remoteModules.forEach(function(config,moduleID){
var info=_this5._genModule(config,moduleID);
if(info){
modules[info.name]=info.module;}});



return modules;}},{key:'_genModule',value:function _genModule(


config,moduleID){var _this6=this;
if(!config){
return null;}


var moduleName=void 0,constants=void 0,methods=void 0,asyncMethods=void 0,syncHooks=void 0;
if(moduleHasConstants(config)){var _config3=babelHelpers.slicedToArray(
config,5);moduleName=_config3[0];constants=_config3[1];methods=_config3[2];asyncMethods=_config3[3];syncHooks=_config3[4];}else 
{var _config4=babelHelpers.slicedToArray(
config,4);moduleName=_config4[0];methods=_config4[1];asyncMethods=_config4[2];syncHooks=_config4[3];}


var module={};
methods&&methods.forEach(function(methodName,methodID){
var isAsync=asyncMethods&&arrayContains(asyncMethods,methodID);
var isSyncHook=syncHooks&&arrayContains(syncHooks,methodID);
invariant(!isAsync||!isSyncHook,'Cannot have a method that is both async and a sync hook');
var methodType=isAsync?MethodTypes.remoteAsync:
isSyncHook?MethodTypes.syncHook:
MethodTypes.remote;
module[methodName]=_this6._genMethod(moduleID,methodID,methodType);});

babelHelpers.extends(module,constants);

if(!constants&&!methods&&!asyncMethods){
module.moduleID=moduleID;}


return {name:moduleName,module:module};}},{key:'_genMethod',value:function _genMethod(


module,method,type){
var fn=null;
var self=this;
if(type===MethodTypes.remoteAsync){
fn=function fn(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return new Promise(function(resolve,reject){
self.__nativeCall(
module,
method,
args,
function(data){
resolve(data);},

function(errorData){
var error=createErrorFromErrorData(errorData);
reject(error);});});};}else 



if(type===MethodTypes.syncHook){
return function(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}
return global.nativeCallSyncHook(module,method,args);};}else 

{
fn=function fn(){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3<_len3;_key3++){args[_key3]=arguments[_key3];}
var lastArg=args.length>0?args[args.length-1]:null;
var secondLastArg=args.length>1?args[args.length-2]:null;
var hasSuccCB=typeof lastArg==='function';
var hasErrorCB=typeof secondLastArg==='function';
hasErrorCB&&invariant(
hasSuccCB,
'Cannot have a non-function arg after a function arg.');

var numCBs=hasSuccCB+hasErrorCB;
var onSucc=hasSuccCB?lastArg:null;
var onFail=hasErrorCB?secondLastArg:null;
args=args.slice(0,args.length-numCBs);
return self.__nativeCall(module,method,args,onFail,onSucc);};}


fn.type=type;
return fn;}},{key:'registerCallableModule',value:function registerCallableModule(


name,methods){
this._callableModules[name]=methods;}}]);return MessageQueue;}();




function moduleHasConstants(moduleArray){
return !Array.isArray(moduleArray[1]);}


function arrayContains(array,value){
return array.indexOf(value)!==-1;}


function createErrorFromErrorData(errorData){var 

message=

errorData.message;var extraErrorInfo=babelHelpers.objectWithoutProperties(errorData,['message']);
var error=new Error(message);
error.framesToPop=1;
return babelHelpers.extends(error,extraErrorInfo);}


function lazyProperty(target,name,f){
Object.defineProperty(target,name,{
configurable:true,
enumerable:true,
get:function get(){
var value=f();
Object.defineProperty(target,name,{
configurable:true,
enumerable:true,
writeable:true,
value:value});

return value;}});}




module.exports=MessageQueue;
}, "MessageQueue");
__d(4 /* Systrace */, function(global, require, module, exports) {'use strict';
























var TRACE_TAG_REACT_APPS=1<<17;
var TRACE_TAG_JSC_CALLS=1<<27;

var _enabled=false;
var _asyncCookie=0;
var _ReactDebugTool=null;
var _ReactComponentTreeDevtool=null;
function ReactDebugTool(){
if(!_ReactDebugTool){
_ReactDebugTool=require(5 /* ReactDebugTool */);}

return _ReactDebugTool;}

function ReactComponentTreeDevtool(){
if(!_ReactComponentTreeDevtool){
_ReactComponentTreeDevtool=require(8 /* ReactComponentTreeDevtool */);}

return _ReactComponentTreeDevtool;}


var ReactSystraceDevtool={
onBeginReconcilerTimer:function onBeginReconcilerTimer(debugID,timerType){
var displayName=ReactComponentTreeDevtool().getDisplayName(debugID);
Systrace.beginEvent('ReactReconciler.'+timerType+'('+displayName+')');},

onEndReconcilerTimer:function onEndReconcilerTimer(debugID,timerType){
Systrace.endEvent();},

onBeginLifeCycleTimer:function onBeginLifeCycleTimer(debugID,timerType){
var displayName=ReactComponentTreeDevtool().getDisplayName(debugID);
Systrace.beginEvent(displayName+'.'+timerType+'()');},

onEndLifeCycleTimer:function onEndLifeCycleTimer(debugID,timerType){
Systrace.endEvent();}};



var Systrace={
setEnabled:function setEnabled(enabled){
if(_enabled!==enabled){
if(enabled){
global.nativeTraceBeginLegacy&&global.nativeTraceBeginLegacy(TRACE_TAG_JSC_CALLS);
ReactDebugTool().addDevtool(ReactSystraceDevtool);}else 
{
global.nativeTraceEndLegacy&&global.nativeTraceEndLegacy(TRACE_TAG_JSC_CALLS);
ReactDebugTool().removeDevtool(ReactSystraceDevtool);}}


_enabled=enabled;},





beginEvent:function beginEvent(profileName){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginSection(TRACE_TAG_REACT_APPS,profileName);}},



endEvent:function endEvent(){
if(_enabled){
global.nativeTraceEndSection(TRACE_TAG_REACT_APPS);}},








beginAsyncEvent:function beginAsyncEvent(profileName){
var cookie=_asyncCookie;
if(_enabled){
_asyncCookie++;
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceBeginAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);}

return cookie;},


endAsyncEvent:function endAsyncEvent(profileName,cookie){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceEndAsyncSection(TRACE_TAG_REACT_APPS,profileName,cookie,0);}},






counterEvent:function counterEvent(profileName,value){
if(_enabled){
profileName=typeof profileName==='function'?
profileName():profileName;
global.nativeTraceCounter&&
global.nativeTraceCounter(TRACE_TAG_REACT_APPS,profileName,value);}},







attachToRelayProfiler:function attachToRelayProfiler(relayProfiler){
relayProfiler.attachProfileHandler('*',function(name){
var cookie=Systrace.beginAsyncEvent(name);
return function(){
Systrace.endAsyncEvent(name,cookie);};});



relayProfiler.attachAggregateHandler('*',function(name,callback){
Systrace.beginEvent(name);
callback();
Systrace.endEvent();});},





swizzleJSON:function swizzleJSON(){
Systrace.measureMethods(JSON,'JSON',[
'parse',
'stringify']);},











measureMethods:function measureMethods(object,objectName,methodNames){
if(!__DEV__){
return;}


methodNames.forEach(function(methodName){
object[methodName]=Systrace.measure(
objectName,
methodName,
object[methodName]);});},













measure:function measure(objName,fnName,func){
if(!__DEV__){
return func;}


var profileName=objName+'.'+fnName;
return function(){
if(!_enabled){
return func.apply(this,arguments);}


Systrace.beginEvent(profileName);
var ret=func.apply(this,arguments);
Systrace.endEvent();
return ret;};}};




Systrace.setEnabled(global.__RCTProfileIsProfiling||false);

if(__DEV__){




require.Systrace=Systrace;}


module.exports=Systrace;
}, "Systrace");
__d(5 /* ReactDebugTool */, function(global, require, module, exports) {'use strict';












var ExecutionEnvironment=require(258 /* fbjs/lib/ExecutionEnvironment */);

var performanceNow=require(255 /* fbjs/lib/performanceNow */);
var warning=require(265 /* fbjs/lib/warning */);

var eventHandlers=[];
var handlerDoesThrowForEvent={};

function emitEvent(handlerFunctionName,arg1,arg2,arg3,arg4,arg5){
if(process.env.NODE_ENV!=='production'){
eventHandlers.forEach(function(handler){
try{
if(handler[handlerFunctionName]){
handler[handlerFunctionName](arg1,arg2,arg3,arg4,arg5);}}

catch(e){
process.env.NODE_ENV!=='production'?warning(!handlerDoesThrowForEvent[handlerFunctionName],'exception thrown by devtool while handling %s: %s',handlerFunctionName,e.message):void 0;
handlerDoesThrowForEvent[handlerFunctionName]=true;}});}}





var isProfiling=false;
var flushHistory=[];
var currentFlushNesting=0;
var currentFlushMeasurements=null;
var currentFlushStartTime=null;
var currentTimerDebugID=null;
var currentTimerStartTime=null;
var currentTimerType=null;

function clearHistory(){
ReactComponentTreeDevtool.purgeUnmountedComponents();
ReactNativeOperationHistoryDevtool.clearHistory();}


function getTreeSnapshot(registeredIDs){
return registeredIDs.reduce(function(tree,id){
var ownerID=ReactComponentTreeDevtool.getOwnerID(id);
var parentID=ReactComponentTreeDevtool.getParentID(id);
tree[id]={
displayName:ReactComponentTreeDevtool.getDisplayName(id),
text:ReactComponentTreeDevtool.getText(id),
updateCount:ReactComponentTreeDevtool.getUpdateCount(id),
childIDs:ReactComponentTreeDevtool.getChildIDs(id),

ownerID:ownerID||ReactComponentTreeDevtool.getOwnerID(parentID),
parentID:parentID};

return tree;},
{});}


function resetMeasurements(){
if(process.env.NODE_ENV!=='production'){
var previousStartTime=currentFlushStartTime;
var previousMeasurements=currentFlushMeasurements||[];
var previousOperations=ReactNativeOperationHistoryDevtool.getHistory();

if(!isProfiling||currentFlushNesting===0){
currentFlushStartTime=null;
currentFlushMeasurements=null;
clearHistory();
return;}


if(previousMeasurements.length||previousOperations.length){
var registeredIDs=ReactComponentTreeDevtool.getRegisteredIDs();
flushHistory.push({
duration:performanceNow()-previousStartTime,
measurements:previousMeasurements||[],
operations:previousOperations||[],
treeSnapshot:getTreeSnapshot(registeredIDs)});}



clearHistory();
currentFlushStartTime=performanceNow();
currentFlushMeasurements=[];}}



function checkDebugID(debugID){
process.env.NODE_ENV!=='production'?warning(debugID,'ReactDebugTool: debugID may not be empty.'):void 0;}


var ReactDebugTool={
addDevtool:function addDevtool(devtool){
eventHandlers.push(devtool);},

removeDevtool:function removeDevtool(devtool){
for(var i=0;i<eventHandlers.length;i++){
if(eventHandlers[i]===devtool){
eventHandlers.splice(i,1);
i--;}}},



beginProfiling:function beginProfiling(){
if(process.env.NODE_ENV!=='production'){
if(isProfiling){
return;}


isProfiling=true;
flushHistory.length=0;
resetMeasurements();}},


endProfiling:function endProfiling(){
if(process.env.NODE_ENV!=='production'){
if(!isProfiling){
return;}


isProfiling=false;
resetMeasurements();}},


getFlushHistory:function getFlushHistory(){
if(process.env.NODE_ENV!=='production'){
return flushHistory;}},


onBeginFlush:function onBeginFlush(){
if(process.env.NODE_ENV!=='production'){
currentFlushNesting++;
resetMeasurements();}

emitEvent('onBeginFlush');},

onEndFlush:function onEndFlush(){
if(process.env.NODE_ENV!=='production'){
resetMeasurements();
currentFlushNesting--;}

emitEvent('onEndFlush');},

onBeginLifeCycleTimer:function onBeginLifeCycleTimer(debugID,timerType){
checkDebugID(debugID);
emitEvent('onBeginLifeCycleTimer',debugID,timerType);
if(process.env.NODE_ENV!=='production'){
if(isProfiling&&currentFlushNesting>0){
process.env.NODE_ENV!=='production'?warning(!currentTimerType,'There is an internal error in the React performance measurement code. '+'Did not expect %s timer to start while %s timer is still in '+'progress for %s instance.',timerType,currentTimerType||'no',debugID===currentTimerDebugID?'the same':'another'):void 0;
currentTimerStartTime=performanceNow();
currentTimerDebugID=debugID;
currentTimerType=timerType;}}},



onEndLifeCycleTimer:function onEndLifeCycleTimer(debugID,timerType){
checkDebugID(debugID);
if(process.env.NODE_ENV!=='production'){
if(isProfiling&&currentFlushNesting>0){
process.env.NODE_ENV!=='production'?warning(currentTimerType===timerType,'There is an internal error in the React performance measurement code. '+'We did not expect %s timer to stop while %s timer is still in '+'progress for %s instance. Please report this as a bug in React.',timerType,currentTimerType||'no',debugID===currentTimerDebugID?'the same':'another'):void 0;
currentFlushMeasurements.push({
timerType:timerType,
instanceID:debugID,
duration:performanceNow()-currentTimerStartTime});

currentTimerStartTime=null;
currentTimerDebugID=null;
currentTimerType=null;}}


emitEvent('onEndLifeCycleTimer',debugID,timerType);},

onBeginReconcilerTimer:function onBeginReconcilerTimer(debugID,timerType){
checkDebugID(debugID);
emitEvent('onBeginReconcilerTimer',debugID,timerType);},

onEndReconcilerTimer:function onEndReconcilerTimer(debugID,timerType){
checkDebugID(debugID);
emitEvent('onEndReconcilerTimer',debugID,timerType);},

onBeginProcessingChildContext:function onBeginProcessingChildContext(){
emitEvent('onBeginProcessingChildContext');},

onEndProcessingChildContext:function onEndProcessingChildContext(){
emitEvent('onEndProcessingChildContext');},

onNativeOperation:function onNativeOperation(debugID,type,payload){
checkDebugID(debugID);
emitEvent('onNativeOperation',debugID,type,payload);},

onSetState:function onSetState(){
emitEvent('onSetState');},

onSetDisplayName:function onSetDisplayName(debugID,displayName){
checkDebugID(debugID);
emitEvent('onSetDisplayName',debugID,displayName);},

onSetChildren:function onSetChildren(debugID,childDebugIDs){
checkDebugID(debugID);
emitEvent('onSetChildren',debugID,childDebugIDs);},

onSetOwner:function onSetOwner(debugID,ownerDebugID){
checkDebugID(debugID);
emitEvent('onSetOwner',debugID,ownerDebugID);},

onSetText:function onSetText(debugID,text){
checkDebugID(debugID);
emitEvent('onSetText',debugID,text);},

onMountRootComponent:function onMountRootComponent(debugID){
checkDebugID(debugID);
emitEvent('onMountRootComponent',debugID);},

onMountComponent:function onMountComponent(debugID){
checkDebugID(debugID);
emitEvent('onMountComponent',debugID);},

onUpdateComponent:function onUpdateComponent(debugID){
checkDebugID(debugID);
emitEvent('onUpdateComponent',debugID);},

onUnmountComponent:function onUnmountComponent(debugID){
checkDebugID(debugID);
emitEvent('onUnmountComponent',debugID);}};



if(process.env.NODE_ENV!=='production'){
var ReactInvalidSetStateWarningDevTool=require(6 /* ./ReactInvalidSetStateWarningDevTool */);
var ReactNativeOperationHistoryDevtool=require(7 /* ./ReactNativeOperationHistoryDevtool */);
var ReactComponentTreeDevtool=require(8 /* ./ReactComponentTreeDevtool */);
ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
ReactDebugTool.addDevtool(ReactNativeOperationHistoryDevtool);
var url=ExecutionEnvironment.canUseDOM&&window.location.href||'';
if(/[?&]react_perf\b/.test(url)){
ReactDebugTool.beginProfiling();}}



module.exports=ReactDebugTool;
}, "ReactDebugTool");
__d(258 /* fbjs/lib/ExecutionEnvironment.js */, function(global, require, module, exports) {'use strict';











var canUseDOM=!!(typeof window!=='undefined'&&window.document&&window.document.createElement);







var ExecutionEnvironment={

canUseDOM:canUseDOM,

canUseWorkers:typeof Worker!=='undefined',

canUseEventListeners:canUseDOM&&!!(window.addEventListener||window.attachEvent),

canUseViewport:canUseDOM&&!!window.screen,

isInWorker:!canUseDOM};



module.exports=ExecutionEnvironment;
}, "fbjs/lib/ExecutionEnvironment.js");
__d(255 /* fbjs/lib/performanceNow.js */, function(global, require, module, exports) {'use strict';












var performance=require(254 /* ./performance */);

var performanceNow;






if(performance.now){
performanceNow=function performanceNow(){
return performance.now();};}else 

{
performanceNow=function performanceNow(){
return Date.now();};}



module.exports=performanceNow;
}, "fbjs/lib/performanceNow.js");
__d(254 /* fbjs/lib/performance.js */, function(global, require, module, exports) {'use strict';












var ExecutionEnvironment=require(258 /* ./ExecutionEnvironment */);

var performance;

if(ExecutionEnvironment.canUseDOM){
performance=window.performance||window.msPerformance||window.webkitPerformance;}


module.exports=performance||{};
}, "fbjs/lib/performance.js");
__d(265 /* fbjs/lib/warning.js */, function(global, require, module, exports) {'use strict';











var emptyFunction=require(261 /* ./emptyFunction */);








var warning=emptyFunction;

if(process.env.NODE_ENV!=='production'){
warning=function warning(condition,format){
for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){
args[_key-2]=arguments[_key];}


if(format===undefined){
throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}


if(format.indexOf('Failed Composite propType: ')===0){
return;}


if(!condition){
var argIndex=0;
var message='Warning: '+format.replace(/%s/g,function(){
return args[argIndex++];});

if(typeof console!=='undefined'){
console.error(message);}

try{



throw new Error(message);}
catch(x){}}};}




module.exports=warning;
}, "fbjs/lib/warning.js");
__d(261 /* fbjs/lib/emptyFunction.js */, function(global, require, module, exports) {"use strict";











function makeEmptyFunction(arg){
return function(){
return arg;};}








function emptyFunction(){}

emptyFunction.thatReturns=makeEmptyFunction;
emptyFunction.thatReturnsFalse=makeEmptyFunction(false);
emptyFunction.thatReturnsTrue=makeEmptyFunction(true);
emptyFunction.thatReturnsNull=makeEmptyFunction(null);
emptyFunction.thatReturnsThis=function(){
return this;};

emptyFunction.thatReturnsArgument=function(arg){
return arg;};


module.exports=emptyFunction;
}, "fbjs/lib/emptyFunction.js");
__d(6 /* ReactInvalidSetStateWarningDevTool */, function(global, require, module, exports) {'use strict';












var warning=require(265 /* fbjs/lib/warning */);

if(process.env.NODE_ENV!=='production'){
var processingChildContext=false;

var warnInvalidSetState=function warnInvalidSetState(){
process.env.NODE_ENV!=='production'?warning(!processingChildContext,'setState(...): Cannot call setState() inside getChildContext()'):void 0;};}



var ReactInvalidSetStateWarningDevTool={
onBeginProcessingChildContext:function onBeginProcessingChildContext(){
processingChildContext=true;},

onEndProcessingChildContext:function onEndProcessingChildContext(){
processingChildContext=false;},

onSetState:function onSetState(){
warnInvalidSetState();}};



module.exports=ReactInvalidSetStateWarningDevTool;
}, "ReactInvalidSetStateWarningDevTool");
__d(7 /* ReactNativeOperationHistoryDevtool */, function(global, require, module, exports) {'use strict';












var history=[];

var ReactNativeOperationHistoryDevtool={
onNativeOperation:function onNativeOperation(debugID,type,payload){
history.push({
instanceID:debugID,
type:type,
payload:payload});},


clearHistory:function clearHistory(){
if(ReactNativeOperationHistoryDevtool._preventClearing){

return;}


history=[];},

getHistory:function getHistory(){
return history;}};



module.exports=ReactNativeOperationHistoryDevtool;
}, "ReactNativeOperationHistoryDevtool");
__d(8 /* ReactComponentTreeDevtool */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);

var tree={};
var rootIDs=[];

function updateTree(id,update){
if(!tree[id]){
tree[id]={
parentID:null,
ownerID:null,
text:null,
childIDs:[],
displayName:'Unknown',
isMounted:false,
updateCount:0};}


update(tree[id]);}


function purgeDeep(id){
var item=tree[id];
if(item){
var childIDs=item.childIDs;

delete tree[id];
childIDs.forEach(purgeDeep);}}



var ReactComponentTreeDevtool={
onSetDisplayName:function onSetDisplayName(id,displayName){
updateTree(id,function(item){
return item.displayName=displayName;});},


onSetChildren:function onSetChildren(id,nextChildIDs){
updateTree(id,function(item){
var prevChildIDs=item.childIDs;
item.childIDs=nextChildIDs;

nextChildIDs.forEach(function(nextChildID){
var nextChild=tree[nextChildID];
!nextChild?process.env.NODE_ENV!=='production'?invariant(false,'Expected devtool events to fire for the child '+'before its parent includes it in onSetChildren().'):invariant(false):void 0;
!(nextChild.displayName!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Expected onSetDisplayName() to fire for the child '+'before its parent includes it in onSetChildren().'):invariant(false):void 0;
!(nextChild.childIDs!=null||nextChild.text!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Expected onSetChildren() or onSetText() to fire for the child '+'before its parent includes it in onSetChildren().'):invariant(false):void 0;
!nextChild.isMounted?process.env.NODE_ENV!=='production'?invariant(false,'Expected onMountComponent() to fire for the child '+'before its parent includes it in onSetChildren().'):invariant(false):void 0;

if(prevChildIDs.indexOf(nextChildID)===-1){
nextChild.parentID=id;}});});},




onSetOwner:function onSetOwner(id,ownerID){
updateTree(id,function(item){
return item.ownerID=ownerID;});},


onSetText:function onSetText(id,text){
updateTree(id,function(item){
return item.text=text;});},


onMountComponent:function onMountComponent(id){
updateTree(id,function(item){
return item.isMounted=true;});},


onMountRootComponent:function onMountRootComponent(id){
rootIDs.push(id);},

onUpdateComponent:function onUpdateComponent(id){
updateTree(id,function(item){
return item.updateCount++;});},


onUnmountComponent:function onUnmountComponent(id){
updateTree(id,function(item){
return item.isMounted=false;});

rootIDs=rootIDs.filter(function(rootID){
return rootID!==id;});},


purgeUnmountedComponents:function purgeUnmountedComponents(){
if(ReactComponentTreeDevtool._preventPurging){

return;}


Object.keys(tree).filter(function(id){
return !tree[id].isMounted;}).
forEach(purgeDeep);},

isMounted:function isMounted(id){
var item=tree[id];
return item?item.isMounted:false;},

getChildIDs:function getChildIDs(id){
var item=tree[id];
return item?item.childIDs:[];},

getDisplayName:function getDisplayName(id){
var item=tree[id];
return item?item.displayName:'Unknown';},

getOwnerID:function getOwnerID(id){
var item=tree[id];
return item?item.ownerID:null;},

getParentID:function getParentID(id){
var item=tree[id];
return item?item.parentID:null;},

getText:function getText(id){
var item=tree[id];
return item?item.text:null;},

getUpdateCount:function getUpdateCount(id){
var item=tree[id];
return item?item.updateCount:0;},

getRootIDs:function getRootIDs(){
return rootIDs;},

getRegisteredIDs:function getRegisteredIDs(){
return Object.keys(tree);}};



module.exports=ReactComponentTreeDevtool;
}, "ReactComponentTreeDevtool");
__d(259 /* fbjs/lib/invariant.js */, function(global, require, module, exports) {'use strict';






















function invariant(condition,format,a,b,c,d,e,f){
if(process.env.NODE_ENV!=='production'){
if(format===undefined){
throw new Error('invariant requires an error message argument');}}



if(!condition){
var error;
if(format===undefined){
error=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else 
{
var args=[a,b,c,d,e,f];
var argIndex=0;
error=new Error(format.replace(/%s/g,function(){
return args[argIndex++];}));

error.name='Invariant Violation';}


error.framesToPop=1;
throw error;}}



module.exports=invariant;
}, "fbjs/lib/invariant.js");
__d(9 /* ErrorUtils */, function(global, require, module, exports) {module.























exports=global.ErrorUtils;
}, "ErrorUtils");
__d(10 /* JSTimersExecution */, function(global, require, module, exports) {'use strict';











var invariant=require(259 /* fbjs/lib/invariant */);
var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var performanceNow=require(255 /* fbjs/lib/performanceNow */);
var warning=require(265 /* fbjs/lib/warning */);
var Systrace=require(4 /* Systrace */);






var JSTimersExecution={
GUID:1,
Type:keyMirror({
setTimeout:null,
setInterval:null,
requestAnimationFrame:null,
setImmediate:null}),



callbacks:[],
types:[],
timerIDs:[],
immediates:[],






callTimer:function callTimer(timerID){
warning(timerID<=JSTimersExecution.GUID,'Tried to call timer with ID '+timerID+' but no such timer exists');
var timerIndex=JSTimersExecution.timerIDs.indexOf(timerID);





if(timerIndex===-1){
return;}

var type=JSTimersExecution.types[timerIndex];
var callback=JSTimersExecution.callbacks[timerIndex];


if(type===JSTimersExecution.Type.setTimeout||
type===JSTimersExecution.Type.setImmediate||
type===JSTimersExecution.Type.requestAnimationFrame){
JSTimersExecution._clearIndex(timerIndex);}


try{
if(type===JSTimersExecution.Type.setTimeout||
type===JSTimersExecution.Type.setInterval||
type===JSTimersExecution.Type.setImmediate){
callback();}else 
if(type===JSTimersExecution.Type.requestAnimationFrame){
var currentTime=performanceNow();
callback(currentTime);}else 
{
console.error('Tried to call a callback with invalid type: '+type);
return;}}

catch(e){

JSTimersExecution.errors=JSTimersExecution.errors||[];
JSTimersExecution.errors.push(e);}},







callTimers:function callTimers(timerIDs){
invariant(timerIDs.length!==0,'Probably shouldn\'t call "callTimers" with no timerIDs');

JSTimersExecution.errors=null;
timerIDs.forEach(JSTimersExecution.callTimer);

var errors=JSTimersExecution.errors;
if(errors){
var errorCount=errors.length;
if(errorCount>1){


for(var ii=1;ii<errorCount;ii++){
require(11 /* JSTimers */).setTimeout(
function(error){throw error;}.bind(null,errors[ii]),
0);}}



throw errors[0];}},







callImmediatesPass:function callImmediatesPass(){
Systrace.beginEvent('JSTimersExecution.callImmediatesPass()');



if(JSTimersExecution.immediates.length>0){
var passImmediates=JSTimersExecution.immediates.slice();
JSTimersExecution.immediates=[];



for(var i=0;i<passImmediates.length;++i){
JSTimersExecution.callTimer(passImmediates[i]);}}



Systrace.endEvent();

return JSTimersExecution.immediates.length>0;},






callImmediates:function callImmediates(){
JSTimersExecution.errors=null;
while(JSTimersExecution.callImmediatesPass()){}
if(JSTimersExecution.errors){
JSTimersExecution.errors.forEach(function(error){return (
require(11 /* JSTimers */).setTimeout(function(){throw error;},0));});}},




_clearIndex:function _clearIndex(i){
JSTimersExecution.timerIDs[i]=null;
JSTimersExecution.callbacks[i]=null;
JSTimersExecution.types[i]=null;}};



module.exports=JSTimersExecution;
}, "JSTimersExecution");
__d(256 /* fbjs/lib/keyMirror.js */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* ./invariant */);



















var keyMirror=function keyMirror(obj){
var ret={};
var key;
!(obj instanceof Object&&!Array.isArray(obj))?process.env.NODE_ENV!=='production'?invariant(false,'keyMirror(...): Argument must be an object.'):invariant(false):void 0;
for(key in obj){
if(!obj.hasOwnProperty(key)){
continue;}

ret[key]=key;}

return ret;};


module.exports=keyMirror;
}, "fbjs/lib/keyMirror.js");
__d(11 /* JSTimers */, function(global, require, module, exports) {'use strict';













var RCTTiming=require(12 /* NativeModules */).Timing;
var JSTimersExecution=require(10 /* JSTimersExecution */);






var JSTimers={
Types:JSTimersExecution.Types,





_getFreeIndex:function _getFreeIndex(){
var freeIndex=JSTimersExecution.timerIDs.indexOf(null);
if(freeIndex===-1){
freeIndex=JSTimersExecution.timerIDs.length;}

return freeIndex;},






setTimeout:function setTimeout(func,duration){for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setTimeout;
RCTTiming.createTimer(newID,duration||0,Date.now(),false);
return newID;},






setInterval:function setInterval(func,duration){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setInterval;
RCTTiming.createTimer(newID,duration||0,Date.now(),true);
return newID;},






setImmediate:function setImmediate(func){for(var _len3=arguments.length,args=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){args[_key3-1]=arguments[_key3];}
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=function(){
return func.apply(undefined,args);};

JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.setImmediate;
JSTimersExecution.immediates.push(newID);
return newID;},





requestAnimationFrame:function requestAnimationFrame(func){
var newID=JSTimersExecution.GUID++;
var freeIndex=JSTimers._getFreeIndex();
JSTimersExecution.timerIDs[freeIndex]=newID;
JSTimersExecution.callbacks[freeIndex]=func;
JSTimersExecution.types[freeIndex]=JSTimersExecution.Type.requestAnimationFrame;
RCTTiming.createTimer(newID,1,Date.now(),false);
return newID;},


clearTimeout:function clearTimeout(timerID){
JSTimers._clearTimerID(timerID);},


clearInterval:function clearInterval(timerID){
JSTimers._clearTimerID(timerID);},


clearImmediate:function clearImmediate(timerID){
JSTimers._clearTimerID(timerID);
var index=JSTimersExecution.immediates.indexOf(timerID);
if(index!==-1){
JSTimersExecution.immediates.splice(index,1);}},



cancelAnimationFrame:function cancelAnimationFrame(timerID){
JSTimers._clearTimerID(timerID);},


_clearTimerID:function _clearTimerID(timerID){


if(timerID==null){
return;}


var index=JSTimersExecution.timerIDs.indexOf(timerID);

if(index!==-1){
JSTimersExecution._clearIndex(index);
if(JSTimersExecution.types[index]!==JSTimersExecution.Type.setImmediate){
RCTTiming.deleteTimer(timerID);}}}};





module.exports=JSTimers;
}, "JSTimers");
__d(12 /* NativeModules */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var RemoteModules=BatchedBridge.RemoteModules;

function normalizePrefix(moduleName){
return moduleName.replace(/^(RCT|RK)/,'');}





Object.keys(RemoteModules).forEach(function(moduleName){
var strippedName=normalizePrefix(moduleName);
if(RemoteModules['RCT'+strippedName]&&RemoteModules['RK'+strippedName]){
throw new Error(
'Module cannot be registered as both RCT and RK: '+moduleName);}


if(strippedName!==moduleName){
RemoteModules[strippedName]=RemoteModules[moduleName];
delete RemoteModules[moduleName];}});







var NativeModules={};
Object.keys(RemoteModules).forEach(function(moduleName){
Object.defineProperty(NativeModules,moduleName,{
configurable:true,
enumerable:true,
get:function get(){
var module=RemoteModules[moduleName];
if(module&&typeof module.moduleID==='number'&&global.nativeRequireModuleConfig){
var json=global.nativeRequireModuleConfig(moduleName);
var config=json&&JSON.parse(json);
module=config&&BatchedBridge.processModuleConfig(config,module.moduleID);
RemoteModules[moduleName]=module;}

Object.defineProperty(NativeModules,moduleName,{
configurable:true,
enumerable:true,
value:module});

return module;}});});




module.exports=NativeModules;
}, "NativeModules");
__d(13 /* Platform */, function(global, require, module, exports) {'use strict';













var Platform={
OS:'android',
get Version(){return require(12 /* NativeModules */).AndroidConstants.Version;},
select:function select(obj){return obj.android;}};


module.exports=Platform;
}, "Platform");
__d(14 /* stringifySafe */, function(global, require, module, exports) {'use strict';
















function stringifySafe(arg){
var ret;
var type=typeof arg;
if(arg===undefined){
ret='undefined';}else 
if(arg===null){
ret='null';}else 
if(type==='string'){
ret='"'+arg+'"';}else 
if(type==='function'){
try{
ret=arg.toString();}
catch(e){
ret='[function unknown]';}}else 

{


try{
ret=JSON.stringify(arg);}
catch(e){
if(typeof arg.toString==='function'){
try{
ret=arg.toString();}
catch(E){}}}}



return ret||'["'+type+'" failed to stringify]';}


module.exports=stringifySafe;
}, "stringifySafe");
__d(15 /* HeapCapture */, function(global, require, module, exports) {'use strict';












var HeapCapture={
captureHeap:function captureHeap(token,path){
var error=null;
try{
global.nativeCaptureHeap(path);
console.log('HeapCapture.captureHeap succeeded: '+path);}
catch(e){
console.log('HeapCapture.captureHeap error: '+e.toString());
error=e.toString();}

require(12 /* NativeModules */).JSCHeapCapture.operationComplete(token,error);}};



module.exports=HeapCapture;
}, "HeapCapture");
__d(16 /* HMRClient */, function(global, require, module, exports) {'use strict';












var Platform=require(13 /* Platform */);
var invariant=require(259 /* fbjs/lib/invariant */);





var HMRClient={
enable:function enable(platform,bundleEntry,host,port){
invariant(platform,'Missing required parameter `platform`');
invariant(bundleEntry,'Missing required paramenter `bundleEntry`');
invariant(host,'Missing required paramenter `host`');




var WebSocket=require(17 /* WebSocket */);

var wsHostPort=port!==null&&port!==''?
host+':'+port:
host;


var wsUrl='ws://'+wsHostPort+'/hot?'+('platform='+
platform+'&')+('bundleEntry='+
bundleEntry.replace('.bundle','.js'));

var activeWS=new WebSocket(wsUrl);
activeWS.onerror=function(e){
var error='Hot loading isn\'t working because it cannot connect to the development server.\n\nTry the following to fix the issue:\n- Ensure that the packager server is running and available on the same network';






if(Platform.OS==='ios'){
error+='\n- Ensure that the Packager server URL is correctly set in AppDelegate';}else 



{
error+='\n- Ensure that your device/emulator is connected to your machine and has USB debugging enabled - run \'adb devices\' to see a list of connected devices\n- If you\'re on a physical device connected to the same machine, run \'adb reverse tcp:8081 tcp:8081\' to forward requests from your device\n- If your device is on the same Wi-Fi network, set \'Debug server host & port for device\' in \'Dev settings\' to your machine\'s IP address and the port of the local dev server - e.g. 10.0.1.1:8081';}







error+='\n\nURL: '+


host+':'+port+'\n\nError: '+

e.message;


throw new Error(error);};

activeWS.onmessage=function(_ref){var data=_ref.data;

var HMRLoadingView=require(27 /* HMRLoadingView */);

data=JSON.parse(data);

switch(data.type){
case 'update-start':{
HMRLoadingView.showMessage('Hot Loading...');
break;}

case 'update':{var _ret=function(){var _data$body=





data.body;var modules=_data$body.modules;var sourceMappingURLs=_data$body.sourceMappingURLs;var sourceURLs=_data$body.sourceURLs;var inverseDependencies=_data$body.inverseDependencies;

if(Platform.OS==='ios'){
var RCTRedBox=require(12 /* NativeModules */).RedBox;
RCTRedBox&&RCTRedBox.dismiss&&RCTRedBox.dismiss();}else 
{
var RCTExceptionsManager=require(12 /* NativeModules */).ExceptionsManager;
RCTExceptionsManager&&RCTExceptionsManager.dismissRedbox&&RCTExceptionsManager.dismissRedbox();}


var serverHost=void 0;

if(Platform.OS==='android'){
serverHost=require(12 /* NativeModules */).AndroidConstants.ServerHost;}else 
{
serverHost=port?host+':'+port:host;}


modules.forEach(function(_ref2,i){var id=_ref2.id;var code=_ref2.code;
code=code+'\n\n'+sourceMappingURLs[i];

require(29 /* SourceMapsCache */).fetch({
text:code,
url:'http://'+serverHost+sourceURLs[i],
sourceMappingURL:sourceMappingURLs[i]});





var injectFunction=typeof global.nativeInjectHMRUpdate==='function'?
global.nativeInjectHMRUpdate:
eval;

code=['__accept(',

id+',','function(global,require,module,exports){',''+

code,
'\n},',''+
JSON.stringify(inverseDependencies),');'].

join('');

injectFunction(code,sourceURLs[i]);});


HMRLoadingView.hide();
return 'break';}();if(_ret==='break')break;}

case 'update-done':{
HMRLoadingView.hide();
break;}

case 'error':{
HMRLoadingView.hide();
throw new Error(data.body.type+' '+data.body.description);}

default:{
throw new Error('Unexpected message: '+data);}}};}};






module.exports=HMRClient;
}, "HMRClient");
__d(17 /* WebSocket */, function(global, require, module, exports) {'use strict';












var NativeEventEmitter=require(18 /* NativeEventEmitter */);
var Platform=require(13 /* Platform */);
var RCTWebSocketModule=require(12 /* NativeModules */).WebSocketModule;
var WebSocketEvent=require(26 /* WebSocketEvent */);

var EventTarget=require(287 /* event-target-shim */);
var base64=require(285 /* base64-js */);















var CONNECTING=0;
var OPEN=1;
var CLOSING=2;
var CLOSED=3;

var CLOSE_NORMAL=1000;

var WEBSOCKET_EVENTS=[
'close',
'error',
'message',
'open'];


var nextWebSocketId=0;var 







WebSocket=function(_EventTarget){babelHelpers.inherits(WebSocket,_EventTarget);


























function WebSocket(url,protocols,options){babelHelpers.classCallCheck(this,WebSocket);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(WebSocket).call(this));_this.CONNECTING=CONNECTING;_this.OPEN=OPEN;_this.CLOSING=CLOSING;_this.CLOSED=CLOSED;_this.readyState=CONNECTING;

if(typeof protocols==='string'){
protocols=[protocols];}


if(!Array.isArray(protocols)){
protocols=null;}


_this._eventEmitter=new NativeEventEmitter(RCTWebSocketModule);
_this._socketId=nextWebSocketId++;
RCTWebSocketModule.connect(url,protocols,options,_this._socketId);
_this._registerEvents();return _this;}babelHelpers.createClass(WebSocket,[{key:'close',value:function close(


code,reason){
if(this.readyState===this.CLOSING||
this.readyState===this.CLOSED){
return;}


this.readyState=this.CLOSING;
this._close(code,reason);}},{key:'send',value:function send(


data){
if(this.readyState===this.CONNECTING){
throw new Error('INVALID_STATE_ERR');}


if(typeof data==='string'){
RCTWebSocketModule.send(data,this._socketId);
return;}



if(typeof ArrayBuffer!=='undefined'&&
typeof Uint8Array!=='undefined'){
if(ArrayBuffer.isView(data)){

data=data.buffer;}

if(data instanceof ArrayBuffer){
data=base64.fromByteArray(new Uint8Array(data));
RCTWebSocketModule.sendBinary(data,this._socketId);
return;}}



throw new Error('Unsupported data type');}},{key:'_close',value:function _close(


code,reason){
if(Platform.OS==='android'){

var statusCode=typeof code==='number'?code:CLOSE_NORMAL;
var closeReason=typeof reason==='string'?reason:'';
RCTWebSocketModule.close(statusCode,closeReason,this._socketId);}else 
{
RCTWebSocketModule.close(this._socketId);}}},{key:'_unregisterEvents',value:function _unregisterEvents()



{
this._subscriptions.forEach(function(e){return e.remove();});
this._subscriptions=[];}},{key:'_registerEvents',value:function _registerEvents()


{var _this2=this;
this._subscriptions=[
this._eventEmitter.addListener('websocketMessage',function(ev){
if(ev.id!==_this2._socketId){
return;}

_this2.dispatchEvent(new WebSocketEvent('message',{
data:ev.type==='binary'?base64.toByteArray(ev.data).buffer:ev.data}));}),


this._eventEmitter.addListener('websocketOpen',function(ev){
if(ev.id!==_this2._socketId){
return;}

_this2.readyState=_this2.OPEN;
_this2.dispatchEvent(new WebSocketEvent('open'));}),

this._eventEmitter.addListener('websocketClosed',function(ev){
if(ev.id!==_this2._socketId){
return;}

_this2.readyState=_this2.CLOSED;
_this2.dispatchEvent(new WebSocketEvent('close',{
code:ev.code,
reason:ev.reason}));

_this2._unregisterEvents();
_this2.close();}),

this._eventEmitter.addListener('websocketFailed',function(ev){
if(ev.id!==_this2._socketId){
return;}

_this2.dispatchEvent(new WebSocketEvent('error',{
message:ev.message}));

_this2.dispatchEvent(new WebSocketEvent('close',{
message:ev.message}));

_this2._unregisterEvents();
_this2.close();})];}}]);return WebSocket;}(EventTarget.apply(undefined,WEBSOCKET_EVENTS));WebSocket.CONNECTING=CONNECTING;WebSocket.OPEN=OPEN;WebSocket.CLOSING=CLOSING;WebSocket.CLOSED=CLOSED;





module.exports=WebSocket;
}, "WebSocket");
__d(18 /* NativeEventEmitter */, function(global, require, module, exports) {'use strict';












var EventEmitter=require(19 /* EventEmitter */);
var Platform=require(13 /* Platform */);
var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);
var invariant=require(259 /* fbjs/lib/invariant */);var 







NativeEventEmitter=function(_EventEmitter){babelHelpers.inherits(NativeEventEmitter,_EventEmitter);



function NativeEventEmitter(nativeModule){babelHelpers.classCallCheck(this,NativeEventEmitter);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(NativeEventEmitter).call(this,
RCTDeviceEventEmitter.sharedSubscriber));
if(Platform.OS==='ios'){
invariant(nativeModule,'Native module cannot be null.');
_this._nativeModule=nativeModule;}return _this;}babelHelpers.createClass(NativeEventEmitter,[{key:'addListener',value:function addListener(



eventType,listener,context){
if(Platform.OS==='ios'){
this._nativeModule.addListener(eventType);}

return babelHelpers.get(Object.getPrototypeOf(NativeEventEmitter.prototype),'addListener',this).call(this,eventType,listener,context);}},{key:'removeAllListeners',value:function removeAllListeners(


eventType){
invariant(eventType,'eventType argument is required.');
if(Platform.OS==='ios'){
var count=this.listeners(eventType).length;
this._nativeModule.removeListeners(count);}

babelHelpers.get(Object.getPrototypeOf(NativeEventEmitter.prototype),'removeAllListeners',this).call(this,eventType);}},{key:'removeSubscription',value:function removeSubscription(


subscription){
if(Platform.OS==='ios'){
this._nativeModule.removeListeners(1);}

babelHelpers.get(Object.getPrototypeOf(NativeEventEmitter.prototype),'removeSubscription',this).call(this,subscription);}}]);return NativeEventEmitter;}(EventEmitter);



module.exports=NativeEventEmitter;
}, "NativeEventEmitter");
__d(19 /* EventEmitter */, function(global, require, module, exports) {var 












EmitterSubscription=require(20 /* EmitterSubscription */);
var EventSubscriptionVendor=require(22 /* EventSubscriptionVendor */);
var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);
var invariant=require(259 /* fbjs/lib/invariant */);var 














EventEmitter=function(){










function EventEmitter(subscriber){babelHelpers.classCallCheck(this,EventEmitter);
this._subscriber=subscriber||new EventSubscriptionVendor();}babelHelpers.createClass(EventEmitter,[{key:'addListener',value:function addListener(

















eventType,listener,context){

return this._subscriber.addSubscription(
eventType,
new EmitterSubscription(this,this._subscriber,listener,context));}},{key:'once',value:function once(













eventType,listener,context){var _this=this,_arguments=arguments;
return this.addListener(eventType,function(){
_this.removeCurrentListener();
listener.apply(context,_arguments);});}},{key:'removeAllListeners',value:function removeAllListeners(










eventType){
this._subscriber.removeAllSubscriptions(eventType);}},{key:'removeCurrentListener',value:function removeCurrentListener()























{
invariant(
!!this._currentSubscription,
'Not in an emitting cycle; there is no current subscription');

this.removeSubscription(this._currentSubscription);}},{key:'removeSubscription',value:function removeSubscription(






subscription){
invariant(
subscription.emitter===this,
'Subscription does not belong to this emitter.');

this._subscriber.removeSubscription(subscription);}},{key:'listeners',value:function listeners(









eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
return subscriptions?
subscriptions.filter(emptyFunction.thatReturnsTrue).map(
function(subscription){
return subscription.listener;}):

[];}},{key:'emit',value:function emit(
















eventType){
var subscriptions=this._subscriber.getSubscriptionsForType(eventType);
if(subscriptions){
for(var i=0,l=subscriptions.length;i<l;i++){
var subscription=subscriptions[i];


if(subscription){
this._currentSubscription=subscription;
subscription.listener.apply(
subscription.context,
Array.prototype.slice.call(arguments,1));}}



this._currentSubscription=null;}}}]);return EventEmitter;}();




module.exports=EventEmitter;
}, "EventEmitter");
__d(20 /* EmitterSubscription */, function(global, require, module, exports) {'use strict';













var EventSubscription=require(21 /* EventSubscription */);var 







EmitterSubscription=function(_EventSubscription){babelHelpers.inherits(EmitterSubscription,_EventSubscription);















function EmitterSubscription(
emitter,
subscriber,
listener,
context)
{babelHelpers.classCallCheck(this,EmitterSubscription);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(EmitterSubscription).call(this,
subscriber));
_this.emitter=emitter;
_this.listener=listener;
_this.context=context;return _this;}babelHelpers.createClass(EmitterSubscription,[{key:'remove',value:function remove()








{
this.emitter.removeSubscription(this);}}]);return EmitterSubscription;}(EventSubscription);



module.exports=EmitterSubscription;
}, "EmitterSubscription");
__d(21 /* EventSubscription */, function(global, require, module, exports) {'use strict';var 


















EventSubscription=function(){









function EventSubscription(subscriber){babelHelpers.classCallCheck(this,EventSubscription);
this.subscriber=subscriber;}babelHelpers.createClass(EventSubscription,[{key:'remove',value:function remove()





{
this.subscriber.removeSubscription(this);}}]);return EventSubscription;}();



module.exports=EventSubscription;
}, "EventSubscription");
__d(22 /* EventSubscriptionVendor */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);var 







EventSubscriptionVendor=function(){




function EventSubscriptionVendor(){babelHelpers.classCallCheck(this,EventSubscriptionVendor);
this._subscriptionsForType={};
this._currentSubscription=null;}babelHelpers.createClass(EventSubscriptionVendor,[{key:'addSubscription',value:function addSubscription(









eventType,subscription){
invariant(
subscription.subscriber===this,
'The subscriber of the subscription is incorrectly set.');
if(!this._subscriptionsForType[eventType]){
this._subscriptionsForType[eventType]=[];}

var key=this._subscriptionsForType[eventType].length;
this._subscriptionsForType[eventType].push(subscription);
subscription.eventType=eventType;
subscription.key=key;
return subscription;}},{key:'removeAllSubscriptions',value:function removeAllSubscriptions(








eventType){
if(eventType===undefined){
this._subscriptionsForType={};}else 
{
delete this._subscriptionsForType[eventType];}}},{key:'removeSubscription',value:function removeSubscription(









subscription){
var eventType=subscription.eventType;
var key=subscription.key;

var subscriptionsForType=this._subscriptionsForType[eventType];
if(subscriptionsForType){
delete subscriptionsForType[key];}}},{key:'getSubscriptionsForType',value:function getSubscriptionsForType(















eventType){
return this._subscriptionsForType[eventType];}}]);return EventSubscriptionVendor;}();



module.exports=EventSubscriptionVendor;
}, "EventSubscriptionVendor");
__d(23 /* RCTDeviceEventEmitter */, function(global, require, module, exports) {'use strict';












var EventEmitter=require(19 /* EventEmitter */);
var EventSubscriptionVendor=require(22 /* EventSubscriptionVendor */);
var BatchedBridge=require(2 /* BatchedBridge */);var 







RCTDeviceEventEmitter=function(_EventEmitter){babelHelpers.inherits(RCTDeviceEventEmitter,_EventEmitter);



function RCTDeviceEventEmitter(){babelHelpers.classCallCheck(this,RCTDeviceEventEmitter);
var sharedSubscriber=new EventSubscriptionVendor();var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(RCTDeviceEventEmitter).call(this,
sharedSubscriber));
_this.sharedSubscriber=sharedSubscriber;return _this;}babelHelpers.createClass(RCTDeviceEventEmitter,[{key:'addListener',value:function addListener(


eventType,listener,context){
if(eventType.lastIndexOf('statusBar',0)===0){
console.warn('`%s` event should be registered via the StatusBarIOS module',eventType);
return require(24 /* StatusBarIOS */).addListener(eventType,listener,context);}

if(eventType.lastIndexOf('keyboard',0)===0){
console.warn('`%s` event should be registered via the Keyboard module',eventType);
return require(25 /* Keyboard */).addListener(eventType,listener,context);}

return babelHelpers.get(Object.getPrototypeOf(RCTDeviceEventEmitter.prototype),'addListener',this).call(this,eventType,listener,context);}},{key:'removeAllListeners',value:function removeAllListeners(


eventType){
if(eventType){
if(eventType.lastIndexOf('statusBar',0)===0){
console.warn('statusBar events should be unregistered via the StatusBarIOS module');
return require(24 /* StatusBarIOS */).removeAllListeners(eventType);}

if(eventType.lastIndexOf('keyboard',0)===0){
console.warn('keyboard events should be unregistered via the Keyboard module');
return require(25 /* Keyboard */).removeAllListeners(eventType);}}


babelHelpers.get(Object.getPrototypeOf(RCTDeviceEventEmitter.prototype),'removeAllListeners',this).call(this,eventType);}},{key:'removeSubscription',value:function removeSubscription(


subscription){
if(subscription.emitter!==this){
subscription.emitter.removeSubscription(subscription);}else 
{
babelHelpers.get(Object.getPrototypeOf(RCTDeviceEventEmitter.prototype),'removeSubscription',this).call(this,subscription);}}}]);return RCTDeviceEventEmitter;}(EventEmitter);




RCTDeviceEventEmitter=new RCTDeviceEventEmitter();

BatchedBridge.registerCallableModule(
'RCTDeviceEventEmitter',
RCTDeviceEventEmitter);


module.exports=RCTDeviceEventEmitter;
}, "RCTDeviceEventEmitter");
__d(24 /* StatusBarIOS */, function(global, require, module, exports) {'use strict';












var NativeEventEmitter=require(18 /* NativeEventEmitter */);

module.exports=new NativeEventEmitter('StatusBarManager');
}, "StatusBarIOS");
__d(25 /* Keyboard */, function(global, require, module, exports) {'use strict';












var NativeEventEmitter=require(18 /* NativeEventEmitter */);
var KeyboardObserver=require(12 /* NativeModules */).KeyboardObserver;

module.exports=new NativeEventEmitter(KeyboardObserver);
}, "Keyboard");
__d(26 /* WebSocketEvent */, function(global, require, module, exports) {'use strict';var 




















WebSocketEvent=
function WebSocketEvent(type,eventInitDict){babelHelpers.classCallCheck(this,WebSocketEvent);
this.type=type.toString();
babelHelpers.extends(this,eventInitDict);};



module.exports=WebSocketEvent;
}, "WebSocketEvent");
__d(287 /* event-target-shim/lib/event-target.js */, function(global, require, module, exports) {"use strict";











var Commons=require(264 /* ./commons */);
var CustomEventTarget=require(273 /* ./custom-event-target */);
var EventWrapper=require(270 /* ./event-wrapper */);
var LISTENERS=Commons.LISTENERS;
var CAPTURE=Commons.CAPTURE;
var BUBBLE=Commons.BUBBLE;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;
var defineCustomEventTarget=CustomEventTarget.defineCustomEventTarget;
var createEventWrapper=EventWrapper.createEventWrapper;
var STOP_IMMEDIATE_PROPAGATION_FLAG=
EventWrapper.STOP_IMMEDIATE_PROPAGATION_FLAG;











var HAS_EVENTTARGET_INTERFACE=
typeof window!=="undefined"&&
typeof window.EventTarget!=="undefined";












var EventTarget=module.exports=function EventTarget(){
if(this instanceof EventTarget){









Object.defineProperty(this,LISTENERS,{value:Object.create(null)});}else 

if(arguments.length===1&&Array.isArray(arguments[0])){
return defineCustomEventTarget(EventTarget,arguments[0]);}else 

if(arguments.length>0){
var types=Array(arguments.length);
for(var i=0;i<arguments.length;++i){
types[i]=arguments[i];}







return defineCustomEventTarget(EventTarget,types);}else 

{
throw new TypeError("Cannot call a class as a function");}};



EventTarget.prototype=Object.create(
(HAS_EVENTTARGET_INTERFACE?window.EventTarget:Object).prototype,
{
constructor:{
value:EventTarget,
writable:true,
configurable:true},


addEventListener:{
value:function addEventListener(type,listener,capture){
if(listener==null){
return false;}

if(typeof listener!=="function"&&typeof listener!=="object"){
throw new TypeError("\"listener\" is not an object.");}


var kind=capture?CAPTURE:BUBBLE;
var node=this[LISTENERS][type];
if(node==null){
this[LISTENERS][type]=newNode(listener,kind);
return true;}


var prev=null;
while(node!=null){
if(node.listener===listener&&node.kind===kind){

return false;}

prev=node;
node=node.next;}


prev.next=newNode(listener,kind);
return true;},

configurable:true,
writable:true},


removeEventListener:{
value:function removeEventListener(type,listener,capture){
if(listener==null){
return false;}


var kind=capture?CAPTURE:BUBBLE;
var prev=null;
var node=this[LISTENERS][type];
while(node!=null){
if(node.listener===listener&&node.kind===kind){
if(prev==null){
this[LISTENERS][type]=node.next;}else 

{
prev.next=node.next;}

return true;}


prev=node;
node=node.next;}


return false;},

configurable:true,
writable:true},


dispatchEvent:{
value:function dispatchEvent(event){

var node=this[LISTENERS][event.type];
if(node==null){
return true;}



var wrapped=createEventWrapper(event,this);



while(node!=null){
if(typeof node.listener==="function"){
node.listener.call(this,wrapped);}else 

if(node.kind!==ATTRIBUTE&&typeof node.listener.handleEvent==="function"){
node.listener.handleEvent(wrapped);}


if(wrapped[STOP_IMMEDIATE_PROPAGATION_FLAG]){
break;}

node=node.next;}


return !wrapped.defaultPrevented;},

configurable:true,
writable:true}});
}, "event-target-shim/lib/event-target.js");
__d(264 /* event-target-shim/lib/commons.js */, function(global, require, module, exports) {"use strict";














var createUniqueKey=exports.createUniqueKey=typeof Symbol!=="undefined"?
Symbol:
function createUniqueKey(name){
return "[["+name+"_"+Math.random().toFixed(8).slice(2)+"]]";};








exports.LISTENERS=createUniqueKey("listeners");







exports.CAPTURE=1;







exports.BUBBLE=2;







exports.ATTRIBUTE=3;
















exports.newNode=function newNode(listener,kind){
return {listener:listener,kind:kind,next:null};};
}, "event-target-shim/lib/commons.js");
__d(273 /* event-target-shim/lib/custom-event-target.js */, function(global, require, module, exports) {"use strict";











var Commons=require(264 /* ./commons */);
var LISTENERS=Commons.LISTENERS;
var ATTRIBUTE=Commons.ATTRIBUTE;
var newNode=Commons.newNode;












function getAttributeListener(eventTarget,type){
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){
return node.listener;}

node=node.next;}

return null;}










function setAttributeListener(eventTarget,type,listener){
if(typeof listener!=="function"&&typeof listener!=="object"){
listener=null;}


var prev=null;
var node=eventTarget[LISTENERS][type];
while(node!=null){
if(node.kind===ATTRIBUTE){

if(prev==null){
eventTarget[LISTENERS][type]=node.next;}else 

{
prev.next=node.next;}}else 


{
prev=node;}


node=node.next;}



if(listener!=null){
if(prev==null){
eventTarget[LISTENERS][type]=newNode(listener,ATTRIBUTE);}else 

{
prev.next=newNode(listener,ATTRIBUTE);}}}















exports.defineCustomEventTarget=function(EventTargetBase,types){
function EventTarget(){
EventTargetBase.call(this);}


var descripter={
constructor:{
value:EventTarget,
configurable:true,
writable:true}};



types.forEach(function(type){
descripter["on"+type]={
get:function get(){return getAttributeListener(this,type);},
set:function set(listener){setAttributeListener(this,type,listener);},
configurable:true,
enumerable:true};});



EventTarget.prototype=Object.create(EventTargetBase.prototype,descripter);

return EventTarget;};
}, "event-target-shim/lib/custom-event-target.js");
__d(270 /* event-target-shim/lib/event-wrapper.js */, function(global, require, module, exports) {"use strict";











var createUniqueKey=require(264 /* ./commons */).createUniqueKey;











var STOP_IMMEDIATE_PROPAGATION_FLAG=
createUniqueKey("stop_immediate_propagation_flag");







var CANCELED_FLAG=createUniqueKey("canceled_flag");







var ORIGINAL_EVENT=createUniqueKey("original_event");







var wrapperPrototypeDefinition=Object.freeze({
stopPropagation:Object.freeze({
value:function stopPropagation(){
var e=this[ORIGINAL_EVENT];
if(typeof e.stopPropagation==="function"){
e.stopPropagation();}},


writable:true,
configurable:true}),


stopImmediatePropagation:Object.freeze({
value:function stopImmediatePropagation(){
this[STOP_IMMEDIATE_PROPAGATION_FLAG]=true;

var e=this[ORIGINAL_EVENT];
if(typeof e.stopImmediatePropagation==="function"){
e.stopImmediatePropagation();}},


writable:true,
configurable:true}),


preventDefault:Object.freeze({
value:function preventDefault(){
if(this.cancelable===true){
this[CANCELED_FLAG]=true;}


var e=this[ORIGINAL_EVENT];
if(typeof e.preventDefault==="function"){
e.preventDefault();}},


writable:true,
configurable:true}),


defaultPrevented:Object.freeze({
get:function defaultPrevented(){return this[CANCELED_FLAG];},
enumerable:true,
configurable:true})});







exports.STOP_IMMEDIATE_PROPAGATION_FLAG=STOP_IMMEDIATE_PROPAGATION_FLAG;












exports.createEventWrapper=function createEventWrapper(event,eventTarget){
var timeStamp=
typeof event.timeStamp==="number"?event.timeStamp:Date.now();

var propertyDefinition={
type:{value:event.type,enumerable:true},
target:{value:eventTarget,enumerable:true},
currentTarget:{value:eventTarget,enumerable:true},
eventPhase:{value:2,enumerable:true},
bubbles:{value:Boolean(event.bubbles),enumerable:true},
cancelable:{value:Boolean(event.cancelable),enumerable:true},
timeStamp:{value:timeStamp,enumerable:true},
isTrusted:{value:false,enumerable:true}};

propertyDefinition[STOP_IMMEDIATE_PROPAGATION_FLAG]={value:false,writable:true};
propertyDefinition[CANCELED_FLAG]={value:false,writable:true};
propertyDefinition[ORIGINAL_EVENT]={value:event};


if(typeof event.detail!=="undefined"){
propertyDefinition.detail={value:event.detail,enumerable:true};}


return Object.create(
Object.create(event,wrapperPrototypeDefinition),
propertyDefinition);};
}, "event-target-shim/lib/event-wrapper.js");
__d(285 /* base64-js/lib/b64.js */, function(global, require, module, exports) {var lookup='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function(exports){
'use strict';

var Arr=typeof Uint8Array!=='undefined'?
Uint8Array:
Array;

var PLUS='+'.charCodeAt(0);
var SLASH='/'.charCodeAt(0);
var NUMBER='0'.charCodeAt(0);
var LOWER='a'.charCodeAt(0);
var UPPER='A'.charCodeAt(0);
var PLUS_URL_SAFE='-'.charCodeAt(0);
var SLASH_URL_SAFE='_'.charCodeAt(0);

function decode(elt){
var code=elt.charCodeAt(0);
if(code===PLUS||
code===PLUS_URL_SAFE)
return 62;
if(code===SLASH||
code===SLASH_URL_SAFE)
return 63;
if(code<NUMBER)
return -1;
if(code<NUMBER+10)
return code-NUMBER+26+26;
if(code<UPPER+26)
return code-UPPER;
if(code<LOWER+26)
return code-LOWER+26;}


function b64ToByteArray(b64){
var i,j,l,tmp,placeHolders,arr;

if(b64.length%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');}







var len=b64.length;
placeHolders='='===b64.charAt(len-2)?2:'='===b64.charAt(len-1)?1:0;


arr=new Arr(b64.length*3/4-placeHolders);


l=placeHolders>0?b64.length-4:b64.length;

var L=0;

function push(v){
arr[L++]=v;}


for(i=0,j=0;i<l;i+=4,j+=3){
tmp=decode(b64.charAt(i))<<18|decode(b64.charAt(i+1))<<12|decode(b64.charAt(i+2))<<6|decode(b64.charAt(i+3));
push((tmp&0xFF0000)>>16);
push((tmp&0xFF00)>>8);
push(tmp&0xFF);}


if(placeHolders===2){
tmp=decode(b64.charAt(i))<<2|decode(b64.charAt(i+1))>>4;
push(tmp&0xFF);}else 
if(placeHolders===1){
tmp=decode(b64.charAt(i))<<10|decode(b64.charAt(i+1))<<4|decode(b64.charAt(i+2))>>2;
push(tmp>>8&0xFF);
push(tmp&0xFF);}


return arr;}


function uint8ToBase64(uint8){
var i,
extraBytes=uint8.length%3,
output="",
temp,length;

function encode(num){
return lookup.charAt(num);}


function tripletToBase64(num){
return encode(num>>18&0x3F)+encode(num>>12&0x3F)+encode(num>>6&0x3F)+encode(num&0x3F);}



for(i=0,length=uint8.length-extraBytes;i<length;i+=3){
temp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output+=tripletToBase64(temp);}



switch(extraBytes){
case 1:
temp=uint8[uint8.length-1];
output+=encode(temp>>2);
output+=encode(temp<<4&0x3F);
output+='==';
break;
case 2:
temp=(uint8[uint8.length-2]<<8)+uint8[uint8.length-1];
output+=encode(temp>>10);
output+=encode(temp>>4&0x3F);
output+=encode(temp<<2&0x3F);
output+='=';
break;}


return output;}


exports.toByteArray=b64ToByteArray;
exports.fromByteArray=uint8ToBase64;})(
typeof exports==='undefined'?this.base64js={}:exports);
}, "base64-js/lib/b64.js");
__d(27 /* HMRLoadingView */, function(global, require, module, exports) {'use strict';













var ToastAndroid=require(28 /* ToastAndroid */);

var TOAST_SHORT_DELAY=2000;var 

HMRLoadingView=function(){function HMRLoadingView(){babelHelpers.classCallCheck(this,HMRLoadingView);}babelHelpers.createClass(HMRLoadingView,null,[{key:'showMessage',value:function showMessage(


message){
if(HMRLoadingView._showing){
return;}

ToastAndroid.show(message,ToastAndroid.SHORT);
HMRLoadingView._showing=true;
setTimeout(function(){
HMRLoadingView._showing=false;},
TOAST_SHORT_DELAY);}},{key:'hide',value:function hide()


{}}]);return HMRLoadingView;}();




module.exports=HMRLoadingView;
}, "HMRLoadingView");
__d(28 /* ToastAndroid */, function(global, require, module, exports) {'use strict';












var RCTToastAndroid=require(12 /* NativeModules */).ToastAndroid;









var ToastAndroid={

SHORT:RCTToastAndroid.SHORT,
LONG:RCTToastAndroid.LONG,

show:function show(
message,
duration)
{
RCTToastAndroid.show(message,duration);}};




module.exports=ToastAndroid;
}, "ToastAndroid");
__d(29 /* SourceMapsCache */, function(global, require, module, exports) {'use strict';











var getObjectValues=require(30 /* getObjectValues */);
var SourceMapsUtils=require(31 /* SourceMapsUtils */);

var sourceMapsCache={};

var SourceMapsCache={
mainSourceMapID:'main',

fetch:function fetch(_ref){var text=_ref.text;var url=_ref.url;var fullSourceMappingURL=_ref.fullSourceMappingURL;
var sourceMappingURL=fullSourceMappingURL?
fullSourceMappingURL:
SourceMapsUtils.extractSourceMapURL({text:text,url:url});

sourceMapsCache[sourceMappingURL]=SourceMapsUtils.fetchSourceMap(
sourceMappingURL);},



getSourceMaps:function getSourceMaps(){
fetchMainSourceMap();
return Promise.all(getObjectValues(sourceMapsCache));}};



function fetchMainSourceMap(){
if(!sourceMapsCache[SourceMapsCache.mainSourceMapID]){
sourceMapsCache[SourceMapsCache.mainSourceMapID]=
SourceMapsUtils.fetchMainSourceMap();}}



module.exports=SourceMapsCache;
}, "SourceMapsCache");
__d(30 /* getObjectValues */, function(global, require, module, exports) {function 


























getObjectValues(obj){
var values=[];
for(var key in obj){
values.push(obj[key]);}

return values;}


module.exports=getObjectValues;
}, "getObjectValues");
__d(31 /* SourceMapsUtils */, function(global, require, module, exports) {'use strict';













var Promise=require(32 /* Promise */);
var NativeModules=require(12 /* NativeModules */);
var SourceMapConsumer=require(33 /* SourceMap */).SourceMapConsumer;
var SourceMapURL=require(252 /* ./source-map-url */);

var RCTSourceCode=NativeModules.SourceCode;
var RCTNetworking=NativeModules.Networking;

var SourceMapsUtils={
fetchMainSourceMap:function fetchMainSourceMap(){
return SourceMapsUtils._getMainSourceMapURL().then(function(url){return (
SourceMapsUtils.fetchSourceMap(url));});},



fetchSourceMap:function fetchSourceMap(sourceMappingURL){
return fetch(sourceMappingURL).
then(function(response){return response.text();}).
then(function(map){return new SourceMapConsumer(map);});},


extractSourceMapURL:function extractSourceMapURL(data){
var url=data.url;
var text=data.text;
var fullSourceMappingURL=data.fullSourceMappingURL;
if(fullSourceMappingURL){
return fullSourceMappingURL;}

var mapURL=SourceMapURL.getFrom(text);
if(!mapURL){
return null;}

if(!url){
return null;}

var baseURLs=url.match(/(.+:\/\/.*?)\//);
if(!baseURLs||baseURLs.length<2){
return null;}

return baseURLs[1]+mapURL;},


_getMainSourceMapURL:function _getMainSourceMapURL(){
if(global.RAW_SOURCE_MAP){
return Promise.resolve(global.RAW_SOURCE_MAP);}


if(!RCTSourceCode){
return Promise.reject(new Error('RCTSourceCode module is not available'));}


if(!RCTNetworking){

return Promise.reject(new Error('RCTNetworking module is not available'));}


var scriptText=RCTSourceCode.getScriptText();
if(scriptText){
return scriptText.
then(SourceMapsUtils.extractSourceMapURL).
then(function(url){
if(url===null){
return Promise.reject(new Error('No source map URL found. May be running from bundled file.'));}

return Promise.resolve(url);});}else 

{

return Promise.reject(new Error('Couldn\'t fetch script text'));}}};




module.exports=SourceMapsUtils;
}, "SourceMapsUtils");
__d(32 /* Promise */, function(global, require, module, exports) {'use strict';












var Promise=require(257 /* fbjs/lib/Promise.native */);

if(__DEV__){
require(295 /* promise/setimmediate/rejection-tracking */).enable({
allRejections:true,
onUnhandled:function onUnhandled(id,error){var 
message=error.message;var stack=error.stack;
var warning=
'Possible Unhandled Promise Rejection (id: '+id+'):\n'+(
message==null?'':message+'\n')+(
stack==null?'':stack);
console.warn(warning);},

onHandled:function onHandled(id){
var warning=
'Promise Rejection Handled (id: '+id+')\n'+
'This means you can ignore any previous messages of the form '+('"Possible Unhandled Promise Rejection (id: '+
id+'):"');
console.warn(warning);}});}




module.exports=Promise;
}, "Promise");
__d(257 /* fbjs/lib/Promise.native.js */, function(global, require, module, exports) {'use strict';














var Promise=require(271 /* promise/setimmediate/es6-extensions */);
require(260 /* promise/setimmediate/done */);




Promise.prototype['finally']=function(onSettled){
return this.then(onSettled,onSettled);};


module.exports=Promise;
}, "fbjs/lib/Promise.native.js");
__d(271 /* promise/setimmediate/es6-extensions.js */, function(global, require, module, exports) {'use strict';



var Promise=require(291 /* ./core.js */);

module.exports=Promise;



var TRUE=valuePromise(true);
var FALSE=valuePromise(false);
var NULL=valuePromise(null);
var UNDEFINED=valuePromise(undefined);
var ZERO=valuePromise(0);
var EMPTYSTRING=valuePromise('');

function valuePromise(value){
var p=new Promise(Promise._61);
p._81=1;
p._65=value;
return p;}

Promise.resolve=function(value){
if(value instanceof Promise)return value;

if(value===null)return NULL;
if(value===undefined)return UNDEFINED;
if(value===true)return TRUE;
if(value===false)return FALSE;
if(value===0)return ZERO;
if(value==='')return EMPTYSTRING;

if(typeof value==='object'||typeof value==='function'){
try{
var then=value.then;
if(typeof then==='function'){
return new Promise(then.bind(value));}}

catch(ex){
return new Promise(function(resolve,reject){
reject(ex);});}}



return valuePromise(value);};


Promise.all=function(arr){
var args=Array.prototype.slice.call(arr);

return new Promise(function(resolve,reject){
if(args.length===0)return resolve([]);
var remaining=args.length;
function res(i,val){
if(val&&(typeof val==='object'||typeof val==='function')){
if(val instanceof Promise&&val.then===Promise.prototype.then){
while(val._81===3){
val=val._65;}

if(val._81===1)return res(i,val._65);
if(val._81===2)reject(val._65);
val.then(function(val){
res(i,val);},
reject);
return;}else 
{
var then=val.then;
if(typeof then==='function'){
var p=new Promise(then.bind(val));
p.then(function(val){
res(i,val);},
reject);
return;}}}



args[i]=val;
if(--remaining===0){
resolve(args);}}


for(var i=0;i<args.length;i++){
res(i,args[i]);}});};




Promise.reject=function(value){
return new Promise(function(resolve,reject){
reject(value);});};



Promise.race=function(values){
return new Promise(function(resolve,reject){
values.forEach(function(value){
Promise.resolve(value).then(resolve,reject);});});};






Promise.prototype['catch']=function(onRejected){
return this.then(null,onRejected);};
}, "promise/setimmediate/es6-extensions.js");
__d(291 /* promise/setimmediate/core.js */, function(global, require, module, exports) {'use strict';



function noop(){}


















var LAST_ERROR=null;
var IS_ERROR={};
function getThen(obj){
try{
return obj.then;}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



function tryCallOne(fn,a){
try{
return fn(a);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}


function tryCallTwo(fn,a,b){
try{
fn(a,b);}
catch(ex){
LAST_ERROR=ex;
return IS_ERROR;}}



module.exports=Promise;

function Promise(fn){
if(typeof this!=='object'){
throw new TypeError('Promises must be constructed via new');}

if(typeof fn!=='function'){
throw new TypeError('not a function');}

this._45=0;
this._81=0;
this._65=null;
this._54=null;
if(fn===noop)return;
doResolve(fn,this);}

Promise._10=null;
Promise._97=null;
Promise._61=noop;

Promise.prototype.then=function(onFulfilled,onRejected){
if(this.constructor!==Promise){
return safeThen(this,onFulfilled,onRejected);}

var res=new Promise(noop);
handle(this,new Handler(onFulfilled,onRejected,res));
return res;};


function safeThen(self,onFulfilled,onRejected){
return new self.constructor(function(resolve,reject){
var res=new Promise(noop);
res.then(resolve,reject);
handle(self,new Handler(onFulfilled,onRejected,res));});}

;
function handle(self,deferred){
while(self._81===3){
self=self._65;}

if(Promise._10){
Promise._10(self);}

if(self._81===0){
if(self._45===0){
self._45=1;
self._54=deferred;
return;}

if(self._45===1){
self._45=2;
self._54=[self._54,deferred];
return;}

self._54.push(deferred);
return;}

handleResolved(self,deferred);}


function handleResolved(self,deferred){
setImmediate(function(){
var cb=self._81===1?deferred.onFulfilled:deferred.onRejected;
if(cb===null){
if(self._81===1){
resolve(deferred.promise,self._65);}else 
{
reject(deferred.promise,self._65);}

return;}

var ret=tryCallOne(cb,self._65);
if(ret===IS_ERROR){
reject(deferred.promise,LAST_ERROR);}else 
{
resolve(deferred.promise,ret);}});}



function resolve(self,newValue){

if(newValue===self){
return reject(
self,
new TypeError('A promise cannot be resolved with itself.'));}


if(
newValue&&(
typeof newValue==='object'||typeof newValue==='function'))
{
var then=getThen(newValue);
if(then===IS_ERROR){
return reject(self,LAST_ERROR);}

if(
then===self.then&&
newValue instanceof Promise)
{
self._81=3;
self._65=newValue;
finale(self);
return;}else 
if(typeof then==='function'){
doResolve(then.bind(newValue),self);
return;}}


self._81=1;
self._65=newValue;
finale(self);}


function reject(self,newValue){
self._81=2;
self._65=newValue;
if(Promise._97){
Promise._97(self,newValue);}

finale(self);}

function finale(self){
if(self._45===1){
handle(self,self._54);
self._54=null;}

if(self._45===2){
for(var i=0;i<self._54.length;i++){
handle(self,self._54[i]);}

self._54=null;}}



function Handler(onFulfilled,onRejected,promise){
this.onFulfilled=typeof onFulfilled==='function'?onFulfilled:null;
this.onRejected=typeof onRejected==='function'?onRejected:null;
this.promise=promise;}








function doResolve(fn,promise){
var done=false;
var res=tryCallTwo(fn,function(value){
if(done)return;
done=true;
resolve(promise,value);},
function(reason){
if(done)return;
done=true;
reject(promise,reason);});

if(!done&&res===IS_ERROR){
done=true;
reject(promise,LAST_ERROR);}}
}, "promise/setimmediate/core.js");
__d(260 /* promise/setimmediate/done.js */, function(global, require, module, exports) {'use strict';

var Promise=require(291 /* ./core.js */);

module.exports=Promise;
Promise.prototype.done=function(onFulfilled,onRejected){
var self=arguments.length?this.then.apply(this,arguments):this;
self.then(null,function(err){
setTimeout(function(){
throw err;},
0);});};
}, "promise/setimmediate/done.js");
__d(295 /* promise/setimmediate/rejection-tracking.js */, function(global, require, module, exports) {'use strict';

var Promise=require(291 /* ./core */);

var DEFAULT_WHITELIST=[
ReferenceError,
TypeError,
RangeError];


var enabled=false;
exports.disable=disable;
function disable(){
enabled=false;
Promise._10=null;
Promise._97=null;}


exports.enable=enable;
function enable(options){
options=options||{};
if(enabled)disable();
enabled=true;
var id=0;
var displayId=0;
var rejections={};
Promise._10=function(promise){
if(
promise._81===2&&
rejections[promise._72])
{
if(rejections[promise._72].logged){
onHandled(promise._72);}else 
{
clearTimeout(rejections[promise._72].timeout);}

delete rejections[promise._72];}};


Promise._97=function(promise,err){
if(promise._45===0){
promise._72=id++;
rejections[promise._72]={
displayId:null,
error:err,
timeout:setTimeout(
onUnhandled.bind(null,promise._72),




matchWhitelist(err,DEFAULT_WHITELIST)?
100:
2000),

logged:false};}};



function onUnhandled(id){
if(
options.allRejections||
matchWhitelist(
rejections[id].error,
options.whitelist||DEFAULT_WHITELIST))

{
rejections[id].displayId=displayId++;
if(options.onUnhandled){
rejections[id].logged=true;
options.onUnhandled(
rejections[id].displayId,
rejections[id].error);}else 

{
rejections[id].logged=true;
logError(
rejections[id].displayId,
rejections[id].error);}}}




function onHandled(id){
if(rejections[id].logged){
if(options.onHandled){
options.onHandled(rejections[id].displayId,rejections[id].error);}else 
if(!rejections[id].onUnhandled){
console.warn(
'Promise Rejection Handled (id: '+rejections[id].displayId+'):');

console.warn(
'  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+
rejections[id].displayId+'.');}}}}






function logError(id,error){
console.warn('Possible Unhandled Promise Rejection (id: '+id+'):');
var errStr=(error&&(error.stack||error))+'';
errStr.split('\n').forEach(function(line){
console.warn('  '+line);});}



function matchWhitelist(error,list){
return list.some(function(cls){
return error instanceof cls;});}
}, "promise/setimmediate/rejection-tracking.js");
__d(33 /* SourceMap */, function(global, require, module, exports) {var 























scope={};
wrapper.call(scope);

module.exports=scope.sourceMap;

function wrapper(){














function define(moduleName,deps,payload){
if(typeof moduleName!="string"){
throw new TypeError('Expected string, got: '+moduleName);}


if(arguments.length==2){
payload=deps;}


if(moduleName in define.modules){
throw new Error("Module already defined: "+moduleName);}

define.modules[moduleName]=payload;}
;




define.modules={};










function Domain(){
this.modules={};
this._currentModule=null;}


(function(){
















Domain.prototype.require=function(deps,callback){
if(Array.isArray(deps)){
var params=deps.map(function(dep){
return this.lookup(dep);},
this);
if(callback){
callback.apply(null,params);}

return undefined;}else 

{
return this.lookup(deps);}};



function normalize(path){
var bits=path.split('/');
var i=1;
while(i<bits.length){
if(bits[i]==='..'){
bits.splice(i-1,1);}else 
if(bits[i]==='.'){
bits.splice(i,1);}else 
{
i++;}}


return bits.join('/');}


function join(a,b){
a=a.trim();
b=b.trim();
if(/^\//.test(b)){
return b;}else 
{
return a.replace(/\/*$/,'/')+b;}}



function dirname(path){
var bits=path.split('/');
bits.pop();
return bits.join('/');}








Domain.prototype.lookup=function(moduleName){
if(/^\./.test(moduleName)){
moduleName=normalize(join(dirname(this._currentModule),moduleName));}


if(moduleName in this.modules){
var module=this.modules[moduleName];
return module;}


if(!(moduleName in define.modules)){
throw new Error("Module not defined: "+moduleName);}


var module=define.modules[moduleName];

if(typeof module=="function"){
var exports={};
var previousModule=this._currentModule;
this._currentModule=moduleName;
module(this.require.bind(this),exports,{id:moduleName,uri:""});
this._currentModule=previousModule;
module=exports;}



this.modules[moduleName]=module;

return module;};})();




define.Domain=Domain;
define.globalDomain=new Domain();
var require=define.globalDomain.require.bind(define.globalDomain);






define('source-map/source-map-generator',['require','exports','module','source-map/base64-vlq','source-map/util','source-map/array-set'],function(require,exports,module){

var base64VLQ=require('./base64-vlq');
var util=require('./util');
var ArraySet=require('./array-set').ArraySet;









function SourceMapGenerator(aArgs){
this._file=util.getArg(aArgs,'file');
this._sourceRoot=util.getArg(aArgs,'sourceRoot',null);
this._sources=new ArraySet();
this._names=new ArraySet();
this._mappings=[];
this._sourcesContents=null;}


SourceMapGenerator.prototype._version=3;






SourceMapGenerator.fromSourceMap=
function SourceMapGenerator_fromSourceMap(aSourceMapConsumer){
var sourceRoot=aSourceMapConsumer.sourceRoot;
var generator=new SourceMapGenerator({
file:aSourceMapConsumer.file,
sourceRoot:sourceRoot});

aSourceMapConsumer.eachMapping(function(mapping){
var newMapping={
generated:{
line:mapping.generatedLine,
column:mapping.generatedColumn}};



if(mapping.source){
newMapping.source=mapping.source;
if(sourceRoot){
newMapping.source=util.relative(sourceRoot,newMapping.source);}


newMapping.original={
line:mapping.originalLine,
column:mapping.originalColumn};


if(mapping.name){
newMapping.name=mapping.name;}}



generator.addMapping(newMapping);});

aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
generator.setSourceContent(sourceFile,content);}});


return generator;};












SourceMapGenerator.prototype.addMapping=
function SourceMapGenerator_addMapping(aArgs){
var generated=util.getArg(aArgs,'generated');
var original=util.getArg(aArgs,'original',null);
var source=util.getArg(aArgs,'source',null);
var name=util.getArg(aArgs,'name',null);

this._validateMapping(generated,original,source,name);

if(source&&!this._sources.has(source)){
this._sources.add(source);}


if(name&&!this._names.has(name)){
this._names.add(name);}


this._mappings.push({
generatedLine:generated.line,
generatedColumn:generated.column,
originalLine:original!=null&&original.line,
originalColumn:original!=null&&original.column,
source:source,
name:name});};






SourceMapGenerator.prototype.setSourceContent=
function SourceMapGenerator_setSourceContent(aSourceFile,aSourceContent){
var source=aSourceFile;
if(this._sourceRoot){
source=util.relative(this._sourceRoot,source);}


if(aSourceContent!==null){


if(!this._sourcesContents){
this._sourcesContents={};}

this._sourcesContents[util.toSetString(source)]=aSourceContent;}else 
{


delete this._sourcesContents[util.toSetString(source)];
if(Object.keys(this._sourcesContents).length===0){
this._sourcesContents=null;}}};














SourceMapGenerator.prototype.applySourceMap=
function SourceMapGenerator_applySourceMap(aSourceMapConsumer,aSourceFile){

if(!aSourceFile){
aSourceFile=aSourceMapConsumer.file;}

var sourceRoot=this._sourceRoot;

if(sourceRoot){
aSourceFile=util.relative(sourceRoot,aSourceFile);}



var newSources=new ArraySet();
var newNames=new ArraySet();


this._mappings.forEach(function(mapping){
if(mapping.source===aSourceFile&&mapping.originalLine){

var original=aSourceMapConsumer.originalPositionFor({
line:mapping.originalLine,
column:mapping.originalColumn});

if(original.source!==null){

if(sourceRoot){
mapping.source=util.relative(sourceRoot,original.source);}else 
{
mapping.source=original.source;}

mapping.originalLine=original.line;
mapping.originalColumn=original.column;
if(original.name!==null&&mapping.name!==null){


mapping.name=original.name;}}}




var source=mapping.source;
if(source&&!newSources.has(source)){
newSources.add(source);}


var name=mapping.name;
if(name&&!newNames.has(name)){
newNames.add(name);}},


this);
this._sources=newSources;
this._names=newNames;


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
if(sourceRoot){
sourceFile=util.relative(sourceRoot,sourceFile);}

this.setSourceContent(sourceFile,content);}},

this);};













SourceMapGenerator.prototype._validateMapping=
function SourceMapGenerator_validateMapping(aGenerated,aOriginal,aSource,
aName){
if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aGenerated.line>0&&aGenerated.column>=0&&
!aOriginal&&!aSource&&!aName){

return;}else 

if(aGenerated&&'line' in aGenerated&&'column' in aGenerated&&
aOriginal&&'line' in aOriginal&&'column' in aOriginal&&
aGenerated.line>0&&aGenerated.column>=0&&
aOriginal.line>0&&aOriginal.column>=0&&
aSource){

return;}else 

{
throw new Error('Invalid mapping: '+JSON.stringify({
generated:aGenerated,
source:aSource,
orginal:aOriginal,
name:aName}));}};








SourceMapGenerator.prototype._serializeMappings=
function SourceMapGenerator_serializeMappings(){
var previousGeneratedColumn=0;
var previousGeneratedLine=1;
var previousOriginalColumn=0;
var previousOriginalLine=0;
var previousName=0;
var previousSource=0;
var result='';
var mapping;






this._mappings.sort(util.compareByGeneratedPositions);

for(var i=0,len=this._mappings.length;i<len;i++){
mapping=this._mappings[i];

if(mapping.generatedLine!==previousGeneratedLine){
previousGeneratedColumn=0;
while(mapping.generatedLine!==previousGeneratedLine){
result+=';';
previousGeneratedLine++;}}else 


{
if(i>0){
if(!util.compareByGeneratedPositions(mapping,this._mappings[i-1])){
continue;}

result+=',';}}



result+=base64VLQ.encode(mapping.generatedColumn-
previousGeneratedColumn);
previousGeneratedColumn=mapping.generatedColumn;

if(mapping.source){
result+=base64VLQ.encode(this._sources.indexOf(mapping.source)-
previousSource);
previousSource=this._sources.indexOf(mapping.source);


result+=base64VLQ.encode(mapping.originalLine-1-
previousOriginalLine);
previousOriginalLine=mapping.originalLine-1;

result+=base64VLQ.encode(mapping.originalColumn-
previousOriginalColumn);
previousOriginalColumn=mapping.originalColumn;

if(mapping.name){
result+=base64VLQ.encode(this._names.indexOf(mapping.name)-
previousName);
previousName=this._names.indexOf(mapping.name);}}}




return result;};


SourceMapGenerator.prototype._generateSourcesContent=
function SourceMapGenerator_generateSourcesContent(aSources,aSourceRoot){
return aSources.map(function(source){
if(!this._sourcesContents){
return null;}

if(aSourceRoot){
source=util.relative(aSourceRoot,source);}

var key=util.toSetString(source);
return Object.prototype.hasOwnProperty.call(this._sourcesContents,
key)?
this._sourcesContents[key]:
null;},
this);};





SourceMapGenerator.prototype.toJSON=
function SourceMapGenerator_toJSON(){
var map={
version:this._version,
file:this._file,
sources:this._sources.toArray(),
names:this._names.toArray(),
mappings:this._serializeMappings()};

if(this._sourceRoot){
map.sourceRoot=this._sourceRoot;}

if(this._sourcesContents){
map.sourcesContent=this._generateSourcesContent(map.sources,map.sourceRoot);}


return map;};





SourceMapGenerator.prototype.toString=
function SourceMapGenerator_toString(){
return JSON.stringify(this);};


exports.SourceMapGenerator=SourceMapGenerator;});






































define('source-map/base64-vlq',['require','exports','module','source-map/base64'],function(require,exports,module){

var base64=require('./base64');













var VLQ_BASE_SHIFT=5;


var VLQ_BASE=1<<VLQ_BASE_SHIFT;


var VLQ_BASE_MASK=VLQ_BASE-1;


var VLQ_CONTINUATION_BIT=VLQ_BASE;







function toVLQSigned(aValue){
return aValue<0?
(-aValue<<1)+1:
(aValue<<1)+0;}








function fromVLQSigned(aValue){
var isNegative=(aValue&1)===1;
var shifted=aValue>>1;
return isNegative?
-shifted:
shifted;}





exports.encode=function base64VLQ_encode(aValue){
var encoded="";
var digit;

var vlq=toVLQSigned(aValue);

do {
digit=vlq&VLQ_BASE_MASK;
vlq>>>=VLQ_BASE_SHIFT;
if(vlq>0){


digit|=VLQ_CONTINUATION_BIT;}

encoded+=base64.encode(digit);}while(
vlq>0);

return encoded;};






exports.decode=function base64VLQ_decode(aStr){
var i=0;
var strLen=aStr.length;
var result=0;
var shift=0;
var continuation,digit;

do {
if(i>=strLen){
throw new Error("Expected more digits in base 64 VLQ value.");}

digit=base64.decode(aStr.charAt(i++));
continuation=!!(digit&VLQ_CONTINUATION_BIT);
digit&=VLQ_BASE_MASK;
result=result+(digit<<shift);
shift+=VLQ_BASE_SHIFT;}while(
continuation);

return {
value:fromVLQSigned(result),
rest:aStr.slice(i)};};});










define('source-map/base64',['require','exports','module'],function(require,exports,module){

var charToIntMap={};
var intToCharMap={};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.
split('').
forEach(function(ch,index){
charToIntMap[ch]=index;
intToCharMap[index]=ch;});





exports.encode=function base64_encode(aNumber){
if(aNumber in intToCharMap){
return intToCharMap[aNumber];}

throw new TypeError("Must be between 0 and 63: "+aNumber);};





exports.decode=function base64_decode(aChar){
if(aChar in charToIntMap){
return charToIntMap[aChar];}

throw new TypeError("Not a valid base 64 digit: "+aChar);};});









define('source-map/util',['require','exports','module'],function(require,exports,module){











function getArg(aArgs,aName,aDefaultValue){
if(aName in aArgs){
return aArgs[aName];}else 
if(arguments.length===3){
return aDefaultValue;}else 
{
throw new Error('"'+aName+'" is a required argument.');}}


exports.getArg=getArg;

var urlRegexp=/([\w+\-.]+):\/\/((\w+:\w+)@)?([\w.]+)?(:(\d+))?(\S+)?/;
var dataUrlRegexp=/^data:.+\,.+/;

function urlParse(aUrl){
var match=aUrl.match(urlRegexp);
if(!match){
return null;}

return {
scheme:match[1],
auth:match[3],
host:match[4],
port:match[6],
path:match[7]};}


exports.urlParse=urlParse;

function urlGenerate(aParsedUrl){
var url=aParsedUrl.scheme+"://";
if(aParsedUrl.auth){
url+=aParsedUrl.auth+"@";}

if(aParsedUrl.host){
url+=aParsedUrl.host;}

if(aParsedUrl.port){
url+=":"+aParsedUrl.port;}

if(aParsedUrl.path){
url+=aParsedUrl.path;}

return url;}

exports.urlGenerate=urlGenerate;

function join(aRoot,aPath){
var url;

if(aPath.match(urlRegexp)||aPath.match(dataUrlRegexp)){
return aPath;}


if(aPath.charAt(0)==='/'&&(url=urlParse(aRoot))){
url.path=aPath;
return urlGenerate(url);}


return aRoot.replace(/\/$/,'')+'/'+aPath;}

exports.join=join;










function toSetString(aStr){
return '$'+aStr;}

exports.toSetString=toSetString;

function fromSetString(aStr){
return aStr.substr(1);}

exports.fromSetString=fromSetString;

function relative(aRoot,aPath){
aRoot=aRoot.replace(/\/$/,'');

var url=urlParse(aRoot);
if(aPath.charAt(0)=="/"&&url&&url.path=="/"){
return aPath.slice(1);}


return aPath.indexOf(aRoot+'/')===0?
aPath.substr(aRoot.length+1):
aPath;}

exports.relative=relative;

function strcmp(aStr1,aStr2){
var s1=aStr1||"";
var s2=aStr2||"";
return (s1>s2)-(s1<s2);}










function compareByOriginalPositions(mappingA,mappingB,onlyCompareOriginal){
var cmp;

cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp||onlyCompareOriginal){
return cmp;}


cmp=strcmp(mappingA.name,mappingB.name);
if(cmp){
return cmp;}


cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


return mappingA.generatedColumn-mappingB.generatedColumn;}
;
exports.compareByOriginalPositions=compareByOriginalPositions;










function compareByGeneratedPositions(mappingA,mappingB,onlyCompareGenerated){
var cmp;

cmp=mappingA.generatedLine-mappingB.generatedLine;
if(cmp){
return cmp;}


cmp=mappingA.generatedColumn-mappingB.generatedColumn;
if(cmp||onlyCompareGenerated){
return cmp;}


cmp=strcmp(mappingA.source,mappingB.source);
if(cmp){
return cmp;}


cmp=mappingA.originalLine-mappingB.originalLine;
if(cmp){
return cmp;}


cmp=mappingA.originalColumn-mappingB.originalColumn;
if(cmp){
return cmp;}


return strcmp(mappingA.name,mappingB.name);}
;
exports.compareByGeneratedPositions=compareByGeneratedPositions;});








define('source-map/array-set',['require','exports','module','source-map/util'],function(require,exports,module){

var util=require('./util');







function ArraySet(){
this._array=[];
this._set={};}





ArraySet.fromArray=function ArraySet_fromArray(aArray,aAllowDuplicates){
var set=new ArraySet();
for(var i=0,len=aArray.length;i<len;i++){
set.add(aArray[i],aAllowDuplicates);}

return set;};







ArraySet.prototype.add=function ArraySet_add(aStr,aAllowDuplicates){
var isDuplicate=this.has(aStr);
var idx=this._array.length;
if(!isDuplicate||aAllowDuplicates){
this._array.push(aStr);}

if(!isDuplicate){
this._set[util.toSetString(aStr)]=idx;}};








ArraySet.prototype.has=function ArraySet_has(aStr){
return Object.prototype.hasOwnProperty.call(this._set,
util.toSetString(aStr));};







ArraySet.prototype.indexOf=function ArraySet_indexOf(aStr){
if(this.has(aStr)){
return this._set[util.toSetString(aStr)];}

throw new Error('"'+aStr+'" is not in the set.');};







ArraySet.prototype.at=function ArraySet_at(aIdx){
if(aIdx>=0&&aIdx<this._array.length){
return this._array[aIdx];}

throw new Error('No element indexed by '+aIdx);};







ArraySet.prototype.toArray=function ArraySet_toArray(){
return this._array.slice();};


exports.ArraySet=ArraySet;});








define('source-map/source-map-consumer',['require','exports','module','source-map/util','source-map/binary-search','source-map/array-set','source-map/base64-vlq'],function(require,exports,module){

var util=require('./util');
var binarySearch=require('./binary-search');
var ArraySet=require('./array-set').ArraySet;
var base64VLQ=require('./base64-vlq');































function SourceMapConsumer(aSourceMap){
var sourceMap=aSourceMap;
if(typeof aSourceMap==='string'){
sourceMap=JSON.parse(aSourceMap.replace(/^\)\]\}'/,''));}


var version=util.getArg(sourceMap,'version');
var sources=util.getArg(sourceMap,'sources');


var names=util.getArg(sourceMap,'names',[]);
var sourceRoot=util.getArg(sourceMap,'sourceRoot',null);
var sourcesContent=util.getArg(sourceMap,'sourcesContent',null);
var mappings=util.getArg(sourceMap,'mappings');
var file=util.getArg(sourceMap,'file',null);



if(version!=this._version){
throw new Error('Unsupported version: '+version);}






this._names=ArraySet.fromArray(names,true);
this._sources=ArraySet.fromArray(sources,true);

this.sourceRoot=sourceRoot;
this.sourcesContent=sourcesContent;
this._mappings=mappings;
this.file=file;}









SourceMapConsumer.fromSourceMap=
function SourceMapConsumer_fromSourceMap(aSourceMap){
var smc=Object.create(SourceMapConsumer.prototype);

smc._names=ArraySet.fromArray(aSourceMap._names.toArray(),true);
smc._sources=ArraySet.fromArray(aSourceMap._sources.toArray(),true);
smc.sourceRoot=aSourceMap._sourceRoot;
smc.sourcesContent=aSourceMap._generateSourcesContent(smc._sources.toArray(),
smc.sourceRoot);
smc.file=aSourceMap._file;

smc.__generatedMappings=aSourceMap._mappings.slice().
sort(util.compareByGeneratedPositions);
smc.__originalMappings=aSourceMap._mappings.slice().
sort(util.compareByOriginalPositions);

return smc;};





SourceMapConsumer.prototype._version=3;




Object.defineProperty(SourceMapConsumer.prototype,'sources',{
get:function get(){
return this._sources.toArray().map(function(s){
return this.sourceRoot?util.join(this.sourceRoot,s):s;},
this);}});

































SourceMapConsumer.prototype.__generatedMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_generatedMappings',{
get:function get(){
if(!this.__generatedMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__generatedMappings;}});



SourceMapConsumer.prototype.__originalMappings=null;
Object.defineProperty(SourceMapConsumer.prototype,'_originalMappings',{
get:function get(){
if(!this.__originalMappings){
this.__generatedMappings=[];
this.__originalMappings=[];
this._parseMappings(this._mappings,this.sourceRoot);}


return this.__originalMappings;}});








SourceMapConsumer.prototype._parseMappings=
function SourceMapConsumer_parseMappings(aStr,aSourceRoot){
var generatedLine=1;
var previousGeneratedColumn=0;
var previousOriginalLine=0;
var previousOriginalColumn=0;
var previousSource=0;
var previousName=0;
var mappingSeparator=/^[,;]/;
var str=aStr;
var mapping;
var temp;

while(str.length>0){
if(str.charAt(0)===';'){
generatedLine++;
str=str.slice(1);
previousGeneratedColumn=0;}else 

if(str.charAt(0)===','){
str=str.slice(1);}else 

{
mapping={};
mapping.generatedLine=generatedLine;


temp=base64VLQ.decode(str);
mapping.generatedColumn=previousGeneratedColumn+temp.value;
previousGeneratedColumn=mapping.generatedColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.source=this._sources.at(previousSource+temp.value);
previousSource+=temp.value;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source, but no line and column');}



temp=base64VLQ.decode(str);
mapping.originalLine=previousOriginalLine+temp.value;
previousOriginalLine=mapping.originalLine;

mapping.originalLine+=1;
str=temp.rest;
if(str.length===0||mappingSeparator.test(str.charAt(0))){
throw new Error('Found a source and line, but no column');}



temp=base64VLQ.decode(str);
mapping.originalColumn=previousOriginalColumn+temp.value;
previousOriginalColumn=mapping.originalColumn;
str=temp.rest;

if(str.length>0&&!mappingSeparator.test(str.charAt(0))){

temp=base64VLQ.decode(str);
mapping.name=this._names.at(previousName+temp.value);
previousName+=temp.value;
str=temp.rest;}}



this.__generatedMappings.push(mapping);
if(typeof mapping.originalLine==='number'){
this.__originalMappings.push(mapping);}}}




this.__originalMappings.sort(util.compareByOriginalPositions);};






SourceMapConsumer.prototype._findMapping=
function SourceMapConsumer_findMapping(aNeedle,aMappings,aLineName,
aColumnName,aComparator){





if(aNeedle[aLineName]<=0){
throw new TypeError('Line must be greater than or equal to 1, got '+
aNeedle[aLineName]);}

if(aNeedle[aColumnName]<0){
throw new TypeError('Column must be greater than or equal to 0, got '+
aNeedle[aColumnName]);}


return binarySearch.search(aNeedle,aMappings,aComparator);};

















SourceMapConsumer.prototype.originalPositionFor=
function SourceMapConsumer_originalPositionFor(aArgs){
var needle={
generatedLine:util.getArg(aArgs,'line'),
generatedColumn:util.getArg(aArgs,'column')};


var mapping=this._findMapping(needle,
this._generatedMappings,
"generatedLine",
"generatedColumn",
util.compareByGeneratedPositions);

if(mapping){
var source=util.getArg(mapping,'source',null);
if(source&&this.sourceRoot){
source=util.join(this.sourceRoot,source);}

return {
source:source,
line:util.getArg(mapping,'originalLine',null),
column:util.getArg(mapping,'originalColumn',null),
name:util.getArg(mapping,'name',null)};}



return {
source:null,
line:null,
column:null,
name:null};};








SourceMapConsumer.prototype.sourceContentFor=
function SourceMapConsumer_sourceContentFor(aSource){
if(!this.sourcesContent){
return null;}


if(this.sourceRoot){
aSource=util.relative(this.sourceRoot,aSource);}


if(this._sources.has(aSource)){
return this.sourcesContent[this._sources.indexOf(aSource)];}


var url;
if(this.sourceRoot&&(
url=util.urlParse(this.sourceRoot))){




var fileUriAbsPath=aSource.replace(/^file:\/\//,"");
if(url.scheme=="file"&&
this._sources.has(fileUriAbsPath)){
return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];}


if((!url.path||url.path=="/")&&
this._sources.has("/"+aSource)){
return this.sourcesContent[this._sources.indexOf("/"+aSource)];}}



throw new Error('"'+aSource+'" is not in the SourceMap.');};
















SourceMapConsumer.prototype.generatedPositionFor=
function SourceMapConsumer_generatedPositionFor(aArgs){
var needle={
source:util.getArg(aArgs,'source'),
originalLine:util.getArg(aArgs,'line'),
originalColumn:util.getArg(aArgs,'column')};


if(this.sourceRoot){
needle.source=util.relative(this.sourceRoot,needle.source);}


var mapping=this._findMapping(needle,
this._originalMappings,
"originalLine",
"originalColumn",
util.compareByOriginalPositions);

if(mapping){
return {
line:util.getArg(mapping,'generatedLine',null),
column:util.getArg(mapping,'generatedColumn',null)};}



return {
line:null,
column:null};};



SourceMapConsumer.GENERATED_ORDER=1;
SourceMapConsumer.ORIGINAL_ORDER=2;

















SourceMapConsumer.prototype.eachMapping=
function SourceMapConsumer_eachMapping(aCallback,aContext,aOrder){
var context=aContext||null;
var order=aOrder||SourceMapConsumer.GENERATED_ORDER;

var mappings;
switch(order){
case SourceMapConsumer.GENERATED_ORDER:
mappings=this._generatedMappings;
break;
case SourceMapConsumer.ORIGINAL_ORDER:
mappings=this._originalMappings;
break;
default:
throw new Error("Unknown order of iteration.");}


var sourceRoot=this.sourceRoot;
mappings.map(function(mapping){
var source=mapping.source;
if(source&&sourceRoot){
source=util.join(sourceRoot,source);}

return {
source:source,
generatedLine:mapping.generatedLine,
generatedColumn:mapping.generatedColumn,
originalLine:mapping.originalLine,
originalColumn:mapping.originalColumn,
name:mapping.name};}).

forEach(aCallback,context);};


exports.SourceMapConsumer=SourceMapConsumer;});








define('source-map/binary-search',['require','exports','module'],function(require,exports,module){










function recursiveSearch(aLow,aHigh,aNeedle,aHaystack,aCompare){










var mid=Math.floor((aHigh-aLow)/2)+aLow;
var cmp=aCompare(aNeedle,aHaystack[mid],true);
if(cmp===0){

return aHaystack[mid];}else 

if(cmp>0){

if(aHigh-mid>1){

return recursiveSearch(mid,aHigh,aNeedle,aHaystack,aCompare);}



return aHaystack[mid];}else 

{

if(mid-aLow>1){

return recursiveSearch(aLow,mid,aNeedle,aHaystack,aCompare);}



return aLow<0?
null:
aHaystack[aLow];}}
















exports.search=function search(aNeedle,aHaystack,aCompare){
return aHaystack.length>0?
recursiveSearch(-1,aHaystack.length,aNeedle,aHaystack,aCompare):
null;};});









define('source-map/source-node',['require','exports','module','source-map/source-map-generator','source-map/util'],function(require,exports,module){

var SourceMapGenerator=require('./source-map-generator').SourceMapGenerator;
var util=require('./util');













function SourceNode(aLine,aColumn,aSource,aChunks,aName){
this.children=[];
this.sourceContents={};
this.line=aLine===undefined?null:aLine;
this.column=aColumn===undefined?null:aColumn;
this.source=aSource===undefined?null:aSource;
this.name=aName===undefined?null:aName;
if(aChunks!=null)this.add(aChunks);}








SourceNode.fromStringWithSourceMap=
function SourceNode_fromStringWithSourceMap(aGeneratedCode,aSourceMapConsumer){


var node=new SourceNode();



var remainingLines=aGeneratedCode.split('\n');


var lastGeneratedLine=1,lastGeneratedColumn=0;




var lastMapping=null;

aSourceMapConsumer.eachMapping(function(mapping){
if(lastMapping===null){



while(lastGeneratedLine<mapping.generatedLine){
node.add(remainingLines.shift()+"\n");
lastGeneratedLine++;}

if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
node.add(nextLine.substr(0,mapping.generatedColumn));
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}}else 

{


if(lastGeneratedLine<mapping.generatedLine){
var code="";

do {
code+=remainingLines.shift()+"\n";
lastGeneratedLine++;
lastGeneratedColumn=0;}while(
lastGeneratedLine<mapping.generatedLine);


if(lastGeneratedColumn<mapping.generatedColumn){
var nextLine=remainingLines[0];
code+=nextLine.substr(0,mapping.generatedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn);
lastGeneratedColumn=mapping.generatedColumn;}


addMappingWithCode(lastMapping,code);}else 
{



var nextLine=remainingLines[0];
var code=nextLine.substr(0,mapping.generatedColumn-
lastGeneratedColumn);
remainingLines[0]=nextLine.substr(mapping.generatedColumn-
lastGeneratedColumn);
lastGeneratedColumn=mapping.generatedColumn;
addMappingWithCode(lastMapping,code);}}


lastMapping=mapping;},
this);



addMappingWithCode(lastMapping,remainingLines.join("\n"));


aSourceMapConsumer.sources.forEach(function(sourceFile){
var content=aSourceMapConsumer.sourceContentFor(sourceFile);
if(content){
node.setSourceContent(sourceFile,content);}});



return node;

function addMappingWithCode(mapping,code){
if(mapping===null||mapping.source===undefined){
node.add(code);}else 
{
node.add(new SourceNode(mapping.originalLine,
mapping.originalColumn,
mapping.source,
code,
mapping.name));}}};










SourceNode.prototype.add=function SourceNode_add(aChunk){
if(Array.isArray(aChunk)){
aChunk.forEach(function(chunk){
this.add(chunk);},
this);}else 

if(aChunk instanceof SourceNode||typeof aChunk==="string"){
if(aChunk){
this.children.push(aChunk);}}else 


{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};








SourceNode.prototype.prepend=function SourceNode_prepend(aChunk){
if(Array.isArray(aChunk)){
for(var i=aChunk.length-1;i>=0;i--){
this.prepend(aChunk[i]);}}else 


if(aChunk instanceof SourceNode||typeof aChunk==="string"){
this.children.unshift(aChunk);}else 

{
throw new TypeError(
"Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+aChunk);}


return this;};









SourceNode.prototype.walk=function SourceNode_walk(aFn){
var chunk;
for(var i=0,len=this.children.length;i<len;i++){
chunk=this.children[i];
if(chunk instanceof SourceNode){
chunk.walk(aFn);}else 

{
if(chunk!==''){
aFn(chunk,{source:this.source,
line:this.line,
column:this.column,
name:this.name});}}}};











SourceNode.prototype.join=function SourceNode_join(aSep){
var newChildren;
var i;
var len=this.children.length;
if(len>0){
newChildren=[];
for(i=0;i<len-1;i++){
newChildren.push(this.children[i]);
newChildren.push(aSep);}

newChildren.push(this.children[i]);
this.children=newChildren;}

return this;};









SourceNode.prototype.replaceRight=function SourceNode_replaceRight(aPattern,aReplacement){
var lastChild=this.children[this.children.length-1];
if(lastChild instanceof SourceNode){
lastChild.replaceRight(aPattern,aReplacement);}else 

if(typeof lastChild==='string'){
this.children[this.children.length-1]=lastChild.replace(aPattern,aReplacement);}else 

{
this.children.push(''.replace(aPattern,aReplacement));}

return this;};









SourceNode.prototype.setSourceContent=
function SourceNode_setSourceContent(aSourceFile,aSourceContent){
this.sourceContents[util.toSetString(aSourceFile)]=aSourceContent;};








SourceNode.prototype.walkSourceContents=
function SourceNode_walkSourceContents(aFn){
for(var i=0,len=this.children.length;i<len;i++){
if(this.children[i] instanceof SourceNode){
this.children[i].walkSourceContents(aFn);}}



var sources=Object.keys(this.sourceContents);
for(var i=0,len=sources.length;i<len;i++){
aFn(util.fromSetString(sources[i]),this.sourceContents[sources[i]]);}};







SourceNode.prototype.toString=function SourceNode_toString(){
var str="";
this.walk(function(chunk){
str+=chunk;});

return str;};






SourceNode.prototype.toStringWithSourceMap=function SourceNode_toStringWithSourceMap(aArgs){
var generated={
code:"",
line:1,
column:0};

var map=new SourceMapGenerator(aArgs);
var sourceMappingActive=false;
var lastOriginalSource=null;
var lastOriginalLine=null;
var lastOriginalColumn=null;
var lastOriginalName=null;
this.walk(function(chunk,original){
generated.code+=chunk;
if(original.source!==null&&
original.line!==null&&
original.column!==null){
if(lastOriginalSource!==original.source||
lastOriginalLine!==original.line||
lastOriginalColumn!==original.column||
lastOriginalName!==original.name){
map.addMapping({
source:original.source,
original:{
line:original.line,
column:original.column},

generated:{
line:generated.line,
column:generated.column},

name:original.name});}


lastOriginalSource=original.source;
lastOriginalLine=original.line;
lastOriginalColumn=original.column;
lastOriginalName=original.name;
sourceMappingActive=true;}else 
if(sourceMappingActive){
map.addMapping({
generated:{
line:generated.line,
column:generated.column}});


lastOriginalSource=null;
sourceMappingActive=false;}

chunk.split('').forEach(function(ch){
if(ch==='\n'){
generated.line++;
generated.column=0;}else 
{
generated.column++;}});});



this.walkSourceContents(function(sourceFile,sourceContent){
map.setSourceContent(sourceFile,sourceContent);});


return {code:generated.code,map:map};};


exports.SourceNode=SourceNode;});





this.sourceMap={
SourceMapConsumer:require('source-map/source-map-consumer').SourceMapConsumer,
SourceMapGenerator:require('source-map/source-map-generator').SourceMapGenerator,
SourceNode:require('source-map/source-node').SourceNode};}
}, "SourceMap");
__d(252 /* react-native/Libraries/JavaScriptAppEngine/Initialization/source-map-url.js */, function(global, require, module, exports) {(














function(){
var define=null;




void function(root,factory){
if(typeof define==="function"&&define.amd){
define(factory);}else 
if(typeof exports==="object"){
module.exports=factory();}else 
{
root.sourceMappingURL=factory();}}(

this,function(){

var innerRegex=/[#@] source(?:Mapping)?URL=([^\s'"]*)/;

var regex=RegExp(
"(?:"+
"/\\*"+
"(?:\\s*\r?\n(?://)?)?"+
"(?:"+innerRegex.source+")"+
"\\s*"+
"\\*/"+
"|"+
"//(?:"+innerRegex.source+")"+
")"+
"\\s*$");


return {

regex:regex,
_innerRegex:innerRegex,

getFrom:function getFrom(code){
var match=code.match(regex);
return match?match[1]||match[2]||"":null;},


existsIn:function existsIn(code){
return regex.test(code);},


removeFrom:function removeFrom(code){
return code.replace(regex,"");},


insertBefore:function insertBefore(code,string){
var match=code.match(regex);
if(match){
return code.slice(0,match.index)+string+code.slice(match.index);}else 
{
return code+string;}}};});})();
}, "react-native/Libraries/JavaScriptAppEngine/Initialization/source-map-url.js");
__d(34 /* React */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactChildren=require(35 /* ./ReactChildren */);
var ReactComponent=require(43 /* ./ReactComponent */);
var ReactClass=require(46 /* ./ReactClass */);
var ReactDOMFactories=require(49 /* ./ReactDOMFactories */);
var ReactElement=require(37 /* ./ReactElement */);
var ReactElementValidator=require(50 /* ./ReactElementValidator */);
var ReactPropTypes=require(51 /* ./ReactPropTypes */);
var ReactVersion=require(52 /* ./ReactVersion */);

var onlyChild=require(53 /* ./onlyChild */);
var warning=require(265 /* fbjs/lib/warning */);

var createElement=ReactElement.createElement;
var createFactory=ReactElement.createFactory;
var cloneElement=ReactElement.cloneElement;

if(process.env.NODE_ENV!=='production'){
createElement=ReactElementValidator.createElement;
createFactory=ReactElementValidator.createFactory;
cloneElement=ReactElementValidator.cloneElement;}


var __spread=_assign;

if(process.env.NODE_ENV!=='production'){
var warned=false;
__spread=function __spread(){
process.env.NODE_ENV!=='production'?warning(warned,'React.__spread is deprecated and should not be used. Use '+'Object.assign directly or another helper function with similar '+'semantics. You may be seeing this warning due to your compiler. '+'See https://fb.me/react-spread-deprecation for more details.'):void 0;
warned=true;
return _assign.apply(null,arguments);};}



var React={



Children:{
map:ReactChildren.map,
forEach:ReactChildren.forEach,
count:ReactChildren.count,
toArray:ReactChildren.toArray,
only:onlyChild},


Component:ReactComponent,

createElement:createElement,
cloneElement:cloneElement,
isValidElement:ReactElement.isValidElement,



PropTypes:ReactPropTypes,
createClass:ReactClass.createClass,
createFactory:createFactory,
createMixin:function createMixin(mixin){

return mixin;},




DOM:ReactDOMFactories,

version:ReactVersion,


__spread:__spread};


module.exports=React;
}, "React");
__d(290 /* object-assign/index.js */, function(global, require, module, exports) {'use strict';

var hasOwnProperty=Object.prototype.hasOwnProperty;
var propIsEnumerable=Object.prototype.propertyIsEnumerable;

function toObject(val){
if(val===null||val===undefined){
throw new TypeError('Object.assign cannot be called with null or undefined');}


return Object(val);}


function shouldUseNative(){
try{
if(!Object.assign){
return false;}





var test1=new String('abc');
test1[5]='de';
if(Object.getOwnPropertyNames(test1)[0]==='5'){
return false;}



var test2={};
for(var i=0;i<10;i++){
test2['_'+String.fromCharCode(i)]=i;}

var order2=Object.getOwnPropertyNames(test2).map(function(n){
return test2[n];});

if(order2.join('')!=='0123456789'){
return false;}



var test3={};
'abcdefghijklmnopqrst'.split('').forEach(function(letter){
test3[letter]=letter;});

if(Object.keys(babelHelpers.extends({},test3)).join('')!==
'abcdefghijklmnopqrst'){
return false;}


return true;}
catch(e){

return false;}}



module.exports=shouldUseNative()?Object.assign:function(target,source){
var from;
var to=toObject(target);
var symbols;

for(var s=1;s<arguments.length;s++){
from=Object(arguments[s]);

for(var key in from){
if(hasOwnProperty.call(from,key)){
to[key]=from[key];}}



if(Object.getOwnPropertySymbols){
symbols=Object.getOwnPropertySymbols(from);
for(var i=0;i<symbols.length;i++){
if(propIsEnumerable.call(from,symbols[i])){
to[symbols[i]]=from[symbols[i]];}}}}





return to;};
}, "object-assign/index.js");
__d(35 /* ReactChildren */, function(global, require, module, exports) {'use strict';












var PooledClass=require(36 /* ./PooledClass */);
var ReactElement=require(37 /* ./ReactElement */);

var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);
var traverseAllChildren=require(40 /* ./traverseAllChildren */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;
var fourArgumentPooler=PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex=/\/+/g;
function escapeUserProvidedKey(text){
return (''+text).replace(userProvidedKeyEscapeRegex,'$&/');}










function ForEachBookKeeping(forEachFunction,forEachContext){
this.func=forEachFunction;
this.context=forEachContext;
this.count=0;}

ForEachBookKeeping.prototype.destructor=function(){
this.func=null;
this.context=null;
this.count=0;};

PooledClass.addPoolingTo(ForEachBookKeeping,twoArgumentPooler);

function forEachSingleChild(bookKeeping,child,name){
var func=bookKeeping.func;
var context=bookKeeping.context;

func.call(context,child,bookKeeping.count++);}














function forEachChildren(children,forEachFunc,forEachContext){
if(children==null){
return children;}

var traverseContext=ForEachBookKeeping.getPooled(forEachFunc,forEachContext);
traverseAllChildren(children,forEachSingleChild,traverseContext);
ForEachBookKeeping.release(traverseContext);}











function MapBookKeeping(mapResult,keyPrefix,mapFunction,mapContext){
this.result=mapResult;
this.keyPrefix=keyPrefix;
this.func=mapFunction;
this.context=mapContext;
this.count=0;}

MapBookKeeping.prototype.destructor=function(){
this.result=null;
this.keyPrefix=null;
this.func=null;
this.context=null;
this.count=0;};

PooledClass.addPoolingTo(MapBookKeeping,fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping,child,childKey){
var result=bookKeeping.result;
var keyPrefix=bookKeeping.keyPrefix;
var func=bookKeeping.func;
var context=bookKeeping.context;


var mappedChild=func.call(context,child,bookKeeping.count++);
if(Array.isArray(mappedChild)){
mapIntoWithKeyPrefixInternal(mappedChild,result,childKey,emptyFunction.thatReturnsArgument);}else 
if(mappedChild!=null){
if(ReactElement.isValidElement(mappedChild)){
mappedChild=ReactElement.cloneAndReplaceKey(mappedChild,


keyPrefix+(mappedChild.key&&(!child||child.key!==mappedChild.key)?escapeUserProvidedKey(mappedChild.key)+'/':'')+childKey);}

result.push(mappedChild);}}



function mapIntoWithKeyPrefixInternal(children,array,prefix,func,context){
var escapedPrefix='';
if(prefix!=null){
escapedPrefix=escapeUserProvidedKey(prefix)+'/';}

var traverseContext=MapBookKeeping.getPooled(array,escapedPrefix,func,context);
traverseAllChildren(children,mapSingleChildIntoContext,traverseContext);
MapBookKeeping.release(traverseContext);}















function mapChildren(children,func,context){
if(children==null){
return children;}

var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,func,context);
return result;}


function forEachSingleChildDummy(traverseContext,child,name){
return null;}











function countChildren(children,context){
return traverseAllChildren(children,forEachSingleChildDummy,null);}








function toArray(children){
var result=[];
mapIntoWithKeyPrefixInternal(children,result,null,emptyFunction.thatReturnsArgument);
return result;}


var ReactChildren={
forEach:forEachChildren,
map:mapChildren,
mapIntoWithKeyPrefixInternal:mapIntoWithKeyPrefixInternal,
count:countChildren,
toArray:toArray};


module.exports=ReactChildren;
}, "ReactChildren");
__d(36 /* PooledClass */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);








var oneArgumentPooler=function oneArgumentPooler(copyFieldsFrom){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,copyFieldsFrom);
return instance;}else 
{
return new Klass(copyFieldsFrom);}};



var twoArgumentPooler=function twoArgumentPooler(a1,a2){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2);
return instance;}else 
{
return new Klass(a1,a2);}};



var threeArgumentPooler=function threeArgumentPooler(a1,a2,a3){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3);
return instance;}else 
{
return new Klass(a1,a2,a3);}};



var fourArgumentPooler=function fourArgumentPooler(a1,a2,a3,a4){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4);
return instance;}else 
{
return new Klass(a1,a2,a3,a4);}};



var fiveArgumentPooler=function fiveArgumentPooler(a1,a2,a3,a4,a5){
var Klass=this;
if(Klass.instancePool.length){
var instance=Klass.instancePool.pop();
Klass.call(instance,a1,a2,a3,a4,a5);
return instance;}else 
{
return new Klass(a1,a2,a3,a4,a5);}};



var standardReleaser=function standardReleaser(instance){
var Klass=this;
!(instance instanceof Klass)?process.env.NODE_ENV!=='production'?invariant(false,'Trying to release an instance into a pool of a different type.'):invariant(false):void 0;
instance.destructor();
if(Klass.instancePool.length<Klass.poolSize){
Klass.instancePool.push(instance);}};



var DEFAULT_POOL_SIZE=10;
var DEFAULT_POOLER=oneArgumentPooler;










var addPoolingTo=function addPoolingTo(CopyConstructor,pooler){
var NewKlass=CopyConstructor;
NewKlass.instancePool=[];
NewKlass.getPooled=pooler||DEFAULT_POOLER;
if(!NewKlass.poolSize){
NewKlass.poolSize=DEFAULT_POOL_SIZE;}

NewKlass.release=standardReleaser;
return NewKlass;};


var PooledClass={
addPoolingTo:addPoolingTo,
oneArgumentPooler:oneArgumentPooler,
twoArgumentPooler:twoArgumentPooler,
threeArgumentPooler:threeArgumentPooler,
fourArgumentPooler:fourArgumentPooler,
fiveArgumentPooler:fiveArgumentPooler};


module.exports=PooledClass;
}, "PooledClass");
__d(37 /* ReactElement */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);

var warning=require(265 /* fbjs/lib/warning */);
var canDefineProperty=require(39 /* ./canDefineProperty */);



var REACT_ELEMENT_TYPE=typeof Symbol==='function'&&Symbol['for']&&Symbol['for']('react.element')||0xeac7;

var RESERVED_PROPS={
key:true,
ref:true,
__self:true,
__source:true};


var specialPropKeyWarningShown,specialPropRefWarningShown;





















var ReactElement=function ReactElement(type,key,ref,self,source,owner,props){
var element={

$$typeof:REACT_ELEMENT_TYPE,


type:type,
key:key,
ref:ref,
props:props,


_owner:owner};


if(process.env.NODE_ENV!=='production'){




element._store={};





if(canDefineProperty){
Object.defineProperty(element._store,'validated',{
configurable:false,
enumerable:false,
writable:true,
value:false});


Object.defineProperty(element,'_self',{
configurable:false,
enumerable:false,
writable:false,
value:self});



Object.defineProperty(element,'_source',{
configurable:false,
enumerable:false,
writable:false,
value:source});}else 

{
element._store.validated=false;
element._self=self;
element._source=source;}

if(Object.freeze){
Object.freeze(element.props);
Object.freeze(element);}}



return element;};






ReactElement.createElement=function(type,config,children){
var propName;


var props={};

var key=null;
var ref=null;
var self=null;
var source=null;

if(config!=null){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(

config.__proto__==null||config.__proto__===Object.prototype,

'React.createElement(...): Expected props argument to be a plain object. '+'Properties defined in its prototype chain will be ignored.'):void 0;
ref=!config.hasOwnProperty('ref')||Object.getOwnPropertyDescriptor(config,'ref').get?null:config.ref;
key=!config.hasOwnProperty('key')||Object.getOwnPropertyDescriptor(config,'key').get?null:''+config.key;}else 
{
ref=config.ref===undefined?null:config.ref;
key=config.key===undefined?null:''+config.key;}

self=config.__self===undefined?null:config.__self;
source=config.__source===undefined?null:config.__source;

for(propName in config){
if(config.hasOwnProperty(propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
props[propName]=config[propName];}}}






var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;}else 
if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];}

props.children=childArray;}



if(type&&type.defaultProps){
var defaultProps=type.defaultProps;
for(propName in defaultProps){
if(props[propName]===undefined){
props[propName]=defaultProps[propName];}}}



if(process.env.NODE_ENV!=='production'){


if(typeof props.$$typeof==='undefined'||props.$$typeof!==REACT_ELEMENT_TYPE){
if(!props.hasOwnProperty('key')){
Object.defineProperty(props,'key',{
get:function get(){
if(!specialPropKeyWarningShown){
specialPropKeyWarningShown=true;
process.env.NODE_ENV!=='production'?warning(false,'%s: `key` is not a prop. Trying to access it will result '+'in `undefined` being returned. If you need to access the same '+'value within the child component, you should pass it as a different '+'prop. (https://fb.me/react-special-props)',typeof type==='function'&&'displayName' in type?type.displayName:'Element'):void 0;}

return undefined;},

configurable:true});}


if(!props.hasOwnProperty('ref')){
Object.defineProperty(props,'ref',{
get:function get(){
if(!specialPropRefWarningShown){
specialPropRefWarningShown=true;
process.env.NODE_ENV!=='production'?warning(false,'%s: `ref` is not a prop. Trying to access it will result '+'in `undefined` being returned. If you need to access the same '+'value within the child component, you should pass it as a different '+'prop. (https://fb.me/react-special-props)',typeof type==='function'&&'displayName' in type?type.displayName:'Element'):void 0;}

return undefined;},

configurable:true});}}}




return ReactElement(type,key,ref,self,source,ReactCurrentOwner.current,props);};






ReactElement.createFactory=function(type){
var factory=ReactElement.createElement.bind(null,type);





factory.type=type;
return factory;};


ReactElement.cloneAndReplaceKey=function(oldElement,newKey){
var newElement=ReactElement(oldElement.type,newKey,oldElement.ref,oldElement._self,oldElement._source,oldElement._owner,oldElement.props);

return newElement;};






ReactElement.cloneElement=function(element,config,children){
var propName;


var props=_assign({},element.props);


var key=element.key;
var ref=element.ref;

var self=element._self;



var source=element._source;


var owner=element._owner;

if(config!=null){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(

config.__proto__==null||config.__proto__===Object.prototype,

'React.cloneElement(...): Expected props argument to be a plain object. '+'Properties defined in its prototype chain will be ignored.'):void 0;}

if(config.ref!==undefined){

ref=config.ref;
owner=ReactCurrentOwner.current;}

if(config.key!==undefined){
key=''+config.key;}


var defaultProps;
if(element.type&&element.type.defaultProps){
defaultProps=element.type.defaultProps;}

for(propName in config){
if(config.hasOwnProperty(propName)&&!RESERVED_PROPS.hasOwnProperty(propName)){
if(config[propName]===undefined&&defaultProps!==undefined){

props[propName]=defaultProps[propName];}else 
{
props[propName]=config[propName];}}}}







var childrenLength=arguments.length-2;
if(childrenLength===1){
props.children=children;}else 
if(childrenLength>1){
var childArray=Array(childrenLength);
for(var i=0;i<childrenLength;i++){
childArray[i]=arguments[i+2];}

props.children=childArray;}


return ReactElement(element.type,key,ref,self,source,owner,props);};









ReactElement.isValidElement=function(object){
return typeof object==='object'&&object!==null&&object.$$typeof===REACT_ELEMENT_TYPE;};


module.exports=ReactElement;
}, "ReactElement");
__d(38 /* ReactCurrentOwner */, function(global, require, module, exports) {'use strict';



















var ReactCurrentOwner={





current:null};



module.exports=ReactCurrentOwner;
}, "ReactCurrentOwner");
__d(39 /* canDefineProperty */, function(global, require, module, exports) {'use strict';












var canDefineProperty=false;
if(process.env.NODE_ENV!=='production'){
try{
Object.defineProperty({},'x',{get:function get(){}});
canDefineProperty=true;}
catch(x){}}




module.exports=canDefineProperty;
}, "canDefineProperty");
__d(40 /* traverseAllChildren */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactElement=require(37 /* ./ReactElement */);

var getIteratorFn=require(41 /* ./getIteratorFn */);
var invariant=require(259 /* fbjs/lib/invariant */);
var KeyEscapeUtils=require(42 /* ./KeyEscapeUtils */);
var warning=require(265 /* fbjs/lib/warning */);

var SEPARATOR='.';
var SUBSEPARATOR=':';






var didWarnAboutMaps=false;








function getComponentKey(component,index){


if(component&&typeof component==='object'&&component.key!=null){

return KeyEscapeUtils.escape(component.key);}


return index.toString(36);}










function traverseAllChildrenImpl(children,nameSoFar,callback,traverseContext){
var type=typeof children;

if(type==='undefined'||type==='boolean'){

children=null;}


if(children===null||type==='string'||type==='number'||ReactElement.isValidElement(children)){
callback(traverseContext,children,


nameSoFar===''?SEPARATOR+getComponentKey(children,0):nameSoFar);
return 1;}


var child;
var nextName;
var subtreeCount=0;
var nextNamePrefix=nameSoFar===''?SEPARATOR:nameSoFar+SUBSEPARATOR;

if(Array.isArray(children)){
for(var i=0;i<children.length;i++){
child=children[i];
nextName=nextNamePrefix+getComponentKey(child,i);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}else 

{
var iteratorFn=getIteratorFn(children);
if(iteratorFn){
var iterator=iteratorFn.call(children);
var step;
if(iteratorFn!==children.entries){
var ii=0;
while(!(step=iterator.next()).done){
child=step.value;
nextName=nextNamePrefix+getComponentKey(child,ii++);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}else 

{
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(didWarnAboutMaps,'Using Maps as children is not yet fully supported. It is an '+'experimental feature that might be removed. Convert it to a '+'sequence / iterable of keyed ReactElements instead.'):void 0;
didWarnAboutMaps=true;}


while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
child=entry[1];
nextName=nextNamePrefix+KeyEscapeUtils.escape(entry[0])+SUBSEPARATOR+getComponentKey(child,0);
subtreeCount+=traverseAllChildrenImpl(child,nextName,callback,traverseContext);}}}}else 



if(type==='object'){
var addendum='';
if(process.env.NODE_ENV!=='production'){
addendum=' If you meant to render a collection of children, use an array '+'instead or wrap the object using createFragment(object) from the '+'React add-ons.';
if(children._isReactElement){
addendum=' It looks like you\'re using an element created by a different '+'version of React. Make sure to use only one copy of React.';}

if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
addendum+=' Check the render method of `'+name+'`.';}}}



var childrenString=String(children);
!false?process.env.NODE_ENV!=='production'?invariant(false,'Objects are not valid as a React child (found: %s).%s',childrenString==='[object Object]'?'object with keys {'+Object.keys(children).join(', ')+'}':childrenString,addendum):invariant(false):void 0;}}



return subtreeCount;}


















function traverseAllChildren(children,callback,traverseContext){
if(children==null){
return 0;}


return traverseAllChildrenImpl(children,'',callback,traverseContext);}


module.exports=traverseAllChildren;
}, "traverseAllChildren");
__d(41 /* getIteratorFn */, function(global, require, module, exports) {'use strict';














var ITERATOR_SYMBOL=typeof Symbol==='function'&&(typeof Symbol==='function'?Symbol.iterator:'@@iterator');
var FAUX_ITERATOR_SYMBOL='@@iterator';















function getIteratorFn(maybeIterable){
var iteratorFn=maybeIterable&&(ITERATOR_SYMBOL&&maybeIterable[ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL]);
if(typeof iteratorFn==='function'){
return iteratorFn;}}



module.exports=getIteratorFn;
}, "getIteratorFn");
__d(42 /* KeyEscapeUtils */, function(global, require, module, exports) {'use strict';



















function escape(key){
var escapeRegex=/[=:]/g;
var escaperLookup={
'=':'=0',
':':'=2'};

var escapedString=(''+key).replace(escapeRegex,function(match){
return escaperLookup[match];});


return '$'+escapedString;}








function unescape(key){
var unescapeRegex=/(=0|=2)/g;
var unescaperLookup={
'=0':'=',
'=2':':'};

var keySubstring=key[0]==='.'&&key[1]==='$'?key.substring(2):key.substring(1);

return (''+keySubstring).replace(unescapeRegex,function(match){
return unescaperLookup[match];});}



var KeyEscapeUtils={
escape:escape,
unescape:unescape};


module.exports=KeyEscapeUtils;
}, "KeyEscapeUtils");
__d(43 /* ReactComponent */, function(global, require, module, exports) {'use strict';












var ReactNoopUpdateQueue=require(44 /* ./ReactNoopUpdateQueue */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);

var canDefineProperty=require(39 /* ./canDefineProperty */);
var emptyObject=require(262 /* fbjs/lib/emptyObject */);
var invariant=require(259 /* fbjs/lib/invariant */);
var warning=require(265 /* fbjs/lib/warning */);




function ReactComponent(props,context,updater){
this.props=props;
this.context=context;
this.refs=emptyObject;


this.updater=updater||ReactNoopUpdateQueue;}


ReactComponent.prototype.isReactComponent={};


























ReactComponent.prototype.setState=function(partialState,callback){
!(typeof partialState==='object'||typeof partialState==='function'||partialState==null)?process.env.NODE_ENV!=='production'?invariant(false,'setState(...): takes an object of state variables to update or a '+'function which returns an object of state variables.'):invariant(false):void 0;
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onSetState();
process.env.NODE_ENV!=='production'?warning(partialState!=null,'setState(...): You passed an undefined or null state object; '+'instead, use forceUpdate().'):void 0;}

this.updater.enqueueSetState(this,partialState);
if(callback){
this.updater.enqueueCallback(this,callback,'setState');}};

















ReactComponent.prototype.forceUpdate=function(callback){
this.updater.enqueueForceUpdate(this);
if(callback){
this.updater.enqueueCallback(this,callback,'forceUpdate');}};








if(process.env.NODE_ENV!=='production'){
var deprecatedAPIs={
isMounted:['isMounted','Instead, make sure to clean up subscriptions and pending requests in '+'componentWillUnmount to prevent memory leaks.'],
replaceState:['replaceState','Refactor your code to use setState instead (see '+'https://github.com/facebook/react/issues/3236).']};

var defineDeprecationWarning=function defineDeprecationWarning(methodName,info){
if(canDefineProperty){
Object.defineProperty(ReactComponent.prototype,methodName,{
get:function get(){
process.env.NODE_ENV!=='production'?warning(false,'%s(...) is deprecated in plain JavaScript React classes. %s',info[0],info[1]):void 0;
return undefined;}});}};




for(var fnName in deprecatedAPIs){
if(deprecatedAPIs.hasOwnProperty(fnName)){
defineDeprecationWarning(fnName,deprecatedAPIs[fnName]);}}}




module.exports=ReactComponent;
}, "ReactComponent");
__d(44 /* ReactNoopUpdateQueue */, function(global, require, module, exports) {'use strict';












var warning=require(265 /* fbjs/lib/warning */);

function warnTDZ(publicInstance,callerName){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(false,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,publicInstance.constructor&&publicInstance.constructor.displayName||''):void 0;}}






var ReactNoopUpdateQueue={








isMounted:function isMounted(publicInstance){
return false;},










enqueueCallback:function enqueueCallback(publicInstance,callback){},














enqueueForceUpdate:function enqueueForceUpdate(publicInstance){
warnTDZ(publicInstance,'forceUpdate');},













enqueueReplaceState:function enqueueReplaceState(publicInstance,completeState){
warnTDZ(publicInstance,'replaceState');},












enqueueSetState:function enqueueSetState(publicInstance,partialState){
warnTDZ(publicInstance,'setState');}};



module.exports=ReactNoopUpdateQueue;
}, "ReactNoopUpdateQueue");
__d(45 /* ReactInstrumentation */, function(global, require, module, exports) {'use strict';












var ReactDebugTool=require(5 /* ./ReactDebugTool */);

module.exports={debugTool:ReactDebugTool};
}, "ReactInstrumentation");
__d(262 /* fbjs/lib/emptyObject.js */, function(global, require, module, exports) {'use strict';











var emptyObject={};

if(process.env.NODE_ENV!=='production'){
Object.freeze(emptyObject);}


module.exports=emptyObject;
}, "fbjs/lib/emptyObject.js");
__d(46 /* ReactClass */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactComponent=require(43 /* ./ReactComponent */);
var ReactElement=require(37 /* ./ReactElement */);
var ReactPropTypeLocations=require(47 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(48 /* ./ReactPropTypeLocationNames */);
var ReactNoopUpdateQueue=require(44 /* ./ReactNoopUpdateQueue */);

var emptyObject=require(262 /* fbjs/lib/emptyObject */);
var invariant=require(259 /* fbjs/lib/invariant */);
var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var keyOf=require(263 /* fbjs/lib/keyOf */);
var warning=require(265 /* fbjs/lib/warning */);

var MIXINS_KEY=keyOf({mixins:null});




var SpecPolicy=keyMirror({



DEFINE_ONCE:null,




DEFINE_MANY:null,



OVERRIDE_BASE:null,





DEFINE_MANY_MERGED:null});


var injectedMixins=[];























var ReactClassInterface={







mixins:SpecPolicy.DEFINE_MANY,








statics:SpecPolicy.DEFINE_MANY,







propTypes:SpecPolicy.DEFINE_MANY,







contextTypes:SpecPolicy.DEFINE_MANY,







childContextTypes:SpecPolicy.DEFINE_MANY,













getDefaultProps:SpecPolicy.DEFINE_MANY_MERGED,















getInitialState:SpecPolicy.DEFINE_MANY_MERGED,





getChildContext:SpecPolicy.DEFINE_MANY_MERGED,

















render:SpecPolicy.DEFINE_ONCE,










componentWillMount:SpecPolicy.DEFINE_MANY,











componentDidMount:SpecPolicy.DEFINE_MANY,




















componentWillReceiveProps:SpecPolicy.DEFINE_MANY,





















shouldComponentUpdate:SpecPolicy.DEFINE_ONCE,
















componentWillUpdate:SpecPolicy.DEFINE_MANY,













componentDidUpdate:SpecPolicy.DEFINE_MANY,












componentWillUnmount:SpecPolicy.DEFINE_MANY,













updateComponent:SpecPolicy.OVERRIDE_BASE};












var RESERVED_SPEC_KEYS={
displayName:function displayName(Constructor,_displayName){
Constructor.displayName=_displayName;},

mixins:function mixins(Constructor,_mixins){
if(_mixins){
for(var i=0;i<_mixins.length;i++){
mixSpecIntoComponent(Constructor,_mixins[i]);}}},



childContextTypes:function childContextTypes(Constructor,_childContextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_childContextTypes,ReactPropTypeLocations.childContext);}

Constructor.childContextTypes=_assign({},Constructor.childContextTypes,_childContextTypes);},

contextTypes:function contextTypes(Constructor,_contextTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_contextTypes,ReactPropTypeLocations.context);}

Constructor.contextTypes=_assign({},Constructor.contextTypes,_contextTypes);},





getDefaultProps:function getDefaultProps(Constructor,_getDefaultProps){
if(Constructor.getDefaultProps){
Constructor.getDefaultProps=createMergedResultFunction(Constructor.getDefaultProps,_getDefaultProps);}else 
{
Constructor.getDefaultProps=_getDefaultProps;}},


propTypes:function propTypes(Constructor,_propTypes){
if(process.env.NODE_ENV!=='production'){
validateTypeDef(Constructor,_propTypes,ReactPropTypeLocations.prop);}

Constructor.propTypes=_assign({},Constructor.propTypes,_propTypes);},

statics:function statics(Constructor,_statics){
mixStaticSpecIntoComponent(Constructor,_statics);},

autobind:function autobind(){}};


function validateTypeDef(Constructor,typeDef,location){
for(var propName in typeDef){
if(typeDef.hasOwnProperty(propName)){


process.env.NODE_ENV!=='production'?warning(typeof typeDef[propName]==='function','%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',Constructor.displayName||'ReactClass',ReactPropTypeLocationNames[location],propName):void 0;}}}




function validateMethodOverride(isAlreadyDefined,name){
var specPolicy=ReactClassInterface.hasOwnProperty(name)?ReactClassInterface[name]:null;


if(ReactClassMixin.hasOwnProperty(name)){
!(specPolicy===SpecPolicy.OVERRIDE_BASE)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to override '+'`%s` from your class specification. Ensure that your method names '+'do not overlap with React methods.',name):invariant(false):void 0;}



if(isAlreadyDefined){
!(specPolicy===SpecPolicy.DEFINE_MANY||specPolicy===SpecPolicy.DEFINE_MANY_MERGED)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClassInterface: You are attempting to define '+'`%s` on your component more than once. This conflict may be due '+'to a mixin.',name):invariant(false):void 0;}}







function mixSpecIntoComponent(Constructor,spec){
if(!spec){
return;}


!(typeof spec!=='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to '+'use a component class or function as a mixin. Instead, just use a '+'regular object.'):invariant(false):void 0;
!!ReactElement.isValidElement(spec)?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You\'re attempting to '+'use a component as a mixin. Instead, just use a regular object.'):invariant(false):void 0;

var proto=Constructor.prototype;
var autoBindPairs=proto.__reactAutoBindPairs;




if(spec.hasOwnProperty(MIXINS_KEY)){
RESERVED_SPEC_KEYS.mixins(Constructor,spec.mixins);}


for(var name in spec){
if(!spec.hasOwnProperty(name)){
continue;}


if(name===MIXINS_KEY){

continue;}


var property=spec[name];
var isAlreadyDefined=proto.hasOwnProperty(name);
validateMethodOverride(isAlreadyDefined,name);

if(RESERVED_SPEC_KEYS.hasOwnProperty(name)){
RESERVED_SPEC_KEYS[name](Constructor,property);}else 
{




var isReactClassMethod=ReactClassInterface.hasOwnProperty(name);
var isFunction=typeof property==='function';
var shouldAutoBind=isFunction&&!isReactClassMethod&&!isAlreadyDefined&&spec.autobind!==false;

if(shouldAutoBind){
autoBindPairs.push(name,property);
proto[name]=property;}else 
{
if(isAlreadyDefined){
var specPolicy=ReactClassInterface[name];


!(isReactClassMethod&&(specPolicy===SpecPolicy.DEFINE_MANY_MERGED||specPolicy===SpecPolicy.DEFINE_MANY))?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: Unexpected spec policy %s for key %s '+'when mixing in component specs.',specPolicy,name):invariant(false):void 0;



if(specPolicy===SpecPolicy.DEFINE_MANY_MERGED){
proto[name]=createMergedResultFunction(proto[name],property);}else 
if(specPolicy===SpecPolicy.DEFINE_MANY){
proto[name]=createChainedFunction(proto[name],property);}}else 

{
proto[name]=property;
if(process.env.NODE_ENV!=='production'){


if(typeof property==='function'&&spec.displayName){
proto[name].displayName=spec.displayName+'_'+name;}}}}}}}








function mixStaticSpecIntoComponent(Constructor,statics){
if(!statics){
return;}

for(var name in statics){
var property=statics[name];
if(!statics.hasOwnProperty(name)){
continue;}


var isReserved=name in RESERVED_SPEC_KEYS;
!!isReserved?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define a reserved '+'property, `%s`, that shouldn\'t be on the "statics" key. Define it '+'as an instance property instead; it will still be accessible on the '+'constructor.',name):invariant(false):void 0;

var isInherited=name in Constructor;
!!isInherited?process.env.NODE_ENV!=='production'?invariant(false,'ReactClass: You are attempting to define '+'`%s` on your component more than once. This conflict may be '+'due to a mixin.',name):invariant(false):void 0;
Constructor[name]=property;}}










function mergeIntoWithNoDuplicateKeys(one,two){
!(one&&two&&typeof one==='object'&&typeof two==='object')?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'):invariant(false):void 0;

for(var key in two){
if(two.hasOwnProperty(key)){
!(one[key]===undefined)?process.env.NODE_ENV!=='production'?invariant(false,'mergeIntoWithNoDuplicateKeys(): '+'Tried to merge two objects with the same key: `%s`. This conflict '+'may be due to a mixin; in particular, this may be caused by two '+'getInitialState() or getDefaultProps() methods returning objects '+'with clashing keys.',key):invariant(false):void 0;
one[key]=two[key];}}


return one;}










function createMergedResultFunction(one,two){
return function mergedResult(){
var a=one.apply(this,arguments);
var b=two.apply(this,arguments);
if(a==null){
return b;}else 
if(b==null){
return a;}

var c={};
mergeIntoWithNoDuplicateKeys(c,a);
mergeIntoWithNoDuplicateKeys(c,b);
return c;};}











function createChainedFunction(one,two){
return function chainedFunction(){
one.apply(this,arguments);
two.apply(this,arguments);};}










function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);
if(process.env.NODE_ENV!=='production'){
boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;
var componentName=component.constructor.displayName;
var _bind=boundMethod.bind;
boundMethod.bind=function(newThis){
for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){
args[_key-1]=arguments[_key];}





if(newThis!==component&&newThis!==null){
process.env.NODE_ENV!=='production'?warning(false,'bind(): React component methods may only be bound to the '+'component instance. See %s',componentName):void 0;}else 
if(!args.length){
process.env.NODE_ENV!=='production'?warning(false,'bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See %s',componentName):void 0;
return boundMethod;}

var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;
return reboundMethod;};}


return boundMethod;}







function bindAutoBindMethods(component){
var pairs=component.__reactAutoBindPairs;
for(var i=0;i<pairs.length;i+=2){
var autoBindKey=pairs[i];
var method=pairs[i+1];
component[autoBindKey]=bindAutoBindMethod(component,method);}}







var ReactClassMixin={





replaceState:function replaceState(newState,callback){
this.updater.enqueueReplaceState(this,newState);
if(callback){
this.updater.enqueueCallback(this,callback,'replaceState');}},









isMounted:function isMounted(){
return this.updater.isMounted(this);}};



var ReactClassComponent=function ReactClassComponent(){};
_assign(ReactClassComponent.prototype,ReactComponent.prototype,ReactClassMixin);






var ReactClass={









createClass:function createClass(spec){
var Constructor=function Constructor(props,context,updater){



if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(this instanceof Constructor,'Something is calling a React component directly. Use a factory or '+'JSX instead. See: https://fb.me/react-legacyfactory'):void 0;}



if(this.__reactAutoBindPairs.length){
bindAutoBindMethods(this);}


this.props=props;
this.context=context;
this.refs=emptyObject;
this.updater=updater||ReactNoopUpdateQueue;

this.state=null;




var initialState=this.getInitialState?this.getInitialState():null;
if(process.env.NODE_ENV!=='production'){

if(initialState===undefined&&this.getInitialState._isMockFunction){


initialState=null;}}


!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.getInitialState(): must return an object or null',Constructor.displayName||'ReactCompositeComponent'):invariant(false):void 0;

this.state=initialState;};

Constructor.prototype=new ReactClassComponent();
Constructor.prototype.constructor=Constructor;
Constructor.prototype.__reactAutoBindPairs=[];

injectedMixins.forEach(mixSpecIntoComponent.bind(null,Constructor));

mixSpecIntoComponent(Constructor,spec);


if(Constructor.getDefaultProps){
Constructor.defaultProps=Constructor.getDefaultProps();}


if(process.env.NODE_ENV!=='production'){




if(Constructor.getDefaultProps){
Constructor.getDefaultProps.isReactClassApproved={};}

if(Constructor.prototype.getInitialState){
Constructor.prototype.getInitialState.isReactClassApproved={};}}



!Constructor.prototype.render?process.env.NODE_ENV!=='production'?invariant(false,'createClass(...): Class specification must implement a `render` method.'):invariant(false):void 0;

if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentShouldUpdate,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',spec.displayName||'A component'):void 0;
process.env.NODE_ENV!=='production'?warning(!Constructor.prototype.componentWillRecieveProps,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',spec.displayName||'A component'):void 0;}



for(var methodName in ReactClassInterface){
if(!Constructor.prototype[methodName]){
Constructor.prototype[methodName]=null;}}



return Constructor;},


injection:{
injectMixin:function injectMixin(mixin){
injectedMixins.push(mixin);}}};





module.exports=ReactClass;
}, "ReactClass");
__d(47 /* ReactPropTypeLocations */, function(global, require, module, exports) {'use strict';












var keyMirror=require(256 /* fbjs/lib/keyMirror */);

var ReactPropTypeLocations=keyMirror({
prop:null,
context:null,
childContext:null});


module.exports=ReactPropTypeLocations;
}, "ReactPropTypeLocations");
__d(48 /* ReactPropTypeLocationNames */, function(global, require, module, exports) {'use strict';












var ReactPropTypeLocationNames={};

if(process.env.NODE_ENV!=='production'){
ReactPropTypeLocationNames={
prop:'prop',
context:'context',
childContext:'child context'};}



module.exports=ReactPropTypeLocationNames;
}, "ReactPropTypeLocationNames");
__d(263 /* fbjs/lib/keyOf.js */, function(global, require, module, exports) {"use strict";





















var keyOf=function keyOf(oneKeyObj){
var key;
for(key in oneKeyObj){
if(!oneKeyObj.hasOwnProperty(key)){
continue;}

return key;}

return null;};


module.exports=keyOf;
}, "fbjs/lib/keyOf.js");
__d(49 /* ReactDOMFactories */, function(global, require, module, exports) {'use strict';












var ReactElement=require(37 /* ./ReactElement */);
var ReactElementValidator=require(50 /* ./ReactElementValidator */);

var mapObject=require(268 /* fbjs/lib/mapObject */);







function createDOMFactory(tag){
if(process.env.NODE_ENV!=='production'){
return ReactElementValidator.createFactory(tag);}

return ReactElement.createFactory(tag);}








var ReactDOMFactories=mapObject({
a:'a',
abbr:'abbr',
address:'address',
area:'area',
article:'article',
aside:'aside',
audio:'audio',
b:'b',
base:'base',
bdi:'bdi',
bdo:'bdo',
big:'big',
blockquote:'blockquote',
body:'body',
br:'br',
button:'button',
canvas:'canvas',
caption:'caption',
cite:'cite',
code:'code',
col:'col',
colgroup:'colgroup',
data:'data',
datalist:'datalist',
dd:'dd',
del:'del',
details:'details',
dfn:'dfn',
dialog:'dialog',
div:'div',
dl:'dl',
dt:'dt',
em:'em',
embed:'embed',
fieldset:'fieldset',
figcaption:'figcaption',
figure:'figure',
footer:'footer',
form:'form',
h1:'h1',
h2:'h2',
h3:'h3',
h4:'h4',
h5:'h5',
h6:'h6',
head:'head',
header:'header',
hgroup:'hgroup',
hr:'hr',
html:'html',
i:'i',
iframe:'iframe',
img:'img',
input:'input',
ins:'ins',
kbd:'kbd',
keygen:'keygen',
label:'label',
legend:'legend',
li:'li',
link:'link',
main:'main',
map:'map',
mark:'mark',
menu:'menu',
menuitem:'menuitem',
meta:'meta',
meter:'meter',
nav:'nav',
noscript:'noscript',
object:'object',
ol:'ol',
optgroup:'optgroup',
option:'option',
output:'output',
p:'p',
param:'param',
picture:'picture',
pre:'pre',
progress:'progress',
q:'q',
rp:'rp',
rt:'rt',
ruby:'ruby',
s:'s',
samp:'samp',
script:'script',
section:'section',
select:'select',
small:'small',
source:'source',
span:'span',
strong:'strong',
style:'style',
sub:'sub',
summary:'summary',
sup:'sup',
table:'table',
tbody:'tbody',
td:'td',
textarea:'textarea',
tfoot:'tfoot',
th:'th',
thead:'thead',
time:'time',
title:'title',
tr:'tr',
track:'track',
u:'u',
ul:'ul',
'var':'var',
video:'video',
wbr:'wbr',


circle:'circle',
clipPath:'clipPath',
defs:'defs',
ellipse:'ellipse',
g:'g',
image:'image',
line:'line',
linearGradient:'linearGradient',
mask:'mask',
path:'path',
pattern:'pattern',
polygon:'polygon',
polyline:'polyline',
radialGradient:'radialGradient',
rect:'rect',
stop:'stop',
svg:'svg',
text:'text',
tspan:'tspan'},

createDOMFactory);

module.exports=ReactDOMFactories;
}, "ReactDOMFactories");
__d(50 /* ReactElementValidator */, function(global, require, module, exports) {'use strict';



















var ReactElement=require(37 /* ./ReactElement */);
var ReactPropTypeLocations=require(47 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(48 /* ./ReactPropTypeLocationNames */);
var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);

var canDefineProperty=require(39 /* ./canDefineProperty */);
var getIteratorFn=require(41 /* ./getIteratorFn */);
var invariant=require(259 /* fbjs/lib/invariant */);
var warning=require(265 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(){
if(ReactCurrentOwner.current){
var name=ReactCurrentOwner.current.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}







var ownerHasKeyUseWarning={};

var loggedTypeFailures={};











function validateExplicitKey(element,parentType){
if(!element._store||element._store.validated||element.key!=null){
return;}

element._store.validated=true;

var addenda=getAddendaForKeyUse('uniqueKey',element,parentType);
if(addenda===null){

return;}

process.env.NODE_ENV!=='production'?warning(false,'Each child in an array or iterator should have a unique "key" prop.'+'%s%s%s',addenda.parentOrOwner||'',addenda.childOwner||'',addenda.url||''):void 0;}












function getAddendaForKeyUse(messageType,element,parentType){
var addendum=getDeclarationErrorAddendum();
if(!addendum){
var parentName=typeof parentType==='string'?parentType:parentType.displayName||parentType.name;
if(parentName){
addendum=' Check the top-level render call using <'+parentName+'>.';}}



var memoizer=ownerHasKeyUseWarning[messageType]||(ownerHasKeyUseWarning[messageType]={});
if(memoizer[addendum]){
return null;}

memoizer[addendum]=true;

var addenda={
parentOrOwner:addendum,
url:' See https://fb.me/react-warning-keys for more information.',
childOwner:null};





if(element&&element._owner&&element._owner!==ReactCurrentOwner.current){

addenda.childOwner=' It was passed a child from '+element._owner.getName()+'.';}


return addenda;}











function validateChildKeys(node,parentType){
if(typeof node!=='object'){
return;}

if(Array.isArray(node)){
for(var i=0;i<node.length;i++){
var child=node[i];
if(ReactElement.isValidElement(child)){
validateExplicitKey(child,parentType);}}}else 


if(ReactElement.isValidElement(node)){

if(node._store){
node._store.validated=true;}}else 

if(node){
var iteratorFn=getIteratorFn(node);

if(iteratorFn){
if(iteratorFn!==node.entries){
var iterator=iteratorFn.call(node);
var step;
while(!(step=iterator.next()).done){
if(ReactElement.isValidElement(step.value)){
validateExplicitKey(step.value,parentType);}}}}}}
















function checkPropTypes(componentName,propTypes,props,location){
for(var propName in propTypes){
if(propTypes.hasOwnProperty(propName)){
var error;



try{


!(typeof propTypes[propName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually from '+'React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],propName):invariant(false):void 0;
error=propTypes[propName](props,propName,componentName,location);}
catch(ex){
error=ex;}

process.env.NODE_ENV!=='production'?warning(!error||error instanceof Error,'%s: type specification of %s `%s` is invalid; the type checker '+'function must return `null` or an `Error` but returned a %s. '+'You may have forgotten to pass an argument to the type checker '+'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+'shape all require an argument).',componentName||'React class',ReactPropTypeLocationNames[location],propName,typeof error):void 0;
if(error instanceof Error&&!(error.message in loggedTypeFailures)){


loggedTypeFailures[error.message]=true;

var addendum=getDeclarationErrorAddendum();
process.env.NODE_ENV!=='production'?warning(false,'Failed propType: %s%s',error.message,addendum):void 0;}}}}











function validatePropTypes(element){
var componentClass=element.type;
if(typeof componentClass!=='function'){
return;}

var name=componentClass.displayName||componentClass.name;
if(componentClass.propTypes){
checkPropTypes(name,componentClass.propTypes,element.props,ReactPropTypeLocations.prop);}

if(typeof componentClass.getDefaultProps==='function'){
process.env.NODE_ENV!=='production'?warning(componentClass.getDefaultProps.isReactClassApproved,'getDefaultProps is only used on classic React.createClass '+'definitions. Use a static property named `defaultProps` instead.'):void 0;}}



var ReactElementValidator={

createElement:function createElement(type,props,children){
var validType=typeof type==='string'||typeof type==='function';


process.env.NODE_ENV!=='production'?warning(validType,'React.createElement: type should not be null, undefined, boolean, or '+'number. It should be a string (for DOM elements) or a ReactClass '+'(for composite components).%s',getDeclarationErrorAddendum()):void 0;

var element=ReactElement.createElement.apply(this,arguments);



if(element==null){
return element;}







if(validType){
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],type);}}



validatePropTypes(element);

return element;},


createFactory:function createFactory(type){
var validatedFactory=ReactElementValidator.createElement.bind(null,type);

validatedFactory.type=type;

if(process.env.NODE_ENV!=='production'){
if(canDefineProperty){
Object.defineProperty(validatedFactory,'type',{
enumerable:false,
get:function get(){
process.env.NODE_ENV!=='production'?warning(false,'Factory.type is deprecated. Access the class directly '+'before passing it to createFactory.'):void 0;
Object.defineProperty(this,'type',{
value:type});

return type;}});}}





return validatedFactory;},


cloneElement:function cloneElement(element,props,children){
var newElement=ReactElement.cloneElement.apply(this,arguments);
for(var i=2;i<arguments.length;i++){
validateChildKeys(arguments[i],newElement.type);}

validatePropTypes(newElement);
return newElement;}};




module.exports=ReactElementValidator;
}, "ReactElementValidator");
__d(268 /* fbjs/lib/mapObject.js */, function(global, require, module, exports) {'use strict';











var hasOwnProperty=Object.prototype.hasOwnProperty;























function mapObject(object,callback,context){
if(!object){
return null;}

var result={};
for(var name in object){
if(hasOwnProperty.call(object,name)){
result[name]=callback.call(context,object[name],name,object);}}


return result;}


module.exports=mapObject;
}, "fbjs/lib/mapObject.js");
__d(51 /* ReactPropTypes */, function(global, require, module, exports) {'use strict';












var ReactElement=require(37 /* ./ReactElement */);
var ReactPropTypeLocationNames=require(48 /* ./ReactPropTypeLocationNames */);

var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);
var getIteratorFn=require(41 /* ./getIteratorFn */);
















































var ANONYMOUS='<<anonymous>>';

var ReactPropTypes={
array:createPrimitiveTypeChecker('array'),
bool:createPrimitiveTypeChecker('boolean'),
func:createPrimitiveTypeChecker('function'),
number:createPrimitiveTypeChecker('number'),
object:createPrimitiveTypeChecker('object'),
string:createPrimitiveTypeChecker('string'),

any:createAnyTypeChecker(),
arrayOf:createArrayOfTypeChecker,
element:createElementTypeChecker(),
instanceOf:createInstanceTypeChecker,
node:createNodeChecker(),
objectOf:createObjectOfTypeChecker,
oneOf:createEnumTypeChecker,
oneOfType:createUnionTypeChecker,
shape:createShapeTypeChecker};







function is(x,y){

if(x===y){


return x!==0||1/x===1/y;}else 
{

return x!==x&&y!==y;}}




function createChainableTypeChecker(validate){
function checkType(isRequired,props,propName,componentName,location,propFullName){
componentName=componentName||ANONYMOUS;
propFullName=propFullName||propName;
if(props[propName]==null){
var locationName=ReactPropTypeLocationNames[location];
if(isRequired){
return new Error('Required '+locationName+' `'+propFullName+'` was not specified in '+('`'+componentName+'`.'));}

return null;}else 
{
return validate(props,propName,componentName,location,propFullName);}}



var chainedCheckType=checkType.bind(null,false);
chainedCheckType.isRequired=checkType.bind(null,true);

return chainedCheckType;}


function createPrimitiveTypeChecker(expectedType){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!==expectedType){
var locationName=ReactPropTypeLocationNames[location];



var preciseType=getPreciseType(propValue);

return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+preciseType+'` supplied to `'+componentName+'`, expected ')+('`'+expectedType+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createAnyTypeChecker(){
return createChainableTypeChecker(emptyFunction.thatReturns(null));}


function createArrayOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
if(typeof typeChecker!=='function'){
return new Error('Property `'+propFullName+'` of component `'+componentName+'` has invalid PropType notation inside arrayOf.');}

var propValue=props[propName];
if(!Array.isArray(propValue)){
var locationName=ReactPropTypeLocationNames[location];
var propType=getPropType(propValue);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an array.'));}

for(var i=0;i<propValue.length;i++){
var error=typeChecker(propValue,i,componentName,location,propFullName+'['+i+']');
if(error instanceof Error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function createElementTypeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!ReactElement.isValidElement(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a single ReactElement.'));}

return null;}

return createChainableTypeChecker(validate);}


function createInstanceTypeChecker(expectedClass){
function validate(props,propName,componentName,location,propFullName){
if(!(props[propName] instanceof expectedClass)){
var locationName=ReactPropTypeLocationNames[location];
var expectedClassName=expectedClass.name||ANONYMOUS;
var actualClassName=getClassName(props[propName]);
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+actualClassName+'` supplied to `'+componentName+'`, expected ')+('instance of `'+expectedClassName+'`.'));}

return null;}

return createChainableTypeChecker(validate);}


function createEnumTypeChecker(expectedValues){
if(!Array.isArray(expectedValues)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOf, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
for(var i=0;i<expectedValues.length;i++){
if(is(propValue,expectedValues[i])){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
var valuesString=JSON.stringify(expectedValues);
return new Error('Invalid '+locationName+' `'+propFullName+'` of value `'+propValue+'` '+('supplied to `'+componentName+'`, expected one of '+valuesString+'.'));}

return createChainableTypeChecker(validate);}


function createObjectOfTypeChecker(typeChecker){
function validate(props,propName,componentName,location,propFullName){
if(typeof typeChecker!=='function'){
return new Error('Property `'+propFullName+'` of component `'+componentName+'` has invalid PropType notation inside objectOf.');}

var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type '+('`'+propType+'` supplied to `'+componentName+'`, expected an object.'));}

for(var key in propValue){
if(propValue.hasOwnProperty(key)){
var error=typeChecker(propValue,key,componentName,location,propFullName+'.'+key);
if(error instanceof Error){
return error;}}}



return null;}

return createChainableTypeChecker(validate);}


function createUnionTypeChecker(arrayOfTypeCheckers){
if(!Array.isArray(arrayOfTypeCheckers)){
return createChainableTypeChecker(function(){
return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');});}



function validate(props,propName,componentName,location,propFullName){
for(var i=0;i<arrayOfTypeCheckers.length;i++){
var checker=arrayOfTypeCheckers[i];
if(checker(props,propName,componentName,location,propFullName)==null){
return null;}}



var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`.'));}

return createChainableTypeChecker(validate);}


function createNodeChecker(){
function validate(props,propName,componentName,location,propFullName){
if(!isNode(props[propName])){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` supplied to '+('`'+componentName+'`, expected a ReactNode.'));}

return null;}

return createChainableTypeChecker(validate);}


function createShapeTypeChecker(shapeTypes){
function validate(props,propName,componentName,location,propFullName){
var propValue=props[propName];
var propType=getPropType(propValue);
if(propType!=='object'){
var locationName=ReactPropTypeLocationNames[location];
return new Error('Invalid '+locationName+' `'+propFullName+'` of type `'+propType+'` '+('supplied to `'+componentName+'`, expected `object`.'));}

for(var key in shapeTypes){
var checker=shapeTypes[key];
if(!checker){
continue;}

var error=checker(propValue,key,componentName,location,propFullName+'.'+key);
if(error){
return error;}}


return null;}

return createChainableTypeChecker(validate);}


function isNode(propValue){
switch(typeof propValue){
case 'number':
case 'string':
case 'undefined':
return true;
case 'boolean':
return !propValue;
case 'object':
if(Array.isArray(propValue)){
return propValue.every(isNode);}

if(propValue===null||ReactElement.isValidElement(propValue)){
return true;}


var iteratorFn=getIteratorFn(propValue);
if(iteratorFn){
var iterator=iteratorFn.call(propValue);
var step;
if(iteratorFn!==propValue.entries){
while(!(step=iterator.next()).done){
if(!isNode(step.value)){
return false;}}}else 


{

while(!(step=iterator.next()).done){
var entry=step.value;
if(entry){
if(!isNode(entry[1])){
return false;}}}}}else 




{
return false;}


return true;
default:
return false;}}




function getPropType(propValue){
var propType=typeof propValue;
if(Array.isArray(propValue)){
return 'array';}

if(propValue instanceof RegExp){



return 'object';}

return propType;}




function getPreciseType(propValue){
var propType=getPropType(propValue);
if(propType==='object'){
if(propValue instanceof Date){
return 'date';}else 
if(propValue instanceof RegExp){
return 'regexp';}}


return propType;}



function getClassName(propValue){
if(!propValue.constructor||!propValue.constructor.name){
return ANONYMOUS;}

return propValue.constructor.name;}


module.exports=ReactPropTypes;
}, "ReactPropTypes");
__d(52 /* ReactVersion */, function(global, require, module, exports) {'use strict';












module.exports='15.1.0';
}, "ReactVersion");
__d(53 /* onlyChild */, function(global, require, module, exports) {'use strict';











var ReactElement=require(37 /* ./ReactElement */);

var invariant=require(259 /* fbjs/lib/invariant */);















function onlyChild(children){
!ReactElement.isValidElement(children)?process.env.NODE_ENV!=='production'?invariant(false,'onlyChild must be passed a children with exactly one child.'):invariant(false):void 0;
return children;}


module.exports=onlyChild;
}, "onlyChild");
__d(54 /* ProgressBarAndroid */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/ProgressBarAndroid/ProgressBarAndroid.android.js';











var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var React=require(34 /* React */);
var ReactPropTypes=require(51 /* ReactPropTypes */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var View=require(81 /* View */);
var ColorPropType=require(69 /* ColorPropType */);

var requireNativeComponent=require(88 /* requireNativeComponent */);

var STYLE_ATTRIBUTES=[
'Horizontal',
'Normal',
'Small',
'Large',
'Inverse',
'SmallInverse',
'LargeInverse'];


var indeterminateType=function indeterminateType(props,propName,componentName){
var checker=function checker(){
var indeterminate=props[propName];
var styleAttr=props.styleAttr;
if(!indeterminate&&styleAttr!=='Horizontal'){
return new Error('indeterminate=false is only valid for styleAttr=Horizontal');}};



return ReactPropTypes.bool(props,propName,componentName)||checker();};

























var ProgressBarAndroid=React.createClass({displayName:'ProgressBarAndroid',
propTypes:babelHelpers.extends({},
View.propTypes,{











styleAttr:ReactPropTypes.oneOf(STYLE_ATTRIBUTES),




indeterminate:indeterminateType,



progress:ReactPropTypes.number,



color:ColorPropType,



testID:ReactPropTypes.string}),


getDefaultProps:function getDefaultProps(){
return {
styleAttr:'Normal',
indeterminate:true};},



mixins:[NativeMethodsMixin],

render:function render(){
return React.createElement(AndroidProgressBar,babelHelpers.extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:111}}));}});



var AndroidProgressBar=requireNativeComponent('AndroidProgressBar',ProgressBarAndroid);

module.exports=ProgressBarAndroid;
}, "ProgressBarAndroid");
__d(55 /* NativeMethodsMixin */, function(global, require, module, exports) {'use strict';












var ReactNativeAttributePayload=require(56 /* ./ReactNativeAttributePayload */);
var TextInputState=require(60 /* TextInputState */);
var UIManager=require(61 /* UIManager */);

var findNodeHandle=require(62 /* ./findNodeHandle */);
var invariant=require(259 /* fbjs/lib/invariant */);

function warnForStyleProps(props,validAttributes){
for(var key in validAttributes.style){
if(!(validAttributes[key]||props[key]===undefined)){
console.error('You are setting the style `{ '+key+': ... }` as a prop. You '+'should nest it in a style object. '+'E.g. `{ style: { '+key+': ... } }`');}}}
















var NativeMethodsMixin={

















measure:function measure(callback){
UIManager.measure(findNodeHandle(this),mountSafeCallback(this,callback));},

















measureInWindow:function measureInWindow(callback){
UIManager.measureInWindow(findNodeHandle(this),mountSafeCallback(this,callback));},










measureLayout:function measureLayout(relativeToNativeNode,onSuccess,onFail)
{
UIManager.measureLayout(findNodeHandle(this),relativeToNativeNode,mountSafeCallback(this,onFail),mountSafeCallback(this,onSuccess));},








setNativeProps:function setNativeProps(nativeProps){
if(process.env.NODE_ENV!=='production'){
warnForStyleProps(nativeProps,this.viewConfig.validAttributes);}


var updatePayload=ReactNativeAttributePayload.create(nativeProps,this.viewConfig.validAttributes);

UIManager.updateView(findNodeHandle(this),this.viewConfig.uiViewClassName,updatePayload);},






focus:function focus(){
TextInputState.focusTextInput(findNodeHandle(this));},





blur:function blur(){
TextInputState.blurTextInput(findNodeHandle(this));}};



function throwOnStylesProp(component,props){
if(props.styles!==undefined){
var owner=component._owner||null;
var name=component.constructor.displayName;
var msg='`styles` is not a supported property of `'+name+'`, did '+'you mean `style` (singular)?';
if(owner&&owner.constructor&&owner.constructor.displayName){
msg+='\n\nCheck the `'+owner.constructor.displayName+'` parent '+' component.';}

throw new Error(msg);}}


if(process.env.NODE_ENV!=='production'){



var NativeMethodsMixin_DEV=NativeMethodsMixin;
!(!NativeMethodsMixin_DEV.componentWillMount&&!NativeMethodsMixin_DEV.componentWillReceiveProps)?process.env.NODE_ENV!=='production'?invariant(false,'Do not override existing functions.'):invariant(false):void 0;
NativeMethodsMixin_DEV.componentWillMount=function(){
throwOnStylesProp(this,this.props);};

NativeMethodsMixin_DEV.componentWillReceiveProps=function(newProps){
throwOnStylesProp(this,newProps);};}







var mountSafeCallback=function mountSafeCallback(context,callback){
return function(){
if(!callback||context.isMounted&&!context.isMounted()){
return undefined;}

return callback.apply(context,arguments);};};



module.exports=NativeMethodsMixin;
}, "NativeMethodsMixin");
__d(56 /* ReactNativeAttributePayload */, function(global, require, module, exports) {'use strict';












var ReactNativePropRegistry=require(57 /* ./ReactNativePropRegistry */);

var deepDiffer=require(58 /* deepDiffer */);
var flattenStyle=require(59 /* flattenStyle */);

var emptyObject={};














var removedKeys=null;
var removedKeyCount=0;

function defaultDiffer(prevProp,nextProp){
if(typeof nextProp!=='object'||nextProp===null){

return true;}else 
{

return deepDiffer(prevProp,nextProp);}}



function resolveObject(idOrObject){
if(typeof idOrObject==='number'){
return ReactNativePropRegistry.getByID(idOrObject);}

return idOrObject;}


function restoreDeletedValuesInNestedArray(updatePayload,node,validAttributes){
if(Array.isArray(node)){
var i=node.length;
while(i--&&removedKeyCount>0){
restoreDeletedValuesInNestedArray(updatePayload,node[i],validAttributes);}}else 

if(node&&removedKeyCount>0){
var obj=resolveObject(node);
for(var propKey in removedKeys){
if(!removedKeys[propKey]){
continue;}

var nextProp=obj[propKey];
if(nextProp===undefined){
continue;}


var attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


if(typeof nextProp==='function'){
nextProp=true;}

if(typeof nextProp==='undefined'){
nextProp=null;}


if(typeof attributeConfig!=='object'){

updatePayload[propKey]=nextProp;}else 
if(typeof attributeConfig.diff==='function'||typeof attributeConfig.process==='function'){

var nextValue=typeof attributeConfig.process==='function'?attributeConfig.process(nextProp):nextProp;
updatePayload[propKey]=nextValue;}

removedKeys[propKey]=false;
removedKeyCount--;}}}




function diffNestedArrayProperty(updatePayload,prevArray,nextArray,validAttributes){
var minLength=prevArray.length<nextArray.length?prevArray.length:nextArray.length;
var i;
for(i=0;i<minLength;i++){


updatePayload=diffNestedProperty(updatePayload,prevArray[i],nextArray[i],validAttributes);}

for(;i<prevArray.length;i++){

updatePayload=clearNestedProperty(updatePayload,prevArray[i],validAttributes);}

for(;i<nextArray.length;i++){

updatePayload=addNestedProperty(updatePayload,nextArray[i],validAttributes);}

return updatePayload;}


function diffNestedProperty(updatePayload,prevProp,nextProp,validAttributes){

if(!updatePayload&&prevProp===nextProp){


return updatePayload;}


if(!prevProp||!nextProp){
if(nextProp){
return addNestedProperty(updatePayload,nextProp,validAttributes);}

if(prevProp){
return clearNestedProperty(updatePayload,prevProp,validAttributes);}

return updatePayload;}


if(!Array.isArray(prevProp)&&!Array.isArray(nextProp)){

return diffProperties(updatePayload,resolveObject(prevProp),resolveObject(nextProp),validAttributes);}


if(Array.isArray(prevProp)&&Array.isArray(nextProp)){

return diffNestedArrayProperty(updatePayload,prevProp,nextProp,validAttributes);}


if(Array.isArray(prevProp)){
return diffProperties(updatePayload,

flattenStyle(prevProp),

resolveObject(nextProp),validAttributes);}


return diffProperties(updatePayload,resolveObject(prevProp),

flattenStyle(nextProp),validAttributes);}







function addNestedProperty(updatePayload,nextProp,validAttributes){
if(!nextProp){
return updatePayload;}


if(!Array.isArray(nextProp)){

return addProperties(updatePayload,resolveObject(nextProp),validAttributes);}


for(var i=0;i<nextProp.length;i++){

updatePayload=addNestedProperty(updatePayload,nextProp[i],validAttributes);}


return updatePayload;}






function clearNestedProperty(updatePayload,prevProp,validAttributes){
if(!prevProp){
return updatePayload;}


if(!Array.isArray(prevProp)){

return clearProperties(updatePayload,resolveObject(prevProp),validAttributes);}


for(var i=0;i<prevProp.length;i++){

updatePayload=clearNestedProperty(updatePayload,prevProp[i],validAttributes);}

return updatePayload;}








function diffProperties(updatePayload,prevProps,nextProps,validAttributes){
var attributeConfig;
var nextProp;
var prevProp;

for(var propKey in nextProps){
attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


prevProp=prevProps[propKey];
nextProp=nextProps[propKey];



if(typeof nextProp==='function'){
nextProp=true;


if(typeof prevProp==='function'){
prevProp=true;}}





if(typeof nextProp==='undefined'){
nextProp=null;
if(typeof prevProp==='undefined'){
prevProp=null;}}



if(removedKeys){
removedKeys[propKey]=false;}


if(updatePayload&&updatePayload[propKey]!==undefined){






if(typeof attributeConfig!=='object'){

updatePayload[propKey]=nextProp;}else 
if(typeof attributeConfig.diff==='function'||typeof attributeConfig.process==='function'){

var nextValue=typeof attributeConfig.process==='function'?attributeConfig.process(nextProp):nextProp;
updatePayload[propKey]=nextValue;}

continue;}


if(prevProp===nextProp){
continue;}



if(typeof attributeConfig!=='object'){

if(defaultDiffer(prevProp,nextProp)){

(updatePayload||(updatePayload={}))[propKey]=nextProp;}}else 

if(typeof attributeConfig.diff==='function'||typeof attributeConfig.process==='function'){

var shouldUpdate=prevProp===undefined||(typeof attributeConfig.diff==='function'?attributeConfig.diff(prevProp,nextProp):defaultDiffer(prevProp,nextProp));
if(shouldUpdate){
nextValue=typeof attributeConfig.process==='function'?attributeConfig.process(nextProp):nextProp;
(updatePayload||(updatePayload={}))[propKey]=nextValue;}}else 

{

removedKeys=null;
removedKeyCount=0;
updatePayload=diffNestedProperty(updatePayload,prevProp,nextProp,attributeConfig);
if(removedKeyCount>0&&updatePayload){
restoreDeletedValuesInNestedArray(updatePayload,nextProp,attributeConfig);
removedKeys=null;}}}







for(propKey in prevProps){
if(nextProps[propKey]!==undefined){
continue;}

attributeConfig=validAttributes[propKey];
if(!attributeConfig){
continue;}


if(updatePayload&&updatePayload[propKey]!==undefined){

continue;}


prevProp=prevProps[propKey];
if(prevProp===undefined){
continue;}


if(typeof attributeConfig!=='object'||typeof attributeConfig.diff==='function'||typeof attributeConfig.process==='function'){



(updatePayload||(updatePayload={}))[propKey]=null;
if(!removedKeys){
removedKeys={};}

if(!removedKeys[propKey]){
removedKeys[propKey]=true;
removedKeyCount++;}}else 

{



updatePayload=clearNestedProperty(updatePayload,prevProp,attributeConfig);}}


return updatePayload;}





function addProperties(updatePayload,props,validAttributes){

return diffProperties(updatePayload,emptyObject,props,validAttributes);}






function clearProperties(updatePayload,prevProps,validAttributes){

return diffProperties(updatePayload,prevProps,emptyObject,validAttributes);}


var ReactNativeAttributePayload={

create:function create(props,validAttributes){
return addProperties(null,
props,validAttributes);},


diff:function diff(prevProps,nextProps,validAttributes){
return diffProperties(null,
prevProps,nextProps,validAttributes);}};




module.exports=ReactNativeAttributePayload;
}, "ReactNativeAttributePayload");
__d(57 /* ReactNativePropRegistry */, function(global, require, module, exports) {'use strict';












function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var objects={};
var uniqueID=1;
var emptyObject={};

var ReactNativePropRegistry=function(){
function ReactNativePropRegistry(){
_classCallCheck(this,ReactNativePropRegistry);}


ReactNativePropRegistry.register=function register(object){
var id=++uniqueID;
if(process.env.NODE_ENV!=='production'){
Object.freeze(object);}

objects[id]=object;
return id;};


ReactNativePropRegistry.getByID=function getByID(id){
if(!id){


return emptyObject;}


var object=objects[id];
if(!object){
console.warn('Invalid style with id `'+id+'`. Skipping ...');
return emptyObject;}

return object;};


return ReactNativePropRegistry;}();


module.exports=ReactNativePropRegistry;
}, "ReactNativePropRegistry");
__d(58 /* deepDiffer */, function(global, require, module, exports) {'use strict';















var deepDiffer=function deepDiffer(one,two){
if(one===two){

return false;}

if(typeof one==='function'&&typeof two==='function'){

return false;}

if(typeof one!=='object'||one===null){

return one!==two;}

if(typeof two!=='object'||two===null){


return true;}

if(one.constructor!==two.constructor){
return true;}

if(Array.isArray(one)){

var len=one.length;
if(two.length!==len){
return true;}

for(var ii=0;ii<len;ii++){
if(deepDiffer(one[ii],two[ii])){
return true;}}}else 


{
for(var key in one){
if(deepDiffer(one[key],two[key])){
return true;}}


for(var twoKey in two){


if(one[twoKey]===undefined&&two[twoKey]!==undefined){
return true;}}}



return false;};


module.exports=deepDiffer;
}, "deepDiffer");
__d(59 /* flattenStyle */, function(global, require, module, exports) {'use strict';












var ReactNativePropRegistry=require(57 /* ReactNativePropRegistry */);
var invariant=require(259 /* fbjs/lib/invariant */);



function getStyle(style){
if(typeof style==='number'){
return ReactNativePropRegistry.getByID(style);}

return style;}


function flattenStyle(style){
if(!style){
return undefined;}

invariant(style!==true,'style may be false but not true');

if(!Array.isArray(style)){
return getStyle(style);}


var result={};
for(var i=0,styleLength=style.length;i<styleLength;++i){
var computedStyle=flattenStyle(style[i]);
if(computedStyle){
for(var key in computedStyle){
result[key]=computedStyle[key];}}}



return result;}


module.exports=flattenStyle;
}, "flattenStyle");
__d(60 /* TextInputState */, function(global, require, module, exports) {'use strict';
















var Platform=require(13 /* Platform */);
var UIManager=require(61 /* UIManager */);

var TextInputState={



_currentlyFocusedID:null,





currentlyFocusedField:function currentlyFocusedField(){
return this._currentlyFocusedID;},







focusTextInput:function focusTextInput(textFieldID){
if(this._currentlyFocusedID!==textFieldID&&textFieldID!==null){
this._currentlyFocusedID=textFieldID;
if(Platform.OS==='ios'){
UIManager.focus(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.focusTextInput,
null);}}},










blurTextInput:function blurTextInput(textFieldID){
if(this._currentlyFocusedID===textFieldID&&textFieldID!==null){
this._currentlyFocusedID=null;
if(Platform.OS==='ios'){
UIManager.blur(textFieldID);}else 
if(Platform.OS==='android'){
UIManager.dispatchViewManagerCommand(
textFieldID,
UIManager.AndroidTextInput.Commands.blurTextInput,
null);}}}};






module.exports=TextInputState;
}, "TextInputState");
__d(61 /* UIManager */, function(global, require, module, exports) {'use strict';












var Platform=require(13 /* Platform */);
var NativeModules=require(12 /* NativeModules */);var 
UIManager=NativeModules.UIManager;

var findNodeHandle=require(62 /* findNodeHandle */);

var _takeSnapshot=UIManager.takeSnapshot;


















UIManager.takeSnapshot=function _callee(
view,
options){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(






_takeSnapshot){_context.next=3;break;}
console.warn('UIManager.takeSnapshot is not available on this platform');return _context.abrupt('return');case 3:


if(typeof view!=='number'&&view!=='window'){
view=findNodeHandle(view)||'window';}return _context.abrupt('return',

_takeSnapshot(view,options));case 5:case 'end':return _context.stop();}}},null,this);};







if(Platform.OS==='ios'){(function(){

function normalizePrefix(moduleName){
return moduleName.replace(/^(RCT|RK)/,'');}


Object.keys(UIManager).forEach(function(viewName){
var viewConfig=UIManager[viewName];
if(viewConfig.Manager){(function(){
var constants=void 0;

Object.defineProperty(viewConfig,'Constants',{
configurable:true,
enumerable:true,
get:function get(){
if(constants){
return constants;}

constants={};
var viewManager=NativeModules[normalizePrefix(viewConfig.Manager)];
viewManager&&Object.keys(viewManager).forEach(function(key){
var value=viewManager[key];
if(typeof value!=='function'){
constants[key]=value;}});


return constants;}});


var commands=void 0;

Object.defineProperty(viewConfig,'Commands',{
configurable:true,
enumerable:true,
get:function get(){
if(commands){
return commands;}

commands={};
var viewManager=NativeModules[normalizePrefix(viewConfig.Manager)];
var index=0;
viewManager&&Object.keys(viewManager).forEach(function(key){
var value=viewManager[key];
if(typeof value==='function'){
commands[key]=index++;}});


return commands;}});})();}});})();}






module.exports=UIManager;
}, "UIManager");
__d(62 /* findNodeHandle */, function(global, require, module, exports) {'use strict';













var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactInstanceMap=require(63 /* ./ReactInstanceMap */);

var invariant=require(259 /* fbjs/lib/invariant */);
var warning=require(265 /* fbjs/lib/warning */);































function findNodeHandle(componentOrHandle){
if(process.env.NODE_ENV!=='production'){
var owner=ReactCurrentOwner.current;
if(owner!==null){
process.env.NODE_ENV!=='production'?warning(owner._warnedAboutRefsInRender,'%s is accessing findNodeHandle inside its render(). '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',owner.getName()||'A component'):void 0;
owner._warnedAboutRefsInRender=true;}}


if(componentOrHandle==null){
return null;}

if(typeof componentOrHandle==='number'){

return componentOrHandle;}


var component=componentOrHandle;



var internalInstance=ReactInstanceMap.get(component);
if(internalInstance){
return internalInstance.getNativeNode();}else 
{
var rootNodeID=component._rootNodeID;
if(rootNodeID){
return rootNodeID;}else 
{
!(

typeof component==='object'&&'_rootNodeID' in component||

component.render!=null&&typeof component.render==='function')?process.env.NODE_ENV!=='production'?invariant(false,'findNodeHandle(...): Argument is not a component '+'(type: %s, keys: %s)',typeof component,Object.keys(component)):invariant(false):void 0;
!false?process.env.NODE_ENV!=='production'?invariant(false,'findNodeHandle(...): Unable to find node handle for unmounted '+'component.'):invariant(false):void 0;}}}




module.exports=findNodeHandle;
}, "findNodeHandle");
__d(63 /* ReactInstanceMap */, function(global, require, module, exports) {'use strict';





















var ReactInstanceMap={






remove:function remove(key){
key._reactInternalInstance=undefined;},


get:function get(key){
return key._reactInternalInstance;},


has:function has(key){
return key._reactInternalInstance!==undefined;},


set:function set(key,value){
key._reactInternalInstance=value;}};




module.exports=ReactInstanceMap;
}, "ReactInstanceMap");
__d(64 /* ReactNativeViewAttributes */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(65 /* ReactNativeStyleAttributes */);

var ReactNativeViewAttributes={};

ReactNativeViewAttributes.UIView={
pointerEvents:true,
accessible:true,
accessibilityLabel:true,
accessibilityComponentType:true,
accessibilityLiveRegion:true,
accessibilityTraits:true,
importantForAccessibility:true,
testID:true,
renderToHardwareTextureAndroid:true,
shouldRasterizeIOS:true,
onLayout:true,
onAccessibilityTap:true,
onMagicTap:true,
collapsable:true,
needsOffscreenAlphaCompositing:true,
style:ReactNativeStyleAttributes};


ReactNativeViewAttributes.RCTView=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{






removeClippedSubviews:true});


module.exports=ReactNativeViewAttributes;
}, "ReactNativeViewAttributes");
__d(65 /* ReactNativeStyleAttributes */, function(global, require, module, exports) {'use strict';













var ImageStylePropTypes=require(66 /* ImageStylePropTypes */);
var TextStylePropTypes=require(74 /* TextStylePropTypes */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);

var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var matricesDiffer=require(76 /* matricesDiffer */);
var processColor=require(77 /* processColor */);
var processTransform=require(78 /* processTransform */);
var sizesDiffer=require(80 /* sizesDiffer */);

var ReactNativeStyleAttributes=babelHelpers.extends({},
keyMirror(ViewStylePropTypes),
keyMirror(TextStylePropTypes),
keyMirror(ImageStylePropTypes));


ReactNativeStyleAttributes.transform={process:processTransform};
ReactNativeStyleAttributes.transformMatrix={diff:matricesDiffer};
ReactNativeStyleAttributes.shadowOffset={diff:sizesDiffer};


ReactNativeStyleAttributes.decomposedMatrix='decomposedMatrix';

var colorAttributes={process:processColor};
ReactNativeStyleAttributes.backgroundColor=colorAttributes;
ReactNativeStyleAttributes.borderBottomColor=colorAttributes;
ReactNativeStyleAttributes.borderColor=colorAttributes;
ReactNativeStyleAttributes.borderLeftColor=colorAttributes;
ReactNativeStyleAttributes.borderRightColor=colorAttributes;
ReactNativeStyleAttributes.borderTopColor=colorAttributes;
ReactNativeStyleAttributes.color=colorAttributes;
ReactNativeStyleAttributes.shadowColor=colorAttributes;
ReactNativeStyleAttributes.textDecorationColor=colorAttributes;
ReactNativeStyleAttributes.tintColor=colorAttributes;
ReactNativeStyleAttributes.textShadowColor=colorAttributes;
ReactNativeStyleAttributes.overlayColor=colorAttributes;

module.exports=ReactNativeStyleAttributes;
}, "ReactNativeStyleAttributes");
__d(66 /* ImageStylePropTypes */, function(global, require, module, exports) {'use strict';












var ImageResizeMode=require(67 /* ImageResizeMode */);
var LayoutPropTypes=require(68 /* LayoutPropTypes */);
var ReactPropTypes=require(51 /* ReactPropTypes */);
var ColorPropType=require(69 /* ColorPropType */);
var ShadowPropTypesIOS=require(71 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(72 /* TransformPropTypes */);

var ImageStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
resizeMode:ReactPropTypes.oneOf(Object.keys(ImageResizeMode)),
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderWidth:ReactPropTypes.number,
borderRadius:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),




tintColor:ColorPropType,
opacity:ReactPropTypes.number,

















overlayColor:ReactPropTypes.string,


borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number});


module.exports=ImageStylePropTypes;
}, "ImageStylePropTypes");
__d(67 /* ImageResizeMode */, function(global, require, module, exports) {'use strict';












var keyMirror=require(256 /* fbjs/lib/keyMirror */);





var ImageResizeMode=keyMirror({




contain:null,




cover:null,





stretch:null,





center:null});


module.exports=ImageResizeMode;
}, "ImageResizeMode");
__d(68 /* LayoutPropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(51 /* ReactPropTypes */);













var LayoutPropTypes={
width:ReactPropTypes.number,
height:ReactPropTypes.number,
top:ReactPropTypes.number,
left:ReactPropTypes.number,
right:ReactPropTypes.number,
bottom:ReactPropTypes.number,
margin:ReactPropTypes.number,
marginVertical:ReactPropTypes.number,
marginHorizontal:ReactPropTypes.number,
marginTop:ReactPropTypes.number,
marginBottom:ReactPropTypes.number,
marginLeft:ReactPropTypes.number,
marginRight:ReactPropTypes.number,
padding:ReactPropTypes.number,
paddingVertical:ReactPropTypes.number,
paddingHorizontal:ReactPropTypes.number,
paddingTop:ReactPropTypes.number,
paddingBottom:ReactPropTypes.number,
paddingLeft:ReactPropTypes.number,
paddingRight:ReactPropTypes.number,
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,

position:ReactPropTypes.oneOf([
'absolute',
'relative']),



flexDirection:ReactPropTypes.oneOf([
'row',
'column']),



flexWrap:ReactPropTypes.oneOf([
'wrap',
'nowrap']),




justifyContent:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'space-between',
'space-around']),




alignItems:ReactPropTypes.oneOf([
'flex-start',
'flex-end',
'center',
'stretch']),




alignSelf:ReactPropTypes.oneOf([
'auto',
'flex-start',
'flex-end',
'center',
'stretch']),



flex:ReactPropTypes.number};


module.exports=LayoutPropTypes;
}, "LayoutPropTypes");
__d(69 /* ColorPropType */, function(global, require, module, exports) {'use strict';











var ReactPropTypes=require(51 /* ReactPropTypes */);
var ReactPropTypeLocationNames=require(48 /* ReactPropTypeLocationNames */);

var normalizeColor=require(70 /* normalizeColor */);

var colorPropType=function colorPropType(isRequired,props,propName,componentName,location,propFullName){
var color=props[propName];
if(color===undefined||color===null){
if(isRequired){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Required '+locationName+' `'+(propFullName||propName)+
'` was not specified in `'+componentName+'`.');}


return;}


if(typeof color==='number'){



return;}


if(normalizeColor(color)===null){
var locationName=ReactPropTypeLocationNames[location];
return new Error(
'Invalid '+locationName+' `'+(propFullName||propName)+
'` supplied to `'+componentName+'`: '+color+'\n'+'Valid color formats are\n  - \'#f0f\' (#rgb)\n  - \'#f0fc\' (#rgba)\n  - \'#ff00ff\' (#rrggbb)\n  - \'#ff00ff00\' (#rrggbbaa)\n  - \'rgb(255, 255, 255)\'\n  - \'rgba(255, 255, 255, 1.0)\'\n  - \'hsl(360, 100%, 100%)\'\n  - \'hsla(360, 100%, 100%, 1.0)\'\n  - \'transparent\'\n  - \'red\'\n  - 0xff00ff00 (0xrrggbbaa)\n');}};
















var ColorPropType=colorPropType.bind(null,false);
ColorPropType.isRequired=colorPropType.bind(null,true);

module.exports=ColorPropType;
}, "ColorPropType");
__d(70 /* normalizeColor */, function(global, require, module, exports) {'use strict';













function normalizeColor(color){
var match;

if(typeof color==='number'){
if(color>>>0===color&&color>=0&&color<=0xffffffff){
return color;}

return null;}



if(match=matchers.hex6.exec(color)){
return parseInt(match[1]+'ff',16)>>>0;}


if(names.hasOwnProperty(color)){
return names[color];}


if(match=matchers.rgb.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
0x000000ff)>>>
0;}


if(match=matchers.rgba.exec(color)){
return (
parse255(match[1])<<24|
parse255(match[2])<<16|
parse255(match[3])<<8|
parse1(match[4]))>>>
0;}


if(match=matchers.hex3.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
'ff',
16)>>>
0;}



if(match=matchers.hex8.exec(color)){
return parseInt(match[1],16)>>>0;}


if(match=matchers.hex4.exec(color)){
return parseInt(
match[1]+match[1]+
match[2]+match[2]+
match[3]+match[3]+
match[4]+match[4],
16)>>>
0;}


if(match=matchers.hsl.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

0x000000ff)>>>
0;}


if(match=matchers.hsla.exec(color)){
return (
hslToRgb(
parse360(match[1]),
parsePercentage(match[2]),
parsePercentage(match[3]))|

parse1(match[4]))>>>
0;}


return null;}


function hue2rgb(p,q,t){
if(t<0){
t+=1;}

if(t>1){
t-=1;}

if(t<1/6){
return p+(q-p)*6*t;}

if(t<1/2){
return q;}

if(t<2/3){
return p+(q-p)*(2/3-t)*6;}

return p;}


function hslToRgb(h,s,l){
var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
var r=hue2rgb(p,q,h+1/3);
var g=hue2rgb(p,q,h);
var b=hue2rgb(p,q,h-1/3);

return (
Math.round(r*255)<<24|
Math.round(g*255)<<16|
Math.round(b*255)<<8);}




var NUMBER='[-+]?\\d*\\.?\\d+';
var PERCENTAGE=NUMBER+'%';

function call(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
return '\\(\\s*('+args.join(')\\s*,\\s*(')+')\\s*\\)';}


var matchers={
rgb:new RegExp('rgb'+call(NUMBER,NUMBER,NUMBER)),
rgba:new RegExp('rgba'+call(NUMBER,NUMBER,NUMBER,NUMBER)),
hsl:new RegExp('hsl'+call(NUMBER,PERCENTAGE,PERCENTAGE)),
hsla:new RegExp('hsla'+call(NUMBER,PERCENTAGE,PERCENTAGE,NUMBER)),
hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex4:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
hex6:/^#([0-9a-fA-F]{6})$/,
hex8:/^#([0-9a-fA-F]{8})$/};


function parse255(str){
var int=parseInt(str,10);
if(int<0){
return 0;}

if(int>255){
return 255;}

return int;}


function parse360(str){
var int=parseFloat(str);
return (int%360+360)%360/360;}


function parse1(str){
var num=parseFloat(str);
if(num<0){
return 0;}

if(num>1){
return 255;}

return Math.round(num*255);}


function parsePercentage(str){

var int=parseFloat(str,10);
if(int<0){
return 0;}

if(int>100){
return 1;}

return int/100;}


var names={
transparent:0x00000000,


aliceblue:0xf0f8ffff,
antiquewhite:0xfaebd7ff,
aqua:0x00ffffff,
aquamarine:0x7fffd4ff,
azure:0xf0ffffff,
beige:0xf5f5dcff,
bisque:0xffe4c4ff,
black:0x000000ff,
blanchedalmond:0xffebcdff,
blue:0x0000ffff,
blueviolet:0x8a2be2ff,
brown:0xa52a2aff,
burlywood:0xdeb887ff,
burntsienna:0xea7e5dff,
cadetblue:0x5f9ea0ff,
chartreuse:0x7fff00ff,
chocolate:0xd2691eff,
coral:0xff7f50ff,
cornflowerblue:0x6495edff,
cornsilk:0xfff8dcff,
crimson:0xdc143cff,
cyan:0x00ffffff,
darkblue:0x00008bff,
darkcyan:0x008b8bff,
darkgoldenrod:0xb8860bff,
darkgray:0xa9a9a9ff,
darkgreen:0x006400ff,
darkgrey:0xa9a9a9ff,
darkkhaki:0xbdb76bff,
darkmagenta:0x8b008bff,
darkolivegreen:0x556b2fff,
darkorange:0xff8c00ff,
darkorchid:0x9932ccff,
darkred:0x8b0000ff,
darksalmon:0xe9967aff,
darkseagreen:0x8fbc8fff,
darkslateblue:0x483d8bff,
darkslategray:0x2f4f4fff,
darkslategrey:0x2f4f4fff,
darkturquoise:0x00ced1ff,
darkviolet:0x9400d3ff,
deeppink:0xff1493ff,
deepskyblue:0x00bfffff,
dimgray:0x696969ff,
dimgrey:0x696969ff,
dodgerblue:0x1e90ffff,
firebrick:0xb22222ff,
floralwhite:0xfffaf0ff,
forestgreen:0x228b22ff,
fuchsia:0xff00ffff,
gainsboro:0xdcdcdcff,
ghostwhite:0xf8f8ffff,
gold:0xffd700ff,
goldenrod:0xdaa520ff,
gray:0x808080ff,
green:0x008000ff,
greenyellow:0xadff2fff,
grey:0x808080ff,
honeydew:0xf0fff0ff,
hotpink:0xff69b4ff,
indianred:0xcd5c5cff,
indigo:0x4b0082ff,
ivory:0xfffff0ff,
khaki:0xf0e68cff,
lavender:0xe6e6faff,
lavenderblush:0xfff0f5ff,
lawngreen:0x7cfc00ff,
lemonchiffon:0xfffacdff,
lightblue:0xadd8e6ff,
lightcoral:0xf08080ff,
lightcyan:0xe0ffffff,
lightgoldenrodyellow:0xfafad2ff,
lightgray:0xd3d3d3ff,
lightgreen:0x90ee90ff,
lightgrey:0xd3d3d3ff,
lightpink:0xffb6c1ff,
lightsalmon:0xffa07aff,
lightseagreen:0x20b2aaff,
lightskyblue:0x87cefaff,
lightslategray:0x778899ff,
lightslategrey:0x778899ff,
lightsteelblue:0xb0c4deff,
lightyellow:0xffffe0ff,
lime:0x00ff00ff,
limegreen:0x32cd32ff,
linen:0xfaf0e6ff,
magenta:0xff00ffff,
maroon:0x800000ff,
mediumaquamarine:0x66cdaaff,
mediumblue:0x0000cdff,
mediumorchid:0xba55d3ff,
mediumpurple:0x9370dbff,
mediumseagreen:0x3cb371ff,
mediumslateblue:0x7b68eeff,
mediumspringgreen:0x00fa9aff,
mediumturquoise:0x48d1ccff,
mediumvioletred:0xc71585ff,
midnightblue:0x191970ff,
mintcream:0xf5fffaff,
mistyrose:0xffe4e1ff,
moccasin:0xffe4b5ff,
navajowhite:0xffdeadff,
navy:0x000080ff,
oldlace:0xfdf5e6ff,
olive:0x808000ff,
olivedrab:0x6b8e23ff,
orange:0xffa500ff,
orangered:0xff4500ff,
orchid:0xda70d6ff,
palegoldenrod:0xeee8aaff,
palegreen:0x98fb98ff,
paleturquoise:0xafeeeeff,
palevioletred:0xdb7093ff,
papayawhip:0xffefd5ff,
peachpuff:0xffdab9ff,
peru:0xcd853fff,
pink:0xffc0cbff,
plum:0xdda0ddff,
powderblue:0xb0e0e6ff,
purple:0x800080ff,
rebeccapurple:0x663399ff,
red:0xff0000ff,
rosybrown:0xbc8f8fff,
royalblue:0x4169e1ff,
saddlebrown:0x8b4513ff,
salmon:0xfa8072ff,
sandybrown:0xf4a460ff,
seagreen:0x2e8b57ff,
seashell:0xfff5eeff,
sienna:0xa0522dff,
silver:0xc0c0c0ff,
skyblue:0x87ceebff,
slateblue:0x6a5acdff,
slategray:0x708090ff,
slategrey:0x708090ff,
snow:0xfffafaff,
springgreen:0x00ff7fff,
steelblue:0x4682b4ff,
tan:0xd2b48cff,
teal:0x008080ff,
thistle:0xd8bfd8ff,
tomato:0xff6347ff,
turquoise:0x40e0d0ff,
violet:0xee82eeff,
wheat:0xf5deb3ff,
white:0xffffffff,
whitesmoke:0xf5f5f5ff,
yellow:0xffff00ff,
yellowgreen:0x9acd32ff};


module.exports=normalizeColor;
}, "normalizeColor");
__d(71 /* ShadowPropTypesIOS */, function(global, require, module, exports) {'use strict';












var ColorPropType=require(69 /* ColorPropType */);
var ReactPropTypes=require(51 /* ReactPropTypes */);

var ShadowPropTypesIOS={




shadowColor:ColorPropType,




shadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),





shadowOpacity:ReactPropTypes.number,




shadowRadius:ReactPropTypes.number};


module.exports=ShadowPropTypesIOS;
}, "ShadowPropTypesIOS");
__d(72 /* TransformPropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(51 /* ReactPropTypes */);
var deprecatedPropType=require(73 /* deprecatedPropType */);

var ArrayOfNumberPropType=ReactPropTypes.arrayOf(ReactPropTypes.number);

var TransformMatrixPropType=function TransformMatrixPropType(
props,
propName,
componentName)
{
if(props[propName]){
return new Error(
'The transformMatrix style property is deprecated. '+
'Use `transform: [{ matrix: ... }]` instead.');}};




var DecomposedMatrixPropType=function DecomposedMatrixPropType(
props,
propName,
componentName)
{
if(props[propName]){
return new Error(
'The decomposedMatrix style property is deprecated. '+
'Use `transform: [...]` instead.');}};




var TransformPropTypes={
transform:ReactPropTypes.arrayOf(
ReactPropTypes.oneOfType([
ReactPropTypes.shape({perspective:ReactPropTypes.number}),
ReactPropTypes.shape({rotate:ReactPropTypes.string}),
ReactPropTypes.shape({rotateX:ReactPropTypes.string}),
ReactPropTypes.shape({rotateY:ReactPropTypes.string}),
ReactPropTypes.shape({rotateZ:ReactPropTypes.string}),
ReactPropTypes.shape({scale:ReactPropTypes.number}),
ReactPropTypes.shape({scaleX:ReactPropTypes.number}),
ReactPropTypes.shape({scaleY:ReactPropTypes.number}),
ReactPropTypes.shape({translateX:ReactPropTypes.number}),
ReactPropTypes.shape({translateY:ReactPropTypes.number}),
ReactPropTypes.shape({skewX:ReactPropTypes.string}),
ReactPropTypes.shape({skewY:ReactPropTypes.string})])),




transformMatrix:TransformMatrixPropType,
decomposedMatrix:DecomposedMatrixPropType,


scaleX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
scaleY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
rotation:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateX:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.'),
translateY:deprecatedPropType(ReactPropTypes.number,'Use the transform prop instead.')};


module.exports=TransformPropTypes;
}, "TransformPropTypes");
__d(73 /* deprecatedPropType */, function(global, require, module, exports) {'use strict';












var UIManager=require(61 /* UIManager */);




function deprecatedPropType(
propType,
explanation)
{
return function validate(props,propName,componentName){

if(!UIManager[componentName]&&props[propName]!==undefined){
console.warn('`'+propName+'` supplied to `'+componentName+'` has been deprecated. '+explanation);}


return propType(props,propName,componentName);};}



module.exports=deprecatedPropType;
}, "deprecatedPropType");
__d(74 /* TextStylePropTypes */, function(global, require, module, exports) {'use strict';












var ReactPropTypes=require(51 /* ReactPropTypes */);
var ColorPropType=require(69 /* ColorPropType */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);


var TextStylePropTypes=babelHelpers.extends(Object.create(ViewStylePropTypes),{
color:ColorPropType,
fontFamily:ReactPropTypes.string,
fontSize:ReactPropTypes.number,
fontStyle:ReactPropTypes.oneOf(['normal','italic']),





fontWeight:ReactPropTypes.oneOf(
['normal','bold',
'100','200','300','400','500','600','700','800','900']),

textShadowOffset:ReactPropTypes.shape(
{width:ReactPropTypes.number,height:ReactPropTypes.number}),

textShadowRadius:ReactPropTypes.number,
textShadowColor:ColorPropType,



letterSpacing:ReactPropTypes.number,
lineHeight:ReactPropTypes.number,




textAlign:ReactPropTypes.oneOf(
['auto','left','right','center','justify']),




textAlignVertical:ReactPropTypes.oneOf(
['auto','top','bottom','center']),

textDecorationLine:ReactPropTypes.oneOf(
['none','underline','line-through','underline line-through']),




textDecorationStyle:ReactPropTypes.oneOf(
['solid','double','dotted','dashed']),




textDecorationColor:ColorPropType,



writingDirection:ReactPropTypes.oneOf(
['auto','ltr','rtl'])});



module.exports=TextStylePropTypes;
}, "TextStylePropTypes");
__d(75 /* ViewStylePropTypes */, function(global, require, module, exports) {'use strict';












var LayoutPropTypes=require(68 /* LayoutPropTypes */);
var ReactPropTypes=require(51 /* ReactPropTypes */);
var ColorPropType=require(69 /* ColorPropType */);
var ShadowPropTypesIOS=require(71 /* ShadowPropTypesIOS */);
var TransformPropTypes=require(72 /* TransformPropTypes */);




var ViewStylePropTypes=babelHelpers.extends({},
LayoutPropTypes,
ShadowPropTypesIOS,
TransformPropTypes,{
backfaceVisibility:ReactPropTypes.oneOf(['visible','hidden']),
backgroundColor:ColorPropType,
borderColor:ColorPropType,
borderTopColor:ColorPropType,
borderRightColor:ColorPropType,
borderBottomColor:ColorPropType,
borderLeftColor:ColorPropType,
borderRadius:ReactPropTypes.number,
borderTopLeftRadius:ReactPropTypes.number,
borderTopRightRadius:ReactPropTypes.number,
borderBottomLeftRadius:ReactPropTypes.number,
borderBottomRightRadius:ReactPropTypes.number,
borderStyle:ReactPropTypes.oneOf(['solid','dotted','dashed']),
borderWidth:ReactPropTypes.number,
borderTopWidth:ReactPropTypes.number,
borderRightWidth:ReactPropTypes.number,
borderBottomWidth:ReactPropTypes.number,
borderLeftWidth:ReactPropTypes.number,
opacity:ReactPropTypes.number,
overflow:ReactPropTypes.oneOf(['visible','hidden']),







elevation:ReactPropTypes.number});


module.exports=ViewStylePropTypes;
}, "ViewStylePropTypes");
__d(76 /* matricesDiffer */, function(global, require, module, exports) {'use strict';




















var matricesDiffer=function matricesDiffer(one,two){
if(one===two){
return false;}

return !one||!two||
one[12]!==two[12]||
one[13]!==two[13]||
one[14]!==two[14]||
one[5]!==two[5]||
one[10]!==two[10]||
one[1]!==two[1]||
one[2]!==two[2]||
one[3]!==two[3]||
one[4]!==two[4]||
one[6]!==two[6]||
one[7]!==two[7]||
one[8]!==two[8]||
one[9]!==two[9]||
one[11]!==two[11]||
one[15]!==two[15];};


module.exports=matricesDiffer;
}, "matricesDiffer");
__d(77 /* processColor */, function(global, require, module, exports) {'use strict';











var Platform=require(13 /* Platform */);

var normalizeColor=require(70 /* normalizeColor */);


function processColor(color){
if(color===undefined||color===null){
return color;}


var int32Color=normalizeColor(color);
if(int32Color===null){
return undefined;}



int32Color=(int32Color<<24|int32Color>>>8)>>>0;

if(Platform.OS==='android'){




int32Color=int32Color|0x0;}

return int32Color;}


module.exports=processColor;
}, "processColor");
__d(78 /* processTransform */, function(global, require, module, exports) {'use strict';












var MatrixMath=require(79 /* MatrixMath */);
var Platform=require(13 /* Platform */);

var invariant=require(259 /* fbjs/lib/invariant */);
var stringifySafe=require(14 /* stringifySafe */);









function processTransform(transform){
var result=MatrixMath.createIdentityMatrix();

transform.forEach(function(transformation){
var key=Object.keys(transformation)[0];
var value=transformation[key];
if(__DEV__){
_validateTransform(key,value,transformation);}


switch(key){
case 'matrix':
MatrixMath.multiplyInto(result,result,value);
break;
case 'perspective':
_multiplyTransform(result,MatrixMath.reusePerspectiveCommand,[value]);
break;
case 'rotateX':
_multiplyTransform(result,MatrixMath.reuseRotateXCommand,[_convertToRadians(value)]);
break;
case 'rotateY':
_multiplyTransform(result,MatrixMath.reuseRotateYCommand,[_convertToRadians(value)]);
break;
case 'rotate':
case 'rotateZ':
_multiplyTransform(result,MatrixMath.reuseRotateZCommand,[_convertToRadians(value)]);
break;
case 'scale':
_multiplyTransform(result,MatrixMath.reuseScaleCommand,[value]);
break;
case 'scaleX':
_multiplyTransform(result,MatrixMath.reuseScaleXCommand,[value]);
break;
case 'scaleY':
_multiplyTransform(result,MatrixMath.reuseScaleYCommand,[value]);
break;
case 'translate':
_multiplyTransform(result,MatrixMath.reuseTranslate3dCommand,[value[0],value[1],value[2]||0]);
break;
case 'translateX':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[value,0]);
break;
case 'translateY':
_multiplyTransform(result,MatrixMath.reuseTranslate2dCommand,[0,value]);
break;
case 'skewX':
_multiplyTransform(result,MatrixMath.reuseSkewXCommand,[_convertToRadians(value)]);
break;
case 'skewY':
_multiplyTransform(result,MatrixMath.reuseSkewYCommand,[_convertToRadians(value)]);
break;
default:
throw new Error('Invalid transform name: '+key);}});







if(Platform.OS==='android'){
return MatrixMath.decomposeMatrix(result);}

return result;}





function _multiplyTransform(
result,
matrixMathFunction,
args)
{
var matrixToApply=MatrixMath.createIdentityMatrix();
var argsWithIdentity=[matrixToApply].concat(args);
matrixMathFunction.apply(this,argsWithIdentity);
MatrixMath.multiplyInto(result,result,matrixToApply);}






function _convertToRadians(value){
var floatValue=parseFloat(value,10);
return value.indexOf('rad')>-1?floatValue:floatValue*Math.PI/180;}


function _validateTransform(key,value,transformation){
invariant(
!value.getValue,
'You passed an Animated.Value to a normal component. '+
'You need to wrap that component in an Animated. For example, '+
'replace <View /> by <Animated.View />.');


var multivalueTransforms=[
'matrix',
'translate'];

if(multivalueTransforms.indexOf(key)!==-1){
invariant(
Array.isArray(value),
'Transform with key of %s must have an array as the value: %s',
key,
stringifySafe(transformation));}


switch(key){
case 'matrix':
invariant(
value.length===9||value.length===16,
'Matrix transform must have a length of 9 (2d) or 16 (3d). '+
'Provided matrix has a length of %s: %s',
value.length,
stringifySafe(transformation));

break;
case 'translate':
break;
case 'rotateX':
case 'rotateY':
case 'rotateZ':
case 'rotate':
case 'skewX':
case 'skewY':
invariant(
typeof value==='string',
'Transform with key of "%s" must be a string: %s',
key,
stringifySafe(transformation));

invariant(
value.indexOf('deg')>-1||value.indexOf('rad')>-1,
'Rotate transform must be expressed in degrees (deg) or radians '+
'(rad): %s',
stringifySafe(transformation));

break;
case 'perspective':
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));

invariant(
value!==0,
'Transform with key of "%s" cannot be zero: %s',
key,
stringifySafe(transformation));

break;
default:
invariant(
typeof value==='number',
'Transform with key of "%s" must be a number: %s',
key,
stringifySafe(transformation));}}




module.exports=processTransform;
}, "processTransform");
__d(79 /* MatrixMath */, function(global, require, module, exports) {'use strict';








var invariant=require(259 /* fbjs/lib/invariant */);





var MatrixMath={
createIdentityMatrix:function createIdentityMatrix(){
return [
1,0,0,0,
0,1,0,0,
0,0,1,0,
0,0,0,1];},



createCopy:function createCopy(m){
return [
m[0],m[1],m[2],m[3],
m[4],m[5],m[6],m[7],
m[8],m[9],m[10],m[11],
m[12],m[13],m[14],m[15]];},



createOrthographic:function createOrthographic(left,right,bottom,top,near,far){
var a=2/(right-left);
var b=2/(top-bottom);
var c=-2/(far-near);

var tx=-(right+left)/(right-left);
var ty=-(top+bottom)/(top-bottom);
var tz=-(far+near)/(far-near);

return [
a,0,0,0,
0,b,0,0,
0,0,c,0,
tx,ty,tz,1];},



createFrustum:function createFrustum(left,right,bottom,top,near,far){
var r_width=1/(right-left);
var r_height=1/(top-bottom);
var r_depth=1/(near-far);
var x=2*(near*r_width);
var y=2*(near*r_height);
var A=(right+left)*r_width;
var B=(top+bottom)*r_height;
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
x,0,0,0,
0,y,0,0,
A,B,C,-1,
0,0,D,0];},









createPerspective:function createPerspective(fovInRadians,aspect,near,far){
var h=1/Math.tan(fovInRadians/2);
var r_depth=1/(near-far);
var C=(far+near)*r_depth;
var D=2*(far*near*r_depth);
return [
h/aspect,0,0,0,
0,h,0,0,
0,0,C,-1,
0,0,D,0];},



createTranslate2d:function createTranslate2d(x,y){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseTranslate2dCommand(mat,x,y);
return mat;},


reuseTranslate2dCommand:function reuseTranslate2dCommand(matrixCommand,x,y){
matrixCommand[12]=x;
matrixCommand[13]=y;},


reuseTranslate3dCommand:function reuseTranslate3dCommand(matrixCommand,x,y,z){
matrixCommand[12]=x;
matrixCommand[13]=y;
matrixCommand[14]=z;},


createScale:function createScale(factor){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseScaleCommand(mat,factor);
return mat;},


reuseScaleCommand:function reuseScaleCommand(matrixCommand,factor){
matrixCommand[0]=factor;
matrixCommand[5]=factor;},


reuseScale3dCommand:function reuseScale3dCommand(matrixCommand,x,y,z){
matrixCommand[0]=x;
matrixCommand[5]=y;
matrixCommand[10]=z;},


reusePerspectiveCommand:function reusePerspectiveCommand(matrixCommand,p){
matrixCommand[11]=-1/p;},


reuseScaleXCommand:function reuseScaleXCommand(matrixCommand,factor){
matrixCommand[0]=factor;},


reuseScaleYCommand:function reuseScaleYCommand(matrixCommand,factor){
matrixCommand[5]=factor;},


reuseScaleZCommand:function reuseScaleZCommand(matrixCommand,factor){
matrixCommand[10]=factor;},


reuseRotateXCommand:function reuseRotateXCommand(matrixCommand,radians){
matrixCommand[5]=Math.cos(radians);
matrixCommand[6]=Math.sin(radians);
matrixCommand[9]=-Math.sin(radians);
matrixCommand[10]=Math.cos(radians);},


reuseRotateYCommand:function reuseRotateYCommand(matrixCommand,amount){
matrixCommand[0]=Math.cos(amount);
matrixCommand[2]=-Math.sin(amount);
matrixCommand[8]=Math.sin(amount);
matrixCommand[10]=Math.cos(amount);},



reuseRotateZCommand:function reuseRotateZCommand(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);
matrixCommand[4]=-Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


createRotateZ:function createRotateZ(radians){
var mat=MatrixMath.createIdentityMatrix();
MatrixMath.reuseRotateZCommand(mat,radians);
return mat;},


reuseSkewXCommand:function reuseSkewXCommand(matrixCommand,radians){
matrixCommand[4]=Math.sin(radians);
matrixCommand[5]=Math.cos(radians);},


reuseSkewYCommand:function reuseSkewYCommand(matrixCommand,radians){
matrixCommand[0]=Math.cos(radians);
matrixCommand[1]=Math.sin(radians);},


multiplyInto:function multiplyInto(out,a,b){
var a00=a[0],a01=a[1],a02=a[2],a03=a[3],
a10=a[4],a11=a[5],a12=a[6],a13=a[7],
a20=a[8],a21=a[9],a22=a[10],a23=a[11],
a30=a[12],a31=a[13],a32=a[14],a33=a[15];

var b0=b[0],b1=b[1],b2=b[2],b3=b[3];
out[0]=b0*a00+b1*a10+b2*a20+b3*a30;
out[1]=b0*a01+b1*a11+b2*a21+b3*a31;
out[2]=b0*a02+b1*a12+b2*a22+b3*a32;
out[3]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[4];b1=b[5];b2=b[6];b3=b[7];
out[4]=b0*a00+b1*a10+b2*a20+b3*a30;
out[5]=b0*a01+b1*a11+b2*a21+b3*a31;
out[6]=b0*a02+b1*a12+b2*a22+b3*a32;
out[7]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[8];b1=b[9];b2=b[10];b3=b[11];
out[8]=b0*a00+b1*a10+b2*a20+b3*a30;
out[9]=b0*a01+b1*a11+b2*a21+b3*a31;
out[10]=b0*a02+b1*a12+b2*a22+b3*a32;
out[11]=b0*a03+b1*a13+b2*a23+b3*a33;

b0=b[12];b1=b[13];b2=b[14];b3=b[15];
out[12]=b0*a00+b1*a10+b2*a20+b3*a30;
out[13]=b0*a01+b1*a11+b2*a21+b3*a31;
out[14]=b0*a02+b1*a12+b2*a22+b3*a32;
out[15]=b0*a03+b1*a13+b2*a23+b3*a33;},


determinant:function determinant(matrix){var _matrix=babelHelpers.slicedToArray(





matrix,16);var m00=_matrix[0];var m01=_matrix[1];var m02=_matrix[2];var m03=_matrix[3];var m10=_matrix[4];var m11=_matrix[5];var m12=_matrix[6];var m13=_matrix[7];var m20=_matrix[8];var m21=_matrix[9];var m22=_matrix[10];var m23=_matrix[11];var m30=_matrix[12];var m31=_matrix[13];var m32=_matrix[14];var m33=_matrix[15];
return (
m03*m12*m21*m30-m02*m13*m21*m30-
m03*m11*m22*m30+m01*m13*m22*m30+
m02*m11*m23*m30-m01*m12*m23*m30-
m03*m12*m20*m31+m02*m13*m20*m31+
m03*m10*m22*m31-m00*m13*m22*m31-
m02*m10*m23*m31+m00*m12*m23*m31+
m03*m11*m20*m32-m01*m13*m20*m32-
m03*m10*m21*m32+m00*m13*m21*m32+
m01*m10*m23*m32-m00*m11*m23*m32-
m02*m11*m20*m33+m01*m12*m20*m33+
m02*m10*m21*m33-m00*m12*m21*m33-
m01*m10*m22*m33+m00*m11*m22*m33);},










inverse:function inverse(matrix){
var det=MatrixMath.determinant(matrix);
if(!det){
return matrix;}var _matrix2=babelHelpers.slicedToArray(






matrix,16);var m00=_matrix2[0];var m01=_matrix2[1];var m02=_matrix2[2];var m03=_matrix2[3];var m10=_matrix2[4];var m11=_matrix2[5];var m12=_matrix2[6];var m13=_matrix2[7];var m20=_matrix2[8];var m21=_matrix2[9];var m22=_matrix2[10];var m23=_matrix2[11];var m30=_matrix2[12];var m31=_matrix2[13];var m32=_matrix2[14];var m33=_matrix2[15];
return [
(m12*m23*m31-m13*m22*m31+m13*m21*m32-m11*m23*m32-m12*m21*m33+m11*m22*m33)/det,
(m03*m22*m31-m02*m23*m31-m03*m21*m32+m01*m23*m32+m02*m21*m33-m01*m22*m33)/det,
(m02*m13*m31-m03*m12*m31+m03*m11*m32-m01*m13*m32-m02*m11*m33+m01*m12*m33)/det,
(m03*m12*m21-m02*m13*m21-m03*m11*m22+m01*m13*m22+m02*m11*m23-m01*m12*m23)/det,
(m13*m22*m30-m12*m23*m30-m13*m20*m32+m10*m23*m32+m12*m20*m33-m10*m22*m33)/det,
(m02*m23*m30-m03*m22*m30+m03*m20*m32-m00*m23*m32-m02*m20*m33+m00*m22*m33)/det,
(m03*m12*m30-m02*m13*m30-m03*m10*m32+m00*m13*m32+m02*m10*m33-m00*m12*m33)/det,
(m02*m13*m20-m03*m12*m20+m03*m10*m22-m00*m13*m22-m02*m10*m23+m00*m12*m23)/det,
(m11*m23*m30-m13*m21*m30+m13*m20*m31-m10*m23*m31-m11*m20*m33+m10*m21*m33)/det,
(m03*m21*m30-m01*m23*m30-m03*m20*m31+m00*m23*m31+m01*m20*m33-m00*m21*m33)/det,
(m01*m13*m30-m03*m11*m30+m03*m10*m31-m00*m13*m31-m01*m10*m33+m00*m11*m33)/det,
(m03*m11*m20-m01*m13*m20-m03*m10*m21+m00*m13*m21+m01*m10*m23-m00*m11*m23)/det,
(m12*m21*m30-m11*m22*m30-m12*m20*m31+m10*m22*m31+m11*m20*m32-m10*m21*m32)/det,
(m01*m22*m30-m02*m21*m30+m02*m20*m31-m00*m22*m31-m01*m20*m32+m00*m21*m32)/det,
(m02*m11*m30-m01*m12*m30-m02*m10*m31+m00*m12*m31+m01*m10*m32-m00*m11*m32)/det,
(m01*m12*m20-m02*m11*m20+m02*m10*m21-m00*m12*m21-m01*m10*m22+m00*m11*m22)/det];},






transpose:function transpose(m){
return [
m[0],m[4],m[8],m[12],
m[1],m[5],m[9],m[13],
m[2],m[6],m[10],m[14],
m[3],m[7],m[11],m[15]];},






multiplyVectorByMatrix:function multiplyVectorByMatrix(
v,
m)
{var _v=babelHelpers.slicedToArray(
v,4);var vx=_v[0];var vy=_v[1];var vz=_v[2];var vw=_v[3];
return [
vx*m[0]+vy*m[4]+vz*m[8]+vw*m[12],
vx*m[1]+vy*m[5]+vz*m[9]+vw*m[13],
vx*m[2]+vy*m[6]+vz*m[10]+vw*m[14],
vx*m[3]+vy*m[7]+vz*m[11]+vw*m[15]];},






v3Length:function v3Length(a){
return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);},





v3Normalize:function v3Normalize(
vector,
v3Length)
{
var im=1/(v3Length||MatrixMath.v3Length(vector));
return [
vector[0]*im,
vector[1]*im,
vector[2]*im];},







v3Dot:function v3Dot(a,b){
return a[0]*b[0]+
a[1]*b[1]+
a[2]*b[2];},






v3Combine:function v3Combine(
a,
b,
aScale,
bScale)
{
return [
aScale*a[0]+bScale*b[0],
aScale*a[1]+bScale*b[1],
aScale*a[2]+bScale*b[2]];},







v3Cross:function v3Cross(a,b){
return [
a[1]*b[2]-a[2]*b[1],
a[2]*b[0]-a[0]*b[2],
a[0]*b[1]-a[1]*b[0]];},



















quaternionToDegreesXYZ:function quaternionToDegreesXYZ(q,matrix,row){var _q=babelHelpers.slicedToArray(
q,4);var qx=_q[0];var qy=_q[1];var qz=_q[2];var qw=_q[3];
var qw2=qw*qw;
var qx2=qx*qx;
var qy2=qy*qy;
var qz2=qz*qz;
var test=qx*qy+qz*qw;
var unit=qw2+qx2+qy2+qz2;
var conv=180/Math.PI;

if(test>0.49999*unit){
return [0,2*Math.atan2(qx,qw)*conv,90];}

if(test<-0.49999*unit){
return [0,-2*Math.atan2(qx,qw)*conv,-90];}


return [
MatrixMath.roundTo3Places(
Math.atan2(2*qx*qw-2*qy*qz,1-2*qx2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.atan2(2*qy*qw-2*qx*qz,1-2*qy2-2*qz2)*conv),

MatrixMath.roundTo3Places(
Math.asin(2*qx*qy+2*qz*qw)*conv)];},








roundTo3Places:function roundTo3Places(n){
var arr=n.toString().split('e');
return Math.round(arr[0]+'e'+(arr[1]?+arr[1]-3:3))*0.001;},













decomposeMatrix:function decomposeMatrix(transformMatrix){

invariant(
transformMatrix.length===16,
'Matrix decomposition needs a list of 3d matrix values, received %s',
transformMatrix);



var perspective=[];
var quaternion=[];
var scale=[];
var skew=[];
var translation=[];



if(!transformMatrix[15]){
return;}

var matrix=[];
var perspectiveMatrix=[];
for(var i=0;i<4;i++){
matrix.push([]);
for(var j=0;j<4;j++){
var value=transformMatrix[i*4+j]/transformMatrix[15];
matrix[i].push(value);
perspectiveMatrix.push(j===3?0:value);}}


perspectiveMatrix[15]=1;


if(!MatrixMath.determinant(perspectiveMatrix)){
return;}



if(matrix[0][3]!==0||matrix[1][3]!==0||matrix[2][3]!==0){


var rightHandSide=[
matrix[0][3],
matrix[1][3],
matrix[2][3],
matrix[3][3]];




var inversePerspectiveMatrix=MatrixMath.inverse(
perspectiveMatrix);

var transposedInversePerspectiveMatrix=MatrixMath.transpose(
inversePerspectiveMatrix);

var perspective=MatrixMath.multiplyVectorByMatrix(
rightHandSide,
transposedInversePerspectiveMatrix);}else 

{

perspective[0]=perspective[1]=perspective[2]=0;
perspective[3]=1;}



for(var i=0;i<3;i++){
translation[i]=matrix[3][i];}




var row=[];
for(i=0;i<3;i++){
row[i]=[
matrix[i][0],
matrix[i][1],
matrix[i][2]];}




scale[0]=MatrixMath.v3Length(row[0]);
row[0]=MatrixMath.v3Normalize(row[0],scale[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


skew[0]=MatrixMath.v3Dot(row[0],row[1]);
row[1]=MatrixMath.v3Combine(row[1],row[0],1.0,-skew[0]);


scale[1]=MatrixMath.v3Length(row[1]);
row[1]=MatrixMath.v3Normalize(row[1],scale[1]);
skew[0]/=scale[1];


skew[1]=MatrixMath.v3Dot(row[0],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[0],1.0,-skew[1]);
skew[2]=MatrixMath.v3Dot(row[1],row[2]);
row[2]=MatrixMath.v3Combine(row[2],row[1],1.0,-skew[2]);


scale[2]=MatrixMath.v3Length(row[2]);
row[2]=MatrixMath.v3Normalize(row[2],scale[2]);
skew[1]/=scale[2];
skew[2]/=scale[2];




var pdum3=MatrixMath.v3Cross(row[1],row[2]);
if(MatrixMath.v3Dot(row[0],pdum3)<0){
for(i=0;i<3;i++){
scale[i]*=-1;
row[i][0]*=-1;
row[i][1]*=-1;
row[i][2]*=-1;}}




quaternion[0]=
0.5*Math.sqrt(Math.max(1+row[0][0]-row[1][1]-row[2][2],0));
quaternion[1]=
0.5*Math.sqrt(Math.max(1-row[0][0]+row[1][1]-row[2][2],0));
quaternion[2]=
0.5*Math.sqrt(Math.max(1-row[0][0]-row[1][1]+row[2][2],0));
quaternion[3]=
0.5*Math.sqrt(Math.max(1+row[0][0]+row[1][1]+row[2][2],0));

if(row[2][1]>row[1][2]){
quaternion[0]=-quaternion[0];}

if(row[0][2]>row[2][0]){
quaternion[1]=-quaternion[1];}

if(row[1][0]>row[0][1]){
quaternion[2]=-quaternion[2];}



var rotationDegrees;
if(
quaternion[0]<0.001&&quaternion[0]>=0&&
quaternion[1]<0.001&&quaternion[1]>=0)
{

rotationDegrees=[0,0,MatrixMath.roundTo3Places(
Math.atan2(row[0][1],row[0][0])*180/Math.PI)];}else 

{
rotationDegrees=MatrixMath.quaternionToDegreesXYZ(quaternion,matrix,row);}



return {
rotationDegrees:rotationDegrees,
perspective:perspective,
quaternion:quaternion,
scale:scale,
skew:skew,
translation:translation,

rotate:rotationDegrees[2],
rotateX:rotationDegrees[0],
rotateY:rotationDegrees[1],
scaleX:scale[0],
scaleY:scale[1],
translateX:translation[0],
translateY:translation[1]};}};





module.exports=MatrixMath;
}, "MatrixMath");
__d(80 /* sizesDiffer */, function(global, require, module, exports) {'use strict';






var dummySize={width:undefined,height:undefined};

var sizesDiffer=function sizesDiffer(one,two){
one=one||dummySize;
two=two||dummySize;
return one!==two&&(
one.width!==two.width||
one.height!==two.height);};



module.exports=sizesDiffer;
}, "sizesDiffer");
__d(81 /* View */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/View/View.js';












var EdgeInsetsPropType=require(82 /* EdgeInsetsPropType */);
var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var PropTypes=require(51 /* ReactPropTypes */);
var React=require(34 /* React */);
var ReactNativeStyleAttributes=require(65 /* ReactNativeStyleAttributes */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(87 /* StyleSheetPropType */);
var UIManager=require(61 /* UIManager */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);

var requireNativeComponent=require(88 /* requireNativeComponent */);

var stylePropType=StyleSheetPropType(ViewStylePropTypes);

var AccessibilityTraits=[
'none',
'button',
'link',
'header',
'search',
'image',
'selected',
'plays',
'key',
'text',
'summary',
'disabled',
'frequentUpdates',
'startsMedia',
'adjustable',
'allowsDirectInteraction',
'pageTurn'];


var AccessibilityComponentType=[
'none',
'button',
'radiobutton_checked',
'radiobutton_unchecked'];


var forceTouchAvailable=UIManager.RCTView.Constants&&
UIManager.RCTView.Constants.forceTouchAvailable||false;

var statics={
AccessibilityTraits:AccessibilityTraits,
AccessibilityComponentType:AccessibilityComponentType,




forceTouchAvailable:forceTouchAvailable};






















var View=React.createClass({displayName:'View',
mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


statics:babelHelpers.extends({},
statics),


propTypes:{




accessible:PropTypes.bool,






accessibilityLabel:PropTypes.string,






accessibilityComponentType:PropTypes.oneOf(AccessibilityComponentType),








accessibilityLiveRegion:PropTypes.oneOf([
'none',
'polite',
'assertive']),


















importantForAccessibility:PropTypes.oneOf([
'auto',
'yes',
'no',
'no-hide-descendants']),







accessibilityTraits:PropTypes.oneOfType([
PropTypes.oneOf(AccessibilityTraits),
PropTypes.arrayOf(PropTypes.oneOf(AccessibilityTraits))]),






onAccessibilityTap:PropTypes.func,





onMagicTap:PropTypes.func,





testID:PropTypes.string,






onResponderGrant:PropTypes.func,
onResponderMove:PropTypes.func,
onResponderReject:PropTypes.func,
onResponderRelease:PropTypes.func,
onResponderTerminate:PropTypes.func,
onResponderTerminationRequest:PropTypes.func,
onStartShouldSetResponder:PropTypes.func,
onStartShouldSetResponderCapture:PropTypes.func,
onMoveShouldSetResponder:PropTypes.func,
onMoveShouldSetResponderCapture:PropTypes.func,












hitSlop:EdgeInsetsPropType,










onLayout:PropTypes.func,


































pointerEvents:PropTypes.oneOf([
'box-none',
'none',
'box-only',
'auto']),

style:stylePropType,









removeClippedSubviews:PropTypes.bool,














renderToHardwareTextureAndroid:PropTypes.bool,














shouldRasterizeIOS:PropTypes.bool,








collapsable:PropTypes.bool,






















needsOffscreenAlphaCompositing:PropTypes.bool},


render:function render(){




return React.createElement(RCTView,babelHelpers.extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:348}}));}});



var RCTView=requireNativeComponent('RCTView',View,{
nativeOnly:{
nativeBackgroundAndroid:true}});



if(__DEV__){
var viewConfig=UIManager.viewConfigs&&UIManager.viewConfigs.RCTView||{};
for(var prop in viewConfig.nativeProps){
var viewAny=View;
if(!viewAny.propTypes[prop]&&!ReactNativeStyleAttributes[prop]){
throw new Error(
'View is missing propType for native prop `'+prop+'`');}}}





var ViewToExport=RCTView;
if(__DEV__){
ViewToExport=View;}else 
{
babelHelpers.extends(RCTView,statics);}


module.exports=ViewToExport;
}, "View");
__d(82 /* EdgeInsetsPropType */, function(global, require, module, exports) {'use strict';












var PropTypes=require(51 /* ReactPropTypes */);

var createStrictShapeTypeChecker=require(83 /* createStrictShapeTypeChecker */);

var EdgeInsetsPropType=createStrictShapeTypeChecker({
top:PropTypes.number,
left:PropTypes.number,
bottom:PropTypes.number,
right:PropTypes.number});


module.exports=EdgeInsetsPropType;
}, "EdgeInsetsPropType");
__d(83 /* createStrictShapeTypeChecker */, function(global, require, module, exports) {'use strict';












var ReactPropTypeLocationNames=require(48 /* ReactPropTypeLocationNames */);

var invariant=require(259 /* fbjs/lib/invariant */);
var merge=require(84 /* merge */);

function createStrictShapeTypeChecker(
shapeTypes)
{
function checkType(isRequired,props,propName,componentName,location){
if(!props[propName]){
if(isRequired){
invariant(
false,
'Required object `'+propName+'` was not specified in '+('`'+
componentName+'`.'));}


return;}

var propValue=props[propName];
var propType=typeof propValue;
var locationName=
location&&ReactPropTypeLocationNames[location]||'(unknown)';
if(propType!=='object'){
invariant(
false,
'Invalid '+locationName+' `'+propName+'` of type `'+propType+'` '+('supplied to `'+
componentName+'`, expected `object`.'));}




var allKeys=merge(props[propName],shapeTypes);
for(var key in allKeys){
var checker=shapeTypes[key];
if(!checker){
invariant(
false,
'Invalid props.'+propName+' key `'+key+'` supplied to `'+componentName+'`.'+'\nBad object: '+
JSON.stringify(props[propName],null,'  ')+'\nValid keys: '+
JSON.stringify(Object.keys(shapeTypes),null,'  '));}


var error=checker(propValue,key,componentName,location);
if(error){
invariant(
false,
error.message+'\nBad object: '+
JSON.stringify(props[propName],null,'  '));}}}




function chainedCheckType(
props,
propName,
componentName,
location)
{
return checkType(false,props,propName,componentName,location);}

chainedCheckType.isRequired=checkType.bind(null,true);
return chainedCheckType;}


module.exports=createStrictShapeTypeChecker;
}, "createStrictShapeTypeChecker");
__d(84 /* merge */, function(global, require, module, exports) {"use strict";
































var mergeInto=require(85 /* mergeInto */);








var merge=function merge(one,two){
var result={};
mergeInto(result,one);
mergeInto(result,two);
return result;};


module.exports=merge;
}, "merge");
__d(85 /* mergeInto */, function(global, require, module, exports) {"use strict";

































var mergeHelpers=require(86 /* mergeHelpers */);

var checkMergeObjectArg=mergeHelpers.checkMergeObjectArg;
var checkMergeIntoObjectArg=mergeHelpers.checkMergeIntoObjectArg;







function mergeInto(one,two){
checkMergeIntoObjectArg(one);
if(two!=null){
checkMergeObjectArg(two);
for(var key in two){
if(!two.hasOwnProperty(key)){
continue;}

one[key]=two[key];}}}




module.exports=mergeInto;
}, "mergeInto");
__d(86 /* mergeHelpers */, function(global, require, module, exports) {"use strict";


































var invariant=require(259 /* fbjs/lib/invariant */);
var keyMirror=require(256 /* fbjs/lib/keyMirror */);





var MAX_MERGE_DEPTH=36;







var isTerminal=function isTerminal(o){
return typeof o!=='object'||o===null;};


var mergeHelpers={

MAX_MERGE_DEPTH:MAX_MERGE_DEPTH,

isTerminal:isTerminal,







normalizeMergeArg:function normalizeMergeArg(arg){
return arg===undefined||arg===null?{}:arg;},










checkMergeArrayArgs:function checkMergeArrayArgs(one,two){
invariant(
Array.isArray(one)&&Array.isArray(two),
'Tried to merge arrays, instead got %s and %s.',
one,
two);},







checkMergeObjectArgs:function checkMergeObjectArgs(one,two){
mergeHelpers.checkMergeObjectArg(one);
mergeHelpers.checkMergeObjectArg(two);},





checkMergeObjectArg:function checkMergeObjectArg(arg){
invariant(
!isTerminal(arg)&&!Array.isArray(arg),
'Tried to merge an object, instead got %s.',
arg);},






checkMergeIntoObjectArg:function checkMergeIntoObjectArg(arg){
invariant(
(!isTerminal(arg)||typeof arg==='function')&&!Array.isArray(arg),
'Tried to merge into an object, instead got %s.',
arg);},









checkMergeLevel:function checkMergeLevel(level){
invariant(
level<MAX_MERGE_DEPTH,
'Maximum deep merge depth exceeded. You may be attempting to merge '+
'circular structures in an unsupported way.');},








checkArrayStrategy:function checkArrayStrategy(strategy){
invariant(
strategy===undefined||strategy in mergeHelpers.ArrayStrategies,
'You must provide an array strategy to deep merge functions to '+
'instruct the deep merge how to resolve merging two arrays.');},










ArrayStrategies:keyMirror({
Clobber:true,
IndexByIndex:true})};




module.exports=mergeHelpers;
}, "mergeHelpers");
__d(87 /* StyleSheetPropType */, function(global, require, module, exports) {'use strict';












var createStrictShapeTypeChecker=require(83 /* createStrictShapeTypeChecker */);
var flattenStyle=require(59 /* flattenStyle */);

function StyleSheetPropType(
shape)
{
var shapePropType=createStrictShapeTypeChecker(shape);
return function(props,propName,componentName,location){
var newProps=props;
if(props[propName]){

newProps={};
newProps[propName]=flattenStyle(props[propName]);}

return shapePropType(newProps,propName,componentName,location);};}



module.exports=StyleSheetPropType;
}, "StyleSheetPropType");
__d(88 /* requireNativeComponent */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(65 /* ReactNativeStyleAttributes */);
var UIManager=require(61 /* UIManager */);
var UnimplementedView=require(89 /* UnimplementedView */);

var createReactNativeComponentClass=require(94 /* createReactNativeComponentClass */);

var insetsDiffer=require(127 /* insetsDiffer */);
var pointsDiffer=require(128 /* pointsDiffer */);
var matricesDiffer=require(76 /* matricesDiffer */);
var processColor=require(77 /* processColor */);
var resolveAssetSource=require(129 /* resolveAssetSource */);
var sizesDiffer=require(80 /* sizesDiffer */);
var verifyPropTypes=require(132 /* verifyPropTypes */);
var warning=require(265 /* fbjs/lib/warning */);


















function requireNativeComponent(
viewName,
componentInterface,
extraConfig)
{
var viewConfig=UIManager[viewName];
if(!viewConfig||!viewConfig.NativeProps){
warning(false,'Native component for "%s" does not exist',viewName);
return UnimplementedView;}

var nativeProps=babelHelpers.extends({},
UIManager.RCTView.NativeProps,
viewConfig.NativeProps);

viewConfig.uiViewClassName=viewName;
viewConfig.validAttributes={};
viewConfig.propTypes=componentInterface&&componentInterface.propTypes;
for(var key in nativeProps){
var useAttribute=false;
var attribute={};

var differ=TypeToDifferMap[nativeProps[key]];
if(differ){
attribute.diff=differ;
useAttribute=true;}


var processor=TypeToProcessorMap[nativeProps[key]];
if(processor){
attribute.process=processor;
useAttribute=true;}


viewConfig.validAttributes[key]=useAttribute?attribute:true;}







viewConfig.validAttributes.style=ReactNativeStyleAttributes;

if(__DEV__){
componentInterface&&verifyPropTypes(
componentInterface,
viewConfig,
extraConfig&&extraConfig.nativeOnly);}


return createReactNativeComponentClass(viewConfig);}


var TypeToDifferMap={

CATransform3D:matricesDiffer,
CGPoint:pointsDiffer,
CGSize:sizesDiffer,
UIEdgeInsets:insetsDiffer};




function processColorArray(colors){
return colors&&colors.map(processColor);}


var TypeToProcessorMap={

CGColor:processColor,
CGColorArray:processColorArray,
UIColor:processColor,
UIColorArray:processColorArray,
CGImage:resolveAssetSource,
UIImage:resolveAssetSource,
RCTImageSource:resolveAssetSource,

Color:processColor,
ColorArray:processColorArray};


module.exports=requireNativeComponent;
}, "requireNativeComponent");
__d(89 /* UnimplementedView */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/UnimplementedViews/UnimplementedView.js';








var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);

var UnimplementedView=React.createClass({displayName:'UnimplementedView',
setNativeProps:function setNativeProps(){},




render:function render(){

var View=require(81 /* View */);
return (
React.createElement(View,{style:[styles.unimplementedView,this.props.style],__source:{fileName:_jsxFileName,lineNumber:23}},
this.props.children));}});





var styles=StyleSheet.create({
unimplementedView:{
borderWidth:1,
borderColor:'red',
alignSelf:'flex-start'}});



module.exports=UnimplementedView;
}, "UnimplementedView");
__d(90 /* StyleSheet */, function(global, require, module, exports) {'use strict';












var PixelRatio=require(91 /* PixelRatio */);
var ReactNativePropRegistry=require(57 /* ReactNativePropRegistry */);
var StyleSheetValidation=require(93 /* StyleSheetValidation */);

var flatten=require(59 /* flattenStyle */);

var hairlineWidth=PixelRatio.roundToNearestPixel(0.4);
if(hairlineWidth===0){
hairlineWidth=1/PixelRatio.get();}














































module.exports={

















hairlineWidth:hairlineWidth,








































flatten:flatten,




create:function create(obj){
var result={};
for(var key in obj){
StyleSheetValidation.validateStyle(key,obj);
result[key]=ReactNativePropRegistry.register(obj[key]);}

return result;}};
}, "StyleSheet");
__d(91 /* PixelRatio */, function(global, require, module, exports) {'use strict';












var Dimensions=require(92 /* Dimensions */);var 


















PixelRatio=function(){function PixelRatio(){babelHelpers.classCallCheck(this,PixelRatio);}babelHelpers.createClass(PixelRatio,null,[{key:'get',value:function get()


















{
return Dimensions.get('window').scale;}},{key:'getFontScale',value:function getFontScale()













{
return Dimensions.get('window').fontScale||PixelRatio.get();}},{key:'getPixelSizeForLayoutSize',value:function getPixelSizeForLayoutSize(







layoutSize){
return Math.round(layoutSize*PixelRatio.get());}},{key:'roundToNearestPixel',value:function roundToNearestPixel(








layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;}},{key:'startDetecting',value:function startDetecting()



{}}]);return PixelRatio;}();


module.exports=PixelRatio;
}, "PixelRatio");
__d(92 /* Dimensions */, function(global, require, module, exports) {'use strict';












var Platform=require(13 /* Platform */);
var UIManager=require(61 /* UIManager */);
var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);

var invariant=require(259 /* fbjs/lib/invariant */);

var dimensions={};var 
Dimensions=function(){function Dimensions(){babelHelpers.classCallCheck(this,Dimensions);}babelHelpers.createClass(Dimensions,null,[{key:'set',value:function set(






dims){



if(dims&&dims.windowPhysicalPixels){

dims=JSON.parse(JSON.stringify(dims));

var windowPhysicalPixels=dims.windowPhysicalPixels;
dims.window={
width:windowPhysicalPixels.width/windowPhysicalPixels.scale,
height:windowPhysicalPixels.height/windowPhysicalPixels.scale,
scale:windowPhysicalPixels.scale,
fontScale:windowPhysicalPixels.fontScale};

if(Platform.OS==='android'){

var screenPhysicalPixels=dims.screenPhysicalPixels;
dims.screen={
width:screenPhysicalPixels.width/screenPhysicalPixels.scale,
height:screenPhysicalPixels.height/screenPhysicalPixels.scale,
scale:screenPhysicalPixels.scale,
fontScale:screenPhysicalPixels.fontScale};



delete dims.screenPhysicalPixels;}else 
{
dims.screen=dims.window;}


delete dims.windowPhysicalPixels;}


babelHelpers.extends(dimensions,dims);}},{key:'get',value:function get(

















dim){
invariant(dimensions[dim],'No dimension set for key '+dim);
return dimensions[dim];}}]);return Dimensions;}();



Dimensions.set(UIManager.Dimensions);
RCTDeviceEventEmitter.addListener('didUpdateDimensions',function(update){
Dimensions.set(update);});


module.exports=Dimensions;
}, "Dimensions");
__d(93 /* StyleSheetValidation */, function(global, require, module, exports) {'use strict';












var ImageStylePropTypes=require(66 /* ImageStylePropTypes */);
var ReactPropTypeLocations=require(47 /* ReactPropTypeLocations */);
var TextStylePropTypes=require(74 /* TextStylePropTypes */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);

var invariant=require(259 /* fbjs/lib/invariant */);var 

StyleSheetValidation=function(){function StyleSheetValidation(){babelHelpers.classCallCheck(this,StyleSheetValidation);}babelHelpers.createClass(StyleSheetValidation,null,[{key:'validateStyleProp',value:function validateStyleProp(
prop,style,caller){
if(!__DEV__){
return;}

if(allStylePropTypes[prop]===undefined){
var message1='"'+prop+'" is not a valid style property.';
var message2='\nValid style props: '+
JSON.stringify(Object.keys(allStylePropTypes).sort(),null,'  ');
styleError(message1,style,caller,message2);}

var error=allStylePropTypes[prop](
style,
prop,
caller,
ReactPropTypeLocations.prop);

if(error){
styleError(error.message,style,caller);}}},{key:'validateStyle',value:function validateStyle(



name,styles){
if(!__DEV__){
return;}

for(var prop in styles[name]){
StyleSheetValidation.validateStyleProp(prop,styles[name],'StyleSheet '+name);}}},{key:'addValidStylePropTypes',value:function addValidStylePropTypes(



stylePropTypes){
for(var key in stylePropTypes){
allStylePropTypes[key]=stylePropTypes[key];}}}]);return StyleSheetValidation;}();




var styleError=function styleError(message1,style,caller,message2){
invariant(
false,
message1+'\n'+(caller||'<<unknown>>')+': '+
JSON.stringify(style,null,'  ')+(message2||''));};



var allStylePropTypes={};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes);

module.exports=StyleSheetValidation;
}, "StyleSheetValidation");
__d(94 /* createReactNativeComponentClass */, function(global, require, module, exports) {'use strict';













var ReactNativeBaseComponent=require(95 /* ./ReactNativeBaseComponent */);








var createReactNativeComponentClass=function createReactNativeComponentClass(viewConfig){
var Constructor=function Constructor(element){
this._currentElement=element;
this._topLevelWrapper=null;
this._nativeParent=null;
this._nativeContainerInfo=null;
this._rootNodeID=null;
this._renderedChildren=null;};

Constructor.displayName=viewConfig.uiViewClassName;
Constructor.viewConfig=viewConfig;
Constructor.propTypes=viewConfig.propTypes;
Constructor.prototype=new ReactNativeBaseComponent(viewConfig);
Constructor.prototype.constructor=Constructor;

return Constructor;};


module.exports=createReactNativeComponentClass;
}, "createReactNativeComponentClass");
__d(95 /* ReactNativeBaseComponent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var NativeMethodsMixin=require(55 /* ./NativeMethodsMixin */);
var ReactNativeAttributePayload=require(56 /* ./ReactNativeAttributePayload */);
var ReactNativeComponentTree=require(96 /* ./ReactNativeComponentTree */);
var ReactNativeEventEmitter=require(97 /* ./ReactNativeEventEmitter */);
var ReactNativeTagHandles=require(106 /* ./ReactNativeTagHandles */);
var ReactMultiChild=require(114 /* ./ReactMultiChild */);
var UIManager=require(61 /* UIManager */);

var deepFreezeAndThrowOnMutationInDev=require(126 /* deepFreezeAndThrowOnMutationInDev */);

var registrationNames=ReactNativeEventEmitter.registrationNames;
var putListener=ReactNativeEventEmitter.putListener;
var deleteListener=ReactNativeEventEmitter.deleteListener;
var deleteAllListeners=ReactNativeEventEmitter.deleteAllListeners;









var ReactNativeBaseComponent=function ReactNativeBaseComponent(viewConfig){
this.viewConfig=viewConfig;};






ReactNativeBaseComponent.Mixin={
getPublicInstance:function getPublicInstance(){

return this;},


unmountComponent:function unmountComponent(){
ReactNativeComponentTree.uncacheNode(this);
deleteAllListeners(this);
this.unmountChildren();
this._rootNodeID=null;},










initializeChildren:function initializeChildren(children,containerTag,transaction,context){
var mountImages=this.mountChildren(children,transaction,context);



if(mountImages.length){



var createdTags=[];
for(var i=0,l=mountImages.length;i<l;i++){
var mountImage=mountImages[i];
var childTag=mountImage;
createdTags[i]=childTag;}

UIManager.setChildren(containerTag,createdTags);}},











receiveComponent:function receiveComponent(nextElement,transaction,context){
var prevElement=this._currentElement;
this._currentElement=nextElement;

if(process.env.NODE_ENV!=='production'){
for(var key in this.viewConfig.validAttributes){
if(nextElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(nextElement.props[key]);}}}




var updatePayload=ReactNativeAttributePayload.diff(prevElement.props,nextElement.props,this.viewConfig.validAttributes);

if(updatePayload){
UIManager.updateView(this._rootNodeID,this.viewConfig.uiViewClassName,updatePayload);}


this._reconcileListenersUponUpdate(prevElement.props,nextElement.props);
this.updateChildren(nextElement.props.children,transaction,context);},





_registerListenersUponCreation:function _registerListenersUponCreation(initialProps){
for(var key in initialProps){


if(registrationNames[key]&&initialProps[key]){
var listener=initialProps[key];
putListener(this,key,listener);}}},









_reconcileListenersUponUpdate:function _reconcileListenersUponUpdate(prevProps,nextProps){
for(var key in nextProps){
if(registrationNames[key]&&nextProps[key]!==prevProps[key]){
if(nextProps[key]){
putListener(this,key,nextProps[key]);}else 
{
deleteListener(this,key);}}}},










getNativeNode:function getNativeNode(){
return this._rootNodeID;},







mountComponent:function mountComponent(transaction,nativeParent,nativeContainerInfo,context){
var tag=ReactNativeTagHandles.allocateTag();

this._rootNodeID=tag;
this._nativeParent=nativeParent;
this._nativeContainerInfo=nativeContainerInfo;

if(process.env.NODE_ENV!=='production'){
for(var key in this.viewConfig.validAttributes){
if(this._currentElement.props.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(this._currentElement.props[key]);}}}




var updatePayload=ReactNativeAttributePayload.create(this._currentElement.props,this.viewConfig.validAttributes);

var nativeTopRootTag=nativeContainerInfo._tag;
UIManager.createView(tag,this.viewConfig.uiViewClassName,nativeTopRootTag,updatePayload);

ReactNativeComponentTree.precacheNode(this,tag);

this._registerListenersUponCreation(this._currentElement.props);
this.initializeChildren(this._currentElement.props.children,tag,transaction,context);
return tag;}};







_assign(ReactNativeBaseComponent.prototype,ReactMultiChild.Mixin,ReactNativeBaseComponent.Mixin,NativeMethodsMixin);

module.exports=ReactNativeBaseComponent;
}, "ReactNativeBaseComponent");
__d(96 /* ReactNativeComponentTree */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);

var instanceCache={};








function getRenderedNativeOrTextFromComponent(component){
var rendered;
while(rendered=component._renderedComponent){
component=rendered;}

return component;}






function precacheNode(inst,tag){
var nativeInst=getRenderedNativeOrTextFromComponent(inst);
instanceCache[tag]=nativeInst;}


function uncacheNode(inst){
var tag=inst._rootNodeID;
if(tag){
delete instanceCache[tag];}}



function getInstanceFromTag(tag){
return instanceCache[tag]||null;}


function getTagFromInstance(inst){
!inst._rootNodeID?process.env.NODE_ENV!=='production'?invariant(false,'All native instances should have a tag.'):invariant(false):void 0;
return inst._rootNodeID;}


var ReactNativeComponentTree={
getClosestInstanceFromNode:getInstanceFromTag,
getInstanceFromNode:getInstanceFromTag,
getNodeFromInstance:getTagFromInstance,
precacheNode:precacheNode,
uncacheNode:uncacheNode};


module.exports=ReactNativeComponentTree;
}, "ReactNativeComponentTree");
__d(97 /* ReactNativeEventEmitter */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var _extends=_assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var EventConstants=require(98 /* ./EventConstants */);
var EventPluginHub=require(99 /* ./EventPluginHub */);
var EventPluginRegistry=require(100 /* ./EventPluginRegistry */);
var ReactEventEmitterMixin=require(105 /* ./ReactEventEmitterMixin */);
var ReactNativeComponentTree=require(96 /* ./ReactNativeComponentTree */);
var ReactNativeTagHandles=require(106 /* ./ReactNativeTagHandles */);
var ReactUpdates=require(107 /* ./ReactUpdates */);

var warning=require(265 /* fbjs/lib/warning */);

var topLevelTypes=EventConstants.topLevelTypes;







var EMPTY_NATIVE_EVENT={};








var touchSubsequence=function touchSubsequence(touches,indices){
var ret=[];
for(var i=0;i<indices.length;i++){
ret.push(touches[indices[i]]);}

return ret;};













var removeTouchesAtIndices=function removeTouchesAtIndices(touches,indices){
var rippedOut=[];


var temp=touches;
for(var i=0;i<indices.length;i++){
var index=indices[i];
rippedOut.push(touches[index]);
temp[index]=null;}

var fillAt=0;
for(var j=0;j<temp.length;j++){
var cur=temp[j];
if(cur!==null){
temp[fillAt++]=cur;}}


temp.length=fillAt;
return rippedOut;};











var ReactNativeEventEmitter=_extends({},ReactEventEmitterMixin,{

registrationNames:EventPluginRegistry.registrationNameModules,

putListener:EventPluginHub.putListener,

getListener:EventPluginHub.getListener,

deleteListener:EventPluginHub.deleteListener,

deleteAllListeners:EventPluginHub.deleteAllListeners,











_receiveRootNodeIDEvent:function _receiveRootNodeIDEvent(rootNodeID,topLevelType,nativeEventParam){
var nativeEvent=nativeEventParam||EMPTY_NATIVE_EVENT;
var inst=ReactNativeComponentTree.getInstanceFromNode(rootNodeID);
if(!inst){


return;}

ReactUpdates.batchedUpdates(function(){
ReactNativeEventEmitter.handleTopLevel(topLevelType,inst,nativeEvent,nativeEvent.target);});},










receiveEvent:function receiveEvent(tag,topLevelType,nativeEventParam){
var rootNodeID=tag;
ReactNativeEventEmitter._receiveRootNodeIDEvent(rootNodeID,topLevelType,nativeEventParam);},


























receiveTouches:function receiveTouches(eventTopLevelType,touches,changedIndices){
var changedTouches=eventTopLevelType===topLevelTypes.topTouchEnd||eventTopLevelType===topLevelTypes.topTouchCancel?removeTouchesAtIndices(touches,changedIndices):touchSubsequence(touches,changedIndices);

for(var jj=0;jj<changedTouches.length;jj++){
var touch=changedTouches[jj];


touch.changedTouches=changedTouches;
touch.touches=touches;
var nativeEvent=touch;
var rootNodeID=null;
var target=nativeEvent.target;
if(target!==null&&target!==undefined){
if(target<ReactNativeTagHandles.tagsStartAt){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(false,'A view is reporting that a touch occured on tag zero.'):void 0;}}else 

{
rootNodeID=target;}}


ReactNativeEventEmitter._receiveRootNodeIDEvent(rootNodeID,eventTopLevelType,nativeEvent);}}});




module.exports=ReactNativeEventEmitter;
}, "ReactNativeEventEmitter");
__d(98 /* EventConstants */, function(global, require, module, exports) {'use strict';












var keyMirror=require(256 /* fbjs/lib/keyMirror */);

var PropagationPhases=keyMirror({bubbled:null,captured:null});




var topLevelTypes=keyMirror({
topAbort:null,
topAnimationEnd:null,
topAnimationIteration:null,
topAnimationStart:null,
topBlur:null,
topCanPlay:null,
topCanPlayThrough:null,
topChange:null,
topClick:null,
topCompositionEnd:null,
topCompositionStart:null,
topCompositionUpdate:null,
topContextMenu:null,
topCopy:null,
topCut:null,
topDoubleClick:null,
topDrag:null,
topDragEnd:null,
topDragEnter:null,
topDragExit:null,
topDragLeave:null,
topDragOver:null,
topDragStart:null,
topDrop:null,
topDurationChange:null,
topEmptied:null,
topEncrypted:null,
topEnded:null,
topError:null,
topFocus:null,
topInput:null,
topInvalid:null,
topKeyDown:null,
topKeyPress:null,
topKeyUp:null,
topLoad:null,
topLoadedData:null,
topLoadedMetadata:null,
topLoadStart:null,
topMouseDown:null,
topMouseMove:null,
topMouseOut:null,
topMouseOver:null,
topMouseUp:null,
topPaste:null,
topPause:null,
topPlay:null,
topPlaying:null,
topProgress:null,
topRateChange:null,
topReset:null,
topScroll:null,
topSeeked:null,
topSeeking:null,
topSelectionChange:null,
topStalled:null,
topSubmit:null,
topSuspend:null,
topTextInput:null,
topTimeUpdate:null,
topTouchCancel:null,
topTouchEnd:null,
topTouchMove:null,
topTouchStart:null,
topTransitionEnd:null,
topVolumeChange:null,
topWaiting:null,
topWheel:null});


var EventConstants={
topLevelTypes:topLevelTypes,
PropagationPhases:PropagationPhases};


module.exports=EventConstants;
}, "EventConstants");
__d(99 /* EventPluginHub */, function(global, require, module, exports) {'use strict';












var EventPluginRegistry=require(100 /* ./EventPluginRegistry */);
var EventPluginUtils=require(101 /* ./EventPluginUtils */);
var ReactErrorUtils=require(102 /* ./ReactErrorUtils */);

var accumulateInto=require(103 /* ./accumulateInto */);
var forEachAccumulated=require(104 /* ./forEachAccumulated */);
var invariant=require(259 /* fbjs/lib/invariant */);




var listenerBank={};





var eventQueue=null;








var executeDispatchesAndRelease=function executeDispatchesAndRelease(event,simulated){
if(event){
EventPluginUtils.executeDispatchesInOrder(event,simulated);

if(!event.isPersistent()){
event.constructor.release(event);}}};



var executeDispatchesAndReleaseSimulated=function executeDispatchesAndReleaseSimulated(e){
return executeDispatchesAndRelease(e,true);};

var executeDispatchesAndReleaseTopLevel=function executeDispatchesAndReleaseTopLevel(e){
return executeDispatchesAndRelease(e,false);};
























var EventPluginHub={




injection:{





injectEventPluginOrder:EventPluginRegistry.injectEventPluginOrder,




injectEventPluginsByName:EventPluginRegistry.injectEventPluginsByName},










putListener:function putListener(inst,registrationName,listener){
!(typeof listener==='function')?process.env.NODE_ENV!=='production'?invariant(false,'Expected %s listener to be a function, instead got type %s',registrationName,typeof listener):invariant(false):void 0;

var bankForRegistrationName=listenerBank[registrationName]||(listenerBank[registrationName]={});
bankForRegistrationName[inst._rootNodeID]=listener;

var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.didPutListener){
PluginModule.didPutListener(inst,registrationName,listener);}},








getListener:function getListener(inst,registrationName){
var bankForRegistrationName=listenerBank[registrationName];
return bankForRegistrationName&&bankForRegistrationName[inst._rootNodeID];},








deleteListener:function deleteListener(inst,registrationName){
var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(inst,registrationName);}


var bankForRegistrationName=listenerBank[registrationName];

if(bankForRegistrationName){
delete bankForRegistrationName[inst._rootNodeID];}},








deleteAllListeners:function deleteAllListeners(inst){
for(var registrationName in listenerBank){
if(!listenerBank[registrationName][inst._rootNodeID]){
continue;}


var PluginModule=EventPluginRegistry.registrationNameModules[registrationName];
if(PluginModule&&PluginModule.willDeleteListener){
PluginModule.willDeleteListener(inst,registrationName);}


delete listenerBank[registrationName][inst._rootNodeID];}},










extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){
var events;
var plugins=EventPluginRegistry.plugins;
for(var i=0;i<plugins.length;i++){

var possiblePlugin=plugins[i];
if(possiblePlugin){
var extractedEvents=possiblePlugin.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);
if(extractedEvents){
events=accumulateInto(events,extractedEvents);}}}



return events;},









enqueueEvents:function enqueueEvents(events){
if(events){
eventQueue=accumulateInto(eventQueue,events);}},








processEventQueue:function processEventQueue(simulated){


var processingEventQueue=eventQueue;
eventQueue=null;
if(simulated){
forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseSimulated);}else 
{
forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseTopLevel);}

!!eventQueue?process.env.NODE_ENV!=='production'?invariant(false,'processEventQueue(): Additional events were enqueued while processing '+'an event queue. Support for this has not yet been implemented.'):invariant(false):void 0;

ReactErrorUtils.rethrowCaughtError();},





__purge:function __purge(){
listenerBank={};},


__getListenerBank:function __getListenerBank(){
return listenerBank;}};




module.exports=EventPluginHub;
}, "EventPluginHub");
__d(100 /* EventPluginRegistry */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);




var EventPluginOrder=null;




var namesToPlugins={};






function recomputePluginOrdering(){
if(!EventPluginOrder){

return;}

for(var pluginName in namesToPlugins){
var PluginModule=namesToPlugins[pluginName];
var pluginIndex=EventPluginOrder.indexOf(pluginName);
!(pluginIndex>-1)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in '+'the plugin ordering, `%s`.',pluginName):invariant(false):void 0;
if(EventPluginRegistry.plugins[pluginIndex]){
continue;}

!PluginModule.extractEvents?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` '+'method, but `%s` does not.',pluginName):invariant(false):void 0;
EventPluginRegistry.plugins[pluginIndex]=PluginModule;
var publishedEvents=PluginModule.eventTypes;
for(var eventName in publishedEvents){
!publishEventForPlugin(publishedEvents[eventName],PluginModule,eventName)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):invariant(false):void 0;}}}












function publishEventForPlugin(dispatchConfig,PluginModule,eventName){
!!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same '+'event name, `%s`.',eventName):invariant(false):void 0;
EventPluginRegistry.eventNameDispatchConfigs[eventName]=dispatchConfig;

var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;
if(phasedRegistrationNames){
for(var phaseName in phasedRegistrationNames){
if(phasedRegistrationNames.hasOwnProperty(phaseName)){
var phasedRegistrationName=phasedRegistrationNames[phaseName];
publishRegistrationName(phasedRegistrationName,PluginModule,eventName);}}


return true;}else 
if(dispatchConfig.registrationName){
publishRegistrationName(dispatchConfig.registrationName,PluginModule,eventName);
return true;}

return false;}










function publishRegistrationName(registrationName,PluginModule,eventName){
!!EventPluginRegistry.registrationNameModules[registrationName]?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same '+'registration name, `%s`.',registrationName):invariant(false):void 0;
EventPluginRegistry.registrationNameModules[registrationName]=PluginModule;
EventPluginRegistry.registrationNameDependencies[registrationName]=PluginModule.eventTypes[eventName].dependencies;

if(process.env.NODE_ENV!=='production'){
var lowerCasedName=registrationName.toLowerCase();
EventPluginRegistry.possibleRegistrationNames[lowerCasedName]=registrationName;}}








var EventPluginRegistry={




plugins:[],




eventNameDispatchConfigs:{},




registrationNameModules:{},




registrationNameDependencies:{},







possibleRegistrationNames:process.env.NODE_ENV!=='production'?{}:null,










injectEventPluginOrder:function injectEventPluginOrder(InjectedEventPluginOrder){
!!EventPluginOrder?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than '+'once. You are likely trying to load more than one copy of React.'):invariant(false):void 0;

EventPluginOrder=Array.prototype.slice.call(InjectedEventPluginOrder);
recomputePluginOrdering();},












injectEventPluginsByName:function injectEventPluginsByName(injectedNamesToPlugins){
var isOrderingDirty=false;
for(var pluginName in injectedNamesToPlugins){
if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){
continue;}

var PluginModule=injectedNamesToPlugins[pluginName];
if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==PluginModule){
!!namesToPlugins[pluginName]?process.env.NODE_ENV!=='production'?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins '+'using the same name, `%s`.',pluginName):invariant(false):void 0;
namesToPlugins[pluginName]=PluginModule;
isOrderingDirty=true;}}


if(isOrderingDirty){
recomputePluginOrdering();}},










getPluginModuleForEvent:function getPluginModuleForEvent(event){
var dispatchConfig=event.dispatchConfig;
if(dispatchConfig.registrationName){
return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName]||null;}

for(var phase in dispatchConfig.phasedRegistrationNames){
if(!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)){
continue;}

var PluginModule=EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
if(PluginModule){
return PluginModule;}}


return null;},






_resetEventPlugins:function _resetEventPlugins(){
EventPluginOrder=null;
for(var pluginName in namesToPlugins){
if(namesToPlugins.hasOwnProperty(pluginName)){
delete namesToPlugins[pluginName];}}


EventPluginRegistry.plugins.length=0;

var eventNameDispatchConfigs=EventPluginRegistry.eventNameDispatchConfigs;
for(var eventName in eventNameDispatchConfigs){
if(eventNameDispatchConfigs.hasOwnProperty(eventName)){
delete eventNameDispatchConfigs[eventName];}}



var registrationNameModules=EventPluginRegistry.registrationNameModules;
for(var registrationName in registrationNameModules){
if(registrationNameModules.hasOwnProperty(registrationName)){
delete registrationNameModules[registrationName];}}



if(process.env.NODE_ENV!=='production'){
var possibleRegistrationNames=EventPluginRegistry.possibleRegistrationNames;
for(var lowerCasedName in possibleRegistrationNames){
if(possibleRegistrationNames.hasOwnProperty(lowerCasedName)){
delete possibleRegistrationNames[lowerCasedName];}}}}};







module.exports=EventPluginRegistry;
}, "EventPluginRegistry");
__d(101 /* EventPluginUtils */, function(global, require, module, exports) {'use strict';












var EventConstants=require(98 /* ./EventConstants */);
var ReactErrorUtils=require(102 /* ./ReactErrorUtils */);

var invariant=require(259 /* fbjs/lib/invariant */);
var warning=require(265 /* fbjs/lib/warning */);









var ComponentTree;
var TreeTraversal;
var injection={
injectComponentTree:function injectComponentTree(Injected){
ComponentTree=Injected;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(Injected&&Injected.getNodeFromInstance&&Injected.getInstanceFromNode,'EventPluginUtils.injection.injectComponentTree(...): Injected '+'module is missing getNodeFromInstance or getInstanceFromNode.'):void 0;}},


injectTreeTraversal:function injectTreeTraversal(Injected){
TreeTraversal=Injected;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(Injected&&Injected.isAncestor&&Injected.getLowestCommonAncestor,'EventPluginUtils.injection.injectTreeTraversal(...): Injected '+'module is missing isAncestor or getLowestCommonAncestor.'):void 0;}}};




var topLevelTypes=EventConstants.topLevelTypes;

function isEndish(topLevelType){
return topLevelType===topLevelTypes.topMouseUp||topLevelType===topLevelTypes.topTouchEnd||topLevelType===topLevelTypes.topTouchCancel;}


function isMoveish(topLevelType){
return topLevelType===topLevelTypes.topMouseMove||topLevelType===topLevelTypes.topTouchMove;}

function isStartish(topLevelType){
return topLevelType===topLevelTypes.topMouseDown||topLevelType===topLevelTypes.topTouchStart;}


var validateEventDispatches;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches=function validateEventDispatches(event){
var dispatchListeners=event._dispatchListeners;
var dispatchInstances=event._dispatchInstances;

var listenersIsArr=Array.isArray(dispatchListeners);
var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;

var instancesIsArr=Array.isArray(dispatchInstances);
var instancesLen=instancesIsArr?dispatchInstances.length:dispatchInstances?1:0;

process.env.NODE_ENV!=='production'?warning(instancesIsArr===listenersIsArr&&instancesLen===listenersLen,'EventPluginUtils: Invalid `event`.'):void 0;};}










function executeDispatch(event,simulated,listener,inst){
var type=event.type||'unknown-event';
event.currentTarget=EventPluginUtils.getNodeFromInstance(inst);
if(simulated){
ReactErrorUtils.invokeGuardedCallbackWithCatch(type,listener,event);}else 
{
ReactErrorUtils.invokeGuardedCallback(type,listener,event);}

event.currentTarget=null;}





function executeDispatchesInOrder(event,simulated){
var dispatchListeners=event._dispatchListeners;
var dispatchInstances=event._dispatchInstances;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;}


executeDispatch(event,simulated,dispatchListeners[i],dispatchInstances[i]);}}else 

if(dispatchListeners){
executeDispatch(event,simulated,dispatchListeners,dispatchInstances);}

event._dispatchListeners=null;
event._dispatchInstances=null;}









function executeDispatchesInOrderStopAtTrueImpl(event){
var dispatchListeners=event._dispatchListeners;
var dispatchInstances=event._dispatchInstances;
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

if(Array.isArray(dispatchListeners)){
for(var i=0;i<dispatchListeners.length;i++){
if(event.isPropagationStopped()){
break;}


if(dispatchListeners[i](event,dispatchInstances[i])){
return dispatchInstances[i];}}}else 


if(dispatchListeners){
if(dispatchListeners(event,dispatchInstances)){
return dispatchInstances;}}


return null;}





function executeDispatchesInOrderStopAtTrue(event){
var ret=executeDispatchesInOrderStopAtTrueImpl(event);
event._dispatchInstances=null;
event._dispatchListeners=null;
return ret;}











function executeDirectDispatch(event){
if(process.env.NODE_ENV!=='production'){
validateEventDispatches(event);}

var dispatchListener=event._dispatchListeners;
var dispatchInstance=event._dispatchInstances;
!!Array.isArray(dispatchListener)?process.env.NODE_ENV!=='production'?invariant(false,'executeDirectDispatch(...): Invalid `event`.'):invariant(false):void 0;
event.currentTarget=dispatchListener?EventPluginUtils.getNodeFromInstance(dispatchInstance):null;
var res=dispatchListener?dispatchListener(event):null;
event.currentTarget=null;
event._dispatchListeners=null;
event._dispatchInstances=null;
return res;}






function hasDispatches(event){
return !!event._dispatchListeners;}





var EventPluginUtils={
isEndish:isEndish,
isMoveish:isMoveish,
isStartish:isStartish,

executeDirectDispatch:executeDirectDispatch,
executeDispatchesInOrder:executeDispatchesInOrder,
executeDispatchesInOrderStopAtTrue:executeDispatchesInOrderStopAtTrue,
hasDispatches:hasDispatches,

getInstanceFromNode:function getInstanceFromNode(node){
return ComponentTree.getInstanceFromNode(node);},

getNodeFromInstance:function getNodeFromInstance(node){
return ComponentTree.getNodeFromInstance(node);},

isAncestor:function isAncestor(a,b){
return TreeTraversal.isAncestor(a,b);},

getLowestCommonAncestor:function getLowestCommonAncestor(a,b){
return TreeTraversal.getLowestCommonAncestor(a,b);},

getParentInstance:function getParentInstance(inst){
return TreeTraversal.getParentInstance(inst);},

traverseTwoPhase:function traverseTwoPhase(target,fn,arg){
return TreeTraversal.traverseTwoPhase(target,fn,arg);},

traverseEnterLeave:function traverseEnterLeave(from,to,fn,argFrom,argTo){
return TreeTraversal.traverseEnterLeave(from,to,fn,argFrom,argTo);},


injection:injection};


module.exports=EventPluginUtils;
}, "EventPluginUtils");
__d(102 /* ReactErrorUtils */, function(global, require, module, exports) {'use strict';












var caughtError=null;









function invokeGuardedCallback(name,func,a,b){
try{
return func(a,b);}
catch(x){
if(caughtError===null){
caughtError=x;}

return undefined;}}



var ReactErrorUtils={
invokeGuardedCallback:invokeGuardedCallback,





invokeGuardedCallbackWithCatch:invokeGuardedCallback,





rethrowCaughtError:function rethrowCaughtError(){
if(caughtError){
var error=caughtError;
caughtError=null;
throw error;}}};




if(process.env.NODE_ENV!=='production'){




if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){
var fakeNode=document.createElement('react');
ReactErrorUtils.invokeGuardedCallback=function(name,func,a,b){
var boundFunc=func.bind(null,a,b);
var evtType='react-'+name;
fakeNode.addEventListener(evtType,boundFunc,false);
var evt=document.createEvent('Event');
evt.initEvent(evtType,false,false);
fakeNode.dispatchEvent(evt);
fakeNode.removeEventListener(evtType,boundFunc,false);};}}




module.exports=ReactErrorUtils;
}, "ReactErrorUtils");
__d(103 /* accumulateInto */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);















function accumulateInto(current,next){
!(next!=null)?process.env.NODE_ENV!=='production'?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):invariant(false):void 0;
if(current==null){
return next;}




var currentIsArray=Array.isArray(current);
var nextIsArray=Array.isArray(next);

if(currentIsArray&&nextIsArray){
current.push.apply(current,next);
return current;}


if(currentIsArray){
current.push(next);
return current;}


if(nextIsArray){

return [current].concat(next);}


return [current,next];}


module.exports=accumulateInto;
}, "accumulateInto");
__d(104 /* forEachAccumulated */, function(global, require, module, exports) {'use strict';




















var forEachAccumulated=function forEachAccumulated(arr,cb,scope){
if(Array.isArray(arr)){
arr.forEach(cb,scope);}else 
if(arr){
cb.call(scope,arr);}};



module.exports=forEachAccumulated;
}, "forEachAccumulated");
__d(105 /* ReactEventEmitterMixin */, function(global, require, module, exports) {'use strict';












var EventPluginHub=require(99 /* ./EventPluginHub */);

function runEventQueueInBatch(events){
EventPluginHub.enqueueEvents(events);
EventPluginHub.processEventQueue(false);}


var ReactEventEmitterMixin={





handleTopLevel:function handleTopLevel(topLevelType,targetInst,nativeEvent,nativeEventTarget){
var events=EventPluginHub.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);
runEventQueueInBatch(events);}};



module.exports=ReactEventEmitterMixin;
}, "ReactEventEmitterMixin");
__d(106 /* ReactNativeTagHandles */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);














var INITIAL_TAG_COUNT=1;
var ReactNativeTagHandles={
tagsStartAt:INITIAL_TAG_COUNT,
tagCount:INITIAL_TAG_COUNT,

allocateTag:function allocateTag(){

while(this.reactTagIsNativeTopRootID(ReactNativeTagHandles.tagCount)){
ReactNativeTagHandles.tagCount++;}

var tag=ReactNativeTagHandles.tagCount;
ReactNativeTagHandles.tagCount++;
return tag;},


assertRootTag:function assertRootTag(tag){
!this.reactTagIsNativeTopRootID(tag)?process.env.NODE_ENV!=='production'?invariant(false,'Expect a native root tag, instead got %s',tag):invariant(false):void 0;},


reactTagIsNativeTopRootID:function reactTagIsNativeTopRootID(reactTag){

return reactTag%10===1;}};



module.exports=ReactNativeTagHandles;
}, "ReactNativeTagHandles");
__d(107 /* ReactUpdates */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var CallbackQueue=require(108 /* ./CallbackQueue */);
var PooledClass=require(36 /* ./PooledClass */);
var ReactFeatureFlags=require(109 /* ./ReactFeatureFlags */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);
var ReactReconciler=require(110 /* ./ReactReconciler */);
var Transaction=require(113 /* ./Transaction */);

var invariant=require(259 /* fbjs/lib/invariant */);

var dirtyComponents=[];
var updateBatchNumber=0;
var asapCallbackQueue=CallbackQueue.getPooled();
var asapEnqueued=false;

var batchingStrategy=null;

function ensureInjected(){
!(ReactUpdates.ReactReconcileTransaction&&batchingStrategy)?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must inject a reconcile transaction class and batching '+'strategy'):invariant(false):void 0;}


var NESTED_UPDATES={
initialize:function initialize(){
this.dirtyComponentsLength=dirtyComponents.length;},

close:function close(){
if(this.dirtyComponentsLength!==dirtyComponents.length){





dirtyComponents.splice(0,this.dirtyComponentsLength);
flushBatchedUpdates();}else 
{
dirtyComponents.length=0;}}};




var UPDATE_QUEUEING={
initialize:function initialize(){
this.callbackQueue.reset();},

close:function close(){
this.callbackQueue.notifyAll();}};



var TRANSACTION_WRAPPERS=[NESTED_UPDATES,UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction(){
this.reinitializeTransaction();
this.dirtyComponentsLength=null;
this.callbackQueue=CallbackQueue.getPooled();
this.reconcileTransaction=ReactUpdates.ReactReconcileTransaction.getPooled(
true);}


_assign(ReactUpdatesFlushTransaction.prototype,Transaction.Mixin,{
getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;},


destructor:function destructor(){
this.dirtyComponentsLength=null;
CallbackQueue.release(this.callbackQueue);
this.callbackQueue=null;
ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
this.reconcileTransaction=null;},


perform:function perform(method,scope,a){


return Transaction.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,method,scope,a);}});



PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback,a,b,c,d,e){
ensureInjected();
batchingStrategy.batchedUpdates(callback,a,b,c,d,e);}









function mountOrderComparator(c1,c2){
return c1._mountOrder-c2._mountOrder;}


function runBatchedUpdates(transaction){
var len=transaction.dirtyComponentsLength;
!(len===dirtyComponents.length)?process.env.NODE_ENV!=='production'?invariant(false,'Expected flush transaction\'s stored dirty-components length (%s) to '+'match dirty-components array length (%s).',len,dirtyComponents.length):invariant(false):void 0;




dirtyComponents.sort(mountOrderComparator);






updateBatchNumber++;

for(var i=0;i<len;i++){



var component=dirtyComponents[i];




var callbacks=component._pendingCallbacks;
component._pendingCallbacks=null;

var markerName;
if(ReactFeatureFlags.logTopLevelRenders){
var namedComponent=component;

if(component._currentElement.props===component._renderedComponent._currentElement){
namedComponent=component._renderedComponent;}

markerName='React update: '+namedComponent.getName();
console.time(markerName);}


ReactReconciler.performUpdateIfNecessary(component,transaction.reconcileTransaction,updateBatchNumber);

if(markerName){
console.timeEnd(markerName);}


if(callbacks){
for(var j=0;j<callbacks.length;j++){
transaction.callbackQueue.enqueue(callbacks[j],component.getPublicInstance());}}}}





var flushBatchedUpdates=function flushBatchedUpdates(){
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onBeginFlush();}






while(dirtyComponents.length||asapEnqueued){
if(dirtyComponents.length){
var transaction=ReactUpdatesFlushTransaction.getPooled();
transaction.perform(runBatchedUpdates,null,transaction);
ReactUpdatesFlushTransaction.release(transaction);}


if(asapEnqueued){
asapEnqueued=false;
var queue=asapCallbackQueue;
asapCallbackQueue=CallbackQueue.getPooled();
queue.notifyAll();
CallbackQueue.release(queue);}}



if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onEndFlush();}};







function enqueueUpdate(component){
ensureInjected();







if(!batchingStrategy.isBatchingUpdates){
batchingStrategy.batchedUpdates(enqueueUpdate,component);
return;}


dirtyComponents.push(component);
if(component._updateBatchNumber==null){
component._updateBatchNumber=updateBatchNumber+1;}}







function asap(callback,context){
!batchingStrategy.isBatchingUpdates?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where'+'updates are not being batched.'):invariant(false):void 0;
asapCallbackQueue.enqueue(callback,context);
asapEnqueued=true;}


var ReactUpdatesInjection={
injectReconcileTransaction:function injectReconcileTransaction(ReconcileTransaction){
!ReconcileTransaction?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a reconcile transaction class'):invariant(false):void 0;
ReactUpdates.ReactReconcileTransaction=ReconcileTransaction;},


injectBatchingStrategy:function injectBatchingStrategy(_batchingStrategy){
!_batchingStrategy?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a batching strategy'):invariant(false):void 0;
!(typeof _batchingStrategy.batchedUpdates==='function')?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide a batchedUpdates() function'):invariant(false):void 0;
!(typeof _batchingStrategy.isBatchingUpdates==='boolean')?process.env.NODE_ENV!=='production'?invariant(false,'ReactUpdates: must provide an isBatchingUpdates boolean attribute'):invariant(false):void 0;
batchingStrategy=_batchingStrategy;}};



var ReactUpdates={






ReactReconcileTransaction:null,

batchedUpdates:batchedUpdates,
enqueueUpdate:enqueueUpdate,
flushBatchedUpdates:flushBatchedUpdates,
injection:ReactUpdatesInjection,
asap:asap};


module.exports=ReactUpdates;
}, "ReactUpdates");
__d(108 /* CallbackQueue */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var PooledClass=require(36 /* ./PooledClass */);

var invariant=require(259 /* fbjs/lib/invariant */);












function CallbackQueue(){
this._callbacks=null;
this._contexts=null;}


_assign(CallbackQueue.prototype,{








enqueue:function enqueue(callback,context){
this._callbacks=this._callbacks||[];
this._contexts=this._contexts||[];
this._callbacks.push(callback);
this._contexts.push(context);},








notifyAll:function notifyAll(){
var callbacks=this._callbacks;
var contexts=this._contexts;
if(callbacks){
!(callbacks.length===contexts.length)?process.env.NODE_ENV!=='production'?invariant(false,'Mismatched list of contexts in callback queue'):invariant(false):void 0;
this._callbacks=null;
this._contexts=null;
for(var i=0;i<callbacks.length;i++){
callbacks[i].call(contexts[i]);}

callbacks.length=0;
contexts.length=0;}},



checkpoint:function checkpoint(){
return this._callbacks?this._callbacks.length:0;},


rollback:function rollback(len){
if(this._callbacks){
this._callbacks.length=len;
this._contexts.length=len;}},








reset:function reset(){
this._callbacks=null;
this._contexts=null;},





destructor:function destructor(){
this.reset();}});




PooledClass.addPoolingTo(CallbackQueue);

module.exports=CallbackQueue;
}, "CallbackQueue");
__d(109 /* ReactFeatureFlags */, function(global, require, module, exports) {'use strict';












var ReactFeatureFlags={



logTopLevelRenders:false};


module.exports=ReactFeatureFlags;
}, "ReactFeatureFlags");
__d(110 /* ReactReconciler */, function(global, require, module, exports) {'use strict';












var ReactRef=require(111 /* ./ReactRef */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);

var invariant=require(259 /* fbjs/lib/invariant */);





function attachRefs(){
ReactRef.attachRefs(this,this._currentElement);}


var ReactReconciler={












mountComponent:function mountComponent(internalInstance,transaction,nativeParent,nativeContainerInfo,context){
if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID,'mountComponent');}}


var markup=internalInstance.mountComponent(transaction,nativeParent,nativeContainerInfo,context);
if(internalInstance._currentElement&&internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);}

if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID,'mountComponent');
ReactInstrumentation.debugTool.onMountComponent(internalInstance._debugID);}}


return markup;},






getNativeNode:function getNativeNode(internalInstance){
return internalInstance.getNativeNode();},








unmountComponent:function unmountComponent(internalInstance,safely){
if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID,'unmountComponent');}}


ReactRef.detachRefs(internalInstance,internalInstance._currentElement);
internalInstance.unmountComponent(safely);
if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID,'unmountComponent');
ReactInstrumentation.debugTool.onUnmountComponent(internalInstance._debugID);}}},













receiveComponent:function receiveComponent(internalInstance,nextElement,transaction,context){
var prevElement=internalInstance._currentElement;

if(nextElement===prevElement&&context===internalInstance._context){










return;}


if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID,'receiveComponent');}}



var refsChanged=ReactRef.shouldUpdateRefs(prevElement,nextElement);

if(refsChanged){
ReactRef.detachRefs(internalInstance,prevElement);}


internalInstance.receiveComponent(nextElement,transaction,context);

if(refsChanged&&internalInstance._currentElement&&internalInstance._currentElement.ref!=null){
transaction.getReactMountReady().enqueue(attachRefs,internalInstance);}


if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID,'receiveComponent');
ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);}}},











performUpdateIfNecessary:function performUpdateIfNecessary(internalInstance,transaction,updateBatchNumber){
if(internalInstance._updateBatchNumber!==updateBatchNumber){


!(internalInstance._updateBatchNumber==null||internalInstance._updateBatchNumber===updateBatchNumber+1)?process.env.NODE_ENV!=='production'?invariant(false,'performUpdateIfNecessary: Unexpected batch number (current %s, '+'pending %s)',updateBatchNumber,internalInstance._updateBatchNumber):invariant(false):void 0;
return;}

if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID,'performUpdateIfNecessary');}}


internalInstance.performUpdateIfNecessary(transaction);
if(process.env.NODE_ENV!=='production'){
if(internalInstance._debugID!==0){
ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID,'performUpdateIfNecessary');
ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);}}}};






module.exports=ReactReconciler;
}, "ReactReconciler");
__d(111 /* ReactRef */, function(global, require, module, exports) {'use strict';












var ReactOwner=require(112 /* ./ReactOwner */);

var ReactRef={};

function attachRef(ref,component,owner){
if(typeof ref==='function'){
ref(component.getPublicInstance());}else 
{

ReactOwner.addComponentAsRefTo(component,ref,owner);}}



function detachRef(ref,component,owner){
if(typeof ref==='function'){
ref(null);}else 
{

ReactOwner.removeComponentAsRefFrom(component,ref,owner);}}



ReactRef.attachRefs=function(instance,element){
if(element===null||element===false){
return;}

var ref=element.ref;
if(ref!=null){
attachRef(ref,instance,element._owner);}};



ReactRef.shouldUpdateRefs=function(prevElement,nextElement){












var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;

return (

prevEmpty||nextEmpty||nextElement._owner!==prevElement._owner||nextElement.ref!==prevElement.ref);};



ReactRef.detachRefs=function(instance,element){
if(element===null||element===false){
return;}

var ref=element.ref;
if(ref!=null){
detachRef(ref,instance,element._owner);}};



module.exports=ReactRef;
}, "ReactRef");
__d(112 /* ReactOwner */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);































var ReactOwner={






isValidOwner:function isValidOwner(object){
return !!(object&&typeof object.attachRef==='function'&&typeof object.detachRef==='function');},











addComponentAsRefTo:function addComponentAsRefTo(component,ref,owner){
!ReactOwner.isValidOwner(owner)?process.env.NODE_ENV!=='production'?invariant(false,'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might '+'be adding a ref to a component that was not created inside a component\'s '+'`render` method, or you have multiple copies of React loaded '+'(details: https://fb.me/react-refs-must-have-owner).'):invariant(false):void 0;
owner.attachRef(ref,component);},











removeComponentAsRefFrom:function removeComponentAsRefFrom(component,ref,owner){
!ReactOwner.isValidOwner(owner)?process.env.NODE_ENV!=='production'?invariant(false,'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might '+'be removing a ref to a component that was not created inside a component\'s '+'`render` method, or you have multiple copies of React loaded '+'(details: https://fb.me/react-refs-must-have-owner).'):invariant(false):void 0;
var ownerPublicInstance=owner.getPublicInstance();


if(ownerPublicInstance&&ownerPublicInstance.refs[ref]===component.getPublicInstance()){
owner.detachRef(ref);}}};





module.exports=ReactOwner;
}, "ReactOwner");
__d(113 /* Transaction */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);






























































var Mixin={







reinitializeTransaction:function reinitializeTransaction(){
this.transactionWrappers=this.getTransactionWrappers();
if(this.wrapperInitData){
this.wrapperInitData.length=0;}else 
{
this.wrapperInitData=[];}

this._isInTransaction=false;},


_isInTransaction:false,





getTransactionWrappers:null,

isInTransaction:function isInTransaction(){
return !!this._isInTransaction;},



















perform:function perform(method,scope,a,b,c,d,e,f){
!!this.isInTransaction()?process.env.NODE_ENV!=='production'?invariant(false,'Transaction.perform(...): Cannot initialize a transaction when there '+'is already an outstanding transaction.'):invariant(false):void 0;
var errorThrown;
var ret;
try{
this._isInTransaction=true;




errorThrown=true;
this.initializeAll(0);
ret=method.call(scope,a,b,c,d,e,f);
errorThrown=false;}finally 
{
try{
if(errorThrown){


try{
this.closeAll(0);}
catch(err){}}else 
{


this.closeAll(0);}}finally 

{
this._isInTransaction=false;}}


return ret;},


initializeAll:function initializeAll(startIndex){
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
try{




this.wrapperInitData[i]=Transaction.OBSERVED_ERROR;
this.wrapperInitData[i]=wrapper.initialize?wrapper.initialize.call(this):null;}finally 
{
if(this.wrapperInitData[i]===Transaction.OBSERVED_ERROR){



try{
this.initializeAll(i+1);}
catch(err){}}}}},











closeAll:function closeAll(startIndex){
!this.isInTransaction()?process.env.NODE_ENV!=='production'?invariant(false,'Transaction.closeAll(): Cannot close transaction when none are open.'):invariant(false):void 0;
var transactionWrappers=this.transactionWrappers;
for(var i=startIndex;i<transactionWrappers.length;i++){
var wrapper=transactionWrappers[i];
var initData=this.wrapperInitData[i];
var errorThrown;
try{




errorThrown=true;
if(initData!==Transaction.OBSERVED_ERROR&&wrapper.close){
wrapper.close.call(this,initData);}

errorThrown=false;}finally 
{
if(errorThrown){



try{
this.closeAll(i+1);}
catch(e){}}}}



this.wrapperInitData.length=0;}};



var Transaction={

Mixin:Mixin,




OBSERVED_ERROR:{}};



module.exports=Transaction;
}, "Transaction");
__d(114 /* ReactMultiChild */, function(global, require, module, exports) {'use strict';












var ReactComponentEnvironment=require(115 /* ./ReactComponentEnvironment */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);
var ReactMultiChildUpdateTypes=require(116 /* ./ReactMultiChildUpdateTypes */);

var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactReconciler=require(110 /* ./ReactReconciler */);
var ReactChildReconciler=require(117 /* ./ReactChildReconciler */);

var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);
var flattenChildren=require(125 /* ./flattenChildren */);
var invariant=require(259 /* fbjs/lib/invariant */);








function makeInsertMarkup(markup,afterNode,toIndex){

return {
type:ReactMultiChildUpdateTypes.INSERT_MARKUP,
content:markup,
fromIndex:null,
fromNode:null,
toIndex:toIndex,
afterNode:afterNode};}










function makeMove(child,afterNode,toIndex){

return {
type:ReactMultiChildUpdateTypes.MOVE_EXISTING,
content:null,
fromIndex:child._mountIndex,
fromNode:ReactReconciler.getNativeNode(child),
toIndex:toIndex,
afterNode:afterNode};}









function makeRemove(child,node){

return {
type:ReactMultiChildUpdateTypes.REMOVE_NODE,
content:null,
fromIndex:child._mountIndex,
fromNode:node,
toIndex:null,
afterNode:null};}









function makeSetMarkup(markup){

return {
type:ReactMultiChildUpdateTypes.SET_MARKUP,
content:markup,
fromIndex:null,
fromNode:null,
toIndex:null,
afterNode:null};}









function makeTextContent(textContent){

return {
type:ReactMultiChildUpdateTypes.TEXT_CONTENT,
content:textContent,
fromIndex:null,
fromNode:null,
toIndex:null,
afterNode:null};}







function enqueue(queue,update){
if(update){
queue=queue||[];
queue.push(update);}

return queue;}







function processQueue(inst,updateQueue){
ReactComponentEnvironment.processChildrenUpdates(inst,updateQueue);}


var setChildrenForInstrumentation=emptyFunction;
if(process.env.NODE_ENV!=='production'){
setChildrenForInstrumentation=function setChildrenForInstrumentation(children){
ReactInstrumentation.debugTool.onSetChildren(this._debugID,children?Object.keys(children).map(function(key){
return children[key]._debugID;}):
[]);};}









var ReactMultiChild={








Mixin:{

_reconcilerInstantiateChildren:function _reconcilerInstantiateChildren(nestedChildren,transaction,context){
if(process.env.NODE_ENV!=='production'){
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
return ReactChildReconciler.instantiateChildren(nestedChildren,transaction,context);}finally 
{
ReactCurrentOwner.current=null;}}}



return ReactChildReconciler.instantiateChildren(nestedChildren,transaction,context);},


_reconcilerUpdateChildren:function _reconcilerUpdateChildren(prevChildren,nextNestedChildrenElements,removedNodes,transaction,context){
var nextChildren;
if(process.env.NODE_ENV!=='production'){
if(this._currentElement){
try{
ReactCurrentOwner.current=this._currentElement._owner;
nextChildren=flattenChildren(nextNestedChildrenElements);}finally 
{
ReactCurrentOwner.current=null;}

ReactChildReconciler.updateChildren(prevChildren,nextChildren,removedNodes,transaction,context);
return nextChildren;}}


nextChildren=flattenChildren(nextNestedChildrenElements);
ReactChildReconciler.updateChildren(prevChildren,nextChildren,removedNodes,transaction,context);
return nextChildren;},










mountChildren:function mountChildren(nestedChildren,transaction,context){
var children=this._reconcilerInstantiateChildren(nestedChildren,transaction,context);
this._renderedChildren=children;

var mountImages=[];
var index=0;
for(var name in children){
if(children.hasOwnProperty(name)){
var child=children[name];
var mountImage=ReactReconciler.mountComponent(child,transaction,this,this._nativeContainerInfo,context);
child._mountIndex=index++;
mountImages.push(mountImage);}}



if(process.env.NODE_ENV!=='production'){
setChildrenForInstrumentation.call(this,children);}


return mountImages;},








updateTextContent:function updateTextContent(nextContent){
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren,false);
for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
!false?process.env.NODE_ENV!=='production'?invariant(false,'updateTextContent called on non-empty component.'):invariant(false):void 0;}}



var updates=[makeTextContent(nextContent)];
processQueue(this,updates);},








updateMarkup:function updateMarkup(nextMarkup){
var prevChildren=this._renderedChildren;

ReactChildReconciler.unmountChildren(prevChildren,false);
for(var name in prevChildren){
if(prevChildren.hasOwnProperty(name)){
!false?process.env.NODE_ENV!=='production'?invariant(false,'updateTextContent called on non-empty component.'):invariant(false):void 0;}}


var updates=[makeSetMarkup(nextMarkup)];
processQueue(this,updates);},









updateChildren:function updateChildren(nextNestedChildrenElements,transaction,context){

this._updateChildren(nextNestedChildrenElements,transaction,context);},








_updateChildren:function _updateChildren(nextNestedChildrenElements,transaction,context){
var prevChildren=this._renderedChildren;
var removedNodes={};
var nextChildren=this._reconcilerUpdateChildren(prevChildren,nextNestedChildrenElements,removedNodes,transaction,context);
if(!nextChildren&&!prevChildren){
return;}

var updates=null;
var name;


var lastIndex=0;
var nextIndex=0;
var lastPlacedNode=null;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;}

var prevChild=prevChildren&&prevChildren[name];
var nextChild=nextChildren[name];
if(prevChild===nextChild){
updates=enqueue(updates,this.moveChild(prevChild,lastPlacedNode,nextIndex,lastIndex));
lastIndex=Math.max(prevChild._mountIndex,lastIndex);
prevChild._mountIndex=nextIndex;}else 
{
if(prevChild){

lastIndex=Math.max(prevChild._mountIndex,lastIndex);}



updates=enqueue(updates,this._mountChildAtIndex(nextChild,lastPlacedNode,nextIndex,transaction,context));}

nextIndex++;
lastPlacedNode=ReactReconciler.getNativeNode(nextChild);}


for(name in removedNodes){
if(removedNodes.hasOwnProperty(name)){
updates=enqueue(updates,this._unmountChild(prevChildren[name],removedNodes[name]));}}


if(updates){
processQueue(this,updates);}

this._renderedChildren=nextChildren;

if(process.env.NODE_ENV!=='production'){
setChildrenForInstrumentation.call(this,nextChildren);}},










unmountChildren:function unmountChildren(safely){
var renderedChildren=this._renderedChildren;
ReactChildReconciler.unmountChildren(renderedChildren,safely);
this._renderedChildren=null;},










moveChild:function moveChild(child,afterNode,toIndex,lastIndex){



if(child._mountIndex<lastIndex){
return makeMove(child,afterNode,toIndex);}},










createChild:function createChild(child,afterNode,mountImage){
return makeInsertMarkup(mountImage,afterNode,child._mountIndex);},








removeChild:function removeChild(child,node){
return makeRemove(child,node);},













_mountChildAtIndex:function _mountChildAtIndex(child,afterNode,index,transaction,context){
var mountImage=ReactReconciler.mountComponent(child,transaction,this,this._nativeContainerInfo,context);
child._mountIndex=index;
return this.createChild(child,afterNode,mountImage);},










_unmountChild:function _unmountChild(child,node){
var update=this.removeChild(child,node);
child._mountIndex=null;
return update;}}};






module.exports=ReactMultiChild;
}, "ReactMultiChild");
__d(115 /* ReactComponentEnvironment */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);

var injected=false;

var ReactComponentEnvironment={






unmountIDFromEnvironment:null,





replaceNodeWithMarkup:null,





processChildrenUpdates:null,

injection:{
injectEnvironment:function injectEnvironment(environment){
!!injected?process.env.NODE_ENV!=='production'?invariant(false,'ReactCompositeComponent: injectEnvironment() can only be called once.'):invariant(false):void 0;
ReactComponentEnvironment.unmountIDFromEnvironment=environment.unmountIDFromEnvironment;
ReactComponentEnvironment.replaceNodeWithMarkup=environment.replaceNodeWithMarkup;
ReactComponentEnvironment.processChildrenUpdates=environment.processChildrenUpdates;
injected=true;}}};





module.exports=ReactComponentEnvironment;
}, "ReactComponentEnvironment");
__d(116 /* ReactMultiChildUpdateTypes */, function(global, require, module, exports) {'use strict';












var keyMirror=require(256 /* fbjs/lib/keyMirror */);









var ReactMultiChildUpdateTypes=keyMirror({
INSERT_MARKUP:null,
MOVE_EXISTING:null,
REMOVE_NODE:null,
SET_MARKUP:null,
TEXT_CONTENT:null});


module.exports=ReactMultiChildUpdateTypes;
}, "ReactMultiChildUpdateTypes");
__d(117 /* ReactChildReconciler */, function(global, require, module, exports) {'use strict';












var ReactReconciler=require(110 /* ./ReactReconciler */);

var instantiateReactComponent=require(118 /* ./instantiateReactComponent */);
var KeyEscapeUtils=require(42 /* ./KeyEscapeUtils */);
var shouldUpdateReactComponent=require(122 /* ./shouldUpdateReactComponent */);
var traverseAllChildren=require(40 /* ./traverseAllChildren */);
var warning=require(265 /* fbjs/lib/warning */);

function instantiateChild(childInstances,child,name){

var keyUnique=childInstances[name]===undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',KeyEscapeUtils.unescape(name)):void 0;}

if(child!=null&&keyUnique){
childInstances[name]=instantiateReactComponent(child);}}








var ReactChildReconciler={








instantiateChildren:function instantiateChildren(nestedChildNodes,transaction,context){
if(nestedChildNodes==null){
return null;}

var childInstances={};
traverseAllChildren(nestedChildNodes,instantiateChild,childInstances);
return childInstances;},












updateChildren:function updateChildren(prevChildren,nextChildren,removedNodes,transaction,context){





if(!nextChildren&&!prevChildren){
return;}

var name;
var prevChild;
for(name in nextChildren){
if(!nextChildren.hasOwnProperty(name)){
continue;}

prevChild=prevChildren&&prevChildren[name];
var prevElement=prevChild&&prevChild._currentElement;
var nextElement=nextChildren[name];
if(prevChild!=null&&shouldUpdateReactComponent(prevElement,nextElement)){
ReactReconciler.receiveComponent(prevChild,nextElement,transaction,context);
nextChildren[name]=prevChild;}else 
{
if(prevChild){
removedNodes[name]=ReactReconciler.getNativeNode(prevChild);
ReactReconciler.unmountComponent(prevChild,false);}


var nextChildInstance=instantiateReactComponent(nextElement);
nextChildren[name]=nextChildInstance;}}



for(name in prevChildren){
if(prevChildren.hasOwnProperty(name)&&!(nextChildren&&nextChildren.hasOwnProperty(name))){
prevChild=prevChildren[name];
removedNodes[name]=ReactReconciler.getNativeNode(prevChild);
ReactReconciler.unmountComponent(prevChild,false);}}},











unmountChildren:function unmountChildren(renderedChildren,safely){
for(var name in renderedChildren){
if(renderedChildren.hasOwnProperty(name)){
var renderedChild=renderedChildren[name];
ReactReconciler.unmountComponent(renderedChild,safely);}}}};






module.exports=ReactChildReconciler;
}, "ReactChildReconciler");
__d(118 /* instantiateReactComponent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactCompositeComponent=require(119 /* ./ReactCompositeComponent */);
var ReactEmptyComponent=require(123 /* ./ReactEmptyComponent */);
var ReactNativeComponent=require(124 /* ./ReactNativeComponent */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);

var invariant=require(259 /* fbjs/lib/invariant */);
var warning=require(265 /* fbjs/lib/warning */);


var ReactCompositeComponentWrapper=function ReactCompositeComponentWrapper(element){
this.construct(element);};

_assign(ReactCompositeComponentWrapper.prototype,ReactCompositeComponent.Mixin,{
_instantiateReactComponent:instantiateReactComponent});


function getDeclarationErrorAddendum(owner){
if(owner){
var name=owner.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}


function getDisplayName(instance){
var element=instance._currentElement;
if(element==null){
return '#empty';}else 
if(typeof element==='string'||typeof element==='number'){
return '#text';}else 
if(typeof element.type==='string'){
return element.type;}else 
if(instance.getName){
return instance.getName()||'Unknown';}else 
{
return element.type.displayName||element.type.name||'Unknown';}}










function isInternalComponentType(type){
return typeof type==='function'&&typeof type.prototype!=='undefined'&&typeof type.prototype.mountComponent==='function'&&typeof type.prototype.receiveComponent==='function';}


var nextDebugID=1;








function instantiateReactComponent(node){
var instance;

var isEmpty=node===null||node===false;
if(isEmpty){
instance=ReactEmptyComponent.create(instantiateReactComponent);}else 
if(typeof node==='object'){
var element=node;
!(element&&(typeof element.type==='function'||typeof element.type==='string'))?process.env.NODE_ENV!=='production'?invariant(false,'Element type is invalid: expected a string (for built-in components) '+'or a class/function (for composite components) but got: %s.%s',element.type==null?element.type:typeof element.type,getDeclarationErrorAddendum(element._owner)):invariant(false):void 0;


if(typeof element.type==='string'){
instance=ReactNativeComponent.createInternalComponent(element);}else 
if(isInternalComponentType(element.type)){



instance=new element.type(element);}else 
{
instance=new ReactCompositeComponentWrapper(element);}}else 

if(typeof node==='string'||typeof node==='number'){
instance=ReactNativeComponent.createInstanceForText(node);}else 
{
!false?process.env.NODE_ENV!=='production'?invariant(false,'Encountered invalid React node of type %s',typeof node):invariant(false):void 0;}


if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(typeof instance.mountComponent==='function'&&typeof instance.receiveComponent==='function'&&typeof instance.getNativeNode==='function'&&typeof instance.unmountComponent==='function','Only React Components can be mounted.'):void 0;}





instance._mountIndex=0;
instance._mountImage=null;

if(process.env.NODE_ENV!=='production'){
instance._isOwnerNecessary=false;
instance._warnedAboutRefsInRender=false;}


if(process.env.NODE_ENV!=='production'){
var debugID=isEmpty?0:nextDebugID++;
instance._debugID=debugID;

if(debugID!==0){
var displayName=getDisplayName(instance);
ReactInstrumentation.debugTool.onSetDisplayName(debugID,displayName);
var owner=node&&node._owner;
if(owner){
ReactInstrumentation.debugTool.onSetOwner(debugID,owner._debugID);}}}






if(process.env.NODE_ENV!=='production'){
if(Object.preventExtensions){
Object.preventExtensions(instance);}}



return instance;}


module.exports=instantiateReactComponent;
}, "instantiateReactComponent");
__d(119 /* ReactCompositeComponent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactComponentEnvironment=require(115 /* ./ReactComponentEnvironment */);
var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactElement=require(37 /* ./ReactElement */);
var ReactErrorUtils=require(102 /* ./ReactErrorUtils */);
var ReactInstanceMap=require(63 /* ./ReactInstanceMap */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);
var ReactNodeTypes=require(120 /* ./ReactNodeTypes */);
var ReactPropTypeLocations=require(47 /* ./ReactPropTypeLocations */);
var ReactPropTypeLocationNames=require(48 /* ./ReactPropTypeLocationNames */);
var ReactReconciler=require(110 /* ./ReactReconciler */);
var ReactUpdateQueue=require(121 /* ./ReactUpdateQueue */);

var emptyObject=require(262 /* fbjs/lib/emptyObject */);
var invariant=require(259 /* fbjs/lib/invariant */);
var shouldUpdateReactComponent=require(122 /* ./shouldUpdateReactComponent */);
var warning=require(265 /* fbjs/lib/warning */);

function getDeclarationErrorAddendum(component){
var owner=component._currentElement._owner||null;
if(owner){
var name=owner.getName();
if(name){
return ' Check the render method of `'+name+'`.';}}


return '';}


function StatelessComponent(Component){}
StatelessComponent.prototype.render=function(){
var Component=ReactInstanceMap.get(this)._currentElement.type;
var element=Component(this.props,this.context,this.updater);
warnIfInvalidElement(Component,element);
return element;};


function warnIfInvalidElement(Component,element){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(element===null||element===false||ReactElement.isValidElement(element),'%s(...): A valid React element (or null) must be returned. You may have '+'returned undefined, an array or some other invalid object.',Component.displayName||Component.name||'Component'):void 0;}}



function invokeComponentDidMountWithTimer(){
var publicInstance=this._instance;
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'componentDidMount');}

publicInstance.componentDidMount();
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'componentDidMount');}}



function invokeComponentDidUpdateWithTimer(prevProps,prevState,prevContext){
var publicInstance=this._instance;
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'componentDidUpdate');}

publicInstance.componentDidUpdate(prevProps,prevState,prevContext);
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'componentDidUpdate');}}



function shouldConstruct(Component){
return Component.prototype&&Component.prototype.isReactComponent;}



































var nextMountID=1;




var ReactCompositeComponentMixin={








construct:function construct(element){
this._currentElement=element;
this._rootNodeID=null;
this._instance=null;
this._nativeParent=null;
this._nativeContainerInfo=null;


this._updateBatchNumber=null;
this._pendingElement=null;
this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

this._renderedNodeType=null;
this._renderedComponent=null;
this._context=null;
this._mountOrder=0;
this._topLevelWrapper=null;


this._pendingCallbacks=null;


this._calledComponentWillUnmount=false;},













mountComponent:function mountComponent(transaction,nativeParent,nativeContainerInfo,context){
this._context=context;
this._mountOrder=nextMountID++;
this._nativeParent=nativeParent;
this._nativeContainerInfo=nativeContainerInfo;

var publicProps=this._processProps(this._currentElement.props);
var publicContext=this._processContext(context);

var Component=this._currentElement.type;


var inst=this._constructComponent(publicProps,publicContext);
var renderedElement;


if(!shouldConstruct(Component)&&(inst==null||inst.render==null)){
renderedElement=inst;
warnIfInvalidElement(Component,renderedElement);
!(inst===null||inst===false||ReactElement.isValidElement(inst))?process.env.NODE_ENV!=='production'?invariant(false,'%s(...): A valid React element (or null) must be returned. You may have '+'returned undefined, an array or some other invalid object.',Component.displayName||Component.name||'Component'):invariant(false):void 0;
inst=new StatelessComponent(Component);}


if(process.env.NODE_ENV!=='production'){


if(inst.render==null){
process.env.NODE_ENV!=='production'?warning(false,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`.',Component.displayName||Component.name||'Component'):void 0;}


var propsMutated=inst.props!==publicProps;
var componentName=Component.displayName||Component.name||'Component';

process.env.NODE_ENV!=='production'?warning(inst.props===undefined||!propsMutated,'%s(...): When calling super() in `%s`, make sure to pass '+'up the same props that your component\'s constructor was passed.',componentName,componentName):void 0;}




inst.props=publicProps;
inst.context=publicContext;
inst.refs=emptyObject;
inst.updater=ReactUpdateQueue;

this._instance=inst;


ReactInstanceMap.set(inst,this);

if(process.env.NODE_ENV!=='production'){



process.env.NODE_ENV!=='production'?warning(!inst.getInitialState||inst.getInitialState.isReactClassApproved,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',this.getName()||'a component'):void 0;
process.env.NODE_ENV!=='production'?warning(!inst.getDefaultProps||inst.getDefaultProps.isReactClassApproved,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',this.getName()||'a component'):void 0;
process.env.NODE_ENV!=='production'?warning(!inst.propTypes,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',this.getName()||'a component'):void 0;
process.env.NODE_ENV!=='production'?warning(!inst.contextTypes,'contextTypes was defined as an instance property on %s. Use a '+'static property to define contextTypes instead.',this.getName()||'a component'):void 0;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentShouldUpdate!=='function','%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',this.getName()||'A component'):void 0;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentDidUnmount!=='function','%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',this.getName()||'A component'):void 0;
process.env.NODE_ENV!=='production'?warning(typeof inst.componentWillRecieveProps!=='function','%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',this.getName()||'A component'):void 0;}


var initialState=inst.state;
if(initialState===undefined){
inst.state=initialState=null;}

!(typeof initialState==='object'&&!Array.isArray(initialState))?process.env.NODE_ENV!=='production'?invariant(false,'%s.state: must be set to an object or null',this.getName()||'ReactCompositeComponent'):invariant(false):void 0;

this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;

var markup;
if(inst.unstable_handleError){
markup=this.performInitialMountWithErrorHandling(renderedElement,nativeParent,nativeContainerInfo,transaction,context);}else 
{
markup=this.performInitialMount(renderedElement,nativeParent,nativeContainerInfo,transaction,context);}


if(inst.componentDidMount){
if(process.env.NODE_ENV!=='production'){
transaction.getReactMountReady().enqueue(invokeComponentDidMountWithTimer,this);}else 
{
transaction.getReactMountReady().enqueue(inst.componentDidMount,inst);}}



return markup;},


_constructComponent:function _constructComponent(publicProps,publicContext){
if(process.env.NODE_ENV!=='production'){
ReactCurrentOwner.current=this;
try{
return this._constructComponentWithoutOwner(publicProps,publicContext);}finally 
{
ReactCurrentOwner.current=null;}}else 

{
return this._constructComponentWithoutOwner(publicProps,publicContext);}},



_constructComponentWithoutOwner:function _constructComponentWithoutOwner(publicProps,publicContext){
var Component=this._currentElement.type;
var instanceOrElement;
if(shouldConstruct(Component)){
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'ctor');}}


instanceOrElement=new Component(publicProps,publicContext,ReactUpdateQueue);
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'ctor');}}}else 


{


if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'render');}}


instanceOrElement=Component(publicProps,publicContext,ReactUpdateQueue);
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'render');}}}



return instanceOrElement;},


performInitialMountWithErrorHandling:function performInitialMountWithErrorHandling(renderedElement,nativeParent,nativeContainerInfo,transaction,context){
var markup;
var checkpoint=transaction.checkpoint();
try{
markup=this.performInitialMount(renderedElement,nativeParent,nativeContainerInfo,transaction,context);}
catch(e){

transaction.rollback(checkpoint);
this._instance.unstable_handleError(e);
if(this._pendingStateQueue){
this._instance.state=this._processPendingState(this._instance.props,this._instance.context);}

checkpoint=transaction.checkpoint();

this._renderedComponent.unmountComponent(true);
transaction.rollback(checkpoint);



markup=this.performInitialMount(renderedElement,nativeParent,nativeContainerInfo,transaction,context);}

return markup;},


performInitialMount:function performInitialMount(renderedElement,nativeParent,nativeContainerInfo,transaction,context){
var inst=this._instance;
if(inst.componentWillMount){
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'componentWillMount');}}


inst.componentWillMount();
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'componentWillMount');}}




if(this._pendingStateQueue){
inst.state=this._processPendingState(inst.props,inst.context);}}




if(renderedElement===undefined){
renderedElement=this._renderValidatedComponent();}


this._renderedNodeType=ReactNodeTypes.getType(renderedElement);
this._renderedComponent=this._instantiateReactComponent(renderedElement);

var markup=ReactReconciler.mountComponent(this._renderedComponent,transaction,nativeParent,nativeContainerInfo,this._processChildContext(context));

if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onSetChildren(this._debugID,this._renderedComponent._debugID!==0?[this._renderedComponent._debugID]:[]);}}



return markup;},


getNativeNode:function getNativeNode(){
return ReactReconciler.getNativeNode(this._renderedComponent);},








unmountComponent:function unmountComponent(safely){
if(!this._renderedComponent){
return;}

var inst=this._instance;

if(inst.componentWillUnmount&&!inst._calledComponentWillUnmount){
inst._calledComponentWillUnmount=true;
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'componentWillUnmount');}}


if(safely){
var name=this.getName()+'.componentWillUnmount()';
ReactErrorUtils.invokeGuardedCallback(name,inst.componentWillUnmount.bind(inst));}else 
{
inst.componentWillUnmount();}

if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'componentWillUnmount');}}}




if(this._renderedComponent){
ReactReconciler.unmountComponent(this._renderedComponent,safely);
this._renderedNodeType=null;
this._renderedComponent=null;
this._instance=null;}





this._pendingStateQueue=null;
this._pendingReplaceState=false;
this._pendingForceUpdate=false;
this._pendingCallbacks=null;
this._pendingElement=null;



this._context=null;
this._rootNodeID=null;
this._topLevelWrapper=null;




ReactInstanceMap.remove(inst);},
















_maskContext:function _maskContext(context){
var Component=this._currentElement.type;
var contextTypes=Component.contextTypes;
if(!contextTypes){
return emptyObject;}

var maskedContext={};
for(var contextName in contextTypes){
maskedContext[contextName]=context[contextName];}

return maskedContext;},










_processContext:function _processContext(context){
var maskedContext=this._maskContext(context);
if(process.env.NODE_ENV!=='production'){
var Component=this._currentElement.type;
if(Component.contextTypes){
this._checkPropTypes(Component.contextTypes,maskedContext,ReactPropTypeLocations.context);}}


return maskedContext;},







_processChildContext:function _processChildContext(currentContext){
var Component=this._currentElement.type;
var inst=this._instance;
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onBeginProcessingChildContext();}

var childContext=inst.getChildContext&&inst.getChildContext();
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onEndProcessingChildContext();}

if(childContext){
!(typeof Component.childContextTypes==='object')?process.env.NODE_ENV!=='production'?invariant(false,'%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',this.getName()||'ReactCompositeComponent'):invariant(false):void 0;
if(process.env.NODE_ENV!=='production'){
this._checkPropTypes(Component.childContextTypes,childContext,ReactPropTypeLocations.childContext);}

for(var name in childContext){
!(name in Component.childContextTypes)?process.env.NODE_ENV!=='production'?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',this.getName()||'ReactCompositeComponent',name):invariant(false):void 0;}

return _assign({},currentContext,childContext);}

return currentContext;},











_processProps:function _processProps(newProps){
if(process.env.NODE_ENV!=='production'){
var Component=this._currentElement.type;
if(Component.propTypes){
this._checkPropTypes(Component.propTypes,newProps,ReactPropTypeLocations.prop);}}


return newProps;},










_checkPropTypes:function _checkPropTypes(propTypes,props,location){


var componentName=this.getName();
for(var propName in propTypes){
if(propTypes.hasOwnProperty(propName)){
var error;
try{


!(typeof propTypes[propName]==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s: %s type `%s` is invalid; it must be a function, usually '+'from React.PropTypes.',componentName||'React class',ReactPropTypeLocationNames[location],propName):invariant(false):void 0;
error=propTypes[propName](props,propName,componentName,location);}
catch(ex){
error=ex;}

if(error instanceof Error){



var addendum=getDeclarationErrorAddendum(this);

if(location===ReactPropTypeLocations.prop){

process.env.NODE_ENV!=='production'?warning(false,'Failed Composite propType: %s%s',error.message,addendum):void 0;}else 
{
process.env.NODE_ENV!=='production'?warning(false,'Failed Context Types: %s%s',error.message,addendum):void 0;}}}}},






receiveComponent:function receiveComponent(nextElement,transaction,nextContext){
var prevElement=this._currentElement;
var prevContext=this._context;

this._pendingElement=null;

this.updateComponent(transaction,prevElement,nextElement,prevContext,nextContext);},









performUpdateIfNecessary:function performUpdateIfNecessary(transaction){
if(this._pendingElement!=null){
ReactReconciler.receiveComponent(this,this._pendingElement,transaction,this._context);}else 
if(this._pendingStateQueue!==null||this._pendingForceUpdate){
this.updateComponent(transaction,this._currentElement,this._currentElement,this._context,this._context);}else 
{
this._updateBatchNumber=null;}},


















updateComponent:function updateComponent(transaction,prevParentElement,nextParentElement,prevUnmaskedContext,nextUnmaskedContext){
var inst=this._instance;
var willReceive=false;
var nextContext;
var nextProps;


if(this._context===nextUnmaskedContext){
nextContext=inst.context;}else 
{
nextContext=this._processContext(nextUnmaskedContext);
willReceive=true;}



if(prevParentElement===nextParentElement){


nextProps=nextParentElement.props;}else 
{
nextProps=this._processProps(nextParentElement.props);
willReceive=true;}





if(willReceive&&inst.componentWillReceiveProps){
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'componentWillReceiveProps');}}


inst.componentWillReceiveProps(nextProps,nextContext);
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'componentWillReceiveProps');}}}




var nextState=this._processPendingState(nextProps,nextContext);
var shouldUpdate=true;

if(!this._pendingForceUpdate&&inst.shouldComponentUpdate){
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'shouldComponentUpdate');}}


shouldUpdate=inst.shouldComponentUpdate(nextProps,nextState,nextContext);
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'shouldComponentUpdate');}}}




if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(shouldUpdate!==undefined,'%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',this.getName()||'ReactCompositeComponent'):void 0;}


this._updateBatchNumber=null;
if(shouldUpdate){
this._pendingForceUpdate=false;

this._performComponentUpdate(nextParentElement,nextProps,nextState,nextContext,transaction,nextUnmaskedContext);}else 
{


this._currentElement=nextParentElement;
this._context=nextUnmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;}},



_processPendingState:function _processPendingState(props,context){
var inst=this._instance;
var queue=this._pendingStateQueue;
var replace=this._pendingReplaceState;
this._pendingReplaceState=false;
this._pendingStateQueue=null;

if(!queue){
return inst.state;}


if(replace&&queue.length===1){
return queue[0];}


var nextState=_assign({},replace?queue[0]:inst.state);
for(var i=replace?1:0;i<queue.length;i++){
var partial=queue[i];
_assign(nextState,typeof partial==='function'?partial.call(inst,nextState,props,context):partial);}


return nextState;},














_performComponentUpdate:function _performComponentUpdate(nextElement,nextProps,nextState,nextContext,transaction,unmaskedContext){
var inst=this._instance;

var hasComponentDidUpdate=Boolean(inst.componentDidUpdate);
var prevProps;
var prevState;
var prevContext;
if(hasComponentDidUpdate){
prevProps=inst.props;
prevState=inst.state;
prevContext=inst.context;}


if(inst.componentWillUpdate){
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'componentWillUpdate');}}


inst.componentWillUpdate(nextProps,nextState,nextContext);
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'componentWillUpdate');}}}




this._currentElement=nextElement;
this._context=unmaskedContext;
inst.props=nextProps;
inst.state=nextState;
inst.context=nextContext;

this._updateRenderedComponent(transaction,unmaskedContext);

if(hasComponentDidUpdate){
if(process.env.NODE_ENV!=='production'){
transaction.getReactMountReady().enqueue(invokeComponentDidUpdateWithTimer.bind(this,prevProps,prevState,prevContext),this);}else 
{
transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst,prevProps,prevState,prevContext),inst);}}},










_updateRenderedComponent:function _updateRenderedComponent(transaction,context){
var prevComponentInstance=this._renderedComponent;
var prevRenderedElement=prevComponentInstance._currentElement;
var nextRenderedElement=this._renderValidatedComponent();
if(shouldUpdateReactComponent(prevRenderedElement,nextRenderedElement)){
ReactReconciler.receiveComponent(prevComponentInstance,nextRenderedElement,transaction,this._processChildContext(context));}else 
{
var oldNativeNode=ReactReconciler.getNativeNode(prevComponentInstance);
ReactReconciler.unmountComponent(prevComponentInstance,false);

this._renderedNodeType=ReactNodeTypes.getType(nextRenderedElement);
this._renderedComponent=this._instantiateReactComponent(nextRenderedElement);

var nextMarkup=ReactReconciler.mountComponent(this._renderedComponent,transaction,this._nativeParent,this._nativeContainerInfo,this._processChildContext(context));

if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onSetChildren(this._debugID,this._renderedComponent._debugID!==0?[this._renderedComponent._debugID]:[]);}}



this._replaceNodeWithMarkup(oldNativeNode,nextMarkup,prevComponentInstance);}},








_replaceNodeWithMarkup:function _replaceNodeWithMarkup(oldNativeNode,nextMarkup,prevInstance){
ReactComponentEnvironment.replaceNodeWithMarkup(oldNativeNode,nextMarkup,prevInstance);},





_renderValidatedComponentWithoutOwnerOrContext:function _renderValidatedComponentWithoutOwnerOrContext(){
var inst=this._instance;

if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID,'render');}}


var renderedComponent=inst.render();
if(process.env.NODE_ENV!=='production'){
if(this._debugID!==0){
ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID,'render');}}



if(process.env.NODE_ENV!=='production'){

if(renderedComponent===undefined&&inst.render._isMockFunction){


renderedComponent=null;}}



return renderedComponent;},





_renderValidatedComponent:function _renderValidatedComponent(){
var renderedComponent;
ReactCurrentOwner.current=this;
try{
renderedComponent=this._renderValidatedComponentWithoutOwnerOrContext();}finally 
{
ReactCurrentOwner.current=null;}

!(

renderedComponent===null||renderedComponent===false||ReactElement.isValidElement(renderedComponent))?process.env.NODE_ENV!=='production'?invariant(false,'%s.render(): A valid React element (or null) must be returned. You may have '+'returned undefined, an array or some other invalid object.',this.getName()||'ReactCompositeComponent'):invariant(false):void 0;

return renderedComponent;},










attachRef:function attachRef(ref,component){
var inst=this.getPublicInstance();
!(inst!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Stateless function components cannot have refs.'):invariant(false):void 0;
var publicComponentInstance=component.getPublicInstance();
if(process.env.NODE_ENV!=='production'){
var componentName=component&&component.getName?component.getName():'a component';
process.env.NODE_ENV!=='production'?warning(publicComponentInstance!=null,'Stateless function components cannot be given refs '+'(See ref "%s" in %s created by %s). '+'Attempts to access this ref will fail.',ref,componentName,this.getName()):void 0;}

var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;
refs[ref]=publicComponentInstance;},









detachRef:function detachRef(ref){
var refs=this.getPublicInstance().refs;
delete refs[ref];},








getName:function getName(){
var type=this._currentElement.type;
var constructor=this._instance&&this._instance.constructor;
return type.displayName||constructor&&constructor.displayName||type.name||constructor&&constructor.name||null;},










getPublicInstance:function getPublicInstance(){
var inst=this._instance;
if(inst instanceof StatelessComponent){
return null;}

return inst;},



_instantiateReactComponent:null};



var ReactCompositeComponent={

Mixin:ReactCompositeComponentMixin};



module.exports=ReactCompositeComponent;
}, "ReactCompositeComponent");
__d(120 /* ReactNodeTypes */, function(global, require, module, exports) {'use strict';












var ReactElement=require(37 /* ./ReactElement */);

var invariant=require(259 /* fbjs/lib/invariant */);

var ReactNodeTypes={
NATIVE:0,
COMPOSITE:1,
EMPTY:2,

getType:function getType(node){
if(node===null||node===false){
return ReactNodeTypes.EMPTY;}else 
if(ReactElement.isValidElement(node)){
if(typeof node.type==='function'){
return ReactNodeTypes.COMPOSITE;}else 
{
return ReactNodeTypes.NATIVE;}}


!false?process.env.NODE_ENV!=='production'?invariant(false,'Unexpected node: %s',node):invariant(false):void 0;}};



module.exports=ReactNodeTypes;
}, "ReactNodeTypes");
__d(121 /* ReactUpdateQueue */, function(global, require, module, exports) {'use strict';












var ReactCurrentOwner=require(38 /* ./ReactCurrentOwner */);
var ReactInstanceMap=require(63 /* ./ReactInstanceMap */);
var ReactUpdates=require(107 /* ./ReactUpdates */);

var invariant=require(259 /* fbjs/lib/invariant */);
var warning=require(265 /* fbjs/lib/warning */);

function enqueueUpdate(internalInstance){
ReactUpdates.enqueueUpdate(internalInstance);}


function formatUnexpectedArgument(arg){
var type=typeof arg;
if(type!=='object'){
return type;}

var displayName=arg.constructor&&arg.constructor.name||type;
var keys=Object.keys(arg);
if(keys.length>0&&keys.length<20){
return displayName+' (keys: '+keys.join(', ')+')';}

return displayName;}


function getInternalInstanceReadyForUpdate(publicInstance,callerName){
var internalInstance=ReactInstanceMap.get(publicInstance);
if(!internalInstance){
if(process.env.NODE_ENV!=='production'){



process.env.NODE_ENV!=='production'?warning(!callerName,'%s(...): Can only update a mounted or mounting component. '+'This usually means you called %s() on an unmounted component. '+'This is a no-op. Please check the code for the %s component.',callerName,callerName,publicInstance.constructor.displayName):void 0;}

return null;}


if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(ReactCurrentOwner.current==null,'%s(...): Cannot update during an existing state transition (such as '+'within `render` or another component\'s constructor). Render methods '+'should be a pure function of props and state; constructor '+'side-effects are an anti-pattern, but can be moved to '+'`componentWillMount`.',callerName):void 0;}


return internalInstance;}






var ReactUpdateQueue={








isMounted:function isMounted(publicInstance){
if(process.env.NODE_ENV!=='production'){
var owner=ReactCurrentOwner.current;
if(owner!==null){
process.env.NODE_ENV!=='production'?warning(owner._warnedAboutRefsInRender,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',owner.getName()||'A component'):void 0;
owner._warnedAboutRefsInRender=true;}}


var internalInstance=ReactInstanceMap.get(publicInstance);
if(internalInstance){



return !!internalInstance._renderedComponent;}else 
{
return false;}},












enqueueCallback:function enqueueCallback(publicInstance,callback,callerName){
ReactUpdateQueue.validateCallback(callback,callerName);
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance);






if(!internalInstance){
return null;}


if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);}else 
{
internalInstance._pendingCallbacks=[callback];}





enqueueUpdate(internalInstance);},


enqueueCallbackInternal:function enqueueCallbackInternal(internalInstance,callback){
if(internalInstance._pendingCallbacks){
internalInstance._pendingCallbacks.push(callback);}else 
{
internalInstance._pendingCallbacks=[callback];}

enqueueUpdate(internalInstance);},















enqueueForceUpdate:function enqueueForceUpdate(publicInstance){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'forceUpdate');

if(!internalInstance){
return;}


internalInstance._pendingForceUpdate=true;

enqueueUpdate(internalInstance);},













enqueueReplaceState:function enqueueReplaceState(publicInstance,completeState){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'replaceState');

if(!internalInstance){
return;}


internalInstance._pendingStateQueue=[completeState];
internalInstance._pendingReplaceState=true;

enqueueUpdate(internalInstance);},












enqueueSetState:function enqueueSetState(publicInstance,partialState){
var internalInstance=getInternalInstanceReadyForUpdate(publicInstance,'setState');

if(!internalInstance){
return;}


var queue=internalInstance._pendingStateQueue||(internalInstance._pendingStateQueue=[]);
queue.push(partialState);

enqueueUpdate(internalInstance);},


enqueueElementInternal:function enqueueElementInternal(internalInstance,newElement){
internalInstance._pendingElement=newElement;
enqueueUpdate(internalInstance);},


validateCallback:function validateCallback(callback,callerName){
!(!callback||typeof callback==='function')?process.env.NODE_ENV!=='production'?invariant(false,'%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,formatUnexpectedArgument(callback)):invariant(false):void 0;}};




module.exports=ReactUpdateQueue;
}, "ReactUpdateQueue");
__d(122 /* shouldUpdateReactComponent */, function(global, require, module, exports) {'use strict';
























function shouldUpdateReactComponent(prevElement,nextElement){
var prevEmpty=prevElement===null||prevElement===false;
var nextEmpty=nextElement===null||nextElement===false;
if(prevEmpty||nextEmpty){
return prevEmpty===nextEmpty;}


var prevType=typeof prevElement;
var nextType=typeof nextElement;
if(prevType==='string'||prevType==='number'){
return nextType==='string'||nextType==='number';}else 
{
return nextType==='object'&&prevElement.type===nextElement.type&&prevElement.key===nextElement.key;}}



module.exports=shouldUpdateReactComponent;
}, "shouldUpdateReactComponent");
__d(123 /* ReactEmptyComponent */, function(global, require, module, exports) {'use strict';












var emptyComponentFactory;

var ReactEmptyComponentInjection={
injectEmptyComponentFactory:function injectEmptyComponentFactory(factory){
emptyComponentFactory=factory;}};



var ReactEmptyComponent={
create:function create(instantiate){
return emptyComponentFactory(instantiate);}};



ReactEmptyComponent.injection=ReactEmptyComponentInjection;

module.exports=ReactEmptyComponent;
}, "ReactEmptyComponent");
__d(124 /* ReactNativeComponent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var invariant=require(259 /* fbjs/lib/invariant */);

var autoGenerateWrapperClass=null;
var genericComponentClass=null;

var tagToComponentClass={};
var textComponentClass=null;

var ReactNativeComponentInjection={


injectGenericComponentClass:function injectGenericComponentClass(componentClass){
genericComponentClass=componentClass;},



injectTextComponentClass:function injectTextComponentClass(componentClass){
textComponentClass=componentClass;},



injectComponentClasses:function injectComponentClasses(componentClasses){
_assign(tagToComponentClass,componentClasses);}};









function getComponentClassForElement(element){
if(typeof element.type==='function'){
return element.type;}

var tag=element.type;
var componentClass=tagToComponentClass[tag];
if(componentClass==null){
tagToComponentClass[tag]=componentClass=autoGenerateWrapperClass(tag);}

return componentClass;}








function createInternalComponent(element){
!genericComponentClass?process.env.NODE_ENV!=='production'?invariant(false,'There is no registered component for the tag %s',element.type):invariant(false):void 0;
return new genericComponentClass(element);}






function createInstanceForText(text){
return new textComponentClass(text);}






function isTextComponent(component){
return component instanceof textComponentClass;}


var ReactNativeComponent={
getComponentClassForElement:getComponentClassForElement,
createInternalComponent:createInternalComponent,
createInstanceForText:createInstanceForText,
isTextComponent:isTextComponent,
injection:ReactNativeComponentInjection};


module.exports=ReactNativeComponent;
}, "ReactNativeComponent");
__d(125 /* flattenChildren */, function(global, require, module, exports) {'use strict';












var KeyEscapeUtils=require(42 /* ./KeyEscapeUtils */);
var traverseAllChildren=require(40 /* ./traverseAllChildren */);
var warning=require(265 /* fbjs/lib/warning */);






function flattenSingleChildIntoContext(traverseContext,child,name){

var result=traverseContext;
var keyUnique=result[name]===undefined;
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(keyUnique,'flattenChildren(...): Encountered two children with the same key, '+'`%s`. Child keys must be unique; when two children share a key, only '+'the first child will be used.',KeyEscapeUtils.unescape(name)):void 0;}

if(keyUnique&&child!=null){
result[name]=child;}}








function flattenChildren(children){
if(children==null){
return children;}

var result={};
traverseAllChildren(children,flattenSingleChildIntoContext,result);
return result;}


module.exports=flattenChildren;
}, "flattenChildren");
__d(126 /* deepFreezeAndThrowOnMutationInDev */, function(global, require, module, exports) {'use strict';






























function deepFreezeAndThrowOnMutationInDev(object){
if(__DEV__){
if(typeof object!=='object'||
object===null||
Object.isFrozen(object)||
Object.isSealed(object)){
return;}


for(var key in object){
if(object.hasOwnProperty(key)){
object.__defineGetter__(key,identity.bind(null,object[key]));
object.__defineSetter__(key,throwOnImmutableMutation.bind(null,key));}}



Object.freeze(object);
Object.seal(object);

for(var key in object){
if(object.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(object[key]);}}}}





function throwOnImmutableMutation(key,value){
throw Error(
'You attempted to set the key `'+key+'` with the value `'+
JSON.stringify(value)+'` on an object that is meant to be immutable '+
'and has been frozen.');}



function identity(value){
return value;}


module.exports=deepFreezeAndThrowOnMutationInDev;
}, "deepFreezeAndThrowOnMutationInDev");
__d(127 /* insetsDiffer */, function(global, require, module, exports) {'use strict';



















var dummyInsets={
top:undefined,
left:undefined,
right:undefined,
bottom:undefined};


var insetsDiffer=function insetsDiffer(
one,
two)
{
one=one||dummyInsets;
two=two||dummyInsets;
return one!==two&&(
one.top!==two.top||
one.left!==two.left||
one.right!==two.right||
one.bottom!==two.bottom);};



module.exports=insetsDiffer;
}, "insetsDiffer");
__d(128 /* pointsDiffer */, function(global, require, module, exports) {'use strict';

















var dummyPoint={x:undefined,y:undefined};

var pointsDiffer=function pointsDiffer(one,two){
one=one||dummyPoint;
two=two||dummyPoint;
return one!==two&&(
one.x!==two.x||
one.y!==two.y);};



module.exports=pointsDiffer;
}, "pointsDiffer");
__d(129 /* resolveAssetSource */, function(global, require, module, exports) {'use strict';
















var AssetRegistry=require(130 /* AssetRegistry */);
var AssetSourceResolver=require(131 /* AssetSourceResolver */);var _require=
require(12 /* NativeModules */);var SourceCode=_require.SourceCode;

var _customSourceTransformer=void 0,_serverURL=void 0,_bundleSourcePath=void 0;

function getDevServerURL(){
if(_serverURL===undefined){
var scriptURL=SourceCode.scriptURL;
var match=scriptURL&&scriptURL.match(/^https?:\/\/.*?\//);
if(match){

_serverURL=match[0];}else 
{

_serverURL=null;}}


return _serverURL;}


function getBundleSourcePath(){
if(_bundleSourcePath===undefined){
var scriptURL=SourceCode.scriptURL;
if(!scriptURL){

_bundleSourcePath=null;
return _bundleSourcePath;}

if(scriptURL.startsWith('assets://')){

_bundleSourcePath=null;
return _bundleSourcePath;}

if(scriptURL.startsWith('file://')){

_bundleSourcePath=scriptURL.substring(7,scriptURL.lastIndexOf('/')+1);}else 
{
_bundleSourcePath=scriptURL.substring(0,scriptURL.lastIndexOf('/')+1);}}



return _bundleSourcePath;}


function setCustomSourceTransformer(
transformer)
{
_customSourceTransformer=transformer;}






function resolveAssetSource(source){
if(typeof source==='object'){
return source;}


var asset=AssetRegistry.getAssetByID(source);
if(!asset){
return null;}


var resolver=new AssetSourceResolver(getDevServerURL(),getBundleSourcePath(),asset);
if(_customSourceTransformer){
return _customSourceTransformer(resolver);}

return resolver.defaultAsset();}


module.exports=resolveAssetSource;
module.exports.pickScale=AssetSourceResolver.pickScale;
module.exports.setCustomSourceTransformer=setCustomSourceTransformer;
}, "resolveAssetSource");
__d(130 /* AssetRegistry */, function(global, require, module, exports) {'use strict';




















var assets=[];

function registerAsset(asset){


return assets.push(asset);}


function getAssetByID(assetId){
return assets[assetId-1];}


module.exports={registerAsset:registerAsset,getAssetByID:getAssetByID};
}, "AssetRegistry");
__d(131 /* AssetSourceResolver */, function(global, require, module, exports) {var 





















PixelRatio=require(91 /* PixelRatio */);
var Platform=require(13 /* Platform */);

var assetPathUtils=require(253 /* ../../local-cli/bundle/assetPathUtils */);
var invariant=require(259 /* fbjs/lib/invariant */);




function getScaledAssetPath(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var scaleSuffix=scale===1?'':'@'+scale+'x';
var assetDir=assetPathUtils.getBasePath(asset);
return assetDir+'/'+asset.name+scaleSuffix+'.'+asset.type;}





function getAssetPathInDrawableFolder(asset){
var scale=AssetSourceResolver.pickScale(asset.scales,PixelRatio.get());
var drawbleFolder=assetPathUtils.getAndroidDrawableFolderName(asset,scale);
var fileName=assetPathUtils.getAndroidResourceIdentifier(asset);
return drawbleFolder+'/'+fileName+'.'+asset.type;}var 


AssetSourceResolver=function(){







function AssetSourceResolver(serverUrl,bundlePath,asset){babelHelpers.classCallCheck(this,AssetSourceResolver);
this.serverUrl=serverUrl;
this.bundlePath=bundlePath;
this.asset=asset;}babelHelpers.createClass(AssetSourceResolver,[{key:'isLoadedFromServer',value:function isLoadedFromServer()


{
return !!this.serverUrl;}},{key:'isLoadedFromFileSystem',value:function isLoadedFromFileSystem()


{
return !!this.bundlePath;}},{key:'defaultAsset',value:function defaultAsset()


{
if(this.isLoadedFromServer()){
return this.assetServerURL();}


if(Platform.OS==='android'){
return this.isLoadedFromFileSystem()?
this.drawableFolderInBundle():
this.resourceIdentifierWithoutScale();}else 
{
return this.scaledAssetPathInBundle();}}},{key:'assetServerURL',value:function assetServerURL()







{
invariant(!!this.serverUrl,'need server to load from');
return this.fromSource(
this.serverUrl+getScaledAssetPath(this.asset)+
'?platform='+Platform.OS+'&hash='+this.asset.hash);}},{key:'scaledAssetPath',value:function scaledAssetPath()







{
return this.fromSource(getScaledAssetPath(this.asset));}},{key:'scaledAssetPathInBundle',value:function scaledAssetPathInBundle()






{
var path=this.bundlePath||'';
return this.fromSource(path+getScaledAssetPath(this.asset));}},{key:'resourceIdentifierWithoutScale',value:function resourceIdentifierWithoutScale()








{
invariant(Platform.OS==='android','resource identifiers work on Android');
return this.fromSource(assetPathUtils.getAndroidResourceIdentifier(this.asset));}},{key:'drawableFolderInBundle',value:function drawableFolderInBundle()







{
var path=this.bundlePath||'';
return this.fromSource(
'file://'+path+getAssetPathInDrawableFolder(this.asset));}},{key:'fromSource',value:function fromSource(



source){
return {
__packager_asset:true,
width:this.asset.width,
height:this.asset.height,
uri:source,
scale:AssetSourceResolver.pickScale(this.asset.scales,PixelRatio.get())};}}],[{key:'pickScale',value:function pickScale(



scales,deviceScale){

for(var i=0;i<scales.length;i++){
if(scales[i]>=deviceScale){
return scales[i];}}






return scales[scales.length-1]||1;}}]);return AssetSourceResolver;}();




module.exports=AssetSourceResolver;
}, "AssetSourceResolver");
__d(253 /* react-native/local-cli/bundle/assetPathUtils.js */, function(global, require, module, exports) {'use strict';









function getAndroidAssetSuffix(scale){
switch(scale){
case 0.75:return 'ldpi';
case 1:return 'mdpi';
case 1.5:return 'hdpi';
case 2:return 'xhdpi';
case 3:return 'xxhdpi';
case 4:return 'xxxhdpi';}}



function getAndroidDrawableFolderName(asset,scale){
var suffix=getAndroidAssetSuffix(scale);
if(!suffix){
throw new Error(
'Don\'t know which android drawable suffix to use for asset: '+
JSON.stringify(asset));}


var androidFolder='drawable-'+suffix;
return androidFolder;}


function getAndroidResourceIdentifier(asset){
var folderPath=getBasePath(asset);
return (folderPath+'/'+asset.name).
toLowerCase().
replace(/\//g,'_').
replace(/([^a-z0-9_])/g,'').
replace(/^assets_/,'');}


function getBasePath(asset){
var basePath=asset.httpServerLocation;
if(basePath[0]==='/'){
basePath=basePath.substr(1);}

return basePath;}


module.exports={
getAndroidAssetSuffix:getAndroidAssetSuffix,
getAndroidDrawableFolderName:getAndroidDrawableFolderName,
getAndroidResourceIdentifier:getAndroidResourceIdentifier,
getBasePath:getBasePath};
}, "react-native/local-cli/bundle/assetPathUtils.js");
__d(132 /* verifyPropTypes */, function(global, require, module, exports) {'use strict';












var ReactNativeStyleAttributes=require(65 /* ReactNativeStyleAttributes */);







function verifyPropTypes(
componentInterface,
viewConfig,
nativePropsToIgnore)
{
if(!viewConfig){
return;}

var componentName=componentInterface.name||
componentInterface.displayName||
'unknown';
if(!componentInterface.propTypes){
throw new Error(
'`'+componentName+'` has no propTypes defined`');}



var nativeProps=viewConfig.NativeProps;
for(var prop in nativeProps){
if(!componentInterface.propTypes[prop]&&
!ReactNativeStyleAttributes[prop]&&(
!nativePropsToIgnore||!nativePropsToIgnore[prop])){
var message;
if(componentInterface.propTypes.hasOwnProperty(prop)){
message='`'+componentName+'` has incorrectly defined propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+nativeProps[prop];}else 
{
message='`'+componentName+'` has no propType for native prop `'+
viewConfig.uiViewClassName+'.'+prop+'` of native type `'+
nativeProps[prop]+'`';}
;
message+='\nIf you haven\'t changed this prop yourself, this usually means that '+
'your versions of the native code and JavaScript code are out of sync. Updating both '+
'should make this error go away.';
throw new Error(message);}}}




module.exports=verifyPropTypes;
}, "verifyPropTypes");
__d(133 /* renderApplication */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/ReactIOS/renderApplication.android.js';












var Inspector=require(134 /* Inspector */);
var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);
var React=require(34 /* React */);
var ReactNative=require(157 /* ReactNative */);
var StyleSheet=require(90 /* StyleSheet */);
var Subscribable=require(199 /* Subscribable */);
var View=require(81 /* View */);

var invariant=require(259 /* fbjs/lib/invariant */);

var YellowBox=__DEV__?require(200 /* YellowBox */):null;


require(206 /* BackAndroid */);

var AppContainer=React.createClass({displayName:'AppContainer',
mixins:[Subscribable.Mixin],

getInitialState:function getInitialState(){
return {
inspectorVisible:false,
rootNodeHandle:null,
rootImportanceForAccessibility:'auto',
mainKey:1};},



toggleElementInspector:function toggleElementInspector(){
this.setState({
inspectorVisible:!this.state.inspectorVisible,
rootNodeHandle:ReactNative.findNodeHandle(this.refs.main)});},



componentDidMount:function componentDidMount(){
this.addListenerOn(
RCTDeviceEventEmitter,
'toggleElementInspector',
this.toggleElementInspector);


this._unmounted=false;},


renderInspector:function renderInspector(){var _this=this;
return this.state.inspectorVisible?
React.createElement(Inspector,{
rootTag:this.props.rootTag,
inspectedViewTag:this.state.rootNodeHandle,
onRequestRerenderApp:function onRequestRerenderApp(updateInspectedViewTag){
_this.setState(
function(s){return {mainKey:s.mainKey+1};},
function(){return updateInspectedViewTag(ReactNative.findNodeHandle(_this.refs.main));});},__source:{fileName:_jsxFileName,lineNumber:60}}):



null;},


componentWillUnmount:function componentWillUnmount(){
this._unmounted=true;},


render:function render(){
var RootComponent=this.props.rootComponent;
var appView=
React.createElement(View,{
ref:'main',
key:this.state.mainKey,
collapsable:!this.state.inspectorVisible,
style:styles.appContainer,__source:{fileName:_jsxFileName,lineNumber:80}},
React.createElement(RootComponent,babelHelpers.extends({},
this.props.initialProps,{
rootTag:this.props.rootTag,
importantForAccessibility:this.state.rootImportanceForAccessibility,__source:{fileName:_jsxFileName,lineNumber:85}})));

return __DEV__?
React.createElement(View,{style:styles.appContainer,__source:{fileName:_jsxFileName,lineNumber:91}},
appView,
React.createElement(YellowBox,{__source:{fileName:_jsxFileName,lineNumber:93}}),
this.renderInspector()):

appView;}});



function renderApplication(
RootComponent,
initialProps,
rootTag)
{
invariant(
rootTag,
'Expect to have a valid rootTag, instead got ',rootTag);

ReactNative.render(
React.createElement(AppContainer,{
rootComponent:RootComponent,
initialProps:initialProps,
rootTag:rootTag,__source:{fileName:_jsxFileName,lineNumber:110}}),
rootTag);}



var styles=StyleSheet.create({
appContainer:{
position:'absolute',
left:0,
top:0,
right:0,
bottom:0}});



module.exports=renderApplication;
}, "renderApplication");
__d(134 /* Inspector */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/Inspector.js';















var Dimensions=require(92 /* Dimensions */);
var InspectorOverlay=require(135 /* InspectorOverlay */);
var InspectorPanel=require(140 /* InspectorPanel */);
var InspectorUtils=require(136 /* InspectorUtils */);
var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var Touchable=require(142 /* Touchable */);
var UIManager=require(61 /* UIManager */);
var View=require(81 /* View */);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){

window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle=require(59 /* flattenStyle */);}var 


Inspector=function(_React$Component){babelHelpers.inherits(Inspector,_React$Component);



















function Inspector(props){babelHelpers.classCallCheck(this,Inspector);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Inspector).call(this,
props));

_this.state={
devtoolsAgent:null,
hierarchy:null,
panelPos:'bottom',
inspecting:true,
perfing:false,
inspected:null,
selection:null,
inspectedViewTag:_this.props.inspectedViewTag};return _this;}babelHelpers.createClass(Inspector,[{key:'componentDidMount',value:function componentDidMount()



{
if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
this.attachToDevtools=this.attachToDevtools.bind(this);
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on('react-devtools',this.attachToDevtools);

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent){
this.attachToDevtools(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent);}}}},{key:'componentWillUnmount',value:function componentWillUnmount()




{
if(this._subs){
this._subs.map(function(fn){return fn();});}

if(window.__REACT_DEVTOOLS_GLOBAL_HOOK__){
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.off('react-devtools',this.attachToDevtools);}}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(



newProps){
this.setState({inspectedViewTag:newProps.inspectedViewTag});}},{key:'attachToDevtools',value:function attachToDevtools(


agent){var _this2=this;
var _hideWait=null;
var hlSub=agent.sub('highlight',function(_ref){var node=_ref.node;var name=_ref.name;var props=_ref.props;
clearTimeout(_hideWait);
UIManager.measure(node,function(x,y,width,height,left,top){
_this2.setState({
hierarchy:[],
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:props?props.style:{}}});});});




var hideSub=agent.sub('hideHighlight',function(){
if(_this2.state.inspected===null){
return;}


_hideWait=setTimeout(function(){
_this2.setState({
inspected:null});},

100);});

this._subs=[hlSub,hideSub];

agent.on('shutdown',function(){
_this2.setState({devtoolsAgent:null});
_this2._subs=null;});

this.setState({
devtoolsAgent:agent});}},{key:'setSelection',value:function setSelection(



i){var _this3=this;
var instance=this.state.hierarchy[i];


var publicInstance=instance['_instance']||{};
var source=instance._currentElement&&instance._currentElement._source;
UIManager.measure(instance.getNativeNode(),function(x,y,width,height,left,top){
_this3.setState({
inspected:{
frame:{left:left,top:top,width:width,height:height},
style:publicInstance.props?publicInstance.props.style:{},
source:source},

selection:i});});}},{key:'onTouchInstance',value:function onTouchInstance(




instance,frame,pointerY){
if(this.state.devtoolsAgent){
this.state.devtoolsAgent.selectFromReactInstance(instance,true);}

var hierarchy=InspectorUtils.getOwnerHierarchy(instance);


var publicInstance=instance._instance||{};
var props=publicInstance.props||{};
var source=instance._currentElement&&instance._currentElement._source;
this.setState({
panelPos:pointerY>Dimensions.get('window').height/2?'top':'bottom',
selection:hierarchy.length-1,
hierarchy:hierarchy,
inspected:{
style:props.style||{},
frame:frame,
source:source}});}},{key:'setPerfing',value:function setPerfing(




val){
this.setState({
perfing:val,
inspecting:false,
inspected:null});}},{key:'setInspecting',value:function setInspecting(



val){
this.setState({
inspecting:val,
inspected:null});}},{key:'setTouchTargetting',value:function setTouchTargetting(



val){var _this4=this;
Touchable.TOUCH_TARGET_DEBUG=val;
this.props.onRequestRerenderApp(function(inspectedViewTag){
_this4.setState({inspectedViewTag:inspectedViewTag});});}},{key:'render',value:function render()



{
var panelContainerStyle=this.state.panelPos==='bottom'?{bottom:0}:{top:0};
return (
React.createElement(View,{style:styles.container,pointerEvents:'box-none',__source:{fileName:_jsxFileName,lineNumber:192}},
this.state.inspecting&&
React.createElement(InspectorOverlay,{
rootTag:this.props.rootTag,
inspected:this.state.inspected,
inspectedViewTag:this.state.inspectedViewTag,
onTouchInstance:this.onTouchInstance.bind(this),__source:{fileName:_jsxFileName,lineNumber:194}}),

React.createElement(View,{style:[styles.panelContainer,panelContainerStyle],__source:{fileName:_jsxFileName,lineNumber:200}},
React.createElement(InspectorPanel,{
devtoolsIsOpen:!!this.state.devtoolsAgent,
inspecting:this.state.inspecting,
perfing:this.state.perfing,
setPerfing:this.setPerfing.bind(this),
setInspecting:this.setInspecting.bind(this),
inspected:this.state.inspected,
hierarchy:this.state.hierarchy,
selection:this.state.selection,
setSelection:this.setSelection.bind(this),
touchTargetting:Touchable.TOUCH_TARGET_DEBUG,
setTouchTargetting:this.setTouchTargetting.bind(this),__source:{fileName:_jsxFileName,lineNumber:201}}))));}}]);return Inspector;}(React.Component);







var styles=StyleSheet.create({
container:{
position:'absolute',
backgroundColor:'transparent',
top:0,
left:0,
right:0,
bottom:0},

panelContainer:{
position:'absolute',
left:0,
right:0}});



module.exports=Inspector;
}, "Inspector");
__d(135 /* InspectorOverlay */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/InspectorOverlay.js';












var Dimensions=require(92 /* Dimensions */);
var InspectorUtils=require(136 /* InspectorUtils */);
var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var UIManager=require(61 /* UIManager */);
var View=require(81 /* View */);
var ElementBox=require(137 /* ElementBox */);

var PropTypes=React.PropTypes;





var InspectorOverlay=React.createClass({displayName:'InspectorOverlay',
propTypes:{
inspected:PropTypes.shape({
frame:PropTypes.object,
style:PropTypes.any}),

inspectedViewTag:PropTypes.number,
onTouchInstance:PropTypes.func.isRequired},


findViewForTouchEvent:function findViewForTouchEvent(e){var _this=this;var _e$nativeEvent$touche=
e.nativeEvent.touches[0];var locationX=_e$nativeEvent$touche.locationX;var locationY=_e$nativeEvent$touche.locationY;
UIManager.findSubviewIn(
this.props.inspectedViewTag,
[locationX,locationY],
function(nativeViewTag,left,top,width,height){
var instance=InspectorUtils.findInstanceByNativeTag(_this.props.rootTag,nativeViewTag);
if(!instance){
return;}

_this.props.onTouchInstance(instance,{left:left,top:top,width:width,height:height},locationY);});},




shouldSetResponser:function shouldSetResponser(e){
this.findViewForTouchEvent(e);
return true;},


render:function render(){
var content=null;
if(this.props.inspected){
content=React.createElement(ElementBox,{frame:this.props.inspected.frame,style:this.props.inspected.style,__source:{fileName:_jsxFileName,lineNumber:61}});}


return (
React.createElement(View,{
onStartShouldSetResponder:this.shouldSetResponser,
onResponderMove:this.findViewForTouchEvent,
style:[styles.inspector,{height:Dimensions.get('window').height}],__source:{fileName:_jsxFileName,lineNumber:65}},
content));}});





var styles=StyleSheet.create({
inspector:{
backgroundColor:'transparent',
position:'absolute',
left:0,
top:0,
right:0}});



module.exports=InspectorOverlay;
}, "InspectorOverlay");
__d(136 /* InspectorUtils */, function(global, require, module, exports) {'use strict';











var ReactNativeComponentTree=require(96 /* ReactNativeComponentTree */);

function traverseOwnerTreeUp(hierarchy,instance){
if(instance){
hierarchy.unshift(instance);
traverseOwnerTreeUp(hierarchy,instance._currentElement._owner);}}



function findInstanceByNativeTag(rootTag,nativeTag){
return ReactNativeComponentTree.getInstanceFromNode(nativeTag);}


function getOwnerHierarchy(instance){
var hierarchy=[];
traverseOwnerTreeUp(hierarchy,instance);
return hierarchy;}


module.exports={findInstanceByNativeTag:findInstanceByNativeTag,getOwnerHierarchy:getOwnerHierarchy};
}, "InspectorUtils");
__d(137 /* ElementBox */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/ElementBox.js';












var React=require(34 /* React */);
var View=require(81 /* View */);
var StyleSheet=require(90 /* StyleSheet */);
var BorderBox=require(138 /* BorderBox */);
var resolveBoxStyle=require(139 /* resolveBoxStyle */);

var flattenStyle=require(59 /* flattenStyle */);var 

ElementBox=function(_React$Component){babelHelpers.inherits(ElementBox,_React$Component);function ElementBox(){babelHelpers.classCallCheck(this,ElementBox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(ElementBox).apply(this,arguments));}babelHelpers.createClass(ElementBox,[{key:'render',value:function render()
{
var style=flattenStyle(this.props.style)||{};
var margin=resolveBoxStyle('margin',style);
var padding=resolveBoxStyle('padding',style);
var frameStyle=this.props.frame;
if(margin){
frameStyle={
top:frameStyle.top-margin.top,
left:frameStyle.left-margin.left,
height:frameStyle.height+margin.top+margin.bottom,
width:frameStyle.width+margin.left+margin.right};}


var contentStyle={
width:this.props.frame.width,
height:this.props.frame.height};

if(padding){
contentStyle={
width:contentStyle.width-padding.left-padding.right,
height:contentStyle.height-padding.top-padding.bottom};}


return (
React.createElement(View,{style:[styles.frame,frameStyle],pointerEvents:'none',__source:{fileName:_jsxFileName,lineNumber:47}},
React.createElement(BorderBox,{box:margin,style:styles.margin,__source:{fileName:_jsxFileName,lineNumber:48}},
React.createElement(BorderBox,{box:padding,style:styles.padding,__source:{fileName:_jsxFileName,lineNumber:49}},
React.createElement(View,{style:[styles.content,contentStyle],__source:{fileName:_jsxFileName,lineNumber:50}})))));}}]);return ElementBox;}(React.Component);







var styles=StyleSheet.create({
frame:{
position:'absolute'},

content:{
backgroundColor:'rgba(200, 230, 255, 0.8)'},

padding:{
borderColor:'rgba(77, 255, 0, 0.3)'},

margin:{
borderColor:'rgba(255, 132, 0, 0.3)'}});



module.exports=ElementBox;
}, "ElementBox");
__d(138 /* BorderBox */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/BorderBox.js';












var React=require(34 /* React */);
var View=require(81 /* View */);var 

BorderBox=function(_React$Component){babelHelpers.inherits(BorderBox,_React$Component);function BorderBox(){babelHelpers.classCallCheck(this,BorderBox);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BorderBox).apply(this,arguments));}babelHelpers.createClass(BorderBox,[{key:'render',value:function render()
{
var box=this.props.box;
if(!box){
return this.props.children;}

var style={
borderTopWidth:box.top,
borderBottomWidth:box.bottom,
borderLeftWidth:box.left,
borderRightWidth:box.right};

return (
React.createElement(View,{style:[style,this.props.style],__source:{fileName:_jsxFileName,lineNumber:30}},
this.props.children));}}]);return BorderBox;}(React.Component);





module.exports=BorderBox;
}, "BorderBox");
__d(139 /* resolveBoxStyle */, function(global, require, module, exports) {'use strict';





















function resolveBoxStyle(prefix,style){
var res={};
var subs=['top','left','bottom','right'];
var set=false;
subs.forEach(function(sub){
res[sub]=style[prefix]||0;});

if(style[prefix]){
set=true;}

if(style[prefix+'Vertical']){
res.top=res.bottom=style[prefix+'Vertical'];
set=true;}

if(style[prefix+'Horizontal']){
res.left=res.right=style[prefix+'Horizontal'];
set=true;}

subs.forEach(function(sub){
var val=style[prefix+capFirst(sub)];
if(val){
res[sub]=val;
set=true;}});


if(!set){
return;}

return res;}


function capFirst(text){
return text[0].toUpperCase()+text.slice(1);}


module.exports=resolveBoxStyle;
}, "resolveBoxStyle");
__d(140 /* InspectorPanel */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/InspectorPanel.js';












var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var View=require(81 /* View */);
var ElementProperties=require(146 /* ElementProperties */);
var PerformanceOverlay=require(155 /* PerformanceOverlay */);
var Touchable=require(142 /* Touchable */);
var TouchableHighlight=require(149 /* TouchableHighlight */);

var PropTypes=React.PropTypes;var 

InspectorPanel=function(_React$Component){babelHelpers.inherits(InspectorPanel,_React$Component);function InspectorPanel(){babelHelpers.classCallCheck(this,InspectorPanel);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(InspectorPanel).apply(this,arguments));}babelHelpers.createClass(InspectorPanel,[{key:'renderWaiting',value:function renderWaiting()
{
if(this.props.inspecting){
return (
React.createElement(Text,{style:styles.waitingText,__source:{fileName:_jsxFileName,lineNumber:29}},'Tap something to inspect it'));}




return React.createElement(Text,{style:styles.waitingText,__source:{fileName:_jsxFileName,lineNumber:34}},'Nothing is inspected');}},{key:'render',value:function render()


{
var contents;
if(this.props.inspected){
contents=
React.createElement(ElementProperties,{
style:this.props.inspected.style,
frame:this.props.inspected.frame,
source:this.props.inspected.source,
hierarchy:this.props.hierarchy,
selection:this.props.selection,
setSelection:this.props.setSelection,__source:{fileName:_jsxFileName,lineNumber:41}});}else 


if(this.props.perfing){
contents=
React.createElement(PerformanceOverlay,{__source:{fileName:_jsxFileName,lineNumber:52}});}else 

{
contents=
React.createElement(View,{style:styles.waiting,__source:{fileName:_jsxFileName,lineNumber:56}},
this.renderWaiting());}



return (
React.createElement(View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:62}},
!this.props.devtoolsIsOpen&&contents,
React.createElement(View,{style:styles.buttonRow,__source:{fileName:_jsxFileName,lineNumber:64}},
React.createElement(Button,{
title:'Inspect',
pressed:this.props.inspecting,
onClick:this.props.setInspecting,__source:{fileName:_jsxFileName,lineNumber:65}}),

React.createElement(Button,{title:'Perf',
pressed:this.props.perfing,
onClick:this.props.setPerfing,__source:{fileName:_jsxFileName,lineNumber:70}}),

React.createElement(Button,{title:'Touchables',
pressed:this.props.touchTargetting,
onClick:this.props.setTouchTargetting,__source:{fileName:_jsxFileName,lineNumber:74}}))));}}]);return InspectorPanel;}(React.Component);







InspectorPanel.propTypes={
devtoolsIsOpen:PropTypes.bool,
inspecting:PropTypes.bool,
setInspecting:PropTypes.func,
inspected:PropTypes.object,
perfing:PropTypes.bool,
setPerfing:PropTypes.func,
touchTargetting:PropTypes.bool,
setTouchTargetting:PropTypes.func};var 


Button=function(_React$Component2){babelHelpers.inherits(Button,_React$Component2);function Button(){babelHelpers.classCallCheck(this,Button);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(Button).apply(this,arguments));}babelHelpers.createClass(Button,[{key:'render',value:function render()
{var _this3=this;
return (
React.createElement(TouchableHighlight,{onPress:function onPress(){return _this3.props.onClick(!_this3.props.pressed);},style:[
styles.button,
this.props.pressed&&styles.buttonPressed],__source:{fileName:_jsxFileName,lineNumber:98}},

React.createElement(Text,{style:styles.buttonText,__source:{fileName:_jsxFileName,lineNumber:102}},this.props.title)));}}]);return Button;}(React.Component);





var styles=StyleSheet.create({
buttonRow:{
flexDirection:'row'},

button:{
backgroundColor:'rgba(0, 0, 0, 0.3)',
margin:2,
height:30,
justifyContent:'center',
alignItems:'center'},

buttonPressed:{
backgroundColor:'rgba(255, 255, 255, 0.3)'},

buttonText:{
textAlign:'center',
color:'white',
margin:5},

container:{
backgroundColor:'rgba(0, 0, 0, 0.7)'},

waiting:{
height:100},

waitingText:{
fontSize:20,
textAlign:'center',
marginVertical:20,
color:'white'}});



module.exports=InspectorPanel;
}, "InspectorPanel");
__d(141 /* Text */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Text/Text.js';












var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var Platform=require(13 /* Platform */);
var React=require(34 /* React */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var StyleSheetPropType=require(87 /* StyleSheetPropType */);
var TextStylePropTypes=require(74 /* TextStylePropTypes */);
var Touchable=require(142 /* Touchable */);

var createReactNativeComponentClass=
require(94 /* createReactNativeComponentClass */);
var merge=require(84 /* merge */);

var stylePropType=StyleSheetPropType(TextStylePropTypes);

var viewConfig={
validAttributes:merge(ReactNativeViewAttributes.UIView,{
isHighlighted:true,
numberOfLines:true,
allowFontScaling:true}),

uiViewClassName:'RCTText'};



































var Text=React.createClass({displayName:'Text',
propTypes:{





numberOfLines:React.PropTypes.number,





onLayout:React.PropTypes.func,



onPress:React.PropTypes.func,



onLongPress:React.PropTypes.func,





suppressHighlighting:React.PropTypes.bool,
style:stylePropType,



testID:React.PropTypes.string,




allowFontScaling:React.PropTypes.bool},

getDefaultProps:function getDefaultProps(){
return {
accessible:true,
allowFontScaling:true};},


getInitialState:function getInitialState(){
return merge(Touchable.Mixin.touchableGetInitialState(),{
isHighlighted:false});},


mixins:[NativeMethodsMixin],
viewConfig:viewConfig,
getChildContext:function getChildContext(){
return {isInAParentText:true};},

childContextTypes:{
isInAParentText:React.PropTypes.bool},

contextTypes:{
isInAParentText:React.PropTypes.bool},




_handlers:null,
_hasPressHandler:function _hasPressHandler(){
return !!this.props.onPress||!!this.props.onLongPress;},





touchableHandleActivePressIn:null,
touchableHandleActivePressOut:null,
touchableHandlePress:null,
touchableHandleLongPress:null,
touchableGetPressRectOffset:null,
render:function render(){var _this=this;
var newProps=this.props;
if(this.props.onStartShouldSetResponder||this._hasPressHandler()){
if(!this._handlers){
this._handlers={
onStartShouldSetResponder:function onStartShouldSetResponder(){
var shouldSetFromProps=_this.props.onStartShouldSetResponder&&
_this.props.onStartShouldSetResponder();
var setResponder=shouldSetFromProps||_this._hasPressHandler();
if(setResponder&&!_this.touchableHandleActivePressIn){


for(var key in Touchable.Mixin){
if(typeof Touchable.Mixin[key]==='function'){
_this[key]=Touchable.Mixin[key].bind(_this);}}


_this.touchableHandleActivePressIn=function(){
if(_this.props.suppressHighlighting||!_this._hasPressHandler()){
return;}

_this.setState({
isHighlighted:true});};



_this.touchableHandleActivePressOut=function(){
if(_this.props.suppressHighlighting||!_this._hasPressHandler()){
return;}

_this.setState({
isHighlighted:false});};



_this.touchableHandlePress=function(){
_this.props.onPress&&_this.props.onPress();};


_this.touchableHandleLongPress=function(){
_this.props.onLongPress&&_this.props.onLongPress();};


_this.touchableGetPressRectOffset=function(){
return PRESS_RECT_OFFSET;};}


return setResponder;},

onResponderGrant:function(e,dispatchID){
this.touchableHandleResponderGrant(e,dispatchID);
this.props.onResponderGrant&&
this.props.onResponderGrant.apply(this,arguments);}.
bind(this),
onResponderMove:function(e){
this.touchableHandleResponderMove(e);
this.props.onResponderMove&&
this.props.onResponderMove.apply(this,arguments);}.
bind(this),
onResponderRelease:function(e){
this.touchableHandleResponderRelease(e);
this.props.onResponderRelease&&
this.props.onResponderRelease.apply(this,arguments);}.
bind(this),
onResponderTerminate:function(e){
this.touchableHandleResponderTerminate(e);
this.props.onResponderTerminate&&
this.props.onResponderTerminate.apply(this,arguments);}.
bind(this),
onResponderTerminationRequest:function(){


var allowTermination=this.touchableHandleResponderTerminationRequest();
if(allowTermination&&this.props.onResponderTerminationRequest){
allowTermination=this.props.onResponderTerminationRequest.apply(this,arguments);}

return allowTermination;}.
bind(this)};}


newProps=babelHelpers.extends({},
this.props,
this._handlers,{
isHighlighted:this.state.isHighlighted});}


if(Touchable.TOUCH_TARGET_DEBUG&&newProps.onPress){
newProps=babelHelpers.extends({},
newProps,{
style:[this.props.style,{color:'magenta'}]});}


if(this.context.isInAParentText){
return React.createElement(RCTVirtualText,babelHelpers.extends({},newProps,{__source:{fileName:_jsxFileName,lineNumber:240}}));}else 
{
return React.createElement(RCTText,babelHelpers.extends({},newProps,{__source:{fileName:_jsxFileName,lineNumber:242}}));}}});











var PRESS_RECT_OFFSET={top:20,left:20,right:20,bottom:30};

var RCTText=createReactNativeComponentClass(viewConfig);
var RCTVirtualText=RCTText;

if(Platform.OS==='android'){
RCTVirtualText=createReactNativeComponentClass({
validAttributes:merge(ReactNativeViewAttributes.UIView,{
isHighlighted:true}),

uiViewClassName:'RCTVirtualText'});}



module.exports=Text;
}, "Text");
__d(142 /* Touchable */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/Touchable/Touchable.js';












var BoundingDimensions=require(143 /* BoundingDimensions */);
var Position=require(144 /* Position */);
var React=require(34 /* React */);
var TouchEventUtils=require(269 /* fbjs/lib/TouchEventUtils */);
var View=require(81 /* View */);

var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var normalizeColor=require(70 /* normalizeColor */);
var queryLayoutByID=require(145 /* queryLayoutByID */);

























































































var States=keyMirror({
NOT_RESPONDER:null,
RESPONDER_INACTIVE_PRESS_IN:null,
RESPONDER_INACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_PRESS_IN:null,
RESPONDER_ACTIVE_PRESS_OUT:null,
RESPONDER_ACTIVE_LONG_PRESS_IN:null,
RESPONDER_ACTIVE_LONG_PRESS_OUT:null,
ERROR:null});





var IsActive={
RESPONDER_ACTIVE_PRESS_OUT:true,
RESPONDER_ACTIVE_PRESS_IN:true};






var IsPressingIn={
RESPONDER_INACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_PRESS_IN:true,
RESPONDER_ACTIVE_LONG_PRESS_IN:true};


var IsLongPressingIn={
RESPONDER_ACTIVE_LONG_PRESS_IN:true};





var Signals=keyMirror({
DELAY:null,
RESPONDER_GRANT:null,
RESPONDER_RELEASE:null,
RESPONDER_TERMINATED:null,
ENTER_PRESS_RECT:null,
LEAVE_PRESS_RECT:null,
LONG_PRESS_DETECTED:null});





var Transitions={
NOT_RESPONDER:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.ERROR,
RESPONDER_TERMINATED:States.ERROR,
ENTER_PRESS_RECT:States.ERROR,
LEAVE_PRESS_RECT:States.ERROR,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_IN:{
DELAY:States.RESPONDER_ACTIVE_PRESS_IN,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_INACTIVE_PRESS_OUT:{
DELAY:States.RESPONDER_ACTIVE_PRESS_OUT,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

RESPONDER_ACTIVE_LONG_PRESS_IN:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},

RESPONDER_ACTIVE_LONG_PRESS_OUT:{
DELAY:States.ERROR,
RESPONDER_GRANT:States.ERROR,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,
LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,
LONG_PRESS_DETECTED:States.ERROR},

error:{
DELAY:States.NOT_RESPONDER,
RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,
RESPONDER_RELEASE:States.NOT_RESPONDER,
RESPONDER_TERMINATED:States.NOT_RESPONDER,
ENTER_PRESS_RECT:States.NOT_RESPONDER,
LEAVE_PRESS_RECT:States.NOT_RESPONDER,
LONG_PRESS_DETECTED:States.NOT_RESPONDER}};






var HIGHLIGHT_DELAY_MS=130;

var PRESS_EXPAND_PX=20;

var LONG_PRESS_THRESHOLD=500;

var LONG_PRESS_DELAY_MS=LONG_PRESS_THRESHOLD-HIGHLIGHT_DELAY_MS;

var LONG_PRESS_ALLOWED_MOVEMENT=10;



































































var TouchableMixin={



componentWillUnmount:function componentWillUnmount(){
this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);},









touchableGetInitialState:function touchableGetInitialState(){
return {
touchable:{touchState:undefined,responderID:null}};},







touchableHandleResponderTerminationRequest:function touchableHandleResponderTerminationRequest(){
return !this.props.rejectResponderTermination;},





touchableHandleStartShouldSetResponder:function touchableHandleStartShouldSetResponder(){
return !this.props.disabled;},





touchableLongPressCancelsPress:function touchableLongPressCancelsPress(){
return true;},







touchableHandleResponderGrant:function touchableHandleResponderGrant(e){
var dispatchID=e.currentTarget;



e.persist();

this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);
this.pressOutDelayTimeout=null;

this.state.touchable.touchState=States.NOT_RESPONDER;
this.state.touchable.responderID=dispatchID;
this._receiveSignal(Signals.RESPONDER_GRANT,e);
var delayMS=
this.touchableGetHighlightDelayMS!==undefined?
Math.max(this.touchableGetHighlightDelayMS(),0):HIGHLIGHT_DELAY_MS;
delayMS=isNaN(delayMS)?HIGHLIGHT_DELAY_MS:delayMS;
if(delayMS!==0){
this.touchableDelayTimeout=setTimeout(
this._handleDelay.bind(this,e),
delayMS);}else 

{
this._handleDelay(e);}


var longDelayMS=
this.touchableGetLongPressDelayMS!==undefined?
Math.max(this.touchableGetLongPressDelayMS(),10):LONG_PRESS_DELAY_MS;
longDelayMS=isNaN(longDelayMS)?LONG_PRESS_DELAY_MS:longDelayMS;
this.longPressDelayTimeout=setTimeout(
this._handleLongDelay.bind(this,e),
longDelayMS+delayMS);},






touchableHandleResponderRelease:function touchableHandleResponderRelease(e){
this._receiveSignal(Signals.RESPONDER_RELEASE,e);},





touchableHandleResponderTerminate:function touchableHandleResponderTerminate(e){
this._receiveSignal(Signals.RESPONDER_TERMINATED,e);},





touchableHandleResponderMove:function touchableHandleResponderMove(e){


if(this.state.touchable.touchState===States.RESPONDER_INACTIVE_PRESS_IN){
return;}



if(!this.state.touchable.positionOnActivate){
return;}


var positionOnActivate=this.state.touchable.positionOnActivate;
var dimensionsOnActivate=this.state.touchable.dimensionsOnActivate;
var pressRectOffset=this.touchableGetPressRectOffset?
this.touchableGetPressRectOffset():{
left:PRESS_EXPAND_PX,
right:PRESS_EXPAND_PX,
top:PRESS_EXPAND_PX,
bottom:PRESS_EXPAND_PX};


var pressExpandLeft=pressRectOffset.left;
var pressExpandTop=pressRectOffset.top;
var pressExpandRight=pressRectOffset.right;
var pressExpandBottom=pressRectOffset.bottom;

var hitSlop=this.touchableGetHitSlop?
this.touchableGetHitSlop():null;

if(hitSlop){
pressExpandLeft+=hitSlop.left;
pressExpandTop+=hitSlop.top;
pressExpandRight+=hitSlop.right;
pressExpandBottom+=hitSlop.bottom;}


var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;

if(this.pressInLocation){
var movedDistance=this._getDistanceBetweenPoints(pageX,pageY,this.pressInLocation.pageX,this.pressInLocation.pageY);
if(movedDistance>LONG_PRESS_ALLOWED_MOVEMENT){
this._cancelLongPressDelayTimeout();}}



var isTouchWithinActive=
pageX>positionOnActivate.left-pressExpandLeft&&
pageY>positionOnActivate.top-pressExpandTop&&
pageX<
positionOnActivate.left+
dimensionsOnActivate.width+
pressExpandRight&&
pageY<
positionOnActivate.top+
dimensionsOnActivate.height+
pressExpandBottom;
if(isTouchWithinActive){
this._receiveSignal(Signals.ENTER_PRESS_RECT,e);
var curState=this.state.touchable.touchState;
if(curState===States.RESPONDER_INACTIVE_PRESS_IN){

this._cancelLongPressDelayTimeout();}}else 

{
this._cancelLongPressDelayTimeout();
this._receiveSignal(Signals.LEAVE_PRESS_RECT,e);}},

















































































_remeasureMetricsOnActivation:function _remeasureMetricsOnActivation(){
queryLayoutByID(
this.state.touchable.responderID,
null,
this._handleQueryLayout);},



_handleQueryLayout:function _handleQueryLayout(l,t,w,h,globalX,globalY){
this.state.touchable.positionOnActivate&&
Position.release(this.state.touchable.positionOnActivate);
this.state.touchable.dimensionsOnActivate&&
BoundingDimensions.release(this.state.touchable.dimensionsOnActivate);
this.state.touchable.positionOnActivate=Position.getPooled(globalX,globalY);
this.state.touchable.dimensionsOnActivate=BoundingDimensions.getPooled(w,h);},


_handleDelay:function _handleDelay(e){
this.touchableDelayTimeout=null;
this._receiveSignal(Signals.DELAY,e);},


_handleLongDelay:function _handleLongDelay(e){
this.longPressDelayTimeout=null;
var curState=this.state.touchable.touchState;
if(curState!==States.RESPONDER_ACTIVE_PRESS_IN&&
curState!==States.RESPONDER_ACTIVE_LONG_PRESS_IN){
console.error('Attempted to transition from state `'+curState+'` to `'+
States.RESPONDER_ACTIVE_LONG_PRESS_IN+'`, which is not supported. This is '+
'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.');}else 
{
this._receiveSignal(Signals.LONG_PRESS_DETECTED,e);}},











_receiveSignal:function _receiveSignal(signal,e){
var responderID=this.state.touchable.responderID;
var curState=this.state.touchable.touchState;
var nextState=Transitions[curState]&&Transitions[curState][signal];
if(!responderID&&signal===Signals.RESPONDER_RELEASE){
return;}

if(!nextState){
throw new Error(
'Unrecognized signal `'+signal+'` or state `'+curState+
'` for Touchable responder `'+responderID+'`');}


if(nextState===States.ERROR){
throw new Error(
'Touchable cannot transition from `'+curState+'` to `'+signal+
'` for responder `'+responderID+'`');}


if(curState!==nextState){
this._performSideEffectsForTransition(curState,nextState,signal,e);
this.state.touchable.touchState=nextState;}},



_cancelLongPressDelayTimeout:function _cancelLongPressDelayTimeout(){
this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);
this.longPressDelayTimeout=null;},


_isHighlight:function _isHighlight(state){
return state===States.RESPONDER_ACTIVE_PRESS_IN||
state===States.RESPONDER_ACTIVE_LONG_PRESS_IN;},


_savePressInLocation:function _savePressInLocation(e){
var touch=TouchEventUtils.extractSingleTouch(e.nativeEvent);
var pageX=touch&&touch.pageX;
var pageY=touch&&touch.pageY;
var locationX=touch&&touch.locationX;
var locationY=touch&&touch.locationY;
this.pressInLocation={pageX:pageX,pageY:pageY,locationX:locationX,locationY:locationY};},


_getDistanceBetweenPoints:function _getDistanceBetweenPoints(aX,aY,bX,bY){
var deltaX=aX-bX;
var deltaY=aY-bY;
return Math.sqrt(deltaX*deltaX+deltaY*deltaY);},













_performSideEffectsForTransition:function _performSideEffectsForTransition(curState,nextState,signal,e){var _this=this;
var curIsHighlight=this._isHighlight(curState);
var newIsHighlight=this._isHighlight(nextState);

var isFinalSignal=
signal===Signals.RESPONDER_TERMINATED||
signal===Signals.RESPONDER_RELEASE;

if(isFinalSignal){
this._cancelLongPressDelayTimeout();}


if(!IsActive[curState]&&IsActive[nextState]){
this._remeasureMetricsOnActivation();}


if(IsPressingIn[curState]&&signal===Signals.LONG_PRESS_DETECTED){
this.touchableHandleLongPress&&this.touchableHandleLongPress(e);}


if(newIsHighlight&&!curIsHighlight){
this._savePressInLocation(e);
this.touchableHandleActivePressIn&&this.touchableHandleActivePressIn(e);}else 
if(!newIsHighlight&&curIsHighlight&&this.touchableHandleActivePressOut){
if(this.touchableGetPressOutDelayMS&&this.touchableGetPressOutDelayMS()){
this.pressOutDelayTimeout=setTimeout(function(){
_this.touchableHandleActivePressOut(e);},
this.touchableGetPressOutDelayMS());}else 
{
this.touchableHandleActivePressOut(e);}}



if(IsPressingIn[curState]&&signal===Signals.RESPONDER_RELEASE){
var hasLongPressHandler=!!this.props.onLongPress;
var pressIsLongButStillCallOnPress=
IsLongPressingIn[curState]&&(
!hasLongPressHandler||
!this.touchableLongPressCancelsPress());


var shouldInvokePress=!IsLongPressingIn[curState]||pressIsLongButStillCallOnPress;
if(shouldInvokePress&&this.touchableHandlePress){
this.touchableHandlePress(e);}}



this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);
this.touchableDelayTimeout=null;}};




var Touchable={
Mixin:TouchableMixin,
TOUCH_TARGET_DEBUG:false,



renderDebugView:function renderDebugView(_ref){var color=_ref.color;var hitSlop=_ref.hitSlop;
if(!Touchable.TOUCH_TARGET_DEBUG){
return null;}

if(!__DEV__){
throw Error('Touchable.TOUCH_TARGET_DEBUG should not be enabled in prod!');}

var debugHitSlopStyle={};
hitSlop=hitSlop||{top:0,bottom:0,left:0,right:0};
for(var key in hitSlop){
debugHitSlopStyle[key]=-hitSlop[key];}

var hexColor='#'+('00000000'+normalizeColor(color).toString(16)).substr(-8);
return (
React.createElement(View,{
pointerEvents:'none',
style:babelHelpers.extends({
position:'absolute',
borderColor:hexColor.slice(0,-2)+'55',
borderWidth:1,
borderStyle:'dashed',
backgroundColor:hexColor.slice(0,-2)+'0F'},
debugHitSlopStyle),__source:{fileName:_jsxFileName,lineNumber:745}}));}};






module.exports=Touchable;
}, "Touchable");
__d(143 /* BoundingDimensions */, function(global, require, module, exports) {'use strict';





var PooledClass=require(36 /* PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;








function BoundingDimensions(width,height){
this.width=width;
this.height=height;}


BoundingDimensions.prototype.destructor=function(){
this.width=null;
this.height=null;};






BoundingDimensions.getPooledFromElement=function(element){
return BoundingDimensions.getPooled(
element.offsetWidth,
element.offsetHeight);};



PooledClass.addPoolingTo(BoundingDimensions,twoArgumentPooler);

module.exports=BoundingDimensions;
}, "BoundingDimensions");
__d(144 /* Position */, function(global, require, module, exports) {'use strict';





var PooledClass=require(36 /* PooledClass */);

var twoArgumentPooler=PooledClass.twoArgumentPooler;









function Position(left,top){
this.left=left;
this.top=top;}


Position.prototype.destructor=function(){
this.left=null;
this.top=null;};


PooledClass.addPoolingTo(Position,twoArgumentPooler);

module.exports=Position;
}, "Position");
__d(269 /* fbjs/lib/TouchEventUtils.js */, function(global, require, module, exports) {"use strict";











var TouchEventUtils={










extractSingleTouch:function extractSingleTouch(nativeEvent){
var touches=nativeEvent.touches;
var changedTouches=nativeEvent.changedTouches;
var hasTouches=touches&&touches.length>0;
var hasChangedTouches=changedTouches&&changedTouches.length>0;

return !hasTouches&&hasChangedTouches?changedTouches[0]:hasTouches?touches[0]:nativeEvent;}};



module.exports=TouchEventUtils;
}, "fbjs/lib/TouchEventUtils.js");
__d(145 /* queryLayoutByID */, function(global, require, module, exports) {'use strict';












var UIManager=require(61 /* UIManager */);
































var queryLayoutByID=function queryLayoutByID(
tag,
onError,
onSuccess)
{
if(tag==null){
return;}


UIManager.measure(
tag,
onSuccess);};



module.exports=queryLayoutByID;
}, "queryLayoutByID");
__d(146 /* ElementProperties */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/ElementProperties.js';












var BoxInspector=require(147 /* BoxInspector */);
var PropTypes=require(51 /* ReactPropTypes */);
var React=require(34 /* React */);
var StyleInspector=require(148 /* StyleInspector */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var TouchableHighlight=require(149 /* TouchableHighlight */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);
var View=require(81 /* View */);var _require=
require(12 /* NativeModules */);var SourceCode=_require.SourceCode;var _require2=
require(153 /* fetch */);var fetch=_require2.fetch;

var flattenStyle=require(59 /* flattenStyle */);
var mapWithSeparator=require(154 /* mapWithSeparator */);

var ElementProperties=React.createClass({displayName:'ElementProperties',
propTypes:{
hierarchy:PropTypes.array.isRequired,
style:PropTypes.oneOfType([
PropTypes.object,
PropTypes.array,
PropTypes.number]),

source:PropTypes.shape({
fileName:PropTypes.string,
lineNumber:PropTypes.number})},



render:function render(){var _this=this;
var style=flattenStyle(this.props.style);
var selection=this.props.selection;
var openFileButton;
var source=this.props.source;var _ref=
source||{};var fileName=_ref.fileName;var lineNumber=_ref.lineNumber;
if(fileName&&lineNumber){
var parts=fileName.split('/');
var fileNameShort=parts[parts.length-1];
openFileButton=
React.createElement(TouchableHighlight,{
style:styles.openButton,
onPress:this._openFile.bind(null,fileName,lineNumber),__source:{fileName:_jsxFileName,lineNumber:53}},
React.createElement(Text,{style:styles.openButtonTitle,numberOfLines:1,__source:{fileName:_jsxFileName,lineNumber:56}},
fileNameShort,':',lineNumber));}






return (
React.createElement(TouchableWithoutFeedback,{__source:{fileName:_jsxFileName,lineNumber:65}},
React.createElement(View,{style:styles.info,__source:{fileName:_jsxFileName,lineNumber:66}},
React.createElement(View,{style:styles.breadcrumb,__source:{fileName:_jsxFileName,lineNumber:67}},
mapWithSeparator(
this.props.hierarchy,
function(item,i){return (
React.createElement(TouchableHighlight,{
key:'item-'+i,
style:[styles.breadItem,i===selection&&styles.selected],
onPress:function onPress(){return _this.props.setSelection(i);},__source:{fileName:_jsxFileName,lineNumber:71}},
React.createElement(Text,{style:styles.breadItemText,__source:{fileName:_jsxFileName,lineNumber:75}},
item.getName?item.getName():'Unknown')));},



function(i){return (
React.createElement(Text,{key:'sep-'+i,style:styles.breadSep,__source:{fileName:_jsxFileName,lineNumber:81}},'▸'));})),





React.createElement(View,{style:styles.row,__source:{fileName:_jsxFileName,lineNumber:87}},
React.createElement(View,{style:styles.col,__source:{fileName:_jsxFileName,lineNumber:88}},
React.createElement(StyleInspector,{style:style,__source:{fileName:_jsxFileName,lineNumber:89}}),
openFileButton),

React.createElement(BoxInspector,{style:style,frame:this.props.frame,__source:{fileName:_jsxFileName,lineNumber:92}})))));},






_openFile:function _openFile(fileName,lineNumber){
var match=SourceCode.scriptURL&&SourceCode.scriptURL.match(/^https?:\/\/.*?\//);
var baseURL=match?match[0]:'http://localhost:8081/';

fetch(baseURL+'open-stack-frame',{
method:'POST',
body:JSON.stringify({file:fileName,lineNumber:lineNumber})});}});




var styles=StyleSheet.create({
breadSep:{
fontSize:8,
color:'white'},

breadcrumb:{
flexDirection:'row',
flexWrap:'wrap',
marginBottom:5},

selected:{
borderColor:'white',
borderRadius:5},

breadItem:{
borderWidth:1,
borderColor:'transparent',
marginHorizontal:2},

breadItemText:{
fontSize:10,
color:'white',
marginHorizontal:5},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between'},

col:{
flex:1},

info:{
padding:10},

path:{
color:'white',
fontSize:9},

openButton:{
padding:10,
backgroundColor:'#000',
marginVertical:5,
marginRight:5,
borderRadius:2},

openButtonTitle:{
color:'white',
fontSize:8}});



module.exports=ElementProperties;
}, "ElementProperties");
__d(147 /* BoxInspector */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/BoxInspector.js';












var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var View=require(81 /* View */);
var resolveBoxStyle=require(139 /* resolveBoxStyle */);

var blank={
top:0,
left:0,
right:0,
bottom:0};var 


BoxInspector=function(_React$Component){babelHelpers.inherits(BoxInspector,_React$Component);function BoxInspector(){babelHelpers.classCallCheck(this,BoxInspector);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BoxInspector).apply(this,arguments));}babelHelpers.createClass(BoxInspector,[{key:'render',value:function render()
{
var frame=this.props.frame;
var style=this.props.style;
var margin=style&&resolveBoxStyle('margin',style)||blank;
var padding=style&&resolveBoxStyle('padding',style)||blank;
return (
React.createElement(BoxContainer,{title:'margin',titleStyle:styles.marginLabel,box:margin,__source:{fileName:_jsxFileName,lineNumber:34}},
React.createElement(BoxContainer,{title:'padding',box:padding,__source:{fileName:_jsxFileName,lineNumber:35}},
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:36}},
React.createElement(Text,{style:styles.innerText,__source:{fileName:_jsxFileName,lineNumber:37}},'(',
frame.left,', ',frame.top,')'),

React.createElement(Text,{style:styles.innerText,__source:{fileName:_jsxFileName,lineNumber:40}},
frame.width,' × ',frame.height)))));}}]);return BoxInspector;}(React.Component);var 








BoxContainer=function(_React$Component2){babelHelpers.inherits(BoxContainer,_React$Component2);function BoxContainer(){babelHelpers.classCallCheck(this,BoxContainer);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(BoxContainer).apply(this,arguments));}babelHelpers.createClass(BoxContainer,[{key:'render',value:function render()
{
var box=this.props.box;
return (
React.createElement(View,{style:styles.box,__source:{fileName:_jsxFileName,lineNumber:54}},
React.createElement(View,{style:styles.row,__source:{fileName:_jsxFileName,lineNumber:55}},
React.createElement(Text,{style:[this.props.titleStyle,styles.label],__source:{fileName:_jsxFileName,lineNumber:56}},this.props.title),
React.createElement(Text,{style:styles.boxText,__source:{fileName:_jsxFileName,lineNumber:57}},box.top)),

React.createElement(View,{style:styles.row,__source:{fileName:_jsxFileName,lineNumber:59}},
React.createElement(Text,{style:styles.boxText,__source:{fileName:_jsxFileName,lineNumber:60}},box.left),
this.props.children,
React.createElement(Text,{style:styles.boxText,__source:{fileName:_jsxFileName,lineNumber:62}},box.right)),

React.createElement(Text,{style:styles.boxText,__source:{fileName:_jsxFileName,lineNumber:64}},box.bottom)));}}]);return BoxContainer;}(React.Component);





var styles=StyleSheet.create({
row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

marginLabel:{
width:60},

label:{
fontSize:10,
color:'rgb(255,100,0)',
marginLeft:5,
flex:1,
textAlign:'left',
top:-3},

buffer:{
fontSize:10,
color:'yellow',
flex:1,
textAlign:'center'},

innerText:{
color:'yellow',
fontSize:12,
textAlign:'center',
width:70},

box:{
borderWidth:1,
borderColor:'grey'},

boxText:{
color:'white',
fontSize:12,
marginHorizontal:3,
marginVertical:2,
textAlign:'center'}});



module.exports=BoxInspector;
}, "BoxInspector");
__d(148 /* StyleInspector */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/StyleInspector.js';












var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var View=require(81 /* View */);var 

StyleInspector=function(_React$Component){babelHelpers.inherits(StyleInspector,_React$Component);function StyleInspector(){babelHelpers.classCallCheck(this,StyleInspector);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(StyleInspector).apply(this,arguments));}babelHelpers.createClass(StyleInspector,[{key:'render',value:function render()
{var _this2=this;
if(!this.props.style){
return React.createElement(Text,{style:styles.noStyle,__source:{fileName:_jsxFileName,lineNumber:22}},'No style');}

var names=Object.keys(this.props.style);
return (
React.createElement(View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:26}},
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:27}},
names.map(function(name){return React.createElement(Text,{key:name,style:styles.attr,__source:{fileName:_jsxFileName,lineNumber:28}},name,':');})),


React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:31}},
names.map(function(name){
var value=typeof _this2.props.style[name]==='object'?JSON.stringify(_this2.props.style[name]):_this2.props.style[name];
return React.createElement(Text,{key:name,style:styles.value,__source:{fileName:_jsxFileName,lineNumber:34}},value);}))));}}]);return StyleInspector;}(React.Component);







var styles=StyleSheet.create({
container:{
flexDirection:'row'},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-around'},

attr:{
fontSize:10,
color:'#ccc'},

value:{
fontSize:10,
color:'white',
marginLeft:10},

noStyle:{
color:'white',
fontSize:10}});



module.exports=StyleInspector;
}, "StyleInspector");
__d(149 /* TouchableHighlight */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/Touchable/TouchableHighlight.js';














var ColorPropType=require(69 /* ColorPropType */);
var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var React=require(34 /* React */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var StyleSheet=require(90 /* StyleSheet */);
var TimerMixin=require(300 /* react-timer-mixin */);
var Touchable=require(142 /* Touchable */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);
var View=require(81 /* View */);

var ensureComponentIsNative=require(152 /* ensureComponentIsNative */);
var ensurePositiveDelayProps=require(151 /* ensurePositiveDelayProps */);
var keyOf=require(263 /* fbjs/lib/keyOf */);
var merge=require(84 /* merge */);
var onlyChild=require(53 /* onlyChild */);



var DEFAULT_PROPS={
activeOpacity:0.8,
underlayColor:'black'};


var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};




























var TouchableHighlight=React.createClass({displayName:'TouchableHighlight',
propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number,




underlayColor:ColorPropType,
style:View.propTypes.style,



onShowUnderlay:React.PropTypes.func,



onHideUnderlay:React.PropTypes.func}),


mixins:[NativeMethodsMixin,TimerMixin,Touchable.Mixin],

getDefaultProps:function getDefaultProps(){return DEFAULT_PROPS;},


_computeSyntheticState:function _computeSyntheticState(props){
return {
activeProps:{
style:{
opacity:props.activeOpacity}},


activeUnderlayProps:{
style:{
backgroundColor:props.underlayColor}},


underlayStyle:[
INACTIVE_UNDERLAY_PROPS.style,
props.style]};},




getInitialState:function getInitialState(){
return merge(
this.touchableGetInitialState(),this._computeSyntheticState(this.props));},



componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentDidUpdate:function componentDidUpdate(){
ensureComponentIsNative(this.refs[CHILD_REF]);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
if(nextProps.activeOpacity!==this.props.activeOpacity||
nextProps.underlayColor!==this.props.underlayColor||
nextProps.style!==this.props.style){
this.setState(this._computeSyntheticState(nextProps));}},



viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},






touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._showUnderlay();
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._hideUnderlay();}

this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._showUnderlay();
this._hideTimeout=this.setTimeout(this._hideUnderlay,
this.props.delayPressOut||100);
this.props.onPress&&this.props.onPress(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;},


_showUnderlay:function _showUnderlay(){
if(!this.isMounted()||!this._hasPressHandler()){
return;}


this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
this.props.onShowUnderlay&&this.props.onShowUnderlay();},


_hideUnderlay:function _hideUnderlay(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
if(this._hasPressHandler()&&this.refs[UNDERLAY_REF]){
this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
this.refs[UNDERLAY_REF].setNativeProps(babelHelpers.extends({},
INACTIVE_UNDERLAY_PROPS,{
style:this.state.underlayStyle}));

this.props.onHideUnderlay&&this.props.onHideUnderlay();}},



_hasPressHandler:function _hasPressHandler(){
return !!(
this.props.onPress||
this.props.onPressIn||
this.props.onPressOut||
this.props.onLongPress);},



render:function render(){
return (
React.createElement(View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
ref:UNDERLAY_REF,
style:this.state.underlayStyle,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
testID:this.props.testID,__source:{fileName:_jsxFileName,lineNumber:229}},
React.cloneElement(
onlyChild(this.props.children),
{
ref:CHILD_REF}),


Touchable.renderDebugView({color:'green',hitSlop:this.props.hitSlop})));}});





var CHILD_REF=keyOf({childRef:null});
var UNDERLAY_REF=keyOf({underlayRef:null});
var INACTIVE_CHILD_PROPS={
style:StyleSheet.create({x:{opacity:1.0}}).x};

var INACTIVE_UNDERLAY_PROPS={
style:StyleSheet.create({x:{backgroundColor:'transparent'}}).x};


module.exports=TouchableHighlight;
}, "TouchableHighlight");
__d(300 /* react-timer-mixin/TimerMixin.js */, function(global, require, module, exports) {'use strict';










var GLOBAL=typeof window==='undefined'?global:window;

var setter=function setter(_setter,_clearer,array){
return function(callback,delta){
var id=_setter(function(){
_clearer.call(this,id);
callback.apply(this,arguments);}.
bind(this),delta);

if(!this[array]){
this[array]=[id];}else 
{
this[array].push(id);}

return id;};};



var clearer=function clearer(_clearer,array){
return function(id){
if(this[array]){
var index=this[array].indexOf(id);
if(index!==-1){
this[array].splice(index,1);}}


_clearer(id);};};



var _timeouts='TimerMixin_timeouts';
var _clearTimeout=clearer(GLOBAL.clearTimeout,_timeouts);
var _setTimeout=setter(GLOBAL.setTimeout,_clearTimeout,_timeouts);

var _intervals='TimerMixin_intervals';
var _clearInterval=clearer(GLOBAL.clearInterval,_intervals);
var _setInterval=setter(GLOBAL.setInterval,function(){},_intervals);

var _immediates='TimerMixin_immediates';
var _clearImmediate=clearer(GLOBAL.clearImmediate,_immediates);
var _setImmediate=setter(GLOBAL.setImmediate,_clearImmediate,_immediates);

var _rafs='TimerMixin_rafs';
var _cancelAnimationFrame=clearer(GLOBAL.cancelAnimationFrame,_rafs);
var _requestAnimationFrame=setter(GLOBAL.requestAnimationFrame,_cancelAnimationFrame,_rafs);

var TimerMixin={
componentWillUnmount:function componentWillUnmount(){
this[_timeouts]&&this[_timeouts].forEach(function(id){
GLOBAL.clearTimeout(id);});

this[_timeouts]=null;
this[_intervals]&&this[_intervals].forEach(function(id){
GLOBAL.clearInterval(id);});

this[_intervals]=null;
this[_immediates]&&this[_immediates].forEach(function(id){
GLOBAL.clearImmediate(id);});

this[_immediates]=null;
this[_rafs]&&this[_rafs].forEach(function(id){
GLOBAL.cancelAnimationFrame(id);});

this[_rafs]=null;},


setTimeout:_setTimeout,
clearTimeout:_clearTimeout,

setInterval:_setInterval,
clearInterval:_clearInterval,

setImmediate:_setImmediate,
clearImmediate:_clearImmediate,

requestAnimationFrame:_requestAnimationFrame,
cancelAnimationFrame:_cancelAnimationFrame};


module.exports=TimerMixin;
}, "react-timer-mixin/TimerMixin.js");
__d(150 /* TouchableWithoutFeedback */, function(global, require, module, exports) {'use strict';













var EdgeInsetsPropType=require(82 /* EdgeInsetsPropType */);
var React=require(34 /* React */);
var TimerMixin=require(300 /* react-timer-mixin */);
var Touchable=require(142 /* Touchable */);
var View=require(81 /* View */);

var ensurePositiveDelayProps=require(151 /* ensurePositiveDelayProps */);
var onlyChild=require(53 /* onlyChild */);
var warning=require(265 /* fbjs/lib/warning */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};










var TouchableWithoutFeedback=React.createClass({displayName:'TouchableWithoutFeedback',
mixins:[TimerMixin,Touchable.Mixin],

propTypes:{
accessible:React.PropTypes.bool,
accessibilityComponentType:React.PropTypes.oneOf(View.AccessibilityComponentType),
accessibilityTraits:React.PropTypes.oneOfType([
React.PropTypes.oneOf(View.AccessibilityTraits),
React.PropTypes.arrayOf(React.PropTypes.oneOf(View.AccessibilityTraits))]),




disabled:React.PropTypes.bool,




onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,





onLayout:React.PropTypes.func,

onLongPress:React.PropTypes.func,




delayPressIn:React.PropTypes.number,



delayPressOut:React.PropTypes.number,



delayLongPress:React.PropTypes.number,







pressRetentionOffset:EdgeInsetsPropType,








hitSlop:EdgeInsetsPropType},


getInitialState:function getInitialState(){
return this.touchableGetInitialState();},


componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);},






touchableHandlePress:function touchableHandlePress(e){
this.props.onPress&&this.props.onPress(e);},


touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut||0;},


render:function render(){

var child=onlyChild(this.props.children);
var children=child.props.children;
warning(
!child.type||child.type.displayName!=='Text',
'TouchableWithoutFeedback does not work well with Text children. Wrap children in a View instead. See '+(
child._owner&&child._owner.getName&&child._owner.getName()||'<unknown>'));

if(Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='View'){
if(!Array.isArray(children)){
children=[children];}

children.push(Touchable.renderDebugView({color:'red',hitSlop:this.props.hitSlop}));}

var style=Touchable.TOUCH_TARGET_DEBUG&&child.type&&child.type.displayName==='Text'?
[child.props.style,{color:'red'}]:
child.props.style;
return React.cloneElement(child,{
accessible:this.props.accessible!==false,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:style,
children:children});}});




module.exports=TouchableWithoutFeedback;
}, "TouchableWithoutFeedback");
__d(151 /* ensurePositiveDelayProps */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);

var ensurePositiveDelayProps=function ensurePositiveDelayProps(props){
invariant(
!(props.delayPressIn<0||props.delayPressOut<0||
props.delayLongPress<0),
'Touchable components cannot have negative delay properties');};



module.exports=ensurePositiveDelayProps;
}, "ensurePositiveDelayProps");
__d(152 /* ensureComponentIsNative */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);

var ensureComponentIsNative=function ensureComponentIsNative(component){
invariant(
component&&typeof component.setNativeProps==='function',
'Touchable child must either be native or forward setNativeProps to a '+
'native component');};



module.exports=ensureComponentIsNative;
}, "ensureComponentIsNative");
__d(153 /* fetch */, function(global, require, module, exports) {'use strict';
















var self={};

/**
 * Copyright (c) 2014 GitHub, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @preserve-header
 */
(function(){
'use strict';

if(self.fetch){
return;}


function normalizeName(name){
if(typeof name!=='string'){
name=String(name);}

if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)){
throw new TypeError('Invalid character in header field name');}

return name.toLowerCase();}


function normalizeValue(value){
if(typeof value!=='string'){
value=String(value);}

return value;}


function Headers(headers){
this.map={};

if(headers instanceof Headers){
headers.forEach(function(value,name){
this.append(name,value);},
this);}else 

if(headers){
Object.getOwnPropertyNames(headers).forEach(function(name){
this.append(name,headers[name]);},
this);}}



Headers.prototype.append=function(name,value){
name=normalizeName(name);
value=normalizeValue(value);
var list=this.map[name];
if(!list){
list=[];
this.map[name]=list;}

list.push(value);};


Headers.prototype['delete']=function(name){
delete this.map[normalizeName(name)];};


Headers.prototype.get=function(name){
var values=this.map[normalizeName(name)];
return values?values[0]:null;};


Headers.prototype.getAll=function(name){
return this.map[normalizeName(name)]||[];};


Headers.prototype.has=function(name){
return this.map.hasOwnProperty(normalizeName(name));};


Headers.prototype.set=function(name,value){
this.map[normalizeName(name)]=[normalizeValue(value)];};


Headers.prototype.forEach=function(callback,thisArg){
Object.getOwnPropertyNames(this.map).forEach(function(name){
this.map[name].forEach(function(value){
callback.call(thisArg,value,name,this);},
this);},
this);};


function consumed(body){
if(body.bodyUsed){
return Promise.reject(new TypeError('Already read'));}

body.bodyUsed=true;}


function fileReaderReady(reader){
return new Promise(function(resolve,reject){
reader.onload=function(){
resolve(reader.result);};

reader.onerror=function(){
reject(reader.error);};});}




function readBlobAsArrayBuffer(blob){
var reader=new FileReader();
reader.readAsArrayBuffer(blob);
return fileReaderReady(reader);}


function readBlobAsText(blob){
var reader=new FileReader();
reader.readAsText(blob);
return fileReaderReady(reader);}


var support={
blob:typeof FileReader==='function'&&typeof Blob==='function'&&function(){
try{
new Blob();
return true;}
catch(e){
return false;}}(),


formData:typeof FormData==='function',
arrayBuffer:typeof ArrayBuffer==='function'};


function Body(){
this.bodyUsed=false;

this._initBody=function(body){
this._bodyInit=body;
if(typeof body==='string'){
this._bodyText=body;}else 
if(support.blob&&Blob.prototype.isPrototypeOf(body)){
this._bodyBlob=body;}else 
if(support.formData&&FormData.prototype.isPrototypeOf(body)){
this._bodyFormData=body;}else 
if(!body){
this._bodyText='';}else 
if(support.arrayBuffer&&ArrayBuffer.prototype.isPrototypeOf(body)){}else 


{
throw new Error('unsupported BodyInit type');}


if(!this.headers.get('content-type')){
if(typeof body==='string'){
this.headers.set('content-type','text/plain;charset=UTF-8');}else 
if(this._bodyBlob&&this._bodyBlob.type){
this.headers.set('content-type',this._bodyBlob.type);}}};




if(support.blob){
this.blob=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return Promise.resolve(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as blob');}else 
{
return Promise.resolve(new Blob([this._bodyText]));}};



this.arrayBuffer=function(){
return this.blob().then(readBlobAsArrayBuffer);};


this.text=function(){
var rejected=consumed(this);
if(rejected){
return rejected;}


if(this._bodyBlob){
return readBlobAsText(this._bodyBlob);}else 
if(this._bodyFormData){
throw new Error('could not read FormData body as text');}else 
{
return Promise.resolve(this._bodyText);}};}else 


{
this.text=function(){
var rejected=consumed(this);
return rejected?rejected:Promise.resolve(this._bodyText);};}



if(support.formData){
this.formData=function(){
return this.text().then(decode);};}



this.json=function(){
return this.text().then(JSON.parse);};


return this;}



var methods=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];

function normalizeMethod(method){
var upcased=method.toUpperCase();
return methods.indexOf(upcased)>-1?upcased:method;}


function Request(input,options){
options=options||{};
var body=options.body;
if(Request.prototype.isPrototypeOf(input)){
if(input.bodyUsed){
throw new TypeError('Already read');}

this.url=input.url;
this.credentials=input.credentials;
if(!options.headers){
this.headers=new Headers(input.headers);}

this.method=input.method;
this.mode=input.mode;
if(!body){
body=input._bodyInit;
input.bodyUsed=true;}}else 

{
this.url=input;}


this.credentials=options.credentials||this.credentials||'omit';
if(options.headers||!this.headers){
this.headers=new Headers(options.headers);}

this.method=normalizeMethod(options.method||this.method||'GET');
this.mode=options.mode||this.mode||null;
this.referrer=null;

if((this.method==='GET'||this.method==='HEAD')&&body){
throw new TypeError('Body not allowed for GET or HEAD requests');}

this._initBody(body);}


Request.prototype.clone=function(){
return new Request(this);};


function decode(body){
var form=new FormData();
body.trim().split('&').forEach(function(bytes){
if(bytes){
var split=bytes.split('=');
var name=split.shift().replace(/\+/g,' ');
var value=split.join('=').replace(/\+/g,' ');
form.append(decodeURIComponent(name),decodeURIComponent(value));}});


return form;}


function headers(xhr){
var head=new Headers();
var pairs=xhr.getAllResponseHeaders().trim().split('\n');
pairs.forEach(function(header){
var split=header.trim().split(':');
var key=split.shift().trim();
var value=split.join(':').trim();
head.append(key,value);});

return head;}


Body.call(Request.prototype);

function Response(bodyInit,options){
if(!options){
options={};}


this.type='default';
this.status=options.status;
this.ok=this.status>=200&&this.status<300;
this.statusText=options.statusText;
this.headers=options.headers instanceof Headers?options.headers:new Headers(options.headers);
this.url=options.url||'';
this._initBody(bodyInit);}

Body.call(Response.prototype);

Response.prototype.clone=function(){
return new Response(this._bodyInit,{
status:this.status,
statusText:this.statusText,
headers:new Headers(this.headers),
url:this.url});};



Response.error=function(){
var response=new Response(null,{status:0,statusText:''});
response.type='error';
return response;};


var redirectStatuses=[301,302,303,307,308];

Response.redirect=function(url,status){
if(redirectStatuses.indexOf(status)===-1){
throw new RangeError('Invalid status code');}


return new Response(null,{status:status,headers:{location:url}});};


self.Headers=Headers;
self.Request=Request;
self.Response=Response;

self.fetch=function(input,init){
return new Promise(function(resolve,reject){
var request;
if(Request.prototype.isPrototypeOf(input)&&!init){
request=input;}else 
{
request=new Request(input,init);}


var xhr=new XMLHttpRequest();

function responseURL(){
if('responseURL' in xhr){
return xhr.responseURL;}



if(/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())){
return xhr.getResponseHeader('X-Request-URL');}


return;}


xhr.onload=function(){
var status=xhr.status===1223?204:xhr.status;
if(status<100||status>599){
reject(new TypeError('Network request failed'));
return;}


var options={
status:status,
statusText:xhr.statusText,
headers:headers(xhr),
url:responseURL()};

var body='response' in xhr?xhr.response:xhr.responseText;
resolve(new Response(body,options));};


xhr.onerror=function(){
reject(new TypeError('Network request failed'));};


xhr.open(request.method,request.url,true);

if(request.credentials==='include'){
xhr.withCredentials=true;}


if('responseType' in xhr&&support.blob){
xhr.responseType='blob';}


request.headers.forEach(function(value,name){
xhr.setRequestHeader(name,value);});


xhr.send(typeof request._bodyInit==='undefined'?null:request._bodyInit);});};


self.fetch.polyfill=true;})();



module.exports=self;
}, "fetch");
__d(154 /* mapWithSeparator */, function(global, require, module, exports) {'use strict';






function mapWithSeparator(array,valueFunction,separatorFunction){
var results=[];
for(var i=0;i<array.length;i++){
results.push(valueFunction(array[i],i,array));
if(i!==array.length-1){
results.push(separatorFunction(i));}}


return results;}


module.exports=mapWithSeparator;
}, "mapWithSeparator");
__d(155 /* PerformanceOverlay */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Inspector/PerformanceOverlay.js';












var PerformanceLogger=require(156 /* PerformanceLogger */);
var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var View=require(81 /* View */);

var PerformanceOverlay=React.createClass({displayName:'PerformanceOverlay',
render:function render(){
var perfLogs=PerformanceLogger.getTimespans();
var items=[];

for(var key in perfLogs){
if(perfLogs[key].totalTime){
var unit=key==='BundleSize'?'b':'ms';
items.push(
React.createElement(View,{style:styles.row,key:key,__source:{fileName:_jsxFileName,lineNumber:29}},
React.createElement(Text,{style:[styles.text,styles.label],__source:{fileName:_jsxFileName,lineNumber:30}},key),
React.createElement(Text,{style:[styles.text,styles.totalTime],__source:{fileName:_jsxFileName,lineNumber:31}},
perfLogs[key].totalTime+unit)));}}






return (
React.createElement(View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:40}},
items));}});





var styles=StyleSheet.create({
container:{
height:100,
paddingTop:10},

label:{
flex:1},

row:{
flexDirection:'row',
paddingHorizontal:10},

text:{
color:'white',
fontSize:12},

totalTime:{
paddingRight:100}});



module.exports=PerformanceOverlay;
}, "PerformanceOverlay");
__d(156 /* PerformanceLogger */, function(global, require, module, exports) {'use strict';











var BatchedBridge=require(2 /* BatchedBridge */);
var fbjsPerformanceNow=require(255 /* fbjs/lib/performanceNow */);

var performanceNow=global.nativePerformanceNow||fbjsPerformanceNow;

var timespans={};
var extras={};





var PerformanceLogger={
addTimespan:function addTimespan(key,lengthInMs,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to add a timespan that already exists ',
key);}


return;}


timespans[key]={
description:description,
totalTime:lengthInMs};},



startTimespan:function startTimespan(key,description){
if(timespans[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to start a timespan that already exists ',
key);}


return;}


timespans[key]={
description:description,
startTime:performanceNow()};},



stopTimespan:function stopTimespan(key){
if(!timespans[key]||!timespans[key].startTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has not started ',
key);}


return;}

if(timespans[key].endTime){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to end a timespan that has already ended ',
key);}


return;}


timespans[key].endTime=performanceNow();
timespans[key].totalTime=
timespans[key].endTime-timespans[key].startTime;},


clear:function clear(){
timespans={};
extras={};},


clearExceptTimespans:function clearExceptTimespans(keys){
timespans=Object.keys(timespans).reduce(function(previous,key){
if(keys.indexOf(key)!==-1){
previous[key]=timespans[key];}

return previous;},
{});
extras={};},


getTimespans:function getTimespans(){
return timespans;},


hasTimespan:function hasTimespan(key){
return !!timespans[key];},


logTimespans:function logTimespans(){
for(var key in timespans){
if(timespans[key].totalTime){
console.log(key+': '+timespans[key].totalTime+'ms');}}},




addTimespans:function addTimespans(newTimespans,labels){
for(var i=0,l=newTimespans.length;i<l;i+=2){
var label=labels[i/2];
PerformanceLogger.addTimespan(
label,
newTimespans[i+1]-newTimespans[i],
label);}},




setExtra:function setExtra(key,value){
if(extras[key]){
if(__DEV__){
console.log(
'PerformanceLogger: Attempting to set an extra that already exists ',
key);}


return;}

extras[key]=value;},


getExtras:function getExtras(){
return extras;}};



BatchedBridge.registerCallableModule(
'PerformanceLogger',
PerformanceLogger);


module.exports=PerformanceLogger;
}, "PerformanceLogger");
__d(157 /* ReactNative */, function(global, require, module, exports) {'use strict';















var ReactNativeComponentTree=require(96 /* ./ReactNativeComponentTree */);
var ReactNativeDefaultInjection=require(158 /* ./ReactNativeDefaultInjection */);

var ReactElement=require(37 /* ./ReactElement */);
var ReactNativeMount=require(178 /* ./ReactNativeMount */);
var ReactUpdates=require(107 /* ./ReactUpdates */);

var findNodeHandle=require(62 /* ./findNodeHandle */);

ReactNativeDefaultInjection.inject();

var render=function render(element,mountInto,callback){
return ReactNativeMount.renderComponent(element,mountInto,callback);};


var ReactNative={
hasReactNativeInitialized:false,
findNodeHandle:findNodeHandle,
render:render,
unmountComponentAtNode:ReactNativeMount.unmountComponentAtNode,


unstable_batchedUpdates:ReactUpdates.batchedUpdates,


unmountComponentAtNodeAndRemoveContainer:ReactNativeMount.unmountComponentAtNodeAndRemoveContainer};





if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined'&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject==='function'){
__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
ComponentTree:{
getClosestInstanceFromNode:function getClosestInstanceFromNode(node){
return ReactNativeComponentTree.getClosestInstanceFromNode(node);},

getNodeFromInstance:function getNodeFromInstance(inst){

while(inst._renderedComponent){
inst=inst._renderedComponent;}

if(inst){
return ReactNativeComponentTree.getNodeFromInstance(inst);}else 
{
return null;}}},



Mount:ReactNativeMount,
Reconciler:require(110 /* ./ReactReconciler */)});}



module.exports=ReactNative;
}, "ReactNative");
__d(158 /* ReactNativeDefaultInjection */, function(global, require, module, exports) {'use strict';



















require(159 /* InitializeJavaScriptAppEngine */);

var EventPluginHub=require(99 /* ./EventPluginHub */);
var EventPluginUtils=require(101 /* ./EventPluginUtils */);
var RCTEventEmitter=require(182 /* RCTEventEmitter */);
var ReactComponentEnvironment=require(115 /* ./ReactComponentEnvironment */);
var ReactDefaultBatchingStrategy=require(183 /* ./ReactDefaultBatchingStrategy */);
var ReactElement=require(37 /* ./ReactElement */);
var ReactEmptyComponent=require(123 /* ./ReactEmptyComponent */);
var ReactNativeBridgeEventPlugin=require(184 /* ./ReactNativeBridgeEventPlugin */);
var ReactNativeComponent=require(124 /* ./ReactNativeComponent */);
var ReactNativeComponentEnvironment=require(187 /* ./ReactNativeComponentEnvironment */);
var ReactNativeComponentTree=require(96 /* ./ReactNativeComponentTree */);
var ReactNativeEventEmitter=require(97 /* ./ReactNativeEventEmitter */);
var ReactNativeEventPluginOrder=require(190 /* ./ReactNativeEventPluginOrder */);
var ReactNativeGlobalResponderHandler=require(191 /* ./ReactNativeGlobalResponderHandler */);
var ReactNativeTextComponent=require(192 /* ./ReactNativeTextComponent */);
var ReactNativeTreeTraversal=require(193 /* ./ReactNativeTreeTraversal */);
var ReactSimpleEmptyComponent=require(194 /* ./ReactSimpleEmptyComponent */);
var ReactUpdates=require(107 /* ./ReactUpdates */);
var ResponderEventPlugin=require(195 /* ./ResponderEventPlugin */);

var invariant=require(259 /* fbjs/lib/invariant */);

function inject(){



RCTEventEmitter.register(ReactNativeEventEmitter);




EventPluginHub.injection.injectEventPluginOrder(ReactNativeEventPluginOrder);
EventPluginUtils.injection.injectComponentTree(ReactNativeComponentTree);
EventPluginUtils.injection.injectTreeTraversal(ReactNativeTreeTraversal);

ResponderEventPlugin.injection.injectGlobalResponderHandler(ReactNativeGlobalResponderHandler);





EventPluginHub.injection.injectEventPluginsByName({
'ResponderEventPlugin':ResponderEventPlugin,
'ReactNativeBridgeEventPlugin':ReactNativeBridgeEventPlugin});


ReactUpdates.injection.injectReconcileTransaction(ReactNativeComponentEnvironment.ReactReconcileTransaction);

ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);

ReactComponentEnvironment.injection.injectEnvironment(ReactNativeComponentEnvironment);

var EmptyComponent=function EmptyComponent(instantiate){

var View=require(81 /* View */);
return new ReactSimpleEmptyComponent(ReactElement.createElement(View,{
collapsable:true,
style:{position:'absolute'}}),
instantiate);};


ReactEmptyComponent.injection.injectEmptyComponentFactory(EmptyComponent);

ReactNativeComponent.injection.injectTextComponentClass(ReactNativeTextComponent);
ReactNativeComponent.injection.injectGenericComponentClass(function(tag){

var info='';
if(typeof tag==='string'&&/^[a-z]/.test(tag)){
info+=' Each component name should start with an uppercase letter.';}

!false?process.env.NODE_ENV!=='production'?invariant(false,'Expected a component class, got %s.%s',tag,info):invariant(false):void 0;});}



module.exports={
inject:inject};
}, "ReactNativeDefaultInjection");
__d(159 /* InitializeJavaScriptAppEngine */, function(global, require, module, exports) {require(























430 /* regenerator-runtime/runtime */);

if(typeof GLOBAL==='undefined'){
global.GLOBAL=global;}


if(typeof window==='undefined'){
global.window=global;}


function setUpProcess(){
GLOBAL.process=GLOBAL.process||{};
GLOBAL.process.env=GLOBAL.process.env||{};
if(!GLOBAL.process.env.NODE_ENV){
GLOBAL.process.env.NODE_ENV=__DEV__?'development':'production';}}



function setUpConsole(){

var ExceptionsManager=require(160 /* ExceptionsManager */);
ExceptionsManager.installConsoleErrorReporter();

require(162 /* RCTLog */);}

















function polyfillGlobal(name,newValue){var scope=arguments.length<=2||arguments[2]===undefined?global:arguments[2];
var descriptor=Object.getOwnPropertyDescriptor(scope,name);
if(descriptor){
var backupName='original'+name[0].toUpperCase()+name.substr(1);
Object.defineProperty(scope,backupName,babelHelpers.extends({},descriptor,{value:scope[name]}));}var _ref=


descriptor||{};var enumerable=_ref.enumerable;var writable=_ref.writable;






Object.defineProperty(scope,name,{
configurable:true,
enumerable:enumerable!==false,
writable:writable!==false,
value:newValue});}



function polyfillLazyGlobal(name,valueFn){var scope=arguments.length<=2||arguments[2]===undefined?global:arguments[2];
var descriptor=getPropertyDescriptor(scope,name);
if(descriptor){
var backupName='original'+name[0].toUpperCase()+name.substr(1);
Object.defineProperty(scope,backupName,descriptor);}var _ref2=


descriptor||{};var enumerable=_ref2.enumerable;var writable=_ref2.writable;
Object.defineProperty(scope,name,{
configurable:true,
enumerable:enumerable!==false,
get:function get(){
return this[name]=valueFn();},

set:function set(value){
Object.defineProperty(this,name,{
configurable:true,
enumerable:enumerable!==false,
writable:writable!==false,
value:value});}});}








function polyfillIfNeeded(name,polyfill){var scope=arguments.length<=2||arguments[2]===undefined?global:arguments[2];var descriptor=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];
if(scope[name]===undefined){
Object.defineProperty(scope,name,babelHelpers.extends({},descriptor,{value:polyfill}));}}



function setUpErrorHandler(){
if(global.__fbDisableExceptionsManager){
return;}


function handleError(e,isFatal){
try{
require(160 /* ExceptionsManager */).handleException(e,isFatal);}
catch(ee){
console.log('Failed to print error: ',ee.message);}}



var ErrorUtils=require(9 /* ErrorUtils */);
ErrorUtils.setGlobalHandler(handleError);}









function setUpTimers(){
var defineLazyTimer=function defineLazyTimer(name){
polyfillLazyGlobal(name,function(){return require(11 /* JSTimers */)[name];});};

defineLazyTimer('setTimeout');
defineLazyTimer('setInterval');
defineLazyTimer('setImmediate');
defineLazyTimer('clearTimeout');
defineLazyTimer('clearInterval');
defineLazyTimer('clearImmediate');
defineLazyTimer('requestAnimationFrame');
defineLazyTimer('cancelAnimationFrame');}


function setUpAlert(){
if(!global.alert){
global.alert=function(text){


require(163 /* Alert */).alert('Alert',''+text);};}}




function setUpPromise(){


polyfillLazyGlobal('Promise',function(){return require(32 /* Promise */);});}


function setUpXHR(){


polyfillLazyGlobal('XMLHttpRequest',function(){return require(165 /* XMLHttpRequest */);});
polyfillLazyGlobal('FormData',function(){return require(166 /* FormData */);});

polyfillLazyGlobal('fetch',function(){return require(153 /* fetch */).fetch;});
polyfillLazyGlobal('Headers',function(){return require(153 /* fetch */).Headers;});
polyfillLazyGlobal('Request',function(){return require(153 /* fetch */).Request;});
polyfillLazyGlobal('Response',function(){return require(153 /* fetch */).Response;});

polyfillLazyGlobal('WebSocket',function(){return require(17 /* WebSocket */);});}


function setUpGeolocation(){
polyfillIfNeeded('navigator',{},global,{
writable:true,
enumerable:true,
configurable:true});

Object.defineProperty(global.navigator,'product',{value:'ReactNative'});

polyfillLazyGlobal('geolocation',function(){return require(170 /* Geolocation */);},global.navigator);}


function setUpMapAndSet(){


polyfillGlobal('Map',require(172 /* Map */));
polyfillGlobal('Set',require(176 /* Set */));}


function setUpDevTools(){
if(__DEV__){

if(!window.document&&require(13 /* Platform */).OS==='ios'){
var setupDevtools=require(177 /* setupDevtools */);
setupDevtools();}


require(180 /* RCTDebugComponentOwnership */);
require(354 /* react-transform-hmr */);}}



function getPropertyDescriptor(object,name){
while(object){
var descriptor=Object.getOwnPropertyDescriptor(object,name);
if(descriptor){
return descriptor;}

object=Object.getPrototypeOf(object);}}



setUpProcess();
setUpConsole();
setUpTimers();
setUpAlert();
setUpPromise();
setUpErrorHandler();
setUpXHR();
setUpGeolocation();
setUpMapAndSet();
setUpDevTools();



require(23 /* RCTDeviceEventEmitter */);
require(181 /* RCTNativeAppEventEmitter */);
require(156 /* PerformanceLogger */);
}, "InitializeJavaScriptAppEngine");
__d(430 /* regenerator-runtime/runtime.js */, function(global, require, module, exports) {!









function(global){
"use strict";

var hasOwn=Object.prototype.hasOwnProperty;
var undefined;
var $Symbol=typeof Symbol==="function"?Symbol:{};
var iteratorSymbol=$Symbol.iterator||"@@iterator";
var toStringTagSymbol=$Symbol.toStringTag||"@@toStringTag";

var inModule=typeof module==="object";
var runtime=global.regeneratorRuntime;
if(runtime){
if(inModule){


module.exports=runtime;}



return;}




runtime=global.regeneratorRuntime=inModule?module.exports:{};

function wrap(innerFn,outerFn,self,tryLocsList){

var generator=Object.create((outerFn||Generator).prototype);
var context=new Context(tryLocsList||[]);



generator._invoke=makeInvokeMethod(innerFn,self,context);

return generator;}

runtime.wrap=wrap;











function tryCatch(fn,obj,arg){
try{
return {type:"normal",arg:fn.call(obj,arg)};}
catch(err){
return {type:"throw",arg:err};}}



var GenStateSuspendedStart="suspendedStart";
var GenStateSuspendedYield="suspendedYield";
var GenStateExecuting="executing";
var GenStateCompleted="completed";



var ContinueSentinel={};





function Generator(){}
function GeneratorFunction(){}
function GeneratorFunctionPrototype(){}

var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;
GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;
GeneratorFunctionPrototype.constructor=GeneratorFunction;
GeneratorFunctionPrototype[toStringTagSymbol]=GeneratorFunction.displayName="GeneratorFunction";



function defineIteratorMethods(prototype){
["next","throw","return"].forEach(function(method){
prototype[method]=function(arg){
return this._invoke(method,arg);};});}




runtime.isGeneratorFunction=function(genFun){
var ctor=typeof genFun==="function"&&genFun.constructor;
return ctor?
ctor===GeneratorFunction||


(ctor.displayName||ctor.name)==="GeneratorFunction":
false;};


runtime.mark=function(genFun){
if(Object.setPrototypeOf){
Object.setPrototypeOf(genFun,GeneratorFunctionPrototype);}else 
{
genFun.__proto__=GeneratorFunctionPrototype;
if(!(toStringTagSymbol in genFun)){
genFun[toStringTagSymbol]="GeneratorFunction";}}


genFun.prototype=Object.create(Gp);
return genFun;};







runtime.awrap=function(arg){
return new AwaitArgument(arg);};


function AwaitArgument(arg){
this.arg=arg;}


function AsyncIterator(generator){
function invoke(method,arg,resolve,reject){
var record=tryCatch(generator[method],generator,arg);
if(record.type==="throw"){
reject(record.arg);}else 
{
var result=record.arg;
var value=result.value;
if(value instanceof AwaitArgument){
return Promise.resolve(value.arg).then(function(value){
invoke("next",value,resolve,reject);},
function(err){
invoke("throw",err,resolve,reject);});}



return Promise.resolve(value).then(function(unwrapped){















result.value=unwrapped;
resolve(result);},
reject);}}



if(typeof process==="object"&&process.domain){
invoke=process.domain.bind(invoke);}


var previousPromise;

function enqueue(method,arg){
function callInvokeWithMethodAndArg(){
return new Promise(function(resolve,reject){
invoke(method,arg,resolve,reject);});}



return previousPromise=












previousPromise?previousPromise.then(
callInvokeWithMethodAndArg,


callInvokeWithMethodAndArg):
callInvokeWithMethodAndArg();}




this._invoke=enqueue;}


defineIteratorMethods(AsyncIterator.prototype);




runtime.async=function(innerFn,outerFn,self,tryLocsList){
var iter=new AsyncIterator(
wrap(innerFn,outerFn,self,tryLocsList));


return runtime.isGeneratorFunction(outerFn)?
iter:
iter.next().then(function(result){
return result.done?result.value:iter.next();});};



function makeInvokeMethod(innerFn,self,context){
var state=GenStateSuspendedStart;

return function invoke(method,arg){
if(state===GenStateExecuting){
throw new Error("Generator is already running");}


if(state===GenStateCompleted){
if(method==="throw"){
throw arg;}




return doneResult();}


while(true){
var delegate=context.delegate;
if(delegate){
if(method==="return"||
method==="throw"&&delegate.iterator[method]===undefined){


context.delegate=null;



var returnMethod=delegate.iterator["return"];
if(returnMethod){
var record=tryCatch(returnMethod,delegate.iterator,arg);
if(record.type==="throw"){


method="throw";
arg=record.arg;
continue;}}



if(method==="return"){


continue;}}



var record=tryCatch(
delegate.iterator[method],
delegate.iterator,
arg);


if(record.type==="throw"){
context.delegate=null;



method="throw";
arg=record.arg;
continue;}





method="next";
arg=undefined;

var info=record.arg;
if(info.done){
context[delegate.resultName]=info.value;
context.next=delegate.nextLoc;}else 
{
state=GenStateSuspendedYield;
return info;}


context.delegate=null;}


if(method==="next"){


context.sent=context._sent=arg;}else 

if(method==="throw"){
if(state===GenStateSuspendedStart){
state=GenStateCompleted;
throw arg;}


if(context.dispatchException(arg)){


method="next";
arg=undefined;}}else 


if(method==="return"){
context.abrupt("return",arg);}


state=GenStateExecuting;

var record=tryCatch(innerFn,self,context);
if(record.type==="normal"){


state=context.done?
GenStateCompleted:
GenStateSuspendedYield;

var info={
value:record.arg,
done:context.done};


if(record.arg===ContinueSentinel){
if(context.delegate&&method==="next"){


arg=undefined;}}else 

{
return info;}}else 


if(record.type==="throw"){
state=GenStateCompleted;


method="throw";
arg=record.arg;}}};}







defineIteratorMethods(Gp);

Gp[iteratorSymbol]=function(){
return this;};


Gp[toStringTagSymbol]="Generator";

Gp.toString=function(){
return "[object Generator]";};


function pushTryEntry(locs){
var entry={tryLoc:locs[0]};

if(1 in locs){
entry.catchLoc=locs[1];}


if(2 in locs){
entry.finallyLoc=locs[2];
entry.afterLoc=locs[3];}


this.tryEntries.push(entry);}


function resetTryEntry(entry){
var record=entry.completion||{};
record.type="normal";
delete record.arg;
entry.completion=record;}


function Context(tryLocsList){



this.tryEntries=[{tryLoc:"root"}];
tryLocsList.forEach(pushTryEntry,this);
this.reset(true);}


runtime.keys=function(object){
var keys=[];
for(var key in object){
keys.push(key);}

keys.reverse();



return function next(){
while(keys.length){
var key=keys.pop();
if(key in object){
next.value=key;
next.done=false;
return next;}}






next.done=true;
return next;};};



function values(iterable){
if(iterable){
var iteratorMethod=iterable[iteratorSymbol];
if(iteratorMethod){
return iteratorMethod.call(iterable);}


if(typeof iterable.next==="function"){
return iterable;}


if(!isNaN(iterable.length)){
var i=-1,next=function next(){
while(++i<iterable.length){
if(hasOwn.call(iterable,i)){
next.value=iterable[i];
next.done=false;
return next;}}



next.value=undefined;
next.done=true;

return next;};


return next.next=next;}}




return {next:doneResult};}

runtime.values=values;

function doneResult(){
return {value:undefined,done:true};}


Context.prototype={
constructor:Context,

reset:function reset(skipTempReset){
this.prev=0;
this.next=0;


this.sent=this._sent=undefined;
this.done=false;
this.delegate=null;

this.tryEntries.forEach(resetTryEntry);

if(!skipTempReset){
for(var name in this){

if(name.charAt(0)==="t"&&
hasOwn.call(this,name)&&
!isNaN(+name.slice(1))){
this[name]=undefined;}}}},





stop:function stop(){
this.done=true;

var rootEntry=this.tryEntries[0];
var rootRecord=rootEntry.completion;
if(rootRecord.type==="throw"){
throw rootRecord.arg;}


return this.rval;},


dispatchException:function dispatchException(exception){
if(this.done){
throw exception;}


var context=this;
function handle(loc,caught){
record.type="throw";
record.arg=exception;
context.next=loc;
return !!caught;}


for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
var record=entry.completion;

if(entry.tryLoc==="root"){



return handle("end");}


if(entry.tryLoc<=this.prev){
var hasCatch=hasOwn.call(entry,"catchLoc");
var hasFinally=hasOwn.call(entry,"finallyLoc");

if(hasCatch&&hasFinally){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}else 
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


if(hasCatch){
if(this.prev<entry.catchLoc){
return handle(entry.catchLoc,true);}}else 


if(hasFinally){
if(this.prev<entry.finallyLoc){
return handle(entry.finallyLoc);}}else 


{
throw new Error("try statement without catch or finally");}}}},





abrupt:function abrupt(type,arg){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc<=this.prev&&
hasOwn.call(entry,"finallyLoc")&&
this.prev<entry.finallyLoc){
var finallyEntry=entry;
break;}}



if(finallyEntry&&(
type==="break"||
type==="continue")&&
finallyEntry.tryLoc<=arg&&
arg<=finallyEntry.finallyLoc){


finallyEntry=null;}


var record=finallyEntry?finallyEntry.completion:{};
record.type=type;
record.arg=arg;

if(finallyEntry){
this.next=finallyEntry.finallyLoc;}else 
{
this.complete(record);}


return ContinueSentinel;},


complete:function complete(record,afterLoc){
if(record.type==="throw"){
throw record.arg;}


if(record.type==="break"||
record.type==="continue"){
this.next=record.arg;}else 
if(record.type==="return"){
this.rval=record.arg;
this.next="end";}else 
if(record.type==="normal"&&afterLoc){
this.next=afterLoc;}},



finish:function finish(finallyLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.finallyLoc===finallyLoc){
this.complete(entry.completion,entry.afterLoc);
resetTryEntry(entry);
return ContinueSentinel;}}},




"catch":function _catch(tryLoc){
for(var i=this.tryEntries.length-1;i>=0;--i){
var entry=this.tryEntries[i];
if(entry.tryLoc===tryLoc){
var record=entry.completion;
if(record.type==="throw"){
var thrown=record.arg;
resetTryEntry(entry);}

return thrown;}}





throw new Error("illegal catch attempt");},


delegateYield:function delegateYield(iterable,resultName,nextLoc){
this.delegate={
iterator:values(iterable),
resultName:resultName,
nextLoc:nextLoc};


return ContinueSentinel;}};}(






typeof global==="object"?global:
typeof window==="object"?window:
typeof self==="object"?self:this);
}, "regenerator-runtime/runtime.js");
__d(160 /* ExceptionsManager */, function(global, require, module, exports) {'use strict';












var exceptionID=0;




function reportException(e,isFatal){
var parseErrorStack=require(161 /* parseErrorStack */);
var RCTExceptionsManager=require(12 /* NativeModules */).ExceptionsManager;

var currentExceptionID=++exceptionID;
if(RCTExceptionsManager){
var stack=parseErrorStack(e);
if(isFatal){
RCTExceptionsManager.reportFatalException(e.message,stack,currentExceptionID);}else 
{
RCTExceptionsManager.reportSoftException(e.message,stack,currentExceptionID);}

if(__DEV__){
require(29 /* SourceMapsCache */).getSourceMaps().then(function(sourceMaps){
var prettyStack=parseErrorStack(e,sourceMaps);
RCTExceptionsManager.updateExceptionMessage(
e.message,
prettyStack,
currentExceptionID);}).


catch(function(error){


console.warn('Unable to load source map: '+error.message);});}}}








function handleException(e,isFatal){




if(!e.message){
e=new Error(e);}


(console._errorOriginal||console.error)(e.message);
reportException(e,isFatal);}






function installConsoleErrorReporter(){

if(console._errorOriginal){
return;}

console._errorOriginal=console.error.bind(console);
console.error=function reactConsoleError(){
console._errorOriginal.apply(null,arguments);
if(!console.reportErrorsAsExceptions){
return;}


if(arguments[0]&&arguments[0].stack){
reportException(arguments[0],false);}else 
{
var stringifySafe=require(14 /* stringifySafe */);
var str=Array.prototype.map.call(arguments,stringifySafe).join(', ');
if(str.slice(0,10)==='"Warning: '){



return;}

var error=new Error('console.error: '+str);
error.framesToPop=1;
reportException(error,false);}};


if(console.reportErrorsAsExceptions===undefined){
console.reportErrorsAsExceptions=true;}}



module.exports={handleException:handleException,installConsoleErrorReporter:installConsoleErrorReporter};
}, "ExceptionsManager");
__d(161 /* parseErrorStack */, function(global, require, module, exports) {'use strict';











var stacktraceParser=require(266 /* stacktrace-parser */);

function resolveSourceMaps(sourceMapInstance,stackFrame){
try{
var orig=sourceMapInstance.originalPositionFor({
line:stackFrame.lineNumber,
column:stackFrame.column});

if(orig){

var queryStringStartIndex=orig.source.indexOf('?');
stackFrame.file=queryStringStartIndex===-1?
orig.source:
orig.source.substring(0,queryStringStartIndex);
stackFrame.lineNumber=orig.line;
stackFrame.column=orig.column;}}

catch(innerEx){}}



function parseErrorStack(e,sourceMaps){
if(!e||!e.stack){
return [];}


var stack=Array.isArray(e.stack)?e.stack:stacktraceParser.parse(e.stack);

var framesToPop=e.framesToPop||0;
while(framesToPop--){
stack.shift();}


if(sourceMaps){
sourceMaps.forEach(function(sourceMap,index){
stack.forEach(function(frame){
if(frame.file.indexOf(sourceMap.file)!==-1||
frame.file.replace('.map','.bundle').indexOf(
sourceMap.file)!==
-1){
resolveSourceMaps(sourceMap,frame);}});});}





return stack;}


module.exports=parseErrorStack;
}, "parseErrorStack");
__d(266 /* stacktrace-parser/index.js */, function(global, require, module, exports) {module.exports=require(278 /* ./lib/stacktrace-parser.js */);
}, "stacktrace-parser/index.js");
__d(278 /* stacktrace-parser/lib/stacktrace-parser.js */, function(global, require, module, exports) {var 

UNKNOWN_FUNCTION='<unknown>';

var StackTraceParser={




parse:function parse(stackString){
var chrome=/^\s*at (?:(?:(?:Anonymous function)?|((?:\[object object\])?\S+(?: \[as \S+\])?)) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
gecko=/^(?:\s*(\S*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i,
node=/^\s*at (?:((?:\[object object\])?\S+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i,
lines=stackString.split('\n'),
stack=[],
parts,
element;

for(var i=0,j=lines.length;i<j;++i){
if(parts=gecko.exec(lines[i])){
element={
'file':parts[3],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[4],
'column':parts[5]?+parts[5]:null};}else 

if(parts=chrome.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

if(parts=node.exec(lines[i])){
element={
'file':parts[2],
'methodName':parts[1]||UNKNOWN_FUNCTION,
'lineNumber':+parts[3],
'column':parts[4]?+parts[4]:null};}else 

{
continue;}


stack.push(element);}


return stack;}};




module.exports=StackTraceParser;
}, "stacktrace-parser/lib/stacktrace-parser.js");
__d(162 /* RCTLog */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);

var invariant=require(259 /* fbjs/lib/invariant */);

var levelsMap={
log:'log',
info:'info',
warn:'warn',
error:'error',
fatal:'error'};var 


RCTLog=function(){function RCTLog(){babelHelpers.classCallCheck(this,RCTLog);}babelHelpers.createClass(RCTLog,null,[{key:'logIfNoNativeHook',value:function logIfNoNativeHook()

{
var args=Array.prototype.slice.call(arguments);
var level=args.shift();
var logFn=levelsMap[level];
invariant(
logFn,
'Level "'+level+'" not one of '+Object.keys(levelsMap));

if(typeof global.nativeLoggingHook==='undefined'){

console[logFn].apply(console,args);}

return true;}}]);return RCTLog;}();



BatchedBridge.registerCallableModule(
'RCTLog',
RCTLog);


module.exports=RCTLog;
}, "RCTLog");
__d(163 /* Alert */, function(global, require, module, exports) {'use strict';












var AlertIOS=require(164 /* AlertIOS */);
var Platform=require(13 /* Platform */);
var DialogModuleAndroid=require(12 /* NativeModules */).DialogManagerAndroid;var 















































Alert=function(){function Alert(){babelHelpers.classCallCheck(this,Alert);}babelHelpers.createClass(Alert,null,[{key:'alert',value:function alert(


title,
message,
buttons,
type)
{
if(Platform.OS==='ios'){
if(typeof type!=='undefined'){
console.warn('Alert.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
AlertIOS.alert(title,message,buttons,type);
return;}

AlertIOS.alert(title,message,buttons);}else 
if(Platform.OS==='android'){
AlertAndroid.alert(title,message,buttons);}}}]);return Alert;}();var 







AlertAndroid=function(){function AlertAndroid(){babelHelpers.classCallCheck(this,AlertAndroid);}babelHelpers.createClass(AlertAndroid,null,[{key:'alert',value:function alert(


title,
message,
buttons)
{
var config={
title:title||'',
message:message||''};



var validButtons=buttons?buttons.slice(0,3):[{text:'OK'}];
var buttonPositive=validButtons.pop();
var buttonNegative=validButtons.pop();
var buttonNeutral=validButtons.pop();
if(buttonNeutral){
config=babelHelpers.extends({},config,{buttonNeutral:buttonNeutral.text||''});}

if(buttonNegative){
config=babelHelpers.extends({},config,{buttonNegative:buttonNegative.text||''});}

if(buttonPositive){
config=babelHelpers.extends({},config,{buttonPositive:buttonPositive.text||''});}

DialogModuleAndroid.showAlert(
config,
function(errorMessage){return console.warn(message);},
function(action,buttonKey){
if(action!==DialogModuleAndroid.buttonClicked){
return;}

if(buttonKey===DialogModuleAndroid.buttonNeutral){
buttonNeutral.onPress&&buttonNeutral.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonNegative){
buttonNegative.onPress&&buttonNegative.onPress();}else 
if(buttonKey===DialogModuleAndroid.buttonPositive){
buttonPositive.onPress&&buttonPositive.onPress();}});}}]);return AlertAndroid;}();






module.exports=Alert;
}, "Alert");
__d(164 /* AlertIOS */, function(global, require, module, exports) {'use strict';












var RCTAlertManager=require(12 /* NativeModules */).AlertManager;var 






























AlertIOS=function(){function AlertIOS(){babelHelpers.classCallCheck(this,AlertIOS);}babelHelpers.createClass(AlertIOS,null,[{key:'alert',value:function alert(

























title,
message,
callbackOrButtons,
type)
{
if(typeof type!=='undefined'){
console.warn('AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.');
this.prompt(title,message,callbackOrButtons,type);
return;}

this.prompt(title,message,callbackOrButtons,'default');}},{key:'prompt',value:function prompt(











































title,
message,
callbackOrButtons)


{var type=arguments.length<=3||arguments[3]===undefined?'plain-text':arguments[3];var defaultValue=arguments[4];
if(typeof type==='function'){
console.warn(
'You passed a callback function as the "type" argument to AlertIOS.prompt(). React Native is '+
'assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) '+
'signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue) '+
'and the old syntax will be removed in a future version.');

var callback=type;
var defaultValue=message;
RCTAlertManager.alertWithArgs({
title:title||undefined,
type:'plain-text',
defaultValue:defaultValue},
function(id,value){
callback(value);});

return;}


var callbacks=[];
var buttons=[];
var cancelButtonKey;
var destructiveButtonKey;
if(typeof callbackOrButtons==='function'){
callbacks=[callbackOrButtons];}else 

if(callbackOrButtons instanceof Array){
callbackOrButtons.forEach(function(btn,index){
callbacks[index]=btn.onPress;
if(btn.style==='cancel'){
cancelButtonKey=String(index);}else 
if(btn.style==='destructive'){
destructiveButtonKey=String(index);}

if(btn.text||index<(callbackOrButtons||[]).length-1){
var btnDef={};
btnDef[index]=btn.text||'';
buttons.push(btnDef);}});}




RCTAlertManager.alertWithArgs({
title:title||undefined,
message:message||undefined,
buttons:buttons,
type:type||undefined,
defaultValue:defaultValue,
cancelButtonKey:cancelButtonKey,
destructiveButtonKey:destructiveButtonKey},
function(id,value){
var cb=callbacks[id];
cb&&cb(value);});}}]);return AlertIOS;}();




module.exports=AlertIOS;
}, "AlertIOS");
__d(165 /* XMLHttpRequest */, function(global, require, module, exports) {'use strict';












var FormData=require(166 /* FormData */);
var RCTNetworking=require(167 /* RCTNetworking */);
var XMLHttpRequestBase=require(168 /* XMLHttpRequestBase */);



function convertHeadersMapToArray(headers){
var headerArray=[];
for(var name in headers){
headerArray.push([name,headers[name]]);}

return headerArray;}var 


XMLHttpRequest=function(_XMLHttpRequestBase){babelHelpers.inherits(XMLHttpRequest,_XMLHttpRequestBase);function XMLHttpRequest(){babelHelpers.classCallCheck(this,XMLHttpRequest);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(XMLHttpRequest).apply(this,arguments));}babelHelpers.createClass(XMLHttpRequest,[{key:'sendImpl',value:function sendImpl(

method,
url,
headers,
data,
useIncrementalUpdates,
timeout)
{
var body;
if(typeof data==='string'){
body={string:data};}else 
if(data instanceof FormData){
body={
formData:data.getParts().map(function(part){
part.headers=convertHeadersMapToArray(part.headers);
return part;})};}else 


{
body=data;}

var requestId=RCTNetworking.sendRequest(
method,
url,
convertHeadersMapToArray(headers),
body,
useIncrementalUpdates,
timeout);

this.didCreateRequest(requestId);}}]);return XMLHttpRequest;}(XMLHttpRequestBase);



module.exports=XMLHttpRequest;
}, "XMLHttpRequest");
__d(166 /* FormData */, function(global, require, module, exports) {'use strict';var 














































FormData=function(){


function FormData(){babelHelpers.classCallCheck(this,FormData);
this._parts=[];}babelHelpers.createClass(FormData,[{key:'append',value:function append(


key,value){





this._parts.push([key,value]);}},{key:'getParts',value:function getParts()


{
return this._parts.map(function(_ref){var _ref2=babelHelpers.slicedToArray(_ref,2);var name=_ref2[0];var value=_ref2[1];
var contentDisposition='form-data; name="'+name+'"';


var headers={'content-disposition':contentDisposition};





if(typeof value==='object'){
if(typeof value.name==='string'){
headers['content-disposition']+='; filename="'+value.name+'"';}

if(typeof value.type==='string'){
headers['content-type']=value.type;}

return babelHelpers.extends({},value,{headers:headers,fieldName:name});}


return {string:String(value),headers:headers,fieldName:name};});}}]);return FormData;}();




module.exports=FormData;
}, "FormData");
__d(167 /* RCTNetworking */, function(global, require, module, exports) {'use strict';













var RCTNetworkingNative=require(12 /* NativeModules */).Networking;

var _requestId=1;
var generateRequestId=function generateRequestId(){
return _requestId++;};var 






RCTNetworking=function(){function RCTNetworking(){babelHelpers.classCallCheck(this,RCTNetworking);}babelHelpers.createClass(RCTNetworking,null,[{key:'sendRequest',value:function sendRequest(

method,url,headers,data,useIncrementalUpdates,timeout){
var requestId=generateRequestId();
RCTNetworkingNative.sendRequest(
method,
url,
requestId,
headers,
data,
useIncrementalUpdates,
timeout);
return requestId;}},{key:'abortRequest',value:function abortRequest(


requestId){
RCTNetworkingNative.abortRequest(requestId);}},{key:'clearCookies',value:function clearCookies(


callback){
RCTNetworkingNative.clearCookies(callback);}}]);return RCTNetworking;}();



module.exports=RCTNetworking;
}, "RCTNetworking");
__d(168 /* XMLHttpRequestBase */, function(global, require, module, exports) {'use strict';












var RCTNetworking=require(167 /* RCTNetworking */);
var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);

var EventTarget=require(287 /* event-target-shim */);
var invariant=require(259 /* fbjs/lib/invariant */);
var utf8=require(169 /* utf8 */);
var warning=require(265 /* fbjs/lib/warning */);




var UNSENT=0;
var OPENED=1;
var HEADERS_RECEIVED=2;
var LOADING=3;
var DONE=4;

var SUPPORTED_RESPONSE_TYPES={
arraybuffer:typeof global.ArrayBuffer==='function',
blob:typeof global.Blob==='function',
document:false,
json:true,
text:true,
'':true};


var REQUEST_EVENTS=[
'abort',
'error',
'load',
'loadstart',
'progress',
'timeout',
'loadend'];


var XHR_EVENTS=REQUEST_EVENTS.concat('readystatechange');var 

XMLHttpRequestEventTarget=function(_EventTarget){babelHelpers.inherits(XMLHttpRequestEventTarget,_EventTarget);function XMLHttpRequestEventTarget(){babelHelpers.classCallCheck(this,XMLHttpRequestEventTarget);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(XMLHttpRequestEventTarget).apply(this,arguments));}return XMLHttpRequestEventTarget;}(EventTarget.apply(undefined,REQUEST_EVENTS));var 











XMLHttpRequestBase=function(_EventTarget2){babelHelpers.inherits(XMLHttpRequestBase,_EventTarget2);















































function XMLHttpRequestBase(){babelHelpers.classCallCheck(this,XMLHttpRequestBase);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(XMLHttpRequestBase).call(this));_this2.UNSENT=UNSENT;_this2.OPENED=OPENED;_this2.HEADERS_RECEIVED=HEADERS_RECEIVED;_this2.LOADING=LOADING;_this2.DONE=DONE;_this2.readyState=UNSENT;_this2.responseText='';_this2.status=0;_this2.timeout=0;_this2.upload=new XMLHttpRequestEventTarget();_this2._aborted=false;_this2._hasError=false;_this2._method=null;_this2._url=null;_this2._timedOut=false;_this2._incrementalEvents=false;

_this2._reset();return _this2;}babelHelpers.createClass(XMLHttpRequestBase,[{key:'_reset',value:function _reset()


{
this.readyState=this.UNSENT;
this.responseHeaders=undefined;
this.responseText='';
this.status=0;
delete this.responseURL;

this._requestId=null;

this._cachedResponse=undefined;
this._hasError=false;
this._headers={};
this._responseType='';
this._sent=false;
this._lowerCaseResponseHeaders={};

this._clearSubscriptions();
this._timedOut=false;}},{key:'didCreateRequest',value:function didCreateRequest(














































































requestId){var _this3=this;
this._requestId=requestId;
this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didSendNetworkData',
function(args){return _this3.__didUploadProgress.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didReceiveNetworkResponse',
function(args){return _this3._didReceiveResponse.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didReceiveNetworkData',
function(args){return _this3._didReceiveData.apply(_this3,babelHelpers.toConsumableArray(args));}));

this._subscriptions.push(RCTDeviceEventEmitter.addListener(
'didCompleteNetworkResponse',
function(args){return _this3.__didCompleteResponse.apply(_this3,babelHelpers.toConsumableArray(args));}));}},{key:'__didUploadProgress',value:function __didUploadProgress(




requestId,progress,total){
if(requestId===this._requestId){
this.upload.dispatchEvent({
type:'progress',
lengthComputable:true,
loaded:progress,
total:total});}}},{key:'_didReceiveResponse',value:function _didReceiveResponse(




requestId,status,responseHeaders,responseURL){
if(requestId===this._requestId){
this.status=status;
this.setResponseHeaders(responseHeaders);
this.setReadyState(this.HEADERS_RECEIVED);
if(responseURL||responseURL===''){
this.responseURL=responseURL;}else 
{
delete this.responseURL;}}}},{key:'_didReceiveData',value:function _didReceiveData(




requestId,responseText){
if(requestId===this._requestId){
if(!this.responseText){
this.responseText=responseText;}else 
{
this.responseText+=responseText;}

this._cachedResponse=undefined;
this.setReadyState(this.LOADING);}}},{key:'__didCompleteResponse',value:function __didCompleteResponse(




requestId,error,timeOutError){
if(requestId===this._requestId){
if(error){
this.responseText=error;
this._hasError=true;
if(timeOutError){
this._timedOut=true;}}


this._clearSubscriptions();
this._requestId=null;
this.setReadyState(this.DONE);}}},{key:'_clearSubscriptions',value:function _clearSubscriptions()



{
(this._subscriptions||[]).forEach(function(sub){
sub.remove();});

this._subscriptions=[];}},{key:'getAllResponseHeaders',value:function getAllResponseHeaders()


{
if(!this.responseHeaders){

return null;}

var headers=this.responseHeaders||{};
return Object.keys(headers).map(function(headerName){
return headerName+': '+headers[headerName];}).
join('\n');}},{key:'getResponseHeader',value:function getResponseHeader(


header){
var value=this._lowerCaseResponseHeaders[header.toLowerCase()];
return value!==undefined?value:null;}},{key:'setRequestHeader',value:function setRequestHeader(


header,value){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');}

this._headers[header.toLowerCase()]=value;}},{key:'open',value:function open(


method,url,async){

if(this.readyState!==this.UNSENT){
throw new Error('Cannot open, already sending');}

if(async!==undefined&&!async){

throw new Error('Synchronous http requests are not supported');}

if(!url){
throw new Error('Cannot load an empty url');}

this._reset();
this._method=method.toUpperCase();
this._url=url;
this._aborted=false;
this.setReadyState(this.OPENED);}},{key:'sendImpl',value:function sendImpl(



method,
url,
headers,
data,
incrementalEvents,
timeout)
{
throw new Error('Subclass must define sendImpl method');}},{key:'send',value:function send(


data){
if(this.readyState!==this.OPENED){
throw new Error('Request has not been opened');}

if(this._sent){
throw new Error('Request has already been sent');}

this._sent=true;
var incrementalEvents=this._incrementalEvents||!!this.onreadystatechange;
this.sendImpl(
this._method,
this._url,
this._headers,
data,
incrementalEvents,
this.timeout);}},{key:'abort',value:function abort()



{
this._aborted=true;
if(this._requestId){
RCTNetworking.abortRequest(this._requestId);}



if(!(this.readyState===this.UNSENT||
this.readyState===this.OPENED&&!this._sent||
this.readyState===this.DONE)){
this._reset();
this.setReadyState(this.DONE);}


this._reset();}},{key:'setResponseHeaders',value:function setResponseHeaders(


responseHeaders){
this.responseHeaders=responseHeaders||null;
var headers=responseHeaders||{};
this._lowerCaseResponseHeaders=
Object.keys(headers).reduce(function(lcaseHeaders,headerName){
lcaseHeaders[headerName.toLowerCase()]=headers[headerName];
return lcaseHeaders;},
{});}},{key:'setReadyState',value:function setReadyState(


newState){
this.readyState=newState;
this.dispatchEvent({type:'readystatechange'});
if(newState===this.DONE&&!this._aborted){
if(this._hasError){
if(this._timedOut){
this.dispatchEvent({type:'timeout'});}else 
{
this.dispatchEvent({type:'error'});}}else 

{
this.dispatchEvent({type:'load'});}}}},{key:'addEventListener',value:function addEventListener(





type,listener){




if(type==='readystatechange'){
this._incrementalEvents=true;}

babelHelpers.get(Object.getPrototypeOf(XMLHttpRequestBase.prototype),'addEventListener',this).call(this,type,listener);}},{key:'responseType',get:function get(){return this._responseType;},set:function set(responseType){if(this.readyState>HEADERS_RECEIVED){throw new Error("Failed to set the 'responseType' property on 'XMLHttpRequest': The "+"response type cannot be set if the object's state is LOADING or DONE");}if(!SUPPORTED_RESPONSE_TYPES.hasOwnProperty(responseType)){warning('The provided value \''+responseType+'\' is not a valid \'responseType\'.');return;}invariant(SUPPORTED_RESPONSE_TYPES[responseType]||responseType==='document','The provided value \''+responseType+'\' is unsupported in this environment.');this._responseType=responseType;}},{key:'response',get:function get(){var responseType=this.responseType;if(responseType===''||responseType==='text'){return this.readyState<LOADING||this._hasError?'':this.responseText;}if(this.readyState!==DONE){return null;}if(this._cachedResponse!==undefined){return this._cachedResponse;}switch(this.responseType){case 'document':this._cachedResponse=null;break;case 'arraybuffer':this._cachedResponse=toArrayBuffer(this.responseText,this.getResponseHeader('content-type')||'');break;case 'blob':this._cachedResponse=new global.Blob([this.responseText],{type:this.getResponseHeader('content-type')||''});break;case 'json':try{this._cachedResponse=JSON.parse(this.responseText);}catch(_){this._cachedResponse=null;}break;default:this._cachedResponse=null;}return this._cachedResponse;}}]);return XMLHttpRequestBase;}(EventTarget.apply(undefined,babelHelpers.toConsumableArray(XHR_EVENTS)));XMLHttpRequestBase.UNSENT=UNSENT;XMLHttpRequestBase.OPENED=OPENED;XMLHttpRequestBase.HEADERS_RECEIVED=HEADERS_RECEIVED;XMLHttpRequestBase.LOADING=LOADING;XMLHttpRequestBase.DONE=DONE;




function toArrayBuffer(text,contentType){var 
length=text.length;
if(length===0){
return new ArrayBuffer(0);}


var charsetMatch=contentType.match(/;\s*charset=([^;]*)/i);
var charset=charsetMatch?charsetMatch[1].trim():'utf-8';

if(/^utf-?8$/i.test(charset)){
return utf8.encode(text);}else 
{
var array=new Uint8Array(length);
for(var i=0;i<length;i++){
array[i]=text.charCodeAt(i);}

return array.buffer;}}



module.exports=XMLHttpRequestBase;
}, "XMLHttpRequestBase");
__d(169 /* utf8 */, function(global, require, module, exports) {'use strict';var 












ByteVector=function(){



function ByteVector(size){babelHelpers.classCallCheck(this,ByteVector);
this._storage=new Uint8Array(size);
this._sizeWritten=0;}babelHelpers.createClass(ByteVector,[{key:'push',value:function push(


value){
var i=this._sizeWritten;
if(i===this._storage.length){
this._realloc();}

this._storage[i]=value;
this._sizeWritten=i+1;
return this;}},{key:'getBuffer',value:function getBuffer()


{
return this._storage.buffer.slice(0,this._sizeWritten);}},{key:'_realloc',value:function _realloc()


{
var storage=this._storage;
this._storage=new Uint8Array(align(storage.length*1.5));
this._storage.set(storage);}}]);return ByteVector;}();




exports.encode=function(string){var 
length=string.length;
var bytes=new ByteVector(length);









var nextCodePoint=string.charCodeAt(0);
for(var i=0;i<length;i++){
var codePoint=nextCodePoint;
nextCodePoint=string.charCodeAt(i+1);

if(codePoint<0x80){
bytes.push(codePoint);}else 
if(codePoint<0x800){
bytes.
push(0xc0|codePoint>>>6).
push(0x80|codePoint&0x3f);}else 
if(codePoint>>>10===0x36&&nextCodePoint>>>10===0x37){
codePoint=0x10000+((codePoint&0x3ff)<<10|nextCodePoint&0x3ff);
bytes.
push(0xf0|codePoint>>>18&0x7).
push(0x80|codePoint>>>12&0x3f).
push(0x80|codePoint>>>6&0x3f).
push(0x80|codePoint&0x3f);

i+=1;
nextCodePoint=string.charCodeAt(i+1);}else 
{
bytes.
push(0xe0|codePoint>>>12).
push(0x80|codePoint>>>6&0x3f).
push(0x80|codePoint&0x3f);}}


return bytes.getBuffer();};



function align(size){
return size%8?Math.floor(size/8)+1<<3:size;}
}, "utf8");
__d(170 /* Geolocation */, function(global, require, module, exports) {'use strict';












var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);
var RCTLocationObserver=require(12 /* NativeModules */).LocationObserver;

var invariant=require(259 /* fbjs/lib/invariant */);
var logError=require(171 /* logError */);
var warning=require(265 /* fbjs/lib/warning */);

var subscriptions=[];

var updatesEnabled=false;
























var Geolocation={







getCurrentPosition:function getCurrentPosition(
geo_success,
geo_error,
geo_options)
{
invariant(
typeof geo_success==='function',
'Must provide a valid geo_success callback.');

RCTLocationObserver.getCurrentPosition(
geo_options||{},
geo_success,
geo_error||logError);},







watchPosition:function watchPosition(success,error,options){
if(!updatesEnabled){
RCTLocationObserver.startObserving(options||{});
updatesEnabled=true;}

var watchID=subscriptions.length;
subscriptions.push([
RCTDeviceEventEmitter.addListener(
'geolocationDidChange',
success),

error?RCTDeviceEventEmitter.addListener(
'geolocationError',
error):
null]);

return watchID;},


clearWatch:function clearWatch(watchID){
var sub=subscriptions[watchID];
if(!sub){


return;}


sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();
subscriptions[watchID]=undefined;
var noWatchers=true;
for(var ii=0;ii<subscriptions.length;ii++){
if(subscriptions[ii]){
noWatchers=false;}}


if(noWatchers){
Geolocation.stopObserving();}},



stopObserving:function stopObserving(){
if(updatesEnabled){
RCTLocationObserver.stopObserving();
updatesEnabled=false;
for(var ii=0;ii<subscriptions.length;ii++){
var sub=subscriptions[ii];
if(sub){
warning('Called stopObserving with existing subscriptions.');
sub[0].remove();

var sub1=sub[1];sub1&&sub1.remove();}}


subscriptions=[];}}};




module.exports=Geolocation;
}, "Geolocation");
__d(171 /* logError */, function(global, require, module, exports) {'use strict';

















var logError=function logError(){
if(arguments.length===1&&arguments[0] instanceof Error){
var err=arguments[0];
console.error('Error: "'+err.message+'".  Stack:\n'+err.stack);}else 
{
console.error.apply(console,arguments);}};



module.exports=logError;
}, "logError");
__d(172 /* Map */, function(global, require, module, exports) {var 



















guid=require(173 /* guid */);
var isNode=require(267 /* fbjs/lib/isNode */);
var toIterator=require(174 /* toIterator */);
var _shouldPolyfillES6Collection=require(175 /* _shouldPolyfillES6Collection */);

module.exports=function(global,undefined){




if(!_shouldPolyfillES6Collection('Map')){
return global.Map;}

























































var KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VALUE='key+value';



var KEY_PREFIX='$map_';



var SECRET_SIZE_PROP;
if(__DEV__){
SECRET_SIZE_PROP='$size'+guid();}



var OLD_IE_HASH_PREFIX='IE_HASH_';var 

Map=function(){










function Map(iterable){babelHelpers.classCallCheck(this,Map);
if(!isObject(this)){
throw new TypeError('Wrong map object type.');}


initMap(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
if(!isObject(next.value)){
throw new TypeError('Expected iterable items to be pair objects.');}

this.set(next.value[0],next.value[1]);}}}babelHelpers.createClass(Map,[{key:'clear',value:function clear()








{
initMap(this);}},{key:'has',value:function has(









key){
var index=getIndex(this,key);
return !!(index!=null&&this._mapData[index]);}},{key:'set',value:function set(










key,value){
var index=getIndex(this,key);

if(index!=null&&this._mapData[index]){
this._mapData[index][1]=value;}else 
{
index=this._mapData.push([
key,
value])-
1;
setIndex(this,key,index);
if(__DEV__){
this[SECRET_SIZE_PROP]+=1;}else 
{
this.size+=1;}}



return this;}},{key:'get',value:function get(









key){
var index=getIndex(this,key);
if(index==null){
return undefined;}else 
{
return this._mapData[index][1];}}},{key:'delete',value:function _delete(











key){
var index=getIndex(this,key);
if(index!=null&&this._mapData[index]){
setIndex(this,key,undefined);
this._mapData[index]=undefined;
if(__DEV__){
this[SECRET_SIZE_PROP]-=1;}else 
{
this.size-=1;}

return true;}else 
{
return false;}}},{key:'entries',value:function entries()










{
return new MapIterator(this,KIND_KEY_VALUE);}},{key:'keys',value:function keys()








{
return new MapIterator(this,KIND_KEY);}},{key:'values',value:function values()








{
return new MapIterator(this,KIND_VALUE);}},{key:'forEach',value:function forEach(











callback,thisArg){
if(typeof callback!=='function'){
throw new TypeError('Callback must be callable.');}


var boundCallback=callback.bind(thisArg||undefined);
var mapData=this._mapData;




for(var i=0;i<mapData.length;i++){
var entry=mapData[i];
if(entry!=null){
boundCallback(entry[1],entry[0],this);}}}}]);return Map;}();






Map.prototype[toIterator.ITERATOR_SYMBOL]=Map.prototype.entries;var 

MapIterator=function(){









function MapIterator(map,kind){babelHelpers.classCallCheck(this,MapIterator);
if(!(isObject(map)&&map['_mapData'])){
throw new TypeError('Object is not a map.');}


if([KIND_KEY,KIND_KEY_VALUE,KIND_VALUE].indexOf(kind)===-1){
throw new Error('Invalid iteration kind.');}


this._map=map;
this._nextIndex=0;
this._kind=kind;}babelHelpers.createClass(MapIterator,[{key:'next',value:function next()








{
if(!this instanceof Map){
throw new TypeError('Expected to be called on a MapIterator.');}


var map=this._map;
var index=this._nextIndex;
var kind=this._kind;

if(map==null){
return createIterResultObject(undefined,true);}


var entries=map['_mapData'];

while(index<entries.length){
var record=entries[index];

index+=1;
this._nextIndex=index;

if(record){
if(kind===KIND_KEY){
return createIterResultObject(record[0],false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(record[1],false);}else 
if(kind){
return createIterResultObject(record,false);}}}




this._map=undefined;

return createIterResultObject(undefined,true);}}]);return MapIterator;}();






MapIterator.prototype[toIterator.ITERATOR_SYMBOL]=function(){
return this;};













function getIndex(map,key){
if(isObject(key)){
var hash=getHash(key);
return map._objectIndex[hash];}else 
{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
return map._stringIndex[prefixedKey];}else 
{
return map._otherIndex[prefixedKey];}}}










function setIndex(map,key,index){
var shouldDelete=index==null;

if(isObject(key)){
var hash=getHash(key);
if(shouldDelete){
delete map._objectIndex[hash];}else 
{
map._objectIndex[hash]=index;}}else 

{
var prefixedKey=KEY_PREFIX+key;
if(typeof key==='string'){
if(shouldDelete){
delete map._stringIndex[prefixedKey];}else 
{
map._stringIndex[prefixedKey]=index;}}else 

{
if(shouldDelete){
delete map._otherIndex[prefixedKey];}else 
{
map._otherIndex[prefixedKey]=index;}}}}










function initMap(map){






map._mapData=[];







map._objectIndex={};


map._stringIndex={};


map._otherIndex={};







if(__DEV__){
if(isES5){



if(map.hasOwnProperty(SECRET_SIZE_PROP)){
map[SECRET_SIZE_PROP]=0;}else 
{
Object.defineProperty(map,SECRET_SIZE_PROP,{
value:0,
writable:true});

Object.defineProperty(map,'size',{
set:function set(v){
console.error(
'PLEASE FIX ME: You are changing the map size property which '+
'should not be writable and will break in production.');

throw new Error('The map size property is not writable.');},

get:function get(){return map[SECRET_SIZE_PROP];}});}




return;}}





map.size=0;}








function isObject(o){
return o!=null&&(typeof o==='object'||typeof o==='function');}









function createIterResultObject(value,done){
return {value:value,done:done};}



var isES5=function(){
try{
Object.defineProperty({},'x',{});
return true;}
catch(e){
return false;}}();









function isExtensible(o){
if(!isES5){
return true;}else 
{
return Object.isExtensible(o);}}











function getIENodeHash(node){
var uniqueID;
switch(node.nodeType){
case 1:
uniqueID=node.uniqueID;
break;
case 9:
uniqueID=node.documentElement.uniqueID;
break;
default:
return null;}


if(uniqueID){
return OLD_IE_HASH_PREFIX+uniqueID;}else 
{
return null;}}



var getHash=function(){
var propIsEnumerable=Object.prototype.propertyIsEnumerable;
var hashProperty=guid();
var hashCounter=0;







return function getHash(o){
if(o[hashProperty]){
return o[hashProperty];}else 
if(!isES5&&
o.propertyIsEnumerable&&
o.propertyIsEnumerable[hashProperty]){
return o.propertyIsEnumerable[hashProperty];}else 
if(!isES5&&
isNode(o)&&
getIENodeHash(o)){
return getIENodeHash(o);}else 
if(!isES5&&o[hashProperty]){
return o[hashProperty];}


if(isExtensible(o)){
hashCounter+=1;
if(isES5){
Object.defineProperty(o,hashProperty,{
enumerable:false,
writable:false,
configurable:false,
value:hashCounter});}else 

if(o.propertyIsEnumerable){




o.propertyIsEnumerable=function(){
return propIsEnumerable.apply(this,arguments);};

o.propertyIsEnumerable[hashProperty]=hashCounter;}else 
if(isNode(o)){




o[hashProperty]=hashCounter;}else 
{
throw new Error('Unable to set a non-enumerable property on object.');}

return hashCounter;}else 
{
throw new Error('Non-extensible objects are not allowed as keys.');}};}();




return Map;}(
Function('return this')());
}, "Map");
__d(173 /* guid */, function(global, require, module, exports) {function 

























guid(){
return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}


module.exports=guid;
}, "guid");
__d(267 /* fbjs/lib/isNode.js */, function(global, require, module, exports) {'use strict';
















function isNode(object){
return !!(object&&(typeof Node==='function'?object instanceof Node:typeof object==='object'&&typeof object.nodeType==='number'&&typeof object.nodeName==='string'));}


module.exports=isNode;
}, "fbjs/lib/isNode.js");
__d(174 /* toIterator */, function(global, require, module, exports) {var 






























KIND_KEY='key';
var KIND_VALUE='value';
var KIND_KEY_VAL='key+value';

var ITERATOR_SYMBOL=typeof Symbol==='function'?typeof Symbol==='function'?
Symbol.iterator:'@@iterator':
'@@iterator';

var toIterator=function(){
if(!(Array.prototype[ITERATOR_SYMBOL]&&
String.prototype[ITERATOR_SYMBOL])){

return function(){var 
ArrayIterator=function(){

function ArrayIterator(array,kind){babelHelpers.classCallCheck(this,ArrayIterator);
if(!Array.isArray(array)){
throw new TypeError('Object is not an Array');}

this._iteratedObject=array;
this._kind=kind;
this._nextIndex=0;}babelHelpers.createClass(ArrayIterator,[{key:'next',value:function next()



{
if(!this instanceof ArrayIterator){
throw new TypeError('Object is not an ArrayIterator');}


if(this._iteratedObject==null){
return createIterResultObject(undefined,true);}


var array=this._iteratedObject;
var len=this._iteratedObject.length;
var index=this._nextIndex;
var kind=this._kind;

if(index>=len){
this._iteratedObject=undefined;
return createIterResultObject(undefined,true);}


this._nextIndex=index+1;

if(kind===KIND_KEY){
return createIterResultObject(index,false);}else 
if(kind===KIND_VALUE){
return createIterResultObject(array[index],false);}else 
if(kind===KIND_KEY_VAL){
return createIterResultObject([index,array[index]],false);}}},{key:




'@@iterator',value:function iterator(){
return this;}}]);return ArrayIterator;}();var 



StringIterator=function(){

function StringIterator(string){babelHelpers.classCallCheck(this,StringIterator);
if(typeof string!=='string'){
throw new TypeError('Object is not a string');}

this._iteratedString=string;
this._nextIndex=0;}babelHelpers.createClass(StringIterator,[{key:'next',value:function next()



{
if(!this instanceof StringIterator){
throw new TypeError('Object is not a StringIterator');}


if(this._iteratedString==null){
return createIterResultObject(undefined,true);}


var index=this._nextIndex;
var s=this._iteratedString;
var len=s.length;

if(index>=len){
this._iteratedString=undefined;
return createIterResultObject(undefined,true);}


var ret;
var first=s.charCodeAt(index);

if(first<0xD800||first>0xDBFF||index+1===len){
ret=s[index];}else 
{
var second=s.charCodeAt(index+1);
if(second<0xDC00||second>0xDFFF){
ret=s[index];}else 
{
ret=s[index]+s[index+1];}}



this._nextIndex=index+ret.length;

return createIterResultObject(ret,false);}},{key:



'@@iterator',value:function iterator(){
return this;}}]);return StringIterator;}();




function createIterResultObject(value,done){
return {value:value,done:done};}


return function(object,kind){
if(typeof object==='string'){
return new StringIterator(object);}else 
if(Array.isArray(object)){
return new ArrayIterator(object,kind||KIND_VALUE);}else 
{
return object[ITERATOR_SYMBOL]();}};}();}else 



{
return function(object){
return object[ITERATOR_SYMBOL]();};}}();








babelHelpers.extends(toIterator,{
KIND_KEY:KIND_KEY,
KIND_VALUE:KIND_VALUE,
KIND_KEY_VAL:KIND_KEY_VAL,
ITERATOR_SYMBOL:ITERATOR_SYMBOL});


module.exports=toIterator;
}, "toIterator");
__d(175 /* _shouldPolyfillES6Collection */, function(global, require, module, exports) {function 
























shouldPolyfillES6Collection(collectionName){
var Collection=global[collectionName];
if(Collection==null){
return true;}






if(typeof global.Symbol!=='function'){
return true;}


var proto=Collection.prototype;




return Collection==null||
typeof Collection!=='function'||
typeof proto.clear!=='function'||
new Collection().size!==0||
typeof proto.keys!=='function'||
typeof proto.forEach!=='function';}


module.exports=shouldPolyfillES6Collection;
}, "_shouldPolyfillES6Collection");
__d(176 /* Set */, function(global, require, module, exports) {var 



















Map=require(172 /* Map */);
var toIterator=require(174 /* toIterator */);
var _shouldPolyfillES6Collection=require(175 /* _shouldPolyfillES6Collection */);

module.exports=function(global,undefined){





if(!_shouldPolyfillES6Collection('Set')){
return global.Set;}var 











































Set=function(){










function Set(iterable){babelHelpers.classCallCheck(this,Set);
if(this==null||
typeof this!=='object'&&typeof this!=='function'){
throw new TypeError('Wrong set object type.');}


initSet(this);

if(iterable!=null){
var it=toIterator(iterable);
var next;
while(!(next=it.next()).done){
this.add(next.value);}}}babelHelpers.createClass(Set,[{key:'add',value:function add(












value){
this._map.set(value,value);
this.size=this._map.size;
return this;}},{key:'clear',value:function clear()







{
initSet(this);}},{key:'delete',value:function _delete(











value){
var ret=this._map.delete(value);
this.size=this._map.size;
return ret;}},{key:'entries',value:function entries()







{
return this._map.entries();}},{key:'forEach',value:function forEach(









callback){
var thisArg=arguments[1];
var it=this._map.keys();
var next;
while(!(next=it.next()).done){
callback.call(thisArg,next.value,next.value,this);}}},{key:'has',value:function has(











value){
return this._map.has(value);}},{key:'values',value:function values()







{
return this._map.values();}}]);return Set;}();




Set.prototype[toIterator.ITERATOR_SYMBOL]=Set.prototype.values;


Set.prototype.keys=Set.prototype.values;

function initSet(set){
set._map=new Map();
set.size=set._map.size;}


return Set;}(
Function('return this')());
}, "Set");
__d(177 /* setupDevtools */, function(global, require, module, exports) {'use strict';












function setupDevtools(){
var messageListeners=[];
var closeListeners=[];
var ws=new window.WebSocket('ws://localhost:8097/devtools');

var FOR_BACKEND={
resolveRNStyle:require(59 /* flattenStyle */),
wall:{
listen:function listen(fn){
messageListeners.push(fn);},

onClose:function onClose(fn){
closeListeners.push(fn);},

send:function send(data){
ws.send(JSON.stringify(data));}}};



ws.onclose=handleClose;
ws.onerror=handleClose;
ws.onopen=function(){
tryToConnect();};


var hasClosed=false;
function handleClose(){
if(!hasClosed){
hasClosed=true;
setTimeout(setupDevtools,2000);
closeListeners.forEach(function(fn){return fn();});}}



function tryToConnect(){
ws.send('attach:agent');
var _interval=setInterval(function(){return ws.send('attach:agent');},500);
ws.onmessage=function(evt){
if(evt.data.indexOf('eval:')===0){
clearInterval(_interval);
initialize(evt.data.slice('eval:'.length));}};}




function initialize(text){
try{

eval(text);}
catch(e){
console.error('Failed to eval: '+e.message);
return;}


var ReactNativeComponentTree=require(96 /* ReactNativeComponentTree */);
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
ComponentTree:{
getClosestInstanceFromNode:function getClosestInstanceFromNode(node){
return ReactNativeComponentTree.getClosestInstanceFromNode(node);},

getNodeFromInstance:function getNodeFromInstance(inst){

while(inst._renderedComponent){
inst=inst._renderedComponent;}

if(inst){
return ReactNativeComponentTree.getNodeFromInstance(inst);}else 
{
return null;}}},



Mount:require(178 /* ReactNativeMount */),
Reconciler:require(110 /* ReactReconciler */)});

ws.onmessage=handleMessage;}


function handleMessage(evt){


var data;
try{
data=JSON.parse(evt.data);}
catch(e){
return console.error('failed to parse json: '+evt.data);}


if(data.$close||data.$error){
closeListeners.forEach(function(fn){return fn();});
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.emit('shutdown');
tryToConnect();
return;}

if(data.$open){
return;}

messageListeners.forEach(function(fn){
try{
fn(data);}
catch(e){



console.log(data);
throw e;}});}}





module.exports=setupDevtools;
}, "setupDevtools");
__d(178 /* ReactNativeMount */, function(global, require, module, exports) {'use strict';












var ReactElement=require(37 /* ./ReactElement */);
var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);
var ReactNativeContainerInfo=require(179 /* ./ReactNativeContainerInfo */);
var ReactNativeTagHandles=require(106 /* ./ReactNativeTagHandles */);
var ReactReconciler=require(110 /* ./ReactReconciler */);
var ReactUpdateQueue=require(121 /* ./ReactUpdateQueue */);
var ReactUpdates=require(107 /* ./ReactUpdates */);
var UIManager=require(61 /* UIManager */);

var emptyObject=require(262 /* fbjs/lib/emptyObject */);
var instantiateReactComponent=require(118 /* ./instantiateReactComponent */);
var shouldUpdateReactComponent=require(122 /* ./shouldUpdateReactComponent */);






var TopLevelWrapper=function TopLevelWrapper(){};
TopLevelWrapper.prototype.isReactComponent={};
if(process.env.NODE_ENV!=='production'){
TopLevelWrapper.displayName='TopLevelWrapper';}

TopLevelWrapper.prototype.render=function(){

return this.props;};










function mountComponentIntoNode(componentInstance,containerTag,transaction){
var markup=ReactReconciler.mountComponent(componentInstance,transaction,null,ReactNativeContainerInfo(containerTag),emptyObject);
componentInstance._renderedComponent._topLevelWrapper=componentInstance;
ReactNativeMount._mountImageIntoNode(markup,containerTag);}









function batchedMountComponentIntoNode(componentInstance,containerTag){
var transaction=ReactUpdates.ReactReconcileTransaction.getPooled();
transaction.perform(mountComponentIntoNode,null,componentInstance,containerTag,transaction);
ReactUpdates.ReactReconcileTransaction.release(transaction);}






var ReactNativeMount={
_instancesByContainerID:{},


findNodeHandle:require(62 /* ./findNodeHandle */),





renderComponent:function renderComponent(nextElement,containerTag,callback){
var nextWrappedElement=new ReactElement(TopLevelWrapper,null,null,null,null,null,nextElement);

var topRootNodeID=containerTag;
var prevComponent=ReactNativeMount._instancesByContainerID[topRootNodeID];
if(prevComponent){
var prevWrappedElement=prevComponent._currentElement;
var prevElement=prevWrappedElement.props;
if(shouldUpdateReactComponent(prevElement,nextElement)){
ReactUpdateQueue.enqueueElementInternal(prevComponent,nextWrappedElement);
if(callback){
ReactUpdateQueue.enqueueCallbackInternal(prevComponent,callback);}

return prevComponent;}else 
{
ReactNativeMount.unmountComponentAtNode(containerTag);}}



if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return null;}


ReactNativeTagHandles.assertRootTag(containerTag);

var instance=instantiateReactComponent(nextWrappedElement);
ReactNativeMount._instancesByContainerID[containerTag]=instance;

if(process.env.NODE_ENV!=='production'){


instance._debugID=0;

if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onBeginFlush();}}







ReactUpdates.batchedUpdates(batchedMountComponentIntoNode,instance,containerTag);
if(process.env.NODE_ENV!=='production'){

ReactInstrumentation.debugTool.onMountRootComponent(instance._renderedComponent._debugID);
ReactInstrumentation.debugTool.onEndFlush();}

var component=instance.getPublicInstance();
if(callback){
callback.call(component);}

return component;},






_mountImageIntoNode:function _mountImageIntoNode(mountImage,containerID){


var childTag=mountImage;
UIManager.setChildren(containerID,[childTag]);},










unmountComponentAtNodeAndRemoveContainer:function unmountComponentAtNodeAndRemoveContainer(containerTag){
ReactNativeMount.unmountComponentAtNode(containerTag);

UIManager.removeRootView(containerTag);},







unmountComponentAtNode:function unmountComponentAtNode(containerTag){
if(!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)){
console.error('You cannot render into anything but a top root');
return false;}


var instance=ReactNativeMount._instancesByContainerID[containerTag];
if(!instance){
return false;}

if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onBeginFlush();}

ReactNativeMount.unmountComponentFromNode(instance,containerTag);
delete ReactNativeMount._instancesByContainerID[containerTag];
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onEndFlush();}

return true;},











unmountComponentFromNode:function unmountComponentFromNode(instance,containerID){

ReactReconciler.unmountComponent(instance);
UIManager.removeSubviewsFromContainerWithID(containerID);}};




module.exports=ReactNativeMount;
}, "ReactNativeMount");
__d(179 /* ReactNativeContainerInfo */, function(global, require, module, exports) {'use strict';












function ReactNativeContainerInfo(tag){
var info={
_tag:tag};

return info;}


module.exports=ReactNativeContainerInfo;
}, "ReactNativeContainerInfo");
__d(180 /* RCTDebugComponentOwnership */, function(global, require, module, exports) {'use strict';
















var BatchedBridge=require(2 /* BatchedBridge */);

var RCTDebugComponentOwnership={







getOwnerHierarchy:function getOwnerHierarchy(requestID,tag){

throw new Error(
'This seems to be unused. Will disable until it is needed again.');}};




BatchedBridge.registerCallableModule(
'RCTDebugComponentOwnership',
RCTDebugComponentOwnership);


module.exports=RCTDebugComponentOwnership;
}, "RCTDebugComponentOwnership");
__d(354 /* react-transform-hmr/lib/index.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,'__esModule',{
value:true});


var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==='function'?Symbol.iterator:'@@iterator'](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i['return'])_i['return']();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==='function'?Symbol.iterator:'@@iterator') in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};}();

exports['default']=proxyReactComponents;

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var _reactProxy=require(275 /* react-proxy */);

var _globalWindow=require(412 /* global/window */);

var _globalWindow2=_interopRequireDefault(_globalWindow);

var componentProxies=undefined;
if(_globalWindow2['default'].__reactComponentProxies){
componentProxies=_globalWindow2['default'].__reactComponentProxies;}else 
{
componentProxies={};
Object.defineProperty(_globalWindow2['default'],'__reactComponentProxies',{
configurable:true,
enumerable:false,
writable:false,
value:componentProxies});}



function proxyReactComponents(_ref){
var filename=_ref.filename;
var components=_ref.components;
var imports=_ref.imports;
var locals=_ref.locals;

var _imports=_slicedToArray(imports,1);

var React=_imports[0];

var _locals=_slicedToArray(locals,1);

var hot=_locals[0].hot;

if(!React.Component){
throw new Error('imports[0] for react-transform-hmr does not look like React.');}


if(!hot||typeof hot.accept!=='function'){
throw new Error('locals[0] does not appear to be a `module` object with Hot Module '+'replacement API enabled. You should disable react-transform-hmr in '+'production by using `env` section in Babel configuration. See the '+'example in README: https://github.com/gaearon/react-transform-hmr');}


if(Object.keys(components).some(function(key){
return !components[key].isInFunction;}))
{
hot.accept(function(err){
if(err){
console.warn('[React Transform HMR] There was an error updating '+filename+':');
console.error(err);}});}




var forceUpdate=(0,_reactProxy.getForceUpdate)(React);

return function wrapWithProxy(ReactClass,uniqueId){
var _components$uniqueId=components[uniqueId];
var _components$uniqueId$isInFunction=_components$uniqueId.isInFunction;
var isInFunction=_components$uniqueId$isInFunction===undefined?false:_components$uniqueId$isInFunction;
var _components$uniqueId$displayName=_components$uniqueId.displayName;
var displayName=_components$uniqueId$displayName===undefined?uniqueId:_components$uniqueId$displayName;

if(isInFunction){
return ReactClass;}


var globalUniqueId=filename+'$'+uniqueId;
if(componentProxies[globalUniqueId]){
(function(){
console.info('[React Transform HMR] Patching '+displayName);
var instances=componentProxies[globalUniqueId].update(ReactClass);
setTimeout(function(){
return instances.forEach(forceUpdate);});})();}else 


{
componentProxies[globalUniqueId]=(0,_reactProxy.createProxy)(ReactClass);}


return componentProxies[globalUniqueId].get();};}



module.exports=exports['default'];
}, "react-transform-hmr/lib/index.js");
__d(275 /* react-proxy/modules/index.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.getForceUpdate=exports.createProxy=undefined;

var _supportsProtoAssignment=require(274 /* ./supportsProtoAssignment */);

var _supportsProtoAssignment2=_interopRequireDefault(_supportsProtoAssignment);

var _createClassProxy=require(417 /* ./createClassProxy */);

var _createClassProxy2=_interopRequireDefault(_createClassProxy);

var _reactDeepForceUpdate=require(421 /* react-deep-force-update */);

var _reactDeepForceUpdate2=_interopRequireDefault(_reactDeepForceUpdate);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

if(!(0,_supportsProtoAssignment2.default)()){
console.warn('This JavaScript environment does not support __proto__. '+'This means that react-proxy is unable to proxy React components. '+'Features that rely on react-proxy, such as react-transform-hmr, '+'will not function as expected.');}


exports.createProxy=_createClassProxy2.default;
exports.getForceUpdate=_reactDeepForceUpdate2.default;
}, "react-proxy/modules/index.js");
__d(274 /* react-proxy/modules/supportsProtoAssignment.js */, function(global, require, module, exports) {"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=supportsProtoAssignment;
var x={};
var y={supports:true};
try{
x.__proto__=y;}
catch(err){}

function supportsProtoAssignment(){
return x.supports||false;}
;
}, "react-proxy/modules/supportsProtoAssignment.js");
__d(417 /* react-proxy/modules/createClassProxy.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i["return"])_i["return"]();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();

exports.default=proxyClass;
exports.default=createClassProxy;

var _find=require(279 /* lodash/find */);

var _find2=_interopRequireDefault(_find);

var _createPrototypeProxy=require(429 /* ./createPrototypeProxy */);

var _createPrototypeProxy2=_interopRequireDefault(_createPrototypeProxy);

var _bindAutoBindMethods=require(424 /* ./bindAutoBindMethods */);

var _bindAutoBindMethods2=_interopRequireDefault(_bindAutoBindMethods);

var _deleteUnknownAutoBindMethods=require(419 /* ./deleteUnknownAutoBindMethods */);

var _deleteUnknownAutoBindMethods2=_interopRequireDefault(_deleteUnknownAutoBindMethods);

var _supportsProtoAssignment=require(274 /* ./supportsProtoAssignment */);

var _supportsProtoAssignment2=_interopRequireDefault(_supportsProtoAssignment);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}

var RESERVED_STATICS=['length','name','arguments','caller','prototype','toString'];

function isEqualDescriptor(a,b){
if(!a&&!b){
return true;}

if(!a||!b){
return false;}

for(var key in a){
if(a[key]!==b[key]){
return false;}}


return true;}




var allProxies=[];
function findProxy(Component){
var pair=(0,_find2.default)(allProxies,function(_ref){
var _ref2=_slicedToArray(_ref,1);

var key=_ref2[0];
return key===Component;});

return pair?pair[1]:null;}

function addProxy(Component,proxy){
allProxies.push([Component,proxy]);}


function proxyClass(InitialComponent){


var existingProxy=findProxy(InitialComponent);
if(existingProxy){
return existingProxy;}


var prototypeProxy=(0,_createPrototypeProxy2.default)();
var CurrentComponent=undefined;
var ProxyComponent=undefined;

var staticDescriptors={};
function wasStaticModifiedByUser(key){

var currentDescriptor=Object.getOwnPropertyDescriptor(ProxyComponent,key);
return !isEqualDescriptor(staticDescriptors[key],currentDescriptor);}


function instantiate(factory,context,params){
var component=factory();

try{
return component.apply(context,params);}
catch(err){
(function(){

var instance=new (Function.prototype.bind.apply(component,[null].concat(_toConsumableArray(params))))();

Object.keys(instance).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}

context[key]=instance[key];});})();}}





try{

ProxyComponent=new Function('factory','instantiate','return function '+(InitialComponent.name||'ProxyComponent')+'() {\n         return instantiate(factory, this, arguments);\n      }')(function(){
return CurrentComponent;},
instantiate);}
catch(err){

ProxyComponent=function ProxyComponent(){
return instantiate(function(){
return CurrentComponent;},
this,arguments);};}




ProxyComponent.prototype=prototypeProxy.get();


ProxyComponent.toString=function toString(){
return CurrentComponent.toString();};


function update(NextComponent){
if(typeof NextComponent!=='function'){
throw new Error('Expected a constructor.');}



var existingProxy=findProxy(NextComponent);
if(existingProxy){
return update(existingProxy.__getCurrent());}



CurrentComponent=NextComponent;


var mountedInstances=prototypeProxy.update(NextComponent.prototype);


ProxyComponent.prototype.constructor=ProxyComponent;


ProxyComponent.__proto__=NextComponent.__proto__;


Object.getOwnPropertyNames(NextComponent).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}


var staticDescriptor=_extends({},Object.getOwnPropertyDescriptor(NextComponent,key),{
configurable:true});



if(!wasStaticModifiedByUser(key)){
Object.defineProperty(ProxyComponent,key,staticDescriptor);
staticDescriptors[key]=staticDescriptor;}});




Object.getOwnPropertyNames(ProxyComponent).forEach(function(key){
if(RESERVED_STATICS.indexOf(key)>-1){
return;}



if(NextComponent.hasOwnProperty(key)){
return;}



var descriptor=Object.getOwnPropertyDescriptor(ProxyComponent,key);
if(descriptor&&!descriptor.configurable){
return;}



if(!wasStaticModifiedByUser(key)){
delete ProxyComponent[key];
delete staticDescriptors[key];}});




ProxyComponent.displayName=NextComponent.displayName||NextComponent.name;


mountedInstances.forEach(_bindAutoBindMethods2.default);
mountedInstances.forEach(_deleteUnknownAutoBindMethods2.default);


return mountedInstances;}
;

function get(){
return ProxyComponent;}


function getCurrent(){
return CurrentComponent;}


update(InitialComponent);

var proxy={get:get,update:update};
addProxy(ProxyComponent,proxy);

Object.defineProperty(proxy,'__getCurrent',{
configurable:false,
writable:false,
enumerable:false,
value:getCurrent});


return proxy;}


function createFallback(Component){
var CurrentComponent=Component;

return {
get:function get(){
return CurrentComponent;},

update:function update(NextComponent){
CurrentComponent=NextComponent;}};}




function createClassProxy(Component){
return Component.__proto__&&(0,_supportsProtoAssignment2.default)()?proxyClass(Component):createFallback(Component);}
}, "react-proxy/modules/createClassProxy.js");
__d(279 /* lodash/find.js */, function(global, require, module, exports) {var baseEach=require(272 /* ./_baseEach */),
baseFind=require(305 /* ./_baseFind */),
baseFindIndex=require(303 /* ./_baseFindIndex */),
baseIteratee=require(310 /* ./_baseIteratee */),
isArray=require(297 /* ./isArray */);





































function find(collection,predicate){
predicate=baseIteratee(predicate,3);
if(isArray(collection)){
var index=baseFindIndex(collection,predicate);
return index>-1?collection[index]:undefined;}

return baseFind(collection,predicate,baseEach);}


module.exports=find;
}, "lodash/find.js");
__d(272 /* lodash/_baseEach.js */, function(global, require, module, exports) {var baseForOwn=require(277 /* ./_baseForOwn */),
createBaseEach=require(311 /* ./_createBaseEach */);









var baseEach=createBaseEach(baseForOwn);

module.exports=baseEach;
}, "lodash/_baseEach.js");
__d(277 /* lodash/_baseForOwn.js */, function(global, require, module, exports) {var baseFor=require(276 /* ./_baseFor */),
keys=require(293 /* ./keys */);









function baseForOwn(object,iteratee){
return object&&baseFor(object,iteratee,keys);}


module.exports=baseForOwn;
}, "lodash/_baseForOwn.js");
__d(276 /* lodash/_baseFor.js */, function(global, require, module, exports) {var createBaseFor=require(283 /* ./_createBaseFor */);












var baseFor=createBaseFor();

module.exports=baseFor;
}, "lodash/_baseFor.js");
__d(283 /* lodash/_createBaseFor.js */, function(global, require, module, exports) {function 






createBaseFor(fromRight){
return function(object,iteratee,keysFunc){
var index=-1,
iterable=Object(object),
props=keysFunc(object),
length=props.length;

while(length--){
var key=props[fromRight?length:++index];
if(iteratee(iterable[key],key,iterable)===false){
break;}}


return object;};}



module.exports=createBaseFor;
}, "lodash/_createBaseFor.js");
__d(293 /* lodash/keys.js */, function(global, require, module, exports) {var baseHas=require(282 /* ./_baseHas */),
baseKeys=require(281 /* ./_baseKeys */),
indexKeys=require(284 /* ./_indexKeys */),
isArrayLike=require(294 /* ./isArrayLike */),
isIndex=require(304 /* ./_isIndex */),
isPrototype=require(309 /* ./_isPrototype */);





























function keys(object){
var isProto=isPrototype(object);
if(!(isProto||isArrayLike(object))){
return baseKeys(object);}

var indexes=indexKeys(object),
skipIndexes=!!indexes,
result=indexes||[],
length=result.length;

for(var key in object){
if(baseHas(object,key)&&
!(skipIndexes&&(key=='length'||isIndex(key,length)))&&
!(isProto&&key=='constructor')){
result.push(key);}}


return result;}


module.exports=keys;
}, "lodash/keys.js");
__d(282 /* lodash/_baseHas.js */, function(global, require, module, exports) {var getPrototype=require(280 /* ./_getPrototype */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;









function baseHas(object,key){



return hasOwnProperty.call(object,key)||
typeof object=='object'&&key in object&&getPrototype(object)===null;}


module.exports=baseHas;
}, "lodash/_baseHas.js");
__d(280 /* lodash/_getPrototype.js */, function(global, require, module, exports) {var 
nativeGetPrototype=Object.getPrototypeOf;








function getPrototype(value){
return nativeGetPrototype(Object(value));}


module.exports=getPrototype;
}, "lodash/_getPrototype.js");
__d(281 /* lodash/_baseKeys.js */, function(global, require, module, exports) {var 
nativeKeys=Object.keys;









function baseKeys(object){
return nativeKeys(Object(object));}


module.exports=baseKeys;
}, "lodash/_baseKeys.js");
__d(284 /* lodash/_indexKeys.js */, function(global, require, module, exports) {var baseTimes=require(292 /* ./_baseTimes */),
isArguments=require(288 /* ./isArguments */),
isArray=require(297 /* ./isArray */),
isLength=require(302 /* ./isLength */),
isString=require(306 /* ./isString */);









function indexKeys(object){
var length=object?object.length:undefined;
if(isLength(length)&&(
isArray(object)||isString(object)||isArguments(object))){
return baseTimes(length,String);}

return null;}


module.exports=indexKeys;
}, "lodash/_indexKeys.js");
__d(292 /* lodash/_baseTimes.js */, function(global, require, module, exports) {function 








baseTimes(n,iteratee){
var index=-1,
result=Array(n);

while(++index<n){
result[index]=iteratee(index);}

return result;}


module.exports=baseTimes;
}, "lodash/_baseTimes.js");
__d(288 /* lodash/isArguments.js */, function(global, require, module, exports) {var isArrayLikeObject=require(289 /* ./isArrayLikeObject */);


var argsTag='[object Arguments]';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;






var objectToString=objectProto.toString;


var propertyIsEnumerable=objectProto.propertyIsEnumerable;



















function isArguments(value){

return isArrayLikeObject(value)&&hasOwnProperty.call(value,'callee')&&(
!propertyIsEnumerable.call(value,'callee')||objectToString.call(value)==argsTag);}


module.exports=isArguments;
}, "lodash/isArguments.js");
__d(289 /* lodash/isArrayLikeObject.js */, function(global, require, module, exports) {var isArrayLike=require(294 /* ./isArrayLike */),
isObjectLike=require(296 /* ./isObjectLike */);


























function isArrayLikeObject(value){
return isObjectLike(value)&&isArrayLike(value);}


module.exports=isArrayLikeObject;
}, "lodash/isArrayLikeObject.js");
__d(294 /* lodash/isArrayLike.js */, function(global, require, module, exports) {var getLength=require(286 /* ./_getLength */),
isFunction=require(301 /* ./isFunction */),
isLength=require(302 /* ./isLength */);


























function isArrayLike(value){
return value!=null&&isLength(getLength(value))&&!isFunction(value);}


module.exports=isArrayLike;
}, "lodash/isArrayLike.js");
__d(286 /* lodash/_getLength.js */, function(global, require, module, exports) {var baseProperty=require(299 /* ./_baseProperty */);












var getLength=baseProperty('length');

module.exports=getLength;
}, "lodash/_getLength.js");
__d(299 /* lodash/_baseProperty.js */, function(global, require, module, exports) {function 






baseProperty(key){
return function(object){
return object==null?undefined:object[key];};}



module.exports=baseProperty;
}, "lodash/_baseProperty.js");
__d(301 /* lodash/isFunction.js */, function(global, require, module, exports) {var isObject=require(298 /* ./isObject */);


var funcTag='[object Function]',
genTag='[object GeneratorFunction]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isFunction(value){



var tag=isObject(value)?objectToString.call(value):'';
return tag==funcTag||tag==genTag;}


module.exports=isFunction;
}, "lodash/isFunction.js");
__d(298 /* lodash/isObject.js */, function(global, require, module, exports) {function 
























isObject(value){
var type=typeof value;
return !!value&&(type=='object'||type=='function');}


module.exports=isObject;
}, "lodash/isObject.js");
__d(302 /* lodash/isLength.js */, function(global, require, module, exports) {var 
MAX_SAFE_INTEGER=9007199254740991;




























function isLength(value){
return typeof value=='number'&&
value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}


module.exports=isLength;
}, "lodash/isLength.js");
__d(296 /* lodash/isObjectLike.js */, function(global, require, module, exports) {function 























isObjectLike(value){
return !!value&&typeof value=='object';}


module.exports=isObjectLike;
}, "lodash/isObjectLike.js");
__d(297 /* lodash/isArray.js */, function(global, require, module, exports) {var 
























isArray=Array.isArray;

module.exports=isArray;
}, "lodash/isArray.js");
__d(306 /* lodash/isString.js */, function(global, require, module, exports) {var isArray=require(297 /* ./isArray */),
isObjectLike=require(296 /* ./isObjectLike */);


var stringTag='[object String]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isString(value){
return typeof value=='string'||
!isArray(value)&&isObjectLike(value)&&objectToString.call(value)==stringTag;}


module.exports=isString;
}, "lodash/isString.js");
__d(304 /* lodash/_isIndex.js */, function(global, require, module, exports) {var 
MAX_SAFE_INTEGER=9007199254740991;


var reIsUint=/^(?:0|[1-9]\d*)$/;









function isIndex(value,length){
length=length==null?MAX_SAFE_INTEGER:length;
return !!length&&(
typeof value=='number'||reIsUint.test(value))&&
value>-1&&value%1==0&&value<length;}


module.exports=isIndex;
}, "lodash/_isIndex.js");
__d(309 /* lodash/_isPrototype.js */, function(global, require, module, exports) {var 
objectProto=Object.prototype;








function isPrototype(value){
var Ctor=value&&value.constructor,
proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;

return value===proto;}


module.exports=isPrototype;
}, "lodash/_isPrototype.js");
__d(311 /* lodash/_createBaseEach.js */, function(global, require, module, exports) {var isArrayLike=require(294 /* ./isArrayLike */);









function createBaseEach(eachFunc,fromRight){
return function(collection,iteratee){
if(collection==null){
return collection;}

if(!isArrayLike(collection)){
return eachFunc(collection,iteratee);}

var length=collection.length,
index=fromRight?length:-1,
iterable=Object(collection);

while(fromRight?index--:++index<length){
if(iteratee(iterable[index],index,iterable)===false){
break;}}


return collection;};}



module.exports=createBaseEach;
}, "lodash/_createBaseEach.js");
__d(305 /* lodash/_baseFind.js */, function(global, require, module, exports) {function 












baseFind(collection,predicate,eachFunc,retKey){
var result;
eachFunc(collection,function(value,key,collection){
if(predicate(value,key,collection)){
result=retKey?key:value;
return false;}});


return result;}


module.exports=baseFind;
}, "lodash/_baseFind.js");
__d(303 /* lodash/_baseFindIndex.js */, function(global, require, module, exports) {function 









baseFindIndex(array,predicate,fromRight){
var length=array.length,
index=fromRight?length:-1;

while(fromRight?index--:++index<length){
if(predicate(array[index],index,array)){
return index;}}


return -1;}


module.exports=baseFindIndex;
}, "lodash/_baseFindIndex.js");
__d(310 /* lodash/_baseIteratee.js */, function(global, require, module, exports) {var baseMatches=require(308 /* ./_baseMatches */),
baseMatchesProperty=require(375 /* ./_baseMatchesProperty */),
identity=require(386 /* ./identity */),
isArray=require(297 /* ./isArray */),
property=require(388 /* ./property */);








function baseIteratee(value){


if(typeof value=='function'){
return value;}

if(value==null){
return identity;}

if(typeof value=='object'){
return isArray(value)?
baseMatchesProperty(value[0],value[1]):
baseMatches(value);}

return property(value);}


module.exports=baseIteratee;
}, "lodash/_baseIteratee.js");
__d(308 /* lodash/_baseMatches.js */, function(global, require, module, exports) {var baseIsMatch=require(328 /* ./_baseIsMatch */),
getMatchData=require(365 /* ./_getMatchData */),
matchesStrictComparable=require(367 /* ./_matchesStrictComparable */);








function baseMatches(source){
var matchData=getMatchData(source);
if(matchData.length==1&&matchData[0][2]){
return matchesStrictComparable(matchData[0][0],matchData[0][1]);}

return function(object){
return object===source||baseIsMatch(object,source,matchData);};}



module.exports=baseMatches;
}, "lodash/_baseMatches.js");
__d(328 /* lodash/_baseIsMatch.js */, function(global, require, module, exports) {var Stack=require(313 /* ./_Stack */),
baseIsEqual=require(353 /* ./_baseIsEqual */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;











function baseIsMatch(object,source,matchData,customizer){
var index=matchData.length,
length=index,
noCustomizer=!customizer;

if(object==null){
return !length;}

object=Object(object);
while(index--){
var data=matchData[index];
if(noCustomizer&&data[2]?
data[1]!==object[data[0]]:
!(data[0] in object))
{
return false;}}


while(++index<length){
data=matchData[index];
var key=data[0],
objValue=object[key],
srcValue=data[1];

if(noCustomizer&&data[2]){
if(objValue===undefined&&!(key in object)){
return false;}}else 

{
var stack=new Stack();
if(customizer){
var result=customizer(objValue,srcValue,key,object,source,stack);}

if(!(result===undefined?
baseIsEqual(srcValue,objValue,customizer,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,stack):
result))
{
return false;}}}



return true;}


module.exports=baseIsMatch;
}, "lodash/_baseIsMatch.js");
__d(313 /* lodash/_Stack.js */, function(global, require, module, exports) {var ListCache=require(326 /* ./_ListCache */),
stackClear=require(314 /* ./_stackClear */),
stackDelete=require(318 /* ./_stackDelete */),
stackGet=require(316 /* ./_stackGet */),
stackHas=require(319 /* ./_stackHas */),
stackSet=require(327 /* ./_stackSet */);








function Stack(entries){
this.__data__=new ListCache(entries);}



Stack.prototype.clear=stackClear;
Stack.prototype['delete']=stackDelete;
Stack.prototype.get=stackGet;
Stack.prototype.has=stackHas;
Stack.prototype.set=stackSet;

module.exports=Stack;
}, "lodash/_Stack.js");
__d(326 /* lodash/_ListCache.js */, function(global, require, module, exports) {var listCacheClear=require(307 /* ./_listCacheClear */),
listCacheDelete=require(321 /* ./_listCacheDelete */),
listCacheGet=require(317 /* ./_listCacheGet */),
listCacheHas=require(322 /* ./_listCacheHas */),
listCacheSet=require(320 /* ./_listCacheSet */);








function ListCache(entries){
var index=-1,
length=entries?entries.length:0;

this.clear();
while(++index<length){
var entry=entries[index];
this.set(entry[0],entry[1]);}}




ListCache.prototype.clear=listCacheClear;
ListCache.prototype['delete']=listCacheDelete;
ListCache.prototype.get=listCacheGet;
ListCache.prototype.has=listCacheHas;
ListCache.prototype.set=listCacheSet;

module.exports=ListCache;
}, "lodash/_ListCache.js");
__d(307 /* lodash/_listCacheClear.js */, function(global, require, module, exports) {function 






listCacheClear(){
this.__data__=[];}


module.exports=listCacheClear;
}, "lodash/_listCacheClear.js");
__d(321 /* lodash/_listCacheDelete.js */, function(global, require, module, exports) {var assocIndexOf=require(315 /* ./_assocIndexOf */);


var arrayProto=Array.prototype;


var splice=arrayProto.splice;










function listCacheDelete(key){
var data=this.__data__,
index=assocIndexOf(data,key);

if(index<0){
return false;}

var lastIndex=data.length-1;
if(index==lastIndex){
data.pop();}else 
{
splice.call(data,index,1);}

return true;}


module.exports=listCacheDelete;
}, "lodash/_listCacheDelete.js");
__d(315 /* lodash/_assocIndexOf.js */, function(global, require, module, exports) {var eq=require(312 /* ./eq */);









function assocIndexOf(array,key){
var length=array.length;
while(length--){
if(eq(array[length][0],key)){
return length;}}


return -1;}


module.exports=assocIndexOf;
}, "lodash/_assocIndexOf.js");
__d(312 /* lodash/eq.js */, function(global, require, module, exports) {function 































eq(value,other){
return value===other||value!==value&&other!==other;}


module.exports=eq;
}, "lodash/eq.js");
__d(317 /* lodash/_listCacheGet.js */, function(global, require, module, exports) {var assocIndexOf=require(315 /* ./_assocIndexOf */);










function listCacheGet(key){
var data=this.__data__,
index=assocIndexOf(data,key);

return index<0?undefined:data[index][1];}


module.exports=listCacheGet;
}, "lodash/_listCacheGet.js");
__d(322 /* lodash/_listCacheHas.js */, function(global, require, module, exports) {var assocIndexOf=require(315 /* ./_assocIndexOf */);










function listCacheHas(key){
return assocIndexOf(this.__data__,key)>-1;}


module.exports=listCacheHas;
}, "lodash/_listCacheHas.js");
__d(320 /* lodash/_listCacheSet.js */, function(global, require, module, exports) {var assocIndexOf=require(315 /* ./_assocIndexOf */);











function listCacheSet(key,value){
var data=this.__data__,
index=assocIndexOf(data,key);

if(index<0){
data.push([key,value]);}else 
{
data[index][1]=value;}

return this;}


module.exports=listCacheSet;
}, "lodash/_listCacheSet.js");
__d(314 /* lodash/_stackClear.js */, function(global, require, module, exports) {var ListCache=require(326 /* ./_ListCache */);








function stackClear(){
this.__data__=new ListCache();}


module.exports=stackClear;
}, "lodash/_stackClear.js");
__d(318 /* lodash/_stackDelete.js */, function(global, require, module, exports) {function 








stackDelete(key){
return this.__data__['delete'](key);}


module.exports=stackDelete;
}, "lodash/_stackDelete.js");
__d(316 /* lodash/_stackGet.js */, function(global, require, module, exports) {function 








stackGet(key){
return this.__data__.get(key);}


module.exports=stackGet;
}, "lodash/_stackGet.js");
__d(319 /* lodash/_stackHas.js */, function(global, require, module, exports) {function 








stackHas(key){
return this.__data__.has(key);}


module.exports=stackHas;
}, "lodash/_stackHas.js");
__d(327 /* lodash/_stackSet.js */, function(global, require, module, exports) {var ListCache=require(326 /* ./_ListCache */),
MapCache=require(336 /* ./_MapCache */);


var LARGE_ARRAY_SIZE=200;











function stackSet(key,value){
var cache=this.__data__;
if(cache instanceof ListCache&&cache.__data__.length==LARGE_ARRAY_SIZE){
cache=this.__data__=new MapCache(cache.__data__);}

cache.set(key,value);
return this;}


module.exports=stackSet;
}, "lodash/_stackSet.js");
__d(336 /* lodash/_MapCache.js */, function(global, require, module, exports) {var mapCacheClear=require(324 /* ./_mapCacheClear */),
mapCacheDelete=require(340 /* ./_mapCacheDelete */),
mapCacheGet=require(344 /* ./_mapCacheGet */),
mapCacheHas=require(355 /* ./_mapCacheHas */),
mapCacheSet=require(342 /* ./_mapCacheSet */);








function MapCache(entries){
var index=-1,
length=entries?entries.length:0;

this.clear();
while(++index<length){
var entry=entries[index];
this.set(entry[0],entry[1]);}}




MapCache.prototype.clear=mapCacheClear;
MapCache.prototype['delete']=mapCacheDelete;
MapCache.prototype.get=mapCacheGet;
MapCache.prototype.has=mapCacheHas;
MapCache.prototype.set=mapCacheSet;

module.exports=MapCache;
}, "lodash/_MapCache.js");
__d(324 /* lodash/_mapCacheClear.js */, function(global, require, module, exports) {var Hash=require(332 /* ./_Hash */),
ListCache=require(326 /* ./_ListCache */),
Map=require(333 /* ./_Map */);








function mapCacheClear(){
this.__data__={
'hash':new Hash(),
'map':new (Map||ListCache)(),
'string':new Hash()};}



module.exports=mapCacheClear;
}, "lodash/_mapCacheClear.js");
__d(332 /* lodash/_Hash.js */, function(global, require, module, exports) {var hashClear=require(325 /* ./_hashClear */),
hashDelete=require(331 /* ./_hashDelete */),
hashGet=require(335 /* ./_hashGet */),
hashHas=require(341 /* ./_hashHas */),
hashSet=require(338 /* ./_hashSet */);








function Hash(entries){
var index=-1,
length=entries?entries.length:0;

this.clear();
while(++index<length){
var entry=entries[index];
this.set(entry[0],entry[1]);}}




Hash.prototype.clear=hashClear;
Hash.prototype['delete']=hashDelete;
Hash.prototype.get=hashGet;
Hash.prototype.has=hashHas;
Hash.prototype.set=hashSet;

module.exports=Hash;
}, "lodash/_Hash.js");
__d(325 /* lodash/_hashClear.js */, function(global, require, module, exports) {var nativeCreate=require(323 /* ./_nativeCreate */);








function hashClear(){
this.__data__=nativeCreate?nativeCreate(null):{};}


module.exports=hashClear;
}, "lodash/_hashClear.js");
__d(323 /* lodash/_nativeCreate.js */, function(global, require, module, exports) {var getNative=require(329 /* ./_getNative */);


var nativeCreate=getNative(Object,'create');

module.exports=nativeCreate;
}, "lodash/_nativeCreate.js");
__d(329 /* lodash/_getNative.js */, function(global, require, module, exports) {var isNative=require(343 /* ./isNative */);









function getNative(object,key){
var value=object[key];
return isNative(value)?value:undefined;}


module.exports=getNative;
}, "lodash/_getNative.js");
__d(343 /* lodash/isNative.js */, function(global, require, module, exports) {var isFunction=require(301 /* ./isFunction */),
isHostObject=require(330 /* ./_isHostObject */),
isObject=require(298 /* ./isObject */),
toSource=require(337 /* ./_toSource */);





var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;


var reIsHostCtor=/^\[object .+?Constructor\]$/;


var objectProto=Object.prototype;


var funcToString=Function.prototype.toString;


var hasOwnProperty=objectProto.hasOwnProperty;


var reIsNative=RegExp('^'+
funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').
replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');




















function isNative(value){
if(!isObject(value)){
return false;}

var pattern=isFunction(value)||isHostObject(value)?reIsNative:reIsHostCtor;
return pattern.test(toSource(value));}


module.exports=isNative;
}, "lodash/isNative.js");
__d(330 /* lodash/_isHostObject.js */, function(global, require, module, exports) {function 






isHostObject(value){


var result=false;
if(value!=null&&typeof value.toString!='function'){
try{
result=!!(value+'');}
catch(e){}}

return result;}


module.exports=isHostObject;
}, "lodash/_isHostObject.js");
__d(337 /* lodash/_toSource.js */, function(global, require, module, exports) {var 
funcToString=Function.prototype.toString;








function toSource(func){
if(func!=null){
try{
return funcToString.call(func);}
catch(e){}
try{
return func+'';}
catch(e){}}

return '';}


module.exports=toSource;
}, "lodash/_toSource.js");
__d(331 /* lodash/_hashDelete.js */, function(global, require, module, exports) {function 









hashDelete(key){
return this.has(key)&&delete this.__data__[key];}


module.exports=hashDelete;
}, "lodash/_hashDelete.js");
__d(335 /* lodash/_hashGet.js */, function(global, require, module, exports) {var nativeCreate=require(323 /* ./_nativeCreate */);


var HASH_UNDEFINED='__lodash_hash_undefined__';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;










function hashGet(key){
var data=this.__data__;
if(nativeCreate){
var result=data[key];
return result===HASH_UNDEFINED?undefined:result;}

return hasOwnProperty.call(data,key)?data[key]:undefined;}


module.exports=hashGet;
}, "lodash/_hashGet.js");
__d(341 /* lodash/_hashHas.js */, function(global, require, module, exports) {var nativeCreate=require(323 /* ./_nativeCreate */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;










function hashHas(key){
var data=this.__data__;
return nativeCreate?data[key]!==undefined:hasOwnProperty.call(data,key);}


module.exports=hashHas;
}, "lodash/_hashHas.js");
__d(338 /* lodash/_hashSet.js */, function(global, require, module, exports) {var nativeCreate=require(323 /* ./_nativeCreate */);


var HASH_UNDEFINED='__lodash_hash_undefined__';











function hashSet(key,value){
var data=this.__data__;
data[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;
return this;}


module.exports=hashSet;
}, "lodash/_hashSet.js");
__d(333 /* lodash/_Map.js */, function(global, require, module, exports) {var getNative=require(329 /* ./_getNative */),
root=require(350 /* ./_root */);


var Map=getNative(root,'Map');

module.exports=Map;
}, "lodash/_Map.js");
__d(350 /* lodash/_root.js */, function(global, require, module, exports) {var checkGlobal=require(334 /* ./_checkGlobal */);


var objectTypes={
'function':true,
'object':true};



var freeExports=objectTypes[typeof exports]&&exports&&!exports.nodeType?
exports:
undefined;


var freeModule=objectTypes[typeof module]&&module&&!module.nodeType?
module:
undefined;


var freeGlobal=checkGlobal(freeExports&&freeModule&&typeof global=='object'&&global);


var freeSelf=checkGlobal(objectTypes[typeof self]&&self);


var freeWindow=checkGlobal(objectTypes[typeof window]&&window);


var thisGlobal=checkGlobal(objectTypes[typeof this]&&this);







var root=freeGlobal||
freeWindow!==(thisGlobal&&thisGlobal.window)&&freeWindow||
freeSelf||thisGlobal||Function('return this')();

module.exports=root;
}, "lodash/_root.js");
__d(334 /* lodash/_checkGlobal.js */, function(global, require, module, exports) {function 






checkGlobal(value){
return value&&value.Object===Object?value:null;}


module.exports=checkGlobal;
}, "lodash/_checkGlobal.js");
__d(340 /* lodash/_mapCacheDelete.js */, function(global, require, module, exports) {var getMapData=require(339 /* ./_getMapData */);










function mapCacheDelete(key){
return getMapData(this,key)['delete'](key);}


module.exports=mapCacheDelete;
}, "lodash/_mapCacheDelete.js");
__d(339 /* lodash/_getMapData.js */, function(global, require, module, exports) {var isKeyable=require(345 /* ./_isKeyable */);









function getMapData(map,key){
var data=map.__data__;
return isKeyable(key)?
data[typeof key=='string'?'string':'hash']:
data.map;}


module.exports=getMapData;
}, "lodash/_getMapData.js");
__d(345 /* lodash/_isKeyable.js */, function(global, require, module, exports) {function 






isKeyable(value){
var type=typeof value;
return type=='string'||type=='number'||type=='symbol'||type=='boolean'?
value!=='__proto__':
value===null;}


module.exports=isKeyable;
}, "lodash/_isKeyable.js");
__d(344 /* lodash/_mapCacheGet.js */, function(global, require, module, exports) {var getMapData=require(339 /* ./_getMapData */);










function mapCacheGet(key){
return getMapData(this,key).get(key);}


module.exports=mapCacheGet;
}, "lodash/_mapCacheGet.js");
__d(355 /* lodash/_mapCacheHas.js */, function(global, require, module, exports) {var getMapData=require(339 /* ./_getMapData */);










function mapCacheHas(key){
return getMapData(this,key).has(key);}


module.exports=mapCacheHas;
}, "lodash/_mapCacheHas.js");
__d(342 /* lodash/_mapCacheSet.js */, function(global, require, module, exports) {var getMapData=require(339 /* ./_getMapData */);











function mapCacheSet(key,value){
getMapData(this,key).set(key,value);
return this;}


module.exports=mapCacheSet;
}, "lodash/_mapCacheSet.js");
__d(353 /* lodash/_baseIsEqual.js */, function(global, require, module, exports) {var baseIsEqualDeep=require(380 /* ./_baseIsEqualDeep */),
isObject=require(298 /* ./isObject */),
isObjectLike=require(296 /* ./isObjectLike */);
















function baseIsEqual(value,other,customizer,bitmask,stack){
if(value===other){
return true;}

if(value==null||other==null||!isObject(value)&&!isObjectLike(other)){
return value!==value&&other!==other;}

return baseIsEqualDeep(value,other,baseIsEqual,customizer,bitmask,stack);}


module.exports=baseIsEqual;
}, "lodash/_baseIsEqual.js");
__d(380 /* lodash/_baseIsEqualDeep.js */, function(global, require, module, exports) {var Stack=require(313 /* ./_Stack */),
equalArrays=require(374 /* ./_equalArrays */),
equalByTag=require(384 /* ./_equalByTag */),
equalObjects=require(391 /* ./_equalObjects */),
getTag=require(383 /* ./_getTag */),
isArray=require(297 /* ./isArray */),
isHostObject=require(330 /* ./_isHostObject */),
isTypedArray=require(377 /* ./isTypedArray */);


var PARTIAL_COMPARE_FLAG=2;


var argsTag='[object Arguments]',
arrayTag='[object Array]',
objectTag='[object Object]';


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;
















function baseIsEqualDeep(object,other,equalFunc,customizer,bitmask,stack){
var objIsArr=isArray(object),
othIsArr=isArray(other),
objTag=arrayTag,
othTag=arrayTag;

if(!objIsArr){
objTag=getTag(object);
objTag=objTag==argsTag?objectTag:objTag;}

if(!othIsArr){
othTag=getTag(other);
othTag=othTag==argsTag?objectTag:othTag;}

var objIsObj=objTag==objectTag&&!isHostObject(object),
othIsObj=othTag==objectTag&&!isHostObject(other),
isSameTag=objTag==othTag;

if(isSameTag&&!objIsObj){
stack||(stack=new Stack());
return objIsArr||isTypedArray(object)?
equalArrays(object,other,equalFunc,customizer,bitmask,stack):
equalByTag(object,other,objTag,equalFunc,customizer,bitmask,stack);}

if(!(bitmask&PARTIAL_COMPARE_FLAG)){
var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),
othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');

if(objIsWrapped||othIsWrapped){
var objUnwrapped=objIsWrapped?object.value():object,
othUnwrapped=othIsWrapped?other.value():other;

stack||(stack=new Stack());
return equalFunc(objUnwrapped,othUnwrapped,customizer,bitmask,stack);}}


if(!isSameTag){
return false;}

stack||(stack=new Stack());
return equalObjects(object,other,equalFunc,customizer,bitmask,stack);}


module.exports=baseIsEqualDeep;
}, "lodash/_baseIsEqualDeep.js");
__d(374 /* lodash/_equalArrays.js */, function(global, require, module, exports) {var SetCache=require(351 /* ./_SetCache */),
arraySome=require(349 /* ./_arraySome */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;















function equalArrays(array,other,equalFunc,customizer,bitmask,stack){
var isPartial=bitmask&PARTIAL_COMPARE_FLAG,
arrLength=array.length,
othLength=other.length;

if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){
return false;}


var stacked=stack.get(array);
if(stacked){
return stacked==other;}

var index=-1,
result=true,
seen=bitmask&UNORDERED_COMPARE_FLAG?new SetCache():undefined;

stack.set(array,other);


while(++index<arrLength){
var arrValue=array[index],
othValue=other[index];

if(customizer){
var compared=isPartial?
customizer(othValue,arrValue,index,other,array,stack):
customizer(arrValue,othValue,index,array,other,stack);}

if(compared!==undefined){
if(compared){
continue;}

result=false;
break;}


if(seen){
if(!arraySome(other,function(othValue,othIndex){
if(!seen.has(othIndex)&&(
arrValue===othValue||equalFunc(arrValue,othValue,customizer,bitmask,stack))){
return seen.add(othIndex);}}))

{
result=false;
break;}}else 

if(!(
arrValue===othValue||
equalFunc(arrValue,othValue,customizer,bitmask,stack)))
{
result=false;
break;}}


stack['delete'](array);
return result;}


module.exports=equalArrays;
}, "lodash/_equalArrays.js");
__d(351 /* lodash/_SetCache.js */, function(global, require, module, exports) {var MapCache=require(336 /* ./_MapCache */),
setCacheAdd=require(347 /* ./_setCacheAdd */),
setCacheHas=require(346 /* ./_setCacheHas */);









function SetCache(values){
var index=-1,
length=values?values.length:0;

this.__data__=new MapCache();
while(++index<length){
this.add(values[index]);}}




SetCache.prototype.add=SetCache.prototype.push=setCacheAdd;
SetCache.prototype.has=setCacheHas;

module.exports=SetCache;
}, "lodash/_SetCache.js");
__d(347 /* lodash/_setCacheAdd.js */, function(global, require, module, exports) {var 
HASH_UNDEFINED='__lodash_hash_undefined__';











function setCacheAdd(value){
this.__data__.set(value,HASH_UNDEFINED);
return this;}


module.exports=setCacheAdd;
}, "lodash/_setCacheAdd.js");
__d(346 /* lodash/_setCacheHas.js */, function(global, require, module, exports) {function 








setCacheHas(value){
return this.__data__.has(value);}


module.exports=setCacheHas;
}, "lodash/_setCacheHas.js");
__d(349 /* lodash/_arraySome.js */, function(global, require, module, exports) {function 









arraySome(array,predicate){
var index=-1,
length=array.length;

while(++index<length){
if(predicate(array[index],index,array)){
return true;}}


return false;}


module.exports=arraySome;
}, "lodash/_arraySome.js");
__d(384 /* lodash/_equalByTag.js */, function(global, require, module, exports) {var Symbol=require(348 /* ./_Symbol */),
Uint8Array=require(352 /* ./_Uint8Array */),
equalArrays=require(374 /* ./_equalArrays */),
mapToArray=require(359 /* ./_mapToArray */),
setToArray=require(360 /* ./_setToArray */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;


var boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
mapTag='[object Map]',
numberTag='[object Number]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
symbolTag='[object Symbol]';

var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]';


var symbolProto=Symbol?typeof Symbol==='function'?Symbol.prototype:'@@prototype':undefined,
symbolValueOf=symbolProto?symbolProto.valueOf:undefined;



















function equalByTag(object,other,tag,equalFunc,customizer,bitmask,stack){
switch(tag){
case dataViewTag:
if(object.byteLength!=other.byteLength||
object.byteOffset!=other.byteOffset){
return false;}

object=object.buffer;
other=other.buffer;

case arrayBufferTag:
if(object.byteLength!=other.byteLength||
!equalFunc(new Uint8Array(object),new Uint8Array(other))){
return false;}

return true;

case boolTag:
case dateTag:



return +object==+other;

case errorTag:
return object.name==other.name&&object.message==other.message;

case numberTag:

return object!=+object?other!=+other:object==+other;

case regexpTag:
case stringTag:



return object==other+'';

case mapTag:
var convert=mapToArray;

case setTag:
var isPartial=bitmask&PARTIAL_COMPARE_FLAG;
convert||(convert=setToArray);

if(object.size!=other.size&&!isPartial){
return false;}


var stacked=stack.get(object);
if(stacked){
return stacked==other;}

bitmask|=UNORDERED_COMPARE_FLAG;
stack.set(object,other);


return equalArrays(convert(object),convert(other),equalFunc,customizer,bitmask,stack);

case symbolTag:
if(symbolValueOf){
return symbolValueOf.call(object)==symbolValueOf.call(other);}}


return false;}


module.exports=equalByTag;
}, "lodash/_equalByTag.js");
__d(348 /* lodash/_Symbol.js */, function(global, require, module, exports) {var root=require(350 /* ./_root */);


var Symbol=root.Symbol;

module.exports=Symbol;
}, "lodash/_Symbol.js");
__d(352 /* lodash/_Uint8Array.js */, function(global, require, module, exports) {var root=require(350 /* ./_root */);


var Uint8Array=root.Uint8Array;

module.exports=Uint8Array;
}, "lodash/_Uint8Array.js");
__d(359 /* lodash/_mapToArray.js */, function(global, require, module, exports) {function 






mapToArray(map){
var index=-1,
result=Array(map.size);

map.forEach(function(value,key){
result[++index]=[key,value];});

return result;}


module.exports=mapToArray;
}, "lodash/_mapToArray.js");
__d(360 /* lodash/_setToArray.js */, function(global, require, module, exports) {function 






setToArray(set){
var index=-1,
result=Array(set.size);

set.forEach(function(value){
result[++index]=value;});

return result;}


module.exports=setToArray;
}, "lodash/_setToArray.js");
__d(391 /* lodash/_equalObjects.js */, function(global, require, module, exports) {var baseHas=require(282 /* ./_baseHas */),
keys=require(293 /* ./keys */);


var PARTIAL_COMPARE_FLAG=2;















function equalObjects(object,other,equalFunc,customizer,bitmask,stack){
var isPartial=bitmask&PARTIAL_COMPARE_FLAG,
objProps=keys(object),
objLength=objProps.length,
othProps=keys(other),
othLength=othProps.length;

if(objLength!=othLength&&!isPartial){
return false;}

var index=objLength;
while(index--){
var key=objProps[index];
if(!(isPartial?key in other:baseHas(other,key))){
return false;}}



var stacked=stack.get(object);
if(stacked){
return stacked==other;}

var result=true;
stack.set(object,other);

var skipCtor=isPartial;
while(++index<objLength){
key=objProps[index];
var objValue=object[key],
othValue=other[key];

if(customizer){
var compared=isPartial?
customizer(othValue,objValue,key,other,object,stack):
customizer(objValue,othValue,key,object,other,stack);}


if(!(compared===undefined?
objValue===othValue||equalFunc(objValue,othValue,customizer,bitmask,stack):
compared))
{
result=false;
break;}

skipCtor||(skipCtor=key=='constructor');}

if(result&&!skipCtor){
var objCtor=object.constructor,
othCtor=other.constructor;


if(objCtor!=othCtor&&
'constructor' in object&&'constructor' in other&&
!(typeof objCtor=='function'&&objCtor instanceof objCtor&&
typeof othCtor=='function'&&othCtor instanceof othCtor)){
result=false;}}


stack['delete'](object);
return result;}


module.exports=equalObjects;
}, "lodash/_equalObjects.js");
__d(383 /* lodash/_getTag.js */, function(global, require, module, exports) {var DataView=require(361 /* ./_DataView */),
Map=require(333 /* ./_Map */),
Promise=require(356 /* ./_Promise */),
Set=require(358 /* ./_Set */),
WeakMap=require(357 /* ./_WeakMap */),
toSource=require(337 /* ./_toSource */);


var mapTag='[object Map]',
objectTag='[object Object]',
promiseTag='[object Promise]',
setTag='[object Set]',
weakMapTag='[object WeakMap]';

var dataViewTag='[object DataView]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;


var dataViewCtorString=toSource(DataView),
mapCtorString=toSource(Map),
promiseCtorString=toSource(Promise),
setCtorString=toSource(Set),
weakMapCtorString=toSource(WeakMap);








function getTag(value){
return objectToString.call(value);}




if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||
Map&&getTag(new Map())!=mapTag||
Promise&&getTag(Promise.resolve())!=promiseTag||
Set&&getTag(new Set())!=setTag||
WeakMap&&getTag(new WeakMap())!=weakMapTag){
getTag=function getTag(value){
var result=objectToString.call(value),
Ctor=result==objectTag?value.constructor:undefined,
ctorString=Ctor?toSource(Ctor):undefined;

if(ctorString){
switch(ctorString){
case dataViewCtorString:return dataViewTag;
case mapCtorString:return mapTag;
case promiseCtorString:return promiseTag;
case setCtorString:return setTag;
case weakMapCtorString:return weakMapTag;}}


return result;};}



module.exports=getTag;
}, "lodash/_getTag.js");
__d(361 /* lodash/_DataView.js */, function(global, require, module, exports) {var getNative=require(329 /* ./_getNative */),
root=require(350 /* ./_root */);


var DataView=getNative(root,'DataView');

module.exports=DataView;
}, "lodash/_DataView.js");
__d(356 /* lodash/_Promise.js */, function(global, require, module, exports) {var getNative=require(329 /* ./_getNative */),
root=require(350 /* ./_root */);


var Promise=getNative(root,'Promise');

module.exports=Promise;
}, "lodash/_Promise.js");
__d(358 /* lodash/_Set.js */, function(global, require, module, exports) {var getNative=require(329 /* ./_getNative */),
root=require(350 /* ./_root */);


var Set=getNative(root,'Set');

module.exports=Set;
}, "lodash/_Set.js");
__d(357 /* lodash/_WeakMap.js */, function(global, require, module, exports) {var getNative=require(329 /* ./_getNative */),
root=require(350 /* ./_root */);


var WeakMap=getNative(root,'WeakMap');

module.exports=WeakMap;
}, "lodash/_WeakMap.js");
__d(377 /* lodash/isTypedArray.js */, function(global, require, module, exports) {var isLength=require(302 /* ./isLength */),
isObjectLike=require(296 /* ./isObjectLike */);


var argsTag='[object Arguments]',
arrayTag='[object Array]',
boolTag='[object Boolean]',
dateTag='[object Date]',
errorTag='[object Error]',
funcTag='[object Function]',
mapTag='[object Map]',
numberTag='[object Number]',
objectTag='[object Object]',
regexpTag='[object RegExp]',
setTag='[object Set]',
stringTag='[object String]',
weakMapTag='[object WeakMap]';

var arrayBufferTag='[object ArrayBuffer]',
dataViewTag='[object DataView]',
float32Tag='[object Float32Array]',
float64Tag='[object Float64Array]',
int8Tag='[object Int8Array]',
int16Tag='[object Int16Array]',
int32Tag='[object Int32Array]',
uint8Tag='[object Uint8Array]',
uint8ClampedTag='[object Uint8ClampedArray]',
uint16Tag='[object Uint16Array]',
uint32Tag='[object Uint32Array]';


var typedArrayTags={};
typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=
typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=
typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=
typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=
typedArrayTags[uint32Tag]=true;
typedArrayTags[argsTag]=typedArrayTags[arrayTag]=
typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=
typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=
typedArrayTags[errorTag]=typedArrayTags[funcTag]=
typedArrayTags[mapTag]=typedArrayTags[numberTag]=
typedArrayTags[objectTag]=typedArrayTags[regexpTag]=
typedArrayTags[setTag]=typedArrayTags[stringTag]=
typedArrayTags[weakMapTag]=false;


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isTypedArray(value){
return isObjectLike(value)&&
isLength(value.length)&&!!typedArrayTags[objectToString.call(value)];}


module.exports=isTypedArray;
}, "lodash/isTypedArray.js");
__d(365 /* lodash/_getMatchData.js */, function(global, require, module, exports) {var isStrictComparable=require(362 /* ./_isStrictComparable */),
toPairs=require(363 /* ./toPairs */);








function getMatchData(object){
var result=toPairs(object),
length=result.length;

while(length--){
result[length][2]=isStrictComparable(result[length][1]);}

return result;}


module.exports=getMatchData;
}, "lodash/_getMatchData.js");
__d(362 /* lodash/_isStrictComparable.js */, function(global, require, module, exports) {var isObject=require(298 /* ./isObject */);









function isStrictComparable(value){
return value===value&&!isObject(value);}


module.exports=isStrictComparable;
}, "lodash/_isStrictComparable.js");
__d(363 /* lodash/toPairs.js */, function(global, require, module, exports) {var createToPairs=require(370 /* ./_createToPairs */),
keys=require(293 /* ./keys */);

























var toPairs=createToPairs(keys);

module.exports=toPairs;
}, "lodash/toPairs.js");
__d(370 /* lodash/_createToPairs.js */, function(global, require, module, exports) {var baseToPairs=require(364 /* ./_baseToPairs */),
getTag=require(383 /* ./_getTag */),
mapToArray=require(359 /* ./_mapToArray */),
setToPairs=require(366 /* ./_setToPairs */);


var mapTag='[object Map]',
setTag='[object Set]';








function createToPairs(keysFunc){
return function(object){
var tag=getTag(object);
if(tag==mapTag){
return mapToArray(object);}

if(tag==setTag){
return setToPairs(object);}

return baseToPairs(object,keysFunc(object));};}



module.exports=createToPairs;
}, "lodash/_createToPairs.js");
__d(364 /* lodash/_baseToPairs.js */, function(global, require, module, exports) {var arrayMap=require(369 /* ./_arrayMap */);










function baseToPairs(object,props){
return arrayMap(props,function(key){
return [key,object[key]];});}



module.exports=baseToPairs;
}, "lodash/_baseToPairs.js");
__d(369 /* lodash/_arrayMap.js */, function(global, require, module, exports) {function 








arrayMap(array,iteratee){
var index=-1,
length=array.length,
result=Array(length);

while(++index<length){
result[index]=iteratee(array[index],index,array);}

return result;}


module.exports=arrayMap;
}, "lodash/_arrayMap.js");
__d(366 /* lodash/_setToPairs.js */, function(global, require, module, exports) {function 






setToPairs(set){
var index=-1,
result=Array(set.size);

set.forEach(function(value){
result[++index]=[value,value];});

return result;}


module.exports=setToPairs;
}, "lodash/_setToPairs.js");
__d(367 /* lodash/_matchesStrictComparable.js */, function(global, require, module, exports) {function 








matchesStrictComparable(key,srcValue){
return function(object){
if(object==null){
return false;}

return object[key]===srcValue&&(
srcValue!==undefined||key in Object(object));};}



module.exports=matchesStrictComparable;
}, "lodash/_matchesStrictComparable.js");
__d(375 /* lodash/_baseMatchesProperty.js */, function(global, require, module, exports) {var baseIsEqual=require(353 /* ./_baseIsEqual */),
get=require(368 /* ./get */),
hasIn=require(381 /* ./hasIn */),
isKey=require(393 /* ./_isKey */),
isStrictComparable=require(362 /* ./_isStrictComparable */),
matchesStrictComparable=require(367 /* ./_matchesStrictComparable */),
toKey=require(385 /* ./_toKey */);


var UNORDERED_COMPARE_FLAG=1,
PARTIAL_COMPARE_FLAG=2;









function baseMatchesProperty(path,srcValue){
if(isKey(path)&&isStrictComparable(srcValue)){
return matchesStrictComparable(toKey(path),srcValue);}

return function(object){
var objValue=get(object,path);
return objValue===undefined&&objValue===srcValue?
hasIn(object,path):
baseIsEqual(srcValue,objValue,undefined,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG);};}



module.exports=baseMatchesProperty;
}, "lodash/_baseMatchesProperty.js");
__d(368 /* lodash/get.js */, function(global, require, module, exports) {var baseGet=require(371 /* ./_baseGet */);


























function get(object,path,defaultValue){
var result=object==null?undefined:baseGet(object,path);
return result===undefined?defaultValue:result;}


module.exports=get;
}, "lodash/get.js");
__d(371 /* lodash/_baseGet.js */, function(global, require, module, exports) {var castPath=require(372 /* ./_castPath */),
isKey=require(393 /* ./_isKey */),
toKey=require(385 /* ./_toKey */);









function baseGet(object,path){
path=isKey(path,object)?[path]:castPath(path);

var index=0,
length=path.length;

while(object!=null&&index<length){
object=object[toKey(path[index++])];}

return index&&index==length?object:undefined;}


module.exports=baseGet;
}, "lodash/_baseGet.js");
__d(372 /* lodash/_castPath.js */, function(global, require, module, exports) {var isArray=require(297 /* ./isArray */),
stringToPath=require(378 /* ./_stringToPath */);








function castPath(value){
return isArray(value)?value:stringToPath(value);}


module.exports=castPath;
}, "lodash/_castPath.js");
__d(378 /* lodash/_stringToPath.js */, function(global, require, module, exports) {var memoize=require(379 /* ./memoize */),
toString=require(373 /* ./toString */);


var rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;


var reEscapeChar=/\\(\\)?/g;








var stringToPath=memoize(function(string){
var result=[];
toString(string).replace(rePropName,function(match,number,quote,string){
result.push(quote?string.replace(reEscapeChar,'$1'):number||match);});

return result;});


module.exports=stringToPath;
}, "lodash/_stringToPath.js");
__d(379 /* lodash/memoize.js */, function(global, require, module, exports) {var MapCache=require(336 /* ./_MapCache */);


var FUNC_ERROR_TEXT='Expected a function';













































function memoize(func,resolver){
if(typeof func!='function'||resolver&&typeof resolver!='function'){
throw new TypeError(FUNC_ERROR_TEXT);}

var memoized=function memoized(){
var args=arguments,
key=resolver?resolver.apply(this,args):args[0],
cache=memoized.cache;

if(cache.has(key)){
return cache.get(key);}

var result=func.apply(this,args);
memoized.cache=cache.set(key,result);
return result;};

memoized.cache=new (memoize.Cache||MapCache)();
return memoized;}



memoize.Cache=MapCache;

module.exports=memoize;
}, "lodash/memoize.js");
__d(373 /* lodash/toString.js */, function(global, require, module, exports) {var baseToString=require(389 /* ./_baseToString */);






















function toString(value){
return value==null?'':baseToString(value);}


module.exports=toString;
}, "lodash/toString.js");
__d(389 /* lodash/_baseToString.js */, function(global, require, module, exports) {var Symbol=require(348 /* ./_Symbol */),
isSymbol=require(376 /* ./isSymbol */);


var INFINITY=1/0;


var symbolProto=Symbol?typeof Symbol==='function'?Symbol.prototype:'@@prototype':undefined,
symbolToString=symbolProto?symbolProto.toString:undefined;









function baseToString(value){

if(typeof value=='string'){
return value;}

if(isSymbol(value)){
return symbolToString?symbolToString.call(value):'';}

var result=value+'';
return result=='0'&&1/value==-INFINITY?'-0':result;}


module.exports=baseToString;
}, "lodash/_baseToString.js");
__d(376 /* lodash/isSymbol.js */, function(global, require, module, exports) {var isObjectLike=require(296 /* ./isObjectLike */);


var symbolTag='[object Symbol]';


var objectProto=Object.prototype;






var objectToString=objectProto.toString;



















function isSymbol(value){
return typeof value=='symbol'||
isObjectLike(value)&&objectToString.call(value)==symbolTag;}


module.exports=isSymbol;
}, "lodash/isSymbol.js");
__d(393 /* lodash/_isKey.js */, function(global, require, module, exports) {var isArray=require(297 /* ./isArray */),
isSymbol=require(376 /* ./isSymbol */);


var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
reIsPlainProp=/^\w*$/;









function isKey(value,object){
if(isArray(value)){
return false;}

var type=typeof value;
if(type=='number'||type=='symbol'||type=='boolean'||
value==null||isSymbol(value)){
return true;}

return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||
object!=null&&value in Object(object);}


module.exports=isKey;
}, "lodash/_isKey.js");
__d(385 /* lodash/_toKey.js */, function(global, require, module, exports) {var isSymbol=require(376 /* ./isSymbol */);


var INFINITY=1/0;








function toKey(value){
if(typeof value=='string'||isSymbol(value)){
return value;}

var result=value+'';
return result=='0'&&1/value==-INFINITY?'-0':result;}


module.exports=toKey;
}, "lodash/_toKey.js");
__d(381 /* lodash/hasIn.js */, function(global, require, module, exports) {var baseHasIn=require(382 /* ./_baseHasIn */),
hasPath=require(396 /* ./_hasPath */);



























function hasIn(object,path){
return object!=null&&hasPath(object,path,baseHasIn);}


module.exports=hasIn;
}, "lodash/hasIn.js");
__d(382 /* lodash/_baseHasIn.js */, function(global, require, module, exports) {function 







baseHasIn(object,key){
return key in Object(object);}


module.exports=baseHasIn;
}, "lodash/_baseHasIn.js");
__d(396 /* lodash/_hasPath.js */, function(global, require, module, exports) {var castPath=require(372 /* ./_castPath */),
isArguments=require(288 /* ./isArguments */),
isArray=require(297 /* ./isArray */),
isIndex=require(304 /* ./_isIndex */),
isKey=require(393 /* ./_isKey */),
isLength=require(302 /* ./isLength */),
isString=require(306 /* ./isString */),
toKey=require(385 /* ./_toKey */);










function hasPath(object,path,hasFunc){
path=isKey(path,object)?[path]:castPath(path);

var result,
index=-1,
length=path.length;

while(++index<length){
var key=toKey(path[index]);
if(!(result=object!=null&&hasFunc(object,key))){
break;}

object=object[key];}

if(result){
return result;}

var length=object?object.length:0;
return !!length&&isLength(length)&&isIndex(key,length)&&(
isArray(object)||isString(object)||isArguments(object));}


module.exports=hasPath;
}, "lodash/_hasPath.js");
__d(386 /* lodash/identity.js */, function(global, require, module, exports) {function 















identity(value){
return value;}


module.exports=identity;
}, "lodash/identity.js");
__d(388 /* lodash/property.js */, function(global, require, module, exports) {var baseProperty=require(299 /* ./_baseProperty */),
basePropertyDeep=require(387 /* ./_basePropertyDeep */),
isKey=require(393 /* ./_isKey */),
toKey=require(385 /* ./_toKey */);























function property(path){
return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path);}


module.exports=property;
}, "lodash/property.js");
__d(387 /* lodash/_basePropertyDeep.js */, function(global, require, module, exports) {var baseGet=require(371 /* ./_baseGet */);








function basePropertyDeep(path){
return function(object){
return baseGet(object,path);};}



module.exports=basePropertyDeep;
}, "lodash/_basePropertyDeep.js");
__d(429 /* react-proxy/modules/createPrototypeProxy.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=createPrototypeProxy;

var _assign=require(401 /* lodash/assign */);

var _assign2=_interopRequireDefault(_assign);

var _difference=require(399 /* lodash/difference */);

var _difference2=_interopRequireDefault(_difference);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function createPrototypeProxy(){
var proxy={};
var current=null;
var mountedInstances=[];




function proxyToString(name){

return function toString(){
if(typeof current[name]==='function'){
return current[name].toString();}else 
{
return '<method was deleted>';}};}







function proxyMethod(name){

var proxiedMethod=function proxiedMethod(){
if(typeof current[name]==='function'){
return current[name].apply(this,arguments);}};




(0,_assign2.default)(proxiedMethod,current[name]);
proxiedMethod.toString=proxyToString(name);

return proxiedMethod;}





function proxiedComponentDidMount(){
mountedInstances.push(this);
if(typeof current.componentDidMount==='function'){
return current.componentDidMount.apply(this,arguments);}}


proxiedComponentDidMount.toString=proxyToString('componentDidMount');




function proxiedComponentWillUnmount(){
var index=mountedInstances.indexOf(this);

if(index!==-1){
mountedInstances.splice(index,1);}

if(typeof current.componentWillUnmount==='function'){
return current.componentWillUnmount.apply(this,arguments);}}


proxiedComponentWillUnmount.toString=proxyToString('componentWillUnmount');




function defineProxyProperty(name,descriptor){
Object.defineProperty(proxy,name,descriptor);}





function defineProxyPropertyWithValue(name,value){
var _ref=Object.getOwnPropertyDescriptor(current,name)||{};

var _ref$enumerable=_ref.enumerable;
var enumerable=_ref$enumerable===undefined?false:_ref$enumerable;
var _ref$writable=_ref.writable;
var writable=_ref$writable===undefined?true:_ref$writable;


defineProxyProperty(name,{
configurable:true,
enumerable:enumerable,
writable:writable,
value:value});}






function createAutoBindMap(){
if(!current.__reactAutoBindMap){
return;}


var __reactAutoBindMap={};
for(var name in current.__reactAutoBindMap){
if(typeof proxy[name]==='function'&&current.__reactAutoBindMap.hasOwnProperty(name)){
__reactAutoBindMap[name]=proxy[name];}}



return __reactAutoBindMap;}





function createAutoBindPairs(){
var __reactAutoBindPairs=[];

for(var i=0;i<current.__reactAutoBindPairs.length;i+=2){
var name=current.__reactAutoBindPairs[i];
var method=proxy[name];

if(typeof method==='function'){
__reactAutoBindPairs.push(name,method);}}



return __reactAutoBindPairs;}





function update(next){

current=next;


var currentNames=Object.getOwnPropertyNames(current);
var previousName=Object.getOwnPropertyNames(proxy);
var removedNames=(0,_difference2.default)(previousName,currentNames);


removedNames.forEach(function(name){
delete proxy[name];});



currentNames.forEach(function(name){
var descriptor=Object.getOwnPropertyDescriptor(current,name);
if(typeof descriptor.value==='function'){

defineProxyPropertyWithValue(name,proxyMethod(name));}else 
{

defineProxyProperty(name,descriptor);}});




defineProxyPropertyWithValue('componentDidMount',proxiedComponentDidMount);
defineProxyPropertyWithValue('componentWillUnmount',proxiedComponentWillUnmount);

if(current.hasOwnProperty('__reactAutoBindMap')){
defineProxyPropertyWithValue('__reactAutoBindMap',createAutoBindMap());}


if(current.hasOwnProperty('__reactAutoBindPairs')){
defineProxyPropertyWithValue('__reactAutoBindPairs',createAutoBindPairs());}



proxy.__proto__=next;

return mountedInstances;}





function get(){
return proxy;}


return {
update:update,
get:get};}

;
}, "react-proxy/modules/createPrototypeProxy.js");
__d(401 /* lodash/assign.js */, function(global, require, module, exports) {var assignValue=require(390 /* ./_assignValue */),
copyObject=require(394 /* ./_copyObject */),
createAssigner=require(400 /* ./_createAssigner */),
isArrayLike=require(294 /* ./isArrayLike */),
isPrototype=require(309 /* ./_isPrototype */),
keys=require(293 /* ./keys */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;


var propertyIsEnumerable=objectProto.propertyIsEnumerable;


var nonEnumShadows=!propertyIsEnumerable.call({'valueOf':1},'valueOf');

































var assign=createAssigner(function(object,source){
if(nonEnumShadows||isPrototype(source)||isArrayLike(source)){
copyObject(source,keys(source),object);
return;}

for(var key in source){
if(hasOwnProperty.call(source,key)){
assignValue(object,key,source[key]);}}});




module.exports=assign;
}, "lodash/assign.js");
__d(390 /* lodash/_assignValue.js */, function(global, require, module, exports) {var eq=require(312 /* ./eq */);


var objectProto=Object.prototype;


var hasOwnProperty=objectProto.hasOwnProperty;











function assignValue(object,key,value){
var objValue=object[key];
if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||
value===undefined&&!(key in object)){
object[key]=value;}}



module.exports=assignValue;
}, "lodash/_assignValue.js");
__d(394 /* lodash/_copyObject.js */, function(global, require, module, exports) {var assignValue=require(390 /* ./_assignValue */);











function copyObject(source,props,object,customizer){
object||(object={});

var index=-1,
length=props.length;

while(++index<length){
var key=props[index];

var newValue=customizer?
customizer(object[key],source[key],key,object,source):
source[key];

assignValue(object,key,newValue);}

return object;}


module.exports=copyObject;
}, "lodash/_copyObject.js");
__d(400 /* lodash/_createAssigner.js */, function(global, require, module, exports) {var isIterateeCall=require(397 /* ./_isIterateeCall */),
rest=require(405 /* ./rest */);








function createAssigner(assigner){
return rest(function(object,sources){
var index=-1,
length=sources.length,
customizer=length>1?sources[length-1]:undefined,
guard=length>2?sources[2]:undefined;

customizer=assigner.length>3&&typeof customizer=='function'?(
length--,customizer):
undefined;

if(guard&&isIterateeCall(sources[0],sources[1],guard)){
customizer=length<3?undefined:customizer;
length=1;}

object=Object(object);
while(++index<length){
var source=sources[index];
if(source){
assigner(object,source,index,customizer);}}


return object;});}



module.exports=createAssigner;
}, "lodash/_createAssigner.js");
__d(397 /* lodash/_isIterateeCall.js */, function(global, require, module, exports) {var eq=require(312 /* ./eq */),
isArrayLike=require(294 /* ./isArrayLike */),
isIndex=require(304 /* ./_isIndex */),
isObject=require(298 /* ./isObject */);











function isIterateeCall(value,index,object){
if(!isObject(object)){
return false;}

var type=typeof index;
if(type=='number'?
isArrayLike(object)&&isIndex(index,object.length):
type=='string'&&index in object)
{
return eq(object[index],value);}

return false;}


module.exports=isIterateeCall;
}, "lodash/_isIterateeCall.js");
__d(405 /* lodash/rest.js */, function(global, require, module, exports) {var apply=require(392 /* ./_apply */),
toInteger=require(395 /* ./toInteger */);


var FUNC_ERROR_TEXT='Expected a function';


var nativeMax=Math.max;


























function rest(func,start){
if(typeof func!='function'){
throw new TypeError(FUNC_ERROR_TEXT);}

start=nativeMax(start===undefined?func.length-1:toInteger(start),0);
return function(){
var args=arguments,
index=-1,
length=nativeMax(args.length-start,0),
array=Array(length);

while(++index<length){
array[index]=args[start+index];}

switch(start){
case 0:return func.call(this,array);
case 1:return func.call(this,args[0],array);
case 2:return func.call(this,args[0],args[1],array);}

var otherArgs=Array(start+1);
index=-1;
while(++index<start){
otherArgs[index]=args[index];}

otherArgs[start]=array;
return apply(func,this,otherArgs);};}



module.exports=rest;
}, "lodash/rest.js");
__d(392 /* lodash/_apply.js */, function(global, require, module, exports) {function 









apply(func,thisArg,args){
var length=args.length;
switch(length){
case 0:return func.call(thisArg);
case 1:return func.call(thisArg,args[0]);
case 2:return func.call(thisArg,args[0],args[1]);
case 3:return func.call(thisArg,args[0],args[1],args[2]);}

return func.apply(thisArg,args);}


module.exports=apply;
}, "lodash/_apply.js");
__d(395 /* lodash/toInteger.js */, function(global, require, module, exports) {var toFinite=require(398 /* ./toFinite */);



























function toInteger(value){
var result=toFinite(value),
remainder=result%1;

return result===result?remainder?result-remainder:result:0;}


module.exports=toInteger;
}, "lodash/toInteger.js");
__d(398 /* lodash/toFinite.js */, function(global, require, module, exports) {var toNumber=require(414 /* ./toNumber */);


var INFINITY=1/0,
MAX_INTEGER=1.7976931348623157e+308;
























function toFinite(value){
if(!value){
return value===0?value:0;}

value=toNumber(value);
if(value===INFINITY||value===-INFINITY){
var sign=value<0?-1:1;
return sign*MAX_INTEGER;}

return value===value?value:0;}


module.exports=toFinite;
}, "lodash/toFinite.js");
__d(414 /* lodash/toNumber.js */, function(global, require, module, exports) {var isFunction=require(301 /* ./isFunction */),
isObject=require(298 /* ./isObject */),
isSymbol=require(376 /* ./isSymbol */);


var NAN=0/0;


var reTrim=/^\s+|\s+$/g;


var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;


var reIsBinary=/^0b[01]+$/i;


var reIsOctal=/^0o[0-7]+$/i;


var freeParseInt=parseInt;
























function toNumber(value){
if(typeof value=='number'){
return value;}

if(isSymbol(value)){
return NAN;}

if(isObject(value)){
var other=isFunction(value.valueOf)?value.valueOf():value;
value=isObject(other)?other+'':other;}

if(typeof value!='string'){
return value===0?value:+value;}

value=value.replace(reTrim,'');
var isBinary=reIsBinary.test(value);
return isBinary||reIsOctal.test(value)?
freeParseInt(value.slice(2),isBinary?2:8):
reIsBadHex.test(value)?NAN:+value;}


module.exports=toNumber;
}, "lodash/toNumber.js");
__d(399 /* lodash/difference.js */, function(global, require, module, exports) {var baseDifference=require(418 /* ./_baseDifference */),
baseFlatten=require(411 /* ./_baseFlatten */),
isArrayLikeObject=require(289 /* ./isArrayLikeObject */),
rest=require(405 /* ./rest */);




















var difference=rest(function(array,values){
return isArrayLikeObject(array)?
baseDifference(array,baseFlatten(values,1,isArrayLikeObject,true)):
[];});


module.exports=difference;
}, "lodash/difference.js");
__d(418 /* lodash/_baseDifference.js */, function(global, require, module, exports) {var SetCache=require(351 /* ./_SetCache */),
arrayIncludes=require(410 /* ./_arrayIncludes */),
arrayIncludesWith=require(403 /* ./_arrayIncludesWith */),
arrayMap=require(369 /* ./_arrayMap */),
baseUnary=require(404 /* ./_baseUnary */),
cacheHas=require(407 /* ./_cacheHas */);


var LARGE_ARRAY_SIZE=200;












function baseDifference(array,values,iteratee,comparator){
var index=-1,
includes=arrayIncludes,
isCommon=true,
length=array.length,
result=[],
valuesLength=values.length;

if(!length){
return result;}

if(iteratee){
values=arrayMap(values,baseUnary(iteratee));}

if(comparator){
includes=arrayIncludesWith;
isCommon=false;}else 

if(values.length>=LARGE_ARRAY_SIZE){
includes=cacheHas;
isCommon=false;
values=new SetCache(values);}

outer: 
while(++index<length){
var value=array[index],
computed=iteratee?iteratee(value):value;

value=comparator||value!==0?value:0;
if(isCommon&&computed===computed){
var valuesIndex=valuesLength;
while(valuesIndex--){
if(values[valuesIndex]===computed){
continue outer;}}


result.push(value);}else 

if(!includes(values,computed,comparator)){
result.push(value);}}


return result;}


module.exports=baseDifference;
}, "lodash/_baseDifference.js");
__d(410 /* lodash/_arrayIncludes.js */, function(global, require, module, exports) {var baseIndexOf=require(406 /* ./_baseIndexOf */);










function arrayIncludes(array,value){
return !!array.length&&baseIndexOf(array,value,0)>-1;}


module.exports=arrayIncludes;
}, "lodash/_arrayIncludes.js");
__d(406 /* lodash/_baseIndexOf.js */, function(global, require, module, exports) {var indexOfNaN=require(402 /* ./_indexOfNaN */);










function baseIndexOf(array,value,fromIndex){
if(value!==value){
return indexOfNaN(array,fromIndex);}

var index=fromIndex-1,
length=array.length;

while(++index<length){
if(array[index]===value){
return index;}}


return -1;}


module.exports=baseIndexOf;
}, "lodash/_baseIndexOf.js");
__d(402 /* lodash/_indexOfNaN.js */, function(global, require, module, exports) {function 








indexOfNaN(array,fromIndex,fromRight){
var length=array.length,
index=fromIndex+(fromRight?0:-1);

while(fromRight?index--:++index<length){
var other=array[index];
if(other!==other){
return index;}}


return -1;}


module.exports=indexOfNaN;
}, "lodash/_indexOfNaN.js");
__d(403 /* lodash/_arrayIncludesWith.js */, function(global, require, module, exports) {function 








arrayIncludesWith(array,value,comparator){
var index=-1,
length=array.length;

while(++index<length){
if(comparator(value,array[index])){
return true;}}


return false;}


module.exports=arrayIncludesWith;
}, "lodash/_arrayIncludesWith.js");
__d(404 /* lodash/_baseUnary.js */, function(global, require, module, exports) {function 






baseUnary(func){
return function(value){
return func(value);};}



module.exports=baseUnary;
}, "lodash/_baseUnary.js");
__d(407 /* lodash/_cacheHas.js */, function(global, require, module, exports) {function 







cacheHas(cache,key){
return cache.has(key);}


module.exports=cacheHas;
}, "lodash/_cacheHas.js");
__d(411 /* lodash/_baseFlatten.js */, function(global, require, module, exports) {var arrayPush=require(408 /* ./_arrayPush */),
isFlattenable=require(409 /* ./_isFlattenable */);












function baseFlatten(array,depth,predicate,isStrict,result){
var index=-1,
length=array.length;

predicate||(predicate=isFlattenable);
result||(result=[]);

while(++index<length){
var value=array[index];
if(depth>0&&predicate(value)){
if(depth>1){

baseFlatten(value,depth-1,predicate,isStrict,result);}else 
{
arrayPush(result,value);}}else 

if(!isStrict){
result[result.length]=value;}}


return result;}


module.exports=baseFlatten;
}, "lodash/_baseFlatten.js");
__d(408 /* lodash/_arrayPush.js */, function(global, require, module, exports) {function 







arrayPush(array,values){
var index=-1,
length=values.length,
offset=array.length;

while(++index<length){
array[offset+index]=values[index];}

return array;}


module.exports=arrayPush;
}, "lodash/_arrayPush.js");
__d(409 /* lodash/_isFlattenable.js */, function(global, require, module, exports) {var isArguments=require(288 /* ./isArguments */),
isArray=require(297 /* ./isArray */);








function isFlattenable(value){
return isArray(value)||isArguments(value);}


module.exports=isFlattenable;
}, "lodash/_isFlattenable.js");
__d(424 /* react-proxy/modules/bindAutoBindMethods.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=bindAutoBindMethods;












function bindAutoBindMethod(component,method){
var boundMethod=method.bind(component);

boundMethod.__reactBoundContext=component;
boundMethod.__reactBoundMethod=method;
boundMethod.__reactBoundArguments=null;

var componentName=component.constructor.displayName,
_bind=boundMethod.bind;

boundMethod.bind=function(newThis){
var args=Array.prototype.slice.call(arguments,1);
if(newThis!==component&&newThis!==null){
console.warn('bind(): React component methods may only be bound to the '+'component instance. See '+componentName);}else 
if(!args.length){
console.warn('bind(): You are binding a component method to the component. '+'React does this for you automatically in a high-performance '+'way, so you can safely remove this call. See '+componentName);
return boundMethod;}


var reboundMethod=_bind.apply(boundMethod,arguments);
reboundMethod.__reactBoundContext=component;
reboundMethod.__reactBoundMethod=method;
reboundMethod.__reactBoundArguments=args;

return reboundMethod;};


return boundMethod;}


function bindAutoBindMethodsFromMap(component){
for(var autoBindKey in component.__reactAutoBindMap){
if(!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)){
return;}





if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=component.__reactAutoBindMap[autoBindKey];
component[autoBindKey]=bindAutoBindMethod(component,method);}}



function bindAutoBindMethods(component){
if(component.__reactAutoBindPairs){
bindAutoBindMethodsFromArray(component);}else 
if(component.__reactAutoBindMap){
bindAutoBindMethodsFromMap(component);}}



function bindAutoBindMethodsFromArray(component){
var pairs=component.__reactAutoBindPairs;

if(!pairs){
return;}


for(var i=0;i<pairs.length;i+=2){
var autoBindKey=pairs[i];

if(component.hasOwnProperty(autoBindKey)&&component[autoBindKey].__reactBoundContext===component){
continue;}


var method=pairs[i+1];

component[autoBindKey]=bindAutoBindMethod(component,method);}}
}, "react-proxy/modules/bindAutoBindMethods.js");
__d(419 /* react-proxy/modules/deleteUnknownAutoBindMethods.js */, function(global, require, module, exports) {'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=deleteUnknownAutoBindMethods;
function shouldDeleteClassicInstanceMethod(component,name){
if(component.__reactAutoBindMap&&component.__reactAutoBindMap.hasOwnProperty(name)){

return false;}


if(component.__reactAutoBindPairs&&component.__reactAutoBindPairs.indexOf(name)>=0){

return false;}


if(component[name].__reactBoundArguments!==null){

return false;}




return true;}


function shouldDeleteModernInstanceMethod(component,name){
var prototype=component.constructor.prototype;

var prototypeDescriptor=Object.getOwnPropertyDescriptor(prototype,name);

if(!prototypeDescriptor||!prototypeDescriptor.get){

return false;}


if(prototypeDescriptor.get().length!==component[name].length){

return false;}




return true;}


function shouldDeleteInstanceMethod(component,name){
var descriptor=Object.getOwnPropertyDescriptor(component,name);
if(typeof descriptor.value!=='function'){

return;}


if(component.__reactAutoBindMap||component.__reactAutoBindPairs){

return shouldDeleteClassicInstanceMethod(component,name);}else 
{

return shouldDeleteModernInstanceMethod(component,name);}}














function deleteUnknownAutoBindMethods(component){
var names=Object.getOwnPropertyNames(component);

names.forEach(function(name){
if(shouldDeleteInstanceMethod(component,name)){
delete component[name];}});}
}, "react-proxy/modules/deleteUnknownAutoBindMethods.js");
__d(421 /* react-deep-force-update/lib/index.js */, function(global, require, module, exports) {"use strict";

exports.__esModule=true;
exports["default"]=getForceUpdate;
function traverseRenderedChildren(internalInstance,callback,argument){
callback(internalInstance,argument);

if(internalInstance._renderedComponent){
traverseRenderedChildren(internalInstance._renderedComponent,callback,argument);}else 
{
for(var key in internalInstance._renderedChildren){
if(internalInstance._renderedChildren.hasOwnProperty(key)){
traverseRenderedChildren(internalInstance._renderedChildren[key],callback,argument);}}}}





function setPendingForceUpdate(internalInstance){
if(internalInstance._pendingForceUpdate===false){
internalInstance._pendingForceUpdate=true;}}



function forceUpdateIfPending(internalInstance,React){
if(internalInstance._pendingForceUpdate===true){
var publicInstance=internalInstance._instance;
React.Component.prototype.forceUpdate.call(publicInstance);}}



function getForceUpdate(React){
return function(instance){
var internalInstance=instance._reactInternalInstance;
traverseRenderedChildren(internalInstance,setPendingForceUpdate);
traverseRenderedChildren(internalInstance,forceUpdateIfPending,React);};}



module.exports=exports["default"];
}, "react-deep-force-update/lib/index.js");
__d(412 /* global/window.js */, function(global, require, module, exports) {if(typeof window!=="undefined"){
module.exports=window;}else 
if(typeof global!=="undefined"){
module.exports=global;}else 
if(typeof self!=="undefined"){
module.exports=self;}else 
{
module.exports={};}
}, "global/window.js");
__d(181 /* RCTNativeAppEventEmitter */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);





var RCTNativeAppEventEmitter=RCTDeviceEventEmitter;

BatchedBridge.registerCallableModule(
'RCTNativeAppEventEmitter',
RCTNativeAppEventEmitter);


module.exports=RCTNativeAppEventEmitter;
}, "RCTNativeAppEventEmitter");
__d(182 /* RCTEventEmitter */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);

var RCTEventEmitter={
register:function register(eventEmitter){
BatchedBridge.registerCallableModule(
'RCTEventEmitter',
eventEmitter);}};




module.exports=RCTEventEmitter;
}, "RCTEventEmitter");
__d(183 /* ReactDefaultBatchingStrategy */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactUpdates=require(107 /* ./ReactUpdates */);
var Transaction=require(113 /* ./Transaction */);

var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);

var RESET_BATCHED_UPDATES={
initialize:emptyFunction,
close:function close(){
ReactDefaultBatchingStrategy.isBatchingUpdates=false;}};



var FLUSH_BATCHED_UPDATES={
initialize:emptyFunction,
close:ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)};


var TRANSACTION_WRAPPERS=[FLUSH_BATCHED_UPDATES,RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction(){
this.reinitializeTransaction();}


_assign(ReactDefaultBatchingStrategyTransaction.prototype,Transaction.Mixin,{
getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;}});



var transaction=new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy={
isBatchingUpdates:false,





batchedUpdates:function batchedUpdates(callback,a,b,c,d,e){
var alreadyBatchingUpdates=ReactDefaultBatchingStrategy.isBatchingUpdates;

ReactDefaultBatchingStrategy.isBatchingUpdates=true;


if(alreadyBatchingUpdates){
callback(a,b,c,d,e);}else 
{
transaction.perform(callback,null,a,b,c,d,e);}}};




module.exports=ReactDefaultBatchingStrategy;
}, "ReactDefaultBatchingStrategy");
__d(184 /* ReactNativeBridgeEventPlugin */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var _extends=_assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var EventPropagators=require(185 /* ./EventPropagators */);
var SyntheticEvent=require(186 /* ./SyntheticEvent */);
var UIManager=require(61 /* UIManager */);

var warning=require(265 /* fbjs/lib/warning */);

var customBubblingEventTypes=UIManager.customBubblingEventTypes;
var customDirectEventTypes=UIManager.customDirectEventTypes;

var allTypesByEventName={};

for(var bubblingTypeName in customBubblingEventTypes){
allTypesByEventName[bubblingTypeName]=customBubblingEventTypes[bubblingTypeName];}


for(var directTypeName in customDirectEventTypes){
process.env.NODE_ENV!=='production'?warning(!customBubblingEventTypes[directTypeName],'Event cannot be both direct and bubbling: %s',directTypeName):void 0;
allTypesByEventName[directTypeName]=customDirectEventTypes[directTypeName];}


var ReactNativeBridgeEventPlugin={

eventTypes:_extends({},customBubblingEventTypes,customDirectEventTypes),




extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){
var bubbleDispatchConfig=customBubblingEventTypes[topLevelType];
var directDispatchConfig=customDirectEventTypes[topLevelType];
var event=SyntheticEvent.getPooled(bubbleDispatchConfig||directDispatchConfig,targetInst,nativeEvent,nativeEventTarget);
if(bubbleDispatchConfig){
EventPropagators.accumulateTwoPhaseDispatches(event);}else 
if(directDispatchConfig){
EventPropagators.accumulateDirectDispatches(event);}else 
{
return null;}

return event;}};



module.exports=ReactNativeBridgeEventPlugin;
}, "ReactNativeBridgeEventPlugin");
__d(185 /* EventPropagators */, function(global, require, module, exports) {'use strict';












var EventConstants=require(98 /* ./EventConstants */);
var EventPluginHub=require(99 /* ./EventPluginHub */);
var EventPluginUtils=require(101 /* ./EventPluginUtils */);

var accumulateInto=require(103 /* ./accumulateInto */);
var forEachAccumulated=require(104 /* ./forEachAccumulated */);
var warning=require(265 /* fbjs/lib/warning */);

var PropagationPhases=EventConstants.PropagationPhases;
var getListener=EventPluginHub.getListener;





function listenerAtPhase(inst,event,propagationPhase){
var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];
return getListener(inst,registrationName);}








function accumulateDirectionalDispatches(inst,upwards,event){
if(process.env.NODE_ENV!=='production'){
process.env.NODE_ENV!=='production'?warning(inst,'Dispatching inst must not be null'):void 0;}

var phase=upwards?PropagationPhases.bubbled:PropagationPhases.captured;
var listener=listenerAtPhase(inst,event,phase);
if(listener){
event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);
event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}










function accumulateTwoPhaseDispatchesSingle(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
EventPluginUtils.traverseTwoPhase(event._targetInst,accumulateDirectionalDispatches,event);}}






function accumulateTwoPhaseDispatchesSingleSkipTarget(event){
if(event&&event.dispatchConfig.phasedRegistrationNames){
var targetInst=event._targetInst;
var parentInst=targetInst?EventPluginUtils.getParentInstance(targetInst):null;
EventPluginUtils.traverseTwoPhase(parentInst,accumulateDirectionalDispatches,event);}}








function accumulateDispatches(inst,ignoredDirection,event){
if(event&&event.dispatchConfig.registrationName){
var registrationName=event.dispatchConfig.registrationName;
var listener=getListener(inst,registrationName);
if(listener){
event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);
event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}}









function accumulateDirectDispatchesSingle(event){
if(event&&event.dispatchConfig.registrationName){
accumulateDispatches(event._targetInst,null,event);}}



function accumulateTwoPhaseDispatches(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}


function accumulateTwoPhaseDispatchesSkipTarget(events){
forEachAccumulated(events,accumulateTwoPhaseDispatchesSingleSkipTarget);}


function accumulateEnterLeaveDispatches(leave,enter,from,to){
EventPluginUtils.traverseEnterLeave(from,to,accumulateDispatches,leave,enter);}


function accumulateDirectDispatches(events){
forEachAccumulated(events,accumulateDirectDispatchesSingle);}













var EventPropagators={
accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,
accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,
accumulateDirectDispatches:accumulateDirectDispatches,
accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches};


module.exports=EventPropagators;
}, "EventPropagators");
__d(186 /* SyntheticEvent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var PooledClass=require(36 /* ./PooledClass */);

var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);
var warning=require(265 /* fbjs/lib/warning */);

var didWarnForAddedNewProperty=false;
var isProxySupported=typeof Proxy==='function';

var shouldBeReleasedProperties=['dispatchConfig','_targetInst','nativeEvent','isDefaultPrevented','isPropagationStopped','_dispatchListeners','_dispatchInstances'];





var EventInterface={
type:null,
target:null,

currentTarget:emptyFunction.thatReturnsNull,
eventPhase:null,
bubbles:null,
cancelable:null,
timeStamp:function timeStamp(event){
return event.timeStamp||Date.now();},

defaultPrevented:null,
isTrusted:null};




















function SyntheticEvent(dispatchConfig,targetInst,nativeEvent,nativeEventTarget){
if(process.env.NODE_ENV!=='production'){

delete this.nativeEvent;
delete this.preventDefault;
delete this.stopPropagation;}


this.dispatchConfig=dispatchConfig;
this._targetInst=targetInst;
this.nativeEvent=nativeEvent;

var Interface=this.constructor.Interface;
for(var propName in Interface){
if(!Interface.hasOwnProperty(propName)){
continue;}

if(process.env.NODE_ENV!=='production'){
delete this[propName];}

var normalize=Interface[propName];
if(normalize){
this[propName]=normalize(nativeEvent);}else 
{
if(propName==='target'){
this.target=nativeEventTarget;}else 
{
this[propName]=nativeEvent[propName];}}}




var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;
if(defaultPrevented){
this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else 
{
this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}

this.isPropagationStopped=emptyFunction.thatReturnsFalse;
return this;}


_assign(SyntheticEvent.prototype,{

preventDefault:function preventDefault(){
this.defaultPrevented=true;
var event=this.nativeEvent;
if(!event){
return;}


if(event.preventDefault){
event.preventDefault();}else 
{
event.returnValue=false;}

this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},


stopPropagation:function stopPropagation(){
var event=this.nativeEvent;
if(!event){
return;}


if(event.stopPropagation){
event.stopPropagation();}else 
{
event.cancelBubble=true;}

this.isPropagationStopped=emptyFunction.thatReturnsTrue;},







persist:function persist(){
this.isPersistent=emptyFunction.thatReturnsTrue;},







isPersistent:emptyFunction.thatReturnsFalse,




destructor:function destructor(){
var Interface=this.constructor.Interface;
for(var propName in Interface){
if(process.env.NODE_ENV!=='production'){
Object.defineProperty(this,propName,getPooledWarningPropertyDefinition(propName,Interface[propName]));}else 
{
this[propName]=null;}}


for(var i=0;i<shouldBeReleasedProperties.length;i++){
this[shouldBeReleasedProperties[i]]=null;}

if(process.env.NODE_ENV!=='production'){
var noop=require(261 /* fbjs/lib/emptyFunction */);
Object.defineProperty(this,'nativeEvent',getPooledWarningPropertyDefinition('nativeEvent',null));
Object.defineProperty(this,'preventDefault',getPooledWarningPropertyDefinition('preventDefault',noop));
Object.defineProperty(this,'stopPropagation',getPooledWarningPropertyDefinition('stopPropagation',noop));}}});





SyntheticEvent.Interface=EventInterface;

if(process.env.NODE_ENV!=='production'){
if(isProxySupported){

SyntheticEvent=new Proxy(SyntheticEvent,{
construct:function construct(target,args){
return this.apply(target,Object.create(target.prototype),args);},

apply:function apply(constructor,that,args){
return new Proxy(constructor.apply(that,args),{
set:function set(target,prop,value){
if(prop!=='isPersistent'&&!target.constructor.Interface.hasOwnProperty(prop)&&shouldBeReleasedProperties.indexOf(prop)===-1){
process.env.NODE_ENV!=='production'?warning(didWarnForAddedNewProperty||target.isPersistent(),'This synthetic event is reused for performance reasons. If you\'re '+'seeing this, you\'re adding a new property in the synthetic event object. '+'The property is never released. See '+'https://fb.me/react-event-pooling for more information.'):void 0;
didWarnForAddedNewProperty=true;}

target[prop]=value;
return true;}});}});}}













SyntheticEvent.augmentClass=function(Class,Interface){
var Super=this;

var E=function E(){};
E.prototype=Super.prototype;
var prototype=new E();

_assign(prototype,Class.prototype);
Class.prototype=prototype;
Class.prototype.constructor=Class;

Class.Interface=_assign({},Super.Interface,Interface);
Class.augmentClass=Super.augmentClass;

PooledClass.addPoolingTo(Class,PooledClass.fourArgumentPooler);};


PooledClass.addPoolingTo(SyntheticEvent,PooledClass.fourArgumentPooler);

module.exports=SyntheticEvent;








function getPooledWarningPropertyDefinition(propName,getVal){
var isFunction=typeof getVal==='function';
return {
configurable:true,
set:set,
get:get};


function set(val){
var action=isFunction?'setting the method':'setting the property';
warn(action,'This is effectively a no-op');
return val;}


function get(){
var action=isFunction?'accessing the method':'accessing the property';
var result=isFunction?'This is a no-op function':'This is set to null';
warn(action,result);
return getVal;}


function warn(action,result){
var warningCondition=false;
process.env.NODE_ENV!=='production'?warning(warningCondition,'This synthetic event is reused for performance reasons. If you\'re seeing this, '+'you\'re %s `%s` on a released/nullified synthetic event. %s. '+'If you must keep the original synthetic event around, use event.persist(). '+'See https://fb.me/react-event-pooling for more information.',action,propName,result):void 0;}}
}, "SyntheticEvent");
__d(187 /* ReactNativeComponentEnvironment */, function(global, require, module, exports) {'use strict';












var ReactNativeDOMIDOperations=require(188 /* ./ReactNativeDOMIDOperations */);
var ReactNativeReconcileTransaction=require(189 /* ./ReactNativeReconcileTransaction */);

var ReactNativeComponentEnvironment={

processChildrenUpdates:ReactNativeDOMIDOperations.dangerouslyProcessChildrenUpdates,

replaceNodeWithMarkup:ReactNativeDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,






unmountIDFromEnvironment:function unmountIDFromEnvironment(){},




clearNode:function clearNode(){},

ReactReconcileTransaction:ReactNativeReconcileTransaction};


module.exports=ReactNativeComponentEnvironment;
}, "ReactNativeComponentEnvironment");
__d(188 /* ReactNativeDOMIDOperations */, function(global, require, module, exports) {'use strict';












var ReactNativeComponentTree=require(96 /* ./ReactNativeComponentTree */);
var ReactMultiChildUpdateTypes=require(116 /* ./ReactMultiChildUpdateTypes */);
var UIManager=require(61 /* UIManager */);













var dangerouslyProcessChildrenUpdates=function dangerouslyProcessChildrenUpdates(inst,childrenUpdates){
if(!childrenUpdates.length){
return;}


var containerTag=ReactNativeComponentTree.getNodeFromInstance(inst);

var moveFromIndices;
var moveToIndices;
var addChildTags;
var addAtIndices;
var removeAtIndices;

for(var i=0;i<childrenUpdates.length;i++){
var update=childrenUpdates[i];
if(update.type===ReactMultiChildUpdateTypes.MOVE_EXISTING){
(moveFromIndices||(moveFromIndices=[])).push(update.fromIndex);
(moveToIndices||(moveToIndices=[])).push(update.toIndex);}else 
if(update.type===ReactMultiChildUpdateTypes.REMOVE_NODE){
(removeAtIndices||(removeAtIndices=[])).push(update.fromIndex);}else 
if(update.type===ReactMultiChildUpdateTypes.INSERT_MARKUP){
var mountImage=update.content;
var tag=mountImage;
(addAtIndices||(addAtIndices=[])).push(update.toIndex);
(addChildTags||(addChildTags=[])).push(tag);}}



UIManager.manageChildren(containerTag,moveFromIndices,moveToIndices,addChildTags,addAtIndices,removeAtIndices);};






var ReactNativeDOMIDOperations={
dangerouslyProcessChildrenUpdates:dangerouslyProcessChildrenUpdates,







dangerouslyReplaceNodeWithMarkupByID:function dangerouslyReplaceNodeWithMarkupByID(id,mountImage){
var oldTag=id;
UIManager.replaceExistingNonRootView(oldTag,mountImage);}};



module.exports=ReactNativeDOMIDOperations;
}, "ReactNativeDOMIDOperations");
__d(189 /* ReactNativeReconcileTransaction */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var CallbackQueue=require(108 /* ./CallbackQueue */);
var PooledClass=require(36 /* ./PooledClass */);
var Transaction=require(113 /* ./Transaction */);





var ON_DOM_READY_QUEUEING={



initialize:function initialize(){
this.reactMountReady.reset();},





close:function close(){
this.reactMountReady.notifyAll();}};








var TRANSACTION_WRAPPERS=[ON_DOM_READY_QUEUEING];















function ReactNativeReconcileTransaction(){
this.reinitializeTransaction();
this.reactMountReady=CallbackQueue.getPooled(null);}


var Mixin={







getTransactionWrappers:function getTransactionWrappers(){
return TRANSACTION_WRAPPERS;},






getReactMountReady:function getReactMountReady(){
return this.reactMountReady;},






destructor:function destructor(){
CallbackQueue.release(this.reactMountReady);
this.reactMountReady=null;}};



_assign(ReactNativeReconcileTransaction.prototype,Transaction.Mixin,ReactNativeReconcileTransaction,Mixin);

PooledClass.addPoolingTo(ReactNativeReconcileTransaction);

module.exports=ReactNativeReconcileTransaction;
}, "ReactNativeReconcileTransaction");
__d(190 /* ReactNativeEventPluginOrder */, function(global, require, module, exports) {'use strict';












var ReactNativeEventPluginOrder=['ResponderEventPlugin','ReactNativeBridgeEventPlugin'];

module.exports=ReactNativeEventPluginOrder;
}, "ReactNativeEventPluginOrder");
__d(191 /* ReactNativeGlobalResponderHandler */, function(global, require, module, exports) {'use strict';











var UIManager=require(61 /* UIManager */);

var ReactNativeGlobalResponderHandler={
onChange:function onChange(from,to,blockNativeResponder){
if(to!==null){
UIManager.setJSResponder(to._rootNodeID,blockNativeResponder);}else 
{
UIManager.clearJSResponder();}}};




module.exports=ReactNativeGlobalResponderHandler;
}, "ReactNativeGlobalResponderHandler");
__d(192 /* ReactNativeTextComponent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactInstrumentation=require(45 /* ./ReactInstrumentation */);
var ReactNativeComponentTree=require(96 /* ./ReactNativeComponentTree */);
var ReactNativeTagHandles=require(106 /* ./ReactNativeTagHandles */);
var UIManager=require(61 /* UIManager */);

var invariant=require(259 /* fbjs/lib/invariant */);

var ReactNativeTextComponent=function ReactNativeTextComponent(text){

this._currentElement=text;
this._stringText=''+text;
this._nativeParent=null;
this._rootNodeID=null;};


_assign(ReactNativeTextComponent.prototype,{

mountComponent:function mountComponent(transaction,nativeParent,nativeContainerInfo,context){
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onSetText(this._debugID,this._stringText);}



!context.isInAParentText?process.env.NODE_ENV!=='production'?invariant(false,'RawText "%s" must be wrapped in an explicit <Text> component.',this._stringText):invariant(false):void 0;
this._nativeParent=nativeParent;
var tag=ReactNativeTagHandles.allocateTag();
this._rootNodeID=tag;
var nativeTopRootTag=nativeContainerInfo._tag;
UIManager.createView(tag,'RCTRawText',nativeTopRootTag,{text:this._stringText});

ReactNativeComponentTree.precacheNode(this,tag);

return tag;},


getNativeNode:function getNativeNode(){
return this._rootNodeID;},


receiveComponent:function receiveComponent(nextText,transaction,context){
if(nextText!==this._currentElement){
this._currentElement=nextText;
var nextStringText=''+nextText;
if(nextStringText!==this._stringText){
this._stringText=nextStringText;
UIManager.updateView(this._rootNodeID,'RCTRawText',{text:this._stringText});
if(process.env.NODE_ENV!=='production'){
ReactInstrumentation.debugTool.onSetText(this._debugID,nextStringText);}}}},





unmountComponent:function unmountComponent(){
ReactNativeComponentTree.uncacheNode(this);
this._currentElement=null;
this._stringText=null;
this._rootNodeID=null;}});




module.exports=ReactNativeTextComponent;
}, "ReactNativeTextComponent");
__d(193 /* ReactNativeTreeTraversal */, function(global, require, module, exports) {'use strict';



















function getLowestCommonAncestor(instA,instB){
var depthA=0;
for(var tempA=instA;tempA;tempA=tempA._nativeParent){
depthA++;}

var depthB=0;
for(var tempB=instB;tempB;tempB=tempB._nativeParent){
depthB++;}



while(depthA-depthB>0){
instA=instA._nativeParent;
depthA--;}



while(depthB-depthA>0){
instB=instB._nativeParent;
depthB--;}



var depth=depthA;
while(depth--){
if(instA===instB){
return instA;}

instA=instA._nativeParent;
instB=instB._nativeParent;}

return null;}





function isAncestor(instA,instB){
while(instB){
if(instB===instA){
return true;}

instB=instB._nativeParent;}

return false;}





function getParentInstance(inst){
return inst._nativeParent;}





function traverseTwoPhase(inst,fn,arg){
var path=[];
while(inst){
path.push(inst);
inst=inst._nativeParent;}

var i;
for(i=path.length;i-->0;){
fn(path[i],false,arg);}

for(i=0;i<path.length;i++){
fn(path[i],true,arg);}}










function traverseEnterLeave(from,to,fn,argFrom,argTo){
var common=from&&to?getLowestCommonAncestor(from,to):null;
var pathFrom=[];
while(from&&from!==common){
pathFrom.push(from);
from=from._nativeParent;}

var pathTo=[];
while(to&&to!==common){
pathTo.push(to);
to=to._nativeParent;}

var i;
for(i=0;i<pathFrom.length;i++){
fn(pathFrom[i],true,argFrom);}

for(i=pathTo.length;i-->0;){
fn(pathTo[i],false,argTo);}}



module.exports={
isAncestor:isAncestor,
getLowestCommonAncestor:getLowestCommonAncestor,
getParentInstance:getParentInstance,
traverseTwoPhase:traverseTwoPhase,
traverseEnterLeave:traverseEnterLeave};
}, "ReactNativeTreeTraversal");
__d(194 /* ReactSimpleEmptyComponent */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var ReactReconciler=require(110 /* ./ReactReconciler */);

var ReactSimpleEmptyComponent=function ReactSimpleEmptyComponent(placeholderElement,instantiate){
this._currentElement=null;
this._renderedComponent=instantiate(placeholderElement);};

_assign(ReactSimpleEmptyComponent.prototype,{
mountComponent:function mountComponent(transaction,nativeParent,nativeContainerInfo,context){
return ReactReconciler.mountComponent(this._renderedComponent,transaction,nativeParent,nativeContainerInfo,context);},

receiveComponent:function receiveComponent(){},
getNativeNode:function getNativeNode(){
return ReactReconciler.getNativeNode(this._renderedComponent);},

unmountComponent:function unmountComponent(){
ReactReconciler.unmountComponent(this._renderedComponent);
this._renderedComponent=null;}});



module.exports=ReactSimpleEmptyComponent;
}, "ReactSimpleEmptyComponent");
__d(195 /* ResponderEventPlugin */, function(global, require, module, exports) {'use strict';












var EventConstants=require(98 /* ./EventConstants */);
var EventPluginUtils=require(101 /* ./EventPluginUtils */);
var EventPropagators=require(185 /* ./EventPropagators */);
var ResponderSyntheticEvent=require(196 /* ./ResponderSyntheticEvent */);
var ResponderTouchHistoryStore=require(197 /* ./ResponderTouchHistoryStore */);

var accumulate=require(198 /* ./accumulate */);
var invariant=require(259 /* fbjs/lib/invariant */);
var keyOf=require(263 /* fbjs/lib/keyOf */);

var isStartish=EventPluginUtils.isStartish;
var isMoveish=EventPluginUtils.isMoveish;
var isEndish=EventPluginUtils.isEndish;
var executeDirectDispatch=EventPluginUtils.executeDirectDispatch;
var hasDispatches=EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue=EventPluginUtils.executeDispatchesInOrderStopAtTrue;





var responderInst=null;





var trackedTouchCount=0;




var previousActiveTouches=0;

var changeResponder=function changeResponder(nextResponderInst,blockNativeResponder){
var oldResponderInst=responderInst;
responderInst=nextResponderInst;
if(ResponderEventPlugin.GlobalResponderHandler!==null){
ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderInst,nextResponderInst,blockNativeResponder);}};



var eventTypes={




startShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onStartShouldSetResponder:null}),
captured:keyOf({onStartShouldSetResponderCapture:null})}},












scrollShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onScrollShouldSetResponder:null}),
captured:keyOf({onScrollShouldSetResponderCapture:null})}},










selectionChangeShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onSelectionChangeShouldSetResponder:null}),
captured:keyOf({onSelectionChangeShouldSetResponderCapture:null})}},







moveShouldSetResponder:{
phasedRegistrationNames:{
bubbled:keyOf({onMoveShouldSetResponder:null}),
captured:keyOf({onMoveShouldSetResponderCapture:null})}},






responderStart:{registrationName:keyOf({onResponderStart:null})},
responderMove:{registrationName:keyOf({onResponderMove:null})},
responderEnd:{registrationName:keyOf({onResponderEnd:null})},
responderRelease:{registrationName:keyOf({onResponderRelease:null})},
responderTerminationRequest:{
registrationName:keyOf({onResponderTerminationRequest:null})},

responderGrant:{registrationName:keyOf({onResponderGrant:null})},
responderReject:{registrationName:keyOf({onResponderReject:null})},
responderTerminate:{registrationName:keyOf({onResponderTerminate:null})}};
































































































































































































function setResponderAndExtractTransfer(topLevelType,targetInst,nativeEvent,nativeEventTarget){
var shouldSetEventType=isStartish(topLevelType)?eventTypes.startShouldSetResponder:isMoveish(topLevelType)?eventTypes.moveShouldSetResponder:topLevelType===EventConstants.topLevelTypes.topSelectionChange?eventTypes.selectionChangeShouldSetResponder:eventTypes.scrollShouldSetResponder;


var bubbleShouldSetFrom=!responderInst?targetInst:EventPluginUtils.getLowestCommonAncestor(responderInst,targetInst);





var skipOverBubbleShouldSetFrom=bubbleShouldSetFrom===responderInst;
var shouldSetEvent=ResponderSyntheticEvent.getPooled(shouldSetEventType,bubbleShouldSetFrom,nativeEvent,nativeEventTarget);
shouldSetEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
if(skipOverBubbleShouldSetFrom){
EventPropagators.accumulateTwoPhaseDispatchesSkipTarget(shouldSetEvent);}else 
{
EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);}

var wantsResponderInst=executeDispatchesInOrderStopAtTrue(shouldSetEvent);
if(!shouldSetEvent.isPersistent()){
shouldSetEvent.constructor.release(shouldSetEvent);}


if(!wantsResponderInst||wantsResponderInst===responderInst){
return null;}

var extracted;
var grantEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderGrant,wantsResponderInst,nativeEvent,nativeEventTarget);
grantEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;

EventPropagators.accumulateDirectDispatches(grantEvent);
var blockNativeResponder=executeDirectDispatch(grantEvent)===true;
if(responderInst){

var terminationRequestEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest,responderInst,nativeEvent,nativeEventTarget);
terminationRequestEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
var shouldSwitch=!hasDispatches(terminationRequestEvent)||executeDirectDispatch(terminationRequestEvent);
if(!terminationRequestEvent.isPersistent()){
terminationRequestEvent.constructor.release(terminationRequestEvent);}


if(shouldSwitch){
var terminateEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderTerminate,responderInst,nativeEvent,nativeEventTarget);
terminateEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(terminateEvent);
extracted=accumulate(extracted,[grantEvent,terminateEvent]);
changeResponder(wantsResponderInst,blockNativeResponder);}else 
{
var rejectEvent=ResponderSyntheticEvent.getPooled(eventTypes.responderReject,wantsResponderInst,nativeEvent,nativeEventTarget);
rejectEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(rejectEvent);
extracted=accumulate(extracted,rejectEvent);}}else 

{
extracted=accumulate(extracted,grantEvent);
changeResponder(wantsResponderInst,blockNativeResponder);}

return extracted;}










function canTriggerTransfer(topLevelType,topLevelInst,nativeEvent){
return topLevelInst&&(



topLevelType===EventConstants.topLevelTypes.topScroll&&!nativeEvent.responderIgnoreScroll||trackedTouchCount>0&&topLevelType===EventConstants.topLevelTypes.topSelectionChange||isStartish(topLevelType)||isMoveish(topLevelType));}









function noResponderTouches(nativeEvent){
var touches=nativeEvent.touches;
if(!touches||touches.length===0){
return true;}

for(var i=0;i<touches.length;i++){
var activeTouch=touches[i];
var target=activeTouch.target;
if(target!==null&&target!==undefined&&target!==0){

var targetInst=EventPluginUtils.getInstanceFromNode(target);
if(EventPluginUtils.isAncestor(responderInst,targetInst)){
return false;}}}



return true;}


var ResponderEventPlugin={


_getResponderID:function _getResponderID(){
return responderInst?responderInst._rootNodeID:null;},


eventTypes:eventTypes,






extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){
if(isStartish(topLevelType)){
trackedTouchCount+=1;}else 
if(isEndish(topLevelType)){
trackedTouchCount-=1;
!(trackedTouchCount>=0)?process.env.NODE_ENV!=='production'?invariant(false,'Ended a touch event which was not counted in trackedTouchCount.'):invariant(false):void 0;}


ResponderTouchHistoryStore.recordTouchTrack(topLevelType,nativeEvent,nativeEventTarget);

var extracted=canTriggerTransfer(topLevelType,targetInst,nativeEvent)?setResponderAndExtractTransfer(topLevelType,targetInst,nativeEvent,nativeEventTarget):null;










var isResponderTouchStart=responderInst&&isStartish(topLevelType);
var isResponderTouchMove=responderInst&&isMoveish(topLevelType);
var isResponderTouchEnd=responderInst&&isEndish(topLevelType);
var incrementalTouch=isResponderTouchStart?eventTypes.responderStart:isResponderTouchMove?eventTypes.responderMove:isResponderTouchEnd?eventTypes.responderEnd:null;

if(incrementalTouch){
var gesture=ResponderSyntheticEvent.getPooled(incrementalTouch,responderInst,nativeEvent,nativeEventTarget);
gesture.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(gesture);
extracted=accumulate(extracted,gesture);}


var isResponderTerminate=responderInst&&topLevelType===EventConstants.topLevelTypes.topTouchCancel;
var isResponderRelease=responderInst&&!isResponderTerminate&&isEndish(topLevelType)&&noResponderTouches(nativeEvent);
var finalTouch=isResponderTerminate?eventTypes.responderTerminate:isResponderRelease?eventTypes.responderRelease:null;
if(finalTouch){
var finalEvent=ResponderSyntheticEvent.getPooled(finalTouch,responderInst,nativeEvent,nativeEventTarget);
finalEvent.touchHistory=ResponderTouchHistoryStore.touchHistory;
EventPropagators.accumulateDirectDispatches(finalEvent);
extracted=accumulate(extracted,finalEvent);
changeResponder(null);}


var numberActiveTouches=ResponderTouchHistoryStore.touchHistory.numberActiveTouches;
if(ResponderEventPlugin.GlobalInteractionHandler&&numberActiveTouches!==previousActiveTouches){
ResponderEventPlugin.GlobalInteractionHandler.onChange(numberActiveTouches);}

previousActiveTouches=numberActiveTouches;

return extracted;},


GlobalResponderHandler:null,
GlobalInteractionHandler:null,

injection:{





injectGlobalResponderHandler:function injectGlobalResponderHandler(GlobalResponderHandler){
ResponderEventPlugin.GlobalResponderHandler=GlobalResponderHandler;},






injectGlobalInteractionHandler:function injectGlobalInteractionHandler(GlobalInteractionHandler){
ResponderEventPlugin.GlobalInteractionHandler=GlobalInteractionHandler;}}};




module.exports=ResponderEventPlugin;
}, "ResponderEventPlugin");
__d(196 /* ResponderSyntheticEvent */, function(global, require, module, exports) {'use strict';












var SyntheticEvent=require(186 /* ./SyntheticEvent */);






var ResponderEventInterface={
touchHistory:function touchHistory(nativeEvent){
return null;}};









function ResponderSyntheticEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){
return SyntheticEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}


SyntheticEvent.augmentClass(ResponderSyntheticEvent,ResponderEventInterface);

module.exports=ResponderSyntheticEvent;
}, "ResponderSyntheticEvent");
__d(197 /* ResponderTouchHistoryStore */, function(global, require, module, exports) {'use strict';












var EventPluginUtils=require(101 /* ./EventPluginUtils */);

var invariant=require(259 /* fbjs/lib/invariant */);

var isMoveish=EventPluginUtils.isMoveish;
var isStartish=EventPluginUtils.isStartish;
var isEndish=EventPluginUtils.isEndish;

var MAX_TOUCH_BANK=20;
















var touchHistory={
touchBank:[],
numberActiveTouches:0,



indexOfSingleActiveTouch:-1,
mostRecentTimeStamp:0};


var timestampForTouch=function timestampForTouch(touch){



return touch.timeStamp||touch.timestamp;};







var initializeTouchData=function initializeTouchData(touch){
return {
touchActive:true,
startTimeStamp:timestampForTouch(touch),
startPageX:touch.pageX,
startPageY:touch.pageY,
currentPageX:touch.pageX,
currentPageY:touch.pageY,
currentTimeStamp:timestampForTouch(touch),
previousPageX:touch.pageX,
previousPageY:touch.pageY,
previousTimeStamp:timestampForTouch(touch)};};



var reinitializeTouchTrack=function reinitializeTouchTrack(touchTrack,touch){
touchTrack.touchActive=true;
touchTrack.startTimeStamp=timestampForTouch(touch);
touchTrack.startPageX=touch.pageX;
touchTrack.startPageY=touch.pageY;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchTrack.previousPageX=touch.pageX;
touchTrack.previousPageY=touch.pageY;
touchTrack.previousTimeStamp=timestampForTouch(touch);};


var validateTouch=function validateTouch(touch){
var identifier=touch.identifier;
!(identifier!=null)?process.env.NODE_ENV!=='production'?invariant(false,'Touch object is missing identifier'):invariant(false):void 0;
if(identifier>MAX_TOUCH_BANK){
console.warn('Touch identifier '+identifier+' is greater than maximum '+'supported '+MAX_TOUCH_BANK+' which causes performance issues '+'backfilling array locations for all of the indices.');}};



var recordStartTouchData=function recordStartTouchData(touch){
var touchBank=touchHistory.touchBank;
var identifier=touch.identifier;
var touchTrack=touchBank[identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);}

if(touchTrack){
reinitializeTouchTrack(touchTrack,touch);}else 
{
touchBank[touch.identifier]=initializeTouchData(touch);}

touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var recordMoveTouchData=function recordMoveTouchData(touch){
var touchBank=touchHistory.touchBank;
var touchTrack=touchBank[touch.identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);
!touchTrack?process.env.NODE_ENV!=='production'?invariant(false,'Touch data should have been recorded on start'):invariant(false):void 0;}

touchTrack.touchActive=true;
touchTrack.previousPageX=touchTrack.currentPageX;
touchTrack.previousPageY=touchTrack.currentPageY;
touchTrack.previousTimeStamp=touchTrack.currentTimeStamp;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var recordEndTouchData=function recordEndTouchData(touch){
var touchBank=touchHistory.touchBank;
var touchTrack=touchBank[touch.identifier];
if(process.env.NODE_ENV!=='production'){
validateTouch(touch);
!touchTrack?process.env.NODE_ENV!=='production'?invariant(false,'Touch data should have been recorded on start'):invariant(false):void 0;}

touchTrack.previousPageX=touchTrack.currentPageX;
touchTrack.previousPageY=touchTrack.currentPageY;
touchTrack.previousTimeStamp=touchTrack.currentTimeStamp;
touchTrack.currentPageX=touch.pageX;
touchTrack.currentPageY=touch.pageY;
touchTrack.currentTimeStamp=timestampForTouch(touch);
touchTrack.touchActive=false;
touchHistory.mostRecentTimeStamp=timestampForTouch(touch);};


var ResponderTouchHistoryStore={
recordTouchTrack:function recordTouchTrack(topLevelType,nativeEvent){
var touchBank=touchHistory.touchBank;
if(isMoveish(topLevelType)){
nativeEvent.changedTouches.forEach(recordMoveTouchData);}else 
if(isStartish(topLevelType)){
nativeEvent.changedTouches.forEach(recordStartTouchData);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
touchHistory.indexOfSingleActiveTouch=nativeEvent.touches[0].identifier;}}else 

if(isEndish(topLevelType)){
nativeEvent.changedTouches.forEach(recordEndTouchData);
touchHistory.numberActiveTouches=nativeEvent.touches.length;
if(touchHistory.numberActiveTouches===1){
for(var i=0;i<touchBank.length;i++){
var touchTrackToCheck=touchBank[i];
if(touchTrackToCheck!=null&&touchTrackToCheck.touchActive){
touchHistory.indexOfSingleActiveTouch=i;
break;}}


if(process.env.NODE_ENV!=='production'){
var activeTouchData=touchBank[touchHistory.indexOfSingleActiveTouch];
var foundActive=activeTouchData!=null&&!!activeTouchData.touchActive;
!foundActive?process.env.NODE_ENV!=='production'?invariant(false,'Cannot find single active touch'):invariant(false):void 0;}}}},





touchHistory:touchHistory};


module.exports=ResponderTouchHistoryStore;
}, "ResponderTouchHistoryStore");
__d(198 /* accumulate */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);








function accumulate(current,next){
!(next!=null)?process.env.NODE_ENV!=='production'?invariant(false,'accumulate(...): Accumulated items must be not be null or undefined.'):invariant(false):void 0;
if(current==null){
return next;}else 
{


var currentIsArray=Array.isArray(current);
var nextIsArray=Array.isArray(next);
if(currentIsArray){
return current.concat(next);}else 
{
if(nextIsArray){
return [current].concat(next);}else 
{
return [current,next];}}}}





module.exports=accumulate;
}, "accumulate");
__d(199 /* Subscribable */, function(global, require, module, exports) {'use strict';






















var Subscribable={};

Subscribable.Mixin={

componentWillMount:function componentWillMount(){
this._subscribableSubscriptions=[];},


componentWillUnmount:function componentWillUnmount(){
this._subscribableSubscriptions.forEach(
function(subscription){return subscription.remove();});

this._subscribableSubscriptions=null;},















addListenerOn:function addListenerOn(
eventEmitter,
eventType,
listener,
context)
{
this._subscribableSubscriptions.push(
eventEmitter.addListener(eventType,listener,context));}};




module.exports=Subscribable;
}, "Subscribable");
__d(200 /* YellowBox */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/ReactIOS/YellowBox.js';













var EventEmitter=require(19 /* EventEmitter */);

var Platform=require(13 /* Platform */);
var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);

var _warningEmitter=new EventEmitter();
var _warningMap=new Map();






















if(__DEV__){(function(){var _console=
console;var error=_console.error;var warn=_console.warn;
console.error=function(){
error.apply(console,arguments);

if(typeof arguments[0]==='string'&&
arguments[0].startsWith('Warning: ')){
updateWarningMap.apply(null,arguments);}};


console.warn=function(){
warn.apply(console,arguments);
updateWarningMap.apply(null,arguments);};})();}












function sprintf(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
var index=0;
return format.replace(/%s/g,function(match){return args[index++];});}


function updateWarningMap(format){
var stringifySafe=require(14 /* stringifySafe */);

format=String(format);
var argCount=(format.match(/%s/g)||[]).length;for(var _len2=arguments.length,args=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
var warning=[
sprintf.apply(undefined,[format].concat(babelHelpers.toConsumableArray(args.slice(0,argCount))))].concat(babelHelpers.toConsumableArray(
args.slice(argCount).map(stringifySafe))).
join(' ');

var count=_warningMap.has(warning)?_warningMap.get(warning):0;
_warningMap.set(warning,count+1);
_warningEmitter.emit('warning',_warningMap);}


function isWarningIgnored(warning){
return (
Array.isArray(console.ignoredYellowBox)&&
console.ignoredYellowBox.some(
function(ignorePrefix){return warning.startsWith(ignorePrefix);}));}




var WarningRow=function WarningRow(_ref){var count=_ref.count;var warning=_ref.warning;var onPress=_ref.onPress;
var Text=require(141 /* Text */);
var TouchableHighlight=require(149 /* TouchableHighlight */);
var View=require(81 /* View */);

var countText=count>1?
React.createElement(Text,{style:styles.listRowCount,__source:{fileName:_jsxFileName,lineNumber:105}},'('+count+') '):
null;

return (
React.createElement(View,{style:styles.listRow,__source:{fileName:_jsxFileName,lineNumber:109}},
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onPress,
style:styles.listRowContent,
underlayColor:'transparent',__source:{fileName:_jsxFileName,lineNumber:110}},
React.createElement(Text,{style:styles.listRowText,numberOfLines:2,__source:{fileName:_jsxFileName,lineNumber:115}},
countText,
warning))));};






var WarningInspector=function WarningInspector(_ref2)





{var count=_ref2.count;var warning=_ref2.warning;var onClose=_ref2.onClose;var onDismiss=_ref2.onDismiss;var onDismissAll=_ref2.onDismissAll;
var ScrollView=require(201 /* ScrollView */);
var Text=require(141 /* Text */);
var TouchableHighlight=require(149 /* TouchableHighlight */);
var View=require(81 /* View */);

var countSentence=
'Warning encountered '+count+' time'+(count-1?'s':'')+'.';

return (
React.createElement(TouchableHighlight,{
activeOpacity:0.95,
underlayColor:backgroundColor(0.8),
onPress:onClose,
style:styles.inspector,__source:{fileName:_jsxFileName,lineNumber:140}},
React.createElement(View,{style:styles.inspectorContent,__source:{fileName:_jsxFileName,lineNumber:145}},
React.createElement(View,{style:styles.inspectorCount,__source:{fileName:_jsxFileName,lineNumber:146}},
React.createElement(Text,{style:styles.inspectorCountText,__source:{fileName:_jsxFileName,lineNumber:147}},countSentence)),

React.createElement(ScrollView,{style:styles.inspectorWarning,__source:{fileName:_jsxFileName,lineNumber:149}},
React.createElement(Text,{style:styles.inspectorWarningText,__source:{fileName:_jsxFileName,lineNumber:150}},warning)),

React.createElement(View,{style:styles.inspectorButtons,__source:{fileName:_jsxFileName,lineNumber:152}},
React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onDismiss,
style:styles.inspectorButton,
underlayColor:'transparent',__source:{fileName:_jsxFileName,lineNumber:153}},
React.createElement(Text,{style:styles.inspectorButtonText,__source:{fileName:_jsxFileName,lineNumber:158}},'Dismiss')),



React.createElement(TouchableHighlight,{
activeOpacity:0.5,
onPress:onDismissAll,
style:styles.inspectorButton,
underlayColor:'transparent',__source:{fileName:_jsxFileName,lineNumber:162}},
React.createElement(Text,{style:styles.inspectorButtonText,__source:{fileName:_jsxFileName,lineNumber:167}},'Dismiss All'))))));};var 









YellowBox=function(_React$Component){babelHelpers.inherits(YellowBox,_React$Component);







function YellowBox(props,context){babelHelpers.classCallCheck(this,YellowBox);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(YellowBox).call(this,
props,context));
_this.state={
inspecting:null,
warningMap:_warningMap};

_this.dismissWarning=function(warning){var _this$state=
_this.state;var inspecting=_this$state.inspecting;var warningMap=_this$state.warningMap;
if(warning){
warningMap.delete(warning);}else 
{
warningMap.clear();}

_this.setState({
inspecting:warning&&inspecting!==warning?inspecting:null,
warningMap:warningMap});};return _this;}babelHelpers.createClass(YellowBox,[{key:'componentDidMount',value:function componentDidMount()




{var _this2=this;
var scheduled=null;
this._listener=_warningEmitter.addListener('warning',function(warningMap){


scheduled=scheduled||setImmediate(function(){
scheduled=null;
_this2.setState({
warningMap:warningMap});});});}},{key:'componentWillUnmount',value:function componentWillUnmount()





{
if(this._listener){
this._listener.remove();}}},{key:'render',value:function render()



{var _this3=this;
if(console.disableYellowBox||this.state.warningMap.size===0){
return null;}

var ScrollView=require(201 /* ScrollView */);
var View=require(81 /* View */);

var inspecting=this.state.inspecting;
var inspector=inspecting!==null?
React.createElement(WarningInspector,{
count:this.state.warningMap.get(inspecting),
warning:inspecting,
onClose:function onClose(){return _this3.setState({inspecting:null});},
onDismiss:function onDismiss(){return _this3.dismissWarning(inspecting);},
onDismissAll:function onDismissAll(){return _this3.dismissWarning(null);},__source:{fileName:_jsxFileName,lineNumber:234}}):

null;

var rows=[];
this.state.warningMap.forEach(function(count,warning){
if(!isWarningIgnored(warning)){
rows.push(
React.createElement(WarningRow,{
key:warning,
count:count,
warning:warning,
onPress:function onPress(){return _this3.setState({inspecting:warning});},
onDismiss:function onDismiss(){return _this3.dismissWarning(warning);},__source:{fileName:_jsxFileName,lineNumber:247}}));}});





var listStyle=[
styles.list,

{height:Math.min(rows.length,4.4)*(rowGutter+rowHeight)}];

return (
React.createElement(View,{style:inspector?styles.fullScreen:listStyle,__source:{fileName:_jsxFileName,lineNumber:264}},
React.createElement(ScrollView,{style:listStyle,scrollsToTop:false,__source:{fileName:_jsxFileName,lineNumber:265}},
rows),

inspector));}}]);return YellowBox;}(React.Component);





var backgroundColor=function backgroundColor(opacity){return 'rgba(250, 186, 48, '+opacity+')';};
var textColor='white';
var rowGutter=1;
var rowHeight=46;

var styles=StyleSheet.create({
fullScreen:{
backgroundColor:'transparent',
position:'absolute',
left:0,
right:0,
top:0,
bottom:0},

inspector:{
backgroundColor:backgroundColor(0.95),
flex:1},

inspectorContainer:{
flex:1},

inspectorButtons:{
flexDirection:'row',
position:'absolute',
left:0,
right:0,
bottom:0},

inspectorButton:{
flex:1,
padding:22},

inspectorButtonText:{
color:textColor,
fontSize:14,
opacity:0.8,
textAlign:'center'},

inspectorContent:{
flex:1,
paddingTop:5},

inspectorCount:{
padding:15,
paddingBottom:0},

inspectorCountText:{
color:textColor,
fontSize:14},

inspectorWarning:{
padding:15,
position:'absolute',
top:39,
bottom:60},

inspectorWarningText:{
color:textColor,
fontSize:16,
fontWeight:'600'},

list:{
backgroundColor:'transparent',
position:'absolute',
left:0,
right:0,
bottom:0},

listRow:{
position:'relative',
backgroundColor:backgroundColor(0.95),
flex:1,
height:rowHeight,
marginTop:rowGutter},

listRowContent:{
flex:1},

listRowCount:{
color:'rgba(255, 255, 255, 0.5)'},

listRowText:{
color:textColor,
position:'absolute',
left:0,
top:Platform.OS==='android'?5:7,
marginLeft:15,
marginRight:15}});



module.exports=YellowBox;
}, "YellowBox");
__d(201 /* ScrollView */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/ScrollView/ScrollView.js';












var ColorPropType=require(69 /* ColorPropType */);
var EdgeInsetsPropType=require(82 /* EdgeInsetsPropType */);
var Platform=require(13 /* Platform */);
var PointPropType=require(202 /* PointPropType */);
var RCTScrollViewManager=require(12 /* NativeModules */).ScrollViewManager;
var React=require(34 /* React */);
var ReactNative=require(157 /* ReactNative */);
var ScrollResponder=require(203 /* ScrollResponder */);
var StyleSheet=require(90 /* StyleSheet */);
var StyleSheetPropType=require(87 /* StyleSheetPropType */);
var View=require(81 /* View */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);

var deprecatedPropType=require(73 /* deprecatedPropType */);
var dismissKeyboard=require(204 /* dismissKeyboard */);
var flattenStyle=require(59 /* flattenStyle */);
var invariant=require(259 /* fbjs/lib/invariant */);
var processDecelerationRate=require(205 /* processDecelerationRate */);
var PropTypes=React.PropTypes;
var requireNativeComponent=require(88 /* requireNativeComponent */);
















var ScrollView=React.createClass({displayName:'ScrollView',
propTypes:babelHelpers.extends({},
View.propTypes,{






automaticallyAdjustContentInsets:PropTypes.bool,





contentInset:EdgeInsetsPropType,





contentOffset:PointPropType,







bounces:PropTypes.bool,






bouncesZoom:PropTypes.bool,






alwaysBounceHorizontal:PropTypes.bool,






alwaysBounceVertical:PropTypes.bool,







centerContent:PropTypes.bool,















contentContainerStyle:StyleSheetPropType(ViewStylePropTypes),










decelerationRate:PropTypes.oneOfType([
PropTypes.oneOf(['fast','normal']),
PropTypes.number]),





horizontal:PropTypes.bool,







indicatorStyle:PropTypes.oneOf([
'default',
'black',
'white']),






directionalLockEnabled:PropTypes.bool,





canCancelContentTouches:PropTypes.bool,








keyboardDismissMode:PropTypes.oneOf([
'none',
'interactive',
'on-drag']),







keyboardShouldPersistTaps:PropTypes.bool,




maximumZoomScale:PropTypes.number,




minimumZoomScale:PropTypes.number,




onScroll:PropTypes.func,




onScrollAnimationEnd:PropTypes.func,








onContentSizeChange:PropTypes.func,





pagingEnabled:PropTypes.bool,




scrollEnabled:PropTypes.bool,












scrollEventThrottle:PropTypes.number,






scrollIndicatorInsets:EdgeInsetsPropType,





scrollsToTop:PropTypes.bool,



showsHorizontalScrollIndicator:PropTypes.bool,



showsVerticalScrollIndicator:PropTypes.bool,








stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number),
style:StyleSheetPropType(ViewStylePropTypes),







snapToInterval:PropTypes.number,








snapToAlignment:PropTypes.oneOf([
'start',
'center',
'end']),







removeClippedSubviews:PropTypes.bool,




zoomScale:PropTypes.number,







refreshControl:PropTypes.element,




onRefreshStart:deprecatedPropType(
PropTypes.func,
'Use the `refreshControl` prop instead.'),









endFillColor:ColorPropType,








scrollPerfTag:PropTypes.string}),


mixins:[ScrollResponder.Mixin],

getInitialState:function getInitialState(){
return this.scrollResponderMixinGetInitialState();},


setNativeProps:function setNativeProps(props){
this._scrollViewRef&&this._scrollViewRef.setNativeProps(props);},





endRefreshing:function endRefreshing(){
RCTScrollViewManager.endRefreshing(
ReactNative.findNodeHandle(this));},









getScrollResponder:function getScrollResponder(){
return this;},


getScrollableNode:function getScrollableNode(){
return ReactNative.findNodeHandle(this._scrollViewRef);},


getInnerViewNode:function getInnerViewNode(){
return ReactNative.findNodeHandle(this._innerViewRef);},













scrollTo:function scrollTo(
y,
x,
animated)
{
if(typeof y==='number'){
console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');}else 
{var _ref=
y||{};x=_ref.x;y=_ref.y;animated=_ref.animated;}

this.getScrollResponder().scrollResponderScrollTo({x:x||0,y:y||0,animated:animated!==false});},





scrollWithoutAnimationTo:function scrollWithoutAnimationTo(){var y=arguments.length<=0||arguments[0]===undefined?0:arguments[0];var x=arguments.length<=1||arguments[1]===undefined?0:arguments[1];
console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead');
this.scrollTo({x:x,y:y,animated:false});},


_handleScroll:function _handleScroll(e){
if(__DEV__){
if(this.props.onScroll&&!this.props.scrollEventThrottle&&Platform.OS==='ios'){
console.log(
'You specified `onScroll` on a <ScrollView> but not '+
'`scrollEventThrottle`. You will only receive one event. '+
'Using `16` you get all the events but be aware that it may '+
'cause frame drops, use a bigger number if you don\'t need as '+
'much precision.');}}



if(Platform.OS==='android'){
if(this.props.keyboardDismissMode==='on-drag'){
dismissKeyboard();}}


this.scrollResponderHandleScroll(e);},


_handleContentOnLayout:function _handleContentOnLayout(e){var _e$nativeEvent$layout=
e.nativeEvent.layout;var width=_e$nativeEvent$layout.width;var height=_e$nativeEvent$layout.height;
this.props.onContentSizeChange&&this.props.onContentSizeChange(width,height);},


_scrollViewRef:null,
_setScrollViewRef:function _setScrollViewRef(ref){
this._scrollViewRef=ref;},


_innerViewRef:null,
_setInnerViewRef:function _setInnerViewRef(ref){
this._innerViewRef=ref;},


render:function render(){
var contentContainerStyle=[
this.props.horizontal&&styles.contentContainerHorizontal,
this.props.contentContainerStyle];

var style=void 0,childLayoutProps=void 0;
if(__DEV__&&this.props.style){
style=flattenStyle(this.props.style);
childLayoutProps=['alignItems','justifyContent'].
filter(function(prop){return style&&style[prop]!==undefined;});
invariant(
childLayoutProps.length===0,
'ScrollView child layout ('+JSON.stringify(childLayoutProps)+
') must be applied through the contentContainerStyle prop.');}



var contentSizeChangeProps={};
if(this.props.onContentSizeChange){
contentSizeChangeProps={
onLayout:this._handleContentOnLayout};}



var contentContainer=
React.createElement(View,babelHelpers.extends({},
contentSizeChangeProps,{
ref:this._setInnerViewRef,
style:contentContainerStyle,
removeClippedSubviews:this.props.removeClippedSubviews,
collapsable:false,__source:{fileName:_jsxFileName,lineNumber:470}}),
this.props.children);


var alwaysBounceHorizontal=
this.props.alwaysBounceHorizontal!==undefined?
this.props.alwaysBounceHorizontal:
this.props.horizontal;

var alwaysBounceVertical=
this.props.alwaysBounceVertical!==undefined?
this.props.alwaysBounceVertical:
!this.props.horizontal;

var props=babelHelpers.extends({},
this.props,{
alwaysBounceHorizontal:alwaysBounceHorizontal,
alwaysBounceVertical:alwaysBounceVertical,
style:[styles.base,this.props.style],
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onScroll:this._handleScroll,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderTerminationRequest:this.scrollResponderHandleTerminationRequest,
onResponderTerminate:this.scrollResponderHandleTerminate,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
sendMomentumEvents:this.props.onMomentumScrollBegin||this.props.onMomentumScrollEnd?true:false});


var onRefreshStart=this.props.onRefreshStart;
if(onRefreshStart){


props.onRefreshStart=
function(){onRefreshStart&&onRefreshStart(this.endRefreshing);}.bind(this);}var 


decelerationRate=this.props.decelerationRate;
if(decelerationRate){
props.decelerationRate=processDecelerationRate(decelerationRate);}


var ScrollViewClass=void 0;
if(Platform.OS==='ios'){
ScrollViewClass=RCTScrollView;}else 
if(Platform.OS==='android'){
if(this.props.horizontal){
ScrollViewClass=AndroidHorizontalScrollView;}else 
{
ScrollViewClass=AndroidScrollView;}}


invariant(
ScrollViewClass!==undefined,
'ScrollViewClass must not be undefined');


var refreshControl=this.props.refreshControl;
if(refreshControl){
if(Platform.OS==='ios'){

return (
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:this._setScrollViewRef,__source:{fileName:_jsxFileName,lineNumber:546}}),
refreshControl,
contentContainer));}else 


if(Platform.OS==='android'){



return React.cloneElement(
refreshControl,
{style:props.style},
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{style:styles.base,ref:this._setScrollViewRef,__source:{fileName:_jsxFileName,lineNumber:558}}),
contentContainer));}}




return (
React.createElement(ScrollViewClass,babelHelpers.extends({},props,{ref:this._setScrollViewRef,__source:{fileName:_jsxFileName,lineNumber:565}}),
contentContainer));}});





var styles=StyleSheet.create({
base:{
flex:1},

contentContainerHorizontal:{
alignSelf:'flex-start',
flexDirection:'row'}});



var nativeOnlyProps=void 0,AndroidScrollView=void 0,AndroidHorizontalScrollView=void 0,RCTScrollView=void 0;
if(Platform.OS==='android'){
nativeOnlyProps={
nativeOnly:{
sendMomentumEvents:true}};


AndroidScrollView=requireNativeComponent('RCTScrollView',ScrollView,nativeOnlyProps);
AndroidHorizontalScrollView=requireNativeComponent(
'AndroidHorizontalScrollView',
ScrollView,
nativeOnlyProps);}else 

if(Platform.OS==='ios'){
nativeOnlyProps={
nativeOnly:{
onMomentumScrollBegin:true,
onMomentumScrollEnd:true,
onScrollBeginDrag:true,
onScrollEndDrag:true}};


RCTScrollView=requireNativeComponent('RCTScrollView',ScrollView,nativeOnlyProps);}


module.exports=ScrollView;
}, "ScrollView");
__d(202 /* PointPropType */, function(global, require, module, exports) {'use strict';












var PropTypes=require(51 /* ReactPropTypes */);

var createStrictShapeTypeChecker=require(83 /* createStrictShapeTypeChecker */);

var PointPropType=createStrictShapeTypeChecker({
x:PropTypes.number,
y:PropTypes.number});


module.exports=PointPropType;
}, "PointPropType");
__d(203 /* ScrollResponder */, function(global, require, module, exports) {'use strict';












var Dimensions=require(92 /* Dimensions */);
var Platform=require(13 /* Platform */);
var Keyboard=require(25 /* Keyboard */);
var ReactNative=require(157 /* ReactNative */);
var Subscribable=require(199 /* Subscribable */);
var TextInputState=require(60 /* TextInputState */);
var UIManager=require(61 /* UIManager */);var _require=

require(12 /* NativeModules */);var ScrollViewManager=_require.ScrollViewManager;

var invariant=require(259 /* fbjs/lib/invariant */);















































































var IS_ANIMATING_TOUCH_START_THRESHOLD_MS=16;










var ScrollResponderMixin={
mixins:[Subscribable.Mixin],
scrollResponderMixinGetInitialState:function scrollResponderMixinGetInitialState(){
return {
isTouching:false,
lastMomentumScrollBeginTime:0,
lastMomentumScrollEndTime:0,






observedScrollSinceBecomingResponder:false,
becameResponderWhileAnimating:false};},






scrollResponderHandleScrollShouldSetResponder:function scrollResponderHandleScrollShouldSetResponder(){
return this.state.isTouching;},



























scrollResponderHandleStartShouldSetResponder:function scrollResponderHandleStartShouldSetResponder(){
return false;},













scrollResponderHandleStartShouldSetResponderCapture:function scrollResponderHandleStartShouldSetResponderCapture(e){

var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(!this.props.keyboardShouldPersistTaps&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput){
return true;}

return this.scrollResponderIsAnimating();},












scrollResponderHandleResponderReject:function scrollResponderHandleResponderReject(){},

















scrollResponderHandleTerminationRequest:function scrollResponderHandleTerminationRequest(){
return !this.state.observedScrollSinceBecomingResponder;},







scrollResponderHandleTouchEnd:function scrollResponderHandleTouchEnd(e){
var nativeEvent=e.nativeEvent;
this.state.isTouching=nativeEvent.touches.length!==0;
this.props.onTouchEnd&&this.props.onTouchEnd(e);},





scrollResponderHandleResponderRelease:function scrollResponderHandleResponderRelease(e){
this.props.onResponderRelease&&this.props.onResponderRelease(e);



var currentlyFocusedTextInput=TextInputState.currentlyFocusedField();
if(!this.props.keyboardShouldPersistTaps&&
currentlyFocusedTextInput!=null&&
e.target!==currentlyFocusedTextInput&&
!this.state.observedScrollSinceBecomingResponder&&
!this.state.becameResponderWhileAnimating){
this.props.onScrollResponderKeyboardDismissed&&
this.props.onScrollResponderKeyboardDismissed(e);
TextInputState.blurTextInput(currentlyFocusedTextInput);}},



scrollResponderHandleScroll:function scrollResponderHandleScroll(e){
this.state.observedScrollSinceBecomingResponder=true;
this.props.onScroll&&this.props.onScroll(e);},





scrollResponderHandleResponderGrant:function scrollResponderHandleResponderGrant(e){
this.state.observedScrollSinceBecomingResponder=false;
this.props.onResponderGrant&&this.props.onResponderGrant(e);
this.state.becameResponderWhileAnimating=this.scrollResponderIsAnimating();},









scrollResponderHandleScrollBeginDrag:function scrollResponderHandleScrollBeginDrag(e){
this.props.onScrollBeginDrag&&this.props.onScrollBeginDrag(e);},





scrollResponderHandleScrollEndDrag:function scrollResponderHandleScrollEndDrag(e){
this.props.onScrollEndDrag&&this.props.onScrollEndDrag(e);},





scrollResponderHandleMomentumScrollBegin:function scrollResponderHandleMomentumScrollBegin(e){
this.state.lastMomentumScrollBeginTime=Date.now();
this.props.onMomentumScrollBegin&&this.props.onMomentumScrollBegin(e);},





scrollResponderHandleMomentumScrollEnd:function scrollResponderHandleMomentumScrollEnd(e){
this.state.lastMomentumScrollEndTime=Date.now();
this.props.onMomentumScrollEnd&&this.props.onMomentumScrollEnd(e);},













scrollResponderHandleTouchStart:function scrollResponderHandleTouchStart(e){
this.state.isTouching=true;
this.props.onTouchStart&&this.props.onTouchStart(e);},













scrollResponderHandleTouchMove:function scrollResponderHandleTouchMove(e){
this.props.onTouchMove&&this.props.onTouchMove(e);},







scrollResponderIsAnimating:function scrollResponderIsAnimating(){
var now=Date.now();
var timeSinceLastMomentumScrollEnd=now-this.state.lastMomentumScrollEndTime;
var isAnimating=timeSinceLastMomentumScrollEnd<IS_ANIMATING_TOUCH_START_THRESHOLD_MS||
this.state.lastMomentumScrollEndTime<this.state.lastMomentumScrollBeginTime;
return isAnimating;},







scrollResponderGetScrollableNode:function scrollResponderGetScrollableNode(){
return this.getScrollableNode?
this.getScrollableNode():
ReactNative.findNodeHandle(this);},













scrollResponderScrollTo:function scrollResponderScrollTo(
x,
y,
animated)
{
if(typeof x==='number'){
console.warn('`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.');}else 
{var _ref=
x||{};x=_ref.x;y=_ref.y;animated=_ref.animated;}

UIManager.dispatchViewManagerCommand(
this.scrollResponderGetScrollableNode(),
UIManager.RCTScrollView.Commands.scrollTo,
[x||0,y||0,animated!==false]);},






scrollResponderScrollWithoutAnimationTo:function scrollResponderScrollWithoutAnimationTo(offsetX,offsetY){
console.warn('`scrollResponderScrollWithoutAnimationTo` is deprecated. Use `scrollResponderScrollTo` instead');
this.scrollResponderScrollTo({x:offsetX,y:offsetY,animated:false});},








scrollResponderZoomTo:function scrollResponderZoomTo(
rect,
animated)
{
if(Platform.OS==='android'){
invariant('zoomToRect is not implemented');}else 
{
if('animated' in rect){var 
animated=rect.animated;var rect=babelHelpers.objectWithoutProperties(rect,['animated']);}else 
if(typeof animated!=='undefined'){
console.warn('`scrollResponderZoomTo` `animated` argument is deprecated. Use `options.animated` instead');}

ScrollViewManager.zoomToRect(this.scrollResponderGetScrollableNode(),rect,animated!==false);}},













scrollResponderScrollNativeHandleToKeyboard:function scrollResponderScrollNativeHandleToKeyboard(nodeHandle,additionalOffset,preventNegativeScrollOffset){
this.additionalScrollOffset=additionalOffset||0;
this.preventNegativeScrollOffset=!!preventNegativeScrollOffset;
UIManager.measureLayout(
nodeHandle,
ReactNative.findNodeHandle(this.getInnerViewNode()),
this.scrollResponderTextInputFocusError,
this.scrollResponderInputMeasureAndScrollToKeyboard);},













scrollResponderInputMeasureAndScrollToKeyboard:function scrollResponderInputMeasureAndScrollToKeyboard(left,top,width,height){
var keyboardScreenY=Dimensions.get('window').height;
if(this.keyboardWillOpenTo){
keyboardScreenY=this.keyboardWillOpenTo.endCoordinates.screenY;}

var scrollOffsetY=top-keyboardScreenY+height+this.additionalScrollOffset;





if(this.preventNegativeScrollOffset){
scrollOffsetY=Math.max(0,scrollOffsetY);}

this.scrollResponderScrollTo({x:0,y:scrollOffsetY,animated:true});

this.additionalOffset=0;
this.preventNegativeScrollOffset=false;},


scrollResponderTextInputFocusError:function scrollResponderTextInputFocusError(e){
console.error('Error measuring text field: ',e);},








componentWillMount:function componentWillMount(){
this.keyboardWillOpenTo=null;
this.additionalScrollOffset=0;
this.addListenerOn(Keyboard,'keyboardWillShow',this.scrollResponderKeyboardWillShow);
this.addListenerOn(Keyboard,'keyboardWillHide',this.scrollResponderKeyboardWillHide);
this.addListenerOn(Keyboard,'keyboardDidShow',this.scrollResponderKeyboardDidShow);
this.addListenerOn(Keyboard,'keyboardDidHide',this.scrollResponderKeyboardDidHide);},






























scrollResponderKeyboardWillShow:function scrollResponderKeyboardWillShow(e){
this.keyboardWillOpenTo=e;
this.props.onKeyboardWillShow&&this.props.onKeyboardWillShow(e);},


scrollResponderKeyboardWillHide:function scrollResponderKeyboardWillHide(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardWillHide&&this.props.onKeyboardWillHide(e);},


scrollResponderKeyboardDidShow:function scrollResponderKeyboardDidShow(e){


if(e){
this.keyboardWillOpenTo=e;}

this.props.onKeyboardDidShow&&this.props.onKeyboardDidShow(e);},


scrollResponderKeyboardDidHide:function scrollResponderKeyboardDidHide(e){
this.keyboardWillOpenTo=null;
this.props.onKeyboardDidHide&&this.props.onKeyboardDidHide(e);}};




var ScrollResponder={
Mixin:ScrollResponderMixin};


module.exports=ScrollResponder;
}, "ScrollResponder");
__d(204 /* dismissKeyboard */, function(global, require, module, exports) {'use strict';








var TextInputState=require(60 /* TextInputState */);

function dismissKeyboard(){
TextInputState.blurTextInput(TextInputState.currentlyFocusedField());}


module.exports=dismissKeyboard;
}, "dismissKeyboard");
__d(205 /* processDecelerationRate */, function(global, require, module, exports) {'use strict';











function processDecelerationRate(decelerationRate){
if(decelerationRate==='normal'){
decelerationRate=0.998;}else 
if(decelerationRate==='fast'){
decelerationRate=0.99;}

return decelerationRate;}


module.exports=processDecelerationRate;
}, "processDecelerationRate");
__d(206 /* BackAndroid */, function(global, require, module, exports) {'use strict';












var DeviceEventManager=require(12 /* NativeModules */).DeviceEventManager;
var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);

var DEVICE_BACK_EVENT='hardwareBackPress';





var _backPressSubscriptions=new Set();

RCTDeviceEventEmitter.addListener(DEVICE_BACK_EVENT,function(){
var backPressSubscriptions=new Set(_backPressSubscriptions);
var invokeDefault=true;
backPressSubscriptions.forEach(function(subscription){
if(subscription()){
invokeDefault=false;}});


if(invokeDefault){
BackAndroid.exitApp();}});



















var BackAndroid={

exitApp:function exitApp(){
DeviceEventManager.invokeDefaultBackPressHandler();},


addEventListener:function addEventListener(
eventName,
handler)
{
_backPressSubscriptions.add(handler);
return {
remove:function remove(){return BackAndroid.removeEventListener(eventName,handler);}};},



removeEventListener:function removeEventListener(
eventName,
handler)
{
_backPressSubscriptions.delete(handler);}};




module.exports=BackAndroid;
}, "BackAndroid");
__d(207 /* ViewRenderingTestModule */, function(global, require, module, exports) {"use strict";var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/ViewRenderingTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(34 /* React */);
var View=require(81 /* View */);
var StyleSheet=require(90 /* StyleSheet */);

var renderApplication=require(133 /* renderApplication */);

var styles=StyleSheet.create({
view:{
opacity:0.75,
backgroundColor:"rgb(255, 0, 0)"}});



var ViewSampleApp=React.createClass({displayName:'ViewSampleApp',
render:function render(){
return (
React.createElement(View,{style:styles.view,collapsable:false,__source:{fileName:_jsxFileName,lineNumber:31}}));},


getInitialState:function getInitialState(){
return {};}});



var _updateMargins;
var MarginSampleApp=React.createClass({displayName:'MarginSampleApp',
getInitialState:function getInitialState(){
return {margin:10};},

render:function render(){
_updateMargins=this.setState.bind(this,{margin:15});
return (
React.createElement(View,{style:{margin:this.state.margin,marginLeft:20},collapsable:false,__source:{fileName:_jsxFileName,lineNumber:47}}));}});




var BorderSampleApp=React.createClass({displayName:'BorderSampleApp',
render:function render(){
return (
React.createElement(View,{style:{borderLeftWidth:20,borderWidth:5,backgroundColor:'blue'},collapsable:false,__source:{fileName:_jsxFileName,lineNumber:55}},
React.createElement(View,{style:{backgroundColor:'red',width:20,height:20},collapsable:false,__source:{fileName:_jsxFileName,lineNumber:56}})));}});





var TransformSampleApp=React.createClass({displayName:'TransformSampleApp',
render:function render(){
var style={
transform:[
{translateX:20},
{translateY:25},
{rotate:'15deg'},
{scaleX:5},
{scaleY:10}]};


return (
React.createElement(View,{style:style,collapsable:false,__source:{fileName:_jsxFileName,lineNumber:74}}));}});




var ViewRenderingTestModule={
renderViewApplication:function renderViewApplication(rootTag){
renderApplication(ViewSampleApp,{},rootTag);},

renderMarginApplication:function renderMarginApplication(rootTag){
renderApplication(MarginSampleApp,{},rootTag);},

renderBorderApplication:function renderBorderApplication(rootTag){
renderApplication(BorderSampleApp,{},rootTag);},

renderTransformApplication:function renderTransformApplication(rootTag){
renderApplication(TransformSampleApp,{},rootTag);},

updateMargins:function updateMargins(){
_updateMargins();}};



BatchedBridge.registerCallableModule(
'ViewRenderingTestModule',
ViewRenderingTestModule);


module.exports=ViewRenderingTestModule;
}, "ViewRenderingTestModule");
__d(208 /* PickerAndroidTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/PickerAndroidTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(34 /* React */);
var RecordingModule=require(12 /* NativeModules */).PickerAndroidRecordingModule;
var Picker=require(209 /* Picker */);
var View=require(81 /* View */);

var Item=Picker.Item;

var appInstance;
var PickerAndroidTestApp=React.createClass({displayName:'PickerAndroidTestApp',
componentWillMount:function componentWillMount(){
appInstance=this;},

getInitialState:function getInitialState(){
return {
selected:1,
mode:'dropdown',
style:{}};},


render:function render(){
return (
React.createElement(View,{collapsable:false,__source:{fileName:_jsxFileName,lineNumber:36}},
React.createElement(Picker,{
mode:'dialog',
prompt:'prompt',
style:this.state.style,
selectedValue:this.state.selected,
onValueChange:this.onValueChange,__source:{fileName:_jsxFileName,lineNumber:37}},
React.createElement(Item,{label:'item1',color:'#ff0000',value:0,__source:{fileName:_jsxFileName,lineNumber:43}}),
React.createElement(Item,{label:'item2',color:'#00ff00',value:1,__source:{fileName:_jsxFileName,lineNumber:44}}),
React.createElement(Item,{label:'item3',color:'#0000ff',value:2,__source:{fileName:_jsxFileName,lineNumber:45}})),

React.createElement(Picker,{mode:this.state.mode,__source:{fileName:_jsxFileName,lineNumber:47}},
React.createElement(Item,{label:'item1',__source:{fileName:_jsxFileName,lineNumber:48}}),
React.createElement(Item,{label:'item2',__source:{fileName:_jsxFileName,lineNumber:49}})),

React.createElement(Picker,{enabled:false,__source:{fileName:_jsxFileName,lineNumber:51}},
React.createElement(Item,{label:'item1',__source:{fileName:_jsxFileName,lineNumber:52}}),
React.createElement(Item,{label:'item2',__source:{fileName:_jsxFileName,lineNumber:53}})),

React.createElement(Picker,{
mode:'dropdown',
selectedValue:this.state.selected,
onValueChange:this.onValueChange,__source:{fileName:_jsxFileName,lineNumber:55}},
React.createElement(Item,{label:'item in sync 1',value:0,__source:{fileName:_jsxFileName,lineNumber:59}}),
React.createElement(Item,{label:'item in sync 2',value:1,__source:{fileName:_jsxFileName,lineNumber:60}}),
React.createElement(Item,{label:'item in sync 3',value:2,__source:{fileName:_jsxFileName,lineNumber:61}}))));},




onValueChange:function onValueChange(value){
this.setState({selected:value});
RecordingModule.recordSelection(value);}});



var PickerAndroidTestModule={
PickerAndroidTestApp:PickerAndroidTestApp,
selectItem:function selectItem(value){
appInstance.setState({selected:value});},

setMode:function setMode(mode){
appInstance.setState({mode:mode});},

setPrimaryColor:function setPrimaryColor(color){
appInstance.setState({style:{color:color}});}};



BatchedBridge.registerCallableModule(
'PickerAndroidTestModule',
PickerAndroidTestModule);


module.exports=PickerAndroidTestModule;
}, "PickerAndroidTestModule");
__d(209 /* Picker */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/Picker/Picker.js';













var ColorPropType=require(69 /* ColorPropType */);
var PickerIOS=require(210 /* PickerIOS */);
var PickerAndroid=require(211 /* PickerAndroid */);
var Platform=require(13 /* Platform */);
var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var StyleSheetPropType=require(87 /* StyleSheetPropType */);
var TextStylePropTypes=require(74 /* TextStylePropTypes */);
var UnimplementedView=require(89 /* UnimplementedView */);
var View=require(81 /* View */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);

var itemStylePropType=StyleSheetPropType(TextStylePropTypes);

var pickerStyleType=StyleSheetPropType(babelHelpers.extends({},
ViewStylePropTypes,{
color:ColorPropType}));


var MODE_DIALOG='dialog';
var MODE_DROPDOWN='dropdown';











var Picker=React.createClass({displayName:'Picker',

statics:{



MODE_DIALOG:MODE_DIALOG,



MODE_DROPDOWN:MODE_DROPDOWN},


getDefaultProps:function getDefaultProps(){
return {
mode:MODE_DIALOG};},



propTypes:babelHelpers.extends({},
View.propTypes,{
style:pickerStyleType,



selectedValue:React.PropTypes.any,





onValueChange:React.PropTypes.func,





enabled:React.PropTypes.bool,








mode:React.PropTypes.oneOf(['dialog','dropdown']),




itemStyle:itemStylePropType,




prompt:React.PropTypes.string,



testID:React.PropTypes.string}),


render:function render(){
if(Platform.OS==='ios'){
return React.createElement(PickerIOS,babelHelpers.extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:112}}),this.props.children);}else 
if(Platform.OS==='android'){
return React.createElement(PickerAndroid,babelHelpers.extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:114}}),this.props.children);}else 
{
return React.createElement(UnimplementedView,{__source:{fileName:_jsxFileName,lineNumber:116}});}}});







Picker.Item=React.createClass({displayName:'Item',

propTypes:{



label:React.PropTypes.string.isRequired,




value:React.PropTypes.any,




color:ColorPropType,



testID:React.PropTypes.string},


render:function render(){

throw null;}});



module.exports=Picker;
}, "Picker");
__d(210 /* PickerIOS */, function(global, require, module, exports) {'use strict';













module.exports=require(89 /* UnimplementedView */);
}, "PickerIOS");
__d(211 /* PickerAndroid */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/Picker/PickerAndroid.android.js';













var ColorPropType=require(69 /* ColorPropType */);
var React=require(34 /* React */);
var ReactChildren=require(35 /* ReactChildren */);
var ReactPropTypes=require(51 /* ReactPropTypes */);
var StyleSheet=require(90 /* StyleSheet */);
var StyleSheetPropType=require(87 /* StyleSheetPropType */);
var View=require(81 /* View */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);

var processColor=require(77 /* processColor */);
var requireNativeComponent=require(88 /* requireNativeComponent */);

var REF_PICKER='picker';
var MODE_DIALOG='dialog';
var MODE_DROPDOWN='dropdown';

var pickerStyleType=StyleSheetPropType(babelHelpers.extends({},
ViewStylePropTypes,{
color:ColorPropType}));







var PickerAndroid=React.createClass({displayName:'PickerAndroid',

propTypes:babelHelpers.extends({},
View.propTypes,{
style:pickerStyleType,
selectedValue:React.PropTypes.any,
enabled:ReactPropTypes.bool,
mode:ReactPropTypes.oneOf(['dialog','dropdown']),
onValueChange:ReactPropTypes.func,
prompt:ReactPropTypes.string,
testID:ReactPropTypes.string}),


getInitialState:function getInitialState(){
var state=this._stateFromProps(this.props);
return babelHelpers.extends({},
state,{
initialSelectedIndex:state.selectedIndex});},



componentWillReceiveProps:function componentWillReceiveProps(nextProps){
this.setState(this._stateFromProps(nextProps));},



_stateFromProps:function _stateFromProps(props){
var selectedIndex=0;
var items=ReactChildren.map(props.children,function(child,index){
if(child.props.value===props.selectedValue){
selectedIndex=index;}

var childProps={
value:child.props.value,
label:child.props.label};

if(child.props.color){
childProps.color=processColor(child.props.color);}

return childProps;});

return {selectedIndex:selectedIndex,items:items};},


render:function render(){
var Picker=this.props.mode===MODE_DROPDOWN?DropdownPicker:DialogPicker;

var nativeProps={
enabled:this.props.enabled,
items:this.state.items,
mode:this.props.mode,
onSelect:this._onChange,
prompt:this.props.prompt,
selected:this.state.initialSelectedIndex,
testID:this.props.testID,
style:[styles.pickerAndroid,this.props.style]};


return React.createElement(Picker,babelHelpers.extends({ref:REF_PICKER},nativeProps,{__source:{fileName:_jsxFileName,lineNumber:99}}));},


_onChange:function _onChange(event){
if(this.props.onValueChange){
var position=event.nativeEvent.position;
if(position>=0){
var value=this.props.children[position].props.value;
this.props.onValueChange(value,position);}else 
{
this.props.onValueChange(null,position);}}


this._lastNativePosition=event.nativeEvent.position;
this.forceUpdate();},


componentDidMount:function componentDidMount(){
this._lastNativePosition=this.state.initialSelectedIndex;},


componentDidUpdate:function componentDidUpdate(){






if(this.refs[REF_PICKER]&&this.state.selectedIndex!==this._lastNativePosition){
this.refs[REF_PICKER].setNativeProps({selected:this.state.selectedIndex});
this._lastNativePosition=this.state.selectedIndex;}}});




var styles=StyleSheet.create({
pickerAndroid:{





height:50}});



var cfg={
nativeOnly:{
items:true,
selected:true}};



var DropdownPicker=requireNativeComponent('AndroidDropdownPicker',PickerAndroid,cfg);
var DialogPicker=requireNativeComponent('AndroidDialogPicker',PickerAndroid,cfg);

module.exports=PickerAndroid;
}, "PickerAndroid");
__d(212 /* CatalystRootViewTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/CatalystRootViewTestModule.js';












var React=require(34 /* React */);
var Recording=require(12 /* NativeModules */).Recording;
var View=require(81 /* View */);

var CatalystRootViewTestApp=React.createClass({displayName:'CatalystRootViewTestApp',
componentWillUnmount:function componentWillUnmount(){
Recording.record('RootComponentWillUnmount');},

render:function render(){
return React.createElement(View,{collapsable:false,style:{alignSelf:'stretch'},__source:{fileName:_jsxFileName,lineNumber:23}});}});



module.exports={
CatalystRootViewTestApp:CatalystRootViewTestApp};
}, "CatalystRootViewTestModule");
__d(213 /* DatePickerDialogTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/DatePickerDialogTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var DatePickerAndroid=require(214 /* DatePickerAndroid */);
var React=require(34 /* React */);
var RecordingModule=require(12 /* NativeModules */).DatePickerDialogRecordingModule;
var View=require(81 /* View */);

var DatePickerDialogTestApp=React.createClass({displayName:'DatePickerDialogTestApp',
render:function render(){
return React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:22}});}});



var DatePickerDialogTestModule={
DatePickerDialogTestApp:DatePickerDialogTestApp,
showDatePickerDialog:function showDatePickerDialog(options){
DatePickerAndroid.open(options).then(
function(_ref){var action=_ref.action;var year=_ref.year;var month=_ref.month;var day=_ref.day;
if(action===DatePickerAndroid.dateSetAction){
RecordingModule.recordDate(year,month,day);}else 
if(action===DatePickerAndroid.dismissedAction){
RecordingModule.recordDismissed();}},


function(_ref2){var code=_ref2.code;var message=_ref2.message;return RecordingModule.recordError();});}};




BatchedBridge.registerCallableModule(
'DatePickerDialogTestModule',
DatePickerDialogTestModule);


module.exports=DatePickerDialogTestModule;
}, "DatePickerDialogTestModule");
__d(214 /* DatePickerAndroid */, function(global, require, module, exports) {'use strict';












var DatePickerModule=require(12 /* NativeModules */).DatePickerAndroid;




function _toMillis(options,key){
var dateVal=options[key];

if(typeof dateVal==='object'&&typeof dateVal.getMonth==='function'){
options[key]=dateVal.getTime();}}var 























DatePickerAndroid=function(){function DatePickerAndroid(){babelHelpers.classCallCheck(this,DatePickerAndroid);}babelHelpers.createClass(DatePickerAndroid,null,[{key:'open',value:function open(
















options){var 
optionsMs;return regeneratorRuntime.async(function open$(_context){while(1){switch(_context.prev=_context.next){case 0:optionsMs=options;
if(optionsMs){
_toMillis(options,'date');
_toMillis(options,'minDate');
_toMillis(options,'maxDate');}return _context.abrupt('return',

DatePickerModule.open(options));case 3:case 'end':return _context.stop();}}},null,this);}},{key:'dateSetAction',get:function get()





{return 'dateSetAction';}},{key:'dismissedAction',get:function get()



{return 'dismissedAction';}}]);return DatePickerAndroid;}();


module.exports=DatePickerAndroid;
}, "DatePickerAndroid");
__d(215 /* ScrollViewTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/ScrollViewTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(34 /* React */);
var View=require(81 /* View */);
var ScrollView=require(201 /* ScrollView */);
var Text=require(141 /* Text */);
var StyleSheet=require(90 /* StyleSheet */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);
var ScrollListener=require(12 /* NativeModules */).ScrollListener;

var NUM_ITEMS=100;



var scrollViewApp;

var Item=React.createClass({displayName:'Item',
render:function render(){
return (
React.createElement(TouchableWithoutFeedback,{onPress:this.props.onPress,__source:{fileName:_jsxFileName,lineNumber:32}},
React.createElement(View,{style:styles.item_container,__source:{fileName:_jsxFileName,lineNumber:33}},
React.createElement(Text,{style:styles.item_text,__source:{fileName:_jsxFileName,lineNumber:34}},this.props.text))));}});






var getInitialState=function getInitialState(){
var data=[];
for(var i=0;i<NUM_ITEMS;i++){
data[i]={text:'Item '+i+'!'};}

return {
data:data};};



var onScroll=function onScroll(e){
ScrollListener.onScroll(e.nativeEvent.contentOffset.x,e.nativeEvent.contentOffset.y);};


var onScrollBeginDrag=function onScrollBeginDrag(e){
ScrollListener.onScrollBeginDrag(e.nativeEvent.contentOffset.x,e.nativeEvent.contentOffset.y);};


var onScrollEndDrag=function onScrollEndDrag(e){
ScrollListener.onScrollEndDrag(e.nativeEvent.contentOffset.x,e.nativeEvent.contentOffset.y);};


var onItemPress=function onItemPress(itemNumber){
ScrollListener.onItemPress(itemNumber);};


var ScrollViewTestApp=React.createClass({displayName:'ScrollViewTestApp',
getInitialState:getInitialState,
onScroll:onScroll,
onItemPress:onItemPress,
onScrollBeginDrag:onScrollBeginDrag,
onScrollEndDrag:onScrollEndDrag,

scrollTo:function scrollTo(destX,destY){
this.refs.scrollView.scrollTo(destY,destX);},


render:function render(){var _this=this;
scrollViewApp=this;
var children=this.state.data.map(function(item,index){return (
React.createElement(Item,{
key:index,text:item.text,
onPress:_this.onItemPress.bind(_this,index),__source:{fileName:_jsxFileName,lineNumber:81}}));});

return (
React.createElement(ScrollView,{onScroll:this.onScroll,onScrollBeginDrag:this.onScrollBeginDrag,onScrollEndDrag:this.onScrollEndDrag,ref:'scrollView',__source:{fileName:_jsxFileName,lineNumber:86}},
children));}});





var HorizontalScrollViewTestApp=React.createClass({displayName:'HorizontalScrollViewTestApp',
getInitialState:getInitialState,
onScroll:onScroll,
onItemPress:onItemPress,

scrollTo:function scrollTo(destX,destY){
this.refs.scrollView.scrollTo(destY,destX);},


render:function render(){var _this2=this;
scrollViewApp=this;
var children=this.state.data.map(function(item,index){return (
React.createElement(Item,{
key:index,text:item.text,
onPress:_this2.onItemPress.bind(_this2,index),__source:{fileName:_jsxFileName,lineNumber:105}}));});

return (
React.createElement(ScrollView,{horizontal:true,onScroll:this.onScroll,ref:'scrollView',__source:{fileName:_jsxFileName,lineNumber:110}},
children));}});





var styles=StyleSheet.create({
item_container:{
padding:30,
backgroundColor:'#ffffff'},

item_text:{
flex:1,
fontSize:18,
alignSelf:'center'}});



var ScrollViewTestModule={
ScrollViewTestApp:ScrollViewTestApp,
HorizontalScrollViewTestApp:HorizontalScrollViewTestApp,
scrollTo:function scrollTo(destX,destY){
scrollViewApp.scrollTo(destX,destY);}};



BatchedBridge.registerCallableModule(
'ScrollViewTestModule',
ScrollViewTestModule);


module.exports=ScrollViewTestModule;
}, "ScrollViewTestModule");
__d(216 /* SwipeRefreshLayoutTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/SwipeRefreshLayoutTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(34 /* React */);
var RecordingModule=require(12 /* NativeModules */).SwipeRefreshLayoutRecordingModule;
var ScrollView=require(201 /* ScrollView */);
var PullToRefreshViewAndroid=require(217 /* PullToRefreshViewAndroid */);
var Text=require(141 /* Text */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);
var View=require(81 /* View */);

var Row=React.createClass({displayName:'Row',
getInitialState:function getInitialState(){
return {
clicks:0};},



render:function render(){
return (
React.createElement(TouchableWithoutFeedback,{onPress:this._onPress,__source:{fileName:_jsxFileName,lineNumber:32}},
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:33}},
React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:34}},
this.state.clicks+' clicks'))));},






_onPress:function _onPress(){
this.setState({clicks:this.state.clicks+1});}});



var app=null;
var SwipeRefreshLayoutTestApp=React.createClass({displayName:'SwipeRefreshLayoutTestApp',
getInitialState:function getInitialState(){
return {
rows:2};},



componentDidMount:function componentDidMount(){
app=this;},


render:function render(){
var rows=[];
for(var i=0;i<this.state.rows;i++){
rows.push(React.createElement(Row,{key:i,__source:{fileName:_jsxFileName,lineNumber:62}}));}

return (
React.createElement(PullToRefreshViewAndroid,{
style:{flex:1},
onRefresh:function onRefresh(){return RecordingModule.onRefresh();},__source:{fileName:_jsxFileName,lineNumber:65}},
React.createElement(ScrollView,{style:{flex:1},__source:{fileName:_jsxFileName,lineNumber:68}},
rows)));}});






var SwipeRefreshLayoutTestModule={
SwipeRefreshLayoutTestApp:SwipeRefreshLayoutTestApp,
setRows:function setRows(rows){
if(app!=null){
app.setState({rows:rows});}}};




BatchedBridge.registerCallableModule(
'SwipeRefreshLayoutTestModule',
SwipeRefreshLayoutTestModule);


module.exports=SwipeRefreshLayoutTestModule;
}, "SwipeRefreshLayoutTestModule");
__d(217 /* PullToRefreshViewAndroid */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/PullToRefresh/PullToRefreshViewAndroid.android.js';











var ColorPropType=require(69 /* ColorPropType */);
var React=require(34 /* React */);
var RefreshLayoutConsts=require(61 /* UIManager */).AndroidSwipeRefreshLayout.Constants;
var View=require(81 /* View */);

var onlyChild=require(53 /* onlyChild */);
var requireNativeComponent=require(88 /* requireNativeComponent */);

var NATIVE_REF='native_swiperefreshlayout';










var PullToRefreshViewAndroid=React.createClass({displayName:'PullToRefreshViewAndroid',
statics:{
SIZE:RefreshLayoutConsts.SIZE},


propTypes:babelHelpers.extends({},
View.propTypes,{



enabled:React.PropTypes.bool,



colors:React.PropTypes.arrayOf(ColorPropType),



progressBackgroundColor:ColorPropType,




progressViewOffset:React.PropTypes.number,



refreshing:React.PropTypes.bool,



size:React.PropTypes.oneOf(RefreshLayoutConsts.SIZE.DEFAULT,RefreshLayoutConsts.SIZE.LARGE)}),


componentDidMount:function componentDidMount(){
console.warn('`PullToRefreshViewAndroid` is deprecated. Use `RefreshControl` instead.');},


getInnerViewNode:function getInnerViewNode(){
return this.refs[NATIVE_REF];},


setNativeProps:function setNativeProps(props){
var innerViewNode=this.getInnerViewNode();
return innerViewNode&&innerViewNode.setNativeProps(props);},


render:function render(){
return (
React.createElement(NativePullToRefresh,{
colors:this.props.colors,
enabled:this.props.enabled,
onRefresh:this._onRefresh,
progressBackgroundColor:this.props.progressBackgroundColor,
ref:NATIVE_REF,
refreshing:this.props.refreshing,
progressViewOffset:this.props.progressViewOffset,
size:this.props.size,
style:this.props.style,__source:{fileName:_jsxFileName,lineNumber:81}},
onlyChild(this.props.children)));},




_onRefresh:function _onRefresh(){
this.props.onRefresh&&this.props.onRefresh();
this.setNativeProps({refreshing:!!this.props.refreshing});}});



var NativePullToRefresh=requireNativeComponent(
'AndroidSwipeRefreshLayout',
PullToRefreshViewAndroid);


module.exports=PullToRefreshViewAndroid;
}, "PullToRefreshViewAndroid");
__d(218 /* TextInputTestModule */, function(global, require, module, exports) {"use strict";var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/TextInputTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var React=require(34 /* React */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var TextInput=require(219 /* TextInput */);
var View=require(81 /* View */);

var app;var 

TokenizedTextExample=function(_React$Component){babelHelpers.inherits(TokenizedTextExample,_React$Component);
function TokenizedTextExample(props){babelHelpers.classCallCheck(this,TokenizedTextExample);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TokenizedTextExample).call(this,
props));
_this.state={text:''};return _this;}babelHelpers.createClass(TokenizedTextExample,[{key:'render',value:function render()

{var _this2=this;


var delimiter=/\s+/;


var _text=this.state.text;
var token=void 0,index=void 0,parts=[];
while(_text){
delimiter.lastIndex=0;
token=delimiter.exec(_text);
if(token===null){
break;}

index=token.index;
if(token[0].length===0){
index=1;}

parts.push(_text.substr(0,index));
parts.push(token[0]);
index=index+token[0].length;
_text=_text.slice(index);}

parts.push(_text);


parts=parts.map(function(text){
if(/^#/.test(text)){
return React.createElement(Text,{key:text,style:styles.hashtag,__source:{fileName:_jsxFileName,lineNumber:56}},text);}else 
{
return text;}});



return (
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:63}},
React.createElement(TextInput,{
ref:'tokenizedInput',
testID:'tokenizedInput',
multiline:true,
style:styles.multiline,
onChangeText:function onChangeText(text){
_this2.setState({text:text});},__source:{fileName:_jsxFileName,lineNumber:64}},

React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:72}},parts))));}}]);return TokenizedTextExample;}(React.Component);






var TextInputTestApp=React.createClass({displayName:'TextInputTestApp',
componentDidMount:function componentDidMount(){
app=this;},


render:function render(){
return (
React.createElement(View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:86}},
React.createElement(TextInput,{
style:styles.textInputHeight,
autoCorrect:true,
autoFocus:true,
keyboardType:'numeric',
multiline:true,
password:true,
defaultValue:'This is text',
testID:'textInput1',__source:{fileName:_jsxFileName,lineNumber:87}}),

React.createElement(TextInput,{
style:styles.textInput,
autoCapitalize:'sentences',
autoCorrect:false,
autoFocus:false,
keyboardType:'default',
multiline:false,
password:false,
placeholder:'1234',
testID:'textInput2',__source:{fileName:_jsxFileName,lineNumber:97}}),

React.createElement(TextInput,{
ref:'textInput3',
style:styles.textInput,
defaultValue:'Hello, World',
testID:'textInput3',__source:{fileName:_jsxFileName,lineNumber:108}}),

React.createElement(TextInput,{
ref:'textInput4',
style:[styles.textInput,{color:'#00ff00'}],
testID:'textInput4',__source:{fileName:_jsxFileName,lineNumber:114}}),

React.createElement(TextInput,{
ref:'textInput5',
style:[styles.textInput,{color:'#00ff00'}],
defaultValue:'',
testID:'textInput5',__source:{fileName:_jsxFileName,lineNumber:119}}),

React.createElement(TextInput,{
ref:'textInput6',
style:[styles.textInput,{color:'#00ff00'}],
defaultValue:'Text',
testID:'textInput6',__source:{fileName:_jsxFileName,lineNumber:125}}),

React.createElement(TokenizedTextExample,{__source:{fileName:_jsxFileName,lineNumber:131}})));}});





var styles=StyleSheet.create({
container:{
padding:5,
margin:10},

textInputHeight:{
fontSize:21,
height:30},

textInput:{
fontSize:21,
padding:0},

hashtag:{
color:'blue',
fontWeight:'bold'}});



var TextInputTestModule={
TextInputTestApp:TextInputTestApp,
setValueRef:function setValueRef(ref,value){
app.refs[ref].setNativeProps({
text:value});}};




BatchedBridge.registerCallableModule(
'TextInputTestModule',
TextInputTestModule);


module.exports=TextInputTestModule;
}, "TextInputTestModule");
__d(219 /* TextInput */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/TextInput/TextInput.js';












var DocumentSelectionState=require(220 /* DocumentSelectionState */);
var EventEmitter=require(19 /* EventEmitter */);
var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var Platform=require(13 /* Platform */);
var PropTypes=require(51 /* ReactPropTypes */);
var React=require(34 /* React */);
var ReactNative=require(157 /* ReactNative */);
var ReactChildren=require(35 /* ReactChildren */);
var StyleSheet=require(90 /* StyleSheet */);
var Text=require(141 /* Text */);
var TextInputState=require(60 /* TextInputState */);
var TimerMixin=require(300 /* react-timer-mixin */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);
var UIManager=require(61 /* UIManager */);
var View=require(81 /* View */);

var createReactNativeComponentClass=require(94 /* createReactNativeComponentClass */);
var emptyFunction=require(261 /* fbjs/lib/emptyFunction */);
var invariant=require(259 /* fbjs/lib/invariant */);
var requireNativeComponent=require(88 /* requireNativeComponent */);

var onlyMultiline={
onTextInput:true,
children:true};


var notMultiline={};



if(Platform.OS==='android'){
var AndroidTextInput=requireNativeComponent('AndroidTextInput',null);}else 
if(Platform.OS==='ios'){
var RCTTextView=requireNativeComponent('RCTTextView',null);
var RCTTextField=requireNativeComponent('RCTTextField',null);}



































var TextInput=React.createClass({displayName:'TextInput',
statics:{

State:TextInputState},


propTypes:babelHelpers.extends({},
View.propTypes,{








autoCapitalize:PropTypes.oneOf([
'none',
'sentences',
'words',
'characters']),




autoCorrect:PropTypes.bool,




autoFocus:PropTypes.bool,



editable:PropTypes.bool,









keyboardType:PropTypes.oneOf([

'default',
'email-address',
'numeric',
'phone-pad',

'ascii-capable',
'numbers-and-punctuation',
'url',
'number-pad',
'name-phone-pad',
'decimal-pad',
'twitter',
'web-search']),





keyboardAppearance:PropTypes.oneOf([
'default',
'light',
'dark']),



























returnKeyType:PropTypes.oneOf([

'done',
'go',
'next',
'search',
'send',

'none',
'previous',

'default',
'emergency-call',
'google',
'join',
'route',
'yahoo']),





returnKeyLabel:PropTypes.string,




maxLength:PropTypes.number,





numberOfLines:PropTypes.number,





enablesReturnKeyAutomatically:PropTypes.bool,




multiline:PropTypes.bool,



onBlur:PropTypes.func,



onFocus:PropTypes.func,



onChange:PropTypes.func,




onChangeText:PropTypes.func,



onEndEditing:PropTypes.func,



onSelectionChange:PropTypes.func,




onSubmitEditing:PropTypes.func,






onKeyPress:PropTypes.func,



onLayout:PropTypes.func,



placeholder:PropTypes.string,



placeholderTextColor:PropTypes.string,




secureTextEntry:PropTypes.bool,



selectionColor:PropTypes.string,





selectionState:PropTypes.instanceOf(DocumentSelectionState),









value:PropTypes.string,





defaultValue:PropTypes.string,




clearButtonMode:PropTypes.oneOf([
'never',
'while-editing',
'unless-editing',
'always']),





clearTextOnFocus:PropTypes.bool,



selectTextOnFocus:PropTypes.bool,







blurOnSubmit:PropTypes.bool,



style:Text.propTypes.style,




underlineColorAndroid:PropTypes.string}),






mixins:[NativeMethodsMixin,TimerMixin],

viewConfig:
Platform.OS==='ios'&&RCTTextField?
RCTTextField.viewConfig:
Platform.OS==='android'&&AndroidTextInput?
AndroidTextInput.viewConfig:
{},




isFocused:function isFocused(){
return TextInputState.currentlyFocusedField()===
ReactNative.findNodeHandle(this.refs.input);},


contextTypes:{
onFocusRequested:React.PropTypes.func,
focusEmitter:React.PropTypes.instanceOf(EventEmitter)},


_focusSubscription:undefined,

componentDidMount:function componentDidMount(){var _this=this;
if(!this.context.focusEmitter){
if(this.props.autoFocus){
this.requestAnimationFrame(this.focus);}

return;}

this._focusSubscription=this.context.focusEmitter.addListener(
'focus',
function(el){
if(_this===el){
_this.requestAnimationFrame(_this.focus);}else 
if(_this.isFocused()){
_this.blur();}});



if(this.props.autoFocus){
this.context.onFocusRequested(this);}},



componentWillUnmount:function componentWillUnmount(){
this._focusSubscription&&this._focusSubscription.remove();
if(this.isFocused()){
this.blur();}},



getChildContext:function getChildContext(){
return {isInAParentText:true};},


childContextTypes:{
isInAParentText:React.PropTypes.bool},





clear:function clear(){
this.setNativeProps({text:''});},


render:function render(){
if(Platform.OS==='ios'){
return this._renderIOS();}else 
if(Platform.OS==='android'){
return this._renderAndroid();}},



_getText:function _getText(){
return typeof this.props.value==='string'?
this.props.value:
this.props.defaultValue;},


_renderIOS:function _renderIOS(){var _this2=this;
var textContainer;

var onSelectionChange;
if(this.props.selectionState||this.props.onSelectionChange){
onSelectionChange=function onSelectionChange(event){
if(_this2.props.selectionState){
var selection=event.nativeEvent.selection;
_this2.props.selectionState.update(selection.start,selection.end);}

_this2.props.onSelectionChange&&_this2.props.onSelectionChange(event);};}



var props=babelHelpers.extends({},this.props);
props.style=[styles.input,this.props.style];
if(!props.multiline){
for(var propKey in onlyMultiline){
if(props[propKey]){
throw new Error(
'TextInput prop `'+propKey+'` is only supported with multiline.');}}



textContainer=
React.createElement(RCTTextField,babelHelpers.extends({
ref:'input'},
props,{
onFocus:this._onFocus,
onBlur:this._onBlur,
onChange:this._onChange,
onSelectionChange:onSelectionChange,
onSelectionChangeShouldSetResponder:emptyFunction.thatReturnsTrue,
text:this._getText(),__source:{fileName:_jsxFileName,lineNumber:453}}));}else 

{
for(var propKey in notMultiline){
if(props[propKey]){
throw new Error(
'TextInput prop `'+propKey+'` cannot be used with multiline.');}}




var children=props.children;
var childCount=0;
ReactChildren.forEach(children,function(){return ++childCount;});
invariant(
!(props.value&&childCount),
'Cannot specify both value and children.');

if(childCount>=1){
children=React.createElement(Text,{style:props.style,__source:{fileName:_jsxFileName,lineNumber:480}},children);}

if(props.inputView){
children=[children,props.inputView];}

textContainer=
React.createElement(RCTTextView,babelHelpers.extends({
ref:'input'},
props,{
children:children,
onFocus:this._onFocus,
onBlur:this._onBlur,
onChange:this._onChange,
onSelectionChange:onSelectionChange,
onTextInput:this._onTextInput,
onSelectionChangeShouldSetResponder:emptyFunction.thatReturnsTrue,
text:this._getText(),__source:{fileName:_jsxFileName,lineNumber:486}}));}



return (
React.createElement(TouchableWithoutFeedback,{
onPress:this._onPress,
rejectResponderTermination:true,
accessible:props.accessible,
accessibilityLabel:props.accessibilityLabel,
accessibilityTraits:props.accessibilityTraits,
testID:props.testID,__source:{fileName:_jsxFileName,lineNumber:501}},
textContainer));},




_renderAndroid:function _renderAndroid(){var _this3=this;
var onSelectionChange;
if(this.props.selectionState||this.props.onSelectionChange){
onSelectionChange=function onSelectionChange(event){
if(_this3.props.selectionState){
var selection=event.nativeEvent.selection;
_this3.props.selectionState.update(selection.start,selection.end);}

_this3.props.onSelectionChange&&_this3.props.onSelectionChange(event);};}



var autoCapitalize=
UIManager.AndroidTextInput.Constants.AutoCapitalizationType[this.props.autoCapitalize];
var children=this.props.children;
var childCount=0;
ReactChildren.forEach(children,function(){return ++childCount;});
invariant(
!(this.props.value&&childCount),
'Cannot specify both value and children.');

if(childCount>1){
children=React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:535}},children);}


var textContainer=
React.createElement(AndroidTextInput,{
ref:'input',
style:[this.props.style],
autoCapitalize:autoCapitalize,
autoCorrect:this.props.autoCorrect,
keyboardType:this.props.keyboardType,
mostRecentEventCount:0,
multiline:this.props.multiline,
numberOfLines:this.props.numberOfLines,
maxLength:this.props.maxLength,
onFocus:this._onFocus,
onBlur:this._onBlur,
onChange:this._onChange,
onSelectionChange:onSelectionChange,
onTextInput:this._onTextInput,
onEndEditing:this.props.onEndEditing,
onSubmitEditing:this.props.onSubmitEditing,
blurOnSubmit:this.props.blurOnSubmit,
onLayout:this.props.onLayout,
password:this.props.password||this.props.secureTextEntry,
placeholder:this.props.placeholder,
placeholderTextColor:this.props.placeholderTextColor,
selectionColor:this.props.selectionColor,
text:this._getText(),
underlineColorAndroid:this.props.underlineColorAndroid,
children:children,
editable:this.props.editable,
selectTextOnFocus:this.props.selectTextOnFocus,
returnKeyType:this.props.returnKeyType,
returnKeyLabel:this.props.returnKeyLabel,__source:{fileName:_jsxFileName,lineNumber:539}});


return (
React.createElement(TouchableWithoutFeedback,{
onPress:this._onPress,
accessible:this.props.accessible,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
testID:this.props.testID,__source:{fileName:_jsxFileName,lineNumber:572}},
textContainer));},




_onFocus:function _onFocus(event){
if(this.props.onFocus){
this.props.onFocus(event);}


if(this.props.selectionState){
this.props.selectionState.focus();}},



_onPress:function _onPress(event){
if(this.props.editable||this.props.editable===undefined){
this.focus();}},



_onChange:function _onChange(event){


this.refs.input.setNativeProps({
mostRecentEventCount:event.nativeEvent.eventCount});


var text=event.nativeEvent.text;
this.props.onChange&&this.props.onChange(event);
this.props.onChangeText&&this.props.onChangeText(text);

if(!this.refs.input){


return;}





if(text!==this.props.value&&typeof this.props.value==='string'){
this.refs.input.setNativeProps({
text:this.props.value});}},




_onBlur:function _onBlur(event){
this.blur();
if(this.props.onBlur){
this.props.onBlur(event);}


if(this.props.selectionState){
this.props.selectionState.blur();}},



_onTextInput:function _onTextInput(event){
this.props.onTextInput&&this.props.onTextInput(event);}});



var styles=StyleSheet.create({
input:{
alignSelf:'stretch'}});



module.exports=TextInput;
}, "TextInput");
__d(220 /* DocumentSelectionState */, function(global, require, module, exports) {var 

















mixInEventEmitter=require(221 /* mixInEventEmitter */);var 










DocumentSelectionState=function(){




function DocumentSelectionState(anchor,focus){babelHelpers.classCallCheck(this,DocumentSelectionState);
this._anchorOffset=anchor;
this._focusOffset=focus;
this._hasFocus=false;}babelHelpers.createClass(DocumentSelectionState,[{key:'update',value:function update(









anchor,focus){
if(this._anchorOffset!==anchor||this._focusOffset!==focus){
this._anchorOffset=anchor;
this._focusOffset=focus;
this.emit('update');}}},{key:'constrainLength',value:function constrainLength(









maxLength){
this.update(
Math.min(this._anchorOffset,maxLength),
Math.min(this._focusOffset,maxLength));}},{key:'focus',value:function focus()



{
if(!this._hasFocus){
this._hasFocus=true;
this.emit('focus');}}},{key:'blur',value:function blur()



{
if(this._hasFocus){
this._hasFocus=false;
this.emit('blur');}}},{key:'hasFocus',value:function hasFocus()






{
return this._hasFocus;}},{key:'isCollapsed',value:function isCollapsed()





{
return this._anchorOffset===this._focusOffset;}},{key:'isBackward',value:function isBackward()





{
return this._anchorOffset>this._focusOffset;}},{key:'getAnchorOffset',value:function getAnchorOffset()





{
return this._hasFocus?this._anchorOffset:null;}},{key:'getFocusOffset',value:function getFocusOffset()





{
return this._hasFocus?this._focusOffset:null;}},{key:'getStartOffset',value:function getStartOffset()





{
return (
this._hasFocus?Math.min(this._anchorOffset,this._focusOffset):null);}},{key:'getEndOffset',value:function getEndOffset()






{
return (
this._hasFocus?Math.max(this._anchorOffset,this._focusOffset):null);}},{key:'overlaps',value:function overlaps(








start,end){
return (
this.hasFocus()&&
this.getStartOffset()<=end&&start<=this.getEndOffset());}}]);return DocumentSelectionState;}();




mixInEventEmitter(DocumentSelectionState,{
'blur':true,
'focus':true,
'update':true});


module.exports=DocumentSelectionState;
}, "DocumentSelectionState");
__d(221 /* mixInEventEmitter */, function(global, require, module, exports) {var 











EventEmitter=require(19 /* EventEmitter */);
var EventEmitterWithHolding=require(222 /* EventEmitterWithHolding */);
var EventHolder=require(223 /* EventHolder */);
var EventValidator=require(224 /* EventValidator */);

var copyProperties=require(225 /* copyProperties */);
var invariant=require(259 /* fbjs/lib/invariant */);
var keyOf=require(263 /* fbjs/lib/keyOf */);

var TYPES_KEY=keyOf({__types:true});






















function mixInEventEmitter(cls,types){
invariant(types,'Must supply set of valid event types');



var target=cls.prototype||cls;

invariant(!target.__eventEmitter,'An active emitter is already mixed in');

var ctor=cls.constructor;
if(ctor){
invariant(
ctor===Object||ctor===Function,
'Mix EventEmitter into a class, not an instance');}





if(target.hasOwnProperty(TYPES_KEY)){
copyProperties(target.__types,types);}else 
if(target.__types){
target.__types=copyProperties({},target.__types,types);}else 
{
target.__types=types;}

copyProperties(target,EventEmitterMixin);}


var EventEmitterMixin={
emit:function emit(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emit(eventType,a,b,c,d,e,_);},


emitAndHold:function emitAndHold(eventType,a,b,c,d,e,_){
return this.__getEventEmitter().emitAndHold(eventType,a,b,c,d,e,_);},


addListener:function addListener(eventType,listener,context){
return this.__getEventEmitter().addListener(eventType,listener,context);},


once:function once(eventType,listener,context){
return this.__getEventEmitter().once(eventType,listener,context);},


addRetroactiveListener:function addRetroactiveListener(eventType,listener,context){
return this.__getEventEmitter().addRetroactiveListener(
eventType,
listener,
context);},



addListenerMap:function addListenerMap(listenerMap,context){
return this.__getEventEmitter().addListenerMap(listenerMap,context);},


addRetroactiveListenerMap:function addRetroactiveListenerMap(listenerMap,context){
return this.__getEventEmitter().addListenerMap(listenerMap,context);},


removeAllListeners:function removeAllListeners(){
this.__getEventEmitter().removeAllListeners();},


removeCurrentListener:function removeCurrentListener(){
this.__getEventEmitter().removeCurrentListener();},


releaseHeldEventType:function releaseHeldEventType(eventType){
this.__getEventEmitter().releaseHeldEventType(eventType);},


__getEventEmitter:function __getEventEmitter(){
if(!this.__eventEmitter){
var emitter=new EventEmitter();
emitter=EventValidator.addValidation(emitter,this.__types);

var holder=new EventHolder();
this.__eventEmitter=new EventEmitterWithHolding(emitter,holder);}

return this.__eventEmitter;}};



module.exports=mixInEventEmitter;
}, "mixInEventEmitter");
__d(222 /* EventEmitterWithHolding */, function(global, require, module, exports) {'use strict';var 




























EventEmitterWithHolding=function(){













function EventEmitterWithHolding(emitter,holder){babelHelpers.classCallCheck(this,EventEmitterWithHolding);
this._emitter=emitter;
this._eventHolder=holder;
this._currentEventToken=null;
this._emittingHeldEvents=false;}babelHelpers.createClass(EventEmitterWithHolding,[{key:'addListener',value:function addListener(





eventType,listener,context){
return this._emitter.addListener(eventType,listener,context);}},{key:'once',value:function once(





eventType,listener,context){
return this._emitter.once(eventType,listener,context);}},{key:'addRetroactiveListener',value:function addRetroactiveListener(























eventType,listener,context){
var subscription=this._emitter.addListener(eventType,listener,context);

this._emittingHeldEvents=true;
this._eventHolder.emitToListener(eventType,listener,context);
this._emittingHeldEvents=false;

return subscription;}},{key:'removeAllListeners',value:function removeAllListeners(





eventType){
this._emitter.removeAllListeners(eventType);}},{key:'removeCurrentListener',value:function removeCurrentListener()





{
this._emitter.removeCurrentListener();}},{key:'listeners',value:function listeners(





eventType){
return this._emitter.listeners(eventType);}},{key:'emit',value:function emit(





eventType){var _emitter;for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}
(_emitter=this._emitter).emit.apply(_emitter,[eventType].concat(babelHelpers.toConsumableArray(args)));}},{key:'emitAndHold',value:function emitAndHold(

















eventType){var _eventHolder,_emitter2;for(var _len2=arguments.length,args=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
this._currentEventToken=(_eventHolder=this._eventHolder).holdEvent.apply(_eventHolder,[eventType].concat(babelHelpers.toConsumableArray(args)));
(_emitter2=this._emitter).emit.apply(_emitter2,[eventType].concat(babelHelpers.toConsumableArray(args)));
this._currentEventToken=null;}},{key:'releaseCurrentEvent',value:function releaseCurrentEvent()





{
if(this._currentEventToken){
this._eventHolder.releaseEvent(this._currentEventToken);}else 
if(this._emittingHeldEvents){
this._eventHolder.releaseCurrentEvent();}}},{key:'releaseHeldEventType',value:function releaseHeldEventType(







eventType){
this._eventHolder.releaseEventType(eventType);}}]);return EventEmitterWithHolding;}();



module.exports=EventEmitterWithHolding;
}, "EventEmitterWithHolding");
__d(223 /* EventHolder */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);var 

EventHolder=function(){




function EventHolder(){babelHelpers.classCallCheck(this,EventHolder);
this._heldEvents={};
this._currentEventKey=null;}babelHelpers.createClass(EventHolder,[{key:'holdEvent',value:function holdEvent(























eventType){
this._heldEvents[eventType]=this._heldEvents[eventType]||[];
var eventsOfType=this._heldEvents[eventType];
var key={
eventType:eventType,
index:eventsOfType.length};for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}

eventsOfType.push(args);
return key;}},{key:'emitToListener',value:function emitToListener(










eventType,listener,context){var _this=this;
var eventsOfType=this._heldEvents[eventType];
if(!eventsOfType){
return;}

var origEventKey=this._currentEventKey;
eventsOfType.forEach(function(eventHeld,index){
if(!eventHeld){
return;}

_this._currentEventKey={
eventType:eventType,
index:index};

listener.apply(context,eventHeld);});

this._currentEventKey=origEventKey;}},{key:'releaseCurrentEvent',value:function releaseCurrentEvent()










{
invariant(
this._currentEventKey!==null,
'Not in an emitting cycle; there is no current event');

this._currentEventKey&&this.releaseEvent(this._currentEventKey);}},{key:'releaseEvent',value:function releaseEvent(








token){
delete this._heldEvents[token.eventType][token.index];}},{key:'releaseEventType',value:function releaseEventType(







type){
this._heldEvents[type]=[];}}]);return EventHolder;}();



module.exports=EventHolder;
}, "EventHolder");
__d(224 /* EventValidator */, function(global, require, module, exports) {'use strict';












var copyProperties=require(225 /* copyProperties */);










var EventValidator={










addValidation:function addValidation(emitter,types){
var eventTypes=Object.keys(types);
var emitterWithValidation=Object.create(emitter);

copyProperties(emitterWithValidation,{
emit:function emit(type,a,b,c,d,e,_){
assertAllowsEventType(type,eventTypes);
return emitter.emit.call(this,type,a,b,c,d,e,_);}});



return emitterWithValidation;}};



function assertAllowsEventType(type,allowedTypes){
if(allowedTypes.indexOf(type)===-1){
throw new TypeError(errorMessageFor(type,allowedTypes));}}



function errorMessageFor(type,allowedTypes){
var message='Unknown event type "'+type+'". ';
if(__DEV__){
message+=recommendationFor(type,allowedTypes);}

message+='Known event types: '+allowedTypes.join(', ')+'.';
return message;}



if(__DEV__){
var recommendationFor=function recommendationFor(type,allowedTypes){
var closestTypeRecommendation=closestTypeFor(type,allowedTypes);
if(isCloseEnough(closestTypeRecommendation,type)){
return 'Did you mean "'+closestTypeRecommendation.type+'"? ';}else 
{
return '';}};



var closestTypeFor=function closestTypeFor(type,allowedTypes){
var typeRecommendations=allowedTypes.map(
typeRecommendationFor.bind(this,type));

return typeRecommendations.sort(recommendationSort)[0];};


var typeRecommendationFor=function typeRecommendationFor(type,recomendedType){
return {
type:recomendedType,
distance:damerauLevenshteinDistance(type,recomendedType)};};



var recommendationSort=function recommendationSort(recommendationA,recommendationB){
if(recommendationA.distance<recommendationB.distance){
return -1;}else 
if(recommendationA.distance>recommendationB.distance){
return 1;}else 
{
return 0;}};



var isCloseEnough=function isCloseEnough(closestType,actualType){
return closestType.distance/actualType.length<0.334;};


var damerauLevenshteinDistance=function damerauLevenshteinDistance(a,b){
var i=void 0,j=void 0;
var d=[];

for(i=0;i<=a.length;i++){
d[i]=[i];}


for(j=1;j<=b.length;j++){
d[0][j]=j;}


for(i=1;i<=a.length;i++){
for(j=1;j<=b.length;j++){
var cost=a.charAt(i-1)===b.charAt(j-1)?0:1;

d[i][j]=Math.min(
d[i-1][j]+1,
d[i][j-1]+1,
d[i-1][j-1]+cost);


if(i>1&&j>1&&
a.charAt(i-1)===b.charAt(j-2)&&
a.charAt(i-2)===b.charAt(j-1)){
d[i][j]=Math.min(d[i][j],d[i-2][j-2]+cost);}}}




return d[a.length][b.length];};}



module.exports=EventValidator;
}, "EventValidator");
__d(225 /* copyProperties */, function(global, require, module, exports) {function 























copyProperties(obj,a,b,c,d,e,f){
obj=obj||{};

if(__DEV__){
if(f){
throw new Error('Too many arguments passed to copyProperties');}}



var args=[a,b,c,d,e];
var ii=0,v;
while(args[ii]){
v=args[ii++];
for(var k in v){
obj[k]=v[k];}




if(v.hasOwnProperty&&v.hasOwnProperty('toString')&&
typeof v.toString!='undefined'&&obj.toString!==v.toString){
obj.toString=v.toString;}}



return obj;}


module.exports=copyProperties;
}, "copyProperties");
__d(226 /* TimePickerDialogTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/TimePickerDialogTestModule.js';












var BatchedBridge=require(2 /* BatchedBridge */);
var TimePickerAndroid=require(227 /* TimePickerAndroid */);
var React=require(34 /* React */);
var RecordingModule=require(12 /* NativeModules */).TimePickerDialogRecordingModule;
var View=require(81 /* View */);

var TimePickerDialogTestApp=React.createClass({displayName:'TimePickerDialogTestApp',
render:function render(){
return React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:22}});}});



var TimePickerDialogTestModule={
TimePickerDialogTestApp:TimePickerDialogTestApp,
showTimePickerDialog:function showTimePickerDialog(options){
TimePickerAndroid.open(options).then(
function(_ref){var action=_ref.action;var hour=_ref.hour;var minute=_ref.minute;
if(action===TimePickerAndroid.timeSetAction){
RecordingModule.recordTime(hour,minute);}else 
if(action===TimePickerAndroid.dismissedAction){
RecordingModule.recordDismissed();}},


function(_ref2){var code=_ref2.code;var message=_ref2.message;return RecordingModule.recordError();});}};




BatchedBridge.registerCallableModule(
'TimePickerDialogTestModule',
TimePickerDialogTestModule);


module.exports=TimePickerDialogTestModule;
}, "TimePickerDialogTestModule");
__d(227 /* TimePickerAndroid */, function(global, require, module, exports) {'use strict';












var TimePickerModule=require(12 /* NativeModules */).TimePickerAndroid;var 





















TimePickerAndroid=function(){function TimePickerAndroid(){babelHelpers.classCallCheck(this,TimePickerAndroid);}babelHelpers.createClass(TimePickerAndroid,null,[{key:'open',value:function open(
















options){return regeneratorRuntime.async(function open$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt('return',
TimePickerModule.open(options));case 1:case 'end':return _context.stop();}}},null,this);}},{key:'timeSetAction',get:function get()





{return 'timeSetAction';}},{key:'dismissedAction',get:function get()



{return 'dismissedAction';}}]);return TimePickerAndroid;}();


module.exports=TimePickerAndroid;
}, "TimePickerAndroid");
__d(228 /* AppRegistry */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var BugReporting=require(229 /* BugReporting */);
var ReactNative=require(157 /* ReactNative */);

var invariant=require(259 /* fbjs/lib/invariant */);
var renderApplication=require(133 /* renderApplication */);
var infoLog=require(230 /* infoLog */);

if(__DEV__){


require(233 /* RCTRenderingPerf */);}


var runnables={};
var runCount=1;
























var AppRegistry={
registerConfig:function registerConfig(config){
for(var i=0;i<config.length;++i){
var appConfig=config[i];
if(appConfig.run){
AppRegistry.registerRunnable(appConfig.appKey,appConfig.run);}else 
{
invariant(appConfig.component,'No component provider passed in');
AppRegistry.registerComponent(appConfig.appKey,appConfig.component);}}},




registerComponent:function registerComponent(appKey,getComponentFunc){
runnables[appKey]={
run:function run(appParameters){return (
renderApplication(getComponentFunc(),appParameters.initialProps,appParameters.rootTag));}};

return appKey;},


registerRunnable:function registerRunnable(appKey,func){
runnables[appKey]={run:func};
return appKey;},


getAppKeys:function getAppKeys(){
return Object.keys(runnables);},


runApplication:function runApplication(appKey,appParameters){
var msg=
'Running application "'+appKey+'" with appParams: '+
JSON.stringify(appParameters)+'. '+
'__DEV__ === '+String(__DEV__)+
', development-level warning are '+(__DEV__?'ON':'OFF')+
', performance optimizations are '+(__DEV__?'OFF':'ON');
infoLog(msg);
BugReporting.addSource('AppRegistry.runApplication'+runCount++,function(){return msg;});
invariant(
runnables[appKey]&&runnables[appKey].run,
'Application '+appKey+' has not been registered. This '+
'is either due to a require() error during initialization '+
'or failure to call AppRegistry.registerComponent.');

runnables[appKey].run(appParameters);},


unmountApplicationComponentAtRootTag:function unmountApplicationComponentAtRootTag(rootTag){
ReactNative.unmountComponentAtNodeAndRemoveContainer(rootTag);}};




BatchedBridge.registerCallableModule(
'AppRegistry',
AppRegistry);


module.exports=AppRegistry;
}, "AppRegistry");
__d(229 /* BugReporting */, function(global, require, module, exports) {'use strict';












var RCTDeviceEventEmitter=require(23 /* RCTDeviceEventEmitter */);
var Map=require(172 /* Map */);
var infoLog=require(230 /* infoLog */);







function defaultExtras(){
BugReporting.addFileSource('react_hierarchy.txt',function(){return require(231 /* dumpReactTree */)();});}var 








BugReporting=function(){function BugReporting(){babelHelpers.classCallCheck(this,BugReporting);}babelHelpers.createClass(BugReporting,null,[{key:'_maybeInit',value:function _maybeInit()




{
if(!BugReporting._subscription){
BugReporting._subscription=RCTDeviceEventEmitter.
addListener('collectBugExtraData',BugReporting.collectExtraData,null);
defaultExtras();}}},{key:'addSource',value:function addSource(











key,callback){
return this._addSource(key,callback,BugReporting._extraSources);}},{key:'addFileSource',value:function addFileSource(










key,callback){
return this._addSource(key,callback,BugReporting._fileSources);}},{key:'_addSource',value:function _addSource(


key,callback,source){
BugReporting._maybeInit();
if(source.has(key)){
console.warn('BugReporting.add* called multiple times for same key \''+key+'\'');}

source.set(key,callback);
return {remove:function remove(){source.delete(key);}};}},{key:'collectExtraData',value:function collectExtraData()








{
var extraData={};
for(var _iterator=BugReporting._extraSources,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref3;if(_isArray){if(_i>=_iterator.length)break;_ref3=_iterator[_i++];}else {_i=_iterator.next();if(_i.done)break;_ref3=_i.value;}var _ref=_ref3;var _ref2=babelHelpers.slicedToArray(_ref,2);var _key=_ref2[0];var callback=_ref2[1];
extraData[_key]=callback();}

var fileData={};
for(var _iterator2=BugReporting._fileSources,_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref6;if(_isArray2){if(_i2>=_iterator2.length)break;_ref6=_iterator2[_i2++];}else {_i2=_iterator2.next();if(_i2.done)break;_ref6=_i2.value;}var _ref4=_ref6;var _ref5=babelHelpers.slicedToArray(_ref4,2);var _key2=_ref5[0];var _callback=_ref5[1];
fileData[_key2]=_callback();}

infoLog('BugReporting extraData:',extraData);
var BugReportingNativeModule=require(12 /* NativeModules */).BugReporting;
BugReportingNativeModule&&
BugReportingNativeModule.setExtraData&&
BugReportingNativeModule.setExtraData(extraData,fileData);

return {extras:extraData,files:fileData};}}]);return BugReporting;}();BugReporting._extraSources=new Map();BugReporting._fileSources=new Map();BugReporting._subscription=null;



module.exports=BugReporting;
}, "BugReporting");
__d(230 /* infoLog */, function(global, require, module, exports) {'use strict';














function infoLog(){var _console;
return (_console=console).log.apply(_console,arguments);}


module.exports=infoLog;
}, "infoLog");
__d(231 /* dumpReactTree */, function(global, require, module, exports) {'use strict';












var ReactNativeMount=require(178 /* ReactNativeMount */);
var getReactData=require(232 /* getReactData */);

var INDENTATION_SIZE=2;
var MAX_DEPTH=2;
var MAX_STRING_LENGTH=50;






function dumpReactTree(){
try{
return getReactTree();}
catch(e){
return 'Failed to dump react tree: '+e;}}



function getReactTree(){
var output='';
var rootIds=Object.getOwnPropertyNames(ReactNativeMount._instancesByContainerID);
for(var _iterator=rootIds,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else {_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var rootId=_ref;
var instance=ReactNativeMount._instancesByContainerID[rootId];
output+='============ Root ID: '+rootId+' ============\n';
output+=dumpNode(instance,0);
output+='============ End root ID: '+rootId+' ============\n';}

return output;}


function dumpNode(node,identation){
var data=getReactData(node);
if(data.nodeType==='Text'){
return indent(identation)+data.text+'\n';}else 
if(data.nodeType==='Empty'){
return '';}

var output=indent(identation)+('<'+data.name);
if(data.nodeType==='Composite'){
for(var _iterator2=Object.getOwnPropertyNames(data.props||{}),_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++];}else {_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value;}var propName=_ref2;
if(isNormalProp(propName)){
try{
var value=convertValue(data.props[propName]);
if(value){
output+=' '+propName+'='+value;}}

catch(e){
var message='[Failed to get property: '+e+']';
output+=' '+propName+'='+message;}}}}




var childOutput='';
for(var _iterator3=data.children||[],_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref3;if(_isArray3){if(_i3>=_iterator3.length)break;_ref3=_iterator3[_i3++];}else {_i3=_iterator3.next();if(_i3.done)break;_ref3=_i3.value;}var child=_ref3;
childOutput+=dumpNode(child,identation+1);}


if(childOutput){
output+='>\n'+childOutput+indent(identation)+('</'+data.name+'>\n');}else 
{
output+=' />\n';}


return output;}


function isNormalProp(name){
switch(name){
case 'children':
case 'key':
case 'ref':
return false;
default:
return true;}}



function convertObject(object,depth){
if(depth>=MAX_DEPTH){
return '[...omitted]';}

var output='{';
var first=true;
for(var _iterator4=Object.getOwnPropertyNames(object),_isArray4=Array.isArray(_iterator4),_i4=0,_iterator4=_isArray4?_iterator4:_iterator4[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref4;if(_isArray4){if(_i4>=_iterator4.length)break;_ref4=_iterator4[_i4++];}else {_i4=_iterator4.next();if(_i4.done)break;_ref4=_i4.value;}var key=_ref4;
if(!first){
output+=', ';}

output+=key+': '+convertValue(object[key],depth+1);
first=false;}

return output+'}';}


function convertValue(value){var depth=arguments.length<=1||arguments[1]===undefined?0:arguments[1];
if(!value){
return null;}


switch(typeof value){
case 'string':
return JSON.stringify(possiblyEllipsis(value).replace('\n','\\n'));
case 'boolean':
case 'number':
return JSON.stringify(value);
case 'function':
return '[function]';
case 'object':
return convertObject(value,depth);
default:
return null;}}



function possiblyEllipsis(value){
if(value.length>MAX_STRING_LENGTH){
return value.slice(0,MAX_STRING_LENGTH)+'...';}else 
{
return value;}}



function indent(size){
return ' '.repeat(size*INDENTATION_SIZE);}


module.exports=dumpReactTree;
}, "dumpReactTree");
__d(232 /* getReactData */, function(global, require, module, exports) {'use strict';


















function getData(element){
var children=null;
var props=null;
var state=null;
var context=null;
var updater=null;
var name=null;
var type=null;
var text=null;
var publicInstance=null;
var nodeType='Native';



if(typeof element!=='object'){
nodeType='Text';
text=element+'';}else 
if(element._currentElement===null||element._currentElement===false){
nodeType='Empty';}else 
if(element._renderedComponent){
nodeType='NativeWrapper';
children=[element._renderedComponent];
props=element._instance.props;
state=element._instance.state;
context=element._instance.context;
if(context&&Object.keys(context).length===0){
context=null;}}else 

if(element._renderedChildren){
children=childrenList(element._renderedChildren);}else 
if(element._currentElement&&element._currentElement.props){



children=element._currentElement.props.children;}


if(!props&&element._currentElement&&element._currentElement.props){
props=element._currentElement.props;}



if(element._currentElement!=null){
type=element._currentElement.type;
if(typeof type==='string'){
name=type;}else 
if(element.getName){
nodeType='Composite';
name=element.getName();


if(element._renderedComponent&&element._currentElement.props===element._renderedComponent._currentElement){
nodeType='Wrapper';}

if(name===null){
name='No display name';}}else 

if(element._stringText){
nodeType='Text';
text=element._stringText;}else 
{
name=type.displayName||type.name||'Unknown';}}



if(element._instance){
var inst=element._instance;
updater={
setState:inst.setState&&inst.setState.bind(inst),
forceUpdate:inst.forceUpdate&&inst.forceUpdate.bind(inst),
setInProps:inst.forceUpdate&&setInProps.bind(null,element),
setInState:inst.forceUpdate&&setInState.bind(null,inst),
setInContext:inst.forceUpdate&&setInContext.bind(null,inst)};

publicInstance=inst;




if(inst._renderedChildren){
children=childrenList(inst._renderedChildren);}}



return {
nodeType:nodeType,
type:type,
name:name,
props:props,
state:state,
context:context,
children:children,
text:text,
updater:updater,
publicInstance:publicInstance};}



function setInProps(internalInst,path,value){
var element=internalInst._currentElement;
internalInst._currentElement=babelHelpers.extends({},
element,{
props:copyWithSet(element.props,path,value)});

internalInst._instance.forceUpdate();}


function setInState(inst,path,value){
setIn(inst.state,path,value);
inst.forceUpdate();}


function setInContext(inst,path,value){
setIn(inst.context,path,value);
inst.forceUpdate();}


function setIn(obj,path,value){
var last=path.pop();
var parent=path.reduce(function(obj_,attr){return obj_?obj_[attr]:null;},obj);
if(parent){
parent[last]=value;}}



function childrenList(children){
var res=[];
for(var name in children){
res.push(children[name]);}

return res;}


function copyWithSetImpl(obj,path,idx,value){
if(idx>=path.length){
return value;}

var key=path[idx];
var updated=Array.isArray(obj)?obj.slice():babelHelpers.extends({},obj);

updated[key]=copyWithSetImpl(obj[key],path,idx+1,value);
return updated;}


function copyWithSet(obj,path,value){
return copyWithSetImpl(obj,path,0,value);}


module.exports=getData;
}, "getReactData");
__d(233 /* RCTRenderingPerf */, function(global, require, module, exports) {'use strict';












var ReactPerf=require(234 /* ReactPerf */);
var ReactDebugTool=require(5 /* ReactDebugTool */);

var invariant=require(259 /* fbjs/lib/invariant */);
var performanceNow=require(255 /* fbjs/lib/performanceNow */);






var perfModules=[];
var enabled=false;
var lastRenderStartTime=0;
var totalRenderDuration=0;

var RCTRenderingPerfDevtool={
onBeginLifeCycleTimer:function onBeginLifeCycleTimer(debugID,timerType){
if(timerType==='render'){
lastRenderStartTime=performanceNow();}},


onEndLifeCycleTimer:function onEndLifeCycleTimer(debugID,timerType){
if(timerType==='render'){
var lastRenderDuration=performanceNow()-lastRenderStartTime;
totalRenderDuration+=lastRenderDuration;}}};




var RCTRenderingPerf={

toggle:function toggle(){
console.log('Render perfomance measurements enabled');
enabled=true;},


start:function start(){
if(!enabled){
return;}


ReactPerf.start();
ReactDebugTool.addDevtool(RCTRenderingPerfDevtool);
perfModules.forEach(function(module){return module.start();});},


stop:function stop(){
if(!enabled){
return;}


ReactPerf.stop();
ReactPerf.printInclusive();
ReactPerf.printWasted();
ReactDebugTool.removeDevtool(RCTRenderingPerfDevtool);

console.log('Total time spent in render(): '+totalRenderDuration.toFixed(2)+' ms');
lastRenderStartTime=0;
totalRenderDuration=0;

perfModules.forEach(function(module){return module.stop();});},


register:function register(module){
invariant(
typeof module.start==='function',
'Perf module should have start() function');

invariant(
typeof module.stop==='function',
'Perf module should have stop() function');

perfModules.push(module);}};



module.exports=RCTRenderingPerf;
}, "RCTRenderingPerf");
__d(234 /* ReactPerf */, function(global, require, module, exports) {'use strict';












var _assign=require(290 /* object-assign */);

var _extends=_assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var ReactDebugTool=require(5 /* ./ReactDebugTool */);
var warning=require(265 /* fbjs/lib/warning */);

function roundFloat(val){
var base=arguments.length<=1||arguments[1]===undefined?2:arguments[1];

var n=Math.pow(10,base);
return Math.floor(val*n)/n;}


function getFlushHistory(){
return ReactDebugTool.getFlushHistory();}


function getExclusive(){
var flushHistory=arguments.length<=0||arguments[0]===undefined?getFlushHistory():arguments[0];

var aggregatedStats={};
var affectedIDs={};

function updateAggregatedStats(treeSnapshot,instanceID,timerType,applyUpdate){
var displayName=treeSnapshot[instanceID].displayName;

var key=displayName;
var stats=aggregatedStats[key];
if(!stats){
affectedIDs[key]={};
stats=aggregatedStats[key]={
key:key,
instanceCount:0,
counts:{},
durations:{},
totalDuration:0};}


if(!stats.durations[timerType]){
stats.durations[timerType]=0;}

if(!stats.counts[timerType]){
stats.counts[timerType]=0;}

affectedIDs[key][instanceID]=true;
applyUpdate(stats);}


flushHistory.forEach(function(flush){
var measurements=flush.measurements;
var treeSnapshot=flush.treeSnapshot;

measurements.forEach(function(measurement){
var duration=measurement.duration;
var instanceID=measurement.instanceID;
var timerType=measurement.timerType;

updateAggregatedStats(treeSnapshot,instanceID,timerType,function(stats){
stats.totalDuration+=duration;
stats.durations[timerType]+=duration;
stats.counts[timerType]++;});});});




return Object.keys(aggregatedStats).map(function(key){
return _extends({},aggregatedStats[key],{
instanceCount:Object.keys(affectedIDs[key]).length});}).

sort(function(a,b){
return b.totalDuration-a.totalDuration;});}



function getInclusive(){
var flushHistory=arguments.length<=0||arguments[0]===undefined?getFlushHistory():arguments[0];

var aggregatedStats={};
var affectedIDs={};

function updateAggregatedStats(treeSnapshot,instanceID,applyUpdate){
var _treeSnapshot$instanc=treeSnapshot[instanceID];
var displayName=_treeSnapshot$instanc.displayName;
var ownerID=_treeSnapshot$instanc.ownerID;

var owner=treeSnapshot[ownerID];
var key=(owner?owner.displayName+' > ':'')+displayName;
var stats=aggregatedStats[key];
if(!stats){
affectedIDs[key]={};
stats=aggregatedStats[key]={
key:key,
instanceCount:0,
inclusiveRenderDuration:0,
renderCount:0};}


affectedIDs[key][instanceID]=true;
applyUpdate(stats);}


var isCompositeByID={};
flushHistory.forEach(function(flush){
var measurements=flush.measurements;

measurements.forEach(function(measurement){
var instanceID=measurement.instanceID;
var timerType=measurement.timerType;

if(timerType!=='render'){
return;}

isCompositeByID[instanceID]=true;});});



flushHistory.forEach(function(flush){
var measurements=flush.measurements;
var treeSnapshot=flush.treeSnapshot;

measurements.forEach(function(measurement){
var duration=measurement.duration;
var instanceID=measurement.instanceID;
var timerType=measurement.timerType;

if(timerType!=='render'){
return;}

updateAggregatedStats(treeSnapshot,instanceID,function(stats){
stats.renderCount++;});

var nextParentID=instanceID;
while(nextParentID){


if(isCompositeByID[nextParentID]){
updateAggregatedStats(treeSnapshot,nextParentID,function(stats){
stats.inclusiveRenderDuration+=duration;});}


nextParentID=treeSnapshot[nextParentID].parentID;}});});




return Object.keys(aggregatedStats).map(function(key){
return _extends({},aggregatedStats[key],{
instanceCount:Object.keys(affectedIDs[key]).length});}).

sort(function(a,b){
return b.inclusiveRenderDuration-a.inclusiveRenderDuration;});}



function getWasted(){
var flushHistory=arguments.length<=0||arguments[0]===undefined?getFlushHistory():arguments[0];

var aggregatedStats={};
var affectedIDs={};

function updateAggregatedStats(treeSnapshot,instanceID,applyUpdate){
var _treeSnapshot$instanc2=treeSnapshot[instanceID];
var displayName=_treeSnapshot$instanc2.displayName;
var ownerID=_treeSnapshot$instanc2.ownerID;

var owner=treeSnapshot[ownerID];
var key=(owner?owner.displayName+' > ':'')+displayName;
var stats=aggregatedStats[key];
if(!stats){
affectedIDs[key]={};
stats=aggregatedStats[key]={
key:key,
instanceCount:0,
inclusiveRenderDuration:0,
renderCount:0};}


affectedIDs[key][instanceID]=true;
applyUpdate(stats);}


flushHistory.forEach(function(flush){
var measurements=flush.measurements;
var treeSnapshot=flush.treeSnapshot;
var operations=flush.operations;

var isDefinitelyNotWastedByID={};



operations.forEach(function(operation){
var instanceID=operation.instanceID;

var nextParentID=instanceID;
while(nextParentID){
isDefinitelyNotWastedByID[nextParentID]=true;
nextParentID=treeSnapshot[nextParentID].parentID;}});





var renderedCompositeIDs={};
measurements.forEach(function(measurement){
var instanceID=measurement.instanceID;
var timerType=measurement.timerType;

if(timerType!=='render'){
return;}

renderedCompositeIDs[instanceID]=true;});


measurements.forEach(function(measurement){
var duration=measurement.duration;
var instanceID=measurement.instanceID;
var timerType=measurement.timerType;

if(timerType!=='render'){
return;}




var updateCount=treeSnapshot[instanceID].updateCount;

if(isDefinitelyNotWastedByID[instanceID]||updateCount===0){
return;}



updateAggregatedStats(treeSnapshot,instanceID,function(stats){
stats.renderCount++;});


var nextParentID=instanceID;
while(nextParentID){


var isWasted=renderedCompositeIDs[nextParentID]&&!isDefinitelyNotWastedByID[nextParentID];
if(isWasted){
updateAggregatedStats(treeSnapshot,nextParentID,function(stats){
stats.inclusiveRenderDuration+=duration;});}


nextParentID=treeSnapshot[nextParentID].parentID;}});});




return Object.keys(aggregatedStats).map(function(key){
return _extends({},aggregatedStats[key],{
instanceCount:Object.keys(affectedIDs[key]).length});}).

sort(function(a,b){
return b.inclusiveRenderDuration-a.inclusiveRenderDuration;});}



function getOperations(){
var flushHistory=arguments.length<=0||arguments[0]===undefined?getFlushHistory():arguments[0];

var stats=[];
flushHistory.forEach(function(flush,flushIndex){
var operations=flush.operations;
var treeSnapshot=flush.treeSnapshot;

operations.forEach(function(operation){
var instanceID=operation.instanceID;
var type=operation.type;
var payload=operation.payload;
var _treeSnapshot$instanc3=treeSnapshot[instanceID];
var displayName=_treeSnapshot$instanc3.displayName;
var ownerID=_treeSnapshot$instanc3.ownerID;

var owner=treeSnapshot[ownerID];
var key=(owner?owner.displayName+' > ':'')+displayName;

stats.push({
flushIndex:flushIndex,
instanceID:instanceID,
key:key,
type:type,
ownerID:ownerID,
payload:payload});});});



return stats;}


function printExclusive(flushHistory){
var stats=getExclusive(flushHistory);
var table=stats.map(function(item){
var key=item.key;
var instanceCount=item.instanceCount;
var totalDuration=item.totalDuration;

var renderCount=item.counts.render||0;
var renderDuration=item.durations.render||0;
return {
'Component':key,
'Total time (ms)':roundFloat(totalDuration),
'Instance count':instanceCount,
'Total render time (ms)':roundFloat(renderDuration),
'Average render time (ms)':renderCount?roundFloat(renderDuration/renderCount):undefined,
'Render count':renderCount,
'Total lifecycle time (ms)':roundFloat(totalDuration-renderDuration)};});


console.table(table);}


function printInclusive(flushHistory){
var stats=getInclusive(flushHistory);
var table=stats.map(function(item){
var key=item.key;
var instanceCount=item.instanceCount;
var inclusiveRenderDuration=item.inclusiveRenderDuration;
var renderCount=item.renderCount;

return {
'Owner > Component':key,
'Inclusive render time (ms)':roundFloat(inclusiveRenderDuration),
'Instance count':instanceCount,
'Render count':renderCount};});


console.table(table);}


function printWasted(flushHistory){
var stats=getWasted(flushHistory);
var table=stats.map(function(item){
var key=item.key;
var instanceCount=item.instanceCount;
var inclusiveRenderDuration=item.inclusiveRenderDuration;
var renderCount=item.renderCount;

return {
'Owner > Component':key,
'Inclusive wasted time (ms)':roundFloat(inclusiveRenderDuration),
'Instance count':instanceCount,
'Render count':renderCount};});


console.table(table);}


function printOperations(flushHistory){
var stats=getOperations(flushHistory);
var table=stats.map(function(stat){
return {
'Owner > Node':stat.key,
'Operation':stat.type,
'Payload':typeof stat.payload==='object'?JSON.stringify(stat.payload):stat.payload,
'Flush index':stat.flushIndex,
'Owner Component ID':stat.ownerID,
'DOM Component ID':stat.instanceID};});


console.table(table);}


var warnedAboutPrintDOM=false;
function printDOM(measurements){
process.env.NODE_ENV!=='production'?warning(warnedAboutPrintDOM,'`ReactPerf.printDOM(...)` is deprecated. Use '+'`ReactPerf.printOperations(...)` instead.'):void 0;
warnedAboutPrintDOM=true;
return printOperations(measurements);}


var warnedAboutGetMeasurementsSummaryMap=false;
function getMeasurementsSummaryMap(measurements){
process.env.NODE_ENV!=='production'?warning(warnedAboutGetMeasurementsSummaryMap,'`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use '+'`ReactPerf.getWasted(...)` instead.'):void 0;
warnedAboutGetMeasurementsSummaryMap=true;
return getWasted(measurements);}


function start(){
ReactDebugTool.beginProfiling();}


function stop(){
ReactDebugTool.endProfiling();}


var ReactPerfAnalysis={
getLastMeasurements:getFlushHistory,
getExclusive:getExclusive,
getInclusive:getInclusive,
getWasted:getWasted,
getOperations:getOperations,
printExclusive:printExclusive,
printInclusive:printInclusive,
printWasted:printWasted,
printOperations:printOperations,
start:start,
stop:stop,

printDOM:printDOM,
getMeasurementsSummaryMap:getMeasurementsSummaryMap};


module.exports=ReactPerfAnalysis;
}, "ReactPerf");
__d(235 /* TestIdTestModule */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/ReactAndroid/src/androidTest/js/TestIdTestModule.js';












var Image=require(236 /* Image */);
var ProgressBarAndroid=require(54 /* ProgressBarAndroid */);
var React=require(34 /* React */);
var ScrollView=require(201 /* ScrollView */);
var Picker=require(209 /* Picker */);
var StyleSheet=require(90 /* StyleSheet */);
var SwitchAndroid=require(237 /* SwitchAndroid */);
var Text=require(141 /* Text */);
var TextInput=require(219 /* TextInput */);
var ToolbarAndroid=require(238 /* ToolbarAndroid */);
var TouchableBounce=require(239 /* TouchableBounce */);
var TouchableHighlight=require(149 /* TouchableHighlight */);
var TouchableOpacity=require(250 /* TouchableOpacity */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);
var View=require(81 /* View */);
var WebView=require(251 /* WebView */);







var TestIdTestApp=React.createClass({displayName:'TestIdTestApp',
render:function render(){
return (
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:40}},

React.createElement(Image,{
testID:'Image',
source:{uri:'data:image/gif;base64,'+
'R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapy'+
'uvUUlvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/'+
'TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaNVailT6F5'+
'iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97V'+
'riy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7'},
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:42}}),

React.createElement(ProgressBarAndroid,{
testID:'ProgressBar',
styleAttr:'Horizontal',
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:52}}),

React.createElement(ScrollView,{
testID:'ScrollView',
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:57}},
React.createElement(Text,{testID:'ScrollView Item (same id used for all items)',__source:{fileName:_jsxFileName,lineNumber:60}},'Item 1'),
React.createElement(Text,{testID:'ScrollView Item (same id used for all items)',__source:{fileName:_jsxFileName,lineNumber:61}},'Item 2')),


React.createElement(ScrollView,{
testID:'Horizontal ScrollView',
horizontal:true,
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:64}},
React.createElement(Text,{testID:'ScrollView Item (same id used for all items)',__source:{fileName:_jsxFileName,lineNumber:68}},'Item 1'),
React.createElement(Text,{testID:'ScrollView Item (same id used for all items)',__source:{fileName:_jsxFileName,lineNumber:69}},'Item 2')),


React.createElement(Picker,{
testID:'Dropdown Picker',
mode:Picker.MODE_DROPDOWN,
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:72}},
React.createElement(Picker.Item,{label:'Dropdown picker',value:'key0',__source:{fileName:_jsxFileName,lineNumber:76}})),


React.createElement(Picker,{
testID:'Dialog Picker',
mode:Picker.MODE_DIALOG,
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:79}},
React.createElement(Picker.Item,{label:'Dialog picker',value:'key0',__source:{fileName:_jsxFileName,lineNumber:83}})),


React.createElement(SwitchAndroid,{testID:'Switch',value:true,__source:{fileName:_jsxFileName,lineNumber:86}}),

React.createElement(Text,{testID:'Text',__source:{fileName:_jsxFileName,lineNumber:88}},'text'),

React.createElement(ToolbarAndroid,{testID:'Toolbar',style:styles.base,subtitle:'toolbar',__source:{fileName:_jsxFileName,lineNumber:90}}),

React.createElement(TextInput,{testID:'TextInput',value:'Text input',__source:{fileName:_jsxFileName,lineNumber:92}}),

React.createElement(TouchableBounce,{testID:'TouchableBounce',__source:{fileName:_jsxFileName,lineNumber:94}},
React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:95}},'TouchableBounce')),


React.createElement(TouchableHighlight,{testID:'TouchableHighlight',__source:{fileName:_jsxFileName,lineNumber:98}},
React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:99}},'TouchableHighlight')),


React.createElement(TouchableOpacity,{testID:'TouchableOpacity',__source:{fileName:_jsxFileName,lineNumber:102}},
React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:103}},'TouchableOpacity')),


React.createElement(TouchableWithoutFeedback,{testID:'TouchableWithoutFeedback',__source:{fileName:_jsxFileName,lineNumber:106}},
React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:107}},
React.createElement(Text,{__source:{fileName:_jsxFileName,lineNumber:108}},'TouchableWithoutFeedback'))),



React.createElement(View,{testID:'View',__source:{fileName:_jsxFileName,lineNumber:112}}),

React.createElement(WebView,{
testID:'WebView',
url:'http://newsroom.fb.com',
renderError:function renderError(){return React.createElement(View,{__source:{fileName:_jsxFileName,lineNumber:117}});},
style:styles.base,__source:{fileName:_jsxFileName,lineNumber:114}})));}});







var styles=StyleSheet.create({
base:{
width:150,
height:50}});



module.exports={
TestIdTestApp:TestIdTestApp};
}, "TestIdTestModule");
__d(236 /* Image */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Image/Image.android.js';












var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var NativeModules=require(12 /* NativeModules */);
var ImageResizeMode=require(67 /* ImageResizeMode */);
var ImageStylePropTypes=require(66 /* ImageStylePropTypes */);
var PropTypes=require(51 /* ReactPropTypes */);
var React=require(34 /* React */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var StyleSheet=require(90 /* StyleSheet */);
var StyleSheetPropType=require(87 /* StyleSheetPropType */);
var View=require(81 /* View */);

var flattenStyle=require(59 /* flattenStyle */);
var merge=require(84 /* merge */);
var requireNativeComponent=require(88 /* requireNativeComponent */);
var resolveAssetSource=require(129 /* resolveAssetSource */);var 


ImageLoader=
NativeModules.ImageLoader;
























var ImageViewAttributes=merge(ReactNativeViewAttributes.UIView,{
src:true,
loadingIndicatorSrc:true,
resizeMode:true,
progressiveRenderingEnabled:true,
fadeDuration:true,
shouldNotifyLoadEvents:true});


var Image=React.createClass({displayName:'Image',
propTypes:babelHelpers.extends({},
View.propTypes,{
style:StyleSheetPropType(ImageStylePropTypes),





source:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),






loadingIndicatorSource:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),


PropTypes.number]),

progressiveRenderingEnabled:PropTypes.bool,
fadeDuration:PropTypes.number,



onLoadStart:PropTypes.func,



onLoad:PropTypes.func,



onLoadEnd:PropTypes.func,



testID:PropTypes.string}),


statics:{
resizeMode:ImageResizeMode,




prefetch:function prefetch(url){
return ImageLoader.prefetchImage(url);}},



mixins:[NativeMethodsMixin],






viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


_updateViewConfig:function _updateViewConfig(props){
if(props.children){
this.viewConfig={
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView};}else 

{
this.viewConfig={
uiViewClassName:'RCTImageView',
validAttributes:ImageViewAttributes};}},




componentWillMount:function componentWillMount(){
this._updateViewConfig(this.props);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
this._updateViewConfig(nextProps);},


contextTypes:{
isInAParentText:React.PropTypes.bool},


render:function render(){
var source=resolveAssetSource(this.props.source);
var loadingIndicatorSource=resolveAssetSource(this.props.loadingIndicatorSource);




if(source&&source.uri===''){
console.warn('source.uri should not be an empty string');}


if(this.props.src){
console.warn('The <Image> component requires a `source` property rather than `src`.');}


if(source&&source.uri){var 
width=source.width;var height=source.height;
var style=flattenStyle([{width:width,height:height},styles.base,this.props.style]);var _props=
this.props;var onLoadStart=_props.onLoadStart;var onLoad=_props.onLoad;var onLoadEnd=_props.onLoadEnd;

var nativeProps=merge(this.props,{
style:style,
shouldNotifyLoadEvents:!!(onLoadStart||onLoad||onLoadEnd),
src:source.uri,
loadingIndicatorSrc:loadingIndicatorSource?loadingIndicatorSource.uri:null});


if(nativeProps.children){

var imageProps=merge(nativeProps,{
style:styles.absoluteImage,
children:undefined});

return (
React.createElement(View,{style:nativeProps.style,__source:{fileName:_jsxFileName,lineNumber:197}},
React.createElement(RKImage,babelHelpers.extends({},imageProps,{__source:{fileName:_jsxFileName,lineNumber:198}})),
this.props.children));}else 


{
if(this.context.isInAParentText){
return React.createElement(RCTTextInlineImage,babelHelpers.extends({},nativeProps,{__source:{fileName:_jsxFileName,lineNumber:204}}));}else 
{
return React.createElement(RKImage,babelHelpers.extends({},nativeProps,{__source:{fileName:_jsxFileName,lineNumber:206}}));}}}



return null;}});



var styles=StyleSheet.create({
base:{
overflow:'hidden'},

absoluteImage:{
left:0,
right:0,
top:0,
bottom:0,
position:'absolute'}});



var cfg={
nativeOnly:{
src:true,
loadingIndicatorSrc:true,
defaultImageSrc:true,
imageTag:true,
progressHandlerRegistered:true,
shouldNotifyLoadEvents:true}};


var RKImage=requireNativeComponent('RCTImageView',Image,cfg);
var RCTTextInlineImage=requireNativeComponent('RCTTextInlineImage',Image,cfg);

module.exports=Image;
}, "Image");
__d(237 /* SwitchAndroid */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/SwitchAndroid/SwitchAndroid.android.js';











var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var PropTypes=require(51 /* ReactPropTypes */);
var React=require(34 /* React */);
var View=require(81 /* View */);

var requireNativeComponent=require(88 /* requireNativeComponent */);

var SWITCH='switch';






var SwitchAndroid=React.createClass({displayName:'SwitchAndroid',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{



value:PropTypes.bool,



disabled:PropTypes.bool,



onValueChange:PropTypes.func,



testID:PropTypes.string}),


getDefaultProps:function getDefaultProps(){
return {
value:false,
disabled:false};},



_onChange:function _onChange(event){


this.refs[SWITCH].setNativeProps({on:this.props.value});

if(this.props.value===event.nativeEvent.value||this.props.disabled){
return;}


this.props.onChange&&this.props.onChange(event);
this.props.onValueChange&&this.props.onValueChange(event.nativeEvent.value);},


render:function render(){
return (
React.createElement(RKSwitch,{
ref:SWITCH,
style:this.props.style,
enabled:!this.props.disabled,
on:this.props.value,
onChange:this._onChange,
testID:this.props.testID,
onStartShouldSetResponder:function onStartShouldSetResponder(){return true;},
onResponderTerminationRequest:function onResponderTerminationRequest(){return false;},__source:{fileName:_jsxFileName,lineNumber:72}}));}});





var RKSwitch=requireNativeComponent('AndroidSwitch',SwitchAndroid,{
nativeOnly:{
on:true,
enabled:true}});



module.exports=SwitchAndroid;
}, "SwitchAndroid");
__d(238 /* ToolbarAndroid */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/ToolbarAndroid/ToolbarAndroid.android.js';












var Image=require(236 /* Image */);
var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var React=require(34 /* React */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var ReactPropTypes=require(51 /* ReactPropTypes */);
var UIManager=require(61 /* UIManager */);
var View=require(81 /* View */);
var ColorPropType=require(69 /* ColorPropType */);

var requireNativeComponent=require(88 /* requireNativeComponent */);
var resolveAssetSource=require(129 /* resolveAssetSource */);

var optionalImageSource=ReactPropTypes.oneOfType([
Image.propTypes.source,


ReactPropTypes.oneOf([])]);





































var ToolbarAndroid=React.createClass({displayName:'ToolbarAndroid',
mixins:[NativeMethodsMixin],

propTypes:babelHelpers.extends({},
View.propTypes,{













actions:ReactPropTypes.arrayOf(ReactPropTypes.shape({
title:ReactPropTypes.string.isRequired,
icon:optionalImageSource,
show:ReactPropTypes.oneOf(['always','ifRoom','never']),
showWithText:ReactPropTypes.bool})),




logo:optionalImageSource,



navIcon:optionalImageSource,




onActionSelected:ReactPropTypes.func,



onIconClicked:ReactPropTypes.func,



overflowIcon:optionalImageSource,



subtitle:ReactPropTypes.string,



subtitleColor:ColorPropType,



title:ReactPropTypes.string,



titleColor:ColorPropType,








contentInsetStart:ReactPropTypes.number,








contentInsetEnd:ReactPropTypes.number,










rtl:ReactPropTypes.bool,



testID:ReactPropTypes.string}),


render:function render(){
var nativeProps=babelHelpers.extends({},
this.props);

if(this.props.logo){
nativeProps.logo=resolveAssetSource(this.props.logo);}

if(this.props.navIcon){
nativeProps.navIcon=resolveAssetSource(this.props.navIcon);}

if(this.props.overflowIcon){
nativeProps.overflowIcon=resolveAssetSource(this.props.overflowIcon);}

if(this.props.actions){
var nativeActions=[];
for(var i=0;i<this.props.actions.length;i++){
var action=babelHelpers.extends({},
this.props.actions[i]);

if(action.icon){
action.icon=resolveAssetSource(action.icon);}

if(action.show){
action.show=UIManager.ToolbarAndroid.Constants.ShowAsAction[action.show];}

nativeActions.push(action);}

nativeProps.nativeActions=nativeActions;}


return React.createElement(NativeToolbar,babelHelpers.extends({onSelect:this._onSelect},nativeProps,{__source:{fileName:_jsxFileName,lineNumber:194}}));},


_onSelect:function _onSelect(event){
var position=event.nativeEvent.position;
if(position===-1){
this.props.onIconClicked&&this.props.onIconClicked();}else 
{
this.props.onActionSelected&&this.props.onActionSelected(position);}}});




var toolbarAttributes=babelHelpers.extends({},
ReactNativeViewAttributes.UIView,{
actions:true,
logo:true,
navIcon:true,
overflowIcon:true,
rtl:true,
subtitle:true,
subtitleColor:true,
title:true,
titleColor:true});


var NativeToolbar=requireNativeComponent('ToolbarAndroid',ToolbarAndroid,{
nativeOnly:{
nativeActions:true}});



module.exports=ToolbarAndroid;
}, "ToolbarAndroid");
__d(239 /* TouchableBounce */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/Touchable/TouchableBounce.js';












var Animated=require(240 /* Animated */);
var EdgeInsetsPropType=require(82 /* EdgeInsetsPropType */);
var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var React=require(34 /* React */);
var Touchable=require(142 /* Touchable */);








var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};








var TouchableBounce=React.createClass({displayName:'TouchableBounce',
mixins:[Touchable.Mixin,NativeMethodsMixin],

propTypes:{
onPress:React.PropTypes.func,
onPressIn:React.PropTypes.func,
onPressOut:React.PropTypes.func,



onPressWithCompletion:React.PropTypes.func,

onPressAnimationComplete:React.PropTypes.func,







pressRetentionOffset:EdgeInsetsPropType,








hitSlop:EdgeInsetsPropType},


getInitialState:function getInitialState(){
return babelHelpers.extends({},
this.touchableGetInitialState(),{
scale:new Animated.Value(1)});},



bounceTo:function bounceTo(
value,
velocity,
bounciness,
callback)
{
Animated.spring(this.state.scale,{
toValue:value,
velocity:velocity,
bounciness:bounciness}).
start(callback);},






touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.bounceTo(0.93,0.1,0);
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
this.bounceTo(1,0.4,0);
this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function touchableHandlePress(e){var _this=this;
var onPressWithCompletion=this.props.onPressWithCompletion;
if(onPressWithCompletion){
onPressWithCompletion(function(){
_this.state.scale.setValue(0.93);
_this.bounceTo(1,10,10,_this.props.onPressAnimationComplete);});

return;}


this.bounceTo(1,10,10,this.props.onPressAnimationComplete);
this.props.onPress&&this.props.onPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return 0;},


render:function render(){
return (
React.createElement(Animated.View,{
style:[{transform:[{scale:this.state.scale}]},this.props.style],
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
testID:this.props.testID,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,__source:{fileName:_jsxFileName,lineNumber:130}},
this.props.children,
Touchable.renderDebugView({color:'orange',hitSlop:this.props.hitSlop})));}});





module.exports=TouchableBounce;
}, "TouchableBounce");
__d(240 /* Animated */, function(global, require, module, exports) {'use strict';












var AnimatedImplementation=require(241 /* AnimatedImplementation */);
var Image=require(236 /* Image */);
var Text=require(141 /* Text */);
var View=require(81 /* View */);

module.exports=babelHelpers.extends({},
AnimatedImplementation,{
View:AnimatedImplementation.createAnimatedComponent(View),
Text:AnimatedImplementation.createAnimatedComponent(Text),
Image:AnimatedImplementation.createAnimatedComponent(Image)});
}, "Animated");
__d(241 /* AnimatedImplementation */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Animated/src/AnimatedImplementation.js';












var Easing=require(242 /* Easing */);
var InteractionManager=require(244 /* InteractionManager */);
var Interpolation=require(247 /* Interpolation */);
var React=require(34 /* React */);
var Set=require(176 /* Set */);
var SpringConfig=require(248 /* SpringConfig */);
var ViewStylePropTypes=require(75 /* ViewStylePropTypes */);
var NativeAnimatedHelper=require(249 /* NativeAnimatedHelper */);

var findNodeHandle=require(62 /* findNodeHandle */);
var flattenStyle=require(59 /* flattenStyle */);
var invariant=require(259 /* fbjs/lib/invariant */);
var requestAnimationFrame=require(416 /* fbjs/lib/requestAnimationFrame */);






var NativeAnimatedAPI=NativeAnimatedHelper.API;var 



Animated=function(){function Animated(){babelHelpers.classCallCheck(this,Animated);}babelHelpers.createClass(Animated,[{key:'__attach',value:function __attach()
{}},{key:'__detach',value:function __detach()
{
if(this.__isNative&&this.__nativeTag!=null){
NativeAnimatedAPI.dropAnimatedNode(this.__nativeTag);
this.__nativeTag=undefined;}}},{key:'__getValue',value:function __getValue()


{}},{key:'__getAnimatedValue',value:function __getAnimatedValue()
{return this.__getValue();}},{key:'__addChild',value:function __addChild(
child){}},{key:'__removeChild',value:function __removeChild(
child){}},{key:'__getChildren',value:function __getChildren()
{return [];}},{key:'__makeNative',value:function __makeNative()




{
if(!this.__isNative){
throw new Error('This node cannot be made a "native" animated node');}}},{key:'__getNativeTag',value:function __getNativeTag()


{
NativeAnimatedHelper.assertNativeAnimatedModule();
invariant(this.__isNative,'Attempt to get native tag from node not marked as "native"');
if(this.__nativeTag==null){
var nativeTag=NativeAnimatedHelper.generateNewNodeTag();
NativeAnimatedAPI.createAnimatedNode(nativeTag,this.__getNativeConfig());
this.__nativeTag=nativeTag;}

return this.__nativeTag;}},{key:'__getNativeConfig',value:function __getNativeConfig()

{
throw new Error('This JS animated node type cannot be used as native animated node');}},{key:'toJSON',value:function toJSON()

{return this.__getValue();}}]);return Animated;}();var 










Animation=function(){function Animation(){babelHelpers.classCallCheck(this,Animation);}babelHelpers.createClass(Animation,[{key:'start',value:function start(





fromValue,
onUpdate,
onEnd,
previousAnimation,
animatedValue)
{}},{key:'stop',value:function stop()
{
if(this.__nativeId){
NativeAnimatedAPI.stopAnimation(this.__nativeId);}}},{key:'_getNativeAnimationConfig',value:function _getNativeAnimationConfig()


{


throw new Error('This animation type cannot be offloaded to native');}},{key:'__debouncedOnEnd',value:function __debouncedOnEnd(


result){
var onEnd=this.__onEnd;
this.__onEnd=null;
onEnd&&onEnd(result);}},{key:'__startNativeAnimation',value:function __startNativeAnimation(

animatedValue){
animatedValue.__makeNative();
this.__nativeId=NativeAnimatedHelper.generateNewAnimationId();
NativeAnimatedAPI.startAnimatingNode(
this.__nativeId,
animatedValue.__getNativeTag(),
this._getNativeAnimationConfig(),
this.__debouncedOnEnd.bind(this));}}]);return Animation;}();var 




AnimatedWithChildren=function(_Animated){babelHelpers.inherits(AnimatedWithChildren,_Animated);


function AnimatedWithChildren(){babelHelpers.classCallCheck(this,AnimatedWithChildren);var _this=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedWithChildren).call(this));

_this._children=[];return _this;}babelHelpers.createClass(AnimatedWithChildren,[{key:'__makeNative',value:function __makeNative()


{
if(!this.__isNative){
this.__isNative=true;
for(var _iterator=this._children,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var _ref;if(_isArray){if(_i>=_iterator.length)break;_ref=_iterator[_i++];}else {_i=_iterator.next();if(_i.done)break;_ref=_i.value;}var child=_ref;
child.__makeNative();
NativeAnimatedAPI.connectAnimatedNodes(this.__getNativeTag(),child.__getNativeTag());}}}},{key:'__addChild',value:function __addChild(




child){
if(this._children.length===0){
this.__attach();}

this._children.push(child);
if(this.__isNative){

child.__makeNative();
NativeAnimatedAPI.connectAnimatedNodes(this.__getNativeTag(),child.__getNativeTag());}}},{key:'__removeChild',value:function __removeChild(



child){
var index=this._children.indexOf(child);
if(index===-1){
console.warn('Trying to remove a child that doesn\'t exist');
return;}

if(this.__isNative&&child.__isNative){
NativeAnimatedAPI.disconnectAnimatedNodes(this.__getNativeTag(),child.__getNativeTag());}

this._children.splice(index,1);
if(this._children.length===0){
this.__detach();}}},{key:'__getChildren',value:function __getChildren()



{
return this._children;}}]);return AnimatedWithChildren;}(Animated);

























function _flush(rootNode){
var animatedStyles=new Set();
function findAnimatedStyles(node){
if(typeof node.update==='function'){
animatedStyles.add(node);}else 
{
node.__getChildren().forEach(findAnimatedStyles);}}


findAnimatedStyles(rootNode);

animatedStyles.forEach(function(animatedStyle){return animatedStyle.update();});}
















var easeInOut=Easing.inOut(Easing.ease);var 

TimingAnimation=function(_Animation){babelHelpers.inherits(TimingAnimation,_Animation);











function TimingAnimation(
config)
{babelHelpers.classCallCheck(this,TimingAnimation);var _this2=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(TimingAnimation).call(this));

_this2._toValue=config.toValue;
_this2._easing=config.easing!==undefined?config.easing:easeInOut;
_this2._duration=config.duration!==undefined?config.duration:500;
_this2._delay=config.delay!==undefined?config.delay:0;
_this2.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;
_this2._useNativeDriver=!!config.useNativeDriver;return _this2;}babelHelpers.createClass(TimingAnimation,[{key:'_getNativeAnimationConfig',value:function _getNativeAnimationConfig()


{
var frameDuration=1000.0/60.0;
var frames=[];
for(var dt=0.0;dt<=this._duration;dt+=frameDuration){
frames.push(this._easing(dt/this._duration));}

return {
type:'frames',
frames:frames,
toValue:this._toValue};}},{key:'start',value:function start(




fromValue,
onUpdate,
onEnd,
previousAnimation,
animatedValue)
{var _this3=this;
this.__active=true;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;

var start=function start(){
if(_this3._duration===0){
_this3._onUpdate(_this3._toValue);
_this3.__debouncedOnEnd({finished:true});}else 
{
_this3._startTime=Date.now();
if(_this3._useNativeDriver){
_this3.__startNativeAnimation(animatedValue);}else 
{
_this3._animationFrame=requestAnimationFrame(_this3.onUpdate.bind(_this3));}}};



if(this._delay){
this._timeout=setTimeout(start,this._delay);}else 
{
start();}}},{key:'onUpdate',value:function onUpdate()



{
var now=Date.now();
if(now>=this._startTime+this._duration){
if(this._duration===0){
this._onUpdate(this._toValue);}else 
{
this._onUpdate(
this._fromValue+this._easing(1)*(this._toValue-this._fromValue));}


this.__debouncedOnEnd({finished:true});
return;}


this._onUpdate(
this._fromValue+
this._easing((now-this._startTime)/this._duration)*(
this._toValue-this._fromValue));

if(this.__active){
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}}},{key:'stop',value:function stop()



{
babelHelpers.get(Object.getPrototypeOf(TimingAnimation.prototype),'stop',this).call(this);
this.__active=false;
clearTimeout(this._timeout);
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return TimingAnimation;}(Animation);var 













DecayAnimation=function(_Animation2){babelHelpers.inherits(DecayAnimation,_Animation2);








function DecayAnimation(
config)
{babelHelpers.classCallCheck(this,DecayAnimation);var _this4=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(DecayAnimation).call(this));

_this4._deceleration=config.deceleration!==undefined?config.deceleration:0.998;
_this4._velocity=config.velocity;
_this4.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this4;}babelHelpers.createClass(DecayAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd)
{
this.__active=true;
this._lastValue=fromValue;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._startTime=Date.now();
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}},{key:'onUpdate',value:function onUpdate()


{
var now=Date.now();

var value=this._fromValue+
this._velocity/(1-this._deceleration)*(
1-Math.exp(-(1-this._deceleration)*(now-this._startTime)));

this._onUpdate(value);

if(Math.abs(this._lastValue-value)<0.1){
this.__debouncedOnEnd({finished:true});
return;}


this._lastValue=value;
if(this.__active){
this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}}},{key:'stop',value:function stop()



{
babelHelpers.get(Object.getPrototypeOf(DecayAnimation.prototype),'stop',this).call(this);
this.__active=false;
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return DecayAnimation;}(Animation);



























function withDefault(value,defaultValue){
if(value===undefined||value===null){
return defaultValue;}

return value;}var 


SpringAnimation=function(_Animation3){babelHelpers.inherits(SpringAnimation,_Animation3);















function SpringAnimation(
config)
{babelHelpers.classCallCheck(this,SpringAnimation);var _this5=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(SpringAnimation).call(this));


_this5._overshootClamping=withDefault(config.overshootClamping,false);
_this5._restDisplacementThreshold=withDefault(config.restDisplacementThreshold,0.001);
_this5._restSpeedThreshold=withDefault(config.restSpeedThreshold,0.001);
_this5._initialVelocity=config.velocity;
_this5._lastVelocity=withDefault(config.velocity,0);
_this5._toValue=config.toValue;
_this5.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;

var springConfig;
if(config.bounciness!==undefined||config.speed!==undefined){
invariant(
config.tension===undefined&&config.friction===undefined,
'You can only define bounciness/speed or tension/friction but not both');

springConfig=SpringConfig.fromBouncinessAndSpeed(
withDefault(config.bounciness,8),
withDefault(config.speed,12));}else 

{
springConfig=SpringConfig.fromOrigamiTensionAndFriction(
withDefault(config.tension,40),
withDefault(config.friction,7));}


_this5._tension=springConfig.tension;
_this5._friction=springConfig.friction;return _this5;}babelHelpers.createClass(SpringAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd,
previousAnimation)
{
this.__active=true;
this._startPosition=fromValue;
this._lastPosition=this._startPosition;

this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._lastTime=Date.now();

if(previousAnimation instanceof SpringAnimation){
var internalState=previousAnimation.getInternalState();
this._lastPosition=internalState.lastPosition;
this._lastVelocity=internalState.lastVelocity;
this._lastTime=internalState.lastTime;}

if(this._initialVelocity!==undefined&&
this._initialVelocity!==null){
this._lastVelocity=this._initialVelocity;}

this.onUpdate();}},{key:'getInternalState',value:function getInternalState()


{
return {
lastPosition:this._lastPosition,
lastVelocity:this._lastVelocity,
lastTime:this._lastTime};}},{key:'onUpdate',value:function onUpdate()



{
var position=this._lastPosition;
var velocity=this._lastVelocity;

var tempPosition=this._lastPosition;
var tempVelocity=this._lastVelocity;





var MAX_STEPS=64;
var now=Date.now();
if(now>this._lastTime+MAX_STEPS){
now=this._lastTime+MAX_STEPS;}





var TIMESTEP_MSEC=1;
var numSteps=Math.floor((now-this._lastTime)/TIMESTEP_MSEC);

for(var i=0;i<numSteps;++i){

var step=TIMESTEP_MSEC/1000;



var aVelocity=velocity;
var aAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
var tempPosition=position+aVelocity*step/2;
var tempVelocity=velocity+aAcceleration*step/2;

var bVelocity=tempVelocity;
var bAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+bVelocity*step/2;
tempVelocity=velocity+bAcceleration*step/2;

var cVelocity=tempVelocity;
var cAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dVelocity=tempVelocity;
var dAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dxdt=(aVelocity+2*(bVelocity+cVelocity)+dVelocity)/6;
var dvdt=(aAcceleration+2*(bAcceleration+cAcceleration)+dAcceleration)/6;

position+=dxdt*step;
velocity+=dvdt*step;}


this._lastTime=now;
this._lastPosition=position;
this._lastVelocity=velocity;

this._onUpdate(position);
if(!this.__active){
return;}



var isOvershooting=false;
if(this._overshootClamping&&this._tension!==0){
if(this._startPosition<this._toValue){
isOvershooting=position>this._toValue;}else 
{
isOvershooting=position<this._toValue;}}


var isVelocity=Math.abs(velocity)<=this._restSpeedThreshold;
var isDisplacement=true;
if(this._tension!==0){
isDisplacement=Math.abs(this._toValue-position)<=this._restDisplacementThreshold;}


if(isOvershooting||isVelocity&&isDisplacement){
if(this._tension!==0){

this._onUpdate(this._toValue);}


this.__debouncedOnEnd({finished:true});
return;}

this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this));}},{key:'stop',value:function stop()


{
babelHelpers.get(Object.getPrototypeOf(SpringAnimation.prototype),'stop',this).call(this);
this.__active=false;
window.cancelAnimationFrame(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return SpringAnimation;}(Animation);





var _uniqueId=1;var 







AnimatedValue=function(_AnimatedWithChildren){babelHelpers.inherits(AnimatedValue,_AnimatedWithChildren);







function AnimatedValue(value){babelHelpers.classCallCheck(this,AnimatedValue);var _this6=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValue).call(this));

_this6._startingValue=_this6._value=value;
_this6._offset=0;
_this6._animation=null;
_this6._listeners={};return _this6;}babelHelpers.createClass(AnimatedValue,[{key:'__detach',value:function __detach()


{
this.stopAnimation();
babelHelpers.get(Object.getPrototypeOf(AnimatedValue.prototype),'__detach',this).call(this);}},{key:'__getValue',value:function __getValue()


{
return this._value+this._offset;}},{key:'setValue',value:function setValue(






value){
if(this._animation){
this._animation.stop();
this._animation=null;}

this._updateValue(value,!this.__isNative);
if(this.__isNative){
NativeAnimatedAPI.setAnimatedNodeValue(this.__getNativeTag(),value);}}},{key:'setOffset',value:function setOffset(








offset){
this._offset=offset;}},{key:'flattenOffset',value:function flattenOffset()






{
this._value+=this._offset;
this._offset=0;}},{key:'addListener',value:function addListener(







callback){
var id=String(_uniqueId++);
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'removeAllListeners',value:function removeAllListeners()


{
this._listeners={};}},{key:'stopAnimation',value:function stopAnimation(







callback){
this.stopTracking();
this._animation&&this._animation.stop();
this._animation=null;
callback&&callback(this.__getValue());}},{key:'interpolate',value:function interpolate(






config){
return new AnimatedInterpolation(this,config);}},{key:'animate',value:function animate(






animation,callback){var _this7=this;
var handle=null;
if(animation.__isInteraction){
handle=InteractionManager.createInteractionHandle();}

var previousAnimation=this._animation;
this._animation&&this._animation.stop();
this._animation=animation;
animation.start(
this._value,
function(value){


_this7._updateValue(value,true);},

function(result){
_this7._animation=null;
if(handle!==null){
InteractionManager.clearInteractionHandle(handle);}

callback&&callback(result);},

previousAnimation,
this);}},{key:'stopTracking',value:function stopTracking()






{
this._tracking&&this._tracking.__detach();
this._tracking=null;}},{key:'track',value:function track(





tracking){
this.stopTracking();
this._tracking=tracking;}},{key:'_updateValue',value:function _updateValue(


value,flush){
this._value=value;
if(flush){
_flush(this);}

for(var key in this._listeners){
this._listeners[key]({value:this.__getValue()});}}},{key:'__getNativeConfig',value:function __getNativeConfig()



{
return {
type:'value',
value:this._startingValue};}}]);return AnimatedValue;}(AnimatedWithChildren);var 












































AnimatedValueXY=function(_AnimatedWithChildren2){babelHelpers.inherits(AnimatedValueXY,_AnimatedWithChildren2);




function AnimatedValueXY(valueIn){babelHelpers.classCallCheck(this,AnimatedValueXY);var _this8=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValueXY).call(this));

var value=valueIn||{x:0,y:0};
if(typeof value.x==='number'&&typeof value.y==='number'){
_this8.x=new AnimatedValue(value.x);
_this8.y=new AnimatedValue(value.y);}else 
{
invariant(
value.x instanceof AnimatedValue&&
value.y instanceof AnimatedValue,
'AnimatedValueXY must be initalized with an object of numbers or '+
'AnimatedValues.');

_this8.x=value.x;
_this8.y=value.y;}

_this8._listeners={};return _this8;}babelHelpers.createClass(AnimatedValueXY,[{key:'setValue',value:function setValue(


value){
this.x.setValue(value.x);
this.y.setValue(value.y);}},{key:'setOffset',value:function setOffset(


offset){
this.x.setOffset(offset.x);
this.y.setOffset(offset.y);}},{key:'flattenOffset',value:function flattenOffset()


{
this.x.flattenOffset();
this.y.flattenOffset();}},{key:'__getValue',value:function __getValue()


{
return {
x:this.x.__getValue(),
y:this.y.__getValue()};}},{key:'stopAnimation',value:function stopAnimation(



callback){
this.x.stopAnimation();
this.y.stopAnimation();
callback&&callback(this.__getValue());}},{key:'addListener',value:function addListener(


callback){var _this9=this;
var id=String(_uniqueId++);
var jointCallback=function jointCallback(_ref2){var number=_ref2.value;
callback(_this9.__getValue());};

this._listeners[id]={
x:this.x.addListener(jointCallback),
y:this.y.addListener(jointCallback)};

return id;}},{key:'removeListener',value:function removeListener(


id){
this.x.removeListener(this._listeners[id].x);
this.y.removeListener(this._listeners[id].y);
delete this._listeners[id];}},{key:'getLayout',value:function getLayout()









{
return {
left:this.x,
top:this.y};}},{key:'getTranslateTransform',value:function getTranslateTransform()












{
return [
{translateX:this.x},
{translateY:this.y}];}}]);return AnimatedValueXY;}(AnimatedWithChildren);var 




AnimatedInterpolation=function(_AnimatedWithChildren3){babelHelpers.inherits(AnimatedInterpolation,_AnimatedWithChildren3);




function AnimatedInterpolation(parent,config){babelHelpers.classCallCheck(this,AnimatedInterpolation);var _this10=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedInterpolation).call(this));

_this10._parent=parent;
_this10._config=config;
_this10._interpolation=Interpolation.create(config);return _this10;}babelHelpers.createClass(AnimatedInterpolation,[{key:'__getValue',value:function __getValue()


{
var parentValue=this._parent.__getValue();
invariant(
typeof parentValue==='number',
'Cannot interpolate an input which is not a number.');

return this._interpolation(parentValue);}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,config);}},{key:'__attach',value:function __attach()


{
this._parent.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._parent.__removeChild(this);
babelHelpers.get(Object.getPrototypeOf(AnimatedInterpolation.prototype),'__detach',this).call(this);}},{key:'__getNativeConfig',value:function __getNativeConfig()


{
NativeAnimatedHelper.validateInterpolation(this._config);
return babelHelpers.extends({},
this._config,{
type:'interpolation'});}}]);return AnimatedInterpolation;}(AnimatedWithChildren);var 




AnimatedAddition=function(_AnimatedWithChildren4){babelHelpers.inherits(AnimatedAddition,_AnimatedWithChildren4);



function AnimatedAddition(a,b){babelHelpers.classCallCheck(this,AnimatedAddition);var _this11=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedAddition).call(this));

_this11._a=typeof a==='number'?new AnimatedValue(a):a;
_this11._b=typeof b==='number'?new AnimatedValue(b):b;return _this11;}babelHelpers.createClass(AnimatedAddition,[{key:'__makeNative',value:function __makeNative()


{
this._a.__makeNative();
this._b.__makeNative();
babelHelpers.get(Object.getPrototypeOf(AnimatedAddition.prototype),'__makeNative',this).call(this);}},{key:'__getValue',value:function __getValue()


{
return this._a.__getValue()+this._b.__getValue();}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,config);}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);
babelHelpers.get(Object.getPrototypeOf(AnimatedAddition.prototype),'__detach',this).call(this);}},{key:'__getNativeConfig',value:function __getNativeConfig()


{
return {
type:'addition',
input:[this._a.__getNativeTag(),this._b.__getNativeTag()]};}}]);return AnimatedAddition;}(AnimatedWithChildren);var 




AnimatedMultiplication=function(_AnimatedWithChildren5){babelHelpers.inherits(AnimatedMultiplication,_AnimatedWithChildren5);



function AnimatedMultiplication(a,b){babelHelpers.classCallCheck(this,AnimatedMultiplication);var _this12=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedMultiplication).call(this));

_this12._a=typeof a==='number'?new AnimatedValue(a):a;
_this12._b=typeof b==='number'?new AnimatedValue(b):b;return _this12;}babelHelpers.createClass(AnimatedMultiplication,[{key:'__makeNative',value:function __makeNative()


{
babelHelpers.get(Object.getPrototypeOf(AnimatedMultiplication.prototype),'__makeNative',this).call(this);
this._a.__makeNative();
this._b.__makeNative();}},{key:'__getValue',value:function __getValue()


{
return this._a.__getValue()*this._b.__getValue();}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,config);}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);
babelHelpers.get(Object.getPrototypeOf(AnimatedMultiplication.prototype),'__detach',this).call(this);}},{key:'__getNativeConfig',value:function __getNativeConfig()


{
return {
type:'multiplication',
input:[this._a.__getNativeTag(),this._b.__getNativeTag()]};}}]);return AnimatedMultiplication;}(AnimatedWithChildren);var 




AnimatedModulo=function(_AnimatedWithChildren6){babelHelpers.inherits(AnimatedModulo,_AnimatedWithChildren6);



function AnimatedModulo(a,modulus){babelHelpers.classCallCheck(this,AnimatedModulo);var _this13=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedModulo).call(this));

_this13._a=a;
_this13._modulus=modulus;return _this13;}babelHelpers.createClass(AnimatedModulo,[{key:'__getValue',value:function __getValue()


{
return (this._a.__getValue()%this._modulus+this._modulus)%this._modulus;}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,config);}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);}}]);return AnimatedModulo;}(AnimatedWithChildren);var 



AnimatedTransform=function(_AnimatedWithChildren7){babelHelpers.inherits(AnimatedTransform,_AnimatedWithChildren7);


function AnimatedTransform(transforms){babelHelpers.classCallCheck(this,AnimatedTransform);var _this14=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTransform).call(this));

_this14._transforms=transforms;return _this14;}babelHelpers.createClass(AnimatedTransform,[{key:'__getValue',value:function __getValue()


{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getValue();}else 
{
result[key]=value;}}


return result;});}},{key:'__getAnimatedValue',value:function __getAnimatedValue()



{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getAnimatedValue();}else 
{

result[key]=value;}}


return result;});}},{key:'__attach',value:function __attach()



{var _this15=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__addChild(_this15);}}});}},{key:'__detach',value:function __detach()





{var _this16=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__removeChild(_this16);}}});}}]);return AnimatedTransform;}(AnimatedWithChildren);var 






AnimatedStyle=function(_AnimatedWithChildren8){babelHelpers.inherits(AnimatedStyle,_AnimatedWithChildren8);


function AnimatedStyle(style){babelHelpers.classCallCheck(this,AnimatedStyle);var _this17=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedStyle).call(this));

style=flattenStyle(style)||{};
if(style.transform){
style=babelHelpers.extends({},
style,{
transform:new AnimatedTransform(style.transform)});}


_this17._style=style;return _this17;}babelHelpers.createClass(AnimatedStyle,[{key:'__getValue',value:function __getValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
if(!value.__isNative){


style[key]=value.__getValue();}}else 

{
style[key]=value;}}


return style;}},{key:'__getAnimatedValue',value:function __getAnimatedValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getAnimatedValue();}}


return style;}},{key:'__attach',value:function __attach()


{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__addChild(this);}}}},{key:'__detach',value:function __detach()




{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__removeChild(this);}}}},{key:'__makeNative',value:function __makeNative()




{
babelHelpers.get(Object.getPrototypeOf(AnimatedStyle.prototype),'__makeNative',this).call(this);
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__makeNative();}}}},{key:'__getNativeConfig',value:function __getNativeConfig()




{
var styleConfig={};
for(var styleKey in this._style){
if(this._style[styleKey] instanceof Animated){
styleConfig[styleKey]=this._style[styleKey].__getNativeTag();}}




NativeAnimatedHelper.validateStyles(styleConfig);
return {
type:'style',
style:styleConfig};}}]);return AnimatedStyle;}(AnimatedWithChildren);var 




AnimatedProps=function(_Animated2){babelHelpers.inherits(AnimatedProps,_Animated2);




function AnimatedProps(
props,
callback)
{babelHelpers.classCallCheck(this,AnimatedProps);var _this18=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedProps).call(this));

if(props.style){
props=babelHelpers.extends({},
props,{
style:new AnimatedStyle(props.style)});}


_this18._props=props;
_this18._callback=callback;
_this18.__attach();return _this18;}babelHelpers.createClass(AnimatedProps,[{key:'__getValue',value:function __getValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
if(!value.__isNative){


props[key]=value.__getValue();}}else 

{
props[key]=value;}}


return props;}},{key:'__getAnimatedValue',value:function __getAnimatedValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getAnimatedValue();}}


return props;}},{key:'__attach',value:function __attach()


{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__addChild(this);}}}},{key:'__detach',value:function __detach()




{
if(this.__isNative&&this._animatedView){
this.__disconnectAnimatedView();}

for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__removeChild(this);}}


babelHelpers.get(Object.getPrototypeOf(AnimatedProps.prototype),'__detach',this).call(this);}},{key:'update',value:function update()


{
this._callback();}},{key:'__makeNative',value:function __makeNative()


{
if(!this.__isNative){
this.__isNative=true;
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__makeNative();}}


if(this._animatedView){
this.__connectAnimatedView();}}}},{key:'setNativeView',value:function setNativeView(




animatedView){
invariant(this._animatedView===undefined,'Animated view already set.');
this._animatedView=animatedView;
if(this.__isNative){
this.__connectAnimatedView();}}},{key:'__connectAnimatedView',value:function __connectAnimatedView()



{
invariant(this.__isNative,'Expected node to be marked as "native"');
var nativeViewTag=findNodeHandle(this._animatedView);
invariant(nativeViewTag!=null,'Unable to locate attached view in the native tree');
NativeAnimatedAPI.connectAnimatedNodeToView(this.__getNativeTag(),nativeViewTag);}},{key:'__disconnectAnimatedView',value:function __disconnectAnimatedView()


{
invariant(this.__isNative,'Expected node to be marked as "native"');
var nativeViewTag=findNodeHandle(this._animatedView);
invariant(nativeViewTag!=null,'Unable to locate attached view in the native tree');
NativeAnimatedAPI.disconnectAnimatedNodeFromView(this.__getNativeTag(),nativeViewTag);}},{key:'__getNativeConfig',value:function __getNativeConfig()


{
var propsConfig={};
for(var propKey in this._props){
var value=this._props[propKey];
if(value instanceof Animated){
propsConfig[propKey]=value.__getNativeTag();}}


NativeAnimatedHelper.validateProps(propsConfig);
return {
type:'props',
props:propsConfig};}}]);return AnimatedProps;}(Animated);




function createAnimatedComponent(Component){
var refName='node';var 

AnimatedComponent=function(_React$Component){babelHelpers.inherits(AnimatedComponent,_React$Component);function AnimatedComponent(){babelHelpers.classCallCheck(this,AnimatedComponent);return babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedComponent).apply(this,arguments));}babelHelpers.createClass(AnimatedComponent,[{key:'componentWillUnmount',value:function componentWillUnmount()


{
this._propsAnimated&&this._propsAnimated.__detach();}},{key:'setNativeProps',value:function setNativeProps(


props){
this.refs[refName].setNativeProps(props);}},{key:'componentWillMount',value:function componentWillMount()


{
this.attachProps(this.props);}},{key:'componentDidMount',value:function componentDidMount()


{
this._propsAnimated.setNativeView(this.refs[refName]);}},{key:'attachProps',value:function attachProps(


nextProps){var _this20=this;
var oldPropsAnimated=this._propsAnimated;







var callback=function callback(){
if(_this20.refs[refName].setNativeProps){
if(!_this20._propsAnimated.__isNative){
_this20.refs[refName].setNativeProps(
_this20._propsAnimated.__getAnimatedValue());}else 

{
throw new Error('Attempting to run JS driven animation on animated '+
'node that has been moved to "native" earlier by starting an '+
'animation with `useNativeDriver: true`');}}else 

{
_this20.forceUpdate();}};



this._propsAnimated=new AnimatedProps(
nextProps,
callback);



if(this.refs&&this.refs[refName]){
this._propsAnimated.setNativeView(this.refs[refName]);}










oldPropsAnimated&&oldPropsAnimated.__detach();}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.attachProps(nextProps);}},{key:'render',value:function render()


{
return (
React.createElement(Component,babelHelpers.extends({},
this._propsAnimated.__getValue(),{
ref:refName,__source:{fileName:_jsxFileName,lineNumber:1433}})));}}]);return AnimatedComponent;}(React.Component);




AnimatedComponent.propTypes={
style:function style(props,propName,componentName){
if(!Component.propTypes){
return;}


for(var key in ViewStylePropTypes){
if(!Component.propTypes[key]&&props[key]!==undefined){
console.warn(
'You are setting the style `{ '+key+': ... }` as a prop. You '+
'should nest it in a style object. '+
'E.g. `{ style: { '+key+': ... } }`');}}}};






return AnimatedComponent;}var 


AnimatedTracking=function(_Animated3){babelHelpers.inherits(AnimatedTracking,_Animated3);






function AnimatedTracking(
value,
parent,
animationClass,
animationConfig,
callback)
{babelHelpers.classCallCheck(this,AnimatedTracking);var _this21=babelHelpers.possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTracking).call(this));

_this21._value=value;
_this21._parent=parent;
_this21._animationClass=animationClass;
_this21._animationConfig=animationConfig;
_this21._callback=callback;
_this21.__attach();return _this21;}babelHelpers.createClass(AnimatedTracking,[{key:'__getValue',value:function __getValue()


{
return this._parent.__getValue();}},{key:'__attach',value:function __attach()


{
this._parent.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._parent.__removeChild(this);
babelHelpers.get(Object.getPrototypeOf(AnimatedTracking.prototype),'__detach',this).call(this);}},{key:'update',value:function update()


{
this._value.animate(new this._animationClass(babelHelpers.extends({},
this._animationConfig,{
toValue:this._animationConfig.toValue.__getValue()})),
this._callback);}}]);return AnimatedTracking;}(Animated);








var add=function add(
a,
b)
{
return new AnimatedAddition(a,b);};


var multiply=function multiply(
a,
b)
{
return new AnimatedMultiplication(a,b);};


var modulo=function modulo(
a,
modulus)
{
return new AnimatedModulo(a,modulus);};



var maybeVectorAnim=function maybeVectorAnim(
value,
config,
anim)
{
if(value instanceof AnimatedValueXY){
var configX=babelHelpers.extends({},config);
var configY=babelHelpers.extends({},config);
for(var key in config){var _config$key=
config[key];var x=_config$key.x;var y=_config$key.y;
if(x!==undefined&&y!==undefined){
configX[key]=x;
configY[key]=y;}}


var aX=anim(value.x,configX);
var aY=anim(value.y,configY);


return parallel([aX,aY],{stopTogether:false});}

return null;};


var spring=function spring(
value,
config)
{
return maybeVectorAnim(value,config,spring)||{
start:function start(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
SpringAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new SpringAnimation(singleConfig),callback);}},



stop:function stop(){
value.stopAnimation();}};};




var timing=function timing(
value,
config)
{
return maybeVectorAnim(value,config,timing)||{
start:function start(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
TimingAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new TimingAnimation(singleConfig),callback);}},



stop:function stop(){
value.stopAnimation();}};};




var decay=function decay(
value,
config)
{
return maybeVectorAnim(value,config,decay)||{
start:function start(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
singleValue.animate(new DecayAnimation(singleConfig),callback);},


stop:function stop(){
value.stopAnimation();}};};




var sequence=function sequence(
animations)
{
var current=0;
return {
start:function start(callback){
var onComplete=function onComplete(result){
if(!result.finished){
callback&&callback(result);
return;}


current++;

if(current===animations.length){
callback&&callback(result);
return;}


animations[current].start(onComplete);};


if(animations.length===0){
callback&&callback({finished:true});}else 
{
animations[current].start(onComplete);}},



stop:function stop(){
if(current<animations.length){
animations[current].stop();}}};};








var parallel=function parallel(
animations,
config)
{
var doneCount=0;

var hasEnded={};
var stopTogether=!(config&&config.stopTogether===false);

var result={
start:function start(callback){
if(doneCount===animations.length){
callback&&callback({finished:true});
return;}


animations.forEach(function(animation,idx){
var cb=function cb(endResult){
hasEnded[idx]=true;
doneCount++;
if(doneCount===animations.length){
doneCount=0;
callback&&callback(endResult);
return;}


if(!endResult.finished&&stopTogether){
result.stop();}};



if(!animation){
cb({finished:true});}else 
{
animation.start(cb);}});},




stop:function stop(){
animations.forEach(function(animation,idx){
!hasEnded[idx]&&animation.stop();
hasEnded[idx]=true;});}};




return result;};


var delay=function delay(time){

return timing(new AnimatedValue(0),{toValue:0,delay:time,duration:0});};


var stagger=function stagger(
time,
animations)
{
return parallel(animations.map(function(animation,i){
return sequence([
delay(time*i),
animation]);}));};







var event=function event(
argMapping,
config)
{
return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
var traverse=function traverse(recMapping,recEvt,key){
if(typeof recEvt==='number'){
invariant(
recMapping instanceof AnimatedValue,
'Bad mapping of type '+typeof recMapping+' for key '+key+
', event value must map to AnimatedValue');

recMapping.setValue(recEvt);
return;}

invariant(
typeof recMapping==='object',
'Bad mapping of type '+typeof recMapping+' for key '+key);

invariant(
typeof recEvt==='object',
'Bad event of type '+typeof recEvt+' for key '+key);

for(var key in recMapping){
traverse(recMapping[key],recEvt[key],key);}};


argMapping.forEach(function(mapping,idx){
traverse(mapping,args[idx],'arg'+idx);});

if(config&&config.listener){
config.listener.apply(null,args);}};};





























































































module.exports={




Value:AnimatedValue,



ValueXY:AnimatedValueXY,





decay:decay,




timing:timing,




spring:spring,





add:add,




multiply:multiply,





modulo:modulo,




delay:delay,





sequence:sequence,





parallel:parallel,




stagger:stagger,

















event:event,




createAnimatedComponent:createAnimatedComponent,

__PropsOnlyForTests:AnimatedProps};
}, "AnimatedImplementation");
__d(242 /* Easing */, function(global, require, module, exports) {'use strict';












var _bezier=require(243 /* bezier */);var 






Easing=function(){function Easing(){babelHelpers.classCallCheck(this,Easing);}babelHelpers.createClass(Easing,null,[{key:'step0',value:function step0(
n){
return n>0?1:0;}},{key:'step1',value:function step1(


n){
return n>=1?1:0;}},{key:'linear',value:function linear(


t){
return t;}},{key:'ease',value:function ease(


t){
return _ease(t);}},{key:'quad',value:function quad(


t){
return t*t;}},{key:'cubic',value:function cubic(


t){
return t*t*t;}},{key:'poly',value:function poly(


n){
return function(t){return Math.pow(t,n);};}},{key:'sin',value:function sin(


t){
return 1-Math.cos(t*Math.PI/2);}},{key:'circle',value:function circle(


t){
return 1-Math.sqrt(1-t*t);}},{key:'exp',value:function exp(


t){
return Math.pow(2,10*(t-1));}},{key:'elastic',value:function elastic()












{var bounciness=arguments.length<=0||arguments[0]===undefined?1:arguments[0];
var p=bounciness*Math.PI;
return function(t){return 1-Math.pow(Math.cos(t*Math.PI/2),3)*Math.cos(t*p);};}},{key:'back',value:function back(


s){
if(s===undefined){
s=1.70158;}

return function(t){return t*t*((s+1)*t-s);};}},{key:'bounce',value:function bounce(


t){
if(t<1/2.75){
return 7.5625*t*t;}


if(t<2/2.75){
t-=1.5/2.75;
return 7.5625*t*t+0.75;}


if(t<2.5/2.75){
t-=2.25/2.75;
return 7.5625*t*t+0.9375;}


t-=2.625/2.75;
return 7.5625*t*t+0.984375;}},{key:'bezier',value:function bezier(



x1,
y1,
x2,
y2)
{
return _bezier(x1,y1,x2,y2);}},{key:'in',value:function _in(



easing)
{
return easing;}},{key:'out',value:function out(






easing)
{
return function(t){return 1-easing(1-t);};}},{key:'inOut',value:function inOut(






easing)
{
return function(t){
if(t<0.5){
return easing(t*2)/2;}

return 1-easing((1-t)*2)/2;};}}]);return Easing;}();




var _ease=Easing.bezier(0.42,0,1,1);



module.exports=Easing;
}, "Easing");
__d(243 /* bezier */, function(global, require, module, exports) {var 








NEWTON_ITERATIONS=4;
var NEWTON_MIN_SLOPE=0.001;
var SUBDIVISION_PRECISION=0.0000001;
var SUBDIVISION_MAX_ITERATIONS=10;

var kSplineTableSize=11;
var kSampleStepSize=1.0/(kSplineTableSize-1.0);

var float32ArraySupported=typeof Float32Array==='function';

function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}
function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}
function C(aA1){return 3.0*aA1;}


function calcBezier(aT,aA1,aA2){return ((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}


function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}

function binarySubdivide(aX,aA,aB,mX1,mX2){
var currentX,currentT,i=0;
do {
currentT=aA+(aB-aA)/2.0;
currentX=calcBezier(currentT,mX1,mX2)-aX;
if(currentX>0.0){
aB=currentT;}else 
{
aA=currentT;}}while(

Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);
return currentT;}


function newtonRaphsonIterate(aX,aGuessT,mX1,mX2){
for(var i=0;i<NEWTON_ITERATIONS;++i){
var currentSlope=getSlope(aGuessT,mX1,mX2);
if(currentSlope===0.0){
return aGuessT;}

var currentX=calcBezier(aGuessT,mX1,mX2)-aX;
aGuessT-=currentX/currentSlope;}

return aGuessT;}


module.exports=function bezier(mX1,mY1,mX2,mY2){
if(!(0<=mX1&&mX1<=1&&0<=mX2&&mX2<=1)){
throw new Error('bezier x values must be in [0, 1] range');}



var sampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);
if(mX1!==mY1||mX2!==mY2){
for(var i=0;i<kSplineTableSize;++i){
sampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);}}



function getTForX(aX){
var intervalStart=0.0;
var currentSample=1;
var lastSample=kSplineTableSize-1;

for(;currentSample!==lastSample&&sampleValues[currentSample]<=aX;++currentSample){
intervalStart+=kSampleStepSize;}

--currentSample;


var dist=(aX-sampleValues[currentSample])/(sampleValues[currentSample+1]-sampleValues[currentSample]);
var guessForT=intervalStart+dist*kSampleStepSize;

var initialSlope=getSlope(guessForT,mX1,mX2);
if(initialSlope>=NEWTON_MIN_SLOPE){
return newtonRaphsonIterate(aX,guessForT,mX1,mX2);}else 
if(initialSlope===0.0){
return guessForT;}else 
{
return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize,mX1,mX2);}}



return function BezierEasing(x){
if(mX1===mY1&&mX2===mY2){
return x;}


if(x===0){
return 0;}

if(x===1){
return 1;}

return calcBezier(getTForX(x),mY1,mY2);};};
}, "bezier");
__d(244 /* InteractionManager */, function(global, require, module, exports) {'use strict';












var BatchedBridge=require(2 /* BatchedBridge */);
var EventEmitter=require(19 /* EventEmitter */);
var Set=require(176 /* Set */);
var TaskQueue=require(245 /* TaskQueue */);

var invariant=require(259 /* fbjs/lib/invariant */);
var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var setImmediate=require(246 /* setImmediate */);




var _emitter=new EventEmitter();

var DEBUG_DELAY=0;
var DEBUG=false;


















































var InteractionManager={
Events:keyMirror({
interactionStart:true,
interactionComplete:true}),





runAfterInteractions:function runAfterInteractions(task){
return new Promise(function(resolve){
_scheduleUpdate();
if(task){
_taskQueue.enqueue(task);}

var name=task&&task.name||'?';
_taskQueue.enqueue({run:resolve,name:'resolve '+name});});},






createInteractionHandle:function createInteractionHandle(){
DEBUG&&console.log('create interaction handle');
_scheduleUpdate();
var handle=++_inc;
_addInteractionSet.add(handle);
return handle;},





clearInteractionHandle:function clearInteractionHandle(handle){
DEBUG&&console.log('clear interaction handle');
invariant(
!!handle,
'Must provide a handle to clear.');

_scheduleUpdate();
_addInteractionSet.delete(handle);
_deleteInteractionSet.add(handle);},


addListener:_emitter.addListener.bind(_emitter),






setDeadline:function setDeadline(deadline){
_deadline=deadline;}};



var _interactionSet=new Set();
var _addInteractionSet=new Set();
var _deleteInteractionSet=new Set();
var _taskQueue=new TaskQueue({onMoreTasks:_scheduleUpdate});
var _nextUpdateHandle=0;
var _inc=0;
var _deadline=-1;




function _scheduleUpdate(){
if(!_nextUpdateHandle){
if(_deadline>0){
_nextUpdateHandle=setTimeout(_processUpdate,0+DEBUG_DELAY);}else 
{
_nextUpdateHandle=setImmediate(_processUpdate);}}}







function _processUpdate(){
_nextUpdateHandle=0;

var interactionCount=_interactionSet.size;
_addInteractionSet.forEach(function(handle){return (
_interactionSet.add(handle));});

_deleteInteractionSet.forEach(function(handle){return (
_interactionSet.delete(handle));});

var nextInteractionCount=_interactionSet.size;

if(interactionCount!==0&&nextInteractionCount===0){

_emitter.emit(InteractionManager.Events.interactionComplete);}else 
if(interactionCount===0&&nextInteractionCount!==0){

_emitter.emit(InteractionManager.Events.interactionStart);}



if(nextInteractionCount===0){
while(_taskQueue.hasTasksToProcess()){
_taskQueue.processNext();
if(_deadline>0&&
BatchedBridge.getEventLoopRunningTime()>=_deadline){

_scheduleUpdate();
break;}}}



_addInteractionSet.clear();
_deleteInteractionSet.clear();}


module.exports=InteractionManager;
}, "InteractionManager");
__d(245 /* TaskQueue */, function(global, require, module, exports) {'use strict';












var invariant=require(259 /* fbjs/lib/invariant */);











var DEBUG=false;var 

















TaskQueue=function(){







function TaskQueue(_ref){var onMoreTasks=_ref.onMoreTasks;babelHelpers.classCallCheck(this,TaskQueue);
this._onMoreTasks=onMoreTasks;
this._queueStack=[{tasks:[],popable:false}];}babelHelpers.createClass(TaskQueue,[{key:'enqueue',value:function enqueue(







task){
this._getCurrentQueue().push(task);}},{key:'hasTasksToProcess',value:function hasTasksToProcess()












{
return this._getCurrentQueue().length>0;}},{key:'processNext',value:function processNext()





{
var queue=this._getCurrentQueue();
if(queue.length){
var task=queue.shift();
try{
if(task.gen){
DEBUG&&console.log('genPromise for task '+task.name);
this._genPromise(task);}else 
if(task.run){
DEBUG&&console.log('run task '+task.name);
task.run();}else 
{
invariant(
typeof task==='function',
'Expected Function, SimpleTask, or PromiseTask, but got:\n'+
JSON.stringify(task,null,2));

DEBUG&&console.log('run anonymous task');
task();}}

catch(e){
e.message='TaskQueue: Error with task '+(task.name||'')+': '+
e.message;
throw e;}}}},{key:'_getCurrentQueue',value:function _getCurrentQueue()







{
var stackIdx=this._queueStack.length-1;
var queue=this._queueStack[stackIdx];
if(queue.popable&&
queue.tasks.length===0&&
this._queueStack.length>1){
this._queueStack.pop();
DEBUG&&console.log('popped queue: ',{stackIdx:stackIdx,queueStackSize:this._queueStack.length});
return this._getCurrentQueue();}else 
{
return queue.tasks;}}},{key:'_genPromise',value:function _genPromise(



task){var _this=this;




this._queueStack.push({tasks:[],popable:false});
var stackIdx=this._queueStack.length-1;
DEBUG&&console.log('push new queue: ',{stackIdx:stackIdx});
DEBUG&&console.log('exec gen task '+task.name);
task.gen().
then(function(){
DEBUG&&console.log('onThen for gen task '+task.name,{stackIdx:stackIdx,queueStackSize:_this._queueStack.length});
_this._queueStack[stackIdx].popable=true;
_this.hasTasksToProcess()&&_this._onMoreTasks();}).

catch(function(ex){
ex.message='TaskQueue: Error resolving Promise in task '+task.name+': '+ex.message;
throw ex;}).

done();}}]);return TaskQueue;}();




module.exports=TaskQueue;
}, "TaskQueue");
__d(246 /* setImmediate */, function(global, require, module, exports) {module.










exports=global.setImmediate;
}, "setImmediate");
__d(247 /* Interpolation */, function(global, require, module, exports) {'use strict';













var invariant=require(259 /* fbjs/lib/invariant */);
var normalizeColor=require(70 /* normalizeColor */);












var linear=function linear(t){return t;};var 





Interpolation=function(){function Interpolation(){babelHelpers.classCallCheck(this,Interpolation);}babelHelpers.createClass(Interpolation,null,[{key:'create',value:function create(
config){

if(config.outputRange&&typeof config.outputRange[0]==='string'){
return createInterpolationFromStringOutputRange(config);}


var outputRange=config.outputRange;
checkInfiniteRange('outputRange',outputRange);

var inputRange=config.inputRange;
checkInfiniteRange('inputRange',inputRange);
checkValidInputRange(inputRange);

invariant(
inputRange.length===outputRange.length,
'inputRange ('+inputRange.length+') and outputRange ('+
outputRange.length+') must have the same length');


var easing=config.easing||linear;

var extrapolateLeft='extend';
if(config.extrapolateLeft!==undefined){
extrapolateLeft=config.extrapolateLeft;}else 
if(config.extrapolate!==undefined){
extrapolateLeft=config.extrapolate;}


var extrapolateRight='extend';
if(config.extrapolateRight!==undefined){
extrapolateRight=config.extrapolateRight;}else 
if(config.extrapolate!==undefined){
extrapolateRight=config.extrapolate;}


return function(input){
invariant(
typeof input==='number',
'Cannot interpolation an input which is not a number');


var range=findRange(input,inputRange);
return interpolate(
input,
inputRange[range],
inputRange[range+1],
outputRange[range],
outputRange[range+1],
easing,
extrapolateLeft,
extrapolateRight);};}}]);return Interpolation;}();





function interpolate(
input,
inputMin,
inputMax,
outputMin,
outputMax,
easing,
extrapolateLeft,
extrapolateRight)
{
var result=input;


if(result<inputMin){
if(extrapolateLeft==='identity'){
return result;}else 
if(extrapolateLeft==='clamp'){
result=inputMin;}else 
if(extrapolateLeft==='extend'){}}




if(result>inputMax){
if(extrapolateRight==='identity'){
return result;}else 
if(extrapolateRight==='clamp'){
result=inputMax;}else 
if(extrapolateRight==='extend'){}}




if(outputMin===outputMax){
return outputMin;}


if(inputMin===inputMax){
if(input<=inputMin){
return outputMin;}

return outputMax;}



if(inputMin===-Infinity){
result=-result;}else 
if(inputMax===Infinity){
result=result-inputMin;}else 
{
result=(result-inputMin)/(inputMax-inputMin);}



result=easing(result);


if(outputMin===-Infinity){
result=-result;}else 
if(outputMax===Infinity){
result=result+outputMin;}else 
{
result=result*(outputMax-outputMin)+outputMin;}


return result;}


function colorToRgba(input){
var int32Color=normalizeColor(input);
if(int32Color===null){
return input;}


int32Color=int32Color||0;

var r=(int32Color&0xff000000)>>>24;
var g=(int32Color&0x00ff0000)>>>16;
var b=(int32Color&0x0000ff00)>>>8;
var a=(int32Color&0x000000ff)/255;

return 'rgba('+r+', '+g+', '+b+', '+a+')';}


var stringShapeRegex=/[0-9\.-]+/g;









function createInterpolationFromStringOutputRange(
config)
{
var outputRange=config.outputRange;
invariant(outputRange.length>=2,'Bad output range');
outputRange=outputRange.map(colorToRgba);
checkPattern(outputRange);












var outputRanges=outputRange[0].match(stringShapeRegex).map(function(){return [];});
outputRange.forEach(function(value){



value.match(stringShapeRegex).forEach(function(number,i){
outputRanges[i].push(+number);});});






var interpolations=outputRange[0].match(stringShapeRegex).map(function(value,i){
return Interpolation.create(babelHelpers.extends({},
config,{
outputRange:outputRanges[i]}));});





var shouldRound=isRgbOrRgba(outputRange[0]);

return function(input){
var i=0;



return outputRange[0].replace(stringShapeRegex,function(){
var val=+interpolations[i++](input);
var rounded=shouldRound&&i<4?Math.round(val):Math.round(val*1000)/1000;
return String(rounded);});};}




function isRgbOrRgba(range){
return typeof range==='string'&&range.startsWith('rgb');}


function checkPattern(arr){
var pattern=arr[0].replace(stringShapeRegex,'');
for(var i=1;i<arr.length;++i){
invariant(
pattern===arr[i].replace(stringShapeRegex,''),
'invalid pattern '+arr[0]+' and '+arr[i]);}}




function findRange(input,inputRange){
for(var i=1;i<inputRange.length-1;++i){
if(inputRange[i]>=input){
break;}}


return i-1;}


function checkValidInputRange(arr){
invariant(arr.length>=2,'inputRange must have at least 2 elements');
for(var i=1;i<arr.length;++i){
invariant(
arr[i]>=arr[i-1],






'inputRange must be monotonically increasing '+arr);}}




function checkInfiniteRange(name,arr){
invariant(arr.length>=2,name+' must have at least 2 elements');
invariant(
arr.length!==2||arr[0]!==-Infinity||arr[1]!==Infinity,






name+'cannot be ]-infinity;+infinity[ '+arr);}



module.exports=Interpolation;
}, "Interpolation");
__d(248 /* SpringConfig */, function(global, require, module, exports) {'use strict';


















function tensionFromOrigamiValue(oValue){
return (oValue-30)*3.62+194;}


function frictionFromOrigamiValue(oValue){
return (oValue-8)*3+25;}


function fromOrigamiTensionAndFriction(
tension,
friction)
{
return {
tension:tensionFromOrigamiValue(tension),
friction:frictionFromOrigamiValue(friction)};}



function fromBouncinessAndSpeed(
bounciness,
speed)
{
function normalize(value,startValue,endValue){
return (value-startValue)/(endValue-startValue);}


function projectNormal(n,start,end){
return start+n*(end-start);}


function linearInterpolation(t,start,end){
return t*end+(1-t)*start;}


function quadraticOutInterpolation(t,start,end){
return linearInterpolation(2*t-t*t,start,end);}


function b3Friction1(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;}


function b3Friction2(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2;}


function b3Friction3(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;}


function b3Nobounce(tension){
if(tension<=18){
return b3Friction1(tension);}else 
if(tension>18&&tension<=44){
return b3Friction2(tension);}else 
{
return b3Friction3(tension);}}



var b=normalize(bounciness/1.7,0,20);
b=projectNormal(b,0,0.8);
var s=normalize(speed/1.7,0,20);
var bouncyTension=projectNormal(s,0.5,200);
var bouncyFriction=quadraticOutInterpolation(
b,
b3Nobounce(bouncyTension),
0.01);


return {
tension:tensionFromOrigamiValue(bouncyTension),
friction:frictionFromOrigamiValue(bouncyFriction)};}



module.exports={
fromOrigamiTensionAndFriction:fromOrigamiTensionAndFriction,
fromBouncinessAndSpeed:fromBouncinessAndSpeed};
}, "SpringConfig");
__d(249 /* NativeAnimatedHelper */, function(global, require, module, exports) {'use strict';












var NativeAnimatedModule=require(12 /* NativeModules */).NativeAnimatedModule;

var invariant=require(259 /* fbjs/lib/invariant */);

var __nativeAnimatedNodeTagCount=1;
var __nativeAnimationIdCount=1;








var API={
createAnimatedNode:function createAnimatedNode(tag,config){
assertNativeAnimatedModule();
NativeAnimatedModule.createAnimatedNode(tag,config);},

connectAnimatedNodes:function connectAnimatedNodes(parentTag,childTag){
assertNativeAnimatedModule();
NativeAnimatedModule.connectAnimatedNodes(parentTag,childTag);},

disconnectAnimatedNodes:function disconnectAnimatedNodes(parentTag,childTag){
assertNativeAnimatedModule();
NativeAnimatedModule.disconnectAnimatedNodes(parentTag,childTag);},

startAnimatingNode:function startAnimatingNode(animationId,nodeTag,config,endCallback){
assertNativeAnimatedModule();
NativeAnimatedModule.startAnimatingNode(animationId,nodeTag,config,endCallback);},

stopAnimation:function stopAnimation(animationId){
assertNativeAnimatedModule();
NativeAnimatedModule.stopAnimation(animationId);},

setAnimatedNodeValue:function setAnimatedNodeValue(nodeTag,value){
assertNativeAnimatedModule();
NativeAnimatedModule.setAnimatedNodeValue(nodeTag,value);},

connectAnimatedNodeToView:function connectAnimatedNodeToView(nodeTag,viewTag){
assertNativeAnimatedModule();
NativeAnimatedModule.connectAnimatedNodeToView(nodeTag,viewTag);},

disconnectAnimatedNodeFromView:function disconnectAnimatedNodeFromView(nodeTag,viewTag){
assertNativeAnimatedModule();
NativeAnimatedModule.disconnectAnimatedNodeFromView(nodeTag,viewTag);},

dropAnimatedNode:function dropAnimatedNode(tag){
assertNativeAnimatedModule();
NativeAnimatedModule.dropAnimatedNode(tag);}};










var PROPS_WHITELIST={
style:{
opacity:true,


scaleX:true,
scaleY:true,
rotation:true,
translateX:true,
translateY:true}};



function validateProps(params){
for(var key in params){
if(!PROPS_WHITELIST.hasOwnProperty(key)){
throw new Error('Property \''+key+'\' is not supported by native animated module');}}}




function validateStyles(styles){
var STYLES_WHITELIST=PROPS_WHITELIST.style||{};
for(var key in styles){
if(!STYLES_WHITELIST.hasOwnProperty(key)){
throw new Error('Style property \''+key+'\' is not supported by native animated module');}}}




function validateInterpolation(config){
var SUPPORTED_INTERPOLATION_PARAMS={
inputRange:true,
outputRange:true};

for(var key in config){
if(!SUPPORTED_INTERPOLATION_PARAMS.hasOwnProperty(key)){
throw new Error('Interpolation property \''+key+'\' is not supported by native animated module');}}}




function generateNewNodeTag(){
return __nativeAnimatedNodeTagCount++;}


function generateNewAnimationId(){
return __nativeAnimationIdCount++;}


function assertNativeAnimatedModule(){
invariant(NativeAnimatedModule,'Native animated module is not available');}


module.exports={
API:API,
validateProps:validateProps,
validateStyles:validateStyles,
validateInterpolation:validateInterpolation,
generateNewNodeTag:generateNewNodeTag,
generateNewAnimationId:generateNewAnimationId,
assertNativeAnimatedModule:assertNativeAnimatedModule};
}, "NativeAnimatedHelper");
__d(416 /* fbjs/lib/requestAnimationFrame.js */, function(global, require, module, exports) {'use strict';











var emptyFunction=require(261 /* ./emptyFunction */);
var nativeRequestAnimationFrame=require(415 /* ./nativeRequestAnimationFrame */);

var lastTime=0;

var requestAnimationFrame=nativeRequestAnimationFrame||function(callback){
var currTime=Date.now();
var timeDelay=Math.max(0,16-(currTime-lastTime));
lastTime=currTime+timeDelay;
return global.setTimeout(function(){
callback(Date.now());},
timeDelay);};



requestAnimationFrame(emptyFunction);

module.exports=requestAnimationFrame;
}, "fbjs/lib/requestAnimationFrame.js");
__d(415 /* fbjs/lib/nativeRequestAnimationFrame.js */, function(global, require, module, exports) {"use strict";











var nativeRequestAnimationFrame=global.requestAnimationFrame||global.webkitRequestAnimationFrame||global.mozRequestAnimationFrame||global.oRequestAnimationFrame||global.msRequestAnimationFrame;

module.exports=nativeRequestAnimationFrame;
}, "fbjs/lib/nativeRequestAnimationFrame.js");
__d(250 /* TouchableOpacity */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/Touchable/TouchableOpacity.js';














var Animated=require(240 /* Animated */);
var NativeMethodsMixin=require(55 /* NativeMethodsMixin */);
var React=require(34 /* React */);
var TimerMixin=require(300 /* react-timer-mixin */);
var Touchable=require(142 /* Touchable */);
var TouchableWithoutFeedback=require(150 /* TouchableWithoutFeedback */);

var ensurePositiveDelayProps=require(151 /* ensurePositiveDelayProps */);
var flattenStyle=require(59 /* flattenStyle */);



var PRESS_RETENTION_OFFSET={top:20,left:20,right:20,bottom:30};






















var TouchableOpacity=React.createClass({displayName:'TouchableOpacity',
mixins:[TimerMixin,Touchable.Mixin,NativeMethodsMixin],

propTypes:babelHelpers.extends({},
TouchableWithoutFeedback.propTypes,{




activeOpacity:React.PropTypes.number}),


getDefaultProps:function getDefaultProps(){
return {
activeOpacity:0.2};},



getInitialState:function getInitialState(){
return babelHelpers.extends({},
this.touchableGetInitialState(),{
anim:new Animated.Value(1)});},



componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);},


componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);},





setOpacityTo:function setOpacityTo(value){
Animated.timing(
this.state.anim,
{toValue:value,duration:150}).
start();},






touchableHandleActivePressIn:function touchableHandleActivePressIn(e){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
this._opacityActive();
this.props.onPressIn&&this.props.onPressIn(e);},


touchableHandleActivePressOut:function touchableHandleActivePressOut(e){
if(!this._hideTimeout){
this._opacityInactive();}

this.props.onPressOut&&this.props.onPressOut(e);},


touchableHandlePress:function touchableHandlePress(e){
this.clearTimeout(this._hideTimeout);
this._opacityActive();
this._hideTimeout=this.setTimeout(
this._opacityInactive,
this.props.delayPressOut||100);

this.props.onPress&&this.props.onPress(e);},


touchableHandleLongPress:function touchableHandleLongPress(e){
this.props.onLongPress&&this.props.onLongPress(e);},


touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset||PRESS_RETENTION_OFFSET;},


touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;},


touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn||0;},


touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress===0?0:
this.props.delayLongPress||500;},


touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;},


_opacityActive:function _opacityActive(){
this.setOpacityTo(this.props.activeOpacity);},


_opacityInactive:function _opacityInactive(){
this.clearTimeout(this._hideTimeout);
this._hideTimeout=null;
var childStyle=flattenStyle(this.props.style)||{};
this.setOpacityTo(
childStyle.opacity===undefined?1:childStyle.opacity);},



render:function render(){
return (
React.createElement(Animated.View,{
accessible:true,
accessibilityLabel:this.props.accessibilityLabel,
accessibilityComponentType:this.props.accessibilityComponentType,
accessibilityTraits:this.props.accessibilityTraits,
style:[this.props.style,{opacity:this.state.anim}],
testID:this.props.testID,
onLayout:this.props.onLayout,
hitSlop:this.props.hitSlop,
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,__source:{fileName:_jsxFileName,lineNumber:162}},
this.props.children,
Touchable.renderDebugView({color:'cyan',hitSlop:this.props.hitSlop})));}});





module.exports=TouchableOpacity;
}, "TouchableOpacity");
__d(251 /* WebView */, function(global, require, module, exports) {'use strict';var _jsxFileName='/home/ubuntu/react-native/Libraries/Components/WebView/WebView.android.js';











var EdgeInsetsPropType=require(82 /* EdgeInsetsPropType */);
var ProgressBarAndroid=require(54 /* ProgressBarAndroid */);
var React=require(34 /* React */);
var ReactNative=require(157 /* ReactNative */);
var ReactNativeViewAttributes=require(64 /* ReactNativeViewAttributes */);
var StyleSheet=require(90 /* StyleSheet */);
var UIManager=require(61 /* UIManager */);
var View=require(81 /* View */);

var deprecatedPropType=require(73 /* deprecatedPropType */);
var keyMirror=require(256 /* fbjs/lib/keyMirror */);
var merge=require(84 /* merge */);
var requireNativeComponent=require(88 /* requireNativeComponent */);
var resolveAssetSource=require(129 /* resolveAssetSource */);

var PropTypes=React.PropTypes;

var RCT_WEBVIEW_REF='webview';

var WebViewState=keyMirror({
IDLE:null,
LOADING:null,
ERROR:null});


var defaultRenderLoading=function defaultRenderLoading(){return (
React.createElement(View,{style:styles.loadingView,__source:{fileName:_jsxFileName,lineNumber:39}},
React.createElement(ProgressBarAndroid,{
style:styles.loadingProgressBar,
styleAttr:'Inverse',__source:{fileName:_jsxFileName,lineNumber:40}})));};







var WebView=React.createClass({displayName:'WebView',

propTypes:babelHelpers.extends({},
View.propTypes,{
renderError:PropTypes.func,
renderLoading:PropTypes.func,
onLoad:PropTypes.func,
onLoadEnd:PropTypes.func,
onLoadStart:PropTypes.func,
onError:PropTypes.func,
automaticallyAdjustContentInsets:PropTypes.bool,
contentInset:EdgeInsetsPropType,
onNavigationStateChange:PropTypes.func,
startInLoadingState:PropTypes.bool,
style:View.propTypes.style,

html:deprecatedPropType(
PropTypes.string,
'Use the `source` prop instead.'),


url:deprecatedPropType(
PropTypes.string,
'Use the `source` prop instead.'),





source:PropTypes.oneOfType([
PropTypes.shape({



uri:PropTypes.string,




method:PropTypes.oneOf(['GET','POST']),




headers:PropTypes.object,






body:PropTypes.string}),

PropTypes.shape({



html:PropTypes.string,



baseUrl:PropTypes.string}),




PropTypes.number]),






javaScriptEnabled:PropTypes.bool,





domStorageEnabled:PropTypes.bool,




injectedJavaScript:PropTypes.string,




scalesPageToFit:PropTypes.bool,





userAgent:PropTypes.string,




testID:PropTypes.string,





mediaPlaybackRequiresUserAction:PropTypes.bool}),


getInitialState:function getInitialState(){
return {
viewState:WebViewState.IDLE,
lastErrorEvent:null,
startInLoadingState:true};},



getDefaultProps:function getDefaultProps(){
return {
javaScriptEnabled:true,
scalesPageToFit:true};},



componentWillMount:function componentWillMount(){
if(this.props.startInLoadingState){
this.setState({viewState:WebViewState.LOADING});}},



render:function render(){
var otherView=null;

if(this.state.viewState===WebViewState.LOADING){
otherView=(this.props.renderLoading||defaultRenderLoading)();}else 
if(this.state.viewState===WebViewState.ERROR){
var errorEvent=this.state.lastErrorEvent;
otherView=this.props.renderError&&this.props.renderError(
errorEvent.domain,
errorEvent.code,
errorEvent.description);}else 
if(this.state.viewState!==WebViewState.IDLE){
console.error('RCTWebView invalid state encountered: '+this.state.loading);}


var webViewStyles=[styles.container,this.props.style];
if(this.state.viewState===WebViewState.LOADING||
this.state.viewState===WebViewState.ERROR){

webViewStyles.push(styles.hidden);}


var source=this.props.source||{};
if(this.props.html){
source.html=this.props.html;}else 
if(this.props.url){
source.uri=this.props.url;}


if(source.method==='POST'&&source.headers){
console.warn('WebView: `source.headers` is not supported when using POST.');}else 
if(source.method==='GET'&&source.body){
console.warn('WebView: `source.body` is not supported when using GET.');}


var webView=
React.createElement(RCTWebView,{
ref:RCT_WEBVIEW_REF,
key:'webViewKey',
style:webViewStyles,
source:resolveAssetSource(source),
scalesPageToFit:this.props.scalesPageToFit,
injectedJavaScript:this.props.injectedJavaScript,
userAgent:this.props.userAgent,
javaScriptEnabled:this.props.javaScriptEnabled,
domStorageEnabled:this.props.domStorageEnabled,
contentInset:this.props.contentInset,
automaticallyAdjustContentInsets:this.props.automaticallyAdjustContentInsets,
onLoadingStart:this.onLoadingStart,
onLoadingFinish:this.onLoadingFinish,
onLoadingError:this.onLoadingError,
testID:this.props.testID,
mediaPlaybackRequiresUserAction:this.props.mediaPlaybackRequiresUserAction,__source:{fileName:_jsxFileName,lineNumber:216}});


return (
React.createElement(View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:236}},
webView,
otherView));},




goForward:function goForward(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.goForward,
null);},



goBack:function goBack(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.goBack,
null);},



reload:function reload(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.reload,
null);},



stopLoading:function stopLoading(){
UIManager.dispatchViewManagerCommand(
this.getWebViewHandle(),
UIManager.RCTWebView.Commands.stopLoading,
null);},







updateNavigationState:function updateNavigationState(event){
if(this.props.onNavigationStateChange){
this.props.onNavigationStateChange(event.nativeEvent);}},



getWebViewHandle:function getWebViewHandle(){
return ReactNative.findNodeHandle(this.refs[RCT_WEBVIEW_REF]);},


onLoadingStart:function onLoadingStart(event){
var onLoadStart=this.props.onLoadStart;
onLoadStart&&onLoadStart(event);
this.updateNavigationState(event);},


onLoadingError:function onLoadingError(event){
event.persist();var _props=
this.props;var onError=_props.onError;var onLoadEnd=_props.onLoadEnd;
onError&&onError(event);
onLoadEnd&&onLoadEnd(event);
console.error('Encountered an error loading page',event.nativeEvent);

this.setState({
lastErrorEvent:event.nativeEvent,
viewState:WebViewState.ERROR});},



onLoadingFinish:function onLoadingFinish(event){var _props2=
this.props;var onLoad=_props2.onLoad;var onLoadEnd=_props2.onLoadEnd;
onLoad&&onLoad(event);
onLoadEnd&&onLoadEnd(event);
this.setState({
viewState:WebViewState.IDLE});

this.updateNavigationState(event);}});



var RCTWebView=requireNativeComponent('RCTWebView',WebView);

var styles=StyleSheet.create({
container:{
flex:1},

hidden:{
height:0,
flex:0},

loadingView:{
flex:1,
justifyContent:'center',
alignItems:'center'},

loadingProgressBar:{
height:20}});



module.exports=WebView;
}, "WebView");
;require(159);
;require(0);/*utf8:522f92ba2241e37c61dfec156faf06cababcdee5*/