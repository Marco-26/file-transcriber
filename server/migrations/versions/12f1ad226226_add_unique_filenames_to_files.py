"""Add unique filenames to files

Revision ID: 12f1ad226226
Revises: cc648c4c7c21
Create Date: 2025-01-21 19:14:27.794175

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12f1ad226226'
down_revision = 'cc648c4c7c21'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('files', schema=None) as batch_op:
        batch_op.add_column(sa.Column('unique_filename', sa.String(length=255), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('files', schema=None) as batch_op:
        batch_op.drop_column('unique_filename')

    # ### end Alembic commands ###
