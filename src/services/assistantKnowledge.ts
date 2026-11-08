// Pahari Brew Guide - Approved Knowledge Base & Safety Rules

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    action: 'navigate-booking' | 'navigate-menu' | 'navigate-gallery' | 'open-map';
  };
}

export const ASSISTANT_SYSTEM_INSTRUCTION = `
You are the "Pahari Brew Guide", an AI website assistant for Pahari Brew Roasters Shimla.
This is Demo #3 for a fictional café. The website is a portfolio demonstration and must not be presented as a real business unless all details are replaced and approved by the real café owner.

==================================================
ASSISTANT IDENTITY & ROLE
==================================================
- Assistant Name: Pahari Brew Guide
- Assistant Role: An AI website assistant for Pahari Brew Roasters Shimla.
- Introduction: "Hi, I’m the Pahari Brew Guide. I can help you learn about our café, menu, opening hours, location, and reservation-request process."
- If asked whether you are a human:
  "I’m an AI website assistant for this fictional Pahari Brew demonstration. I’m not a human staff member."

==================================================
APPROVED BUSINESS INFORMATION (FICTIONAL DEMO)
==================================================
- Business Name: Pahari Brew Roasters Shimla
- Business Type: A fictional high-altitude café and roastery in Shimla.
- Tagline: "Good coffee, better conversations."
- Brand Theme: High-altitude tranquillity, Himalayan coffee culture, slow conversations, artisanal drinks, fresh pastries, and a calm café atmosphere.
- Location: Mall Road, Near Christ Church, Shimla, Himachal Pradesh 171001, India
- Phone: +91 94321 87654
- Email: hello@paharibrew.com
- Opening Hours: Open daily from 8:00 AM to 9:00 PM
- Important: These details are fictional demonstration information. Do not claim that this café, phone number, email address, map, menu, or reservation system is real.

==================================================
MENU AND OFFERINGS
==================================================
- Featured Drink: Himalayan Mist Latte
  Description: A signature latte inspired by the mountain setting, with local wild mountain honey and a hint of green cardamom.
- Other Offerings: Single-origin coffee, Pour-over coffee, Espresso-based drinks, Fresh pastries, Artisanal baked goods, Dairy-alternative drinks, if available.
- Important: Do not invent exact prices, ingredients, allergens, sizes, availability, preparation times, or additional menu items.
- If asked for a price:
  "I don’t have verified pricing in this demonstration. Please check the café’s approved menu or contact Pahari Brew directly for current prices."
- If asked about allergies:
  "I don’t have verified allergen information in this demonstration. Please contact the café directly before ordering and ask staff about ingredients and cross-contact."
- If asked about vegan pastries or unverified food items:
  "I don’t have verified information about that in this demonstration. Please contact Pahari Brew directly for accurate details."

==================================================
CAFÉ STORY
==================================================
Approved description:
"Pahari Brew is a fictional café concept in Shimla that combines Himalayan atmosphere with contemporary coffee culture. It is designed as a calm place for coffee, conversation, fresh pastries, and slow moments."
Do NOT claim:
- That the café is actually open
- That the café has won awards
- That its beans are certified organic or have specific suppliers
- That it has real staff or baristas
- That it has real customer reviews or confirmed workshops
The existing testimonials and story are fictional portfolio content. Do not describe them as independently verified reviews.

==================================================
ROASTERY WORKSHOPS
==================================================
If asked about workshops or when the next workshop is:
"Roastery workshops are included as a concept in this demonstration. Dates, prices, availability, and registration details have not been provided."
Never invent workshop dates, instructors, prices, session times, or available places.

==================================================
TABLE-RESERVATION ASSISTANCE
==================================================
If asked how to reserve a table:
"Use the reservation form on this page. Select a future date, choose an available time shown in the demonstration form, select the number of guests, and enter your contact details. This demonstration form does not create a real reservation."

NEVER SAY:
- "Your table is confirmed."
- "Your reservation has been accepted."
- "Your table is guaranteed."
- "The café staff has received your request."
- "I have booked your table."

Always explain:
"No real reservation is created through this portfolio demonstration. A real café would connect this form to an approved reservation system or staff inbox."

If asked whether a specific date or time is available:
"I cannot verify real-time availability in this demonstration. Please contact the café directly or use the café’s approved reservation system."

If asked to cancel or change a reservation:
"This demonstration does not create real reservations, so there is nothing to cancel or change. For a real reservation, contact the café directly."

==================================================
RESERVATION FORM INFORMATION & PRIVACY
==================================================
The reservation form collects: target date, time slot, number of guests, full name, phone number, and optional special request.
Do NOT ask for payment-card information, passwords, government identification, unnecessary personal info, or sensitive health info.
If the visitor shares medical or sensitive personal information, tell them not to share it in the demonstration form.
Payment: This website does not process payments or collect payment-card details. Reservations do not require advance payment.

==================================================
LOCATION, PARKING & ACCESSIBILITY
==================================================
- Location: "Pahari Brew Roasters Shimla is listed in this demonstration at Mall Road, Near Christ Church, Shimla, Himachal Pradesh 171001, India."
- Directions: Use the map link shown on the website (the map is a demonstration placeholder).
- Parking: "Parking information has not been verified in this demonstration. Please check local parking signs or contact the café directly."
- Accessibility: "Accessibility information has not been provided in this demonstration. Please contact the café directly before visiting to discuss accessibility needs."

==================================================
AI SAFETY & ACCURACY RULES
==================================================
1. Use only the approved information.
2. Never invent facts, prices, menu items, opening hours, staff names, availability, events, or reviews.
3. Never claim that a form submission was sent to staff or confirmed.
4. Never claim payment was processed.
5. Never claim to be a human employee.
6. If information is unavailable, say:
   "I don’t have verified information about that in this demonstration. Please contact Pahari Brew directly for accurate details."
7. Keep answers concise, friendly, and professional.
`;

export function getApprovedAssistantResponse(rawMessage: string): { text: string; quickAction?: ChatMessage['quickAction'] } {
  const q = rawMessage.toLowerCase().trim();

  // 1. Human check
  if (q.includes('human') || q.includes('real person') || q.includes('are you real') || q.includes('are you an ai')) {
    return {
      text: "I’m an AI website assistant for this fictional Pahari Brew demonstration. I’m not a human staff member."
    };
  }

  // 2. Is this a real café? / fictional status
  if (q.includes('real café') || q.includes('real cafe') || q.includes('is this real') || q.includes('is this a real business') || q.includes('demo') || q.includes('portfolio')) {
    return {
      text: "Pahari Brew is a fictional café concept in Shimla that combines Himalayan atmosphere with contemporary coffee culture. It is designed as a calm place for coffee, conversation, fresh pastries, and slow moments. This is Demo #3 for a portfolio demonstration and is not a real business."
    };
  }

  // 3. Opening hours / schedule / when are you open
  if (q.includes('hour') || q.includes('open') || q.includes('timing') || q.includes('schedule') || q.includes('close')) {
    return {
      text: "Pahari Brew Roasters Shimla is open daily from 8:00 AM to 9:00 PM. Please note that these opening hours are fictional demonstration information."
    };
  }

  // 4. Location / where are you located / address / directions
  if (q.includes('locat') || q.includes('where are you') || q.includes('address') || q.includes('find you') || q.includes('direction')) {
    return {
      text: "Pahari Brew Roasters Shimla is listed in this demonstration at Mall Road, Near Christ Church, Shimla, Himachal Pradesh 171001, India. If you need directions, please use the map link shown on our website (the address and map are demonstration placeholders).",
      quickAction: {
        label: "Open Google Maps",
        action: "open-map"
      }
    };
  }

  // 5. Himalayan Mist Latte / featured drink
  if (q.includes('himalayan mist') || q.includes('mist latte') || q.includes('featured drink') || q.includes('signature drink')) {
    return {
      text: "The Himalayan Mist Latte is our signature latte inspired by the mountain setting, with local wild mountain honey and a hint of green cardamom.",
      quickAction: {
        label: "View Menu",
        action: "navigate-menu"
      }
    };
  }

  // 6. Pricing questions
  if (q.includes('cost') || q.includes('price') || q.includes('how much') || q.includes('expensive') || q.includes('rate')) {
    return {
      text: "I don’t have verified pricing in this demonstration. Please check the café’s approved menu or contact Pahari Brew directly for current prices.",
      quickAction: {
        label: "Check Menu",
        action: "navigate-menu"
      }
    };
  }

  // 7. Allergen questions
  if (q.includes('allergen') || q.includes('allergy') || q.includes('allergic') || q.includes('nuts') || q.includes('gluten') || q.includes('celiac')) {
    return {
      text: "I don’t have verified allergen information in this demonstration. Please contact the café directly before ordering and ask staff about ingredients and cross-contact."
    };
  }

  // 8. Vegan pastries / diet specifics
  if (q.includes('vegan') || q.includes('sugar free') || q.includes('keto')) {
    return {
      text: "I don’t have verified information about that in this demonstration. Please contact Pahari Brew directly for accurate details."
    };
  }

  // 9. Dairy alternatives
  if (q.includes('dairy') || q.includes('milk') || q.includes('oat') || q.includes('almond') || q.includes('soy')) {
    return {
      text: "Dairy-alternative drinks are offered in the concept when available. However, please note that this is a fictional demonstration and specific ingredients are not verified."
    };
  }

  // 10. Roastery workshops / tours
  if (q.includes('workshop') || q.includes('tour') || q.includes('class') || q.includes('lesson')) {
    return {
      text: "Roastery workshops are included as a concept in this demonstration. Dates, prices, availability, and registration details have not been provided."
    };
  }

  // 11. Is reservation confirmed / table guaranteed?
  if (q.includes('is my reservation confirmed') || q.includes('table confirmed') || q.includes('guarantee') || q.includes('did staff receive')) {
    return {
      text: "No real reservation is created through this portfolio demonstration. A real café would connect this form to an approved reservation system or staff inbox."
    };
  }

  // 12. Real-time availability check (e.g. tomorrow at 7 PM)
  if ((q.includes('available') || q.includes('availability') || q.includes('table for') || q.includes('seat')) && (q.includes('tomorrow') || q.includes('pm') || q.includes('am') || q.includes('tonight') || q.includes('weekend') || q.includes('7') || q.includes('8'))) {
    return {
      text: "I cannot verify real-time availability in this demonstration. Please contact the café directly or use the café’s approved reservation system."
    };
  }

  // 13. Cancel or change reservation
  if (q.includes('cancel') || q.includes('modify') || q.includes('reschedule') || q.includes('change my reservation')) {
    return {
      text: "This demonstration does not create real reservations, so there is nothing to cancel or change. For a real reservation, contact the café directly."
    };
  }

  // 14. How to reserve / request table
  if (q.includes('reserve') || q.includes('reservation') || q.includes('book a table') || q.includes('request a table') || q.includes('booking')) {
    return {
      text: "Use the reservation form on this page. Select a future date, choose an available time shown in the demonstration form, select the number of guests, and enter your contact details. This demonstration form does not create a real reservation.",
      quickAction: {
        label: "Go to Reservation Form",
        action: "navigate-booking"
      }
    };
  }

  // 15. Payment / pay through website / card
  if (q.includes('pay') || q.includes('payment') || q.includes('credit card') || q.includes('debit') || q.includes('money') || q.includes('upi')) {
    return {
      text: "This website does not process payments or collect payment-card details. Reservations do not require advance payment, and payment information is never requested."
    };
  }

  // 16. Parking
  if (q.includes('park') || q.includes('car') || q.includes('vehicle')) {
    return {
      text: "Parking information has not been verified in this demonstration. Please check local parking signs or contact the café directly."
    };
  }

  // 17. Accessibility / wheelchair
  if (q.includes('accessib') || q.includes('wheelchair') || q.includes('ramp') || q.includes('elevator') || q.includes('disabled')) {
    return {
      text: "Accessibility information has not been provided in this demonstration. Please contact the café directly before visiting to discuss accessibility needs."
    };
  }

  // 18. Sensitive / medical info guard
  if (q.includes('doctor') || q.includes('medical') || q.includes('disease') || q.includes('illness') || q.includes('ssn') || q.includes('password') || q.includes('prescription')) {
    return {
      text: "Please do not share medical or sensitive personal information in this demonstration form. This website is a portfolio demonstration."
    };
  }

  // 19. Menu / food / drinks
  if (q.includes('menu') || q.includes('coffee') || q.includes('pastr') || q.includes('croissant') || q.includes('toast') || q.includes('espresso') || q.includes('pour over')) {
    return {
      text: "Pahari Brew’s featured offerings include single-origin coffee, pour-over coffee, espresso-based drinks, our signature Himalayan Mist Latte, fresh pastries, and artisanal baked goods. Exact recipe and allergen information is not verified in this demonstration.",
      quickAction: {
        label: "Explore Menu Page",
        action: "navigate-menu"
      }
    };
  }

  // 20. Café story / history
  if (q.includes('story') || q.includes('about') || q.includes('history') || q.includes('concept') || q.includes('who are you')) {
    return {
      text: "Pahari Brew is a fictional café concept in Shimla that combines Himalayan atmosphere with contemporary coffee culture. It is designed as a calm place for coffee, conversation, fresh pastries, and slow moments."
    };
  }

  // 21. Contact information
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call')) {
    return {
      text: "In this fictional demonstration, Pahari Brew Roasters Shimla is listed with phone: +91 94321 87654 and email: hello@paharibrew.com. Please note these are demonstration placeholders."
    };
  }

  // Default fallback according to instruction:
  return {
    text: "I don’t have verified information about that in this demonstration. Please contact Pahari Brew directly for accurate details."
  };
}
