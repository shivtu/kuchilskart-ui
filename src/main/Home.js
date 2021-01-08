import React, { createContext, useEffect, useState } from "react";
import NavigationMenu from "./navigation-menu/NavigationMenu";
import Login from "./Login";
import { utilityData } from "./shared/MockData";

export const AppContext = createContext(null);

export const Home = () => {
  // const [appData, setAppData] = useState("");
  const [appData, setAppData] = useState(utilityData);
  const [isAppDataReady, setIsAppDataReady] = useState(false);

  useEffect(() => {
    setIsAppDataReady(Boolean(appData.jwtToken && appData.utilityData));
    console.log("appData", appData);
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
