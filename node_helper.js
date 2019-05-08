var fs = require('fs');
const path = require('path');
const NodeHelper = require('node_helper');
var self;

module.exports = NodeHelper.create ({
	// data defaults
	defaults: {
	videoDir:"videos",
	autoplay:"false",
	loop:"false",
	},
	self:0,
	
	// make Promise version of fs.readdir()
    readdirAsync : function(dirname) {
      return new Promise(function(resolve, reject) {
	 fs.readdir(dirname, function(err, filenames){
	    if (err) 
	        reject(err); 
	    else 
	        resolve(filenames);
	 });
      });
    },
	
	// function from here on
	start: function() {
	self=this;
		console.log("Starting module: " + this.name);
	},
	
	getVideos: function(){
	try {
	   var files=fs.readdirSync(self.config.videoDir)
	return files;
	}
	catch(exception) {
		console.log("videoDir error ="+exception.messages);
	}
	},
	getAutoPlay: function() {
	try {
	   var autoplay = "videos";
	   if (this.config.videoDir && this.config.videoDir.length > 0) {
		   videoDir = "&videos=";
		   for (var i = 0; i < this.config.videoDir.length; i++) {
			   videoDir += this.config.[i];
			   if (i + 1 < this.config.videoDir.length)
				   videoDir += "&videos=";
		   }   
	}
	},
	getLoop: function() {
	try {
	   var loop += (this.config.loop) ? "&loop=1: "&videos=";
	}
	},
	
	socketNotificationReceived: function(notification, payload) {
	if (notification === 'CONFIG') {
	    this.config = payload;
	   console.log("config.payload received");
	   self.config.videoDir=path.join(_dirname.toString(),self.config.videoDir);
	   self.config.autoplay= (this.config.autoplay) ? "autoplay=1" : "autoplay=0";
	   self.config.loop= (this.config.loop) ? "&loop=1" : "videos";
	}
	else if (notification === 'GET_VIDEOS') {
		self.sendSocketNotification("Videos",self.getVideos());
	}
	else if (notification === 'GET_AUTOPLAY') {
		self.sendSocketNotification("Autoplay",self.getAutoPlay());
	}
	else if (notification === 'GET_LOOP') {
		self.sendSocketNotification("Loop",self.getLoop());
	}
	},
})
	   
	