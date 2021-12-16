import axios from 'axios';

const API_URL = 'https://swapi.py4e.com/api';
export const getData = async (persons = 30) => {
	let p = [];
	let NUMBER_OF_FETCH = persons / 10;
	let error = 0;
	try {
		for (let i = 1; i <= NUMBER_OF_FETCH; i++) {
			if (i === 1) {
				const res = await axios.get(`${API_URL}/people`);
				res.data.results.map((result) => p.push(result));
			} else {
				const res = await axios.get(`${API_URL}/people/?page=${i}`);
				res.data.results.map((result) => p.push(result));
			}
		}
	} catch (e) {
		error = 1;
	}

	return [p, error];
};

export const fetchPerson = async (count) => {
	try {
		const res = await axios.get(`${API_URL}/people/${count + 1}`);

		return res.data;
	} catch (e) {
		console.log(e);
	}
};
