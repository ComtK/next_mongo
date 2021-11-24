import React, { useState } from 'react';
import _ from 'lodash';

const Join = () => {
	const [account, setAccount] = useState({
		email: '',
		password: '',
		name: '',
	});

	const handleAccount = (e) => {
		const temp = _.cloneDeep(account);
		temp[e.target.name] = e.target.value;
		setAccount(temp);
	};

	const handleJoin = async () => {
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(account),
		});

		if (res.status === 201) {
			const userObj = await res.json();
			console.log(userObj);
			console.log('success');
		} else {
			console.log('error');
		}
	};

	return (
		<div>
			<input type="text" name="email" value={account.email} onChange={handleAccount} />
			<br />
			<input type="text" name="password" value={account.password} onChange={handleAccount} />
			<br />
			<input type="text" name="name" value={account.name} onChange={handleAccount} />
			<br />
			<button type="button" onClick={handleJoin}>
				가입
			</button>
		</div>
	);
};

export default Join;
