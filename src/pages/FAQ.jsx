// src/pages/FAQ.jsx
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqs = [
    { question: 'How to reset my password?', answer: 'Go to settings and click on "Reset Password."' },
    { question: 'How to contact support?', answer: 'Email us at support@example.com.' },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
