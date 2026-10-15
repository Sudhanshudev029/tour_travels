export interface Faq { id: string; question: string; answer: string }

export const faqs: readonly Faq[] = [
  {
    id: 'duration',
    question: 'What is the best duration for a Varanasi trip?',
    answer:
      'Many visitors choose two to three nights: enough for the ghats, an evening aarti, the temple district and a half-day at Sarnath. Pilgrims often add extra days for rituals and a slower pace. Tell us your priorities and we can suggest a length.',
  },
  {
    id: 'custom',
    question: 'Can I request a customised tour package?',
    answer: 'Yes. Packages on this page are starting points. Share your dates, group size and interests and we will shape an itinerary around them.',
  },
  {
    id: 'boat',
    question: 'Can boat rides be included in my itinerary?',
    answer: 'Boat rides can be added to most plans — commonly at sunrise or around the evening aarti. Tell us which you prefer when you enquire.',
  },
  {
    id: 'cities',
    question: 'Can the trip include Prayagraj or Ayodhya?',
    answer: 'Yes, multi-city routes with Prayagraj, Ayodhya or Vindhyachal can be planned, including the road transfers between them.',
  },
  {
    id: 'quote',
    question: 'How can I request a quote?',
    answer: 'Use the enquiry form below or message us on WhatsApp. We will reply with options and pricing once we know your dates and group size.',
  },
  {
    id: 'info',
    question: 'What information should I share before booking?',
    answer:
      'Your travel dates, number of travellers (including children and elders), arrival and departure city, places you want to see, and any dietary, accessibility or budget needs.',
  },
  {
    id: 'temple',
    question: 'Are temple entry and darshan times guaranteed?',
    answer: 'No. Temple access, timings and rules are decided by the temple authorities and can change at short notice. We will plan around them and tell you what we know.',
  },
]
