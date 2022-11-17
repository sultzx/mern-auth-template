import React from "react"
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navigationbar } from "./components/NavigationBar"

function App() {
  const { login, logout, token, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated
    }}>
      <div className="container">

        <BrowserRouter>
          <Navigationbar />
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>

  );
}

export default App;
