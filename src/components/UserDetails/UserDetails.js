import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Paper, Button, TextField, Checkbox, Container } from '@mui/material';
import { useUser } from '../../context/UserContext'; // <-- Import your UserContext

const UserDetails = () => {
  const { isAuthorized, setIsAuthorized } = useUser(); // <-- Access context

  // State to hold the list of users
  const [userList, setUserList] = useState([]);
  
  // State to track the search term for filtering users
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to track selected checkboxes for users
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch users from local storage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      setUserList(JSON.parse(savedUsers));
      setIsAuthorized(true); // If users exist, authorize the user
    } else {
      setIsAuthorized(false);
    }
  }, [setIsAuthorized]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle checkbox toggle for a user
  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter((selected) => selected !== user));
    }
  };

  // Function to highlight matching text in user details
  const highlightText = (text) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  // Function to handle delete action
  const handleDeleteSelected = () => {
    if (window.confirm('Are you sure you want to delete the selected users?')) {
      const updatedUsers = userList.filter(user => !selectedUsers.includes(user));
      setUserList(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      setSelectedUsers([]);

      // Update isAuthorized based on whether any users are left
      if (updatedUsers.length === 0) {
        setIsAuthorized(false);
      }
    }
  };

  return (
    <Container maxWidth="xlg"> 
      <Box sx={{  marginTop: "100px" }}>
        {/* Header */}
        <Typography variant="h5" sx={{ mb: 3 , fontWeight: 'bold',  fontSize: "20px"  }}>
          {isAuthorized ? 'Registered Users' : 'No Users Registered'}
        </Typography>

        {/* Search Box */}
        {isAuthorized && (
          <>
            <TextField
              label="Search Users"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mb: 3, width: '300px',height: '40px', }}
            />

            {/* Delete Button */}
            <Button
              variant="contained"
              color="error"
              sx={{ mb: 3 , ml:2, height: '40px', }}
              onClick={handleDeleteSelected}
              disabled={selectedUsers.length === 0}
            >
              Delete Selected Users
            </Button>

            {/* Users Table */}
            {userList.length > 0 ? (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Checkbox</TableCell>
                      {Object.keys(userList[0]).map((key) => (
                        <TableCell key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {userList.filter((user) =>
                      Object.values(user).some((value) =>
                        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    ).map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user)}
                            onChange={(event) => handleCheckboxChange(event, user)}
                          />
                        </TableCell>
                        {Object.entries(user).map(([key, value]) => (
                          <TableCell key={key}>
                            {highlightText(value.toString())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No user data found.</Typography>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default UserDetails;
