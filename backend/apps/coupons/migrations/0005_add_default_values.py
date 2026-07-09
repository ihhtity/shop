# Generated manually to fix created_at/updated_at NOT NULL without default value

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0004_alter_coupon_table_alter_usercoupon_table'),
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE shop_coupon MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_coupon MODIFY COLUMN created_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_coupon MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_coupon MODIFY COLUMN updated_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_usercoupon MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_usercoupon MODIFY COLUMN created_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_usercoupon MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_usercoupon MODIFY COLUMN updated_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_usercoupon MODIFY COLUMN receive_time datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_usercoupon MODIFY COLUMN receive_time datetime(6) NOT NULL",
        ),
    ]
