import React, { createContext, useReducer } from 'react';

const initialState = {
	openModal: false,
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'OPEN_MODAL':
			return {
				openModal: true,
			};
		case 'CLOSE_MODAL':
			return {
				openModal: false,
			};
		default:
			return initialState;
	}
};

export const ModalContext = createContext();

function ModalContextProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<ModalContext.Provider value={{ state, dispatch }}>
			{props.children}
		</ModalContext.Provider>
	);
}

export default ModalContextProvider;
