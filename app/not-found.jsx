"use client";
export default function NotFound() {
  const handleClickBack = () => {
    history.back();
  };
  return (
    <div className="grid place-content-center h-screen">
      <h1 className="text-xl">Page Not Found</h1>
      <button
        className="bg-green-500 p-1 rounded-sm"
        type="button"
        onClick={handleClickBack}
      >
        Back
      </button>
    </div>
  );
}
