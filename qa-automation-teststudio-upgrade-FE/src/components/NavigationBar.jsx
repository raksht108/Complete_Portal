import React from 'react'; // Import React to use JSX and React features.
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@material-ui/core'; // Import Material-UI components.
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation within the app.
import AccountCircleIcon from '@material-ui/icons/AccountCircle'; // Import the account circle icon from Material-UI icons.
import logo from '../assets/TN_prod_white.png'; // Import the company logo image.

const NavigationBar = () => {
  const navigate = useNavigate(); // Get the navigate function to programmatically navigate between routes.

  // State hooks for managing the anchor element of different menus and the active menu item.
  const [anchorElCreate, setAnchorElCreate] = React.useState(null); // State for the "Create" menu anchor element.
  const [anchorElTestCase, setAnchorElTestCase] = React.useState(null); // State for the "TestCase Directory" menu anchor element.
  const [anchorElExecutions, setAnchorElExecutions] = React.useState(null); // State for the "Executions" menu anchor element.
  const [anchorElManage, setAnchorElManage] = React.useState(null); // State for the "Manage" menu anchor element.
  const [anchorElProfile, setAnchorElProfile] = React.useState(null); // State for the "Profile" menu anchor element.
  const [activeMenuItem, setActiveMenuItem] = React.useState(''); // State to track the currently active menu item.

  // Function to handle opening a menu. It sets the anchor element and the active menu item.
  const handleMenuOpen = (event, setAnchorEl, menuName) => {
    setAnchorEl(event.currentTarget); // Set the clicked element as the anchor for the menu.
    setActiveMenuItem(menuName); // Set the currently active menu item.
  };

  // Function to handle closing a menu. It sets the anchor element to null.
  const handleMenuClose = (setAnchorEl) => {
    setAnchorEl(null); // Close the menu by removing the anchor element.
  };

  // Function to handle clicking on the logo, which navigates to the home page and resets the active menu.
  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home route when the logo is clicked.
    setActiveMenuItem(''); // Reset the active menu item to none.
  };

  // Function to apply styles to the buttons based on the active menu item.
  const getButtonStyle = (menuName) => {
    return activeMenuItem === menuName ? { backgroundColor: '#cccccc', color: '#000' } : {}; // Highlight button if it's active.
  };

  return (
    <>
      {/* AppBar is the top navigation bar with a purple background */}
      <AppBar position="sticky" style={{ backgroundColor: '#1D0066', zIndex: 1300 }}>
        <Toolbar>
          {/* Company logo, clickable to navigate to the home page */}
          <img
            src={logo} // Set the source of the logo image.
            alt="Company Logo" // Alternate text for the logo image.
            style={{ width: '175px', marginRight: '20px', cursor: 'pointer' }} // Style for the logo image.
            onClick={handleLogoClick} // Click handler to navigate to home when logo is clicked.
          />
          {/* Portal title */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Test Automation Portal
          </Typography>

          {/* Dashboard button, navigates to home page */}
          <Button
            color="inherit" // Inherit default color from the theme.
            style={getButtonStyle('Dashboard')} // Apply styles if 'Dashboard' is the active menu.
            onClick={() => setActiveMenuItem('Dashboard')} // Set 'Dashboard' as the active menu when clicked.
          >
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link> {/* Link to home page */}
          </Button>

          {/* Create button with dropdown menu */}
          <Button
            color="inherit" // Default button color.
            style={getButtonStyle('Create')} // Apply styles if 'Create' is the active menu.
            onClick={(event) => handleMenuOpen(event, setAnchorElCreate, 'Create')} // Open "Create" menu when clicked.
          >
            Create
          </Button>
          {/* Create dropdown menu */}
          <Menu
            anchorEl={anchorElCreate} // Anchor element for the menu.
            open={Boolean(anchorElCreate)} // Check if the menu is open.
            onClose={() => handleMenuClose(setAnchorElCreate)} // Close the menu when triggered.
            MenuListProps={{ style: { zIndex: 1201 } }} // Set a specific zIndex to ensure it shows above other elements.
            getContentAnchorEl={null} // Set anchor positioning for the content.
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Origin point for the menu.
            transformOrigin={{ vertical: 'top', horizontal: 'left' }} // Transform origin for the menu.
          >
            {/* Menu items for Create dropdown, linking to different create pages */}
            <MenuItem onClick={() => handleMenuClose(setAnchorElCreate)}>
              <Link to="/create/test-case" style={{ color: 'black', textDecoration: 'none' }}>Create Test Case</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElCreate)}>
              <Link to="/create/suites" style={{ color: 'black', textDecoration: 'none' }}>Create Suites</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElCreate)}>
              <Link to="/create/collections" style={{ color: 'black', textDecoration: 'none' }}>Create Collections</Link>
            </MenuItem>
          </Menu>

          {/* TestCase Directory button with dropdown menu */}
          <Button
            color="inherit" // Default button color.
            style={getButtonStyle('TestCase Directory')} // Apply styles if 'TestCase Directory' is the active menu.
            onClick={(event) => handleMenuOpen(event, setAnchorElTestCase, 'TestCase Directory')} // Open "TestCase Directory" menu when clicked.
          >
            TestCase Directory
          </Button>
          {/* TestCase Directory dropdown menu */}
          <Menu
            anchorEl={anchorElTestCase} // Anchor element for the menu.
            open={Boolean(anchorElTestCase)} // Check if the menu is open.
            onClose={() => handleMenuClose(setAnchorElTestCase)} // Close the menu when triggered.
            MenuListProps={{ style: { zIndex: 1201 } }} // Ensure it shows above other elements.
            getContentAnchorEl={null} // Set anchor positioning for the content.
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Origin point for the menu.
            transformOrigin={{ vertical: 'top', horizontal: 'left' }} // Transform origin for the menu.
          >
            {/* Menu items for TestCase Directory dropdown, linking to different test case pages */}
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
              <Link to="/test-case/all" style={{ color: 'black', textDecoration: 'none' }}>All Test Cases</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
              <Link to="/test-case/common-data" style={{ color: 'black', textDecoration: 'none' }}>Common Multiset Data</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
              <Link to="/test-case/suites" style={{ color: 'black', textDecoration: 'none' }}>Suites</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElTestCase)}>
              <Link to="/test-case/collections" style={{ color: 'black', textDecoration: 'none' }}>Collections</Link>
            </MenuItem>
          </Menu>

          {/* Executions button with dropdown menu */}
          <Button
            color="inherit" // Default button color.
            style={getButtonStyle('Executions')} // Apply styles if 'Executions' is the active menu.
            onClick={(event) => handleMenuOpen(event, setAnchorElExecutions, 'Executions')} // Open "Executions" menu when clicked.
          >
            Executions
          </Button>
          {/* Executions dropdown menu */}
          <Menu
            anchorEl={anchorElExecutions} // Anchor element for the menu.
            open={Boolean(anchorElExecutions)} // Check if the menu is open.
            onClose={() => handleMenuClose(setAnchorElExecutions)} // Close the menu when triggered.
            MenuListProps={{ style: { zIndex: 1201 } }} // Ensure it shows above other elements.
            getContentAnchorEl={null} // Set anchor positioning for the content.
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Origin point for the menu.
            transformOrigin={{ vertical: 'top', horizontal: 'left' }} // Transform origin for the menu.
          >
            {/* Menu items for Executions dropdown, linking to different execution pages */}
            <MenuItem onClick={() => handleMenuClose(setAnchorElExecutions)}>
              <Link to="/executions/in-progress" style={{ color: 'black', textDecoration: 'none' }}>In-progress Runs</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElExecutions)}>
              <Link to="/executions/completed" style={{ color: 'black', textDecoration: 'none' }}>Completed Runs</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElExecutions)}>
              <Link to="/executions/in-process" style={{ color: 'black', textDecoration: 'none' }}>In-process/Paused Runs</Link>
            </MenuItem>
          </Menu>

          {/* Manage button with dropdown menu */}
          <Button
            color="inherit" // Default button color.
            style={getButtonStyle('Manage')} // Apply styles if 'Manage' is the active menu.
            onClick={(event) => handleMenuOpen(event, setAnchorElManage, 'Manage')} // Open "Manage" menu when clicked.
          >
            Manage
          </Button>
          {/* Manage dropdown menu */}
          <Menu
            anchorEl={anchorElManage} // Anchor element for the menu.
            open={Boolean(anchorElManage)} // Check if the menu is open.
            onClose={() => handleMenuClose(setAnchorElManage)} // Close the menu when triggered.
            MenuListProps={{ style: { zIndex: 1201 } }} // Ensure it shows above other elements.
            getContentAnchorEl={null} // Set anchor positioning for the content.
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Origin point for the menu.
            transformOrigin={{ vertical: 'top', horizontal: 'left' }} // Transform origin for the menu.
          >
            {/* Menu items for Manage dropdown, linking to different manage pages */}
            <MenuItem onClick={() => handleMenuClose(setAnchorElManage)}>
              <Link to="/manage/manage-users" style={{ color: 'black', textDecoration: 'none' }}>Manage Users</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElManage)}>
              <Link to="/manage/manage-environments" style={{ color: 'black', textDecoration: 'none' }}>Manage Environments</Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElManage)}>
              <Link to="/manage/manage-logs" style={{ color: 'black', textDecoration: 'none' }}>Manage Service Logs</Link>
            </MenuItem>
          </Menu>

          {/* Projects button, no dropdown */}
          <Button
            color="inherit" // Default button color.
            style={getButtonStyle('Projects')} // Apply styles if 'Projects' is the active menu.
            onClick={() => setActiveMenuItem('Projects')} // Set 'Projects' as the active menu when clicked.
          >
            <Link to="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</Link> {/* Link to Projects page */}
          </Button>

          {/* Profile icon button with dropdown menu */}
          <IconButton
            edge="end" // Align the button to the right edge.
            color="inherit" // Default icon color.
            onClick={(event) => handleMenuOpen(event, setAnchorElProfile, 'Profile')} // Open the profile menu when clicked.
          >
            <AccountCircleIcon /> {/* Profile icon */}
          </IconButton>
          {/* Profile dropdown menu */}
          <Menu
            anchorEl={anchorElProfile} // Anchor element for the profile menu.
            open={Boolean(anchorElProfile)} // Check if the menu is open.
            onClose={() => handleMenuClose(setAnchorElProfile)} // Close the menu when triggered.
            MenuListProps={{ style: { zIndex: 1201 } }} // Ensure it shows above other elements.
            getContentAnchorEl={null} // Set anchor positioning for the content.
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Origin point for the menu.
            transformOrigin={{ vertical: 'top', horizontal: 'right' }} // Transform origin for the menu.
          >
            {/* Menu items for Profile dropdown, linking to profile-related pages */}
            <MenuItem onClick={() => handleMenuClose(setAnchorElProfile)}>
              <Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>
                <span role="img" aria-label="profile">👤</span> User Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElProfile)}>
              <Link to="/settings" style={{ color: 'black', textDecoration: 'none' }}>
                <span role="img" aria-label="settings">⚙️</span> Settings
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose(setAnchorElProfile)}>
              <Link to="/logout" style={{ color: 'black', textDecoration: 'none' }}>
                <span role="img" aria-label="logout">🔓</span> Logout
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavigationBar; // Export the NavigationBar component for use in other parts of the application.
