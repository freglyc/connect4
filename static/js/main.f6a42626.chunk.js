(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{15:function(e,t,a){e.exports=a.p+"static/media/defaultFavicon.913600e4.ico"},26:function(e,t,a){e.exports=a.p+"static/media/redFavicon.3401ab9d.ico"},27:function(e,t,a){e.exports=a.p+"static/media/blueFavicon.874514d6.ico"},28:function(e,t,a){e.exports=a.p+"static/media/yellowFavicon.632fadd3.ico"},29:function(e,t,a){e.exports=a.p+"static/media/greenFavicon.bb6577c1.ico"},30:function(e,t,a){e.exports=a(59)},35:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(9),o=a.n(s),l=(a(35),a(3)),c=a(4),i=a(6),m=a(5),p=a(1),u=a(8),d=a(11),f={page:"HOME",stateID:"",gameID:"",players:2,timer:!1,currentTime:-1,time:-1,started:!1,darkMode:!1,colorBlind:!1,color:"Neutral",board:[],turn:"Neutral",teams:[],winner:"Neutral"},h=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{page:t.page})},E=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{stateID:t.stateID})},b=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{gameID:t.gameID})},g=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{players:t.players})},v=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{timer:t.timer})},x=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{currentTime:t.currentTime})},N=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{time:t.time})},T=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{started:t.started})},S=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{darkMode:t.darkMode})},O=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{colorBlind:t.colorBlind})},y=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{color:t.color})},w=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{board:t.board})},k=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{turn:t.turn})},D=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{teams:t.teams})},C=function(e,t){return Object(p.a)(Object(p.a)({},e),{},{winner:t.winner})};var _=Object(u.b)({connect4State:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"PAGE_SET":return h(e,t);case"STATEID_SET":return E(e,t);case"GAMEID_SET":return b(e,t);case"PLAYERS_SET":return g(e,t);case"TIMER_SET":return v(e,t);case"CURRENTTIME_SET":return x(e,t);case"TIME_SET":return N(e,t);case"STARTED_SET":return T(e,t);case"DARKMODE_SET":return S(e,t);case"COLORBLIND_SET":return O(e,t);case"COLOR_SET":return y(e,t);case"BOARD_SET":return w(e,t);case"TURN_SET":return k(e,t);case"TEAMS_SET":return D(e,t);case"WINNER_SET":return C(e,t);default:return e}}});function I(e){return Object(d.b)((function(e){return{page:e.connect4State.page,stateID:e.connect4State.stateID,gameID:e.connect4State.gameID,players:e.connect4State.players,timer:e.connect4State.timer,currentTime:e.connect4State.currentTime,time:e.connect4State.time,started:e.connect4State.started,darkMode:e.connect4State.darkMode,colorBlind:e.connect4State.colorBlind,color:e.connect4State.color,board:e.connect4State.board,turn:e.connect4State.turn,teams:e.connect4State.teams,winner:e.connect4State.winner}}),(function(e){return{setPage:function(t){e({type:"PAGE_SET",page:t})},setStateID:function(t){e({type:"StateID_SET",stateID:t})},setGameID:function(t){e({type:"GAMEID_SET",gameID:t})},setPlayers:function(t){e({type:"PLAYERS_SET",players:t})},setTimer:function(t){e({type:"TIMER_SET",timer:t})},setCurrentTime:function(t){e({type:"CURRENTTIME_SET",currentTime:t})},setTime:function(t){e({type:"TIME_SET",time:t})},setStarted:function(t){e({type:"STARTED_SET",started:t})},setDarkMode:function(t){e({type:"DARKMODE_SET",darkMode:t})},setColorBlind:function(t){e({type:"COLORBLIND_SET",colorBlind:t})},setColor:function(t){e({type:"COLOR_SET",color:t})},setBoard:function(t){e({type:"BOARD_SET",board:t})},setTurn:function(t){e({type:"TURN_SET",turn:t})},setTeams:function(t){e({type:"TEAMS_SET",teams:t})},setWinner:function(t){e({type:"WINNER_SET",winner:t})}}}))(e)}var j=a(7),R=a.n(j),M=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={currentTime:e.currentTime},n.timer=null,n.updated=!1,n}return Object(c.a)(a,[{key:"tick",value:function(){"Neutral"!==this.props.winner?(clearInterval(this.timer),this.setState({currentTime:this.props.time})):!0===this.updated?(this.setState({currentTime:this.props.currentTime}),this.updated=!1):this.state.currentTime>0&&this.setState({currentTime:this.state.currentTime-1})}},{key:"componentDidMount",value:function(){var e=this;this.timer=setInterval((function(){return e.tick()}),1e3)}},{key:"componentDidUpdate",value:function(e,t){var a=this;e.turn!==this.props.turn&&(clearInterval(this.timer),this.updated=!0,this.timer=setInterval((function(){return a.tick()}),1e3))}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"render",value:function(){return n.createElement("div",{className:"standard-txt boldest-txt dark"},"time: ",this.state.currentTime)}}]),a}(n.Component),A=a(15),B=a.n(A),P=a(26),L=a.n(P),G=a(27),W=a.n(G),U=a(28),K=a.n(U),F=a(29),H=a.n(F),J=Object({NODE_ENV:"production",PUBLIC_URL:"/connect4",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER,V=I(function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(e,t){var a;"Neutral"!==this.props.winner?document.getElementById("favicon").setAttribute("href",B.a):(a="Red"===this.props.turn?L.a:"Yellow"===this.props.turn?K.a:"Green"===this.props.turn?H.a:"Blue"===this.props.turn?W.a:B.a,document.getElementById("favicon").setAttribute("href",a))}},{key:"place",value:function(e){R.a.post("http://"+J+"/place",{game_id:this.props.gameID,color:this.props.color,column:e}).then((function(e){}))}},{key:"reset",value:function(){R.a.post("http://"+J+"/reset",{game_id:this.props.gameID}).then((function(e){}))}},{key:"render",value:function(){var e=this,t="Neutral"!==this.props.winner?this.props.winner.toLocaleLowerCase():this.props.turn.toLocaleLowerCase(),a=this.props.colorBlind?"-blind-border":"-border",r=this.props.colorBlind?"-tile-blind-border":"";return n.createElement("div",{className:"flexbox flex-column flex-center full-height"},n.createElement("div",{className:"flexbox flex-column flex-center game-width"},n.createElement("h1",{className:"title-txt large-padding-top"},n.createElement("a",{className:"red remove-hyperlink",href:"http://"+window.location.host},"CONNECT",n.createElement("span",{className:"blue"},"4"))),n.createElement("p",{className:"flex-self-start small-txt lighter-txt dark medium-padding-top"},"share this link with friends: ",n.createElement("a",{className:"dark",href:"https://"+window.location.host+"/"+this.props.gameID},"https://"+window.location.host+"/"+this.props.gameID)),n.createElement("hr",{className:"full-width dark"}),n.createElement("div",{className:"full-width"},n.createElement("div",{className:"flexbox space-between full-width small-padding-top"},n.createElement("div",{className:"flexbox"},this.props.teams.map((function(t){return n.createElement("div",{key:t+"-div",className:"color-input "+t.toLowerCase()+"-input-background "+t.toLowerCase()+a},n.createElement("input",{key:t+"-input",id:t,onClick:function(t){t.stopPropagation(),e.props.setColor(t.target.value)},name:"color",type:"radio",value:t}),n.createElement("label",{key:t+"-label",htmlFor:t,className:t.toLowerCase()+" boldest-txt small-txt"},t.toLowerCase()))}))),n.createElement("div",{className:"flexbox"},n.createElement("p",{className:t+" standard-txt boldest-txt flex-self-end"},"Neutral"!==this.props.winner?this.props.winner.toLowerCase()+" wins!":this.props.turn.toLowerCase()+" turn"))),n.createElement("div",{className:"flexbox flex-column flex-center small-margin-top blue-background small-padding"},n.createElement("div",{className:"full-width"},this.props.board.map((function(t,a){return n.createElement("div",{key:"rpw-"+a,className:"full-width flexbox space-between"},t.map((function(t,s){return n.createElement("button",{className:"tile",key:a+","+s,onClick:function(t){t.preventDefault(),e.place(s)}},n.createElement("div",{className:t.toLowerCase()+"-background "+t.toLowerCase()+r}))})))})))),n.createElement("div",{className:"flexbox space-between full-width small-padding-top"},this.props.started&&this.props.timer?n.createElement(M,{time:this.props.time,currentTime:this.props.currentTime,turn:this.props.turn,winner:this.props.winner}):this.props.timer?n.createElement("div",{className:"standard-txt boldest-txt dark"},"time: ",this.props.time):n.createElement("div",null),n.createElement("div",{className:"flexbox flex-center"},n.createElement("div",{className:"flexbox flex-center small-padding-right"},n.createElement("button",{className:"fas fa-cog dark gear",onClick:function(t){t.preventDefault(),e.props.setPage("SETTINGS")}})),n.createElement("div",{className:"flexbox flex-center"},n.createElement("button",{onClick:function(t){t.preventDefault(),e.reset()},className:"resetBtn smallest-txt bolder-txt"},"new game")))))),n.createElement("div",{className:"absolute bottom dev"},n.createElement("p",{className:"small-txt lighter-txt gray"},"Created by ",n.createElement("a",{className:"gray",href:"https://www.cfregly.com"},"Chris Fregly"))))}}]),a}(n.Component)),Y=a(10),q=Object({NODE_ENV:"production",PUBLIC_URL:"/connect4",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER,z=I(function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleClick=n.handleClick.bind(Object(Y.a)(n)),n}return Object(c.a)(a,[{key:"handleClick",value:function(e){var t=this;e.preventDefault(),this.props.gameID.includes(" ")||this.props.gameID.length<3||(R.a.post("http://"+q+"/join",{game_id:this.props.gameID,players:this.props.players,timer:this.props.timer}).then((function(e){var a=new WebSocket("ws://"+q+"/subscribe");a.onopen=function(){a.send(JSON.stringify({game_id:t.props.gameID}))},a.onmessage=function(e){var a=JSON.parse(e.data);t.props.stateID!==a.state_id&&(t.props.setStateID(a.state_id),t.props.setBoard(a.board),t.props.setTurn(a.turn),t.props.setTeams(a.teams),t.props.setWinner(a.winner),t.props.setTimer(a.has_timer),t.props.setCurrentTime(a.cur_time),t.props.setTime(a.time),t.props.setStarted(a.started))},a.onclose=function(){}})),this.props.setPage("GAME"),window.history.pushState(null,"","/"+this.props.gameID))}},{key:"render",value:function(){var e=this;return n.createElement("div",{className:"flexbox flex-column flex-center full-height"},n.createElement("div",{className:"flexbox flex-column flex-center half-width"},n.createElement("h1",{className:"title-txt large-padding-top"},n.createElement("a",{className:"red remove-hyperlink",href:"http://"+window.location.host},"CONNECT",n.createElement("span",{className:"blue"},"4"))),n.createElement("p",{className:"standard-txt lighter-txt gray large-padding-top"},"Play 2-3 player connect4 against friends on one or more devices. To create a game or join an existing one, enter a game ID and click 'Go'."),n.createElement("form",{className:"flexbox large-padding-top full-width",onSubmit:this.handleClick},n.createElement("input",{className:"input",autoFocus:!0,type:"text",value:this.props.gameID,onChange:function(t){return e.props.setGameID(t.target.value)}}),n.createElement("button",{className:"goBtn",onClick:this.handleClick},"Go")),n.createElement("div",{className:"flexbox flex-self-end small-padding-top"},n.createElement("div",{className:"flexbox flex-center small-padding-right"},n.createElement("button",{className:"fas fa-cog dark gear",onClick:function(t){t.preventDefault(),e.props.setPage("SETTINGS")}})),n.createElement("div",{className:"flexbox flex-center medium-padding-right"},n.createElement("label",{className:"small-padding-right standard-txt boldest-txt blue",htmlFor:"players"},"PLAYERS"),n.createElement("select",{className:"small-txt boldest-txt select",name:"players",id:"players",onChange:function(t){return e.props.setPlayers(parseInt(t.target.value))}},n.createElement("option",{value:"2"},"2"),n.createElement("option",{value:"3"},"3"))),n.createElement("div",{className:"flexbox flex-center"},n.createElement("label",{className:"small-padding-right standard-txt boldest-txt blue"},"TIMER"),n.createElement("label",{className:"switch"},n.createElement("input",{type:"checkbox",onChange:function(t){t.stopPropagation(),e.props.setTimer(!e.props.timer)}}),n.createElement("span",{className:"slider round"}))))),n.createElement("div",{className:"absolute bottom"},n.createElement("p",{className:"small-txt lighter-txt gray"},"Created by ",n.createElement("a",{className:"gray",href:"https://www.cfregly.com"},"Chris Fregly"))))}}]),a}(n.Component)),Q=I(function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return n.createElement("div",{className:"flexbox flex-column flex-center full-height"},n.createElement("button",{className:"absolute exit",onClick:function(t){t.preventDefault(),e.props.setPage(e.props.gameID?"GAME":"HOME")}}),n.createElement("div",{className:"flexbox flex-column flex-center half-width"},n.createElement("div",{className:"flexbox flex-column flex-center"},n.createElement("h1",{className:"title-txt large-padding-top"},n.createElement("a",{className:"red remove-hyperlink",href:"http://"+window.location.host},"CONNECT",n.createElement("span",{className:"blue"},"4"))),n.createElement("h1",{className:"standard-txt bolder-txt flex-self-end dark"},"SETTINGS")),n.createElement("div",{className:"full-width large-padding-top"},n.createElement("div",{className:"flexbox space-between full-width"},n.createElement("div",null,n.createElement("h2",{className:"standard-txt boldest-txt dark"},"DARK MODE"),n.createElement("p",{className:"small-txt gray"},"darken the mood and may also conserve battery life")),n.createElement("label",{className:"switch"},n.createElement("input",{type:"checkbox",defaultChecked:this.props.darkMode,onChange:function(t){t.stopPropagation();var a=!e.props.darkMode;e.props.setDarkMode(a),X.save({darkMode:a,colorBlind:e.props.colorBlind}),a?document.body.setAttribute("data-theme","dark"):document.body.removeAttribute("data-theme")}}),n.createElement("span",{className:"slider round"}))),n.createElement("div",{className:"flexbox space-between full-width medium-padding-top"},n.createElement("div",null,n.createElement("h2",{className:"standard-txt boldest-txt dark"},"COLOR BLIND MODE"),n.createElement("p",{className:"small-txt gray"},"add patterns to colors to distinguish teams")),n.createElement("label",{className:"switch"},n.createElement("input",{type:"checkbox",defaultChecked:this.props.colorBlind,onChange:function(t){t.stopPropagation();var a=!e.props.colorBlind;e.props.setColorBlind(a),X.save({darkMode:e.props.darkMode,colorBlind:a})}}),n.createElement("span",{className:"slider round"}))))),n.createElement("div",{className:"absolute bottom"},n.createElement("p",{className:"small-txt lighter-txt gray"},"Created by ",n.createElement("a",{className:"gray",href:"https://www.cfregly.com"},"Chris Fregly"))))}}]),a}(n.Component)),X=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"load",value:function(){return JSON.parse(window.localStorage.getItem("settings"))||{}}},{key:"save",value:function(e){window.localStorage.setItem("settings",JSON.stringify(e))}}]),e}(),Z=Object({NODE_ENV:"production",PUBLIC_URL:"/connect4",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_SERVER,$=I(function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;Object(l.a)(this,a),n=t.call(this,e);var r=X.load();return r.darkMode?(n.props.setDarkMode(r.darkMode),document.body.setAttribute("data-theme","dark")):document.body.removeAttribute("data-theme"),r.colorBlind&&n.props.setColorBlind(r.colorBlind),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;if("/"!==document.location.pathname){this.props.setGameID(document.location.pathname.slice(1));var t={game_id:this.props.gameID,players:2,timer:!1};R.a.post("http://"+Z+"/join",t).then((function(t){var a=new WebSocket("ws://"+Z+"/subscribe");a.onopen=function(){a.send(JSON.stringify({game_id:e.props.gameID}))},a.onmessage=function(t){var a=JSON.parse(t.data);e.props.stateID!==a.state_id&&(e.props.setStateID(a.state_id),e.props.setBoard(a.board),e.props.setTurn(a.turn),e.props.setTeams(a.teams),e.props.setWinner(a.winner),e.props.setTimer(a.has_timer),e.props.setCurrentTime(a.cur_time),e.props.setTime(a.time),e.props.setStarted(a.started))},a.onclose=function(){}})),this.props.setPage("GAME")}}},{key:"render",value:function(){var e=n.createElement(z,null);return"HOME"===this.props.page?e=n.createElement(z,null):"GAME"===this.props.page?e=n.createElement(V,null):"SETTINGS"===this.props.page&&(e=n.createElement(Q,null)),n.createElement("div",null,e)}}]),a}(n.Component));o.a.render(r.a.createElement(d.a,{store:Object(u.c)(_)},r.a.createElement($,null)),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.f6a42626.chunk.js.map