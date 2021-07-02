from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from datetime import datetime

from app.models import db, Application
from app.forms import ApplicationForm
application_routes = Blueprint('application', __name__)

@login_required
@application_routes.route('/new', methods=["POST"])
def add_one_application():
    form = ApplicationForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data)
    if form.validate_on_submit():
        new_application = Application()
        form.populate_obj(new_application)
        new_application.created_at=datetime.now()
        new_application.status=1
        print("APP ADD SUCCESS", new_application)
        db.session.add(new_application)
        db.session.commit()
    else:
        print('APP FORM DID NOT VALIDATE', form.errors)
    return {}
