'use client';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { FilterCategoryItem } from '@/components/contentful/components/NewPLPFilter';
import { FastFrame, StandardFilter } from '@/components/plp';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} children={props.children} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)'
  })
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const filterMap = (componentType: string) => {
  switch (componentType) {
    case 'FastFrame':
      return FastFrame;
    case 'Color':
    case 'Gender':
    default:
      return StandardFilter;
  }
};

export function Filters(props: { config: FilterCategoryItem[] }) {
  return (
    <>
      {props.config.map((category) => {
        const Component = filterMap(category.componentName);
        return (
          <Accordion key={category.displayName}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={category.displayName}
              id={category.displayName}
            >
              <Typography sx={{ flexShrink: 0 }}>{category.displayName}</Typography>
            </AccordionSummary>
            <AccordionDetails>{Component && <Component {...category} />}</AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
