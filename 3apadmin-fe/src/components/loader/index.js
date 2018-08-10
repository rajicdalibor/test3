import React from 'react';

const Loader = () => (
  <div>
    <div className="loader" />
    {/* language=CSS */}
    <style jsx="true">{`
      .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid green;
        border-right: 16px solid white;
        border-bottom: 16px solid green;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Loader;
