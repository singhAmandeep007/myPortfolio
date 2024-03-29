import React from 'react';
import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Resume from '../Components/Resume';

import {
  SectionContainer,
  Wrapper,
  ExternalLinkWithIcon,
} from '../Components/CommonElements';

import handwavesign from '../Assets/waving-hand-sign.svg';

const HomePage = () => {
  return (
    <SectionContainer>
      <HomeSectionWrapper>
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
            I'm <span>&lt;{data.devName} /&gt;</span>
          </h2>

          <div>
            <ReactMarkdown
              children={data.shortDescription}
              components={{
                a: ({ node, ...props }) => (
                  <ExternalLinkWithIcon {...props} fontSize="1.5rem" />
                ),
              }}
            />
          </div>
        </HomeSectionTypography>
        <HomeSectionResume>
          <Resume
            devName={data.devName}
            devTitle={data.devTitle}
            devResumeDownloadLink={data.devResumeDownloadLink}
          />
        </HomeSectionResume>
      </HomeSectionWrapper>
    </SectionContainer>
  );
};

export default HomePage;

const data = {
  devName: 'Amandeep Singh',
  shortDescription: `I’m  a fullstack developer specializing in developing and designing exceptional and beautiful web applications. 
	\n My experience as a self taught developer allows me to come up with smart solutions to technical challenges.
	\n I also write articles about web on **[Coders League](https://codersleague.onrender.com/)**.`,
  devTitle: 'Full Stack Developer',
  devResumeDownloadLink:
    'https://drive.google.com/uc?export=download&id=18rEEOpy5_eDH5KGAwDRCtSQSkO7fEjF3',
};

const waveAnimation = keyframes`
	0% {
		transform: rotate(-14deg);
	}
	10% {
		transform: rotate(14deg);
	}
	20% {
		transform: rotate(-8deg);
	}
	30% {
		transform: rotate(14deg);
	}
	40% {
		transform: rotate(-4deg);
	}
	50% {
		transform: rotate(10deg);
	}
	60% {
		transform: rotate(0deg);
	} 
	/* Reset for the last half to pause */
	100% {
		transform: rotate(0deg);
	}
`;

const HomeSectionWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;

  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    flex-direction: column;
  }
`;

const HomeSectionTypography = styled.div`
  margin: 1rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: normal;
  }
  h2 {
    font-size: 3.5rem;
    margin-bottom: 2.5rem;
    white-space: nowrap;

    span {
      color: var(--color-primary);
      text-decoration: underline;
      word-break: keep-all;
    }
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: normal;
  }

  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    h2 {
      font-size: 3rem;
    }
  }
`;

const HomeSectionResume = styled.div`
  margin: 1rem;

  font-size: 0.7rem;

  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    font-size: 1rem;
  }
`;

const Handwave = styled.img`
  height: 3rem;
  width: 3rem;
  animation-name: ${waveAnimation};
  animation-duration: 2.1s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
`;
