/** @format */

import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";

import "./HomePage.css";
import SiderMenu from "./siderMenu/SiderMenu";
import FooterHome from "./footer/FooterHome";
import StudentHomeContent from "./homeContent/student/StudentHomeContent";
import StaffHomeContent from "./homeContent/staff/StaffHomeContent";
import Breadcrumbs from "./breadcrumbs/BreadCrumbs";
import HomePageHeader from "./homeTopNav/HomePageHeader";
import UserContext from "../../components/contexts/UserContext";
import { KEYS } from "./utils/constants/homepage_keys";

const HomePage = ({ match, history }) => {
    // const KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
    const [selectedKey, setSelectedKey] = useState(0);
    const page = `${history.location.pathname
        .split("/")[2]
        .charAt(0)
        .toUpperCase()}${history.location.pathname.split("/")[2].slice(1)}`;

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === "student") {
                setSelectedKey(KEYS["student"][page]);
            } else if ((userInfo.role === "staff")) {
                setSelectedKey(KEYS["staff"][page]);
            } else {
                // Need to put setSelectedKey for other roles  ('mentor', 'admin')
            }
        }
    }, [userInfo]);

    const displayHomeContent = () => {
        if (userInfo.role === "student") {
            return (
                <StudentHomeContent
                    keys={KEYS[userInfo.role]}
                    selectedKey={selectedKey}
                    setSelectedKey={setSelectedKey}
                    match={match}
                    history={history}
                />
            );
        } else if (userInfo.role === "staff") {
            return (
                <StaffHomeContent
                    keys={KEYS[userInfo.role]}
                    selectedKey={selectedKey}
                    setSelectedKey={setSelectedKey}
                    match={match}
                    history={history}
                />
            );
        } else {
            // add HomeContent for other roles ('mentor', 'admin')
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {
                userInfo ? (
                    <>
                        <SiderMenu
                            match={match}
                            keys={KEYS[userInfo.role]}
                            selectedKey={selectedKey}
                            setSelectedKey={setSelectedKey}
                        />
                        <div className="container-fluid">
                            <Layout className="site-layout">
                                <HomePageHeader match={match} />
                                <Breadcrumbs
                                    page={page}
                                    match={match}
                                    keys={KEYS[userInfo.role]}
                                    setSelectedKey={setSelectedKey}
                                />
                                {displayHomeContent()}
                                <FooterHome />
                            </Layout>
                        </div>
                    </>
                ) : null
            }
        </Layout>
    );
};

export default HomePage;
