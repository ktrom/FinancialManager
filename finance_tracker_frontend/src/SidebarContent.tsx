import React from 'react';
import {Nav} from 'react-bootstrap';
import {MainContent} from "./Enums/MainContent";
import styled from "@emotion/styled";

type SidebarProps = {
    setContent(mainContent : MainContent) : void;
}

const Link = styled(Nav.Link)({
    color: "#F1F1F1",
    "&:hover": {backgroundColor: "#007bff61", color: "#F1F1F1"},
})
function SidebarContent(props : SidebarProps){

    const currentPage = window.location.href;

    return (
        <Nav variant="pills" defaultActiveKey={currentPage} className="flex-column">
            <Nav.Item>
                <Link href={currentPage} onClick={() => {props.setContent(MainContent.Main)}}>Finances</Link>
            </Nav.Item>
            <Nav.Item>
                <Link eventKey="link-1" onClick={() => {props.setContent(MainContent.Charts)}}>Charts</Link>
            </Nav.Item>
        </Nav>
    );
}

export default SidebarContent;
