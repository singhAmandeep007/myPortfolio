import styled from 'styled-components';
import { RiExternalLinkFill } from 'react-icons/ri';

export const ExternalLink = styled.a`
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  text-decoration-thickness: 0.1rem;
  font-size: ${({ $fontSize }) => $fontSize};
  white-space: nowrap;
  svg {
    vertical-align: super;
    font-size: 75%;
  }
`;
export const ExternalLinkWithIcon = ({ href, fontSize = '1rem', children }) => {
  return (
    <ExternalLink
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      $fontSize={fontSize}
    >
      {children} <RiExternalLinkFill />
    </ExternalLink>
  );
};

export const SectionContainer = styled.section`
  width: 100%;
  min-height: 100vh;
`;
export const Wrapper = styled.div`
  width: 80%;
  padding-top: 10rem;
  height: 100%;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0px 0px 4rem;
  width: 100%;
  font-size: 2.5rem;
  white-space: nowrap;

  &::after {
    content: '';
    display: block;
    position: relative;
    width: 100%;
    height: 1px;
    margin-left: 2rem;
    background-color: var(--color-font);
  }
`;
