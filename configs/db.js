module.exports = (mongoose) => {   
	var dbAtlasURI = 'mongodb+srv://moscordUser:moscordPassword@moscordnewsapp-tj9d9.mongodb.net/test?retryWrites=true&w=majority';
	mongoose.connect(dbAtlasURI, { 
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	mongoose.connection.on('connect', () => {
		console.log('Mongoose connected on ' + dbURI);
	});

	mongoose.connection.on('error', (err) => {
		console.log('Mongoose connection : ' + err);
	}); 
}