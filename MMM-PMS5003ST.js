Module.register("MMM-PMS5003ST", {
	// defualt module config 
	defaults: {
		updateInterval: 1, // UNIT: seconds
	},

	// define sstart sequence 
	start: function() {
		Log.info("Starting module: "+ this.name);

		this.loaded 		= false;
		this.pm1_0			= "-"; 
		this.pm2_5			= "-"; 
		this.pm10_0			= "-"; 
		this.formaldehyde	= "-"; 
		this.temperature 	= "-"; 
		this.humidity		= "-"; 

		this.update();
		setInterval(
			this.update.bind( this ),
			this.config.updateInterval * 1000
		);
	},

	update: function() {
		this.sendSocketNotification("REQUEST", this.config);
	},

	// Override dom generator
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "bright light big";

		if (!this.loaded) {
			wrapper.innerHTML = "Loading ...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		var temperature 	= document.createElement("div");
		temperature.innerHTML = "온도: "+ this.temperature +" ℃";
		temperature.className += "MMM-PMS5003ST_STRING";
		wrapper.appendChild( temperature );

		var humidity 		= document.createElement("div");
		humidity.innerHTML = "습도: "+ this.humidity +" ％";
		humidity.className += "MMM-PMS5003ST_STRING";
		wrapper.appendChild( humidity );

		var pm1_0 			= document.createElement("div");
		pm1_0.innerHTML = "PM 1.0: "+ this.pm1_0 +" μ g/m3";
		pm1_0.className += "MMM-PMS5003ST_STRING";
		wrapper.appendChild( pm1_0);

		var pm2_5 			= document.createElement("div");
		pm2_5.innerHTML = "PM 2.5: "+ this.pm2_5 +" μ g/m3";
		pm2_5.className += "MMM-PMS5003ST_STRING";
		wrapper.appendChild( pm2_5);

		var pm10_0 			= document.createElement("div");
		pm10_0.innerHTML = "PM10.0: "+ this.pm10_0 +" μ g/m3";
		pm10_0.className += "MMM-PMS5003ST_STRING";
		wrapper.appendChild( pm10_0);

		var formaldehyde 		= document.createElement("div");
		formaldehyde.innerHTML = "폼알데히드: "+ this.formaldehyde +" mg/m³";
		formaldehyde.className += "MMM-PMS5003ST_STRING";
		wrapper.appendChild( formaldehyde );

		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'DATA') {
			this.pm1_0			= payload.pm1_0; 
			this.pm2_5			= payload.pm2_5; 
			this.pm10_0			= payload.pm10_0; 
			this.formaldehyde	= payload.formaldehyde; 
			this.temperature 	= payload.temperature; 
			this.humidity		= payload.humidity; 

			this.loaded = true;
			this.updateDom();
		}
	},
});

