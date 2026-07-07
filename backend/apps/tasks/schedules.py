from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'cancel_timeout_order': {
        'task': 'apps.tasks.tasks.cancel_timeout_order',
        'schedule': 300,
    },
    'sync_order_status': {
        'task': 'apps.tasks.tasks.sync_order_status',
        'schedule': 60,
    },
    'generate_daily_report': {
        'task': 'apps.tasks.tasks.generate_daily_report',
        'schedule': crontab(hour=2, minute=0),
    },
}