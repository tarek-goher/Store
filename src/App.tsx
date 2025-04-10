
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/index'; // تأكد من استيراد الصفحة بشكل صحيح
import { Hero } from './components/index'; // تأكد من استيراد الصفحة بشكل صحيح


function App() {
  return (
    <Router> {/* التغليف بواسطة Router */}
      <div>
        {/* تحديد المسارات */}
        <Routes>
        <Route path="/" element={<Hero />} />  {/* صفحة إضافية */}
          <Route path="/HomePage" element={<HomePage />} />  {/* الصفحة الرئيسية */}
          <Route path="*" element={<Hero />} />  {/* صفحة إضافية */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
