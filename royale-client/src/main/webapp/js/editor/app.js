"use strict";

/* Define Main Class */
function App() {
  this.menu = new Menu();                // Handles HTML menus
  this.file = new File();                // Manages loading files

  this.lang = "en"; // there's no localization for this just set it to english because loading resources says undefined otherwise
}

App.prototype.init = function() {
  this.menu.fileMenu();
};

App.prototype.load = function(game) {
  this.menu.editorMenu();
  this.editor = new Editor(game);
  
  this.menu.list.generate();
  this.editor.setTool("world");
};

App.prototype.save = function() {
  if(!this.editor) { return; }
  
  var data = this.editor.compile();
  this.file.save(data);
};

/* Close active game and reload page */
App.prototype.close = function() {
  if(this.editor) { this.editor.destroy(); }
  location.reload();
};


/* Starts the App */
var app = new App();
app.init();

/* Prevent the user from potentially losing data */
window.onbeforeunload = (e) => {
  if(app.editor) { if(app.editor.dirty) { return "Do you want to exit this page?" } }
}