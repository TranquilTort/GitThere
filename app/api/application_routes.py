from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy import desc
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
        db.session.add(new_application)
        db.session.commit()
        return new_application.to_dict();
    else:
        print('APP FORM DID NOT VALIDATE', form.errors)
        return {}
@login_required
@application_routes.route('/edit/<int:id>',methods=['PUT'])
def edit_application(id):
    form = ApplicationForm();
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_application = Application.query.get(id)
        form.populate_obj(edit_application)
        edit_application.updated_at=datetime.now()
        db.session.commit()
        return edit_application.to_dict();
    else:
        print('APP FORM DID NOT VALIDATE', form.errors)
        return {}

@login_required
@application_routes.route('/all/<int:id>')
def get_all_applications(id):
    applications = Application.query.filter_by(applicant=id).order_by(desc(Application.created_at)).all()
    if(len(applications) == 0):
        return {"error":'no apps'}
    application_dict = {k: review.to_dict() for k, review in dict(zip(range(len(applications)), applications)).items()}
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
        changed_app.status = newStatus;
        changed_app.updated_at = datetime.now();
        db.session.commit();
        return {}
    else:
        return {}

@login_required
@application_routes.route('/document/add/<int:appId>/<string:fileType>', methods=["POST"])
def add_document(appId,fileType):
    print("hit route")
    print(request.files)
    if fileType not in request.files:
        print("no file")
        return {"errors": "file required"},400

    file = request.files[fileType]

    if not allowed_file(file.filename):
        print('file type not allowed')
        return {"errors": "file type not permitted"}, 400
    file.filename = get_unique_filename(file.filename)
    upload = upload_file_to_s3(file)
    if "url" not in upload:
        print("upload error")
        return upload, 400

    url = upload["url"]
    application_update = Application.query.get(appId)
    if(fileType =='resume'):
        application_update.resume = url
    elif(fileType == 'cv'):
        application_update.cv = url
    elif(fileType == 'cover_letter'):
        application_update.cover_letter = url
    application_update.updated_at = datetime.now()
    db.session.commit()
    return {"url":url}
    # reference: https://hackmd.io/@jpshafto/SyWY45KGu
@login_required
@application_routes.route('/document/get/<string:url>')
def download_file(url):
    print("hit file download path")
    return {}


@login_required
@application_routes.route('/delete/<int:appId>')
def delete_app(appId):
    delete_application = Application.query.filter_by(id=appId).first()
    print("THIS IS THE APP TO BE DELETED",delete_application)
    if current_user.id == delete_application.applicant:
        db.session.delete(delete_application)
        db.session.commit()
        return {"success":"deleted"}
    else:
        return {"error":"no auth"}
