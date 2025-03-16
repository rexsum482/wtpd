import React, { useState } from "react";
import { Layout, List, Typography, Tag } from "antd";
import WalletContent from "../components/WalletContent";

const { Content, Sider } = Layout;
const { Text } = Typography;

const MyWallets = ({ wallets = [], setWallets }) => {
    const [selectedWallet, setSelectedWallet] = useState(null);

    return (
        <Layout>
            <Sider 
                style={{ 
                    padding: "16px", 
                    height: "85vh", 
                    backgroundSize: "cover", 
                    backgroundColor: "#ffffff",
                    boxShadow: "4px 0 10px rgba(0, 0, 0, 0.15)"
                }}
            >
                <List
                    header={<Text strong>My Wallets</Text>}
                    dataSource={wallets.length > 0 ? wallets : ["No wallets found"]}
                    renderItem={(item) => {
                        if (typeof item !== "object") {
                            return (
                                <List.Item>
                                    <Text style={{ fontStyle: 'italic', fontSize: '12px', color: "#666" }}>
                                        {item}
                                    </Text>
                                </List.Item>
                            );
                        }

                        return (
                            <List.Item 
                                onClick={() => setSelectedWallet(item)}
                                style={{ 
                                    cursor: "pointer", 
                                    padding: "10px", 
                                    background: selectedWallet === item ? "#f0f0f0" : "transparent" 
                                }}
                            >
                                <Text>{item.address}</Text>
                                {item.cold_wallet && <Tag color="blue" style={{ marginLeft: 10 }}>Cold Wallet</Tag>}
                                {item.hot_wallet && <Tag color="red" style={{ marginLeft: 10 }}>Hot Wallet</Tag>}
                                {item.cold_wallet ? <></> : item.hot_wallet ? <></> : item.is_vendor ? <Tag color="green" style={{ marginLeft: 10}}>Vendor</Tag> : <Tag color="gray" style={{ marginLeft: 10 }}>Customer</Tag>}
                            </List.Item>
                        );
                    }}
                />
            </Sider>

            <Content style={{ padding: "16px" }}>
                {selectedWallet ? (
                    <WalletContent wallet={selectedWallet} />
                ) : (
                    <Text style={{ fontSize: "16px", color: "#888" }}>
                        Select a wallet to view details.
                    </Text>
                )}
            </Content>
        </Layout>
    );
};

export default MyWallets;