import { ToastContainer } from 'react-toastify';
import './App.css';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <header className="header">
        <p className='heading'>idea Theorm<sup>TM</sup></p>
      </header>
      <Form/>
    </div>
  );
}

export default App;
