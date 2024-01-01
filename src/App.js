import logo from './logo.svg';
import './App.css';
import RegisterPage from './Components/RegisterAccount';

function App() {
  return (
    <div>
      <header>
        <h1 header className="app-title"> HỒ SƠ NGƯỜI DÙNG </h1>
      </header>
      <RegisterPage />
      <div>
        {/* Các thành phần khác của ứng dụng */}
        <ThreeScene />
      </div>
    </div>
  );
}

export default App;
