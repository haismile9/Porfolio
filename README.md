# Modern Developer Portfolio

A modern, responsive developer portfolio website built with the latest technologies, based on a Figma design.

## 🚀 Technologies Used

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React** for component architecture

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Dark Theme**: Modern dark color scheme with accent colors
- **Interactive Snake Game**: Playable snake game component
- **Semantic HTML**: Accessible and SEO-friendly structure
- **Performance Optimized**: Next.js Image optimization and lazy loading

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎮 Features

- **Interactive Navigation**: Tab-style navigation menu
- **Snake Game**: Complete the game to "unlock" portfolio content
- **Social Links**: Direct links to social media profiles
- **Contact Information**: Easy access to contact details
- **GitHub Integration**: Links to GitHub profile and projects

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── components/
│   ├── ui/
│   │   └── button.tsx      # Reusable button component
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with social links
│   └── SnakeGame.tsx       # Interactive snake game
├── lib/
│   └── utils.ts            # Utility functions
└── styles/
    └── globals.css         # Global styles and CSS variables
```

## 🎨 Color Palette

- **Background**: `#020618` (Dark navy)
- **Surface**: `#0F172B` (Dark blue-gray)
- **Border**: `#314158` (Medium blue-gray)
- **Text Primary**: `#F8FAFC` (Light gray)
- **Text Secondary**: `#90A1B9` (Medium gray)
- **Accent Orange**: `#FFB86A` (Warm orange)
- **Accent Blue**: `#615FFF` (Purple-blue)
- **Accent Green**: `#00D5BE` (Teal)
- **Accent Teal**: `#43D9AD` (Light teal)

## 🔧 Customization

### Updating Personal Information

1. Edit `src/app/page.tsx` to update:
   - Name and title
   - GitHub link
   - Introduction text

2. Edit `src/components/Footer.tsx` to update:
   - Social media links
   - GitHub username

3. Edit `src/components/Header.tsx` to update:
   - Logo/name
   - Navigation items

### Adding New Sections

Create new page components in `src/app/` for additional sections like:
- About (`about/page.tsx`)
- Projects (`projects/page.tsx`)
- Contact (`contact/page.tsx`)

## 📱 Mobile Responsiveness

The design is fully responsive with:
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interactive elements
- **Optimized typography** for readability
- **Collapsible navigation** on mobile devices

## 🎯 Performance Optimizations

- **Next.js Image** component for optimized images
- **Lazy loading** for non-critical components
- **CSS-in-JS** with Tailwind for minimal bundle size
- **Code splitting** with Next.js App Router

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Other Platforms

- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **GitHub Pages**: Use `next export` for static export

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub.


# Smile note
Page có viền đen ở ngoài
Main content
      <!-- <div className="relative z-10 flex flex-col min-h-screen bg-dark-surface border border-dark-border rounded-lg m-[70px]"> -->
