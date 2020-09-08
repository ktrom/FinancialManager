import {Button, Form} from "react-bootstrap";
import {jsx} from "@emotion/core";
import React from 'react';
import {useParams} from "react-router";
import styled from "@emotion/styled";

const Wrapper = styled.body({
    display: "grid",
    gridTemplateAreas: "'header header' 'aside main' 'footer footer'",
    gridTemplateColumns: "1fr 6fr",
});

const Header = styled.div({
    gridArea:"header",
    backgroundColor:"aqua",
});
    const Main = styled.div({
        gridArea:"main",
        backgroundColor:"lightgreen",

    });

    const Aside = styled.div({
        gridArea:"aside",
        backgroundColor:"yellow",
    });

const Footer = styled.div({
    gridArea:"footer",
    backgroundColor:"pink",
})

function Home(){
    // @ts-ignore
    const { username } = useParams();
return (
    <Wrapper className="wrapper">
        <Header className="header">header</Header>
        <Main className="main">main</Main>
        <Aside className="aside"><div>wassup dog</div><div>higgity diggity</div></Aside>
        <Footer className="footer">footer</Footer>
    </Wrapper>
);

}

export default Home;