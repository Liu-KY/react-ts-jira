import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/Lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu } from "antd";
import { useTitle } from "utils";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  useTitle("主页");

  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu
                items={[{ label: <a onClick={logout}>登出</a>, key: "logout" }]}
              />
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi,{user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  height: 100vh;
`;

const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
