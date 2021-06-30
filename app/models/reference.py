from .db import db
from .user_reference import user_reference


class Reference(db.Model):
    __tablename__ = "references"
    id = db.Column(db.Integer, primary_key=True)
    title =db.Column(db.String, nullable=False)
    body = db.Column(db.Text, nullable=False)

    user = db.relationship("User", secondary=user_reference, back_populates="references")
