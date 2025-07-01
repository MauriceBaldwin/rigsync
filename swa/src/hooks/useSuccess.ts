import { useState } from "react";

const useSuccessTimer = () => {
  const [showSuccess, _setShowSuccess] = useState(false);

  const setShowSuccess = (show: boolean) => {
    _setShowSuccess(show);

    if (show) {
      setTimeout(() => {
        _setShowSuccess(false);
      }, 5000);
    }
  };

  return {
    showSuccess,
    setShowSuccess,
  };
};

export default useSuccessTimer;