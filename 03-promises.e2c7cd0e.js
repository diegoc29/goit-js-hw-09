var o,e;(o=2,e=1500,new Promise(((i,s)=>{setTimeout((()=>{Math.random()>.3?i({position:o,delay:e}):s({position:o,delay:e})}),e)}))).then((({position:o,delay:e})=>{console.log("✅ Fulfilled promise ${position} in ${delay}ms")})).catch((({position:o,delay:e})=>{console.log("❌ Rejected promise ${position} in ${delay}ms")}));
//# sourceMappingURL=03-promises.e2c7cd0e.js.map
