import nextConnect from 'next-connect';

const handler = nextConnect();

handler.post(async (req, res) => {
	console.log(req);
	const { email, name, password } = req.body;
	console.log(email, name, password);
});
