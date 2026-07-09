# Generated manually to fix created_at/updated_at NOT NULL without default value

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_email'),
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE shop_admin MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_admin MODIFY COLUMN created_at datetime(6) NOT NULL",
        ),
        migrations.RunSQL(
            "ALTER TABLE shop_admin MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)",
            "ALTER TABLE shop_admin MODIFY COLUMN updated_at datetime(6) NOT NULL",
        ),
    ]
