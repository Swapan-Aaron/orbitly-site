# Orbitly - Practice Website

A complete, modern multi-page website for a fictional productivity startup. Built with HTML, CSS, and vanilla JavaScript.

## Overview

Orbitly is a fictional smart scheduling and workflow tool for freelancers and small teams. This practice website showcases modern web design patterns, responsive layouts, and interactive features.

## Pages

- **Home** (`index.html`) - Hero section, features overview, pricing preview, testimonials
- **Features** (`features.html`) - Detailed feature descriptions with visual mockups
- **Pricing** (`pricing.html`) - Interactive pricing table with monthly/yearly toggle, add-ons, FAQ
- **About** (`about.html`) - Brand story, values, stats, team members
- **Contact** (`contact.html`) - Contact form with validation, contact info cards

## Features

### Design System
- **Colors**: Midnight navy (#14213D), electric violet (#6C4AB6), soft sky (#E8F0FE), warm orange (#FCA311)
- **Typography**: Poppins for headings, Inter for body text
- **Dark mode**: Full theme toggle with localStorage persistence
- **Responsive**: Mobile-first design that works on all screen sizes

### Interactive Elements
- Dark mode toggle with smooth transitions
- Mobile-responsive navigation menu
- Pricing toggle (monthly/yearly)
- Contact form validation
- Smooth scroll animations
- Hover effects and transitions

### JavaScript Features
- Theme persistence with localStorage
- Mobile menu toggle
- Form validation with error messages
- Smooth scrolling for anchor links
- Intersection Observer for scroll animations
- Navbar shadow on scroll

## File Structure

```
orbitly-site/
├── index.html          # Home page
├── features.html       # Features page
├── pricing.html        # Pricing page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── styles.css     # Complete stylesheet
├── js/
│   └── main.js        # JavaScript functionality
├── images/            # (placeholder for images)
└── README.md          # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), Grid, Flexbox
- **JavaScript (ES6+)** - Modern vanilla JS, no frameworks
- **Google Fonts** - Poppins and Inter

## Getting Started

1. Open `index.html` in any modern web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000`

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Key CSS Patterns

- **CSS Custom Properties** for theming
- **Grid Layout** for card grids and page layouts
- **Flexbox** for navigation and alignment
- **Mobile-first** responsive design with `min-width` media queries
- **Smooth transitions** for interactive elements
- **Data attributes** for theme toggling (`data-theme`)

## Key JavaScript Patterns

- **LocalStorage** for theme persistence
- **Event delegation** for efficient event handling
- **Intersection Observer API** for scroll animations
- **Form validation** with custom error messages
- **Toggle patterns** for mobile menu and pricing switch

## Practice Concepts Demonstrated

1. **Responsive Web Design** - Works beautifully on mobile, tablet, and desktop
2. **Component Thinking** - Reusable card patterns, buttons, form elements
3. **Design Systems** - Consistent spacing, colors, typography
4. **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
5. **Performance** - Efficient CSS, minimal JavaScript, optimized assets
6. **User Experience** - Clear CTAs, intuitive navigation, helpful feedback

## Customization Ideas

- Replace placeholder logos in "Trusted By" section
- Add real team photos instead of avatar initials
- Create actual blog posts and link them
- Build out the template library
- Add more integration logos
- Create a proper image for the hero mockup
- Add subtle animations to feature cards
- Implement a working live chat widget

## Brand Guidelines

**Name**: Orbitly  
**Motto**: "Your work, in orbit."  
**Personality**: Modern, clear, confident, approachable  
**Voice**: Professional but warm, like a helpful colleague

## Notes

- All email addresses use `.example` domain (safe for practice)
- Phone numbers and addresses are fictional
- This is a complete frontend implementation - no backend required
- Form submissions show success messages but don't send data anywhere

## License

This is a practice project. Feel free to use it for learning, practice, or portfolio purposes.

---

Built as a practice project to demonstrate modern HTML/CSS/JS skills. The company, product, and all content are fictional.
