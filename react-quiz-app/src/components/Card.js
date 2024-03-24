import React from 'react';

const Card = ({ content }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px', // Increased padding for top and bottom
    marginBottom: '40px', // Increased margin for top and bottom
    maxWidth: '600px', // Set maximum width
    margin: '20px auto', // Center the card horizontally and add some gap from the top
    height: 'calc(100vh - 180px)', // Adjust card height to fit viewport minus footer height and extra top gap
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };
  const textStyle = {
    margin: '0',
    fontSize: '16px',
  };


  return (
    <div className='tc bg-light-purple dib br13 pa1 ma2 bw2 shadow-5 ' style={cardStyle}>
      <div>
        <p style={textStyle}>{content}</p>
      </div>
      {/* You can add more content or customize the card as needed */}
    </div>
  );
};

export default Card;