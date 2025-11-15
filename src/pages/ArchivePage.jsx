import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ArchivePage() {
  const navigate = useNavigate();
  
  // Redirect to main page since we're showing archived notes there now
  React.useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}

export default ArchivePage;
