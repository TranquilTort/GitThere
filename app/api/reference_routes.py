from flask import Flask, Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy import desc
from app.models import db, Reference
from app.forms import ReferenceForm
reference_routes = Blueprint('reference', __name__)

@login_required
@reference_routes.route('/add',methods=['POST'])
def add_one_reference():
    print("++++++++++++++Hit ADD REF ROUTE")
    form = ReferenceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and form['user_id'].data==current_user.id:
        new_ref = Reference()
        form.populate_obj(new_ref)
        db.session.add(new_ref)
        db.session.commit()
        all_refs_arr = Reference.query.filter_by(user_id=current_user.id).order_by(desc(Reference.created_at)).all()
        return {k: ref.to_dict() for k, ref in dict( zip(range(len(all_refs_arr)), all_refs_arr)).items()}
    return {"error":"error"}

@login_required
@reference_routes.route('/all')
def get_all_refs():
    all_refs_arr = Reference.query.filter_by(user_id=current_user.id).order_by(desc(Reference.created_at)).all()
    if(len(all_refs_arr) == 0):
        return {"error":"none"}
    else:
        return {k: ref.to_dict() for k, ref in dict( zip(range(len(all_refs_arr)), all_refs_arr)).items()}

@login_required
@reference_routes.route('/delete/<int:id>')
def delete_ref(id):
    deleted_ref = Reference.query.get(id)
    if deleted_ref.user_id == current_user.id:
        db.session.delete(deleted_ref)
        db.session.commit()
    return {}
