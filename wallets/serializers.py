from rest_framework import serializers
from .models import Wallet
from users.serializers import UserSerializer

class WalletSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Wallet
        fields = [
            "id", "user", "address", "balance", "is_vendor", "cold_wallet", "hot_wallet",
            "domain", "flags", "owner_count", "previous_txn_id", "previous_txn_ledger_seq",
            "sequence", "tick_size", "account_index", "allow_trustline_clawback", "default_ripple",
            "deposit_auth", "disable_master_key", "disallow_incoming_check", "disallow_incoming_nft_offer",
            "disallow_incoming_pay_chan", "disallow_incoming_trustline", "disallow_incoming_xrp",
            "global_freeze", "no_freeze", "password_spent", "require_authorization", "require_destination_tag"
        ]
        read_only_fields = ["balance", "user"]
