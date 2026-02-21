import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import mku from "../../assets/images/mku.png";
import pwl from "../../assets/images/pwl.jpg";
import csp from "../../assets/images/csp.jpg";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
          Dynamic code craftsman from Nairobi. I build blockchain solutions that solve real African problems
            <br />Always chasing harder problems, shipping faster, and mentoring the next wave of Kenyan devs. React flows like poetry in my hands, Solidity is my canvas, Kali Linux my playground.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "Mount Kenya University",
                p: "Bachelors of Computer Engineering",
                image: mku,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Powerlearn project",
                p: "Backend development",
                image: pwl,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "Cisco academy",
                p: "Cybersecurity analyst",
                image: csp,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
