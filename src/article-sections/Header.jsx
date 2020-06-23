import React, { useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { Scrollama, Step } from "react-scrollama";
import { ArrowheadDownOutline } from "@styled-icons/evaicons-outline/ArrowheadDownOutline";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  height: 100vh;
`;

const DownArrow = styled(ArrowheadDownOutline)`
  height: 40px;
  margin-top: 15px;
`;

const Header = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [props, set, stop] = useSpring(() => ({ opacity: 1 }));

  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };

  set({ opacity: currentStep === 3 ? 0 : 1 });

  return (
    <Wrapper>
      <Scrollama onStepEnter={onStepEnter} offset={0.2}>
        <Step data={0} key={0}>
          <h1>"It's LeviOsa, not LevioSA!"</h1>
        </Step>
        <Step data={1} key={1}>
          <h2>
            ⚡️ Visualizing the spells mentioned across the Harry Potter series
            ⚡️
          </h2>
        </Step>
        <Step data={2} key={2}>
          <h3>By Michelle McGhee</h3>
        </Step>
        <Step data={3} key={3}>
          <animated.div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "100px",
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
