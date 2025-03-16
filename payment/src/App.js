import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Layout, Button, Drawer, Spin, Flex } from "antd";
import MenuWallet from "./components/WalletButton";
import MyWallets from "./pages/MyWallets";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

function AppRouter() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    fetchWallets();
  }, [isAuthenticated]);

  const fetchWallets = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return;
    }

    try {
      const response = await axios.get("http://192.168.1.75:8000/api/wallets/", {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      setWallets(response.data);
      console.log("Wallets:", response.data);
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/verify/", {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsAuthenticated(response.status === 200);
    } catch {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (loading) {
    return <div style={{ justifyContent: 'space-around', alignItems: 'center', display: 'flex', flexDirection: 'row' }}><Spin size="large" sthyle={{ marginTop: '40%'}} /></div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "Arial", fontWeight: "bolder", fontSize: "large" }}><Link to="/" style={{ color: "#ffffff" }}>Home</Link></div>
        <div>
          <MenuWallet />
          <Button type="primary" onClick={() => setOpen(true)}>
            &gt;&gt;
          </Button>
          <Drawer title="Basic Drawer" onClose={() => setOpen(false)} open={open}>
            <Flex vertical='vertical' style={{ justifyContent: "space-between", height: '88vh' }}>
              <div>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
              </div>
              <Button type="primary" onClick={handleLogout} style={{ marginRight: 10 }}>Logout</Button>
            </Flex>
          </Drawer>
        </div>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
          <Route path="/wallet" element={<MyWallets wallets={wallets} setWallets={setWallets} />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;