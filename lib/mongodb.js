import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

let cachedClient;
let cachedDb;

if (!process.env.MONGODB_URI) {
	throw new Error('Please add your Mongo URI to .env.local');
}

export const connectToDatabase = async () => {
	// check the cached.
	if (cachedClient && cachedDb) {
		// load from cache
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}

	// Connect to cluster
	let client = new MongoClient(uri, options);
	await client.connect();
	let db = client.db(process.env.MONGODB_DB);

	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb,
	};
};
