import React, { createContext, useEffect, useReducer } from 'react';
import { getData } from '../api/people';
const initialState = {
	people: [],
	count: 31,
	loading: false,
	errorMsg: '',
	miniLoader: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING_START':
			return {
				...state,
				errorMsg: '',
				loading: true,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				people: action.payload,
				errorMsg: '',
				loading: false,
			};
		case 'ADD_PERSON':
			return {
				...state,
				errorMsg: '',
				people: [...state.people, action.payload],
			};
		case 'EDIT_PERSON':
			return {
				...state,
				errorMsg: '',
				people: state.people.map((user) => {
					return user.name === action.name
						? action.payload
						: user;
				}),
			};
		case 'DELETE_PERSON':
			return {
				...state,
				people: state.people.filter(
					(user) => user.name !== action.payload
				),
			};
		case 'INCREMENT_COUNT':
			return {
				...state,
				count: state.count + 1,
			};
		case 'MINI_LOADING':
			return {
				...state,
				miniLoader: true,
			};
		case 'MINI_STOP':
			return {
				...state,
				miniLoader: false,
			};
		case 'FETCH_FAIL':
			return {
				...state,
				loading: false,
				errorMsg: 'Unable to connect to the server',
			};
		default:
			return initialState;
	}
};

export const PeopleContext = createContext();

function PeopleContextProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		(async () => {
			dispatch({ type: 'LOADING_START' });
			const [data, error] = await getData();
			if (error === 1) {
				dispatch({ type: 'FETCH_FAIL' });
			} else {
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			}
		})();
	}, []);
	return (
		<PeopleContext.Provider value={{ state, dispatch }}>
			{props.children}
		</PeopleContext.Provider>
	);
}

export default PeopleContextProvider;
