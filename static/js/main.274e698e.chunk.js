(this["webpackJsonp5-scrum-poker"]=this["webpackJsonp5-scrum-poker"]||[]).push([[0],{196:function(e,t,n){e.exports={container:"style_container__1Hz1V"}},214:function(e,t,n){e.exports=n(371)},223:function(e,t,n){},343:function(e,t,n){},350:function(e,t,n){},351:function(e,t,n){},352:function(e,t,n){},353:function(e,t,n){},354:function(e,t,n){},367:function(e,t,n){},370:function(e,t,n){},371:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),s=n(33),o=n.n(s);n(219),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=n(72),c=n(46),l=n(36),u=n(29),m=n(17),p=n(18),d=n(22),v=n(23),h=n(133),f=n(201),E=n(391),g=n(383),b=n(389),S=n(386),k=n(381),I=n(199),O=n(178),y=n(390),_=function(){function e(){Object(m.a)(this,e),this.db_name="sessions",this.db=void 0,this.db=new O.a("".concat("https://998ca30c-79a6-4a5b-a935-a2f668eb414e-bluemix.cloudantnosqldb.appdomain.cloud/").concat(this.db_name),{}),console.log("API SERVICE","https://998ca30c-79a6-4a5b-a935-a2f668eb414e-bluemix.cloudantnosqldb.appdomain.cloud/")}return Object(p.a)(e,[{key:"info",value:function(){return this.db.info()}},{key:"post",value:function(e){return this.db.post(e)}},{key:"getSession",value:function(e){return this.db.get(e)}},{key:"update",value:function(e){return e.last_updated=(new Date).getTime(),this.db.put(e)}},{key:"delete",value:function(e){var t=this;return this.getSession(e).then((function(n){return t.db.remove({_id:e,_rev:n._rev})}))}},{key:"getEstimation",value:function(e,t){return this.db.get(e).then((function(e){var n;return[null===(n=e.estimations)||void 0===n?void 0:n[t],e]}))}},{key:"vote",value:function(e,t,n,a){var i=this;this.getEstimation(e,t).then((function(e){var t=Object(I.a)(e,2),s=t[0],o=t[1];(!a&&!s.votes[n.id]||a)&&(s.votes[n.id]={id:n.id,timestamp:(new Date).getTime(),value:a,pattern:n.pattern,voter_username:n.username,voter_email:n.email},i.updateEstimation({_id:o._id,_rev:o._rev},s))}))}},{key:"createNewEstimation",value:function(e,t){var n,a=Object(y.a)(),i=null!==(n=e.estimations)&&void 0!==n?n:{};return i[a]=Object(u.a)({},t,{id:a}),e.estimations=i,this.db.put(e)}},{key:"updateEstimation",value:function(e,t){var n=this;e._id&&e._rev&&this.db.get(e._id).then((function(e){return e.estimations?e.estimations=Object.keys(e.estimations).reduce((function(e,n){return e[n].id===t.id?e[n]=t:t.isActive&&(e[n].isActive=!1),e}),e.estimations):e.estimations=Object(l.a)({},t.id,t),n.db.put(e)}))}},{key:"deleteEstimation",value:function(e,t){var n=this;this.db.get(e._id).then((function(e){e.estimations&&(delete e.estimations[t],n.db.put(e))}))}},{key:"onChange",value:function(e){this.db.changes({since:"now",live:!0}).on("change",(function(t){e(t)}))}}],[{key:"Instance",get:function(){return this._instance||(this._instance=new this)}}]),e}();_._instance=void 0;n(223);var j,C=n(200),N=function(){function e(){Object(m.a)(this,e)}return Object(p.a)(e,null,[{key:"saveSession",value:function(e){var t=this.getSessions();localStorage.setItem("sp_sessions",JSON.stringify((null===t||void 0===t?void 0:t.length)?[].concat(Object(C.a)(t),[e]):[e]))}},{key:"getSessions",value:function(){var e=localStorage.getItem("sp_sessions");return e?JSON.parse(e):null}},{key:"deleteSession",value:function(e){var t=this.getSessions();t&&t.length&&(t=t.filter((function(t){return t._id!==e})),localStorage.setItem("sp_sessions",JSON.stringify(t)))}},{key:"getSession",value:function(e){var t=this.getSessions(),n=null;return t&&t.length&&(n=t.filter((function(t){return t._id===e}))[0]||null),n}}]),e}();!function(e){e.session_name="session_name",e.session_pin="session_pin"}(j||(j={}));var w=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).api=_.Instance,e.state={form:{session_name:"",session_pin:""},previousSessions:N.getSessions()},e.onFormSubmit=function(t){if(e.setState({valid:Object.keys(t).reduce((function(e,n){return e[n]=""!==t[n]?"valid":"invalid",e}),{})}),""!==t.session_name&&""!==t.session_pin){var n=Object(u.a)({},t,{},{created_at:(new Date).getTime()});e.api.post(n).then((function(a){a.ok&&(N.saveSession({_id:a.id,session_name:t.session_name,session_pin:t.session_pin,created_at:n.created_at}),e.props.history.push("/po?id=".concat(a.id)))}))}},e.onInputChange=function(t){var n=Object(u.a)({},e.state.form,{},Object(l.a)({},t.currentTarget.name,t.currentTarget.value));e.setState({form:n})},e.onPreviousSessionDelete=function(t,n){t.stopPropagation(),e.api.delete(n).finally((function(){N.deleteSession(n),e.setState({previousSessions:N.getSessions()})}))},e.onSessionLinkClick=function(t){e.props.history.push("/po?id=".concat(t))},e}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.api.info().then((function(e){console.log("info",e)}))}},{key:"render",value:function(){var e,t,n,i,s=this;return a.createElement("div",{id:"start-page"},a.createElement(h.a,{raised:!0},a.createElement(f.a,{columns:2,stackable:!0},a.createElement(f.a.Column,{verticalAlign:"middle"},a.createElement(E.a,{textAlign:"center"},"New Session"),a.createElement(g.a,{onSubmit:function(e){s.onFormSubmit(s.state.form)}},a.createElement(g.a.Input,{required:!0,fluid:!0,icon:"clock outline",iconPosition:"left",name:j.session_name,value:this.state.form.session_name,label:"Session Name",placeholder:"Session Name",onChange:this.onInputChange,className:null===(e=this.state.valid)||void 0===e?void 0:e.session_name}),a.createElement(g.a.Input,{required:!0,fluid:!0,icon:"lock",iconPosition:"left",name:j.session_pin,value:this.state.form.session_pin,label:"Session PIN",placeholder:"Session PIN",onChange:this.onInputChange,className:null===(t=this.state.valid)||void 0===t?void 0:t.session_pin}),a.createElement(b.a,{type:"submit",primary:!0},"Submit"))),a.createElement(f.a.Column,{verticalAlign:"top"},a.createElement(E.a,{textAlign:"center"},"Recent Sessions"),a.createElement(S.a,{divided:!0,verticalAlign:"middle"},(null===(n=this.state.previousSessions)||void 0===n?void 0:n.length)?null===(i=this.state.previousSessions)||void 0===i?void 0:i.map((function(e){return a.createElement(S.a.Item,{as:"a",key:e._id,onClick:function(){s.onSessionLinkClick(e._id)}},a.createElement(S.a.Content,{floated:"right"},a.createElement(b.a,{icon:"times circle outline",onClick:function(t){s.onPreviousSessionDelete(t,e._id)}})),a.createElement(S.a.Icon,{name:"clock outline",verticalAlign:"middle"}),a.createElement(S.a.Content,null,a.createElement(S.a.Header,null,e.session_name),a.createElement(S.a.Description,null,function(e){var t=new Date(e);return"".concat(t.toLocaleDateString()," - ").concat(t.toLocaleTimeString())}(e.created_at))))})):a.createElement(S.a.Item,null,a.createElement(S.a.Content,null,"No previous sessions"))))),a.createElement(k.a,{vertical:!0},"Or")))}}]),n}(a.Component),F=Object(c.f)(w),P=(n(343),function(){function e(){Object(m.a)(this,e)}return Object(p.a)(e,null,[{key:"saveUserInfo",value:function(e){localStorage.setItem("sp_user",JSON.stringify(e))}},{key:"getUserInfo",value:function(){var e=localStorage.getItem("sp_user");return e?JSON.parse(e):null}}]),e}()),A=n(385),T=n(101),D=n.n(T),U=(n(350),n(388)),x=n(382),V=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).onSelect=function(){a.props.onSelect&&a.props.onSelect(a.props.voteValue)},a.state={},a}return Object(p.a)(n,[{key:"render",value:function(){return"front"===this.props.side?a.createElement("div",{className:"componentFront ".concat(this.props.className),onClick:this.onSelect},a.createElement("div",{className:"faceFront"},a.createElement("div",{className:"content"},a.createElement("div",{className:"valueFront"},this.props.voteValue),this.props.withProfilePic&&a.createElement("div",{className:"labelFront"},a.createElement(D.a,{size:80,className:"avatar",email:this.props.voterEmail}),a.createElement("div",null,this.props.voterUsername))))):a.createElement("div",{className:"componentBack ".concat(this.props.className),onClick:this.onSelect,style:{backgroundImage:"url('/patterns/".concat(this.props.voterPattern,".png')")}},a.createElement("div",{className:"faceBack"},a.createElement("div",{className:"content"},this.props.withProfilePic&&a.createElement("div",{className:"labelFront"},a.createElement(D.a,{size:80,className:"avatar",email:this.props.voterEmail}),a.createElement("div",{className:"voterLabel"},this.props.children)),a.createElement(U.a,{active:this.props.loading},this.props.withProfilePic&&a.createElement(D.a,{size:80,className:"avatar",email:this.props.voterEmail}),a.createElement("div",{className:"voterLabel"},this.props.children),a.createElement(x.a,{active:!0,className:"fit"})))))}}]),n}(a.Component);V.defaultProps=void 0,V.defaultProps={voterPattern:"8126"};var L=V,R=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).patternOptions=[{key:"1267",text:"Pink-Yellow",value:"1267",image:{src:"/patterns/1267.png"}},{key:"2109",text:"Red-Cream",value:"2109",image:{src:"/patterns/2109.png"}},{key:"9248",text:"Blue-Cream",value:"9248",image:{src:"/patterns/9248.png"}},{key:"10680",text:"BW-Red",value:"10680",image:{src:"/patterns/10680.png"}},{key:"18242",text:"Yellow-Cream",value:"18242",image:{src:"/patterns/18242.png"}},{key:"8126",text:"Red-Blue",value:"8126",image:{src:"/patterns/8126.png"}}],a.onUserInfoFormSubmit=function(){var e=Object(u.a)({},a.state.userInfoForm,{id:Object(y.a)()});P.saveUserInfo(e),a.props.onUserSign(e)},a.onInputChange=function(e){var t=Object(u.a)({},a.state.userInfoForm,{},Object(l.a)({},e.currentTarget.name,e.currentTarget.value));a.setState({userInfoForm:t})},a.onSelectChange=function(e,t){var n=Object(u.a)({},a.state.userInfoForm,{},{pattern:t.value});a.setState({userInfoForm:n})},a.state={userInfoForm:{email:""}},a}return Object(p.a)(n,[{key:"render",value:function(){var e;return a.createElement(h.a,{raised:!0,className:"form-wrapper"},a.createElement(f.a,{stackable:!0},a.createElement(f.a.Row,{verticalAlign:"middle"},a.createElement(f.a.Column,{width:10},a.createElement(E.a,{textAlign:"center"},"Developer Info"),a.createElement(g.a,{onSubmit:this.onUserInfoFormSubmit},a.createElement(g.a.Input,{required:!0,fluid:!0,value:this.state.userInfoForm.username,icon:"user outline",iconPosition:"left",placeholder:"Username",onChange:this.onInputChange,name:"username"}),a.createElement(g.a.Input,{fluid:!0,value:this.state.userInfoForm.email,icon:"mail outline",iconPosition:"left",placeholder:"Email",onChange:this.onInputChange,name:"email"}),a.createElement(g.a.Field,null,a.createElement(A.a,{labeled:!0,placeholder:"Select Card Pattern",name:"pattern",fluid:!0,value:this.state.userInfoForm.pattern,selection:!0,options:this.patternOptions,onChange:this.onSelectChange})),a.createElement(k.a,null),a.createElement(b.a,{type:"submit",primary:!0},"Submit"))),a.createElement(f.a.Column,{width:1},a.createElement(L,{side:"back",voterPattern:this.state.userInfoForm.pattern,voterUsername:this.state.userInfoForm.username,voterEmail:this.state.userInfoForm.email,withProfilePic:!0},a.createElement("div",null,null!==(e=this.state.userInfoForm.username)&&void 0!==e?e:"Unknown"))))))}}]),n}(a.Component),B=(n(351),function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(m.a)(this,n);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t.call.apply(t,[this].concat(i))).api=_.Instance,e.cardValues=["0","1","2","3","5","8","13","20","40","?"],e.state={},e.onActiveEstimationChange=function(){e.setActiveEstimation().then((function(){e.state.activeEstimation&&e.api.vote(e.props.sessionId,e.state.activeEstimation.id,e.props.userInfo)}))},e.onCardSelected=function(t){e.api.vote(e.props.sessionId,e.state.activeEstimation.id,e.props.userInfo,t)},e}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.setActiveEstimation(),this.api.onChange(this.onActiveEstimationChange)}},{key:"setActiveEstimation",value:function(){var e=this;return this.api.getSession(this.props.sessionId).then((function(t){var n,a,i=Object.keys(t.estimations).reduce((function(e,n){var a=t.estimations[n];return e=a.isActive?a:e}),void 0),s=null===i||void 0===i||null===(n=i.votes)||void 0===n||null===(a=n[e.props.userInfo.id])||void 0===a?void 0:a.value;e.setState({activeEstimation:i,sessionName:t.session_name,currentSelectedVote:s})}))}},{key:"render",value:function(){var e=this;return a.createElement(a.Fragment,null,a.createElement(h.a.Group,null,a.createElement(h.a,{secondary:!0,size:"big"},"Session: ",this.state.sessionName),!this.state.activeEstimation&&a.createElement(h.a,{padded:"very",textAlign:"center"},"No Active Estimation.")),this.state.activeEstimation&&a.createElement(h.a.Group,null,a.createElement(h.a,{color:"violet"},"Estimation Name: ",this.state.activeEstimation.name),a.createElement(h.a,{secondary:!0},"Estimation Description: ",this.state.activeEstimation.description),a.createElement(h.a,null,a.createElement("div",{className:"card-wrapper"},this.cardValues.map((function(t){return a.createElement(L,{onSelect:e.onCardSelected,className:"dev-card ".concat(t===e.state.currentSelectedVote?"selected":""),side:"front",voteValue:t,voterUsername:e.props.userInfo.username})}))))))}}]),n}(a.Component)),H=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(e){var a;Object(m.a)(this,n),(a=t.call(this,e)).sessionId=void 0,a.api=_.Instance,a.onUserSignIn=function(e){a.setState({userInfo:e})};var i=new URLSearchParams(a.props.location.search);return a.sessionId=i.get("id"),a.state={userInfo:P.getUserInfo()||void 0},a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.sessionId&&this.api.getSession(this.sessionId).then((function(t){e.setState({sessionValid:!0})})).catch((function(t){e.setState({sessionValid:!1})})).finally((function(){e.setState({initialLoad:!0})}))}},{key:"render",value:function(){var e=this.sessionId&&this.state.sessionValid?this.state.userInfo?a.createElement(B,{userInfo:this.state.userInfo,sessionId:this.sessionId}):a.createElement(R,{onUserSign:this.onUserSignIn}):a.createElement(h.a,null,"No session Id");return a.createElement("div",{className:"developer-page"},this.state.initialLoad&&e,!this.state.initialLoad&&a.createElement(x.a,{inverted:!0,active:!0,size:"huge",content:"Loading"}))}}]),n}(a.Component),J=Object(c.f)(H),z=n(47),G=n(102),M=(n(352),n(387)),q=n(179),W=(n(353),n(392)),Y=n(196),$=n.n(Y),K=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(p.a)(n,[{key:"render",value:function(){var e;return a.createElement(W.a,{disabled:this.props.shouldHide,active:!this.props.shouldHide,animated:"move",style:{pointerEvents:"none"},className:$.a.container,instant:this.props.shouldHide},a.createElement(W.a.Content,{style:{lineHeight:0},visible:!0},a.createElement(L,{withProfilePic:!0,side:"back",loading:!(null===(e=this.props.vote)||void 0===e?void 0:e.value),voterEmail:this.props.vote.voter_email,voterUsername:this.props.vote.voter_username,voterPattern:this.props.vote.pattern},a.createElement("div",null,this.props.vote.voter_username))),a.createElement(W.a.Content,{style:{lineHeight:0},hidden:!0},a.createElement(L,{withProfilePic:!0,side:"front",voterEmail:this.props.vote.voter_email,voterUsername:this.props.vote.voter_username,voteValue:this.props.shouldHide?"?":this.props.vote.value})))}}]),n}(a.Component),Q=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).api=_.Instance,a.onToggleVoteClick=function(e,t){var n=Object(u.a)({},a.props.estimate,{isActive:t});a.api.updateEstimation(a.props.documentRef,n)},a.onDeleteClick=function(e){a.api.deleteEstimation(a.props.documentRef,a.props.estimate.id)},a.state={},a}return Object(p.a)(n,[{key:"render",value:function(){var e=this;return a.createElement("div",{className:"votes-table"},a.createElement(q.a,null,a.createElement(h.a,{secondary:!0,textAlign:"center"},a.createElement(b.a.Group,null,a.createElement(b.a,{circular:!0,icon:"play",color:this.props.estimate.isActive?void 0:"blue",disabled:this.props.estimate.isActive,content:"Start",onClick:function(t){e.onToggleVoteClick(t,!0)}}),a.createElement(b.a,{icon:"stop",disabled:!this.props.estimate.isActive,negative:this.props.estimate.isActive,content:"Stop",onClick:function(t){e.onToggleVoteClick(t,!1)}}),a.createElement(b.a,{disabled:this.props.estimate.isActive,icon:"trash alternate",content:"Delete",onClick:this.onDeleteClick}))),a.createElement(h.a,null,a.createElement("div",{className:"votes-table__cards"},Object.keys(this.props.estimate.votes).map((function(t){return a.createElement(K,{vote:e.props.estimate.votes[t],shouldHide:e.props.estimate.isActive})}))))))}}]),n}(a.Component),X=(n(354),function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(e){var i;return Object(m.a)(this,n),(i=t.call(this,e)).mapEstimationsToPanes=function(){return Object.keys(i.props.estimations).sort((function(e,t){return i.props.estimations[e].timestamp<i.props.estimations[t].timestamp?1:-1})).map((function(e,t){return{menuItem:i.props.estimations[e].isActive?"".concat(i.props.estimations[e].name," - Active"):i.props.estimations[e].name,render:function(){return a.createElement(M.a.Pane,{className:"tab-container"},a.createElement(Q,{documentRef:{_rev:i.props.rev,_id:i.props.id},estimate:i.props.estimations[e]}))}}}))},i.state={initialRender:!1},i}return Object(p.a)(n,[{key:"render",value:function(){return a.createElement(M.a,{menu:{pointing:!0,fluid:!0,vertical:!0},panes:this.mapEstimationsToPanes()})}}]),n}(a.Component)),Z=function(e){Object(v.a)(n,e);var t=Object(d.a)(n);function n(e){var a;Object(m.a)(this,n),(a=t.call(this,e)).api=_.Instance,a.sessionId=void 0,a.getSession=function(){a.api.getSession(a.sessionId).then((function(e){a.setState({session:e})}))},a.onEstimationFormInputChange=function(e){var t=Object(u.a)({},a.state.estimationForm,{},Object(l.a)({},e.currentTarget.name,e.currentTarget.value));a.setState({estimationForm:t})},a.onEstimationFormSubmit=function(e){e&&e.estimation_name&&a.api.createNewEstimation(a.state.session,{name:e.estimation_name,description:e.estimation_description,timestamp:(new Date).getTime(),isActive:!1,isEnded:!1,votes:{}})},a.onCopyButtonClick=function(){var e="".concat(window.location.origin,"/dev?id=").concat(a.sessionId);navigator.clipboard.writeText(e),G.b.success("Dev url Copied!",{position:G.b.POSITION.BOTTOM_RIGHT})};var i=new URLSearchParams(a.props.location.search);return a.sessionId=i.get("id"),a.state={},a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){this.sessionId&&(this.getSession(),this.api.onChange(this.getSession))}},{key:"render",value:function(){var e,t,n,i,s,o,r=this,c=(null===(e=this.state.session)||void 0===e?void 0:e.estimations)&&!!Object.keys(null===(t=this.state.session)||void 0===t?void 0:t.estimations).length?a.createElement(X,{rev:this.state.session._rev,id:this.state.session._id,estimations:null===(n=this.state.session)||void 0===n?void 0:n.estimations}):a.createElement("h4",null," No Estimations");return a.createElement("div",{id:"po-page"},a.createElement(h.a.Group,null,a.createElement(h.a,{secondary:!0,clearing:!0,className:"session-header"},"Session name: ",null===(i=this.state.session)||void 0===i?void 0:i.session_name,a.createElement(b.a,{onClick:this.onCopyButtonClick,color:"blue",size:"mini",floated:"right",inverted:!0},a.createElement(z.a,{name:"share alternate"}),"Copy Invitation Link")),a.createElement(h.a,null,a.createElement(g.a,{onSubmit:function(e){r.onEstimationFormSubmit(r.state.estimationForm)}},a.createElement(g.a.Field,null,a.createElement("input",{name:"estimation_name",placeholder:"Estimation Name",onChange:this.onEstimationFormInputChange,value:null===(s=this.state.estimationForm)||void 0===s?void 0:s.estimation_name})),a.createElement(g.a.Field,null,a.createElement("input",{name:"estimation_description",placeholder:"Estimation Description",onChange:this.onEstimationFormInputChange,value:null===(o=this.state.estimationForm)||void 0===o?void 0:o.estimation_description})),a.createElement(b.a,{floated:"right",type:"submit"},"New")))),a.createElement(h.a.Group,{className:"estimation-container"},a.createElement(h.a,{textAlign:"center"},c)),a.createElement(G.a,{autoClose:3e3}))}}]),n}(a.Component),ee=Object(c.f)(Z);n(367);particlesJS.load("particles-js","particlesjs-config.json",(function(){console.log("callback - particles.js config loaded")}));var te=function(){return i.a.createElement(r.a,null,i.a.createElement("div",{id:"particles-js"}),i.a.createElement(c.c,null,i.a.createElement(c.a,{path:"/dev"},i.a.createElement(J,null)),i.a.createElement(c.a,{path:"/po"},i.a.createElement(ee,null)),i.a.createElement(c.a,{path:"/"},i.a.createElement(F,null))))};n(368),n(369),n(370);o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[214,1,2]]]);
//# sourceMappingURL=main.274e698e.chunk.js.map