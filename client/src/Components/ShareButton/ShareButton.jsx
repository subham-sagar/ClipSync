import React from "react";

function ShareButton({ title, text, link }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || "ClipSync",
          text: text || "Check this out!",
          url: link || window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(link || window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
    >
      Share
    </button>
  );
}

export default ShareButton;
