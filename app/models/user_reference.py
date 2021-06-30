from .db import db

user_reference = db.Table(
    'user_references',
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "reference_id",
        db.Integer,
        db.ForeignKey("references.id"),
        primary_key=True
    )
)
