module.exports = function(mongoose) {  
	var dbURI = 'mongodb://localhost/moscordnewsapp';
	var dbAtlasURI = 'mongodb+srv://moscordUser:moscordPassword@moscordnewsapp-tj9d9.mongodb.net/test?retryWrites=true&w=majority';
	mongoose.connect(dbAtlasURI, {useNewUrlParser: true});

	mongoose.connection.on('connect', function(){
		console.log('Mongoose connected on ' + dbURI);
	});

	mongoose.connection.on('error', function(err){
		console.log('Mongoose connection : ' + err);
	}); 
}