import { AppProvider } from "./providers";
import App from './App';

function AppRenderer() {

  return (
      <AppProvider>
          <App />
      </AppProvider>
  )
}

export default AppRenderer;
