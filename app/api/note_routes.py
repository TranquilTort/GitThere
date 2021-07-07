from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import desc
from app.models import db, Application, Note, application_note
from app.forms import NoteForm
note_routes = Blueprint('note', __name__)

@login_required
@note_routes.route('/add',methods=["POST"])
def add_one_note():
    print("hit route add note")
    form = NoteForm()

    if form['body'] and form['title']:
        new_note = Note()
        form.populate_obj(new_note)
        print('SUCCESS ADDING NOTE')
        db.session.add(new_note)
        db.session.commit()
        all_notes_arr = Note.query.filter_by(application_id=form['application_id'].data).order_by(desc(Note.created_at)).all()
        return {k: note.to_dict() for k, note in dict( zip(range(len(all_notes_arr)), all_notes_arr)).items()}
    return {"error":"error"}
