"""modificato schema rifiuti

Revision ID: ddd275d65143
Revises: d0d58eaa3baa
Create Date: 2024-09-21 18:13:55.251102

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ddd275d65143"
down_revision: Union[str, None] = "d0d58eaa3baa"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column("rifiuto", "codice_cer", new_column_name="codice_eer")
    op.add_column(
        "rifiuto", sa.Column("codice_pittogramma", sa.String(), nullable=True)
    )
    op.add_column(
        "rifiuto",
        sa.Column(
            "codice_rdr",
            sa.String(),
            nullable=False,
            server_default="default_rdr_value",
        ),
    )
    op.add_column(
        "rifiuto",
        sa.Column(
            "contenitore",
            sa.String(),
            nullable=False,
            server_default="default_contenitore_value",
        ),
    )


def downgrade() -> None:
    op.alter_column("rifiuto", "codice_eer", new_column_name="codice_cer")
    op.drop_column("rifiuto", "codice_pittogramma")
    op.drop_column("rifiuto", "codice_rdr")
    op.drop_column("rifiuto", "contenitore")
