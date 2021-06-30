from .db import db

application_screen_shot = db.Table(
    'application_screen_shots',
    db.Column(
        "application_id",
        db.Integer,
        db.ForeignKey("applications.id"),
        primary_key=True
    ),
    db.Column(
        "screen_shot_id",
        db.Integer,
        db.ForeignKey("screen_shots.id"),
        primary_key=True
    )
)
