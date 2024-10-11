"use client"; // クライアントコンポーネントとして指定

import { useEffect } from "react";
import "./globals.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const rainContainer = document.createElement("div");
    rainContainer.classList.add("rain");
    document.body.appendChild(rainContainer);

    function createRaindrop() {
      const drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.left = Math.random() * window.innerWidth + "px";
      drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
      rainContainer.appendChild(drop);

      setTimeout(() => {
        drop.remove();
      }, 1000); // アニメーション時間と同じ
    }

    const interval = setInterval(createRaindrop, 100);

    return () => {
      clearInterval(interval);
      rainContainer.remove();
    };
  }, []);

  return <>{children}</>;
}
