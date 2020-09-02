# MMM-PMS5003ST
Additional Module for MagicMirror²  https://github.com/alprogs/MMM-PMS5003ST

## Dependencies
An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)

## Installation
Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/alprogs/MMM-PMS5003ST
```

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
modules: [
	{
		module: 'MMM-PMS5003ST',
		position: 'top_right',
		config: {
			updateInterval: 10 // seconds
		},
	},
]
```
