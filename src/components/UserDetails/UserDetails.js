import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Paper, Button, TextField, Checkbox, Container } from '@mui/material';
import { useUser } from '../../context/UserContext'; // Importing the UserContext to manage user authentication state

const UserDetails = () => {
  const { isAuthorized, setIsAuthorized } = useUser(); // Accessing the authorization state and setter function from the context

  // State to hold the list of users
  const [userList, setUserList] = useState([]);
  
  // State to track the search term for filtering users
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to track selected checkboxes for users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch users from local storage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('registeredUsers'); // Retrieve users from local storage
    if (savedUsers) {
      setUserList(JSON.parse(savedUsers)); // Parse and set users in state
      setIsAuthorized(true); // If users exist, set the user as authorized
    } else {
      setIsAuthorized(false); // If no users, set user as unauthorized
    }
  }, [setIsAuthorized]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  // Function to handle checkbox toggle for a user
  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      // Add user to the selected users list
      setSelectedUsers([...selectedUsers, user]);
    } else {
      // Remove user from selected users list
      setSelectedUsers(selectedUsers.filter((selected) => selected !== user));
    }
  };

  // Function to highlight matching text in user details
  const highlightText = (text) => {
    if (!searchTerm) return text; // Return text as is if no search term

    // Split the text around the search term and highlight the match
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> // Highlight matched part
      ) : (
        part // Return unmatched part normally
      )
    );
  };

  // Function to handle delete action for selected users
  const handleDeleteSelected = () => {
    if (window.confirm('Are you sure you want to delete the selected users?')) {
      const updatedUsers = userList.filter(user => !selectedUsers.includes(user)); // Remove selected users
      setUserList(updatedUsers); // Update user list in state
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers)); // Save updated users in local storage
      setSelectedUsers([]); // Clear selected users list

      // Update isAuthorized state based on whether there are any users left
      if (updatedUsers.length === 0) {
        setIsAuthorized(false); // Set as unauthorized if no users remain
      }
    }
  };

  return (
    <Container maxWidth="xlg"> 
      <Box sx={{ marginTop: "100px" }}>
        {/* Header Section */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', fontSize: "20px" }}>
          {isAuthorized ? 'Registered Users' : 'No Users Registered'} {/* Display title based on authorization */}
        </Typography>

        {/* Search Box */}
        {isAuthorized && (
          <>
            <TextField
              label="Search Users"
              variant="outlined"
              size="small"
              value={searchTerm} // Bind search term state to input field
              onChange={handleSearchChange} // Update search term on input change
              sx={{ mb: 3, width: '300px', height: '40px' }}
            />

            {/* Delete Button */}
            <Button
              variant="contained"
              color="error"
              sx={{ mb: 3, ml: 2, height: '40px' }}
              onClick={handleDeleteSelected} // Trigger delete function on click
              disabled={selectedUsers.length === 0} // Disable button if no users are selected
            >
              Delete Selected Users
            </Button>

            {/* Users Table */}
            {userList.length > 0 ? (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Checkbox</TableCell> {/* Checkbox column for selecting users */}
                      {Object.keys(userList[0]).map((key) => (
                        <TableCell key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize column headers */}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {userList.filter((user) =>
                      Object.values(user).some((value) =>
                        value.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Filter users based on search term
                      )
                    ).map((user, index) => (
                      <TableRow key={index}>
                        {/* Checkbox for each user */}
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user)} // Check if user is selected
                            onChange={(event) => handleCheckboxChange(event, user)} // Handle checkbox change
                          />
                        </TableCell>
                        {/* Display user details in table cells */}
                        {Object.entries(user).map(([key, value]) => (
                          <TableCell key={key}>
                            {highlightText(value.toString())} {/* Highlight matching search term */}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No user data found.</Typography> // Display message if no users
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default UserDetails;
