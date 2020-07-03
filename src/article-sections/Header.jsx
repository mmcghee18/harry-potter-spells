import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { Scrollama, Step } from "react-scrollama";
import { ArrowheadDownOutline } from "@styled-icons/evaicons-outline/ArrowheadDownOutline";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  height: 90vh;
  margin-left: 50px;
  margin-right: 50px;
`;

const DownArrow = styled(ArrowheadDownOutline)`
  height: 40px;
  margin-top: 15px;
`;

const Title = styled.h1`
  font-size: 6em;
  margin-bottom: 0;
  text-align: center;
`;

const Subtitle = styled.h2`
  margin-bottom: 8vh;
`;

const Link = styled.a`
  text-decoration: underline;
  color: white;
  &:hover {
    text-decoration: underline;
    color: #1890ff;
  }
`;

const Introduction = styled.div`
  margin-top: 8vh;
  text-align: center;
  font-size: 16px;
`;

const Header = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [props, set, stop] = useSpring(() => ({ opacity: 1 }));

  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };

  set({ opacity: currentStep === 4 ? 0 : 1 });

  return (
    <Wrapper>
      <Scrollama onStepEnter={onStepEnter} offset={0.2}>
        <Step data={0} key={0}>
          <Title>"It's LeviOsa, not LevioSA!"</Title>
        </Step>
        <Step data={1} key={1}>
          <Subtitle>Visualizing every spell in Harry Potter</Subtitle>
        </Step>
        <Step data={2} key={2}>
          <h3>
            By{" "}
            <Link target="_blank" href="https://mmcghee18.github.io/">
              <strong>Michelle McGhee</strong>
            </Link>
          </h3>
        </Step>
        <Step data={3} key={3}>
          <Introduction>
            <p>
              Recently, I've been revisiting a comforting classic, the Harry
              Potter series. 🤓⚡️📖
            </p>
            <p>
              I present to you, every single spell ever uttered in the Harry
              Potter book universe, laid out for you to explore.
            </p>
          </Introduction>
        </Step>
        <Step data={4} key={4}>
          <animated.div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10vh",
              ...props,
            }}
          >
            <div>Scroll to advance the story</div>
            <DownArrow />
          </animated.div>
        </Step>
      </Scrollama>
    </Wrapper>
  );
};

export default Header;
