(this.webpackJsonptasknik=this.webpackJsonptasknik||[]).push([[0],[,,,,,,function(e){e.exports=JSON.parse('{"name":"tasknik","version":"0.4.0","private":true,"homepage":"http://mikbox74.github.io/tasknik","dependencies":{"@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.4.0","@testing-library/user-event":"^7.2.1","gh-pages":"^2.2.0","prop-types":"^15.7.2","react":"^16.12.0","react-dom":"^16.12.0","react-feather":"^2.0.9"},"devDependencies":{"react-scripts":"3.3.0","react-dev-utils":"10.0.0","node-sass":"4.14.1"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","predeploy":"npm run build","deploy":"gh-pages -d build"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},,function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(5),c=n.n(r),i=(n(13),n(3)),l=n(2),u=(n(14),o.a.createContext()),s=function(e){var t=function(e,t){return(e+"").padStart(t,"0")},n=parseFloat(e).toFixed(3),a=Math.floor(n/60/60),o=Math.floor(n/60)%60,r=Math.floor(n-60*o);return t(a,2)+":"+t(o,2)+":"+("000"+r).slice(-1*2)},d=n(19),m=n(20),p=n(21),f=n(22),g={li:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".5rem",padding:".5rem",boxShadow:"1px 1px 4px 0px rgba(0,0,0,.5)"}};var v=function(e){var t=e.project,n=e.todo,a=(e.index,e.currentId),r=o.a.useContext(u),c=r.removeTodo,i=r.toggleTodo,l=r.toggleGo,v=r.toggleCheck,b=["todoTitle"];return n.completed&&b.push("done"),n.id===a&&b.push("go"),o.a.createElement("li",{style:g.li},o.a.createElement("span",{className:b.join(" ")},o.a.createElement("input",{type:"checkbox",onChange:v.bind(null,n.id)}),o.a.createElement("span",{className:"action goAction",onClick:l.bind(null,n.id)},n.id===a?o.a.createElement(d.a,{size:16,color:"red","stroke-width":"2"}):o.a.createElement(m.a,{size:16,color:"blue","stroke-width":"2"})),o.a.createElement("span",{className:"action doneAction",onClick:i.bind(null,n.id)},o.a.createElement(p.a,{size:16,color:"green","stroke-width":"2"})),o.a.createElement("span",{className:"text duration"},s(n.duration)),o.a.createElement("span",{className:"text title"},o.a.createElement("strong",null,t.title,":"),"\xa0",n.title),o.a.createElement("span",{className:"text money"},Math.round(n.money))),o.a.createElement("button",{className:"action removeAction",onClick:c.bind(null,n.id)},o.a.createElement(f.a,{size:16,color:"red","stroke-width":"2"})))},b={ul:{listStyle:"none",textAlign:"left",margin:0,padding:0,width:"100%"}};var h=function(e){return o.a.createElement("div",null,o.a.createElement("h3",null,e.title),o.a.createElement("ul",{style:b.ul},e.todos.map((function(t,n){var a=e.projects.find((function(e){return e.id===t.projectId}));return o.a.createElement(v,{currentId:e.currentId,project:a,todo:t,key:t.id,index:n})}))))},E={form:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".5rem",padding:".5rem",boxShadow:"1px 1px 4px 0px rgba(0,0,0,.5)"},input:{paddingLeft:"1rem",flexGrow:1,border:0,height:"1.5rem"},button:{cursor:"pointer",background:"#00FFA9",color:"#fff",border:0,height:"1.5rem"}};var j=function(e){var t=o.a.useContext(u).addTodo,n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=o.a.useState(e),n=Object(l.a)(t,2),a=n[0],r=n[1];return{bind:{value:a,onChange:function(e){return r(e.target.value)}},clear:function(){return r("")},title:function(){return a}}}(""),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=o.a.useState(e),n=Object(l.a)(t,2),a=n[0],r=n[1];return{onChange:function(e){return r(e.target.value)},clear:function(){return r("")},projectId:a}}("");return o.a.createElement("form",{style:E.form,onSubmit:function(e){e.preventDefault(),n.title().trim()&&a.projectId?(console.log("projectId: "+a.projectId),t(n.title(),a.projectId),n.clear(),a.clear()):alert("\u041d\u0443\u0436\u043d\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0438 \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442")}},o.a.createElement("div",null,"\u0417\u0430\u0434\u0430\u0447\u0443"),o.a.createElement("input",Object.assign({placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",style:E.input},n.bind)),o.a.createElement("select",{style:E.input,value:a.projectId,onChange:a.onChange},o.a.createElement("option",{value:""},"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0440\u043e\u0435\u043a\u0442..."),e.projects.map((function(e,t){return o.a.createElement("option",{key:e.id,value:e.id},e.title,": ",e.tariff)}))),o.a.createElement("button",{style:E.button,type:"submit"},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443"))},S={form:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:".5rem",padding:".5rem",boxShadow:"1px 1px 4px 0px rgba(0,0,0,.5)"},input:{paddingLeft:"1rem",flexGrow:1,border:0,height:"1.5rem"},button:{cursor:"pointer",background:"#293685",color:"#fff",border:0,height:"1.5rem"}};function y(){var e=o.a.useContext(u).addProject,t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=o.a.useState(e),n=Object(l.a)(t,2),a=n[0],r=n[1];return{bind:{value:a,onChange:function(e){return r(e.target.value)}},clear:function(){return r("")},title:function(){return a}}}(""),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=o.a.useState(e),n=Object(l.a)(t,2),a=n[0],r=n[1];return{bind:{value:a,onChange:function(e){return r(e.target.value)}},clear:function(){return r("")},tariff:function(){return a}}}("");return o.a.createElement("form",{style:S.form,onSubmit:function(a){a.preventDefault(),t.title().trim()?(e(t.title(),n.tariff()),t.clear(),n.clear()):alert("\u041d\u0443\u0436\u043d\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435")}},o.a.createElement("div",null,"\u041f\u0440\u043e\u0435\u043a\u0442"),o.a.createElement("input",Object.assign({placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430",style:S.input},t.bind)),o.a.createElement("input",Object.assign({placeholder:"\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0447\u0430\u0441\u0430",style:S.input},n.bind)),o.a.createElement("button",{style:S.button,type:"submit"},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442"))}var k=function(e){var t=document.querySelector('link[rel="shortcut icon"]')||document.querySelector('link[rel="icon"]');t||((t=document.createElement("link")).id="favicon",t.rel="shortcut icon",document.head.appendChild(t)),t.href=e};n(17);var x=function(e){var t=o.a.useContext(u).setIsModalOpen,n=e.projects.map((function(t){var n=e.todos.map((function(e){return e.projectId===t.id?e.tmpDuration:0})).reduce((function(e,t){return e+t}),0);return{id:t.id,title:t.title,tmpDuration:n}}));return o.a.createElement(o.a.Fragment,null,e.isOpen&&o.a.createElement("div",{className:"modal"},o.a.createElement("div",{className:"modal-body"},o.a.createElement("h2",null,"\u041f\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c"),n.map((function(e){if(e.tmpDuration)return o.a.createElement("p",{key:e.id},e.title,": ",s(e.tmpDuration))})),o.a.createElement("button",{onClick:function(){return t(!1)}},"\xd7"))))},I=n(6),w=n(23),O={buttons:{padding:0,marginLeft:"auto",alignItems:"center"},button:{cursor:"pointer",background:"#e91615",color:"#fff",border:0,height:"1.5rem"},button2:{marginLeft:".5rem",background:"#29f605"},button3:{background:"transparent"}},C=document.title,N=["[\u25b6]","[\u25c0]"],T=0;var D=function(){var e=o.a.useState([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=o.a.useState([]),c=Object(l.a)(r,2),d=c[0],m=c[1],p=o.a.useState([]),f=Object(l.a)(p,2),g=f[0],v=f[1],b=o.a.useState(0),E=Object(l.a)(b,2),S=E[0],D=E[1],A=o.a.useState(0),M=Object(l.a)(A,2),L=M[0],J=M[1],B=o.a.useState(0),F=Object(l.a)(B,2),R=F[0],z=F[1],G=o.a.useState(!1),P=Object(l.a)(G,2),U=P[0],q=P[1],H=o.a.useState(0),Y=Object(l.a)(H,2),_=Y[0],K=Y[1],Q=o.a.useState(0),V=Object(l.a)(Q,2),W=V[0],X=V[1];o.a.useEffect((function(){var e=localStorage.getItem("todos");e&&a(JSON.parse(e));var t=localStorage.getItem("projects");t&&m(JSON.parse(t));var n=localStorage.getItem("totalTime");n&&D(n)}),[]),o.a.useEffect((function(){localStorage.setItem("todos",JSON.stringify(n))}),[n]),o.a.useEffect((function(){localStorage.setItem("projects",JSON.stringify(d))}),[d]),o.a.useEffect((function(){localStorage.setItem("totalTime",S)}),[S]),o.a.useEffect((function(){console.log(L),L?(clearInterval(R),k("./favicon-go.ico"),z(setInterval((function(){document.title=N[T]+" "+C,T=(T+1)%2,a(n.map((function(e){return e.id===L&&(e.duration++,e.tmpDuration||(e.tmpDuration=0),e.tmpDuration++,e.duration%60===0&&(e.money+=e.minuteCost),D((function(e){return parseInt(e,10)+1}))),e})))}),1e3))):(clearInterval(R),k("./favicon.ico"),document.title=C)}),[L]),o.a.useEffect((function(){!function(){var e=0,t=0;console.log(g),n.map((function(n){-1!==g.indexOf(n.id)&&(e+=n.duration,t+=n.money)})),K(e),X(t)}()}),[g]);var Z=n.filter((function(e){return!e.completed})),$=n.filter((function(e){return e.completed})),ee={toggleCheck:function(e,t){t.target.checked?v(g.concat([e])):v(g.filter((function(t){return t!==e})))},removeTodo:function(e){console.log("removeTodo "+e),a(n.filter((function(t){return t.id!==e})))},toggleTodo:function(e){console.log("toggleTodo "+e),a(n.map((function(t){return t.id===e&&(t.completed=!t.completed,t.completed&&e===L&&J(0)),t})))},addTodo:function(e,t){console.log("addTodo "+e),t=parseInt(t,10);var o=d.find((function(e){return e.id===t}));a(n.concat([{id:Date.now(),projectId:t,title:e,completed:!1,duration:0,money:0,minuteCost:parseInt(o.tariff,10)/60,tmpDuration:0}]))},editTodo:function(e,t){console.log("editTodo "+e);var o=n.findIndex((function(t){return t.id===e}));console.log(n[o].title=t),a(n)},addProject:function(e,t){console.log("addProject "+e),m(d.concat([{id:Date.now(),title:e,tariff:parseInt(t,10)}]))},toggleGo:function(e){console.log("toggleGo "+e);for(var t=0;t<n.length;t++)if(n[t].id===e&&!n[t].completed){J(e===L?0:e);break}},setIsModalOpen:q};return o.a.createElement(u.Provider,{value:ee},o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("div",null,o.a.createElement("div",{style:{padding:0}},o.a.createElement("img",{src:"./time-2-32.png",alt:"Tasknik"}),"\xa0 Tasknik v.",I.version),o.a.createElement("div",{style:O.buttons},o.a.createElement("button",{style:O.button,onClick:function(){return function(){if(window.confirm("\u0412\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438, \u043f\u0440\u043e\u0435\u043a\u0442\u044b \u0438 \u0442\u0430\u0439\u043c\u0435\u0440\u044b \u0431\u0443\u0434\u0443\u0442 \u043f\u0435\u0440\u0435\u0437\u0430\u043f\u0438\u0441\u0430\u043d\u044b. \u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c?")){J(0);var e=document.createElementNS("http://www.w3.org/1999/xhtml","input");e.type="file",e.accept="application/json",e.addEventListener("change",(function(){if(e.files&&e.files[0]){var t=e.files[0],n=new FileReader;n.addEventListener("load",(function(e){try{var t=JSON.parse(e.target.result);localStorage.setItem("totalTime",t.totalTime),localStorage.setItem("todos",t.todos),localStorage.setItem("projects",t.projects),window.location.reload()}catch(e){window.alert("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u0442\u044c \u0444\u0430\u0439\u043b")}})),n.readAsText(t)}e=null})),e.dispatchEvent(new MouseEvent("click"))}}()},type:"button"},"\u0418\u043c\u043f\u043e\u0440\u0442"),o.a.createElement("button",{style:Object(i.a)(Object(i.a)({},O.button),O.button2),onClick:function(){return function(){var e=JSON.stringify({totalTime:localStorage.getItem("totalTime"),todos:localStorage.getItem("todos"),projects:localStorage.getItem("projects")}),t=new Date,n="tasknik ";if(n+="".concat(t.getDate().toString().padStart(2,"0"),"-").concat((t.getMonth()+1).toString().padStart(2,"0"),"-").concat(t.getFullYear()),n+=" ".concat(t.getHours().toString().padStart(2,"0"),"-").concat(t.getMinutes().toString().padStart(2,"0"),"-").concat(t.getSeconds().toString().padStart(2,"0")),n+=".json","function"==typeof navigator.msSaveBlob)return navigator.msSaveBlob(e,n);var a=document.createElementNS("http://www.w3.org/1999/xhtml","a"),o=URL.createObjectURL(new Blob([e],{type:"application/json"}));a.href=o,a.download=n,a.dispatchEvent(new MouseEvent("click")),URL.revokeObjectURL(o),a=null}()},type:"button"},"\u042d\u043a\u0441\u043f\u043e\u0440\u0442")))),o.a.createElement("div",{className:"App-content"},o.a.createElement("div",null,Z.length?o.a.createElement(h,{title:"\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435",todos:Z,projects:d,currentId:L}):o.a.createElement("p",null,"\u041d\u0435\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447"),o.a.createElement("h3",null,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"),o.a.createElement(j,{projects:d}),o.a.createElement(y,null),$.length?o.a.createElement(h,{title:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0435",todos:$,projects:d,currentId:L}):o.a.createElement("p",null,"\u041d\u0435\u0442 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447"))),o.a.createElement("footer",{className:"App-footer"},o.a.createElement("div",{className:"totalTimer",onClick:function(){return q(!0)}},"\u0412\u0441\u0435\u0433\u043e: ",s(S)," \xa0"),o.a.createElement("span",{title:"\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u043e\u0431\u0449\u0438\u0439 \u0442\u0430\u0439\u043c\u0435\u0440",className:"action resetTotalAction",onClick:function(){return D(0),void a(n.map((function(e){return e.tmpDuration=0,e})))}},o.a.createElement(w.a,{size:16,color:"orange","stroke-width":"2"})),o.a.createElement("div",{style:Object(i.a)(Object(i.a)({},O.buttons),{},{paddingRight:"2rem"})},o.a.createElement("span",null,"\u0418\u0442\u043e\u0433 \u043f\u043e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u043c: ",s(_)," / ",Math.round(W))))),o.a.createElement(x,{isOpen:U,todos:n,projects:d}))};c.a.render(o.a.createElement(D,null),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.646c17ee.chunk.js.map