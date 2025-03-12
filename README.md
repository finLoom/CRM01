# Fluent CRM

A modern CRM system built with React and Microsoft Fluent UI, designed to be a simpler alternative to Salesforce.

## Features

- **Modern, responsive UI** built with Microsoft Fluent UI
- **Dashboard with KPIs and visualizations**
  - Sales performance charts
  - Recent activities timeline
  - Key metrics display (leads, pipeline value, closed deals, revenue)
  - Customizable widgets
- **Contact management**
  - Comprehensive contact details
  - Search and filter capabilities
  - Import/export functionality
- **Lead tracking and management**
  - Lead status progression tracking
  - Conversion to opportunities
  - Source tracking and qualification
- **Opportunity pipeline**
  - Visual sales pipeline
  - Stage progression tracking
  - Probability and value forecasting
  - Close date management
- **Task management**
  - Task assignment and due dates
  - Priority levels and status tracking
  - Filtering by status (overdue, today, upcoming, completed)
  - Quick status toggling
- **User settings and preferences**
  - Profile management
  - Theme selection (light/dark)
  - Notification preferences
  - Regional settings (date format, time zone)
  - Password management

## Technology Stack

- **React 18** - For building the user interface
- **Fluent UI React** - Microsoft's design system
- **React Router** - For navigation and routing
- **date-fns** - For date formatting and calculations
- **Chart.js** - For data visualization

## Project Structure

```
fluent-crm/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── Layout.jsx
│   │   ├── dashboard/
│   │   ├── contacts/
│   │   ├── leads/
│   │   ├── opportunities/
│   │   ├── tasks/
│   │   └── common/
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ContactsPage.jsx
│   │   ├── LeadsPage.jsx
│   │   ├── OpportunitiesPage.jsx
│   │   ├── TasksPage.jsx
│   │   └── SettingsPage.jsx
│   ├── styles/
│   │   └── globalStyles.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (14.x or later)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/fluent-crm.git
cd fluent-crm
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to http://localhost:3000

## Building for Production

To create a production build:

```
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Key Features Details

### Dashboard
The Dashboard provides an at-a-glance view of your sales performance, including:
- KPI cards showing sales metrics
- Line chart for revenue tracking
- Recent lead and opportunity lists
- Activity timeline

### Contacts
The Contacts module allows you to:
- Store comprehensive contact information
- Search and filter contacts
- Edit contact details
- Track relationships with companies

### Leads
The Leads module helps you manage potential customers:
- Track lead sources and statuses
- Assign leads to team members
- Convert qualified leads to opportunities
- Filter by status and search by name or company

### Opportunities
The Opportunities module manages your sales pipeline:
- Track deals through all stages (Qualification to Closed)
- Forecast revenue with probability estimates
- Manage close dates
- Track sales activities

### Tasks
The Tasks module helps keep your team organized:
- Create tasks with priorities and due dates
- Assign tasks to team members
- Filter by status (overdue, today, upcoming)
- Mark tasks as complete with one click

### Settings
The Settings module provides personalization:
- Update user profile information
- Change notification preferences
- Import/export data
- Customize application appearance

## Customization

### Theming

The project uses Fluent UI's theming capabilities. Users can switch between light and dark themes in the Settings page.

### Adding New Features

The modular architecture makes it easy to add new features:

1. Create new components in the appropriate directory
2. Add new routes in `App.jsx` if needed
3. Update the sidebar navigation in `SideBar.jsx`

## Future Roadmap

- User authentication and authorization
- Email integration
- Advanced reporting and analytics
- Mobile applications
- Data import/export functionality
- Calendar integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui)
- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)