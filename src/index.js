import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PeopleContextProvider from './components/context/PeopleContextProvider';
import ModalContextProvider from './components/context/ModalContextProvider';
ReactDOM.render(
	<React.StrictMode>
		<PeopleContextProvider>
			<ModalContextProvider>
				<App />
			</ModalContextProvider>
		</PeopleContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
