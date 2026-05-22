// ==========================================
// 1. EXTERNAL IMPORTS (React & External Libraries)
// ==========================================
import { createTheme, ThemeProvider } from "@mui/material/styles";
// ==========================================
// 2. INTERNAL IMPORTS (Context Providers & CSS)
// ==========================================
import { TodosProvider } from "./context/TodosContext";
import { ToastProvider } from "./context/ToastContext";
import TodoList from "./Componts/TodoList";
import "./App.css";

// ==========================================
// 3. THEME CONFIGURATION (Material UI)
// ==========================================
/**
 * Global application theme setup.
 * Configures the premium typography and modern color palette.
 */
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#00695c",
      dark: "#004d40",
      light: "#33ab9f",
    },
  },
});

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================
/**
 * Main App Root Component.
 * Wraps the entire layout inside the required Theme and Context providers.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          {/* Main layout container with centered layout alignment */}
          <div
            className="App"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fdfdfd",
              direction: "rtl", // Right-to-Left layout configuration for Arabic text
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
