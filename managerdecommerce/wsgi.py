"""
WSGI config for managerdecommerce project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
print(os.environ)
settings_module = "managerdecommerce.deployment" if "WEBSITE_HOSTNAME" in os.environ else "managerdecommerce.settings"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)

application = get_wsgi_application()
