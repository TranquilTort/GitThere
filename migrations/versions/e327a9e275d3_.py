"""empty message

Revision ID: e327a9e275d3
Revises: 4c7bf7352643
Create Date: 2021-07-07 02:04:56.624054

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e327a9e275d3'
down_revision = '4c7bf7352643'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notes', sa.Column('application_id', sa.Integer(), nullable=True))
    op.add_column('notes', sa.Column('created_at', sa.Date(), nullable=False))
    op.drop_constraint('notes_applicationId_fkey', 'notes', type_='foreignkey')
    op.create_foreign_key(None, 'notes', 'applications', ['application_id'], ['id'])
    op.drop_column('notes', 'applicationId')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notes', sa.Column('applicationId', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'notes', type_='foreignkey')
    op.create_foreign_key('notes_applicationId_fkey', 'notes', 'applications', ['applicationId'], ['id'])
    op.drop_column('notes', 'created_at')
    op.drop_column('notes', 'application_id')
    # ### end Alembic commands ###
