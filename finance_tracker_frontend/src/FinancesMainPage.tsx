import {useParams} from "react-router";
import SidebarContent from "./SidebarContent";
import React from "react";
import {MainContent} from "./Enums/MainContent";
import MonthlyFinanceAssigner from "./MonthlyFinanceAssigner";

type FinancesMainPageProps = {
    content: MainContent,
}

function FinancesMainPage(props : FinancesMainPageProps) {
    return props.content === MainContent.Main ? (
        <MonthlyFinanceAssigner/>
    ) : (
        <div>bye</div>
    );
}

export default FinancesMainPage;