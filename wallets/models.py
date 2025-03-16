from django.db import models
from decimal import Decimal
from django.contrib.auth import get_user_model
User = get_user_model()

class Wallet(models.Model):
    """Model for user's wallet."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wallet")
    address = models.CharField(max_length=35, unique=True)
    balance = models.DecimalField(max_digits=32, decimal_places=6, default=Decimal("0.000000"))
    seed = models.CharField(max_length=512, blank=True, null=True)
    is_vendor = models.BooleanField(default=False)
    cold_wallet = models.BooleanField(default=False)
    hot_wallet = models.BooleanField(default=False)

    # XRP Ledger-specific fields
    domain = models.CharField(max_length=255, blank=True, null=True)
    flags = models.BigIntegerField(default=0)
    owner_count = models.IntegerField(default=0)
    previous_txn_id = models.CharField(max_length=64, blank=True, null=True)
    previous_txn_ledger_seq = models.IntegerField(blank=True, null=True)
    sequence = models.IntegerField(default=0)
    tick_size = models.IntegerField(blank=True, null=True)
    account_index = models.CharField(max_length=64, blank=True, null=True)
    
    # Account flags
    allow_trustline_clawback = models.BooleanField(default=False)
    default_ripple = models.BooleanField(default=False)
    deposit_auth = models.BooleanField(default=False)
    disable_master_key = models.BooleanField(default=False)
    disallow_incoming_check = models.BooleanField(default=False)
    disallow_incoming_nft_offer = models.BooleanField(default=False)
    disallow_incoming_pay_chan = models.BooleanField(default=False)
    disallow_incoming_trustline = models.BooleanField(default=False)
    disallow_incoming_xrp = models.BooleanField(default=False)
    global_freeze = models.BooleanField(default=False)
    no_freeze = models.BooleanField(default=False)
    password_spent = models.BooleanField(default=False)
    require_authorization = models.BooleanField(default=False)
    require_destination_tag = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Wallet({self.user.username} - {self.address})"