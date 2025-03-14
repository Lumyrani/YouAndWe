import React from "react";

const FooterComponent = () => {
  return (
    <div>
      <footer className="footer">
        <p className="text-muted small mb-0">
          Copyrights reserved at &copy; {new Date().getFullYear()} UNV - All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default FooterComponent;
