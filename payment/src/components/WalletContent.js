import React from "react";
import { Card, Descriptions, Tag } from "antd";

const WalletContent = ({ wallet }) => {
    if (!wallet) return null;

    return (
        <Card title="Wallet Details" bordered={false} style={{ maxWidth: 800 }}>
            <Descriptions column={1} bordered>
                <Descriptions.Item label="Address">{wallet.address}</Descriptions.Item>
                <Descriptions.Item label="Balance">{wallet.balance} WTPDollars</Descriptions.Item>
                
                <Descriptions.Item label="Wallet Type">
                    {wallet.cold_wallet && <Tag color="blue">Cold Wallet</Tag>}
                    {wallet.hot_wallet && <Tag color="red">Hot Wallet</Tag>}
                </Descriptions.Item>

                <Descriptions.Item label="Vendor Status">
                    {wallet.is_vendor ? <Tag color="green">Vendor</Tag> : <Tag color="gray">Not a Vendor</Tag>}
                </Descriptions.Item>

                <Descriptions.Item label="Domain">{wallet.domain || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Flags">{wallet.flags}</Descriptions.Item>
                <Descriptions.Item label="Owner Count">{wallet.owner_count}</Descriptions.Item>
                <Descriptions.Item label="Previous TXN ID">{wallet.previous_txn_id || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Previous TXN Ledger Seq">{wallet.previous_txn_ledger_seq || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Sequence">{wallet.sequence}</Descriptions.Item>
                {wallet.tick_size && <Descriptions.Item label="Tick Size">{wallet.tick_size || "N/A"}</Descriptions.Item>}
                <Descriptions.Item label="Account Index">{wallet.account_index || "N/A"}</Descriptions.Item>

                <Descriptions.Item label="Account Flags">
                    {wallet.allow_trustline_clawback && <Tag color="gold">Trustline Clawback</Tag>}
                    {wallet.default_ripple && <Tag color="purple">Default Ripple</Tag>}
                    {wallet.deposit_auth && <Tag color="cyan">Deposit Auth</Tag>}
                    {wallet.disable_master_key && <Tag color="volcano">Master Key Disabled</Tag>}
                    {wallet.disallow_incoming_check && <Tag color="geekblue">No Incoming Checks</Tag>}
                    {wallet.disallow_incoming_nft_offer && <Tag color="magenta">No Incoming NFT Offers</Tag>}
                    {wallet.disallow_incoming_pay_chan && <Tag color="lime">No Incoming Pay Channels</Tag>}
                    {wallet.disallow_incoming_trustline && <Tag color="green">No Incoming Trustline</Tag>}
                    {wallet.disallow_incoming_xrp && <Tag color="red">No Incoming XRP</Tag>}
                    {wallet.global_freeze && <Tag color="black">Global Freeze</Tag>}
                    {wallet.no_freeze && <Tag color="blue">No Freeze</Tag>}
                    {wallet.password_spent && <Tag color="orange">Password Spent</Tag>}
                    {wallet.require_authorization && <Tag color="gold">Require Authorization</Tag>}
                    {wallet.require_destination_tag && <Tag color="purple">Require Destination Tag</Tag>}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default WalletContent;