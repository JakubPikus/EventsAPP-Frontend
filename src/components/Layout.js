import React from "react";
import Navbar from "./Navbar";
import { HeadProvider, Title, Meta } from "react-head";

function Layout({ title, content, children }) {
  return (
    <>
      <HeadProvider>
        <Title>{title}</Title>
        <Meta name="example" content={content} />
      </HeadProvider>
      <>{children}</>
      <Navbar></Navbar>
    </>
  );
}
Layout.defaultProps = {
  title: "Aplikacja Rozrywkowa",
  content: "Strona główna",
};

export default Layout;
