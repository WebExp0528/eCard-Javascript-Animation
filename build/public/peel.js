!function(t){var e,i,n,o,r,s=["webkit","moz",""],a=document.documentElement,h=a.style;function p(t){for(var e,i,n=0;n<s.length;n++)if((i=(e=s[n])?e+f(t):t)in h)return i}function c(t){return Math.round(100*t)/100}function u(t){return Math.max(0,Math.min(1,t))}function l(t,e,i){return(t-e)/(i-e)}function f(t){return t.slice(0,1).toUpperCase()+t.slice(1)}function d(t){return"peel-"+t}function g(t,e){t.style[i]=e}function y(t,e,i,n,o){return c(t)+"px "+c(e)+"px "+c(i)+"px "+(n?c(n)+"px ":"")+"rgba(0,0,0,"+c(o)+")"}function w(t,e){t.style.opacity=e}function b(t,e,i){var n;r&&(n=0===i.length?"none":"linear-gradient("+c(e)+"deg,"+i.join(",")+")",t.style.backgroundImage=n)}function S(t,e,i){t.addEventListener(e,i)}function O(t,e,i){t.removeEventListener(e,i)}function v(t,e){var i=t.changedTouches?t.changedTouches[0]:t;return{x:i.clientX-e.offsetLeft+window.scrollX,y:i.clientY-e.offsetTop+window.scrollY}}function P(t,e){return L(0,0,0,t,e)}function m(t,e){return L(255,255,255,t,e)}function L(t,e,i,n,o){return"rgba("+t+","+e+","+i+","+(n=c(u(n)))+") "+c(100*o)+"%"}function C(t,e){return"string"==typeof t&&(t=(e||document).querySelector(t)),t}function x(t,e){t.classList.add(e)}function T(t,e,i){e=e||a;var n=document.createElementNS("http://www.w3.org/2000/svg",t);for(var o in e.appendChild(n),i)i.hasOwnProperty(o)&&E(n,o,i[o]);return n}function E(t,e,i){t.setAttributeNS(null,e,i)}function k(t,e){this.setOptions(e),this.el=C(t,a),this.constraints=[],this.events=[],this.setupLayers(),this.setupDimensions(),this.setCorner(this.getOption("corner")),this.setMode(this.getOption("mode")),this.init()}function R(t,e){this.el=t,this.shape=R.createClipPath(t,e||{type:"polygon"}),g(this.el,"translate(0px,0px)")}function A(t,e){this.center=t,this.radius=e}function D(){this.points=[]}function B(t,e,i,n){this.p1=t,this.c1=e,this.p2=n,this.c2=i}function I(t,e){this.p1=t,this.p2=e}function M(t,e){this.x=t,this.y=e}k.Corners={TOP_LEFT:0,TOP_RIGHT:1,BOTTOM_LEFT:2,BOTTOM_RIGHT:3},k.Defaults={topShadow:!0,topShadowBlur:5,topShadowAlpha:.5,topShadowOffsetX:0,topShadowOffsetY:1,topShadowCreatesShape:!0,backReflection:!1,backReflectionSize:.02,backReflectionOffset:0,backReflectionAlpha:.15,backReflectionDistribute:!0,backShadow:!0,backShadowSize:.04,backShadowOffset:0,backShadowAlpha:.1,backShadowDistribute:!0,bottomShadow:!0,bottomShadowSize:1.5,bottomShadowOffset:0,bottomShadowDarkAlpha:.7,bottomShadowLightAlpha:.1,bottomShadowDistribute:!0,setPeelOnInit:!0,clippingBoxScale:4,flipConstraintOffset:5,dragPreventsDefault:!0},k.prototype.setCorner=function(){var t=arguments;void 0===t[0]?t=[k.Corners.BOTTOM_RIGHT]:t[0].length&&(t=t[0]),this.corner=this.getPointOrCorner(t)},k.prototype.setMode=function(t){"book"===t?(this.addPeelConstraint(k.Corners.BOTTOM_LEFT),this.addPeelConstraint(k.Corners.TOP_LEFT),this.setOption("backReflection",!1),this.setOption("backShadowDistribute",!1),this.setOption("bottomShadowDistribute",!1)):"calendar"===t&&(this.addPeelConstraint(k.Corners.TOP_RIGHT),this.addPeelConstraint(k.Corners.TOP_LEFT))},k.prototype.setPeelPath=function(t,e){var i,n,o,r,s=arguments;i=new M(t,e),4===s.length?(n=new M(s[2],s[3]),this.path=new I(i,n)):8===s.length&&(o=new M(s[2],s[3]),r=new M(s[4],s[5]),n=new M(s[6],s[7]),this.path=new B(i,o,r,n))},k.prototype.handleDrag=function(t,e){this.dragHandler=t,this.setupDragEvents(e)},k.prototype.handlePress=function(t,e){this.pressHandler=t,this.setupDragEvents(e)},k.prototype.setupDragEvents=function(t){var e,i,n,o=this;function r(t,r){o.getOption("dragPreventsDefault")&&r.preventDefault(),n=t?"touchend":"mouseup",S(a,i=t?"touchmove":"mousemove",s),S(a,n,h),e=!1}function s(t){o.dragHandler&&p(o.dragHandler,t),e=!0}function h(t){!e&&o.pressHandler&&p(o.pressHandler,t),O(a,i,s),O(a,n,h)}function p(t,e){var i=v(e,o.el);t.call(o,e,i.x,i.y)}this.dragEventsSetup||(t=t||this.el,this.addEvent(t,"mousedown",r.bind(this,!1)),this.addEvent(t,"touchstart",r.bind(this,!0)),this.dragEventsSetup=!0)},k.prototype.removeEvents=function(){this.events.forEach((function(t,e){O(t.el,t.type,t.handler)})),this.events=[]},k.prototype.setTimeAlongPath=function(t){t=u(t);var e=this.path.getPointForTime(t);this.timeAlongPath=t,this.setPeelPosition(e.x,e.y)},k.prototype.setFadeThreshold=function(t){this.fadeThreshold=t},k.prototype.setPeelPosition=function(){var t=this.getPointOrCorner(arguments);(t=this.getConstrainedPeelPosition(t))&&(this.peelLineSegment=this.getPeelLineSegment(t),this.peelLineRotation=this.peelLineSegment.getAngle(),this.setClipping(),this.setBackTransform(t),this.setEffects())},k.prototype.addPeelConstraint=function(){var t=this.getPointOrCorner(arguments),e=this.corner.subtract(t).getLength();this.constraints.push(new A(t,e)),this.calculateFlipConstraint()},k.prototype.setOption=function(t,e){this.options[t]=e},k.prototype.getOption=function(t){return this.options[(e=t,e.replace(/-(\w)/g,(function(t,e){return e.toUpperCase()})))];var e},k.prototype.getAmountClipped=function(){return l(this.getTopClipArea(),this.width*this.height,0)},k.prototype.addEvent=function(t,e,i){return S(t,e,i),this.events.push({el:t,type:e,handler:i}),i},k.prototype.getTopClipArea=function(){var t=new D;return this.elementBox.forEach((function(e){this.distributeLineByPeelLine(e,t)}),this),D.getArea(t.getPoints())},k.prototype.calculateFlipConstraint=function(){var t=this.corner,e=this.constraints.concat();this.flipConstraint=e.sort((function(e,i){return t.y,e.center.y,t.y,i.center.y,e-i}))[0]},k.prototype.dragStart=function(t,e,i){},k.prototype.fireHandler=function(t,e){var i=v(t,this.el);e.call(this,t,i.x,i.y)},k.prototype.setClipping=function(){var t=new D,e=new D;this.clippingBox.forEach((function(i){this.distributeLineByPeelLine(i,t,e)}),this),this.topClip.setPoints(t.getPoints()),this.backClip.setPoints(e.getPoints())},k.prototype.distributeLineByPeelLine=function(t,e,i){var n=this.peelLineSegment.getIntersectPoint(t);this.distributePointByPeelLine(t.p1,e,i),this.distributePointByPeelLine(n,e,i)},k.prototype.distributePointByPeelLine=function(t,e,i){if(t){var n=this.peelLineSegment.getPointDeterminant(t);n<=0&&e.addPoint(t),n>=0&&i&&i.addPoint(this.flipPointHorizontally(t))}},k.prototype.setOptions=function(t){var e=t||{},i=k.Defaults;for(var n in i)i.hasOwnProperty(n)&&!(n in e)&&(e[n]=i[n]);this.options=e},k.prototype.findOrCreateLayer=function(t,e,i){var n=t+"-element",o=d(t),r=C(this.getOption(n)||"."+o,e);return r||(r=function(t,e){var i=document.createElement("div");return x(i,e),t.appendChild(i),i}(e,o)),x(r,d("layer")),function(t,e){t.style.zIndex=e}(r,i),r},k.prototype.getPointOrCorner=function(t){return 2===t.length?new M(t[0],t[1]):"number"==typeof t[0]?this.getCornerPoint(t[0]):t[0]},k.prototype.getCornerPoint=function(t){return new M(+!!(1&t)*this.width,+!!(2&t)*this.height)},k.prototype.getOptionalShape=function(){var t;return["rect","polygon","path","circle"].some((function(e){var i,n=this.getOption(e);return n&&((i={}).attributes=n,i.type=e,t=i),t}),this),t},k.prototype.setupLayers=function(){var t=this.getOptionalShape(),e=this.topLayer=this.findOrCreateLayer("top",this.el,2),i=this.backLayer=this.findOrCreateLayer("back",this.el,3);this.bottomLayer=this.findOrCreateLayer("bottom",this.el,1),t?(this.topLayer=this.wrapShapeLayer(this.topLayer,"top-outer-clip"),this.backLayer=this.wrapShapeLayer(this.backLayer,"back-outer-clip"),this.topShapeClip=new R(e,t),this.backShapeClip=new R(i,t),this.bottomShapeClip=new R(this.bottomLayer,t),this.getOption("topShadowCreatesShape")&&(this.topShadowElement=this.setupDropShadow(t,e))):this.topShadowElement=this.findOrCreateLayer("top-shadow",e,1),this.topClip=new R(this.topLayer),this.backClip=new R(this.backLayer),this.backShadowElement=this.findOrCreateLayer("back-shadow",i,1),this.backReflectionElement=this.findOrCreateLayer("back-reflection",i,2),this.bottomShadowElement=this.findOrCreateLayer("bottom-shadow",this.bottomLayer,1),this.usesBoxShadow=!t},k.prototype.setupDropShadow=function(t,e){var i=T("svg",e,{class:d("layer")});return T(t.type,i,t.attributes),i},k.prototype.wrapShapeLayer=function(t,e){var i=function(t){return t.style.zIndex}(t);x(t,d("shape-layer"));var n=this.findOrCreateLayer(e,this.el,i);return n.appendChild(t),n},k.prototype.setupDimensions=function(){this.width=this.el.offsetWidth,this.height=this.el.offsetHeight,this.center=new M(this.width/2,this.height/2),this.elementBox=this.getScaledBox(1),this.clippingBox=this.getScaledBox(this.getOption("clippingBoxScale"))},k.prototype.getScaledBox=function(t){var e=t,i=t-1,n=new M(-this.width*i,-this.height*i),o=new M(this.width*e,-this.height*i),r=new M(this.width*e,this.height*e),s=new M(-this.width*i,this.height*e);return[new I(n,o),new I(o,r),new I(r,s),new I(s,n)]},k.prototype.getConstrainedPeelPosition=function(t){return this.constraints.forEach((function(e){var i=this.getFlipConstraintOffset(e,t);i&&(e=new A(e.center,e.radius-i)),t=e.constrainPoint(t)}),this),t},k.prototype.getFlipConstraintOffset=function(t,e){var i=this.getOption("flipConstraintOffset");if(t===this.flipConstraint&&i){var n=this.corner.subtract(this.center),o=this.corner.subtract(t.center),r=o.getAngle(),s=(o.rotate(-r),e.subtract(t.center).rotate(-r));if(n.x*n.y<0&&(s.y*=-1),s.x>0&&s.y>0)return l(s.getAngle(),45,0)*i}},k.prototype.getPeelLineSegment=function(t){var e=this.corner.subtract(t).scale(.5),i=t.add(e);0===e.x&&0===e.y&&(e=t.subtract(this.center));var n=e.getLength(),o=Math.max(this.width,this.height)/n*10,r=e.rotate(-90).scale(o);return new I(i.add(r),i.subtract(r))},k.prototype.setBackTransform=function(t){var e=this.flipPointHorizontally(this.corner),i=2*(this.peelLineRotation-90),n=t.subtract(e.rotate(i)),o="translate("+c(n.x)+"px, "+c(n.y)+"px) rotate("+c(i)+"deg)";g(this.backLayer,o),g(this.topShadowElement,o)},k.prototype.getPeelLineDistance=function(){var t,e,i,n;this.peelLineRotation<90?(t=k.Corners.TOP_RIGHT,e=k.Corners.BOTTOM_LEFT):this.peelLineRotation<180?(t=k.Corners.BOTTOM_RIGHT,e=k.Corners.TOP_LEFT):this.peelLineRotation<270?(t=k.Corners.BOTTOM_LEFT,e=k.Corners.TOP_RIGHT):this.peelLineRotation<360&&(t=k.Corners.TOP_LEFT,e=k.Corners.BOTTOM_RIGHT);var o=new I(i=this.getCornerPoint(t),n=this.getCornerPoint(e)).scale(2),r=this.peelLineSegment.getIntersectPoint(o);return r?i.subtract(r).getLength()/i.subtract(n).getLength():2},k.prototype.setEffects=function(){var t=this.getPeelLineDistance();this.setTopShadow(t),this.setBackShadow(t),this.setBackReflection(t),this.setBottomShadow(t),this.setFade()},k.prototype.setTopShadow=function(t){if(this.getOption("topShadow")){var e,i,r,s,a=this.getOption("topShadowBlur"),h=this.getOption("topShadowOffsetX"),p=this.getOption("topShadowOffsetY"),c=this.getOption("topShadowAlpha"),u=this.exponential(t,5,c);this.usesBoxShadow?(e=h,i=p,r=a,0,s=u,this.topShadowElement.style[n]=y(e,i,r,0,s)):function(t,e,i,n,r){t.style[o]="drop-shadow("+y(e,i,n,null,r)+")"}(this.topShadowElement,h,p,a,u)}},k.prototype.distributeOrLinear=function(t,e,i){return e?function(t,e){return 2*(e||1)*(.5-Math.abs(t-.5))}(t,i):t*i},k.prototype.exponential=function(t,e,i){return i*u(Math.pow(1+t,e)-1)},k.prototype.setBackReflection=function(t){var e=[];if(this.canSetLinearEffect("backReflection",t)){var i=this.getOption("backReflectionDistribute"),n=this.getOption("backReflectionSize"),o=this.getOption("backReflectionOffset"),r=this.getOption("backReflectionAlpha"),s=this.distributeOrLinear(t,i,n),a=t-o,h=a-s,p=h-s;e.push(m(0,0)),e.push(m(0,p)),e.push(m(r,h)),e.push(m(0,a))}b(this.backReflectionElement,180-this.peelLineRotation,e)},k.prototype.setBackShadow=function(t){var e=[];if(this.canSetLinearEffect("backShadow",t)){var i=this.getOption("backShadowSize"),n=this.getOption("backShadowOffset"),o=this.getOption("backShadowAlpha"),r=this.getOption("backShadowDistribute"),s=this.distributeOrLinear(t,r,i),a=t-n,h=a-s,p=h-s;e.push(P(0,0)),e.push(P(0,p)),e.push(P(o,h)),e.push(P(o,a))}b(this.backShadowElement,180-this.peelLineRotation,e)},k.prototype.setBottomShadow=function(t){var e=[];if(this.canSetLinearEffect("bottomShadow",t)){var i=this.getOption("bottomShadowSize"),n=this.getOption("bottomShadowOffset"),o=this.getOption("bottomShadowDarkAlpha"),r=this.getOption("bottomShadowLightAlpha"),s=this.getOption("bottomShadowDistribute"),a=t-(.025-n),h=a-this.distributeOrLinear(t,s,.03)*i-n,p=h-(.02*i-n);e=[P(0,0),P(0,p),P(r,h),P(r,a),P(o,t)]}b(this.bottomShadowElement,this.peelLineRotation+180,e)},k.prototype.canSetLinearEffect=function(t,e){return this.getOption(t)&&e>0},k.prototype.setFade=function(){var t,e=this.fadeThreshold,i=1;e&&((t=void 0!==this.timeAlongPath?this.timeAlongPath:this.getAmountClipped())>e&&(i=(1-t)/(1-e)),w(this.topLayer,i),w(this.backLayer,i),w(this.bottomShadowElement,i))},k.prototype.flipPointHorizontally=function(t){return new M(t.x-2*(t.x-this.center.x),t.y)},k.prototype.init=function(){this.getOption("setPeelOnInit")&&this.setPeelPosition(this.corner),x(this.el,d("ready"))},R.getDefs=function(){return this.defs||(this.svg=T("svg",null,{class:d("svg-clip-element")}),this.defs=T("defs",this.svg)),this.defs},R.createClipPath=function(t,i){var n=R.getId(),o=T("clipPath",this.getDefs()),r=T(i.type,o,i.attributes);return E(o,"id",n),function(t,i){t.style[e]=i}(t,"url(#"+n+")"),r},R.getId=function(){return R.id||(R.id=1),"svg-clip-"+R.id++},R.prototype.setPoints=function(t){var e=t.map((function(t){return c(t.x)+","+c(t.y)})).join(" ");E(this.shape,"points",e)},A.prototype.containsPoint=function(t){if(this.boundingRectContainsPoint(t)){var e=this.center.x-t.x,i=this.center.y-t.y;return(e*=e)+(i*=i)<=this.radius*this.radius}return!1},A.prototype.boundingRectContainsPoint=function(t){return t.x>=this.center.x-this.radius&&t.x<=this.center.x+this.radius&&t.y>=this.center.y-this.radius&&t.y<=this.center.y+this.radius},A.prototype.constrainPoint=function(t){if(!this.containsPoint(t)){var e=t.subtract(this.center).getAngle();t=this.center.add(new M(this.radius,0).rotate(e))}return t},D.getArea=function(t){var e=0,i=0;return t.forEach((function(t,n,o){var r=o[(n+1)%o.length];e+=t.x*r.y,i+=t.y*r.x})),(e-i)/2},D.prototype.addPoint=function(t){this.points.push(t)},D.prototype.getPoints=function(){return this.points},B.prototype.getPointForTime=function(t){var e=Math.pow(1-t,3),i=3*t*Math.pow(1-t,2),n=3*Math.pow(t,2)*(1-t),o=Math.pow(t,3);return new M(e*this.p1.x+i*this.c1.x+n*this.c2.x+o*this.p2.x,e*this.p1.y+i*this.c1.y+n*this.c2.y+o*this.p2.y)},I.EPSILON=1e-6,I.prototype.getPointForTime=function(t){return this.p1.add(this.getVector().scale(t))},I.prototype.scale=function(t){return new I(this.p1.add(this.p2.subtract(this.p1).scale(t)),this.p2.add(this.p1.subtract(this.p2).scale(t)))},I.prototype.getPointDeterminant=function(t){var e=(t.x-this.p1.x)*(this.p2.y-this.p1.y)-(t.y-this.p1.y)*(this.p2.x-this.p1.x);return e>-I.EPSILON&&e<I.EPSILON&&(e=0),e},I.prototype.getIntersectPoint=function(t){var e=this;function i(t,e){return t.x*e.y-t.y*e.x}var n=e.p2.subtract(e.p1),o=t.p2.subtract(t.p1),r=i(t.p1.subtract(e.p1),n),s=i(n,o);if(0==s)return null;var a=r/s,h=i(t.p1.subtract(e.p1),o)/s;return h>=0&&h<=1&&a>=0&&a<=1?e.p1.add(n.scale(h)):null},I.prototype.getAngle=function(){return this.getVector().getAngle()},I.prototype.getVector=function(){return this.vector||(this.vector=this.p2.subtract(this.p1)),this.vector},M.DEGREES_IN_RADIANS=180/Math.PI,M.degToRad=function(t){return t/M.DEGREES_IN_RADIANS},M.radToDeg=function(t){for(var e=t*M.DEGREES_IN_RADIANS;e<0;)e+=360;return e},M.vector=function(t,e){var i=M.degToRad(t);return new M(Math.cos(i)*e,Math.sin(i)*e)},M.prototype.add=function(t){return new M(this.x+t.x,this.y+t.y)},M.prototype.subtract=function(t){return new M(this.x-t.x,this.y-t.y)},M.prototype.scale=function(t){return new M(this.x*t,this.y*t)},M.prototype.getLength=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},M.prototype.getAngle=function(){return M.radToDeg(Math.atan2(this.y,this.x))},M.prototype.setAngle=function(t){return M.vector(t,this.getLength())},M.prototype.rotate=function(t){return this.setAngle(this.getAngle()+t)},e=p("clipPath"),i=p("transform"),n=p("boxShadow"),o=p("filter"),function(){var t=document.createElement("div").style;t.cssText="background:linear-gradient(45deg,#9f9,white);",r=(t.backgroundImage||"").indexOf("gradient")>-1}(),k.supported=!(!e||!i),k.effectsSupported=r,t.Peel=k}(window);