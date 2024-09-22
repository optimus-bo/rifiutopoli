"""cambio chili a n contenitori per le raccolte

Revision ID: 06d22edcabe9
Revises: ddd275d65143
Create Date: 2024-09-21 19:43:25.107781

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "06d22edcabe9"
down_revision: Union[str, None] = "ddd275d65143"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column("raccolta", "peso", new_column_name="contenitori")


def downgrade() -> None:
    op.alter_column("raccolta", "contenitori", new_column_name="peso")
