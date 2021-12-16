import React, { useContext, useEffect, useState } from 'react';
import { PeopleContext } from './context/PeopleContextProvider';
import { StatusContext } from './context/StatusContextProvider';

function List({ filter }) {
	const [filteredNames, setFilteredNames] = useState([]);
	const { state, dispatch: peopleDispatch } = useContext(PeopleContext);
	const { dispatch } = useContext(StatusContext);
	useEffect(() => {
		if (filter === '') {
			setFilteredNames(state.people);
		} else {
			setFilteredNames(
				state.people.filter((person) => {
					return person.name.toLowerCase().includes(filter);
				})
			);
		}
	}, [state.people, filter]);
	const handleDelete = (e, name) => {
		e.preventDefault();
		peopleDispatch({ type: 'DELETE_PERSON', payload: name });
	};
	const onSelect = (e, name) => {
		e.preventDefault();
		dispatch({ type: 'EDIT', payload: name });
	};
	return (
		<div>
			<ol className='flex flex-col items-center gap-2'>
				{state.loading ? (
					<img
						src='https://tenor.com/view/hug-gif-22743155'
						alt=''
					/>
				) : (
					filteredNames.map((person) => (
						<li className='flex gap-4 justify-between list-decimal'>
							<div
								onClick={(e) =>
									onSelect(e, person.name)
								}
							>
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
			{state.errorMsg && (
				<h1 className='text-center text-lg text-red-500'>
					{state.errorMsg}
				</h1>
			)}
			{state.miniLoader && (
				<img src='https://tenor.com/view/hug-gif-22743155' alt='' />
			)}
		</div>
	);
}

export default List;
