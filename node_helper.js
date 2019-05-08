var fs = require('fs');
const path = require('path');
const NodeHelper = require('node_helper');
var self;

module.exports = NodeHelper.create ({
	// data defaults
	//defaults: {
	//videoDir:"videos",
	//autoplay:"false",
	//loop:"false",
	//},
	//self:0,
	
	// make Promise version of fs.readdir()
  /*  readdirAsync : function(dirname) {
      console.log("in readdir_async, source="+dirname)
    return new Promise(function(resolve, reject) {
      console.log("in readdir_async promise")
         fs.readdir(dirname, function(err, filenames){
            if (err) {
                console.log(" read async error="+err)
                reject(err); 
            }
            else {
                 console.log(" readdir async all ok filenames.length="+ filenames.length )                 
                resolve(filenames);
            }
         });
      });
    }, */
	
	// function from here on
	start: function() {
    self=this;
		console.log("Starting module: " + this.name);
	},
	
	getVideos: function(){
    console.log("getVideos path="+self.config.videoDir)
    try {
       // using async version of readdir, returns from promise
       fs.readdir(self.config.videoDir, function(error,files){
          if(error==null){
            console.log("getVideos list="+self.config.videoDir + " list="+ JSON.stringify(files))
            self.sendSocketNotification("Videos",files);
          }
          else{
            console.log(" readdir error="+error)
          }
       })
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
           //videoDir += this.config.[i];
           if (i + 1 < this.config.videoDir.length)
             videoDir += "&videos=";
         }   
       }
    }
    catch(ex){
      console.log("caught error="+ex.Message)
    }
	},
	getLoop: function() {
    try {
       var loop = loop + (this.config.loop) ? "&loop=1": "&videos=";
    }
    catch(ex){
      console.log("caught error="+ex.Message)
    }
	},
	
	socketNotificationReceived: function(notification, payload) {
	if (notification === 'CONFIG') {
	   this.config = payload;
	   console.log("config.payload received");
	   self.config.videoDir=path.join(this.path,self.config.videoDir);
     console.log(" video path="+self.config.videoDir)
	   self.config.autoplay= (this.config.autoplay) ? "autoplay=1" : "autoplay=0";
	   self.config.loop= (this.config.loop) ? "&loop=1" : "videos";
	}
	else if (notification === 'GET_VIDEOS') {
		self.getVideos();
	}
	else if (notification === 'GET_AUTOPLAY') {
		self.sendSocketNotification("Autoplay",self.getAutoPlay());
	}
	else if (notification === 'GET_LOOP') {
		self.sendSocketNotification("Loop",self.getLoop());
	}
	},
})
	   
	