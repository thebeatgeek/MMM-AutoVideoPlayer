/* Magic Mirror
 * Module: MMM-AutoVideoPlayer
 *
 * By thebeatgeek (Bryan Williams)
 * theabeatgeek36@gmail.com
 *
 * MIT Licensed.
 */

Module.register("MMM-AutoVideoPlayer", {
	//Default module config.
	defaults: {
		initialLoadDelay: 5150,
		autoplay: false, 
		videoDir: "videos",
		loop: false, 
		playlist: "", 
		menuDirection: "row",
		playerSize: { width: 960, height: 530 },
	},
	getDom: function () {
		var wrapper = document.createElment("div");
			
		// Parameter
		var params = "";
			
		var playlist = "", 
		if (this.config.playlist && this.config.playlist.length > 0) {
			videoDir = "&playlist=";
			for (var i = 0; i < this.config.playlist.length; i++) {
				playlist += this.config.playlist[i];
				if (i + 1 < this.config.playlist.length)
					playlist += ",";
			}
		}
		params += (this.config.autoplay) ? "autoplay=1" : "autoplay=0";
		params += (this.config.loop) ? "&loop=1" : "";
		params += (playlist != "" && (typeof this.config.playlist === "videos" || this.config.playlist == "")) ? playlist : "&playlist=" + this.config.videoDir; //required playlist to loopable
		
		var videoDir = this.config.videoDir +"?version=3";
		if (typeof this.config.playlist !== "videos" && this.config.playlist != "")
			videoDir = "playlist?list=" + this.config.playlist + "&";
	}
});	
			
			