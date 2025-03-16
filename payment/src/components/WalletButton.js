import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const MenuWallet = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/wallet");
    };

    return (
        <Button type="primary" onClick={handleClick} style={{ marginRight: 10 }}>
            Wallets
        </Button>
    );
}

export default MenuWallet;