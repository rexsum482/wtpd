# Generated by Django 5.1.7 on 2025-03-16 01:01

import django.db.models.deletion
from decimal import Decimal
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=35, unique=True)),
                ('balance', models.DecimalField(decimal_places=6, default=Decimal('0.000000'), max_digits=32)),
                ('seed', models.CharField(blank=True, max_length=512, null=True)),
                ('is_vendor', models.BooleanField(default=False)),
                ('cold_wallet', models.BooleanField(default=False)),
                ('hot_wallet', models.BooleanField(default=False)),
                ('domain', models.CharField(blank=True, max_length=255, null=True)),
                ('flags', models.BigIntegerField(default=0)),
                ('owner_count', models.IntegerField(default=0)),
                ('previous_txn_id', models.CharField(blank=True, max_length=64, null=True)),
                ('previous_txn_ledger_seq', models.IntegerField(blank=True, null=True)),
                ('sequence', models.IntegerField(default=0)),
                ('tick_size', models.IntegerField(blank=True, null=True)),
                ('account_index', models.CharField(blank=True, max_length=64, null=True)),
                ('allow_trustline_clawback', models.BooleanField(default=False)),
                ('default_ripple', models.BooleanField(default=False)),
                ('deposit_auth', models.BooleanField(default=False)),
                ('disable_master_key', models.BooleanField(default=False)),
                ('disallow_incoming_check', models.BooleanField(default=False)),
                ('disallow_incoming_nft_offer', models.BooleanField(default=False)),
                ('disallow_incoming_pay_chan', models.BooleanField(default=False)),
                ('disallow_incoming_trustline', models.BooleanField(default=False)),
                ('disallow_incoming_xrp', models.BooleanField(default=False)),
                ('global_freeze', models.BooleanField(default=False)),
                ('no_freeze', models.BooleanField(default=False)),
                ('password_spent', models.BooleanField(default=False)),
                ('require_authorization', models.BooleanField(default=False)),
                ('require_destination_tag', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wallet', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
