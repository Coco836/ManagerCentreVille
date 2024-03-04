#!/bin/bash
export PYTHONPATH="${PYTHONPATH}:/home/site/wwwroot/managerdecommerce"
gunicorn managerdecommerce.wsgi:application --bind=0.0.0.0:8000 --workers=3
