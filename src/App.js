import Header from './components/Header';
import List from './components/List';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getData } from './components/api/people';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [people, setPeople] = useState([]);
	const [status, setStatus] = useState('add');
	const [count, setCount] = useState(31);
	const [selected, setSelected] = useState(undefined);
	const [filter, setFilter] = useState('');
	const onSelect = (name) => {
		setSelected(name);
		setStatus('edit');
	};
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const data = await getData();
			setPeople(data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<div>
			{status}
			<Header
				count={count}
				setCount={setCount}
				people={people}
				setPeople={setPeople}
				selected={selected}
				status={status}
				setStatus={setStatus}
				filter={filter}
				setFilter={setFilter}
			/>
			<List
				people={people}
				setPeople={setPeople}
				isLoading={isLoading}
				setStatus={setStatus}
				onSelect={onSelect}
				filter={filter}
				setFilter={setFilter}
			/>
		</div>
	);
}

export default App;
