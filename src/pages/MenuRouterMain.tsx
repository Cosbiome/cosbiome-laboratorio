import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import MenusBar from "../components/MenusBar";

const { Sider, Content } = Layout;

interface IPropsMenuRouterMain {
  children: ReactNode;
}

const imageLogo =
  "https://firebasestorage.googleapis.com/v0/b/cosbiome-bcdf4.appspot.com/o/COSBIOME-PNG_altaresoluci%C3%B3n.png?alt=media&token=65b36fec-4a23-4162-b01a-2bb7e64f20f3";

const MenuRouterMain = ({ children }: IPropsMenuRouterMain) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: "32px",
            margin: "16px",
          }}
          className="logo"
        >
          <img src={imageLogo} width="100%" alt="logo cosbiome" />
        </div>
        <MenusBar setCollapsed={setCollapsed} collapsed={collapsed} />
      </Sider>
      <Layout style={{ background: "#fff" }} className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
            maxHeight: "100vh",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MenuRouterMain;
