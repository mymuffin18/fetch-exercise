import React, { useContext } from 'react';

import { ModalContext } from './context/ModalContextProvider';
import { StatusContext } from './context/StatusContextProvider';

import Modal from './Modal';

function Header({ filter, setFilter }) {
	const { state } = useContext(StatusContext);
	const { state: modalState, dispatch } = useContext(ModalContext);
	// useEffect(() => setName(selected), [selected]);
	// const fetchOne = async (e) => {
	// 	e.preventDefault();
	// 	const data = await fetchPerson(count);

	// 	setPeople([...people, data]);
	// 	setCount((count) => count + 1);
	// };
	// const addPerson = (e) => {
	// 	e.preventDefault();
	// 	if (status === 'add') {
	// 		// setCount((count) => (count += 1));
	// 		setPeople([...people, { name: name }]);
	// 	} else if (status === 'edit') {
	// 		setPeople(
	// 			people.map((person) => {
	// 				return person.name === selected
	// 					? { name: name }
	// 					: person;
	// 			})
	// 		);
	// 		setStatus('add');
	// 	}

	// 	setName('');
	// };
	return (
		<div className='p-4 h-1/4 bg-gray-400 flex justify-center flex-col items-center'>
			<div>
				<h1>Fetch Exercise</h1>
			</div>
			<div className='flex gap-4 mt-2'>
				<button
					className='px-4 py-2 bg-blue-500 text-white rounded-lg'
					onClick={() => dispatch({ type: 'OPEN_MODAL' })}
				>
					{state.status === 'add' ? (
						<span>Add</span>
					) : (
						<span>Edit</span>
					)}
				</button>
				{modalState.openModal && <Modal />}
				<button
					className='px-4 py-2 bg-blue-500 text-white rounded-lg'
					// onClick={(e) => fetchOne(e)}
				>
					Fetch
				</button>
			</div>
			<div className='flex gap-4 mt-2'>
				<input
					type='text'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default Header;
