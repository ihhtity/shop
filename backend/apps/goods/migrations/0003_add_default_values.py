# Generated manually to fix created_at/updated_at NOT NULL without default value

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0002_alter_category_table_alter_goods_table_and_more'),
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE shop_category MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_category MODIFY COLUMN created_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_category MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_category MODIFY COLUMN updated_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_goods MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_goods MODIFY COLUMN created_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_goods MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_goods MODIFY COLUMN updated_at datetime(6) NOT NULL",
        ),
    ]
