import os
import shutil
from pathlib import Path
import dj_database_url
from decouple import config
from .base import *

DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = ['*']

USE_SQLITE = config('USE_SQLITE', default=True, cast=bool)
db_url = None if USE_SQLITE else config('DATABASE_URL', default=config('Database_URL', default=None))

if USE_SQLITE or not db_url:
    db_path = BASE_DIR / 'db.sqlite3'
    # In Vercel serverless environment, the function root is read-only.
    # Copy db.sqlite3 to /tmp so SQLite is writable for auth tokens, sessions, etc.
    if os.environ.get('VERCEL') or not os.access(BASE_DIR, os.W_OK):
        tmp_db = Path('/tmp') / 'db.sqlite3'
        try:
            if not tmp_db.exists() or tmp_db.stat().st_size == 0:
                if db_path.exists():
                    shutil.copy2(db_path, tmp_db)
                else:
                    candidates = list(Path('/var/task').glob('**/db.sqlite3'))
                    if candidates:
                        shutil.copy2(candidates[0], tmp_db)
                    else:
                        tmp_db.touch()
            db_path = tmp_db
        except Exception as e:
            print(f"Warning copying sqlite db to /tmp: {e}")
            db_path = tmp_db if tmp_db.exists() else db_path

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': db_path,
        }
    }
else:
    DATABASES = {
        'default': dj_database_url.parse(
            db_url,
            conn_max_age=600,
            conn_health_checks=True,
            ssl_require=True
        )
    }

# Fast password verification for local dev authentication
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
]
