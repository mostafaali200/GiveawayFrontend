import { Layout } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home"; // ✅ بدون النقطة
import Success from "./pages/Success"; // ✅ بدون النقطة
import StatsBar from "./components/StatsBar";

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#2596be",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 20,
            textDecoration: "none",
          }}
        >
          🎁 سحب السيارة
        </Link>
      </Header>

      <Content style={{ padding: 0, margin: 0 }}>
        {/* ✅ لا تحدد maxWidth أو margin:auto لأن Chakra تتولى التصميم */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Content>

      <Footer style={{ textAlign: "center", color: "#555" }}>
        © {new Date().getFullYear()} مصطفى – سحب السيارة
      </Footer>
    </Layout>
  );
}
