import React, { createContext, useReducer } from 'react';

const initialState = {
	status: 'add',
	selected: '',
};
export const StatusContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'EDIT':
			return {
				status: 'edit',
				selected: action.payload,
			};
		case 'ADD':
			return {
				status: 'add',
				selected: '',
			};
		default:
			return initialState;
	}
};
function StatusContextProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StatusContext.Provider value={{ state, dispatch }}>
			{props.children}
		</StatusContext.Provider>
	);
}

export default StatusContextProvider;
