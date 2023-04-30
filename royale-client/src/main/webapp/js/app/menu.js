"use strict";
/* global app */

function Menu() {
  
  this.body = document.getElementById("body");
  window.history.pushState({html:"index.html", pageTitle:"Infringe Royale"}, "", "#");
  
  /* Register all menu classes here*/
  var m = [
    {id: "warn", obj: new MenuWarn()}, // Special, displays on top. Non-exclusive.
    {id: "bg", obj: new MenuDisplay()}, // Also special, displays behind everything.
    {id: "error", obj: new MenuError()},
    {id: "load", obj: new MenuLoad()},
    {id: "disclaim", obj: new MenuDisclaim()},
    {id: "main", obj: new MenuMain()},
    {id: "mainMember", obj: new MenuAccount()},
    {id: "game", obj: new MenuGame()}
  ];
  
  this.menus = [];
  for(var i=0;i<m.length;i++) {
    this.menus[i] = (m[i].obj);
    this[m[i].id] = m[i].obj;
  }
  
  this.lastNav = "";
  var tmp = this;
  window.onpopstate = function(e) {
    if(tmp[tmp.lastNav] && tmp[tmp.lastNav].onBack) { tmp.onBack(); return; }
    if(e.state && e.state.pageTitle !== "Infringe Royale"){
        document.getElementById("content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
    else if(e.state && e.state.pageTitle === "Infringe Royale"){
      window.history.back();
    }
  };
  
  this.hideAll();
  this.background('c');
  this.body.style.display = "block";
};

Menu.prototype.hideAll = function() {
  for(var i=2;i<this.menus.length;i++) { /* Skip first 2 elements because they're non-exclusive */
    this.menus[i].hide();
  }
};

/* Changes class of body in order to set background visuals */
Menu.prototype.background = function(bid) {
  if(bid === this.bid) { return; }
  this.bid = bid;
  var toset;
  switch(bid) {
    case 'a' : { toset = "background-a"; break; }
    case 'b' : { toset = "background-b"; break; }
    case 'c' : { toset = "background-c"; break; }
  }
  if(bid === "a") {
    this.bg.position();
    this.bg.container.style.display = "";
  } else {
    this.bg.container.style.display = "none";
  }
  this.body.classList.remove("background-a");
  this.body.classList.remove("background-b");
  this.body.classList.remove("background-c");
  this.body.classList.add(toset);
};

/* Pushes menu changes into history state. */
Menu.prototype.navigation = function(id, nam) {
  this.lastNav = id;
  window.history.replaceState({html:"index.html", pageTitle:"Infringe Royale"}, nam, "#"+nam);
};

Menu.prototype.onBack = function() {
  window.history.pushState({html:"index.html", pageTitle:"Infringe Royale"}, "", "#");
  this[this.lastNav].onBack();
};