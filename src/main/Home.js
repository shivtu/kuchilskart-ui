import React, { createContext, useEffect, useState } from "react";
import NavigationMenu from "./navigation-menu/NavigationMenu";
import Login from "./Login";

export const AppContext = createContext(null);

export const Home = () => {
  const [appData, setAppData] = useState("");
  const [isAppDataReady, setIsAppDataReady] = useState(false);

  useEffect(() => {
    setIsAppDataReady(Boolean(appData.token?.jwt && appData.utility?.response));
  }, [appData]);

  return (
    <>
      {isAppDataReady ? (
        <AppContext.Provider value={appData}>
          <NavigationMenu />
        </AppContext.Provider>
      ) : (
        <Login setAppData={setAppData} />
      )}
    </>
  );
};
