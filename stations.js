﻿var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var stationSchema = mongoose.Schema({
	name: String
});

mongoose.connect("mongodb://localhost:27017/usersdb",{
	useMongoClient: true
});

var Station = mongoose.model('Station', stationSchema);
module.exports = Station;

Station.find(function(err, stations){
	if (err) return console.error('Database error');
	if (!stations.length){
		new Station({
			name: 'Минск-Пассажирский'
		}).save(function(err){
			if (err) console.error('Error saving the object to DB');
		});
		new Station({
			name: 'Барановичи-Полесские'
		}).save(function(err){
			if (err) console.error('Error saving the object to DB');
		});
	}
});