import React, { useEffect } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../selectors";

function HomePage({ children }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const history = useNavigate();
  useEffect(() => {
    if (isAuthenticated == true) {
      history("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {(isAuthenticated == false || isAuthenticated == undefined) && (
        <Layout title="Home" content="Strona główna">
          <div className="h-[100vh]  min-h-[730px] w-screen bg-[url('files/2.jpg')] bg-cover bg-left bg-no-repeat">
            <div className="flex h-full w-full items-center justify-center backdrop-blur-sm">
              {children}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
export default HomePage;
