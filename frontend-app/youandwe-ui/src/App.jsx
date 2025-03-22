import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import HelpRequestComponent from "./components/HelpRequestComponent";
import { isUserLoggedIn } from "./services/AuthService.js";
import LoginComponent from "./components/LoginComponent";
import SignupComponent from "./components/SignupComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListHelpRequestComponent from "./components/ListHelpRequest.jsx";
import HomeComponent from "./components/HomeComponent.jsx";

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:8080 */}
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route
            path="/helpRequest"
            element={
              <AuthenticatedRoute>
                <HelpRequestComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/helpRequests"
            element={
              <AuthenticatedRoute>
                <ListHelpRequestComponent />
              </AuthenticatedRoute>
            }
          ></Route>{" "}
          {/* http://localhost:8080/add-helpRequest */}
          <Route
            path="/add-helpRequest"
            element={
              <AuthenticatedRoute>
                <HelpRequestComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          {/* http://localhost:8080/update-helpRequest/1 */}
          <Route
            path="/update-helpRequest/:id"
            element={
              <AuthenticatedRoute>
                <HelpRequestComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          {/* http://localhost:8080/signup */}
          <Route path="/signup" element={<SignupComponent />}></Route>
          {/* http://localhost:8080/login */}
          <Route path="/login" element={<LoginComponent />}></Route>
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
