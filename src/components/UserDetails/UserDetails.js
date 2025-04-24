import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, 
         TableHead, TableRow, Paper, Button, TextField, Checkbox } from '@mui/material';

const UserDetails = () => {
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
    }
  }, []);

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
      // Filter out selected users from the user list
      const updatedUsers = userList.filter(user => !selectedUsers.includes(user));
      setUserList(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      setSelectedUsers([]); // Clear selected users after deletion
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ mb: 3 }}>Registered Users</Typography>

      {/* Search Box */}
      <TextField
        label="Search Users"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3, width: '300px' }}
      />

      {/* Delete Button */}
      <Button
        variant="contained"
        color="error"
        sx={{ mb: 3 }}
        onClick={handleDeleteSelected}
        disabled={selectedUsers.length === 0} // Disable if no user is selected
      >
        Delete Selected Users
      </Button>

      {/* Users Table */}
      {userList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table size="small">
            {/* Table Header */}
            <TableHead>
              <TableRow>
                <TableCell>Checkbox</TableCell>
                {Object.keys(userList[0]).map((key) => (
                  <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {userList.filter((user) => {
                return Object.values(user).some((value) =>
                  value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
              }).map((user, index) => (
                <TableRow key={index}>
                  {/* Checkbox for each user */}
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user)}
                      onChange={(event) => handleCheckboxChange(event, user)}
                    />
                  </TableCell>

                  {/* User Details */}
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
    </Box>
  );
};

export default UserDetails;
