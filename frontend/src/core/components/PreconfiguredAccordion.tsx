import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary } from '@mui/material';
import { ReactNode } from 'react';

type PreconfiguredAccordionProps = {
  summary?: ReactNode;
  details?: ReactNode;
  actions?: ReactNode;
};

export default function PreconfiguredAccordion({
  summary = null,
  details = null,
  actions = null,
}: PreconfiguredAccordionProps) {
  return (
    <Accordion sx={{ marginBottom: 1, borderRadius: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ backgroundColor: 'primary.main', color: 'white', borderRadius: 2 }}
      >
        {summary}
      </AccordionSummary>

      <AccordionDetails>{details}</AccordionDetails>

      <AccordionActions
        sx={{
          padding: 2,
          paddingTop: 0,
        }}
      >
        {actions}
      </AccordionActions>
    </Accordion>
  );
}
