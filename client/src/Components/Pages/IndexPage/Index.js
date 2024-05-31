import React, { useEffect } from "react";
import IndexNav from "../../IndexNav";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  LeftSide,
  RightSide,
  LeftWrapper,
  Title,
  Text,
  Button,
  SvgItem,
} from "./Styled";


const Index = () => {
  let navigate= useNavigate();
  useEffect(() => {
    document.title = "SprintGo"
  }, [])
  return (
    <>
      <IndexNav />
      <Container>
        <Content>
          <LeftSide>
            <LeftWrapper>
              <Title>            Streamline Your Projects, Boost Productivity, and Achieve Success</Title>
              <Text>
              With SpringGo, managing your projects has never been easier. Our comprehensive project management system offers powerful tools and features to help you plan, execute, and track your projects with efficiency and precision. From task management to team collaboration, SpringGo has everything you need to drive your projects forward and deliver results.

              </Text>
              <Button onClick={() => navigate("/register")}>
                Sign up - it's free
              </Button>
            </LeftWrapper>
          </LeftSide>
          <RightSide>
            <SvgItem src="https://www.simplilearn.com/ice9/free_resources_article_thumb/project_management_coursefees.jpg" />
          </RightSide>
        </Content>
      </Container>
    </>
  );
};

export default Index;
