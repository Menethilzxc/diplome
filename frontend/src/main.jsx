import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.jsx';

import './index.css';
import Hotel from './Hotel.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<Hotel />
		</Provider>
	</BrowserRouter>,
);
