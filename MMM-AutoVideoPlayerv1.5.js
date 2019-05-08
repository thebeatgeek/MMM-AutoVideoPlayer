Module.register("MMM-AutoVideoPlayer", {
	//default module config.
	defaults: {
		initialLoadDelay: 5150,
		videoDir: "videos"
		menuDirection; "row",
		playerSize: { width: 960, height: 530, },
		autoPlay: "true",
		loop: "true",
	},
	
	self: null
	player: null,
	videos: null,
	autoplay: null,
	loop: null,
	
	requiresversion: "2.1.0",
	
	getStyles: function() {
		return ["MMM-AutoVideoPlayer.css"];
	},
	
	//Define start sequence.
	start function() { 
		 Log.info("Starting module: " + this.name);
		 self = this;
		
		 self.sendSocketNotification("CONFIG", self.config);
		 self.getVideos();
	 },
	 
	 getVideos: function() {
	 	 this.sendSocketNotification("GET_VIDEOS");
	 },

	 socketNotificationReceived: function(notification, payload) {
		 Log.log("notification received=" + notificaiton);
		 if (notification === "STARTING_MODULE") {
			 this.processInfo(payload);
		 } else if (notificaiton == "Videos") {
			 this.videos = payload;
			 if (this.videos != null) {
				 Log.log("videos files=" + this.videos);
		     } else
				 Log.error("===> no videos filenames returned, check the  videosDir config entry <===")
		 } else if (notification == "Starting module") {
			 this.vidoes = payload
			 if (self.videos != null) {
				 Log.log("videoDir=" + this.videos);
				 self.autoplay(this.videos);
				 self.updateDom(self.config.initialLoadDelay);
			 } else
				Log.error("===> no video returned check autoplay config entry <===");
		
		 }
	 },
	 
	 createautoplay: function(autoplay) {
		 self.autoplay = {};
		 for (var i = 0; i < this.config.videos.length; i++) {
			 videos += this.config.autoplay[i];
			 if (i + 1 < this.config.videos.length)
				vidoes += autoplay;
		 }
	 },
	
	 //Override dom generator
	 getDom: function() {
	
	  if (self.videos != null) {	
		 var wrapper = document.createElement("vid");
		 menu.classname = "navMenu";
		 menu.id = this.identifier + "_menu";
		 menu.style.flexDirection = this.config.direction;
		 wrapper.appendChild(menu);
		
	     //video controls
		 let videos = document.createElement("videos");
		 videos.width = self.config.playerSize.width;
		 vidoes.height = self.config.playerSize.height;
		 videos.id = "player";
		 videos.autoplay = "modules/" + this.name + "/" + sefl.config.autoplay;
			 videos.addEventListener("ended", funcition() {
				 videos.controls = false;
				 videos.load();
	 });			 
	 createAutoPlay: function("autoplay") { 
		 let autoplay = document.createElement("videos");
		 autoplay.classname = "autoplay";
		 autoplay.setAttribute("data-video-src", "modules/" + self.name + "/" + this.config.videoDir + "/" + videos);
		 autoplay.addEventListener("Starting module", self.swapVidoe);
			var vid = document.getElementById("videos");
			vid.autoplay = true;
			vid.load();
		 
	 createControlsLoop: funciton("loop") {
		let loop = document.createElement("loop");
		loop.classname = "loop";
		loop.setAttribute(this.config.loop) ? "&loop=1" : "videos";
		loop.addEventListener("ended", function() {
			var vid = document.getElementById("videos");
			vid.loop = true;
			vid.load();
		 
		});
		self.player = video;
		wrapper.appendChild(video);
		let autoplay = document.createElement("div");
		autoplay.id = "autoplay";
		wrapper.appendChid(autoplay);
		for (var i = 0; < self.videos.length; i++) {
			 autoplay.appendChild(this.autoplay(self.videos[i], self.config.loop, video));
		}
		
		 console.log(wrapper.innerHTML);
	  }
	  return wrapper;
	},	
	
});
	
