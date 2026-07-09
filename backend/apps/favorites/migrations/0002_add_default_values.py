# Generated manually to fix created_at NOT NULL without default value

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('favorites', '0001_initial'),
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE shop_favorite MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_favorite MODIFY COLUMN created_at datetime(6) NOT NULL",
        ),
    ]
