import React from 'react';

function GoogleFormsList({ formLinks }) {
  // Check if formLinks exists and is an array before mapping over it
  if (!Array.isArray(formLinks)) {
    return <div>No form links available</div>;
  }

  return (
    <div className="google-forms-list">
      <h2>Google Forms</h2>
      <div className="forms-container">
        {formLinks.map((link, index) => (
          <div className="form-card" key={index}>
            <div className="card-header">
              <h3>Form {index + 1}</h3>
            </div>
            <div className="card-body">
              <p>Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const formLinks = [
    'https://docs.google.com/forms/d/e/1FAIpQLSdl6vZAtu7eOJIdj7tyyoVdGXYlMm-V5B8oq8G8pKdC6S0Zeg/viewform',
    'https://docs.google.com/forms/d/e/1FAIpQLSfV5uFAnTQyamQGZzmztFmrQhnWu7HEJk5sIy-UNgE6bthP0Q/viewform',
    'https://docs.google.com/forms/d/e/1FAIpQLSeFb3C57o8WKPOEwO6nlc2qFNJ7Xt-QwAqUKlYYtD8u7r2n1A/viewform'
  ];

  return (
    <div className="App">
      <GoogleFormsList formLinks={formLinks} />
    </div>
  );
}

export default App;
