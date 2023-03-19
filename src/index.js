import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

// me
import GlobalStyles from './components/GlobalStyles';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: `Quicksand !important`,
                },
            }}
        >
            <GlobalStyles>
                <Provider store={store}>
                    <UserAuthContextProvider>
                        <App />
                    </UserAuthContextProvider>
                </Provider>
            </GlobalStyles>
        </ConfigProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
