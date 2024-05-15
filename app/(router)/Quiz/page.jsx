import React from 'react';

function GoogleFormsList({ formLinks }) {
  // Check if formLinks exists and is an array before mapping over it
  if (!Array.isArray(formLinks)) {
    return <div>No form links available</div>;
  }

  return (
    <div className="google-forms-list p-4">
      <h2 className="text-2xl font-semibold mb-4">Google Forms</h2>
      <div className="forms-container grid gap-4">
        {formLinks.map((link, index) => (
          <div className="form-card bg-white p-4 rounded-lg shadow-md" key={index}>
            <div className="card-header mb-2">
              <h3 className="text-lg font-medium">Form {index + 1}</h3>
            </div>
            <div className="card-body">
              <p>
                Link: <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{link}</a>
              </p>
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
    <div className="App min-h-screen bg-gray-100 p-4">
      <GoogleFormsList formLinks={formLinks} />
    </div>
  );
}

export default App;
