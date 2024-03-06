import os
from .settings import *
from .settings import BASE_DIR

SECRET_KEY = os.environ["SECRET_KEY"]
ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME'], os.environ['CUSTOM_A_HOSTNAME'], os.environ['CUSTOM_CNAME_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ["https://" + os.environ.get("WEBSITE_HOSTNAME"), "https://" + os.environ.get("CUSTOM_A_HOSTNAME"), "https://" + os.environ.get("CUSTOM_CNAME_HOSTNAME")]
DEBUG = False

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# STATIC AND MEDIA FILES CONFIG
AZURE_ACCOUNT_NAME = os.environ["AZURE_ACCOUNT_NAME"]
AZURE_ACCOUNT_KEY = os.environ["AZURE_ACCOUNT_KEY"]
AZURE_CONTAINER = os.environ["AZURE_CONTAINER"]

DEFAULT_FILE_STORAGE = 'storages.backends.azure_storage.AzureStorage'
STATICFILES_STORAGE = 'storages.backends.azure_storage.AzureStorage'

AZURE_URL_EXPIRATION_SECS = 3600

STATIC_LOCATION = "static"
MEDIA_LOCATION = "media"

STATIC_URL = f'https://{AZURE_ACCOUNT_NAME}.blob.core.windows.net/{STATIC_LOCATION}/'
MEDIA_URL = f'https://{AZURE_ACCOUNT_NAME}.blob.core.windows.net/{MEDIA_LOCATION}/'


# EMAIL SERVER CONFIG
EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND")
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_PORT = os.environ.get("EMAIL_PORT")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
