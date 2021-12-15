import { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from './context/ModalContextProvider';
import { PeopleContext } from './context/PeopleContextProvider';
import { StatusContext } from './context/StatusContextProvider';

function Modal(props) {
	const [name, setName] = useState({ first_name: '', last_name: '' });
	const { state, dispatch: dispatchStatus } = useContext(StatusContext);
	const { dispatch: peopledispatch } = useContext(PeopleContext);

	const { dispatch } = useContext(ModalContext);
	const whenSelected = (selected) => {
		if (selected) {
			const tempArr = selected.split(' ');

			if (tempArr.length < 3) {
				setName({ first_name: tempArr[0], last_name: tempArr[1] });
			} else {
				setName({
					first_name: `${tempArr[0]} ${tempArr[1]}`,
					last_name: tempArr[2],
				});
			}
		}
	};
	useEffect(() => whenSelected(state.selected), [state.selected]);
	const handleButton = () => {
		if (name.last_name === '') {
			setName({
				first_name: name.first_name,
				last_name: 'robot',
			});
		} else if (state.status === 'add') {
			peopledispatch({
				type: 'ADD_PERSON',
				payload: { name: `${name.first_name} ${name.last_name}` },
			});
			setName({ first_name: '', last_name: '' });
			dispatch({ type: 'CLOSE_MODAL' });
		} else if (state.status === 'edit') {
			// do this
			peopledispatch({
				type: 'EDIT_PERSON',
				name: state.selected,
				payload: { name: `${name.first_name} ${name.last_name}` },
			});
			dispatchStatus({ type: 'ADD' });
			setName({ first_name: '', last_name: '' });
			dispatch({ type: 'CLOSE_MODAL' });
		}
	};

	const handleClose = () => {
		setName({ first_name: '', last_name: '' });
		dispatchStatus({ type: 'ADD' });
		dispatch({ type: 'CLOSE_MODAL' });
	};
	return ReactDOM.createPortal(
		<div className='fixed h-full top-0 w-full flex items-center justify-center modal-bg'>
			<div className='modalContainer glass modalCard px-20 py-5 flex flex-col gap-4'>
				<div className='text-center'>
					<h1 className='text-lg font-bold'>
						{state.status.toUpperCase()}
					</h1>
				</div>

				<div className='flex gap-2'>
					<label htmlFor='first_name'>First name:</label>
					<input
						type='text'
						value={name.first_name}
						onChange={(e) =>
							setName({
								...name,
								first_name: e.target.value,
							})
						}
					/>
				</div>
				<div className='flex gap-2'>
					<label htmlFor='last_name'>Last name:</label>
					<input
						type='text'
						value={name.last_name}
						onChange={(e) =>
							setName({
								...name,
								last_name: e.target.value,
							})
						}
					/>
				</div>
				<div className='flex gap-2 justify-center'>
					<button
						className='text-white px-4 py-2 rounded-lg bg-red-700'
						onClick={handleClose}
					>
						Cancel
					</button>
					<button
						className={`${
							state.status === 'add'
								? 'bg-blue-500'
								: 'bg-green-500'
						} text-white px-4 py-2 rounded-lg`}
						onClick={handleButton}
					>
						{state.status === 'add' ? (
							<span>Add</span>
						) : (
							<span>Edit</span>
						)}
					</button>
				</div>
			</div>
		</div>,
		document.getElementById('modal')
	);
}

export default Modal;
