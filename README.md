# Wiremit - Send Pocket Money with Ease

A modern web application for Zimbabwean parents to send money to their children studying abroad in the UK and South Africa.

## 🚀 Features

- **Secure Money Transfers**: Send money to UK (GBP) and South Africa (ZAR) with transparent fees
- **Real-time Exchange Rates**: Live currency conversion with API integration
- **User Authentication**: Secure signup/login with client-side password hashing
- **Transaction History**: Comprehensive history with pagination and search
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Dark Theme**: Professional dark interface with vibrant green accents
- **Smooth Animations**: Polished transitions and interactive elements

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui
- **Routing**: React Router v6
- **State Management**: React hooks with localStorage
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind

## 📱 Pages & Features

### Landing Page
- Hero section with compelling call-to-action
- Benefits showcase with animated cards
- Trust indicators and testimonials
- Responsive navigation

### Authentication
- Secure signup with form validation
- Email format and password strength validation
- Client-side password hashing
- Input sanitization to prevent XSS attacks
- Error handling and success feedback

### Dashboard
- **Send Money Section**:
  - Amount input with validation ($10-$2000 range)
  - Country selection (UK: 10% fee, SA: 20% fee)
  - Real-time exchange rate fetching
  - Fee calculation and conversion breakdown
  - Animated result display

- **Advertisement Carousel**:
  - Auto-advancing slides with manual navigation
  - Smooth fade transitions
  - Responsive design with touch support

- **Transaction History**:
  - Paginated transaction list (5 per page)
  - Status badges and copy-to-clipboard functionality
  - Animated page transitions
  - Mobile-optimized layout

## 🔧 How to Run the Application

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or bun package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wiremit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with yarn
   yarn install
   # or with bun
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   # or with bun
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application.

### Building for Production

1. **Create production build**
   ```bash
   npm run build
   # or
   yarn build
   # or
   bun build
   ```

2. **Preview production build locally**
   ```bash
   npm run preview
   # or
   yarn preview
   # or
   bun preview
   ```

The production build will be created in the `dist` folder and optimized for deployment.

## 🏗️ Architecture & Design Choices

### Frontend Architecture
- **React 18 with TypeScript**: Provides type safety and modern React features like concurrent rendering
- **Vite**: Fast build tool for better development experience and optimized production builds
- **React Router v6**: Modern routing solution with data loading and nested routes support

### State Management
- **React Query (TanStack Query)**: For server state management and caching (prepared for future API integration)
- **Local State**: Using React hooks for component-level state management
- **Mock Data**: Currently using local mock data structure that mirrors expected API responses

### UI/UX Design System
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Shadcn/ui**: High-quality, accessible component library built on Radix UI
- **Design Tokens**: Semantic color system using CSS custom properties for consistent theming
- **Dark/Light Theme**: Implemented using next-themes with proper color contrast ratios
- **Responsive Design**: Mobile-first approach with breakpoints at sm (640px), md (768px), lg (1024px), xl (1280px)

### Authentication Strategy
- **Mock Authentication**: Simple localStorage-based auth for demonstration
- **Route Protection**: Guards for authenticated routes using React Router
- **User Session**: Persistent login state across browser sessions

### Component Structure
- **Atomic Design**: Components organized by complexity (UI components, feature components, pages)
- **Composition Pattern**: Flexible components using compound component pattern
- **TypeScript Interfaces**: Strong typing for all data structures and props

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting with React Router
- **Image Optimization**: Responsive images with proper alt attributes for accessibility
- **Animation Performance**: CSS-based animations using Tailwind's animation utilities
- **Bundle Optimization**: Vite's tree-shaking and dead code elimination

### Security Considerations
- **Input Validation**: Form validation using React Hook Form with Zod schemas
- **XSS Prevention**: React's built-in XSS protection and proper data sanitization
- **CSRF Protection**: Prepared for implementation with future API integration
- **Secure Headers**: Ready for implementation in production deployment

## 🔒 Security Features

- **Password Security**: Client-side hashing before storage (production should use server-side bcrypt)
- **Input Sanitization**: XSS prevention on all user inputs
- **Email Validation**: Regex-based email format validation
- **Data Encryption**: Sensitive data handled securely in localStorage
- **HTTPS Ready**: Prepared for secure connections in production

## 🌍 Internationalization & Currency

### Supported Countries
- **United Kingdom**: GBP conversion with 10% transfer fee
- **South Africa**: ZAR conversion with 20% transfer fee

### Exchange Rate API
- Endpoint: `https://68976304250b078c2041c7fc.mockapi.io/api/wiremit/InterviewAPIS`
- Fallback rates included for reliability
- Real-time rate updates

### Fee Structure
- **UK Transfers**: 10% fee, minimum $10, maximum $2000
- **SA Transfers**: 20% fee, minimum $10, maximum $2000
- **Calculation**: Fee deducted from USD, remainder converted at current rate
- **Rounding**: All final amounts rounded UP to nearest whole number

## 📱 Responsive Design

- **Mobile-First**: Optimized for touch interactions
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
- **Touch-Friendly**: Large buttons and intuitive gestures
- **Accessibility**: ARIA labels and keyboard navigation

## 🎨 Design System

### Color Palette
- **Background**: Dark green-tinted (#0a0f0d)
- **Primary**: Vibrant green (#00ff88)
- **Cards**: Subtle dark overlays with green accents
- **Text**: High contrast whites and grays

### Typography
- **Font**: Inter with system fallbacks
- **Hierarchy**: Clear heading structure
- **Readability**: Optimized line heights and spacing

### Animations
- **Page Transitions**: Smooth fade-in effects
- **Button Interactions**: Hover states with scale transforms
- **Loading States**: Animated spinners and progress indicators
- **Micro-interactions**: Button glows and card hover effects

## 🚀 Scaling Considerations

### Adding New Countries
1. Update `CurrencyConversion` type in `utils/currency.ts`
2. Add country option in `SendMoney.tsx` select component
3. Update fee structure in `calculateConversion` function
4. Add appropriate flag emoji and country name

### Database Integration
- Replace localStorage with proper database (PostgreSQL/MongoDB)
- Implement server-side authentication with JWT tokens
- Add proper session management
- Implement server-side validation

### Enhanced Security
- Server-side password hashing with bcrypt
- Rate limiting for API calls
- CSRF protection
- Input validation on backend
- Proper encryption for sensitive data

### Performance Optimizations
- Implement React.lazy for code splitting
- Add service worker for offline functionality
- Optimize images with next-gen formats
- Add CDN for static assets
- Implement proper caching strategies

### Additional Features
- Push notifications for transaction updates
- SMS/Email confirmations
- Multi-factor authentication
- Transaction receipts and exports
- Advanced filtering and search
- Bulk transfer capabilities
- Recipient management system

## 🧪 Testing Strategy

### Recommended Test Coverage
- Unit tests for utility functions
- Integration tests for API calls
- E2E tests for user workflows
- Accessibility testing
- Performance testing
- Security penetration testing

### Test Frameworks
- **Unit**: Jest + React Testing Library
- **E2E**: Playwright or Cypress
- **Performance**: Lighthouse CI
- **Accessibility**: axe-core

## 📄 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Features**: ES6+, CSS Grid, Flexbox
- **Fallbacks**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ for Zimbabwean families worldwide.