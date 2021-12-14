import React from 'react';
import {
   HomeSectionContainer,
   HomeSectionTypography,
   HomeSectionThumbnail,
   Handwave,
} from './HomeSectionElements';
import handwavesign from './waving-hand-sign.svg';
import { ReactComponent as AppDevelopment } from './appDevelopment.svg';
import { BiLinkExternal } from 'react-icons/bi';

const index = () => {
   return (
      <HomeSectionContainer>
         <div className="homeSection-wrapper">
            <HomeSectionTypography>
               <h1>
                  Hi There!{' '}
                  <Handwave
                     role="img"
                     aria-labelledby="handwave"
                     src={handwavesign}
                     alt="handwave"
                  ></Handwave>
               </h1>
               <h2>
                  I'm <span> &lt; Amandeep Singh /&gt;.</span>
               </h2>

               <p>
                  {' '}
                  I’m a fullstack developer specializing in developing and
                  designing exceptional and beautiful web applications. My
                  experience as a self taught developer allows me to come up
                  with smart solutions to technical challenges. I also write
                  articles about web on{' '}
                  <span>
                     <a
                        href="http://codersleague.herokuapp.com/signup"
                        rel="noreferrer"
                     >
                        Coders League.{' '}
                        <BiLinkExternal
                           size="1rem"
                           title="link"
                           style={{
                              marginBottom: '0.5rem',
                              marginLeft: '-0.5rem',
                           }}
                        />
                     </a>
                  </span>
               </p>
            </HomeSectionTypography>
            <HomeSectionThumbnail>
               <AppDevelopment />
            </HomeSectionThumbnail>
         </div>
      </HomeSectionContainer>
   );
};

export default index;
