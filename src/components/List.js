import React, { useEffect, useState } from 'react';

function List({ isLoading, people = [], setPeople, onSelect, filter }) {
	const [filteredNames, setFilteredNames] = useState([]);
	useEffect(() => {
		if (filter === '') {
			setFilteredNames(people);
		} else {
			setFilteredNames(
				people.filter((person) => {
					return person.name.toLowerCase().includes(filter);
				})
			);
		}
	}, [people, filter]);
	const handleDelete = (e, name) => {
		e.preventDefault();
		setPeople(people.filter((person) => person.name !== name));
	};
	return (
		<div>
			<ol className='flex flex-col items-center gap-2'>
				{isLoading ? (
					<p>Loading....</p>
				) : (
					filteredNames.map((person) => (
						<li className='flex gap-4 justify-between list-decimal'>
							<div onClick={() => onSelect(person.name)}>
								<h1>{person.name}</h1>
							</div>{' '}
							<div>
								<button
									className='px-4 py-2 bg-red-500 text-white rounded-xl'
									onClick={(e) => {
										handleDelete(e, person.name);
									}}
								>
									Delete
								</button>
							</div>
						</li>
					))
				)}
			</ol>
		</div>
	);
}

export default List;
