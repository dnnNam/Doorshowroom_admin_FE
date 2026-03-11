import { Toaster } from "sonner";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
}

export default App;
