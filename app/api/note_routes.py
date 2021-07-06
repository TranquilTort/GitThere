from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import desc
from app.models import db, Application, Note, application_note
from app.forms import NoteForm
note_routes = Blueprint('note', __name__)

@login_required
@note_routes.route('/add/<int:appId>',methods=["POST"])
def add_one_note(appId):
    print("hit route add note",appId)
    form = NoteForm()

    if form['body'] and form['title']:
        new_note = Note()
        form.populate_obj(new_note)
        print('SUCCESS ADDING NOTE')
        db.session.add(new_note)
        db.session.commit()
        db.session.commit()
        db.session.query(Note).join(application_note)

    return {}
