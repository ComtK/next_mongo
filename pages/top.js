import React from 'react';
import { connectToDatabase } from '../lib/mongodb';

const Top = ({ movies }) => {
	return (
		<div>
			<h1>Top 1000 Movies of All Time</h1>
			<p>
				<small>(According to Metacritic)</small>
			</p>
			<ul>
				{movies.map((movie, key) => (
					<li key={key}>
						<h2>{movie.title}</h2>
						<h3>{movie.metacritic}</h3>
						<p>{movie.plot}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Top;

export const getStaticProps = async () => {
	const { db } = await connectToDatabase();
	const movies = await db.collection('users').find({}).sort({ metacritic: -1 }).limit(1000).toArray();
	return {
		props: {
			movies: JSON.parse(JSON.stringify(movies)),
		},
	};
};
