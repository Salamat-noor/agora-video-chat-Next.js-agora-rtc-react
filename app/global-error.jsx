"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="EN">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again or reset</button>
      </body>
    </html>
  );
}
