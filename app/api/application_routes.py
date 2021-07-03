from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc

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
        return new_application.to_dict();
    else:
        print('APP FORM DID NOT VALIDATE', form.errors)
        return {}

@login_required
@application_routes.route('/all/<int:id>')
def get_all_applications(id):
    applications = Application.query.filter_by(applicant=id).order_by(desc(Application.created_at)).all()
    if(len(applications) == 0):
        return {"error":'no apps'}
    application_dict = {k: review.to_dict() for k, review in dict( zip(range(len(applications)), applications)).items()}
    return application_dict

@login_required
@application_routes.route('/one/<id>')
def get_one_application(id):
    print("GET ONE APP ROUTE")
    app_fetch = Application.query.get(id)
    return app_fetch.to_dict()

@login_required
@application_routes.route('/status/<int:userId>/<int:appId>/<int:newStatus>')
def change_app_status(userId, appId, newStatus):
    if(userId == current_user.id ):
        changed_app = Application.query.filter_by(id=appId).first()
        changed_app.status = newStatus
        db.session.commit();
        return {}
    else:
        return {}
