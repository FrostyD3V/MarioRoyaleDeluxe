"use strict";
/* global app */

function ToolWorld(editor) {
  this.editor = editor;
  
  this.element = document.getElementById("editor-tool-world");
  
  this.valInitial = document.getElementById("editor-tool-world-initial");
  this.valMode = document.getElementById("editor-tool-world-mode");
  this.valAudio = document.getElementById("editor-tool-world-audio");
  
  this.btnNew = document.getElementById("editor-tool-world-new");
  
  var tmp = this;
  this.btnApply = document.getElementById("editor-tool-world-apply");
  this.btnApply.onclick = function() { tmp.reload(); };
  
  this.btnNew = document.getElementById("editor-tool-world-new");
  this.btnNew.onclick = function() { tmp.addLevel(); };
}

ToolWorld.prototype.addLevel = function() {
  var lid = 0;
  for(var i=0;i<this.editor.world.levels.length;i++) {
    var level = this.editor.world.levels[i];
    if(level.id === lid) { lid++; i = 0; }
  }
  var data = {
    id: lid,
    initial: 0,
    name: "new level",
    zone: [
      {
        id: 0,
        initial: 196611,
        color: "#6B8CFF",
        data: [[[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0]],[[5,0,0,2,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[5,0,0,2,0]],[[5,0,0,2,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[5,0,0,2,0]],[[5,0,0,2,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[5,0,0,2,0]],[[5,0,0,2,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[5,0,0,2,0]],[[5,0,0,2,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[5,0,0,2,0]],[[5,0,0,2,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[30,0,0,0,0],[5,0,0,2,0]],[[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0],[5,0,0,2,0]]],
        obj: [],
        warp: []
      }
    ]
  };
  
  this.editor.world.levels.push(new Level(this.game, data));
  this.editor.dirty = true;
  
  app.menu.list.generate();
};

ToolWorld.prototype.reload = function() {
  this.save();
  this.load();
};

ToolWorld.prototype.load = function() {
  this.valInitial.value = this.editor.world.initial;
  this.valMode.value = this.editor.dataRaw.mode || "royale";
  this.valAudio.value = this.editor.dataRaw.audioOverrideURL || "";
  this.element.style.display = "block";
};

ToolWorld.prototype.save = function() {
  try {
    var i = parseInt(this.valInitial.value);
    var j = this.valMode.value || "royale";
    var k = this.valAudio.value || "";
    if(isNaN(i)) { throw "oof"; }
    this.editor.world.initial = i;
    this.editor.dataRaw.mode = j;
    this.editor.dataRaw.audioOverrideURL = k;
  }
  catch(ex) { app.menu.warn.show("Failed to parse value. Changes not applied."); }
  
  app.menu.list.generate();
};

ToolWorld.prototype.destroy = function() {
  this.element.style.display = "none";
  this.save();
};