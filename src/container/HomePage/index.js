import React from 'react'
import Layout from '../../componenti/Layout';
import background from "../../img/AdobeStock_287039717.jpeg";



/**
* @author
* @function Homepage
**/

const Homepage = (props) => {

  return (
    <div >
      <Layout>
      <div style={{ 
          width: "100%",
          height: "560px",
          marginLeft: "300px",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          // border: "2px solid #e9385a",
          // backgroundImage: `url(${background})`
         }} 
          />

      </Layout>
    </div>
  );

}
export default Homepage