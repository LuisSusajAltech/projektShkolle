import React from "react";

import VideoBanner from "components/Video-Banner";
import Features from "components/Features";
import Banner from "components/Banner";
function Home({isLogged, isMobile}) {
  return (
    <>
      <Banner isLogged={isLogged}/>
      <Features isMobile={isMobile}/>
      <VideoBanner isMobile={isMobile}/>
    </>
  );
}

export default Home;
