/* 
  Dashboard.js

  Dashboard page. Contains recent messages.
*/

import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'; // Adjust the path based on your project structure

const Dashboard = () => {
  const [user, setUser] = useState({
    username: 'Username', // Replace with your actual username
  });
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    fetch('http://54.219.143.67:5001/messages', {
      credentials: 'include' // To send the session cookie
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error('Received data is not an array:', data);
      }
    })
    .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="dashboard-container">
        <div className="user-info">
            <h1>Your Dashboard</h1>
        </div>
        <div className="message-container">
            <h2 className="message-header">Your Messages:</h2>
            <ul className="message-list">
            {Array.isArray(messages) ? (
              messages.map((item, index) => (
                <li key={index} className="message-item">
                  <div>
                    <strong>{item.senderUsername}:</strong> {item.content}
                  </div>
                  <div className="message-timestamp">
                    {item.sent_at}
                  </div>
                </li>
              ))
            ) : (
              <li>No messages to display.</li>
            )}
            </ul>
        </div>
    </div>
  );
};

export default Dashboard;