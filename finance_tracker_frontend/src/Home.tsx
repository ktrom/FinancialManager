import React from 'react';
import {useParams} from "react-router";
import styled from "@emotion/styled";
import SidebarContent from "./SidebarContent";
import FinancesMainPage from "./FinancesMainPage";
import {MainContent} from "./Enums/MainContent";

const Wrapper = styled.body({
    display: "grid",
    gridTemplateAreas: "'header header' 'aside main' 'footer footer'",
    gridTemplateColumns: "1fr 6fr",
    backgroundColor: "darkgray",
});

const Header = styled.div({
    gridArea:"header",
    backgroundColor:"aqua",
});
    const Main = styled.div({
        gridArea:"main",
        backgroundColor:"grey",

    });

    const Aside = styled.div({
        gridArea:"aside",
    });

const Footer = styled.div({
    gridArea:"footer",
    backgroundColor:"pink",
})

function Home(){
    // @ts-ignore
    const { username } = useParams();
    const [content, setContent] = React.useState<MainContent>(MainContent.Main);
return (
    <Wrapper className="wrapper">
        <Header className="header">header</Header>
        <Main className="main"><FinancesMainPage content={content}/></Main>
        <Aside className="aside"><SidebarContent setContent={setContent}/></Aside>
        <Footer className="footer">footer</Footer>
    </Wrapper>
);

}

export default Home;