import "react-native-get-random-values";
import "react-native-gesture-handler";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./data/store";
import useCachedResources from "./lib/useCachedResources";
import Navigation from "./navigation";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
